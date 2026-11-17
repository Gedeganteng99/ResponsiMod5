# NgopiKampus — Katalog Kafe Ramah Mahasiswa (Undip Tembalang)

PWA berbasis React + Vite + vite-plugin-pwa + Axios + lucide-react (sama seperti modul praktikum).

**Pembuat:** Muhammad Rayhan Ghifari · NIM 21120124140156 · Kelompok 36

## Halaman
| Rute | Halaman |
|------|---------|
| `#/` | Katalog (Read + cari/filter/urutkan, Hapus) |
| `#/kafe/:id` | Detail kafe |
| `#/tambah`, `#/edit/:id` | Form Create / Update |
| `#/favorit` | Kafe favorit |
| `#/profil` | Profil (nama, NIM, kelompok) + tombol install |

## Menjalankan
```bash
npm install
npm run dev        # development
npm run build      # build produksi (membuat service worker)
npm run preview    # uji PWA/offline pada build produksi
```

## Deploy ke Vercel
1. `git init && git add . && git commit -m "NgopiKampus"` lalu push ke repo GitHub.
2. vercel.com → **Add New → Project** → import repo.
3. Framework Preset: **Vite** (build `npm run build`, output `dist`) → **Deploy**.
4. Kumpulkan link `https://xxxx.vercel.app`.

## Uji PWA
Buka link Vercel di Chrome → ikon Install di address bar (atau tombol di halaman Profil).
DevTools → Application → Service Workers → centang *Offline* → reload: aplikasi & data tetap tampil.
