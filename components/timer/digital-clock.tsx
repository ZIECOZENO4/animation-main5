"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BellOff } from "lucide-react"
import { useLocalStorage } from "./use-local-storage"

export default function DigitalClock() {
  const [startTime, setStartTime] = useLocalStorage("clockStartTime", Date.now())
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = now - startTime
      const totalSeconds = Math.floor(diff / 1000) % (4 * 60 * 60) // 4 hours in seconds

      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      setTime({ hours, minutes, seconds })

      // Reset start time if 4 hours have passed
      if (totalSeconds === 0) {
        setStartTime(now)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, setStartTime])

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  return (
    <div className="flex flex-col items-center justify-center text-[#F7F2DA]">
   
      <div className="flex space-x-2 text-2xl tracking-wider  leading-relaxed">
        <motion.div
          key={time.hours}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {formatNumber(time.hours)}
        </motion.div>
        <span>:</span>
        <motion.div
          key={time.minutes}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {formatNumber(time.minutes)}
        </motion.div>
        <span>:</span>
        <motion.div
          key={time.seconds}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {formatNumber(time.seconds)}
        </motion.div>
      </div>
    </div>
  )
}

