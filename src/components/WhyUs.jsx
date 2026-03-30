import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Clock, MessageSquare, Award } from 'lucide-react'

const reasons = [
  {
    icon: Shield,
    title: 'Høy kvalitet',
    description: 'Vi bruker kun premium materialer og metoder som tåler tidens tann. Hvert detalj behandles med samme presisjon.',
    number: '01',
  },
  {
    icon: Clock,
    title: 'Presis levering',
    description: 'Vi leverer alltid til avtalt tid. Din tid er verdifull – vi respekterer tidsplaner og holder deg oppdatert underveis.',
    number: '02',
  },
  {
    icon: MessageSquare,
    title: 'Tydelig kommunikasjon',
    description: 'Du vet alltid hva som skjer. Klar og åpen kommunikasjon fra første kontakt til ferdigstilt prosjekt.',
    number: '03',
  },
  {
    icon: Award,
    title: 'Erfaring & fagkunnskap',
    description: 'Mange år i bransjen gir oss dyp fagkunnskap. Vi vet hva som kreves for et perfekt resultat – hver gang.',
    number: '04',
  },
]

function ReasonCard({ reason, index }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = reason.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-[#0D0D0D] border border-[#2A2A2A] p-8 md:p-10 overflow-hidden"
      whileHover={{ y: -4, borderColor: 'rgba(184, 58, 47, 0.3)' }}
    >
      {/* Number watermark */}
      <div className="absolute -top-4 -right-2 text-[80px] font-bold text-[#1A1A1A] select-none pointer-events-none leading-none font-display">
        {reason.number}
      </div>

      {/* Top red line */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#B83A2F] group-hover:w-full transition-all duration-600" />

      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-12 h-12 border border-[#2A2A2A] group-hover:border-[#B83A2F]/40 flex items-center justify-center transition-all duration-400">
          <Icon size={20} className="text-[#B83A2F]" />
        </div>
        {/* Subtle glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-12 h-12 bg-[#B83A2F]/5 blur-xl" />
        </div>
      </div>

      <h3 className="text-lg font-medium text-[#F5F5F5] mb-4 tracking-wide">
        {reason.title}
      </h3>

      <p className="text-sm text-[#7A7A7A] leading-relaxed">
        {reason.description}
      </p>

      {/* Bottom accent line */}
      <div className="mt-8 h-px bg-gradient-to-r from-[#B83A2F]/20 to-transparent w-0 group-hover:w-full transition-all duration-700" />
    </motion.div>
  )
}

export default function WhyUs() {
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-[#050505]">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px divider-red" />

      <div className="section-padding">
        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20 max-w-2xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-[#B83A2F]" />
            <span className="section-label">Hvorfor Velge Oss</span>
            <div className="w-8 h-px bg-[#B83A2F]" />
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F5F5] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Det vi lover,
            <br />
            <span className="text-gradient">det vi leverer</span>
          </motion.h2>

          <motion.p
            className="text-sm text-[#7A7A7A] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            4.9 i snitt fra 27 evalueringer er ikke tilfeldig. 
            Det er resultatet av konsekvent fokus på det som betyr noe.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1A1A]">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.number} reason={reason} index={i} />
          ))}
        </div>

        {/* Large quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-[#B83A2F] to-transparent mx-auto mb-8" />
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-[#3A3A3A] italic max-w-3xl mx-auto leading-relaxed">
            "Arbeidet ble gjort til{' '}
            <span className="text-[#7A7A7A]">avtalt tid og pris.</span>{' '}
            Jeg er kjempefornøyd."
          </blockquote>
          <p className="text-xs text-[#B83A2F] tracking-[0.3em] uppercase mt-6">– Siri, Oslo</p>
        </motion.div>
      </div>
    </section>
  )
}
