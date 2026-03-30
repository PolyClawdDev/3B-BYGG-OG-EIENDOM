import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const stats = [
  { value: '4.9', label: 'Rating', suffix: '★', color: true },
  { value: '27', label: 'Evalueringer', suffix: '' },
  { value: '9', label: 'Fullførte Jobber', suffix: '+' },
  { value: 'Oslo', label: '& Omegn', suffix: '', isText: true },
]

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=85&fit=crop',
  'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1920&q=85&fit=crop',
]

const particles = Array.from({ length: 20 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  height: `${Math.random() * 60 + 20}px`,
  animationDuration: `${Math.random() * 10 + 8}s`,
  animationDelay: `${Math.random() * 8}s`,
  opacity: Math.random() * 0.5 + 0.1,
}))

export default function Hero() {
  const containerRef = useRef(null)
  const [imgIdx, setImgIdx] = useState(0)
  const { scrollY } = useScroll()

  const yBg = useTransform(scrollY, [0, 600], [0, 200])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 600], [1, 1.08])

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const headline = 'Bygger kvalitet som varer'.split(' ')

  return (
    <section id="hero" ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background images with parallax */}
      <motion.div className="absolute inset-0" style={{ y: yBg, scale }}>
        {HERO_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === imgIdx ? 1 : 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <img src={src} alt="Construction premium" className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
          </motion.div>
        ))}
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/50 to-[#050505]/90 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/40 z-[1]" />
      <div className="absolute inset-0 blueprint-grid opacity-20 z-[2]" />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        {particles.map((p, i) => (
          <div key={i} className="absolute w-px bg-[#B83A2F]/40 particle" style={p} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center section-padding pt-20 pb-28 sm:pb-32"
        style={{ opacity }}
      >
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="w-8 h-px bg-[#B83A2F]" />
          <span className="section-label">Oslo & Omegn siden 2020</span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.div
            className="flex flex-wrap gap-x-5 gap-y-2"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {headline.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`text-[11vw] xs:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none ${
                  word === 'kvalitet' ? 'text-gradient-red italic' : 'text-[#F5F5F5]'
                }`}
                style={{ display: 'inline-block' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Subheadline */}
        <motion.p
          className="text-base md:text-lg text-[#7A7A7A] max-w-xl leading-relaxed mb-10 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Eksklusive bygge- og renoveringsprosjekter med fokus på{' '}
          <span className="text-[#D6D6D6]">kvalitet, presisjon</span> og moderne håndverk.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="relative overflow-hidden group flex items-center gap-3 bg-[#B83A2F] text-[#F5F5F5] px-8 py-4 text-[11px] font-medium tracking-[0.3em] uppercase"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-[#C9473A] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10">Få Gratis Tilbud</span>
          </motion.a>

          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="relative overflow-hidden group flex items-center gap-3 border border-[#F5F5F5]/20 text-[#F5F5F5] px-8 py-4 text-[11px] font-medium tracking-[0.3em] uppercase"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10">Se Våre Prosjekter</span>
            <ArrowDown size={14} className="relative z-10 rotate-[-90deg]" />
          </motion.a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex items-center gap-0 overflow-x-auto scrollbar-none max-w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="px-4 sm:px-6 py-3 sm:py-4 glass-card border-l border-[#2A2A2A]/80 first:border-l-0 flex-shrink-0">
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl sm:text-2xl font-bold leading-none ${stat.color ? 'text-[#B83A2F]' : 'text-[#F5F5F5]'} font-display`}>
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-sm text-[#B83A2F]">{stat.suffix}</span>
                  )}
                </div>
                <div className="text-[9px] tracking-[0.25em] uppercase text-[#7A7A7A] mt-1">
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && <div className="w-px h-12 bg-[#2A2A2A]" />}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors duration-300"
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-[5]" />
    </section>
  )
}
