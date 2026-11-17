import { User, Hash, Users, Download, Wifi, WifiOff, CheckCircle } from 'lucide-react'

export const PROFILE = {
  nama: 'Muhammad Rayhan Ghifari',
  nim: '21120124140156',
  kelompok: '36',
}

export default function ProfilePage({ pwa }) {
  const { online, canInstall, installed, install } = pwa

  return (
    <section>
      <h1>Profil</h1>

      <div className="profile">
        <div className="avatar" aria-hidden="true">
          {PROFILE.nama
            .split(' ')
            .slice(0, 2)
            .map((w) => w[0])
            .join('')}
        </div>
        <dl>
          <div className="row">
            <User size={18} />
            <div>
              <dt>Nama</dt>
              <dd>{PROFILE.nama}</dd>
            </div>
          </div>
          <div className="row">
            <Hash size={18} />
            <div>
              <dt>NIM</dt>
              <dd>{PROFILE.nim}</dd>
            </div>
          </div>
          <div className="row">
            <Users size={18} />
            <div>
              <dt>Kelompok</dt>
              <dd>{PROFILE.kelompok}</dd>
            </div>
          </div>
        </dl>
      </div>

      <div className="notes">
        <h2>Tentang aplikasi</h2>
        <p>
          NgopiKampus adalah katalog kafe ramah mahasiswa di sekitar Undip Tembalang, dibuat dengan
          React, Vite, dan Progressive Web App untuk Praktikum PPB.
        </p>
        <p className="row status">
          {online ? <Wifi size={16} /> : <WifiOff size={16} />}
          Status: {online ? 'Online' : 'Offline — data tetap tersedia'}
        </p>
        {installed ? (
          <p className="row status">
            <CheckCircle size={16} /> Aplikasi sudah terpasang.
          </p>
        ) : canInstall ? (
          <button type="button" className="btn btn--primary" onClick={install}>
            <Download size={16} /> Install aplikasi
          </button>
        ) : (
          <p className="muted">
            Gunakan menu browser “Install app / Add to Home Screen” untuk memasang aplikasi.
          </p>
        )}
      </div>
    </section>
  )
}
