'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2025-12-25T13:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 min-w-[100px]"
    >
      <div className="text-4xl md:text-6xl font-bold text-christmas-gold mb-2">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-white/80 text-sm md:text-base uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  )

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          派對倒數計時 ⏰
        </h2>

        <div className="flex justify-center gap-4 flex-wrap">
          <TimeBox value={timeLeft.days} label="天" />
          <TimeBox value={timeLeft.hours} label="小時" />
          <TimeBox value={timeLeft.minutes} label="分鐘" />
          <TimeBox value={timeLeft.seconds} label="秒" />
        </div>
      </motion.div>
    </section>
  )
}
