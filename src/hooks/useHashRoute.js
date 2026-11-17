import { useState, useEffect } from 'react'

// Router sederhana berbasis hash (#/path) — tanpa dependensi tambahan, aman
// untuk hosting statis (Vercel) dan saat offline.
const parse = () => {
  const hash = window.location.hash.replace(/^#/, '') || '/'
  const parts = hash.split('/').filter(Boolean)
  return { path: '/' + parts.join('/'), parts }
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onChange = () => {
      setRoute(parse())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

export const navigate = (path) => {
  window.location.hash = path
}
