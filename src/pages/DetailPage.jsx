import { ArrowLeft, Heart, Wifi, PlugZap, Clock, MapPin, Pencil, Loader, AlertCircle } from 'lucide-react'
import { useCafeById } from '../hooks/useCafes'
import { navigate } from '../hooks/useHashRoute'
import { formatRupiah } from '../utils/storage'

export default function DetailPage({ id, isFavorite, toggleFavorite }) {
  const { cafe, loading, error } = useCafeById(id)

  return (
    <section>
      <button type="button" className="back" onClick={() => navigate('/')}>
        <ArrowLeft size={18} /> Kembali ke katalog
      </button>

      {loading && (
        <p className="state">
          <Loader size={18} className="spin" /> Memuat…
        </p>
      )}
      {error && (
        <div className="state state--error">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {cafe && (
        <div className="detail">
          <div className="page-head">
            <h1>{cafe.name}</h1>
            <button
              type="button"
              className={`icon-btn ${isFavorite(cafe.id) ? 'icon-btn--active' : ''}`}
              onClick={() => toggleFavorite(cafe.id)}
              aria-label="Favorit"
              aria-pressed={isFavorite(cafe.id)}
            >
              <Heart size={22} fill={isFavorite(cafe.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <p className="price price--big">
            {formatRupiah(cafe.avgPrice)} <span className="muted">rata-rata per orang</span>
          </p>

          <ul className="info">
            <li className="row">
              <MapPin size={16} /> {cafe.area} — {cafe.address}
            </li>
            <li className="row">
              <Clock size={16} /> Buka {cafe.hours}
            </li>
            <li className="row">
              <Wifi size={16} /> WiFi: {cafe.wifi ? 'Tersedia' : 'Tidak ada'}
            </li>
            <li className="row">
              <PlugZap size={16} /> Colokan: {cafe.outlet ? 'Tersedia' : 'Terbatas'}
            </li>
          </ul>

          {cafe.notes && (
            <div className="notes">
              <h2>Catatan</h2>
              <p>{cafe.notes}</p>
            </div>
          )}

          <button
            type="button"
            className="btn btn--primary"
            onClick={() => navigate(`/edit/${cafe.id}`)}
          >
            <Pencil size={16} /> Edit kafe
          </button>
        </div>
      )}
    </section>
  )
}
