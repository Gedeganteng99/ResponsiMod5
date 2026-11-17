import axios from 'axios'

// ---------------------------------------------------------------------------
// Axios instance. Data awal kafe dimuat dari /data/cafes.json (ikut di-precache
// service worker, jadi tetap bisa dibuka saat offline).
// ---------------------------------------------------------------------------
const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Response interceptor: ambil response.data & normalisasi error
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = 'Terjadi kesalahan yang tidak terduga'
    let status = null
    if (error.response) {
      status = error.response.status
      message = error.response.data?.message || `Server error (${status})`
    } else if (error.request) {
      message = 'Tidak dapat menjangkau server. Periksa koneksi internet kamu.'
    } else {
      message = error.message || message
    }
    return Promise.reject({ message, status })
  },
)

export { apiClient, BASE_URL }
