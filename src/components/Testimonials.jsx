import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Pauline',
    date: '20. mars 2026',
    service: 'Legge nytt laminatgulv på 57 kvm i leilighet',
    rating: 5,
    text: 'Bra utført arbeid, rask og veldig fin kommunikasjon underveis.',
  },
  {
    id: 2,
    name: 'Siri',
    date: '8. mars 2026',
    service: 'Legging av fliser og parkett med gulvvarme',
    rating: 5,
    text: '3B bygg har avrettet et murgulv og lagt parkett og fliser (med varme) i hhv. stue og gang. Arbeidet ble gjort til avtalt tid og pris. Jeg er kjempefornøyd med nye, flate og stille gulv, og kan varmt anbefale Marcus & co. Flinke, effektive, og lette å forholde seg til.',
  },
  {
    id: 3,
    name: 'Aina',
    date: '13. januar 2026',
    service: 'Legging av nytt gulv i leilighet, inkl. flis i gang',
    rating: 5,
    text: 'La Pergo laminat gulv i stue og kjøkken. God kommunikasjon før, underveis og etter. Marcus og hans kollega var hyggelige, strukturerte og oppleves som effektive. Anbefales de på det sterkeste og samarbeider gjerne igjen!',
  },
  {
    id: 4,
    name: 'Brede',
    date: '10. januar 2026',
    service: 'Bytte gulv i kjøkken og gang, ca. 16 kvm.',
    rating: 5,
    text: 'Rask, dyktig og god pris! Anbefales',
  },
  {
    id: 5,
    name: 'Sigurd',
    date: '4. januar 2026',
    service: 'Legge parkett og sette opp lydisolert lettvegg',
    rating: 5,
    text: 'Utrolig ryddige, hyggelige og effektive, også god på pris! Tok til og med avfall som ikke var deres eget. Svarer raskt og utfører raskt, anbefales på det varmeste!',
  },
  {
    id: 6,
    name: 'Charles',
    date: '16. desember 2025',
    service: 'Riv og bygg vegg, bytt og avrett parkettgulv',
    rating: 5,
    text: 'The craftsmen were efficient and professional to complete the work, and clever to find the best solutions. Communication was easy and the result of the work looks super great!',
  },
  {
    id: 7,
    name: 'Anniken',
    date: '5. desember 2025',
    service: 'Legge Pergo laminat gulv stue og kjøkken',
    rating: 5,
    text: 'De er seriøse og profesjonelle som leverer kvalitet og godt arbeid som avtalt. Ryddige og svært opptatt av å gjøre en god jobb.',
  },
  {
    id: 8,
    name: 'Arne',
    date: '1. november 2025',
    service: 'Nytt gulv i tre rom',
    rating: 5,
    text: 'Full score på sluttresultat, pålitelighet, innsatsvilje og faglig kunnskap.',
  },
  {
    id: 9,
    name: 'Rune',
    date: '14. oktober 2025',
    service: 'Gulvlegging i stue - 42 m²',
    rating: 5,
    text: 'Jobben ble gjennomført raskt og effektivt av hyggelig personell, og ferdigstilt før avtalt tid. Vi er godt fornøyd resultatet.',
  },
  {
    id: 10,
    name: 'Veronica',
    date: '13. oktober 2025',
    service: 'Fjerne gammel parkett og legge ny laminat',
    rating: 5,
    text: 'Vi er veldig fornøyde med sluttresultatet. Jeg kan anbefale Marcus Dodaj bygg på det sterkeste!',
  },
  {
    id: 11,
    name: 'Jostein',
    date: '12. august 2025',
    service: 'Gulvlegging, listverk',
    rating: 5,
    text: 'Marcus og gjengen gjorde en meget god jobb fra start til slutt. De fjernet gammelt gulv, kjøpte inn nye gulv og listverk, og byttet gulvet til avtalt tid og pris. God og ryddig kommunikasjon underveis. Marcus Dodaj Bygg anbefales sterkt!',
  },
  {
    id: 12,
    name: 'Ingrid',
    date: '28. juli 2025',
    service: 'Legge gulv parkett 50 kvm',
    rating: 5,
    text: 'Vi er veldig fornøyde med jobben som ble gjort. Kommunikasjonen med Marcus var tydelig og god hele veien. Arbeidet ble utført profesjonelt og raskt, og prisen var konkurransedyktig.',
  },
  {
    id: 13,
    name: 'David',
    date: '28. februar 2024',
    service: 'Fjerning av gammel og legging av ny parkett og lister',
    rating: 5,
    text: 'Marcus løste oppgaven på en glimrende måte og vi er veldig fornøyde med resultatet. Han er effektiv og løsningsorientert og fant alltid gode løsninger på utfordrende oppgaver. Prisen var også veldig god.',
  },
  {
    id: 14,
    name: 'Mari Skeie',
    date: '1. februar 2024',
    service: 'Legge parkett, ca 47 m2 på Tøyen',
    rating: 5,
    text: 'Veldig godt arbeid og utrolig god service! Og alt til en veldig god pris. Nøye arbeid og ikke lettvinte løsninger. Anbefaler han videre til andre.',
  },
  {
    id: 15,
    name: 'Vegard',
    date: '10. desember 2023',
    service: 'Legge gulv, listing',
    rating: 5,
    text: 'Marcus kom på kort varsel og leverte et godt resultat til en god pris. Anbefaler gjerne til andre.',
  },
]

