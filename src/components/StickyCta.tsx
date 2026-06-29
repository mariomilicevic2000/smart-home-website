import { useEffect, useState } from 'react'

// A persistent reach-to-the-form CTA on mobile, where the page is long and the
// header button scrolls away. Appears after the hero, hides once the form is in
// view (so it never covers the thing it points at).
export default function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      const form = document.getElementById('prijava')
      const past = window.scrollY > window.innerHeight * 1.1
      const formInView = form
        ? form.getBoundingClientRect().top < window.innerHeight * 0.9
        : false
      setShow(past && !formInView)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-3 transition-all duration-300 sm:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{
        background: 'linear-gradient(0deg, var(--bg-base) 55%, transparent)',
      }}
    >
      <a
        href="#prijava"
        className="btn btn-primary plausible-event-name=Sticky+Waitlist w-full shadow-[0_-6px_24px_rgba(0,0,0,0.18)]"
      >
        Prijavi se na listu čekanja
      </a>
    </div>
  )
}
