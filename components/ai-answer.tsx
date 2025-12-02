"use client";

import { useState, useEffect } from "react";
import { Sparkles, ThumbsUp, ThumbsDown, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIAnswer({ query }: { query: string }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">AI Trả lời</h3>
                {loading && <span className="text-sm text-blue-600 animate-pulse">Đang phân tích văn bản...</span>}
            </div>

            <div className="prose prose-slate max-w-none">
                {loading ? (
                    <div className="space-y-3">
                        <div className="h-4 bg-blue-100 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-blue-100 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-blue-100 rounded w-5/6 animate-pulse"></div>
                    </div>
                ) : (
                    <div>
                        <p className="mb-4">
                            Dựa trên các văn bản pháp luật hiện hành, quy định về <strong>{query || "vấn đề này"}</strong> được tóm tắt như sau:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>
                                <strong>Về đối tượng áp dụng:</strong> Bao gồm các doanh nghiệp, tổ chức kinh tế, hộ kinh doanh cá thể... (Theo Điều 2, Thông tư 10/2024/TT-BTC).
                            </li>
                            <li>
                                <strong>Về thời hạn thực hiện:</strong> Chậm nhất là ngày 31/12/2024 phải hoàn thành việc chuyển đổi số hóa đơn.
                            </li>
                            <li>
                                <strong>Mức phạt vi phạm:</strong> Từ 10.000.000đ đến 20.000.000đ đối với hành vi chậm trễ quá 30 ngày.
                            </li>
                        </ul>
                        <p className="text-sm text-slate-500 italic">
                            *Lưu ý: Câu trả lời mang tính chất tham khảo. Vui lòng xem chi tiết văn bản gốc bên dưới.
                        </p>
                    </div>
                )}
            </div>

            {!loading && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-blue-100">
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4 mr-2" /> Hữu ích
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-600">
                            <ThumbsDown className="h-4 w-4 mr-2" /> Không chính xác
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-slate-500">
                            <Copy className="h-4 w-4 mr-2" /> Sao chép
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-500">
                            <RefreshCw className="h-4 w-4 mr-2" /> Tạo lại
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
