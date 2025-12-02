"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Search,
    FileText,
    Scale,
    Bookmark,
    Settings,
    LogOut,
    ShieldAlert
} from "lucide-react";

const navigation = [
    { name: "Tra cứu pháp lý", href: "/", icon: Search },
    { name: "Văn bản mới", href: "/new-docs", icon: FileText },
    { name: "So sánh luật", href: "/compare", icon: Scale },
    { name: "Văn bản đã lưu", href: "/saved", icon: Bookmark },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
            <div className="flex h-16 items-center px-6 font-bold text-xl tracking-wider border-b border-slate-800">
                <ShieldAlert className="mr-2 h-6 w-6 text-blue-400" />
                LEGAL CORP
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 flex-shrink-0",
                                    isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-slate-800 p-4">
                <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                        NV
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Nguyễn Văn A</p>
                        <p className="text-xs text-slate-400">Pháp chế</p>
                    </div>
                </div>
                <div className="mt-4 space-y-1">
                    <button className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
                        <Settings className="mr-3 h-5 w-5 text-slate-400" />
                        Cài đặt
                    </button>
                    <button className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
                        <LogOut className="mr-3 h-5 w-5 text-slate-400" />
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    );
}
