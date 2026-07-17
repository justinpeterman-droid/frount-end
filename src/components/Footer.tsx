export default function Footer() {
  return (
    <footer className="h-8 bg-[#090D16] border-t border-slate-800/60 flex justify-between items-center px-6 print:hidden shrink-0">
      <div className="flex items-center gap-4 text-[10px] font-medium text-slate-500">
        <span className="flex items-center gap-1.5">DB STATUS <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span><span className="text-slate-400">ONLINE</span></span>
        <span>VERSION: 2.4.1-STABLE</span>
      </div>
      <div className="flex items-center gap-4 text-[10px] font-medium text-slate-500">
        <span className="hover:text-slate-300 cursor-pointer transition-colors">Security Center</span>
        <span className="hover:text-slate-300 cursor-pointer transition-colors">Institutional Privacy</span>
      </div>
    </footer>
  );
}
