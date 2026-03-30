import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Upload, Phone, Mail, MapPin, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react'

const services = [
  'Totalrenovering', 'Tilbygg', 'Terrasse og platting',
  'Gulvlegging', 'Takarbeid', 'Kjøkkenmontering',
  'Vindu og dør', 'Garasje', 'Kjeller og loft',
  'Ferdighus', 'Isolering', 'Kledning', 'Annet',
]

const areaOptions = [
  'Oslo', 'Lillestrøm', 'Lørenskog', 'Nittedal',
  'Ullensaker', 'Eidsvoll', 'Enebakk', 'Gjerdrum',
  'Nes', 'Nannestad', 'Annet område',
]

export default function Contact() {
  const [titleRef, titleInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [submitted, setSubmitted] = useState(false)
  const [files, setFiles] = useState([])
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    service: '', area: '', message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files || []))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-[#0A0A0A]">
      <div className="absolute top-0 left-0 right-0 h-px divider-red" />
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      <div className="relative z-10 section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Left: Info */}
          <div ref={titleRef}>
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-px bg-[#B83A2F]" />
              <span className="section-label">Kontakt Oss</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-light tracking-tight text-[#F5F5F5] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Klar for ditt
              <br />
              <span className="text-gradient">neste prosjekt?</span>
            </motion.h2>

            <motion.p
              className="text-sm text-[#7A7A7A] leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Send oss en henvendelse og vi kommer tilbake til deg innen 24 timer. 
              Gratis befaring og uforpliktende tilbud.
            </motion.p>

            {/* Contact cards */}
            <motion.div
              className="space-y-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {[
                {
                  icon: Phone,
                  label: 'Telefon',
                  value: 'Ring oss direkte',
                  action: 'tel:+47',
                },
                {
                  icon: Mail,
                  label: 'E-post',
                  value: 'post@3bbygg.no',
                  action: 'mailto:post@3bbygg.no',
                },
                {
                  icon: MapPin,
                  label: 'Adresse',
                  value: 'Sverres gate 17B, 0652 Oslo',
                  action: null,
                },
                {
                  icon: Clock,
                  label: 'Svartid',
                  value: 'Under 24 timer',
                  action: null,
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-4 p-4 bg-[#0D0D0D] border border-[#2A2A2A] group hover:border-[#B83A2F]/30 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={titleInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <div className="w-10 h-10 border border-[#2A2A2A] group-hover:border-[#B83A2F]/40 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <Icon size={15} className="text-[#B83A2F]" />
                    </div>
                    <div>
                      <div className="text-[9px] tracking-[0.25em] uppercase text-[#7A7A7A] mb-0.5">{item.label}</div>
                      {item.action ? (
                        <a href={item.action} className="text-sm text-[#D6D6D6] hover:text-[#B83A2F] transition-colors duration-300">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm text-[#D6D6D6]">{item.value}</div>
                      )}
                    </div>
                    {i < 2 && (
                      <ArrowUpRight size={12} className="ml-auto text-[#3A3A3A] group-hover:text-[#B83A2F] transition-colors duration-300" />
                    )}
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Org number */}
            <motion.div
              className="text-[10px] text-[#3A3A3A] tracking-wider"
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              3B Bygg & Eiendom AS · Org. nr. 936 056 997
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] p-5 sm:p-8 md:p-10 relative">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B83A2F] via-[#C9473A] to-transparent" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-16 h-16 border border-[#B83A2F]/40 flex items-center justify-center mb-6">
                      <CheckCircle2 size={28} className="text-[#B83A2F]" />
                    </div>
                    <h3 className="text-xl font-light text-[#F5F5F5] mb-3">Takk for din henvendelse!</h3>
                    <p className="text-sm text-[#7A7A7A]">Vi svarer deg innen 24 timer.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-sm font-medium text-[#F5F5F5] tracking-wide mb-6">
                      Få Gratis Tilbud
                    </div>

                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label="Navn *"
                        name="name"
                        type="text"
                        placeholder="Ditt navn"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <FormField
                        label="Telefon *"
                        name="phone"
                        type="tel"
                        placeholder="+47 XXX XX XXX"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <FormField
                      label="E-post"
                      name="email"
                      type="email"
                      placeholder="din@epost.no"
                      value={form.email}
                      onChange={handleChange}
                    />

                    {/* Service select */}
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-[#7A7A7A] mb-2">
                        Type Prosjekt *
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#101010] border border-[#2A2A2A] text-[#D6D6D6] px-4 py-3 text-sm focus:outline-none focus:border-[#B83A2F]/50 transition-colors duration-300 appearance-none"
                      >
                        <option value="">Velg tjeneste...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Area select */}
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-[#7A7A7A] mb-2">
                        Område *
                      </label>
                      <select
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#101010] border border-[#2A2A2A] text-[#D6D6D6] px-4 py-3 text-sm focus:outline-none focus:border-[#B83A2F]/50 transition-colors duration-300 appearance-none"
                      >
                        <option value="">Velg område...</option>
                        {areaOptions.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-[#7A7A7A] mb-2">
                        Beskrivelse
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Beskriv prosjektet ditt kort..."
                        className="w-full bg-[#101010] border border-[#2A2A2A] text-[#D6D6D6] px-4 py-3 text-sm focus:outline-none focus:border-[#B83A2F]/50 transition-colors duration-300 resize-none placeholder-[#3A3A3A]"
                      />
                    </div>

                    {/* File upload */}
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-[#7A7A7A] mb-2">
                        Last opp bilder (valgfritt)
                      </label>
                      <label className="flex items-center gap-3 border border-dashed border-[#2A2A2A] hover:border-[#B83A2F]/40 p-4 cursor-pointer transition-colors duration-300 group">
                        <Upload size={16} className="text-[#B83A2F]" />
                        <span className="text-xs text-[#7A7A7A] group-hover:text-[#D6D6D6] transition-colors duration-300">
                          {files.length > 0
                            ? `${files.length} fil(er) valgt`
                            : 'Klikk for å velge bilder'}
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      className="w-full relative overflow-hidden group flex items-center justify-center gap-3 bg-[#B83A2F] text-[#F5F5F5] py-4 text-[11px] font-medium tracking-[0.3em] uppercase mt-2"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="absolute inset-0 bg-[#C9473A] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-400" />
                      <Send size={13} className="relative z-10" />
                      <span className="relative z-10">Send Forespørsel</span>
                    </motion.button>

                    {/* Response time note */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <Clock size={11} className="text-[#B83A2F]" />
                      <span className="text-[10px] text-[#7A7A7A] tracking-wide">
                        Vanlig svartid under 24 timer
                      </span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, name, type, placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-[9px] tracking-[0.25em] uppercase text-[#7A7A7A] mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#101010] border border-[#2A2A2A] text-[#D6D6D6] px-4 py-3 text-sm focus:outline-none focus:border-[#B83A2F]/50 transition-colors duration-300 placeholder-[#3A3A3A]"
      />
    </div>
  )
}
