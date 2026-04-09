import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handle = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return { scrollY, isScrolled }
}
