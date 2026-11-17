import { useState, useEffect, useCallback } from 'react'
import cafeService from '../services/cafeService'

// useCafes — ambil seluruh daftar kafe. Returns { cafes, loading, error, refetch }.
export function useCafes() {
  const [cafes, setCafes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCafes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await cafeService.getCafes()
      setCafes(res.data || [])
    } catch (err) {
      setError(err.message || 'Gagal memuat data kafe.')
      setCafes([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCafes()
  }, [fetchCafes])

  return { cafes, loading, error, refetch: fetchCafes }
}

// useCafeById — ambil satu kafe. Returns { cafe, loading, error }.
export function useCafeById(id) {
  const [cafe, setCafe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    if (!id) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    cafeService
      .getCafeById(id)
      .then((res) => active && setCafe(res.data))
      .catch((err) => {
        if (active) {
          setError(err.message || 'Gagal memuat kafe.')
          setCafe(null)
        }
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [id])

  return { cafe, loading, error }
}

// useCafeMutations — create / update / delete dengan state loading & error.
export function useCafeMutations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = async (fn) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fn()
      return res.data ?? true
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan.')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    createCafe: (payload) => run(() => cafeService.createCafe(payload)),
    updateCafe: (id, payload) => run(() => cafeService.updateCafe(id, payload)),
    deleteCafe: (id) => run(() => cafeService.deleteCafe(id)),
  }
}
