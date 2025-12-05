'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Details() {
  return (
    <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          派對詳情 📋
        </h2>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">📍</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-3">地點</h3>
              <p className="text-2xl text-christmas-gold font-semibold mb-2">
                桃園機場捷運 A7 捷市達
              </p>
              <a 
                href="https://maps.app.goo.gl/ngq21oJqzqLtDmr86"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-lg mb-3 hover:text-christmas-gold transition-colors inline-flex items-center gap-2 underline decoration-dotted"
              >
                📍 桃園市龜山區文化一路668號19樓之六
                <span className="text-sm">🗺️</span>
              </a>
              <p className="text-white text-base mt-3">
                🚇 機場捷運 A7 捷運站一出站正對面！
              </p>
              <div className="mt-4 bg-orange-500/30 border-2 border-orange-400 rounded-xl p-4">
                <p className="text-white text-base font-semibold">
                  💡 <strong>重要提醒：</strong>您抵達的時候記得訊息 Line Bot 讓我們知道要下去帶您！
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Time */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">🕐</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-3">時間</h3>
              <p className="text-2xl text-christmas-gold font-semibold mb-2">
                下午1點開始
              </p>
              <p className="text-white text-lg">
                隨時進出都可以！想待多久就待多久 😊
              </p>
            </div>
          </div>
        </motion.div>

        {/* Food & Drinks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">🍷</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-3">餐飲</h3>
              <p className="text-white text-lg mb-3">
                可以先吃過正餐再來，我們會準備：
              </p>
              <ul className="text-white space-y-2 ml-4">
                <li>🍷 熱紅酒等飲料</li>
                <li>🍪 Finger food</li>
                <li>🍰 甜品</li>
              </ul>
              <div className="mt-4 bg-green-500/20 border border-green-400/60 rounded-xl p-4">
                <p className="text-white text-base mb-3">
                  🎉 也歡迎帶你喜歡的<span className="text-green-300 font-semibold">小吃、飲料、桌遊、甚至樂器</span>來一起同樂！
                  <span className="text-white text-sm ml-2">（隨緣就好）</span>
                </p>
                <p className="text-white text-sm">
                  🎸 想帶樂器來 jam 的朋友歡迎！
                  <span className="text-yellow-300 text-xs ml-2">⚠️ 場地不提供 PA 級擴大機或音響</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dress Code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-red-500/20 to-green-500/20 backdrop-blur-md rounded-3xl p-8 mb-8 border-2 border-christmas-gold/30"
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">👔</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-3">Dress Code 🎄</h3>
              <p className="text-white text-lg mb-4">
                盡可能有聖誕節氣的服裝都非常好！
              </p>
              <p className="text-white text-base mb-4">
                希望您願意穿<span className="text-yellow-300 font-bold">黃色</span>、
                <span className="text-red-400 font-bold">紅色</span>或是
                <span className="text-green-400 font-bold">綠色</span>為主體、
                或是鮮艷顏色的衣服前來
              </p>
              <div className="bg-white/10 rounded-2xl p-6 mt-4">
                <p className="text-white text-base mb-4">
                  當天的 Host 都會穿上聖誕節醜毛衣 😂
                </p>
                <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={`${process.env.NODE_ENV === 'production' ? '/xmas-party-2025' : ''}/ugly-sweater.webp`}
                    alt="醜毛衣範例"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-white text-sm text-center mt-3">
                  醜毛衣範例 - 越醜越好！
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gift Exchange */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">🎁</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-3">
                交換禮物 <span className="text-lg text-white">（非必須）</span>
              </h3>
              <p className="text-white text-lg mb-4">
                假如你也想體驗交換禮物的活動：
              </p>
              <ul className="text-white space-y-3 ml-4">
                <li>📝 我們會當天選幾個時段進行交換</li>
                <li>🤖 讓各位填寫對禮物的期待</li>
                <li>✨ 用 AI 幫您配對最符合您需求的 Secret Santa</li>
              </ul>
              <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                <p className="text-red-200 text-base font-semibold">
                  ⚠️ 請不要買太貴！好玩就好！
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 mb-8 border border-purple-400/30"
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">🎉</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-4">派對亮點</h3>
              
              <div className="bg-white/10 rounded-2xl p-6 mb-6">
                <p className="text-white text-lg leading-relaxed mb-3">
                  <span className="text-pink-300 font-bold">我們人生第一次舉辦的跨領域派對！</span>
                </p>
                <p className="text-white text-base leading-relaxed">
                  預計會有 <span className="text-purple-300 font-semibold">YouTuber、爵士樂手、投資專家、醫師、律師</span>等亂七八糟背景的朋友參與。
                </p>
                <p className="text-white text-base mt-3 italic">
                  會很好玩嗎？還是會尷尬的很好玩？Let's find out! 😄
                </p>
              </div>

              <ul className="text-white space-y-2">
                <li>✨ 新家導覽</li>
                <li>🎮 遊戲與娛樂</li>
                <li>🎵 美好的音樂氛圍</li>
                <li>🤝 認識有趣的朋友</li>
                <li>📸 拍照打卡</li>
                <li>🎄 濃厚的聖誕氣氛</li>
                <li>🎁 AI 配對交換禮物（選擇性參加）</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
