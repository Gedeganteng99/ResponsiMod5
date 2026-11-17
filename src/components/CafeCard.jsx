import { Heart, Wifi, PlugZap, Clock, MapPin } from 'lucide-react'
import { formatRupiah } from '../utils/storage'

export default function CafeCard({ cafe, isFavorite, onToggleFavorite, onOpen, children }) {
  return (
    <article className="card">
      <div className="card-top">
        <button type="button" className="card-title" onClick={() => onOpen(cafe.id)}>
          {cafe.name}
        </button>
        <button
          type="button"
          className={`icon-btn ${isFavorite ? 'icon-btn--active' : ''}`}
          onClick={() => onToggleFavorite(cafe.id)}
          aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          aria-pressed={isFavorite}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <p className="muted row">
        <MapPin size={14} /> {cafe.area}
      </p>
      <p className="price">
        {formatRupiah(cafe.avgPrice)} <span className="muted">/ rata-rata</span>
      </p>
      <div className="chips">
        <span className="chip row">
          <Clock size={13} /> {cafe.hours}
        </span>
        {cafe.wifi && (
          <span className="chip chip--ok row">
            <Wifi size={13} /> WiFi
          </span>
        )}
        {cafe.outlet && (
          <span className="chip chip--ok row">
            <PlugZap size={13} /> Colokan
          </span>
        )}
      </div>
      {children}
    </article>
  )
}