const ratingBreakdown = [
  { stars: 5, count: 24 },
  { stars: 4, count: 3 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
]

const AVATAR_COLORS = ['#8B3530', '#7A3020', '#6B2E28', '#9A3530', '#7A2E25']

function getInitial(name) {
  return name.charAt(0).toUpperCase()
}

function GoldStars({ count, size = 'md' }) {
  const sizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-xl', xl: 'text-2xl' }
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`${sizes[size]} ${i < count ? 'text-[#F5C842]' : 'text-[#2A2A2A]'}`}
          style={i < count ? { textShadow: '0 0 8px rgba(245, 200, 66, 0.5)' } : {}}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [featured, setFeatured] = useState(0)
  const [direction, setDirection] = useState(1)
  const [titleRef, titleInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const autoRef = useRef(null)

  const resetAuto = () => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setDirection(1)
      setFeatured((p) => (p + 1) % testimonials.length)
    }, 7000)
  }

  const next = () => {
    setDirection(1)
    setFeatured((p) => (p + 1) % testimonials.length)
    resetAuto()
  }

  const prev = () => {
    setDirection(-1)
    setFeatured((p) => (p - 1 + testimonials.length) % testimonials.length)
    resetAuto()
  }

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setDirection(1)
      setFeatured((p) => (p + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(autoRef.current)
  }, [])

  const t = testimonials[featured]

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  return (
    <section id="testimonials" className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-red" />

      <div className="section-padding">

        {/* ── Header ── */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-[#B83A2F]" />
            <span className="section-label">Evalueringer</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F5F5]"
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Hva kundene
              <br />
              <span className="text-gradient">sier om oss</span>
            </motion.h2>

            {/* Aggregate rating */}
            <motion.div
              className="flex items-center gap-8 lg:gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="text-center">
                <div
                  className="text-7xl md:text-8xl font-light leading-none font-display"
                  style={{ color: '#F5C842', textShadow: '0 0 40px rgba(245,200,66,0.2)' }}
                >
                  4.9
                </div>
                <GoldStars count={5} size="lg" />
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#7A7A7A] mt-2">
                  27 evalueringer
                </div>
              </div>

              {/* Breakdown bars */}
              <div className="space-y-2 min-w-[160px]">
                {ratingBreakdown.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-[#7A7A7A] w-3 text-right">{stars}</span>
                    <span className="text-[10px]" style={{ color: '#F5C842' }}>★</span>
                    <div className="flex-1 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: count > 0 ? '#F5C842' : '#1A1A1A' }}
                        initial={{ width: 0 }}
                        animate={titleInView ? { width: `${(count / 27) * 100}%` } : { width: 0 }}
                        transition={{ duration: 0.9, delay: 0.4 + (5 - stars) * 0.08 }}
                      />
                    </div>
                    <span className="text-[10px] text-[#5A5A5A] w-4">{count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative bg-[#0D0D0D] border border-[#2A2A2A] overflow-hidden">
            {/* Gold top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, #F5C842 0%, rgba(245,200,66,0.15) 70%, transparent 100%)' }}
            />

            {/* Slide area */}
            <div className="min-h-[260px] md:min-h-[230px]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={t.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="p-5 sm:p-8 md:p-12"
                >
                  {/* Faint quote watermark */}
                  <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-[0.07] pointer-events-none">
                    <Quote size={64} style={{ color: '#F5C842' }} />
                  </div>

                  <GoldStars count={t.rating} size="lg" />

                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-[#E0E0E0] leading-relaxed mt-4 mb-6 sm:mb-8 italic max-w-3xl">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 flex items-center justify-center text-[#F5F5F5] font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: AVATAR_COLORS[t.id % AVATAR_COLORS.length] }}
                    >
                      {getInitial(t.name)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#F5F5F5]">{t.name}</div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                        <span className="text-[10px] text-[#7A7A7A]">{t.date}</span>
                        <span className="w-1 h-1 rounded-full bg-[#3A3A3A]" />
                        <span className="text-[10px] text-[#B83A2F]">{t.service}</span>
                      </div>
                    </div>
                    <div className="ml-auto hidden sm:block">
                      <span className="text-[11px] text-[#3A3A3A] font-mono">
                        {String(featured + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
              <div className="flex items-center justify-between px-5 sm:px-8 md:px-12 pb-5 sm:pb-7 gap-4 border-t border-[#161616] pt-4">
              {/* Pill dots */}
              <div className="flex items-center gap-1.5 flex-wrap flex-1">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > featured ? 1 : -1)
                      setFeatured(i)
                      resetAuto()
                    }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === featured ? '22px' : '6px',
                      height: '6px',
                      backgroundColor: i === featured ? '#F5C842' : '#2A2A2A',
                    }}
                    aria-label={`Evaluering ${i + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <motion.button
                  onClick={prev}
                  className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#7A7A7A] transition-all duration-300 hover:border-[#F5C842]/40 hover:text-[#F5C842]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={16} />
                </motion.button>
                <motion.button
                  onClick={next}
                  className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#7A7A7A] transition-all duration-300 hover:border-[#F5C842]/40 hover:text-[#F5C842]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
