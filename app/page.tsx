'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Snowfall from '@/components/Snowfall'
import Hero from '@/components/Hero'
import Countdown from '@/components/Countdown'
import Details from '@/components/Details'
import RSVPForm from '@/components/RSVPForm'
import Hosts from '@/components/Hosts'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>
      
      <Snowfall />
      
      <div className="relative z-10">
        <Hero />
        <Countdown />
        <Hosts />
        <Details />
        <RSVPForm />
        
        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center py-12 text-white/60"
        >
          <p>用心為朋友和家人準備 ❤️</p>
          <p className="text-sm mt-2">聖誕節見！🎄</p>
        </motion.footer>
      </div>
    </main>
  )
}
