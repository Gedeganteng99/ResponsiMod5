import { useMemo, useState } from 'react'
import { Plus, Search, Pencil, Trash2, Loader, AlertCircle, RotateCcw } from 'lucide-react'
import { useCafes, useCafeMutations } from '../hooks/useCafes'
import cafeService from '../services/cafeService'
import CafeCard from '../components/CafeCard'
import ConfirmModal from '../components/ConfirmModal'
import { navigate } from '../hooks/useHashRoute'

export default function CatalogPage({ isFavorite, toggleFavorite }) {
  const { cafes, loading, error, refetch } = useCafes()
  const { deleteCafe, loading: deleting, error: deleteError } = useCafeMutations()

  const [search, setSearch] = useState('')
  const [onlyWifi, setOnlyWifi] = useState(false)
  const [onlyOutlet, setOnlyOutlet] = useState(false)
  const [sort, setSort] = useState('newest')
  const [toDelete, setToDelete] = useState(null)

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = cafes.filter(
      (c) =>
        (!q || c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q)) &&
        (!onlyWifi || c.wifi) &&
        (!onlyOutlet || c.outlet),
    )
    if (sort === 'cheap') list = [...list].sort((a, b) => a.avgPrice - b.avgPrice)
    if (sort === 'expensive') list = [...list].sort((a, b) => b.avgPrice - a.avgPrice)
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [cafes, search, onlyWifi, onlyOutlet, sort])

  const confirmDelete = async () => {
    const ok = await deleteCafe(toDelete.id)
    if (ok) {
      setToDelete(null)
      refetch()
    }
  }

  const handleReset = async () => {
    await cafeService.resetCafes()
    refetch()
  }

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Katalog Kafe</h1>
          <p className="muted">Kafe ramah mahasiswa di sekitar Undip Tembalang.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => navigate('/tambah')}>
          <Plus size={18} /> Tambah Kafe
        </button>
      </div>

      <div className="toolbar">
        <label className="search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Cari nama atau area…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Cari kafe"
          />
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Urutkan">
          <option value="newest">Terbaru</option>
          <option value="cheap">Termurah</option>
          <option value="expensive">Termahal</option>
          <option value="name">Nama A–Z</option>
        </select>
        <label className="check">
          <input type="checkbox" checked={onlyWifi} onChange={(e) => setOnlyWifi(e.target.checked)} />
          WiFi
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={onlyOutlet}
            onChange={(e) => setOnlyOutlet(e.target.checked)}
          />
          Colokan
        </label>
      </div>

      {deleteError && (
        <div className="toast toast--error">
          <AlertCircle size={18} /> {deleteError}
        </div>
      )}

      {loading && (
        <p className="state">
          <Loader size={18} className="spin" /> Memuat kafe…
        </p>
      )}

      {error && !loading && (
        <div className="state state--error">
          <AlertCircle size={18} /> {error}
          <button type="button" className="btn btn--outline btn--sm" onClick={refetch}>
            Coba lagi
          </button>
        </div>
      )}

      {!loading && !error && visible.length === 0 && (
        <div className="state">
          <p>Belum ada kafe yang cocok.</p>
          {cafes.length === 0 && (
            <button type="button" className="btn btn--outline btn--sm" onClick={handleReset}>
              <RotateCcw size={14} /> Muat data awal
            </button>
          )}
        </div>
      )}

      <div className="grid">
        {visible.map((cafe) => (
          <CafeCard
            key={cafe.id}
            cafe={cafe}
            isFavorite={isFavorite(cafe.id)}
            onToggleFavorite={toggleFavorite}
            onOpen={(id) => navigate(`/kafe/${id}`)}
          >
            <div className="card-actions">
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => navigate(`/edit/${cafe.id}`)}
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                type="button"
                className="btn btn--danger-ghost btn--sm"
                onClick={() => setToDelete(cafe)}
              >
                <Trash2 size={14} /> Hapus
              </button>
            </div>
          </CafeCard>
        ))}
      </div>

      <ConfirmModal
        open={Boolean(toDelete)}
        title="Hapus kafe?"
        message={`“${toDelete?.name}” akan dihapus dari katalog.`}
        confirmLabel="Hapus"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </section>
  )
}
