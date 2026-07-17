const API_BASE = import.meta.env.VITE_API_URL || 'https://prison-policy-ai-403037827694.us-central1.run.app';

export interface ReportResponse {
  incident_type: string;
  forms_required: string[];
  charges: string[];
  reports: {
    supervisor_summary: string;
    first_person: string;
    disciplinary?: string;
  };
}

export interface ChatResponse {
  answer: string;
  sources: string[];
}

export async function generateReports(notes: string): Promise<ReportResponse> {
  const res = await fetch(`${API_BASE}/api/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Server error: ${res.status}`);
  }
  return res.json();
}

export async function askPolicy(question: string): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Server error: ${res.status}`);
  }
  return res.json();
}
