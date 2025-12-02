"use client";

import { useState } from "react";
import { ChevronDown, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const DOC_VERSIONS = [
    {
        id: "v1",
        name: "Luật Đất đai 2013",
        content: `Điều 1. Phạm vi điều chỉnh
Luật này quy định về chế độ sở hữu đất đai, quyền hạn và trách nhiệm của Nhà nước đại diện chủ sở hữu toàn dân về đất đai và thống nhất quản lý về đất đai, chế độ quản lý và sử dụng đất đai, quyền và nghĩa vụ của người sử dụng đất đối với đất đai thuộc lãnh thổ của nước Cộng hòa xã hội chủ nghĩa Việt Nam.`
    },
    {
        id: "v2",
        name: "Luật Đất đai 2024 (Sửa đổi)",
        content: `Điều 1. Phạm vi điều chỉnh
Luật này quy định về chế độ sở hữu đất đai, quyền hạn và trách nhiệm của Nhà nước đại diện chủ sở hữu toàn dân về đất đai và thống nhất quản lý về đất đai, việc quản lý đất đai và chế độ sử dụng đất, quyền và nghĩa vụ của công dân, người sử dụng đất đối với đất đai thuộc lãnh thổ của nước Cộng hòa xã hội chủ nghĩa Việt Nam.`
    }
];

export default function ComparePage() {
    const [leftDoc, setLeftDoc] = useState(DOC_VERSIONS[0]);
    const [rightDoc, setRightDoc] = useState(DOC_VERSIONS[1]);

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">So sánh Văn bản</h1>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <ArrowRightLeft className="mr-2 h-4 w-4" /> Phân tích sự thay đổi
                </Button>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6 h-full">
                {/* Left Column */}
                <div className="flex flex-col border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <span className="font-semibold text-slate-700">Văn bản gốc</span>
                        <div className="flex items-center text-sm text-blue-600 font-medium cursor-pointer">
                            {leftDoc.name} <ChevronDown className="ml-1 h-4 w-4" />
                        </div>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 bg-red-50/30">
                        <p className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                            {leftDoc.content}
                        </p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <span className="font-semibold text-slate-700">Văn bản so sánh</span>
                        <div className="flex items-center text-sm text-blue-600 font-medium cursor-pointer">
                            {rightDoc.name} <ChevronDown className="ml-1 h-4 w-4" />
                        </div>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 bg-green-50/30">
                        <p className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                            {rightDoc.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
