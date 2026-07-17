import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { askPolicy, ChatResponse } from '../api';

export default function PolicySearch() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const data: ChatResponse = await askPolicy(query);
      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (err: any) {
      setError(err.message || "Search failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-1/2 p-8 border-r border-stone-200 flex flex-col bg-stone-50/50">
        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">Policy Query</h2>
        {!answer && !isLoading && (
          <div className="flex-1 flex flex-col justify-center items-center text-stone-500 border-2 border-dashed border-stone-200 rounded-2xl mb-6 bg-white p-8">
            <Search size={40} strokeWidth={1.5} className="mb-4 text-stone-300" />
            <p className="text-sm text-center max-w-sm">Try asking: "What is the procedure for use of force and restraints?"</p>
          </div>
        )}
        {isLoading && (
          <div className="flex-1 flex flex-col justify-center items-center mb-6 bg-white rounded-2xl border border-stone-200 p-8">
            <div className="w-8 h-8 border-2 border-stone-200 border-t-blue-600 rounded-full animate-spin mb-4" />
            <p className="text-sm text-stone-500">Searching policies...</p>
          </div>
        )}
        {error && (
          <div className="flex-1 flex items-start mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
            {error}
          </div>
        )}
        {answer && !isLoading && (
          <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-stone-200 p-6 mb-6">
            <div className="text-stone-900 text-sm leading-relaxed whitespace-pre-wrap">{answer}</div>
            {sources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-200">
                <p className="text-xs font-semibold text-stone-500 mb-2">Sources</p>
                {sources.map((s, i) => (
                  <span key={i} className="inline-block text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded mr-1 mb-1 border border-blue-100">{s}</span>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="relative shrink-0">
          <input
            className="w-full bg-white border border-stone-200 p-4 pr-14 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 text-stone-900 placeholder:text-stone-400 transition-colors shadow-sm"
            placeholder="Type your policy question here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors p-2 rounded-lg flex items-center justify-center aspect-square shadow-sm text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-stone-100/50 p-8 overflow-y-auto">
        <h2 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">Policy Document Viewer</h2>
        <div className="bg-white text-stone-900 p-10 min-h-full rounded-2xl shadow-sm border border-stone-200 font-serif leading-relaxed">
          {answer ? (
            <div className="space-y-4 text-base whitespace-pre-wrap">{answer}</div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-stone-400">
              <Search size={32} strokeWidth={1} className="mb-3" />
              <p className="text-sm">Ask a question to see policy results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
