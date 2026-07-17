import { useState } from 'react';
import { Printer, Copy, Check, RefreshCw, Layers, GripVertical, AlertTriangle } from 'lucide-react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { generateReports } from '../api';

const ReportBox = ({ title, val, set, onCopy, copied }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-xs font-semibold text-stone-500">{title}</label>
      <button
        onClick={onCopy}
        className="text-[10px] font-medium bg-stone-100 px-2.5 py-1 rounded-md text-stone-500 hover:bg-stone-200 hover:text-stone-700 flex items-center gap-1.5 transition-colors border border-stone-200"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
    <textarea
      value={val}
      onChange={(e) => set(e.target.value)}
      className="w-full h-24 min-h-[60px] bg-white border border-stone-200 rounded-lg p-3 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-y placeholder:text-stone-400 transition-all text-stone-800 shadow-sm"
      placeholder={`Enter ${title.toLowerCase()}...`}
    />
  </div>
);

const TemplateBtn = ({ label, active, onClick }: any) => (
  <button
    onClick={() => onClick(label)}
    className={`w-full text-left p-3 rounded-lg text-xs font-medium leading-tight border transition-all ${
      active
        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-800'
    }`}
  >
    {label}
  </button>
);

export default function ReportWorkstation() {
  const [isLoading, setIsLoading] = useState(false);
  const [rawNotes, setRawNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [incidentReport, setIncidentReport] = useState("");
  const [disciplinaryReport, setDisciplinaryReport] = useState("");
  const [activeForm, setActiveForm] = useState("Incident");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [apiError, setApiError] = useState("");
  const [charges, setCharges] = useState<string[]>([]);

  const handleGenerateReports = async () => {
    if (!rawNotes.trim()) return;
    setIsLoading(true);
    setApiError("");
    try {
      const data = await generateReports(rawNotes);
      setSummary(data.reports.supervisor_summary || "");
      setIncidentReport(data.reports.first_person || "");
      setDisciplinaryReport(data.reports.disciplinary || "");
      setCharges(data.charges || []);
      if (data.incident_type) {
        setActiveForm(data.incident_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
      }
    } catch (err: any) {
      setApiError(err.message || "Failed to generate reports. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <div className="flex-1 flex overflow-hidden">
        <PanelGroup orientation="horizontal">
          {/* LEFT COLUMN: PROCESSING HUB */}
          <Panel defaultSize={35} minSize={15} maxSize={90} className="min-w-0 flex flex-col border-r border-stone-200 bg-stone-50 print:hidden overflow-y-auto">
            <div className="flex flex-col h-full p-5 gap-5 min-w-0">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-500">1. Input Field Notes</label>
                <textarea
                  value={rawNotes}
                  onChange={(e) => setRawNotes(e.target.value)}
                  className="w-full h-32 min-h-[80px] bg-white border border-stone-200 rounded-xl p-3.5 text-xs leading-relaxed outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-stone-400 resize-y text-stone-800 shadow-sm"
                  placeholder="Paste raw incident notes here..."
                />
                <button
                  onClick={handleGenerateReports}
                  disabled={isLoading || !rawNotes.trim()}
                  className="w-full h-10 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-xs font-medium rounded-xl text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                      Processing Notes...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={14} /> Generate Report Triplets
                    </>
                  )}
                </button>
                {apiError && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs">
                    <AlertTriangle size={14} />
                    <span>{apiError}</span>
                  </div>
                )}
                {charges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {charges.map((c: string) => (
                      <span key={c} className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-5 pr-1">
                <ReportBox title="A. Executive Summary" val={summary} set={setSummary} onCopy={() => copyToClipboard(summary, 's')} copied={copiedId === 's'} />
                <ReportBox title="B. Incident Narrative" val={incidentReport} set={setIncidentReport} onCopy={() => copyToClipboard(incidentReport, 'i')} copied={copiedId === 'i'} />
                <ReportBox title="C. Disciplinary Referral" val={disciplinaryReport} set={setDisciplinaryReport} onCopy={() => copyToClipboard(disciplinaryReport, 'd')} copied={copiedId === 'd'} />
              </div>
            </div>
          </Panel>

          {/* RESIZE HANDLE */}
          <PanelResizeHandle className="w-1.5 bg-stone-200 hover:bg-blue-400 transition-colors cursor-col-resize print:hidden relative group">
            <div className="absolute inset-y-0 -left-2 -right-2 z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-8 bg-stone-300 rounded shadow-sm group-hover:bg-blue-500 transition-colors opacity-0 group-hover:opacity-100">
              <GripVertical size={12} className="text-white" />
            </div>
          </PanelResizeHandle>

          {/* MIDDLE COLUMN: PREVIEW */}
          <Panel minSize={10} className="min-w-0 bg-stone-100/50 p-6 flex flex-col items-center overflow-auto print:bg-white print:p-0">
            <div className="w-full max-w-[650px] min-h-full bg-white shadow-xl rounded-xl p-8 md:p-10 text-stone-900 flex flex-col print:shadow-none print:max-w-none print:p-8 shrink-0 border border-stone-200">
              {/* DOCUMENT HEADER */}
              <div className="border-b-2 border-stone-800 pb-4 mb-8 text-center relative">
                <h2 className="text-sm font-bold text-stone-500 tracking-wide">Department of Corrections</h2>
                <h3 className="text-xl font-bold uppercase mt-1 text-stone-900">Official Form 837-A</h3>
                <div className="flex justify-between mt-6 text-xs font-semibold text-stone-400">
                  <span>REF: DOC-2024-AI-V</span>
                  <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">DRAFT / UNVERIFIED</span>
                </div>
              </div>

              {/* FORM CONTENT */}
              <div className="flex-1 font-serif text-sm space-y-7 leading-relaxed overflow-hidden">
                <div className="grid grid-cols-2 gap-6 border-b border-stone-200 pb-4">
                  <p><strong className="font-sans text-stone-500 text-xs uppercase tracking-wider block mb-1">Reporting Staff</strong> Sgt. Michael Vance</p>
                  <p><strong className="font-sans text-stone-500 text-xs uppercase tracking-wider block mb-1">Date</strong> {new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">I. Incident Summary</h4>
                  <p className="bg-stone-50/50 p-3 rounded-lg border border-stone-100 min-h-[60px] whitespace-pre-wrap">{summary || ""}</p>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">II. Detailed Narrative</h4>
                  <p className="bg-stone-50/50 p-3 rounded-lg border border-stone-100 min-h-[180px] whitespace-pre-wrap">{incidentReport || ""}</p>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">III. Regulatory Citations</h4>
                  <p className="bg-stone-50/50 p-3 rounded-lg border border-stone-100 min-h-[80px] whitespace-pre-wrap italic">{disciplinaryReport || ""}</p>
                </div>

                {/* SIGNATURE */}
                <div className="mt-16 pt-8 flex justify-between border-t border-stone-300">
                  <div className="w-1/2 mt-4 pt-2 border-t-2 border-stone-800">
                    <p className="font-sans text-[10px] font-bold text-stone-500 uppercase">Officer Signature</p>
                  </div>
                  <div className="w-1/3 mt-4 pt-2 border-t-2 border-stone-800 text-right">
                    <p className="font-sans text-[10px] font-bold text-stone-500 uppercase">Date</p>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* RIGHT COLUMN: CONTROLS */}
      <section className="w-[140px] bg-stone-50 border-l border-stone-200 p-4 flex flex-col shrink-0 print:hidden z-10 shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.05)]">
        <h2 className="text-xs font-semibold text-stone-500 mb-5 flex items-center gap-2">
          <Layers size={14} className="text-blue-500" />
          Templates
        </h2>
        
        <div className="flex flex-col gap-2.5 flex-1">
          <TemplateBtn label="Incident" active={activeForm === "Incident"} onClick={setActiveForm} />
          <TemplateBtn label="Discipline" active={activeForm === "Discipline"} onClick={setActiveForm} />
          <TemplateBtn label="Medical" active={activeForm === "Medical"} onClick={setActiveForm} />
          <TemplateBtn label="Property" active={activeForm === "Property"} onClick={setActiveForm} />
        </div>

        <button
          onClick={() => window.print()}
          className="mt-auto bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-xl flex flex-col items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98] group border border-emerald-500/50"
        >
          <Printer size={28} className="group-hover:rotate-6 transition-transform" />
          <div className="text-center">
            <span className="block text-xs font-bold uppercase mt-1">Print Final</span>
            <span className="text-[9px] font-medium opacity-80 mt-0.5 block">Official Copy</span>
          </div>
        </button>
      </section>
    </>
  );
}
