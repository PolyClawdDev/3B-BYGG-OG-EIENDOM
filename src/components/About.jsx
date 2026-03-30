import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { CheckCircle2, ArrowUpRight } from 'lucide-react'

const values = [
  'Faglig dyktighet på høyt nivå',
  'Profesjonell kommunikasjon hele veien',
  'Levering til avtalt tid og pris',
  'Premium resultat – hver eneste gang',
  'Oslo og hele Akershus-regionen',
  'Ryddige og respektfulle fagfolk',
]

export default function About() {
  const [titleRef, titleInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [imgRef, imgInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section id="about" ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-[#0A0A0A]">
      <div className="absolute top-0 left-0 right-0 h-px divider-red" />

      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left: Image */}
          <motion.div
            ref={imgRef}
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={imgInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Main image with parallax */}
            <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[3/4] max-h-[320px] sm:max-h-[600px]">
              <motion.img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85&fit=crop"
                alt="3B Bygg håndverk"
                className="w-full h-full object-cover"
                style={{ y: imgY }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
            </div>

            {/* Accent box */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-[#B83A2F] p-4 sm:p-6 hidden sm:block">
              <div className="text-3xl font-light text-[#F5F5F5] font-display">9+</div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#F5F5F5]/70 mt-1">
                Fullførte
                <br />
                Prosjekter
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#B83A2F]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#B83A2F]" />

            {/* Second image - small accent */}
            <div className="absolute -top-6 -right-6 hidden md:block overflow-hidden w-40 h-32 border-4 border-[#0A0A0A]">
              <img
                src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=400&q=80&fit=crop"
                alt="Craftwork detail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <div ref={titleRef} className="order-1 lg:order-2">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-px bg-[#B83A2F]" />
              <span className="section-label">Om 3B Bygg & Eiendom</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-light tracking-tight text-[#F5F5F5] mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Håndverk med
              <br />
              <span className="text-gradient">sjel og presisjon</span>
            </motion.h2>

            <motion.div
              className="space-y-4 text-sm text-[#7A7A7A] leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p>
                3B Bygg & Eiendom AS er et ledende bygge- og renoveringsselskap med base i Oslo. 
                Vi utfører alt fra komplette totalrenoveringer til presise detalj­arbeider – alltid med 
                samme høye standard.
              </p>
              <p>
                Vår filosofi er enkel: vi behandler hvert prosjekt som vårt eget hjem. Det betyr 
                kvalitetsmaterialer, nøyaktig håndverk og et sluttresultat du er stolt av i mange år.
              </p>
              <p>
                Med solid fagkunnskap og et sterkt nettverk av spesialister i Osloregionen kan vi 
                tilby et komplett spekter av tjenester – alt under ett tak.
              </p>
            </motion.div>

            {/* Values list */}
            <motion.div
              className="space-y-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={titleInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                >
                  <div className="w-4 h-px bg-[#B83A2F] flex-shrink-0" />
                  <span className="text-sm text-[#D6D6D6]">{value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="flex items-center gap-3 bg-[#B83A2F] text-[#F5F5F5] px-7 py-3.5 text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9473A] transition-colors duration-300 group"
              >
                <span>Kontakt Oss</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['P', 'S', 'A'].map((letter, i) => (
                    <div key={i} className="w-8 h-8 bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[9px] font-bold text-[#B83A2F]">
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] text-[#F5F5F5]">27 anmeldelser</div>
                  <div className="text-[9px] text-[#7A7A7A]">Alle 5 stjerner</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
