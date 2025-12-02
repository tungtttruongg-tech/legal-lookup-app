import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChevronDown } from "lucide-react";
import { RECENT_DOCS } from "@/lib/mock-data";
import { AIAnswer } from "@/components/ai-answer";

export default function SearchPage({
    searchParams,
}: {
    searchParams: { q: string };
}) {
    const query = searchParams.q || "";

    return (
        <div className="max-w-5xl mx-auto">
            {/* Search Header */}
            <div className="mb-8">
                <form className="flex space-x-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input
                            name="q"
                            defaultValue={query}
                            className="pl-10 h-11 text-base shadow-sm"
                            placeholder="Nhập từ khóa tìm kiếm..."
                        />
                    </div>
                    <Button type="submit" className="h-11 px-8 bg-blue-600 hover:bg-blue-700">Tìm kiếm</Button>
                </form>

                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" className="text-slate-600">
                        <Filter className="h-4 w-4 mr-2" /> Bộ lọc
                    </Button>
                    <Button variant="outline" size="sm" className="text-slate-600">
                        Loại văn bản <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-slate-600">
                        Cơ quan ban hành <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-slate-600">
                        Năm ban hành <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>

            {/* AI Answer Section */}
            <AIAnswer query={query} />

            {/* Results List */}
            <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Kết quả tìm kiếm ({RECENT_DOCS.length})</h2>
                <div className="space-y-4">
                    {RECENT_DOCS.map((doc) => (
                        <div key={doc.id} className="bg-white p-5 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                                    {doc.type}
                                </span>
                                <span className="text-sm text-slate-500 font-medium">{doc.number}</span>
                                <span className="text-sm text-slate-400">|</span>
                                <span className="text-sm text-slate-500">Ban hành: {doc.date}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-blue-700 mb-2 hover:underline cursor-pointer">
                                {doc.title}
                            </h3>
                            <p className="text-slate-600 text-sm mb-3">
                                {doc.summary}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <span>Cơ quan: {doc.issuer}</span>
                                <span className="text-green-600 font-medium flex items-center">
                                    • Còn hiệu lực
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
