import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Home, ArrowUpRight, Layers, Sun, Grid3x3, Hammer,
  ChefHat, DoorOpen, Car, Archive, Building2, Thermometer, PanelLeft, Plus, X
} from 'lucide-react'

const services = [
  {
    id: 1,
    icon: Home,
    title: 'Totalrenovering',
    short: 'Komplett renovering fra A til Å',
    description: 'Vi tar hånd om hele prosjektet fra planlegging til nøkkelferdig resultat. Totalrenovering av boliger og leiligheter med fokus på kvalitet og presisjon.',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80&fit=crop',
  },
  {
    id: 2,
    icon: ArrowUpRight,
    title: 'Tilbygg',
    short: 'Utvidelse av eksisterende bygg',
    description: 'Profesjonell utvidelse av bolig med tilbygg som matcher eksisterende arkitektur. Vi sørger for sømløs integrasjon og høy byggekvalitet.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fit=crop',
  },
  {
    id: 3,
    icon: Sun,
    title: 'Terrasse og Platting',
    short: 'Eksklusive uteplasser i tre og kompositt',
    description: 'Vi designer og bygger premium terrasser og plattinger i naturtre eller komposittmaterialer. Perfekt tilpasset din bolig og livsstil.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fit=crop',
  },
  {
    id: 4,
    icon: Layers,
    title: 'Gulvlegging',
    short: 'Parkett, laminat og fliser',
    description: 'Fagmessig legging av alle typer gulv. Vi spesialiserer oss på parkett, laminat, fliser og vinyl med presise skjøter og perfekt finish.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80&fit=crop',
  },
  {
    id: 5,
    icon: Building2,
    title: 'Takarbeid',
    short: 'Rehabilitering og nytt tak',
    description: 'Komplett takrskifting og rehabilitering. Vi jobber med alle typer takbelegg og sikrer vanntett og holdbar løsning for din bolig.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fit=crop',
  },
  {
    id: 6,
    icon: ChefHat,
    title: 'Kjøkkenmontering',
    short: 'Presisjonsmonterte kjøkkenløsninger',
    description: 'Profesjonell montering av kjøkken fra alle leverandører. Vi sørger for perfekt passform, nøyaktig nivellering og rene linjer.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop',
  },
  {
    id: 7,
    icon: DoorOpen,
    title: 'Vindu og Dør',
    short: 'Utskifting og nyinstallasjon',
    description: 'Skifte vinduer og dører for bedre energieffektivitet og estetikk. Vi håndterer alt fra enkle utskiftinger til større prosjekter.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop',
  },
  {
    id: 8,
    icon: Car,
    title: 'Garasje',
    short: 'Bygging og rehabilitering av garasjer',
    description: 'Vi bygger nye garasjer eller rehabiliterer eksisterende. Fra enkle løsninger til premium garasjebygg med høy standard.',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c3c6e5b76?w=800&q=80&fit=crop',
  },
  {
    id: 9,
    icon: Archive,
    title: 'Kjeller og Loft',
    short: 'Innredning og oppgradering',
    description: 'Transformerer ubrukte kjellere og loft til funksjonelle og vakre rom. Komplett innredning med isolasjon, elektrisk og overflatebehandling.',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54730d73d?w=800&q=80&fit=crop',
  },
  {
    id: 10,
    icon: Home,
    title: 'Ferdighus',
    short: 'Montering av prefabrikkerte hus',
    description: 'Profesjonell montering av ferdighus fra alle ledende leverandører. Vi sikrer presist og effektivt arbeid fra grunnmur til nøkkel.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fit=crop',
  },
  {
    id: 11,
    icon: Thermometer,
    title: 'Isolering',
    short: 'Energieffektiv isolasjon',
    description: 'Vi utfører profesjonell isolering av vegger, tak og gulv. Forbedre energieffektiviteten og inneklimaet i din bolig med riktig isolering.',
    image: 'https://images.unsplash.com/photo-1581092787765-e3feb951d987?w=800&q=80&fit=crop',
  },
  {
    id: 12,
    icon: PanelLeft,
    title: 'Kledning',
    short: 'Fasadekledning og vedlikehold',
    description: 'Montering og skifte av fasadekledning i alle materialer. Vi gir hjemmet ditt en ny, premium finish som holder i mange år.',
    image: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=800&q=80&fit=crop',
  },
]

function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-[#101010] border border-[#2A2A2A] overflow-hidden cursor-pointer"
      whileHover={{ y: -4 }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Background image on hover */}
      <div className="absolute inset-0 img-zoom opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#050505]/85" />
      </div>

      {/* Red accent line – animates in on hover */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#B83A2F] group-hover:w-full transition-all duration-500" />

      <div className="relative z-10 p-4 sm:p-6 md:p-7">
        {/* Icon + number */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-11 h-11 border border-[#2A2A2A] group-hover:border-[#B83A2F]/40 flex items-center justify-center transition-colors duration-300">
            <Icon size={18} className="text-[#B83A2F]" />
          </div>
          <span className="text-[10px] tracking-[0.3em] text-[#3A3A3A] font-mono">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-medium tracking-wide text-[#F5F5F5] mb-2 group-hover:text-[#F5F5F5] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Short desc */}
        <p className="text-xs text-[#7A7A7A] leading-relaxed mb-4">
          {service.short}
        </p>

        {/* Expand button */}
        <div className="flex items-center justify-between">
          <div className="h-px flex-1 bg-[#2A2A2A] group-hover:bg-[#B83A2F]/20 transition-colors duration-500 mr-4" />
          <motion.button
            className="w-7 h-7 border border-[#2A2A2A] group-hover:border-[#B83A2F]/40 flex items-center justify-center transition-colors duration-300"
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Plus size={12} className="text-[#B83A2F]" />
          </motion.button>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-[#2A2A2A] mt-4">
                <p className="text-xs text-[#7A7A7A] leading-relaxed">{service.description}</p>
                <a
                  href="#contact"
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="inline-flex items-center gap-2 mt-4 text-[10px] tracking-[0.25em] uppercase text-[#B83A2F] hover:text-[#C9473A] transition-colors duration-300"
                >
                  <span>Få Tilbud</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section id="services" className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-[#050505]">
      {/* Subtle background */}
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      <div className="relative z-10 section-padding">
        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20 max-w-xl">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-[#B83A2F]" />
            <span className="section-label">Våre Tjenester</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F5F5] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Alt du trenger
            <br />
            <span className="text-gradient">under ett tak</span>
          </motion.h2>

          <motion.p
            className="text-sm text-[#7A7A7A] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Vi tilbyr et komplett spekter av bygge- og renoveringstjenester. 
            Hvert oppdrag utføres med samme høye standard.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#1A1A1A]">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#2A2A2A] pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm text-[#7A7A7A]">
            Trenger du noe annet? Vi tar på oss de fleste typer byggeprosjekter.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-[#F5F5F5] hover:text-[#B83A2F] transition-colors duration-300 group"
          >
            <span>Kontakt oss</span>
            <div className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
