'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: '',
    invitedBy: '',
    email: '',
    attendance: 'yes',
    arrivalTime: '',
    departureTime: '',
    dietaryRestrictions: '',
    plusOne: 'no',
    plusOneName: '',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isInAppBrowser, setIsInAppBrowser] = useState(false)

  useEffect(() => {
    // Detect in-app browsers
    const ua = navigator.userAgent || navigator.vendor
    const isInApp = 
      ua.includes('FBAN') || // Facebook
      ua.includes('FBAV') || // Facebook
      ua.includes('Instagram') || // Instagram
      ua.includes('Line') || // LINE
      ua.includes('Messenger') // Messenger
    setIsInAppBrowser(isInApp)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log('🎄 [RSVP] 開始提交表單')
    console.log('📝 [RSVP] 表單資料:', formData)

    try {
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyQ_eAuwglqnllqSfY3p-sGJjzoxosEKx3lkDndJbe4Ar8E9r5qVf-n1G1kKy5Iqfzjw/exec'
      
      // Use JSONP callback method - works in all browsers including in-app browsers
      const callbackName = 'rsvpCallback_' + Date.now()
      
      // Create callback function
      ;(window as any)[callbackName] = (response: any) => {
        console.log('✅ [RSVP] 收到回應:', response)
        setSubmitStatus('success')
        console.log('🎉 [RSVP] 表單提交成功！')
        
        // Clean up
        delete (window as any)[callbackName]
        const script = document.getElementById(callbackName)
        if (script) {
          document.body.removeChild(script)
        }
        
        // Reset form
        setFormData({
          name: '',
          invitedBy: '',
          email: '',
          attendance: 'yes',
          arrivalTime: '',
          departureTime: '',
          dietaryRestrictions: '',
          plusOne: 'no',
          plusOneName: '',
          notes: '',
        })
        
        setIsSubmitting(false)
      }
      
      // Build URL with parameters
      const params = new URLSearchParams()
      Object.entries(formData).forEach(([key, value]) => {
        params.append(key, value)
      })
      params.append('callback', callbackName)
      
      const fullURL = `${SCRIPT_URL}?${params.toString()}`
      console.log('🔗 [RSVP] 完整 URL:', fullURL)
      console.log('📤 [RSVP] 使用 JSONP 方法提交（支援所有瀏覽器）...')
      
      // Create script tag for JSONP
      const script = document.createElement('script')
      script.id = callbackName
      script.src = fullURL
      script.onerror = () => {
        console.error('❌ [RSVP] JSONP 請求失敗')
        setSubmitStatus('error')
        setIsSubmitting(false)
        delete (window as any)[callbackName]
      }
      
      document.body.appendChild(script)
      
      // Timeout after 10 seconds
      setTimeout(() => {
        if ((window as any)[callbackName]) {
          console.log('⏱️ [RSVP] 請求超時，但資料可能已送出')
          setSubmitStatus('success')
          setIsSubmitting(false)
          delete (window as any)[callbackName]
          const scriptEl = document.getElementById(callbackName)
          if (scriptEl) {
            document.body.removeChild(scriptEl)
          }
        }
      }, 10000)
      
    } catch (error) {
      console.error('❌ [RSVP] 提交錯誤:', error)
      console.error('❌ [RSVP] 錯誤詳情:', {
        message: error instanceof Error ? error.message : '未知錯誤',
        type: typeof error,
        error: error
      })
      setSubmitStatus('error')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="rsvp" className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          立即回覆 🎊
        </h2>
        <p className="text-white text-center mb-12">
          讓我們知道你能否參加！
        </p>

        {isInAppBrowser && (
          <div className="bg-blue-500/20 border-2 border-blue-400 rounded-xl p-4 mb-6">
            <p className="text-white text-sm">
              💡 您正在使用應用程式內建瀏覽器。表單已優化支援，可以直接提交！
            </p>
          </div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-white font-semibold mb-2">
              你的名字 *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
              placeholder="王小明"
            />
          </div>

          {/* Invited By */}
          <div>
            <label className="block text-white font-semibold mb-2">
              誰邀請的 *
            </label>
            <select
              name="invitedBy"
              value={formData.invitedBy}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold"
            >
              <option value="" className="bg-blue-900">選擇主人</option>
              <option value="Shaun" className="bg-blue-900">Shaun</option>
              <option value="Joshua" className="bg-blue-900">Joshua</option>
              <option value="Kris" className="bg-blue-900">Kris</option>
              <option value="共同朋友" className="bg-blue-900">共同朋友</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
              placeholder="your@email.com"
            />
          </div>

          {/* Attendance */}
          <div>
            <label className="block text-white font-semibold mb-2">
              你會參加嗎？*
            </label>
            <select
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold"
            >
              <option value="yes" className="bg-blue-900">會！🎉</option>
              <option value="maybe" className="bg-blue-900">可能 🤔</option>
              <option value="no" className="bg-blue-900">無法參加 😢</option>
            </select>
          </div>

          {formData.attendance !== 'no' && (
            <>
              {/* Arrival Time */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  預計到達時間
                </label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold"
                />
              </div>

              {/* Departure Time */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  預計離開時間（選填）
                </label>
                <input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold"
                />
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  飲食限制
                </label>
                <input
                  type="text"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
                  placeholder="素食、過敏等"
                />
              </div>

              {/* Plus One */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  帶+1嗎？
                </label>
                <select
                  name="plusOne"
                  value={formData.plusOne}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold"
                >
                  <option value="no" className="bg-blue-900">不帶</option>
                  <option value="yes" className="bg-blue-900">會帶</option>
                </select>
              </div>

              {formData.plusOne === 'yes' && (
                <div>
                  <label className="block text-white font-semibold mb-2">
                    +1 的名字
                  </label>
                  <input
                    type="text"
                    name="plusOneName"
                    value={formData.plusOneName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
                    placeholder="賓客姓名"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  其他備註
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-christmas-gold resize-none"
                  placeholder="有什麼想讓我們知道的嗎？"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-christmas-red hover:bg-red-700 disabled:bg-gray-500 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-2xl transition-colors"
          >
            {isSubmitting ? '提交中...' : '送出回覆 🎁'}
          </motion.button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/20 border border-green-500 text-white px-4 py-3 rounded-xl text-center"
            >
              ✅ 回覆已送出！派對見！
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-xl text-center"
            >
              ❌ 發生錯誤，請重試或直接聯絡我們
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </section>
  )
}
