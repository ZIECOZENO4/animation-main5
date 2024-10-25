"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function  StatisticsComponent() {
  const [stats, setStats] = useState({
    fasterSweeping: 0,
    marketplaceFees: 0,
    totalGMV: 0,
    totalUsers: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        fasterSweeping: 10,
        marketplaceFees: 0,
        totalGMV: 7.4,
        totalUsers: 324966,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center  px-8 pb-2">
      <motion.div
        className="max-w-3xl w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-6"
          style={{
            color: "#F7F2DA",
            textShadow: "0 0 10px rgba(247, 242, 218, 0.3)",
          }}
          variants={itemVariants}
        >
             <motion.p
        className="mt-2 leading-10 tracking-tight text-[#F7F2DA] text-center sm:leading-none hover:text-gray-500 text-inherit  hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-in-outfont-normal relative"
        whileHover={{
          y: [-2, 2, -2],
          transition: { repeat: Infinity, duration: 0.5 }
        }}
      >
        THE FASTEST TOKEN MARKETPLACE
        <motion.span
          className="absolute inset-0 text-transparent pointer-events-none"
          style={{
            textShadow: `
              0 0 20px rgba(247, 242, 218, 0.7),
              0 0 40px rgba(247, 242, 218, 0.5),
              0 0 60px rgba(247, 242, 218, 0.3)
            `,
            WebkitTextStroke: "2px rgba(247, 242, 218, 0.2)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
            THE FASTEST TOKEN MARKETPLACE
        </motion.span>
      </motion.p>
       
        </motion.h1>
        <motion.div
          className="text-slate-500 text-center my-10 p-4 "
    
          variants={itemVariants}
        >
          <p className="text-lg md:text-xl ">
            Ditch slow. Execute trades faster and make more money on OmniPump.
          </p>
        </motion.div>
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center" variants={containerVariants}>
          {[
            { label: "FASTER SWEEPING", value: stats.fasterSweeping, suffix: "X" },
            { label: "MARKETPLACE FEES", value: stats.marketplaceFees, suffix: "%" },
            { label: "TOTAL GMV", value: stats.totalGMV, suffix: "O", prefix: "$" },
            { label: "TOTAL USERS", value: stats.totalUsers },
          ].map((item, index) => (
            <motion.div key={index} className="p-4 " variants={itemVariants}>
              <motion.p
                className="text-2xl md:text-4xl font-bold mb-2"
                style={{
                  color: "#F7F2DA",
                  textShadow: "0 0 5px rgba(247, 242, 218, 0.2)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 + index * 0.1 }}
              >
                {item.prefix}
                {item.value.toLocaleString()}
                {item.suffix}
              </motion.p>
              <p className="text-xs md:text-sm text-slate-500">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}