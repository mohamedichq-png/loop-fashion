import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="toast-notice">
      {toast.type === 'success' && <CheckCircle2 size={18} style={{ color: '#8FA88A', flexShrink: 0 }} />}
      {toast.type === 'info' && <Info size={18} style={{ color: '#F5F1E8', flexShrink: 0 }} />}
      {toast.type === 'warning' && <AlertTriangle size={18} style={{ color: '#A65D43', flexShrink: 0 }} />}
      <span style={{ fontWeight: 400 }}>{toast.message}</span>
    </div>
  );
}
