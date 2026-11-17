export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Ya',
  cancelLabel = 'Batal',
  onConfirm,
  onCancel,
  busy = false,
}) {
  if (!open) return null
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <h2>{title}</h2>
        <p className="muted">{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn btn--outline" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm} disabled={busy}>
            {busy ? 'Memproses…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
