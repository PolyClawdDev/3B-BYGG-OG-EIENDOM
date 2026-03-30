import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, MapPin, ArrowUpRight, Instagram, Facebook } from 'lucide-react'

const serviceLinks = [
  'Totalrenovering', 'Tilbygg', 'Terrasse og platting',
  'Gulvlegging', 'Takarbeid', 'Kjøkkenmontering',
  'Vindu og dør', 'Garasje',
]

const areas = [
  'Oslo', 'Lillestrøm', 'Lørenskog', 'Nittedal',
  'Ullensaker', 'Eidsvoll', 'Enebakk', 'Gjerdrum',
]

export default function Footer() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#050505] border-t border-[#1A1A1A]">
      {/* Top CTA banner */}
      <div className="bg-[#B83A2F] py-5">
        <div className="section-padding flex flex-col sm:flex-row items-center justify-between gap-3 py-1 sm:py-0">
          <p className="text-sm font-light text-[#F5F5F5] text-center sm:text-left">
            Klar for å starte prosjektet ditt? Vi tilbyr gratis befaring i hele Osloregionen.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="flex items-center gap-2 bg-[#F5F5F5] text-[#B83A2F] px-6 py-2.5 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-[#050505] hover:text-[#F5F5F5] transition-all duration-300 whitespace-nowrap"
          >
            <span>Få Gratis Tilbud</span>
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div ref={ref} className="section-padding py-16 md:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/LOGO.png"
                alt="3B Bygg & Eiendom"
                className="h-24 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-[#7A7A7A] leading-relaxed mb-8 max-w-[220px]">
              Eksklusive bygge- og renoveringsprosjekter i Oslo og omegn. Kvalitet som varer.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              {[
                { icon: MapPin, text: 'Sverres gate 17B, 0652 Oslo' },
                { icon: Phone, text: 'Ring oss', href: 'tel:+47' },
                { icon: Mail, text: 'post@3bbygg.no', href: 'mailto:post@3bbygg.no' },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon size={11} className="text-[#B83A2F] mt-0.5 flex-shrink-0" />
                  {href ? (
                    <a href={href} className="text-xs text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors duration-300">
                      {text}
                    </a>
                  ) : (
                    <span className="text-xs text-[#7A7A7A]">{text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 border border-[#2A2A2A] hover:border-[#B83A2F]/40 flex items-center justify-center text-[#7A7A7A] hover:text-[#F5F5F5] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-[#2A2A2A] hover:border-[#B83A2F]/40 flex items-center justify-center text-[#7A7A7A] hover:text-[#F5F5F5] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-[9px] tracking-[0.3em] uppercase text-[#B83A2F] mb-6">Tjenester</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="flex items-center gap-2 text-xs text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors duration-300 group"
                  >
                    <div className="w-2 h-px bg-[#3A3A3A] group-hover:bg-[#B83A2F] transition-colors duration-300 group-hover:w-3 transition-all" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Areas */}
          <div>
            <h4 className="text-[9px] tracking-[0.3em] uppercase text-[#B83A2F] mb-6">Områder</h4>
            <ul className="space-y-2.5">
              {areas.map((a) => (
                <li key={a}>
                  <a
                    href="#areas"
                    onClick={(e) => { e.preventDefault(); document.querySelector('#areas')?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="flex items-center gap-2 text-xs text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors duration-300 group"
                  >
                    <div className="w-2 h-px bg-[#3A3A3A] group-hover:bg-[#B83A2F] transition-colors duration-300" />
                    {a}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Navigation */}
          <div>
            <h4 className="text-[9px] tracking-[0.3em] uppercase text-[#B83A2F] mb-6">Navigasjon</h4>
            <ul className="space-y-2.5 mb-10">
              {[
                { label: 'Hjem', href: '#hero' },
                { label: 'Tjenester', href: '#services' },
                { label: 'Prosjekter', href: '#projects' },
                { label: 'Om Oss', href: '#about' },
                { label: 'Evalueringer', href: '#testimonials' },
                { label: 'Kontakt', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="flex items-center gap-2 text-xs text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors duration-300 group"
                  >
                    <div className="w-2 h-px bg-[#3A3A3A] group-hover:bg-[#B83A2F] transition-colors duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Rating */}
            <div className="p-4 border border-[#2A2A2A] bg-[#0D0D0D]">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl font-light text-[#F5F5F5] font-display">4.9</span>
                <span className="text-[#B83A2F]">★</span>
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#7A7A7A]">
                27 evalueringer
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#3A3A3A] tracking-wider">
            <span>© {new Date().getFullYear()} 3B Bygg & Eiendom AS</span>
            <span>·</span>
            <span>Org. nr. 936 056 997</span>
            <span>·</span>
            <span>Sverres gate 17B, 0652 Oslo</span>
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#7A7A7A] hover:text-[#F5F5F5] transition-colors duration-300 group"
            whileHover={{ y: -2 }}
          >
            <span>Tilbake til toppen</span>
            <ArrowUpRight size={11} className="rotate-[-45deg] group-hover:translate-y-[-2px] transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
