import { Coffee, Heart, User, Download, WifiOff } from 'lucide-react'
import { useHashRoute, navigate } from './hooks/useHashRoute'
import { useFavorites } from './hooks/useFavorites'
import { usePwa } from './hooks/usePwa'
import CatalogPage from './pages/CatalogPage'
import DetailPage from './pages/DetailPage'
import CafeFormPage from './pages/CafeFormPage'
import FavoritesPage from './pages/FavoritesPage'
import ProfilePage from './pages/ProfilePage'

const NAV = [
  { path: '/', label: 'Katalog', icon: Coffee },
  { path: '/favorit', label: 'Favorit', icon: Heart },
  { path: '/profil', label: 'Profil', icon: User },
]

export default function App() {
  const route = useHashRoute()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const pwa = usePwa()
  const [first, second] = route.parts

  let page
  if (route.path === '/') {
    page = <CatalogPage isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
  } else if (first === 'kafe' && second) {
    page = <DetailPage id={second} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
  } else if (first === 'tambah') {
    page = <CafeFormPage />
  } else if (first === 'edit' && second) {
    page = <CafeFormPage key={second} id={second} />
  } else if (first === 'favorit') {
    page = (
      <FavoritesPage favorites={favorites} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
    )
  } else if (first === 'profil') {
    page = <ProfilePage pwa={pwa} />
  } else {
    page = (
      <section className="state">
        <h1>Halaman tidak ditemukan</h1>
        <button type="button" className="btn btn--primary" onClick={() => navigate('/')}>
          Ke katalog
        </button>
      </section>
    )
  }

  const activeTab = first === 'favorit' ? '/favorit' : first === 'profil' ? '/profil' : '/'

  return (
    <div className="app">
      <header className="topbar">
        <button type="button" className="brand" onClick={() => navigate('/')}>
          <Coffee size={22} /> NgopiKampus
        </button>
        <nav className="nav-desktop" aria-label="Navigasi utama">
          {NAV.map(({ path, label }) => (
            <button
              key={path}
              type="button"
              className={activeTab === path ? 'active' : ''}
              onClick={() => navigate(path)}
            >
              {label}
              {path === '/favorit' && favorites.length > 0 ? ` (${favorites.length})` : ''}
            </button>
          ))}
        </nav>
        {pwa.canInstall && (
          <button type="button" className="btn btn--sm btn--light" onClick={pwa.install}>
            <Download size={14} /> Install
          </button>
        )}
      </header>

      {!pwa.online && (
        <div className="offline-banner" role="status">
          <WifiOff size={16} /> Kamu sedang offline — data tersimpan tetap bisa diakses.
        </div>
      )}

      <main className="content">{page}</main>

      <nav className="nav-bottom" aria-label="Navigasi bawah">
        {NAV.map(({ path, label, icon: Icon }) => (
          <button
            key={path}
            type="button"
            className={activeTab === path ? 'active' : ''}
            onClick={() => navigate(path)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
