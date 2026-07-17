import { AlertTriangle } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-amber-50 text-amber-900 border-b border-amber-200 px-4 py-2 flex items-center justify-center gap-2.5 z-50 print:hidden shrink-0">
      <AlertTriangle size={14} className="text-amber-600" />
      <span className="text-xs font-medium tracking-tight">
        Draft Mode: Please verify AI outputs before finalizing.
      </span>
    </div>
  );
}
