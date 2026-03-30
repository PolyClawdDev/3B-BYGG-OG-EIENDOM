import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin } from 'lucide-react'

const areas = [
  { id: 'oslo', name: 'Oslo', x: 42, y: 55, primary: true },
  { id: 'lillestrøm', name: 'Lillestrøm', x: 58, y: 48, primary: false },
  { id: 'lørenskog', name: 'Lørenskog', x: 55, y: 57, primary: false },
  { id: 'nittedal', name: 'Nittedal', x: 45, y: 38, primary: false },
  { id: 'ullensaker', name: 'Ullensaker', x: 60, y: 28, primary: false },
  { id: 'eidsvoll', name: 'Eidsvoll', x: 58, y: 18, primary: false },
  { id: 'enebakk', name: 'Enebakk', x: 62, y: 65, primary: false },
  { id: 'gjerdrum', name: 'Gjerdrum', x: 52, y: 35, primary: false },
  { id: 'nes', name: 'Nes', x: 72, y: 30, primary: false },
  { id: 'nannestad', name: 'Nannestad', x: 48, y: 25, primary: false },
]

export default function Areas() {
  const [hoveredArea, setHoveredArea] = useState(null)
  const [titleRef, titleInView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-[#050505]">
      <div className="absolute top-0 left-0 right-0 h-px divider-red" />

      <div className="section-padding">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: Text content */}
          <div ref={titleRef} className="flex-1 max-w-md">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-px bg-[#B83A2F]" />
              <span className="section-label">Dekningsområde</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-light tracking-tight text-[#F5F5F5] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Oslo &
              <br />
              <span className="text-gradient">hele regionen</span>
            </motion.h2>

            <motion.p
              className="text-sm text-[#7A7A7A] leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Vi utfører bygge- og renoveringsoppdrag i Oslo og hele Akershus-regionen.
              Uansett hvor du bor i området – vi kommer til deg.
            </motion.p>

            {/* Area list */}
            <motion.div
              className="grid grid-cols-2 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {areas.map((area, i) => (
                <motion.div
                  key={area.id}
                  className={`flex items-center gap-2.5 p-3 border transition-all duration-300 cursor-default ${
                    hoveredArea === area.id
                      ? 'border-[#B83A2F]/40 bg-[#B83A2F]/5'
                      : area.primary
                      ? 'border-[#B83A2F]/20 bg-[#101010]'
                      : 'border-[#2A2A2A] bg-[#0D0D0D]'
                  }`}
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={titleInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.04 }}
                >
                  <MapPin size={10} className={area.primary ? 'text-[#B83A2F]' : 'text-[#5A5A5A]'} />
                  <span className={`text-[11px] tracking-wide ${
                    area.primary ? 'text-[#F5F5F5]' : 'text-[#7A7A7A]'
                  }`}>
                    {area.name}
                  </span>
                  {area.primary && (
                    <span className="ml-auto text-[8px] tracking-[0.2em] uppercase text-[#B83A2F]">Primær</span>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 p-4 border border-[#2A2A2A] bg-[#0D0D0D]"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <p className="text-xs text-[#7A7A7A] leading-relaxed">
                <span className="text-[#B83A2F] font-medium">Ikke på listen?</span>{' '}
                Ta kontakt – vi vurderer alle forespørsler utenfor primærområdet.
              </p>
            </motion.div>
          </div>

          {/* Right: Map visualization */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Map container */}
            <div className="relative w-full aspect-square max-w-xs sm:max-w-sm lg:max-w-lg mx-auto bg-[#0D0D0D] border border-[#2A2A2A] overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0"
                style={{
                  backgroundImage: 'linear-gradient(rgba(184,58,47,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(184,58,47,0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Concentric circles from Oslo */}
              {[15, 28, 42, 55].map((r, i) => (
                <div
                  key={i}
                  className="absolute border border-[#B83A2F]/10 rounded-full"
                  style={{
                    width: `${r * 2}%`,
                    height: `${r * 2}%`,
                    left: `${42 - r}%`,
                    top: `${55 - r}%`,
                  }}
                />
              ))}

              {/* Area markers */}
              {areas.map((area) => (
                <motion.div
                  key={area.id}
                  className="absolute"
                  style={{ left: `${area.x}%`, top: `${area.y}%` }}
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                >
                  {/* Outer pulse ring */}
                  <motion.div
                    className={`absolute rounded-full border ${
                      area.primary ? 'border-[#B83A2F]/50 w-8 h-8 -translate-x-4 -translate-y-4' : 'border-[#B83A2F]/20 w-5 h-5 -translate-x-2.5 -translate-y-2.5'
                    }`}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: Math.random() * 2 }}
                  />

                  {/* Dot */}
                  <div
                    className={`rounded-full cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
                      area.primary ? 'w-3.5 h-3.5 bg-[#B83A2F]' :
                      hoveredArea === area.id ? 'w-2.5 h-2.5 bg-[#B83A2F]' :
                      'w-1.5 h-1.5 bg-[#B83A2F]/60'
                    }`}
                  />

                  {/* Tooltip */}
                  {hoveredArea === area.id && (
                    <motion.div
                      className="absolute z-10 -translate-x-1/2 -translate-y-full -top-3 whitespace-nowrap"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-[#101010] border border-[#B83A2F]/30 px-3 py-1.5">
                        <div className="text-[10px] text-[#F5F5F5] font-medium">{area.name}</div>
                        <div className="text-[8px] text-[#B83A2F] tracking-wider">Vi utfører oppdrag her</div>
                      </div>
                      <div className="w-px h-2 bg-[#B83A2F] mx-auto" />
                    </motion.div>
                  )}

                  {/* Label for primary */}
                  {area.primary && (
                    <div className="absolute left-3 top-0 -translate-y-1/2 whitespace-nowrap">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[#F5F5F5] font-medium">Oslo</span>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Corner labels */}
              <div className="absolute top-3 left-3 text-[8px] text-[#3A3A3A] tracking-widest uppercase">Akershus</div>
              <div className="absolute bottom-3 right-3 text-[8px] text-[#3A3A3A] tracking-widest uppercase">Østfold</div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#B83A2F] rounded-full" />
                <span className="text-[10px] text-[#7A7A7A] tracking-wider">Primærområde</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#B83A2F]/60 rounded-full" />
                <span className="text-[10px] text-[#7A7A7A] tracking-wider">Dekningsområde</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
