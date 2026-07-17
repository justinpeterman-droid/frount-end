import { Search, ChevronRight } from 'lucide-react';

export default function PolicySearch() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-1/2 p-8 border-r border-stone-200 flex flex-col bg-stone-50/50">
        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">Policy Query</h2>
        <div className="flex-1 flex flex-col justify-center items-center text-stone-500 border-2 border-dashed border-stone-200 rounded-2xl mb-6 bg-white p-8">
          <Search size={40} strokeWidth={1.5} className="mb-4 text-stone-300" />
          <p className="text-sm text-center max-w-sm">Try asking: "What is the procedure for cell reassignment refusal according to Title 15?"</p>
        </div>
        <div className="relative shrink-0">
          <input
            className="w-full bg-white border border-stone-200 p-4 pr-14 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 text-stone-900 placeholder:text-stone-400 transition-colors shadow-sm"
            placeholder="Type your query here..."
          />
          <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 transition-colors p-2 rounded-lg flex items-center justify-center aspect-square shadow-sm text-white">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-stone-100/50 p-8 overflow-y-auto">
        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">Policy Document Viewer</h2>
        <div className="bg-white text-stone-900 p-10 min-h-full rounded-2xl shadow-sm border border-stone-200 font-serif leading-relaxed">
          <div className="border-b border-stone-200 pb-4 mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">AR 405.02: INMATE HOUSING</h1>
            <p className="text-stone-500 text-sm font-sans mt-1">Last Updated: October 2023</p>
          </div>
          <div className="space-y-4 text-base">
            <p><strong>Section 1.</strong> Staff shall be responsible for the orderly movement of inmates during housing reassignments. All movements must be logged in the primary unit ledger prior to execution.</p>
            <p className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900">
              <strong>Section 2.</strong> Refusal to comply with housing assignments constitutes a Level 2 Violation. Officers must issue a minimum of two (2) direct verbal orders before initiating disciplinary referral.
            </p>
            <p><strong>Section 3.</strong> If physical relocation is required, a supervisor must be present and the interaction recorded via body-worn camera.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
