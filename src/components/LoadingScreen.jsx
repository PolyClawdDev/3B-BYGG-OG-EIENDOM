import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      {/* Logo reveal */}
      <div className="relative z-10 flex flex-col items-center gap-1">
        {/* Logo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src="/LOGO.png"
            alt="3B Bygg & Eiendom"
            className="w-80 h-80 object-contain mb-[-32px]"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-[#7A7A7A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Oslo & Omegn
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-px bg-[#2A2A2A] relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#B83A2F]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.9, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase text-[#3A3A3A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Laster...
        </motion.p>
      </div>
    </motion.div>
  )
}
