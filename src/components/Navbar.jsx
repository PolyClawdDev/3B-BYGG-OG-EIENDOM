import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Hjem', href: '#hero' },
  { label: 'Tjenester', href: '#services' },
  { label: 'Prosjekter', href: '#projects' },
  { label: 'Om Oss', href: '#about' },
  { label: 'Evalueringer', href: '#testimonials' },
  { label: 'Kontakt', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.3 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (href) => {
    setMenuOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 10)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-[#2A2A2A]/60' : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="section-padding flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); go('#hero') }}
            className="flex items-center group"
            whileHover={{ scale: 1.02 }}
          >
            <img src="/LOGO.png" alt="3B Bygg & Eiendom" className="h-12 md:h-16 w-auto object-contain" />
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); go(link.href) }}
                className={`nav-link text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                  activeSection === link.href.slice(1) ? 'text-[#F5F5F5]' : 'text-[#7A7A7A] hover:text-[#F5F5F5]'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.4 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <motion.a
              href="tel:+4712345678"
              className="hidden md:flex items-center gap-2 text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Phone size={14} className="text-[#B83A2F]" />
              <span className="text-[11px] tracking-wider">Ring Oss</span>
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); go('#contact') }}
              className="hidden lg:flex relative overflow-hidden bg-[#B83A2F] text-[#F5F5F5] px-6 py-2.5 text-[10px] font-medium tracking-[0.25em] uppercase group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-[#C9473A] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-400" />
              <span className="relative z-10">Få Tilbud</span>
            </motion.a>

            {/* Hamburger */}
            <motion.button
              className="lg:hidden text-[#F5F5F5] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute inset-0 blueprint-grid opacity-20" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); go(link.href) }}
                  className="text-3xl font-light tracking-[0.2em] uppercase text-[#F5F5F5]/80 hover:text-[#F5F5F5] transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); go('#contact') }}
                className="mt-4 btn-primary text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                Få Tilbud
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky CTA */}
      <motion.a
        href="#contact"
        onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
        className="fixed bottom-5 right-4 z-50 lg:hidden flex items-center gap-2.5 bg-[#B83A2F] text-[#F5F5F5] px-5 py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase"
        style={{ boxShadow: '0 4px 30px rgba(184,58,47,0.5), 0 0 60px rgba(184,58,47,0.15)' }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 220, damping: 20 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
        <span>Få Tilbud</span>
      </motion.a>
    </>
  )
}
