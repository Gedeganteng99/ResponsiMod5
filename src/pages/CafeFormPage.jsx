import { useEffect, useState } from 'react'
import { ArrowLeft, Loader, AlertCircle, Save } from 'lucide-react'
import { useCafeById, useCafeMutations } from '../hooks/useCafes'
import { navigate } from '../hooks/useHashRoute'

const EMPTY = {
  name: '',
  area: 'Tembalang',
  address: '',
  avgPrice: 15000,
  hours: '08.00 - 22.00',
  wifi: true,
  outlet: true,
  notes: '',
}

// Satu form untuk Create (id kosong) dan Update (id terisi).
export default function CafeFormPage({ id }) {
  const isEdit = Boolean(id)
  const { cafe, loading: loadingCafe, error: loadError } = useCafeById(id)
  const { createCafe, updateCafe, loading: saving, error: saveError } = useCafeMutations()
  const [form, setForm] = useState(EMPTY)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (cafe) setForm({ ...EMPTY, ...cafe })
  }, [cafe])

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (form.name.trim().length < 3) return setFormError('Nama kafe minimal 3 karakter.')
    if (!form.area.trim()) return setFormError('Area wajib diisi.')
    if (Number(form.avgPrice) < 0 || Number.isNaN(Number(form.avgPrice)))
      return setFormError('Harga rata-rata tidak valid.')

    const payload = {
      name: form.name.trim(),
      area: form.area.trim(),
      address: form.address.trim(),
      avgPrice: Number(form.avgPrice),
      hours: form.hours.trim() || '-',
      wifi: Boolean(form.wifi),
      outlet: Boolean(form.outlet),
      notes: form.notes.trim(),
    }
    const result = isEdit ? await updateCafe(id, payload) : await createCafe(payload)
    if (result) navigate('/')
  }

  return (
    <section>
      <button type="button" className="back" onClick={() => navigate('/')}>
        <ArrowLeft size={18} /> Kembali
      </button>
      <h1>{isEdit ? 'Edit Kafe' : 'Tambah Kafe Baru'}</h1>

      {isEdit && loadingCafe && (
        <p className="state">
          <Loader size={18} className="spin" /> Memuat…
        </p>
      )}
      {isEdit && loadError && (
        <div className="state state--error">
          <AlertCircle size={18} /> {loadError}
        </div>
      )}

      {(formError || saveError) && (
        <div className="toast toast--error">
          <AlertCircle size={18} /> {formError || saveError}
        </div>
      )}

      {(!isEdit || cafe) && (
        <form className="form" onSubmit={onSubmit}>
          <label>
            Nama kafe *
            <input name="name" value={form.name} onChange={onChange} placeholder="mis. Kopi Sudut" required />
          </label>
          <div className="form-row">
            <label>
              Area *
              <input name="area" value={form.area} onChange={onChange} required />
            </label>
            <label>
              Rata-rata harga (Rp) *
              <input
                name="avgPrice"
                type="number"
                min="0"
                step="500"
                value={form.avgPrice}
                onChange={onChange}
                required
              />
            </label>
          </div>
          <label>
            Alamat
            <input name="address" value={form.address} onChange={onChange} />
          </label>
          <label>
            Jam buka
            <input name="hours" value={form.hours} onChange={onChange} placeholder="08.00 - 22.00" />
          </label>
          <div className="form-row">
            <label className="check">
              <input type="checkbox" name="wifi" checked={form.wifi} onChange={onChange} /> Ada WiFi
            </label>
            <label className="check">
              <input type="checkbox" name="outlet" checked={form.outlet} onChange={onChange} /> Banyak colokan
            </label>
          </div>
          <label>
            Catatan
            <textarea name="notes" rows={3} value={form.notes} onChange={onChange} />
          </label>
          <div className="form-actions">
            <button type="button" className="btn btn--outline" onClick={() => navigate('/')} disabled={saving}>
              Batal
            </button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? (
                <>
                  <Loader size={16} className="spin" /> Menyimpan…
                </>
              ) : (
                <>
                  <Save size={16} /> Simpan
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
