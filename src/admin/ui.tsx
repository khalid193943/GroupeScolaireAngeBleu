import { ReactNode } from 'react';

export const Field = ({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) => (
  <label className="block"><span className="block text-sm font-semibold text-deep mb-1.5">{label}</span>{children}{hint && <span className="block text-xs text-mute mt-1">{hint}</span>}</label>
);
export const input = 'w-full bg-white border border-line rounded-2xl px-4 h-11 text-[15px] text-deep focus:outline-none focus:border-azure';
export const textarea = `${input} h-auto py-3 min-h-[120px]`;

export const Btn = ({ children, onClick, variant = 'azure', type = 'button', disabled, className = '' }: { children: ReactNode; onClick?: () => void; variant?: 'azure' | 'gold' | 'white' | 'danger'; type?: 'button' | 'submit'; disabled?: boolean; className?: string }) => (
  <button type={type} onClick={onClick} disabled={disabled} className={`btn !h-10 !px-4 text-[14px] ${variant === 'danger' ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100' : `btn-${variant}`} disabled:opacity-50 ${className}`}>{children}</button>
);

export const Panel = ({ children, className = '' }: { children: ReactNode; className?: string }) => <div className={`card p-6 ${className}`}>{children}</div>;

export const Title = ({ title, desc, actions }: { title: string; desc?: string; actions?: ReactNode }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
    <div><h1 className="t-h2">{title}</h1>{desc && <p className="text-mute mt-2 max-w-[60ch]">{desc}</p>}</div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export const Badge = ({ children, tone = 'sky' }: { children: ReactNode; tone?: 'sky' | 'gold' | 'green' | 'red' | 'grey' }) => {
  const t = { sky: 'bg-sky text-azure', gold: 'bg-gold-3 text-[#8a5a00]', green: 'bg-green-50 text-green-700', red: 'bg-red-50 text-red-700', grey: 'bg-cloud text-mute border border-line' }[tone];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${t}`}>{children}</span>;
};

export const Empty = ({ children }: { children: ReactNode }) => <div className="card p-10 text-center text-mute">{children}</div>;

export const Modal = ({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) => open ? (
  <div className="fixed inset-0 z-[80] bg-night/40 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6" onClick={onClose}>
    <div className="bg-white w-full md:max-w-[720px] max-h-[92vh] overflow-y-auto rounded-t-[var(--r-lg)] md:rounded-[var(--r-lg)] p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-6"><h2 className="t-h3">{title}</h2><button onClick={onClose} className="w-9 h-9 rounded-full bg-cloud hover:bg-sky flex items-center justify-center" aria-label="Fermer">✕</button></div>
      {children}
    </div>
  </div>
) : null;

export const fmtDateTime = (iso: string) => { try { return new Date(iso).toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return iso; } };
export const csv = (rows: Record<string, any>[], name: string) => {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]); const esc = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const blob = new Blob(['\ufeff' + [keys.join(';'), ...rows.map((r) => keys.map((k) => esc(r[k])).join(';'))].join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${name}.csv`; a.click();
};
