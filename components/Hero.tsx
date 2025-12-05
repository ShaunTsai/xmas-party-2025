'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1.5, bounce: 0.5 }}
          className="text-9xl mb-8"
        >
          🎄
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6"
        >
          <span className="text-white text-8xl md:text-9xl">聖誕</span>
          <br />
          <span className="text-christmas-gold">喬遷派對</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-2xl md:text-3xl text-white mb-4"
        >
          誠摯邀請您參加我們的慶祝派對！
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-white"
        >
          <p className="mb-2">📅 2025年12月25日</p>
          <p>🕐 下午1點開始</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-christmas-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-2xl"
          >
            立即回覆 🎁
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
