import { Loader, AlertCircle, Heart } from 'lucide-react'
import { useCafes } from '../hooks/useCafes'
import CafeCard from '../components/CafeCard'
import { navigate } from '../hooks/useHashRoute'

export default function FavoritesPage({ favorites, isFavorite, toggleFavorite }) {
  const { cafes, loading, error } = useCafes()
  const list = cafes.filter((c) => favorites.includes(c.id))

  return (
    <section>
      <h1>Kafe Favorit</h1>
      <p className="muted">Tersimpan di perangkat ini dan tetap bisa dibuka offline.</p>

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
      {!loading && !error && list.length === 0 && (
        <div className="state">
          <Heart size={22} />
          <p>Belum ada favorit. Tekan ikon hati di katalog untuk menyimpan kafe.</p>
          <button type="button" className="btn btn--primary btn--sm" onClick={() => navigate('/')}>
            Lihat katalog
          </button>
        </div>
      )}

      <div className="grid">
        {list.map((cafe) => (
          <CafeCard
            key={cafe.id}
            cafe={cafe}
            isFavorite={isFavorite(cafe.id)}
            onToggleFavorite={toggleFavorite}
            onOpen={(id) => navigate(`/kafe/${id}`)}
          />
        ))}
      </div>
    </section>
  )
}
