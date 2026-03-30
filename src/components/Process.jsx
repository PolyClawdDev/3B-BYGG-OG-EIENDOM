import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, FileText, Hammer, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Gratis Befaring',
    description: 'Vi kommer til deg for en gratis og uforpliktende befaring. Vi ser på prosjektet, diskuterer dine ønsker og gir deg en realistisk vurdering.',
    icon: Search,
    detail: 'Ingen kostnader, ingen forpliktelser',
  },
  {
    number: '02',
    title: 'Tilbud og Planlegging',
    description: 'Du mottar et detaljert og transparent tilbud. Vi planlegger prosjektet nøye med klare tidsrammer og en tydelig kommunikasjonsplan.',
    icon: FileText,
    detail: 'Fast pris – ingen overraskelser',
  },
  {
    number: '03',
    title: 'Utførelse',
    description: 'Vårt dyktige team gjennomfører arbeidet med høy presisjon. Du holdes oppdatert underveis og vi rydder opp etter oss daglig.',
    icon: Hammer,
    detail: 'Kontinuerlig oppdatering',
  },
  {
    number: '04',
    title: 'Ferdigstillelse',
    description: 'Vi gjennomgår prosjektet sammen med deg og sørger for at du er 100% fornøyd. Ingenting er ferdig til du er helt tilfreds.',
    icon: CheckCircle2,
    detail: '100% tilfredshetsgaranti',
  },
]

function ProcessStep({ step, index, isLast }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Connector line */}
      {!isLast && (
        <motion.div
          className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px z-0"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'left', background: 'linear-gradient(90deg, #B83A2F 0%, rgba(184, 58, 47, 0.2) 100%)' }}
        />
      )}

      {/* Step icon */}
      <div className="relative z-10 mb-6">
        {/* Number */}
        <div className="text-[10px] tracking-[0.3em] text-[#B83A2F] mb-3 font-mono">{step.number}</div>

        {/* Icon circle */}
        <div className="relative">
          <div className="w-20 h-20 bg-[#101010] border border-[#2A2A2A] flex items-center justify-center group-hover:border-[#B83A2F]/40 transition-colors duration-400">
            <Icon size={24} className="text-[#B83A2F]" />
          </div>
          {/* Outer ring */}
          <motion.div
            className="absolute inset-[-6px] border border-[#B83A2F]/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[200px]">
        <h3 className="text-base font-medium text-[#F5F5F5] mb-3 tracking-wide">
          {step.title}
        </h3>
        <p className="text-xs text-[#7A7A7A] leading-relaxed mb-4">
          {step.description}
        </p>
        <div className="text-[9px] tracking-[0.25em] uppercase text-[#B83A2F]">
          {step.detail}
        </div>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-[#050505]">
      <div className="absolute top-0 left-0 right-0 h-px divider-red" />
      {/* Blueprint background */}
      <div className="absolute inset-0 blueprint-grid opacity-15" />

      <div className="relative z-10 section-padding">
        {/* Header */}
        <div ref={titleRef} className="mb-20 md:mb-24 text-center max-w-2xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-[#B83A2F]" />
            <span className="section-label">Slik Jobber Vi</span>
            <div className="w-8 h-px bg-[#B83A2F]" />
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F5F5] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Fra første møte
            <br />
            <span className="text-gradient">til nøkkelferdig</span>
          </motion.h2>

          <motion.p
            className="text-sm text-[#7A7A7A] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Vi har en klar og transparent prosess som sikrer at du alltid vet 
            hva som skjer – fra første kontakt til ferdigstilt prosjekt.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-6 relative">
          {steps.map((step, i) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm text-[#7A7A7A] mb-6">Klar for å starte ditt prosjekt?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-3 bg-[#B83A2F] text-[#F5F5F5] px-10 py-4 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#C9473A] transition-colors duration-300 group"
          >
            <span>Book Gratis Befaring</span>
            <Search size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
