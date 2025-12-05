'use client'

import { motion } from 'framer-motion'

export default function Hosts() {
  const hosts = [
    { name: 'Shaun Tsai', emoji: '👨‍💻', color: 'from-blue-500 to-purple-500' },
    { name: 'Joshua Shih', emoji: '🎸', color: 'from-green-500 to-teal-500' },
    { name: 'Kris Chiu', emoji: '🎨', color: 'from-pink-500 to-rose-500' },
  ]

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          派對主人 🎉
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {hosts.map((host, index) => (
            <motion.div
              key={host.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative"
            >
              <div className={`bg-gradient-to-br ${host.color} rounded-3xl p-8 text-center shadow-2xl`}>
                <div className="text-7xl mb-4 animate-float">{host.emoji}</div>
                <h3 className="text-3xl font-bold text-white mb-2">{host.name}</h3>
                <div className="h-1 w-20 bg-white/50 mx-auto rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
