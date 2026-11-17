import { useState, useCallback } from 'react'
import { readJSON, writeJSON } from '../utils/storage'

const FAV_KEY = 'ngopikampus_favorites'

// useFavorites — daftar id kafe favorit, disimpan di localStorage.
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => readJSON(FAV_KEY, []))

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      writeJSON(FAV_KEY, next)
      return next
    })
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
