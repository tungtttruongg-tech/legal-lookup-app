"use server";

import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function parseFileContent(formData: FormData): Promise<string> {
    const file = formData.get("file") as File;
    if (!file) return "";

    const buffer = Buffer.from(await file.arrayBuffer());
    const type = file.type;

    try {
        if (type === "application/pdf") {
            const data = await pdf(buffer);
            return data.text;
        } else if (
            type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            type === "application/msword"
        ) {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        } else if (type.startsWith("image/")) {
            // Note: Tesseract.js is heavy and might timeout on serverless functions if not configured well.
            // For MVP, we might want to handle OCR on client side or use a lightweight approach.
            // However, let's try a basic return for now or handle it if requested specifically.
            return "Tính năng OCR cho ảnh đang được phát triển. Vui lòng sử dụng PDF hoặc Word.";
        } else {
            // Fallback for text files
            return await file.text();
        }
    } catch (error) {
        console.error("Error parsing file:", error);
        return "Lỗi khi đọc file. Vui lòng thử lại.";
    }
}
