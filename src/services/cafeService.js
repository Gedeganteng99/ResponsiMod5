import { apiClient } from '../config/api'
import { readJSON, writeJSON, makeId } from '../utils/storage'

const CAFES_KEY = 'ngopikampus_cafes'

// ---------------------------------------------------------------------------
// CafeService — CRUD kafe.
// Data awal (seed) diambil lewat Axios dari /data/cafes.json, lalu disimpan ke
// localStorage. Setelah itu semua Create / Update / Delete memodifikasi
// localStorage, sehingga data persisten & bekerja penuh saat offline.
// ---------------------------------------------------------------------------
class CafeService {
  async getCafes() {
    const stored = readJSON(CAFES_KEY)
    if (Array.isArray(stored)) return { success: true, data: stored }

    const seed = await apiClient.get('/data/cafes.json')
    const list = Array.isArray(seed) ? seed : []
    writeJSON(CAFES_KEY, list)
    return { success: true, data: list }
  }

  async getCafeById(id) {
    const { data } = await this.getCafes()
    const found = data.find((c) => c.id === id)
    if (!found) throw new Error('Kafe tidak ditemukan.')
    return { success: true, data: found }
  }

  async createCafe(payload) {
    const { data } = await this.getCafes()
    const created = { ...payload, id: makeId(), createdAt: new Date().toISOString() }
    writeJSON(CAFES_KEY, [created, ...data])
    return { success: true, data: created }
  }

  async updateCafe(id, payload) {
    const { data } = await this.getCafes()
    const idx = data.findIndex((c) => c.id === id)
    if (idx === -1) throw new Error('Kafe tidak ditemukan.')
    const updated = { ...data[idx], ...payload, id, updatedAt: new Date().toISOString() }
    const next = [...data]
    next[idx] = updated
    writeJSON(CAFES_KEY, next)
    return { success: true, data: updated }
  }

  async deleteCafe(id) {
    const { data } = await this.getCafes()
    writeJSON(CAFES_KEY, data.filter((c) => c.id !== id))
    return { success: true }
  }

  // Kembalikan ke data awal dari cafes.json
  async resetCafes() {
    try {
      localStorage.removeItem(CAFES_KEY)
    } catch {
      /* abaikan */
    }
    return this.getCafes()
  }
}

export default new CafeService()
