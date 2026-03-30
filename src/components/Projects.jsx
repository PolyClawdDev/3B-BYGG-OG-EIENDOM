import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, MapPin, Calendar, X, ChevronRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Nytt laminatgulv i leilighet',
    subtitle: '57 kvm – Laminatgulvlegging',
    location: 'Oslo, Grünerløkka',
    date: 'Februar 2025',
    category: 'Gulvlegging',
    area: '57 kvm',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=85&fit=crop',
    detail: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&q=85&fit=crop',
    description: 'Komplett utskifting av eksisterende gulv med premium laminat i 57 kvm moderne leilighet. Inkluderte fjerning av gammelt gulv, utjevning av underlag og profesjonell legging med alle lister og terskelstykker.',
    highlights: ['57 kvm laminatgulv', 'Premium kvalitetsmateriale', 'Inkl. alle lister', 'Ferdig på 2 dager'],
    rating: 5,
  },
  {
    id: 2,
    title: 'Nytt gulv i leilighet',
    subtitle: '62 kvm – Parkett og laminat',
    location: 'Lørenskog, Sentrum',
    date: 'Januar 2025',
    category: 'Gulvlegging',
    area: '62 kvm',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=85&fit=crop',
    detail: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=85&fit=crop',
    description: 'Totalfornyelse av gulv i 62 kvm leilighet med premium laminat. Arbeidet inkluderte komplett riving av gammelt gulv, utjevning og ny legging med presise skjøter og elegant finish.',
    highlights: ['62 kvm total flate', 'Utjevning av underlag', 'Presise skjøter', 'Rask levering'],
    rating: 5,
  },
  {
    id: 3,
    title: 'Gulv og lister i leilighet',
    subtitle: '56 m² – Komplett gulvskifte',
    location: 'Oslo, Nordstrand',
    date: 'Desember 2024',
    category: 'Gulvlegging',
    area: '56 m²',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=85&fit=crop',
    detail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=85&fit=crop',
    description: 'Komplett skifte av gulv og alle lister i 56 m² leilighet. Profesjonelt arbeid med fokus på rene linjer, perfekte hjørner og nøyaktig tilpasning rundt alle dørkarmer og vegger.',
    highlights: ['56 m² ny gulvflate', 'Alle lister skiftet', 'Presise dørkarmer', 'Kjempefornøyd kunde'],
    rating: 5,
  },
]

function ProjectCard({ project, index, onClick }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-[#101010] border border-[#2A2A2A] overflow-hidden cursor-pointer"
      onClick={() => onClick(project)}
      whileHover={{ y: -6 }}
    >
      {/* Image */}
      <div className="relative h-44 sm:h-56 md:h-72 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] tracking-[0.3em] uppercase bg-[#B83A2F] text-[#F5F5F5] px-3 py-1.5">
            {project.category}
          </span>
        </div>

        {/* Area badge */}
        <div className="absolute top-4 right-4">
          <span className="text-[10px] tracking-wide bg-[#050505]/70 text-[#D6D6D6] px-3 py-1.5 backdrop-blur-sm border border-[#2A2A2A]">
            {project.area}
          </span>
        </div>

        {/* Expand overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-[#B83A2F]/10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 border border-[#F5F5F5]/30 flex items-center justify-center">
            <ArrowUpRight size={18} className="text-[#F5F5F5]" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-medium text-[#F5F5F5] mb-1 group-hover:text-[#D6D6D6] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-xs text-[#7A7A7A]">{project.subtitle}</p>
          </div>
          <ChevronRight size={16} className="text-[#B83A2F] mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
        </div>

        <div className="flex items-center gap-4 text-[10px] text-[#5A5A5A] tracking-wide">
          <span className="flex items-center gap-1.5">
            <MapPin size={10} className="text-[#B83A2F]" />
            {project.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={10} className="text-[#B83A2F]" />
            {project.date}
          </span>
        </div>

        {/* Rating stars */}
        <div className="flex items-center gap-1 mt-4 pt-4 border-t border-[#2A2A2A]">
          {Array.from({ length: project.rating }).map((_, i) => (
            <span key={i} className="text-[#B83A2F] text-xs">★</span>
          ))}
          <span className="text-[9px] text-[#7A7A7A] ml-2 tracking-wider">Bekreftet arbeid</span>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 bg-[#101010] border border-[#2A2A2A] max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-none"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 border border-[#2A2A2A] flex items-center justify-center hover:border-[#B83A2F]/40 transition-colors duration-300 bg-[#101010]"
        >
          <X size={14} className="text-[#7A7A7A]" />
        </button>

        {/* Image */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="text-[9px] tracking-[0.3em] uppercase bg-[#B83A2F] text-[#F5F5F5] px-3 py-1.5">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-light text-[#F5F5F5] mb-2">{project.title}</h2>
            <p className="text-sm text-[#7A7A7A]">{project.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-2 text-xs text-[#7A7A7A]">
              <MapPin size={12} className="text-[#B83A2F]" />
              {project.location}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#7A7A7A]">
              <Calendar size={12} className="text-[#B83A2F]" />
              {project.date}
            </div>
            <div className="text-xs text-[#7A7A7A]">
              <span className="text-[#B83A2F]">●</span> {project.area}
            </div>
          </div>

          <p className="text-sm text-[#7A7A7A] leading-relaxed mb-8">{project.description}</p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-[#D6D6D6]">
                <div className="w-1.5 h-1.5 bg-[#B83A2F] flex-shrink-0" />
                {h}
              </div>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300) }}
            className="inline-flex items-center gap-3 bg-[#B83A2F] text-[#F5F5F5] px-6 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-[#C9473A] transition-colors duration-300"
          >
            <span>Få Lignende Prosjekt</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-[#0A0A0A]">
      <div className="absolute top-0 left-0 right-0 h-px divider-red" />

      <div className="section-padding">
        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xl">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-px bg-[#B83A2F]" />
              <span className="section-label">Utvalgte Prosjekter</span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#F5F5F5]"
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Arbeid vi er
              <br />
              <span className="text-gradient">stolte av</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-sm text-[#7A7A7A] max-w-xs leading-relaxed md:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Hvert prosjekt leveres med samme høye standard. 
            Klikk for å se detaljer og bilder.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1A1A]">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1A1A1A]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            { number: '100%', label: 'Fornøyde kunder' },
            { number: '9+', label: 'Fullførte prosjekter' },
            { number: '4.9★', label: 'Gjennomsnittlig rating' },
            { number: '<24t', label: 'Svartid på henvendelser' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#101010] px-6 py-6 text-center">
              <div className="text-2xl md:text-3xl font-light text-[#F5F5F5] mb-1 font-display">{stat.number}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#7A7A7A]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
