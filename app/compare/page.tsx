```
"use client";

import { useState } from "react";
import { ArrowRightLeft, RefreshCw, Upload, FileText, FileType } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Diff from "diff";
import { parseFileContent } from "@/app/actions";

export default function ComparePage() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diffResult, setDiffResult] = useState<Diff.Change[] | null>(null);
  const [summary, setSummary] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isOld: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const text = await parseFileContent(formData);
      if (isOld) setOldText(text);
      else setNewText(text);
    } catch (error) {
      alert("Lỗi khi đọc file");
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = (diffs: Diff.Change[]) => {
    const changes: string[] = [];
    diffs.forEach((part) => {
      if (part.added && part.value.trim().length > 5) {
        changes.push(`Thêm mới: "${part.value.trim().substring(0, 50)}..."`);
      }
      if (part.removed && part.value.trim().length > 5) {
        changes.push(`Đã xóa: "${part.value.trim().substring(0, 50)}..."`);
      }
    });
    if (changes.length === 0) changes.push("Hai văn bản giống hệt nhau.");
    return changes;
  };

  const handleCompare = () => {
    if (!oldText || !newText) return;
    const diff = Diff.diffWords(oldText, newText);
    setDiffResult(diff);
    setSummary(generateSummary(diff));
  };

  const handleClear = () => {
    setOldText("");
    setNewText("");
    setDiffResult(null);
    setSummary([]);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">So sánh Văn bản</h1>
           <p className="text-slate-500 text-sm">Hỗ trợ nhập text trực tiếp hoặc upload file PDF/Word.</p>
        </div>
        <div className="flex space-x-2">
            <Button variant="outline" onClick={handleClear}>
                <RefreshCw className="mr-2 h-4 w-4" /> Làm mới
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCompare} disabled={loading}>
            <ArrowRightLeft className="mr-2 h-4 w-4" /> {loading ? "Đang xử lý..." : "So sánh ngay"}
            </Button>
        </div>
      </div>

      {!diffResult ? (
        <div className="flex-1 grid grid-cols-2 gap-6 h-full min-h-[500px]">
            {/* Left Column */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-700">Văn bản gốc (Cũ)</label>
                    <div className="relative">
                        <Input 
                            type="file" 
                            className="hidden" 
                            id="file-old" 
                            onChange={(e) => handleFileUpload(e, true)}
                            accept=".txt,.pdf,.docx,.doc"
                        />
                        <Button variant="outline" size="sm" asChild>
                            <label htmlFor="file-old" className="cursor-pointer">
                                <Upload className="mr-2 h-4 w-4" /> Tải file lên
                            </label>
                        </Button>
                    </div>
                </div>
                <textarea
                    className="flex-1 w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-slate-800 leading-relaxed"
                    placeholder="Dán nội dung hoặc tải file..."
                    value={oldText}
                    onChange={(e) => setOldText(e.target.value)}
                />
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-700">Văn bản mới (Sửa đổi)</label>
                    <div className="relative">
                         <Input 
                            type="file" 
                            className="hidden" 
                            id="file-new" 
                            onChange={(e) => handleFileUpload(e, false)}
                            accept=".txt,.pdf,.docx,.doc"
                        />
                        <Button variant="outline" size="sm" asChild>
                            <label htmlFor="file-new" className="cursor-pointer">
                                <Upload className="mr-2 h-4 w-4" /> Tải file lên
                            </label>
                        </Button>
                    </div>
                </div>
                <textarea
                    className="flex-1 w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-slate-800 leading-relaxed"
                    placeholder="Dán nội dung hoặc tải file..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                />
            </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
            {/* Summary Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="font-bold text-lg text-blue-800 mb-3 flex items-center">
                    <FileText className="mr-2 h-5 w-5" /> Tóm tắt điểm khác biệt
                </h3>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                    {summary.map((item, idx) => (
                        <li key={idx} className="text-slate-700 text-sm flex items-start">
                            <span className="mr-2">•</span> {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Detailed Diff */}
            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-8 overflow-y-auto">
                <h3 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">Chi tiết so sánh</h3>
                <div className="text-lg leading-loose text-slate-800">
                    {diffResult.map((part, index) => {
                        if (part.added) {
                            return (
                                <span key={index} className="bg-green-100 text-green-800 px-1 rounded mx-0.5 font-medium border-b-2 border-green-300">
                                    {part.value}
                                </span>
                            );
                        }
                        if (part.removed) {
                            return (
                                <span key={index} className="bg-red-100 text-red-800 px-1 rounded mx-0.5 line-through decoration-red-500 opacity-70">
                                    {part.value}
                                </span>
                            );
                        }
                        return <span key={index}>{part.value}</span>;
                    })}
                </div>
                <div className="mt-8 flex justify-center">
                        <Button variant="secondary" onClick={() => setDiffResult(null)}>
                        So sánh văn bản khác
                        </Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
```
