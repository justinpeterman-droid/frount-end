import { Page } from '../types';

interface TopNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function TopNav({ currentPage, setCurrentPage }: TopNavProps) {
  return (
    <header className="h-16 flex items-center justify-center px-6 bg-white border-b border-stone-200 print:hidden shrink-0 shadow-sm z-20 relative">
      <div className="flex gap-2 p-1 bg-stone-100/80 rounded-xl border border-stone-200/50">
        <button 
          className={`cursor-pointer transition-all px-5 py-2 rounded-lg font-semibold text-sm ${currentPage === 'dashboard' ? 'bg-white text-stone-900 shadow-sm border border-stone-200/60' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50 border border-transparent'}`}
          onClick={() => setCurrentPage('dashboard')}
        >Dashboard</button>
        <button 
          className={`cursor-pointer transition-all px-5 py-2 rounded-lg font-semibold text-sm ${currentPage === 'search' ? 'bg-white text-stone-900 shadow-sm border border-stone-200/60' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50 border border-transparent'}`}
          onClick={() => setCurrentPage('search')}
        >Policy Search</button>
        <button 
          className={`cursor-pointer transition-all px-5 py-2 rounded-lg font-semibold text-sm ${currentPage === 'workstation' ? 'bg-white text-stone-900 shadow-sm border border-stone-200/60' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50 border border-transparent'}`}
          onClick={() => setCurrentPage('workstation')}
        >Report Workstation</button>
      </div>
    </header>
  );
}
