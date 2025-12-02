import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, ArrowRight, Clock } from "lucide-react";
import { RECENT_DOCS, TOPICS } from "@/lib/mock-data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Tra cứu Pháp lý Doanh nghiệp
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Hệ thống tra cứu văn bản pháp luật, so sánh luật và hỏi đáp AI dành riêng cho nội bộ công ty.
        </p>

        <div className="max-w-2xl mx-auto relative">
          <form action="/search" className="relative flex items-center w-full">
            <Search className="absolute left-4 h-5 w-5 text-slate-400" />
            <Input
              name="q"
              className="pl-12 h-14 text-lg shadow-lg border-slate-200 rounded-full focus-visible:ring-blue-500"
              placeholder="Nhập từ khóa, số hiệu văn bản hoặc câu hỏi pháp lý..."
            />
            <Button type="submit" className="absolute right-2 rounded-full px-6 bg-blue-600 hover:bg-blue-700">
              Tìm kiếm
            </Button>
          </form>
          <p className="mt-2 text-sm text-slate-500">
            Gợi ý: &quot;Quy định về hóa đơn điện tử&quot;, &quot;Lương tối thiểu vùng 2024&quot;, &quot;Thủ tục giải thể doanh nghiệp&quot;
          </p>
        </div>
      </div>

      {/* Topics Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <FileText className="mr-2 h-5 w-5 text-blue-600" />
          Lĩnh vực phổ biến
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
            >
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-600">{topic.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{topic.count} văn bản</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-600" />
            Văn bản mới cập nhật
          </h2>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {RECENT_DOCS.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {doc.type}
                    </span>
                    <span className="text-sm text-slate-500">{doc.number}</span>
                    <span className="text-sm text-slate-400">•</span>
                    <span className="text-sm text-slate-500">{doc.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-blue-600 cursor-pointer">
                    {doc.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {doc.summary}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <Button variant="outline" size="sm">Chi tiết</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
