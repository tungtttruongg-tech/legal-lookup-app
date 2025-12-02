"use client";

import { useState } from "react";
import { ArrowRightLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Diff from "diff";

export default function ComparePage() {
    const [oldText, setOldText] = useState("");
    const [newText, setNewText] = useState("");
    const [diffResult, setDiffResult] = useState<Diff.Change[] | null>(null);

    const handleCompare = () => {
        if (!oldText || !newText) return;
        const diff = Diff.diffWords(oldText, newText);
        setDiffResult(diff);
    };

    const handleClear = () => {
        setOldText("");
        setNewText("");
        setDiffResult(null);
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">So sánh Văn bản</h1>
                    <p className="text-slate-500 text-sm">Dán nội dung vào 2 ô bên dưới để kiểm tra sự thay đổi.</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleClear}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Làm mới
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCompare}>
                        <ArrowRightLeft className="mr-2 h-4 w-4" /> So sánh ngay
                    </Button>
                </div>
            </div>

            {!diffResult ? (
                <div className="flex-1 grid grid-cols-2 gap-6 h-full min-h-[500px]">
                    {/* Left Column - Input */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-slate-700 mb-2">Văn bản gốc (Cũ)</label>
                        <textarea
                            className="flex-1 w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-slate-800 leading-relaxed"
                            placeholder="Dán nội dung văn bản cũ vào đây..."
                            value={oldText}
                            onChange={(e) => setOldText(e.target.value)}
                        />
                    </div>

                    {/* Right Column - Input */}
                    <div className="flex flex-col">
                        <label className="font-semibold text-slate-700 mb-2">Văn bản mới (Sửa đổi)</label>
                        <textarea
                            className="flex-1 w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-slate-800 leading-relaxed"
                            placeholder="Dán nội dung văn bản mới vào đây..."
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-8 overflow-y-auto">
                    <h3 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">Kết quả so sánh</h3>
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
            )}
        </div>
    );
}
