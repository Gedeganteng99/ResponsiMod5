import { useState, useEffect } from 'react'

// usePwa — status online/offline + prompt instalasi PWA.
export function usePwa() {
  const [online, setOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  )
  const [installEvent, setInstallEvent] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    const beforeInstall = (e) => {
      e.preventDefault()
      setInstallEvent(e)
    }
    const onInstalled = () => {
      setInstalled(true)
      setInstallEvent(null)
    }
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    window.addEventListener('beforeinstallprompt', beforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    if (window.matchMedia?.('(display-mode: standalone)').matches) setInstalled(true)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
      window.removeEventListener('beforeinstallprompt', beforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = async () => {
    if (!installEvent) return
    installEvent.prompt()
    await installEvent.userChoice
    setInstallEvent(null)
  }

  return { online, canInstall: Boolean(installEvent), installed, install }
}
