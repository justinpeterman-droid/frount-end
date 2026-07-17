import { FileText, Search, ChevronRight } from 'lucide-react';
import { Page } from '../types';

interface DashboardProps {
  setCurrentPage: (page: Page) => void;
}

export default function Dashboard({ setCurrentPage }: DashboardProps) {
  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto w-full overflow-y-auto">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-2">Welcome back, Michael</h1>
        <p className="text-stone-500 font-medium text-sm">Select a tool to get started</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => setCurrentPage('workstation')}
          className="group bg-white border border-stone-200 p-8 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer shadow-sm"
        >
          <div className="bg-blue-50 text-blue-600 w-14 h-14 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
            <FileText size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2 text-stone-900 tracking-tight">Report Workstation</h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">Convert your raw notes into structured drafts ready for printing.</p>
          <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Open tool <ChevronRight size={18} className="ml-1" />
          </div>
        </div>
        <div
          onClick={() => setCurrentPage('search')}
          className="group bg-white border border-stone-200 p-8 rounded-2xl hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer shadow-sm"
        >
          <div className="bg-emerald-50 text-emerald-600 w-14 h-14 flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform">
            <Search size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2 text-stone-900 tracking-tight">Policy Knowledge</h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">Ask questions and find answers in the policy manuals quickly.</p>
          <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Search policies <ChevronRight size={18} className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
