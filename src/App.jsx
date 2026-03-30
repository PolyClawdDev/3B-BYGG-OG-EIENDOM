import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import Areas from './components/Areas'
import About from './components/About'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [cursorPos, setCursorPos] = useState({ x: -400, y: -400 })
  const glowRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="bg-[#050505] min-h-screen relative overflow-x-hidden">
      {/* Cursor glow effect */}
      <div
        className="cursor-glow"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
        }}
      />

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Projects />
            <WhyUs />
            <Testimonials />
            <Areas />
            <About />
            <Process />
            <Contact />
          </main>
          <Footer />

        </motion.div>
      )}
    </div>
  )
}
