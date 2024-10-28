"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  { name: "PARADIGM", logo: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" },
  { name: "6529", logo: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" },
  { name: "KEYBOARD MONKEY", logo: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" },
  { name: "ZENECA", logo: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" },
  { name: "EGIRL CAPITAL", logo: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" },
  { name: "DEEZE", logo: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" },
  { name: "COZOMO", logo: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" },
  { name: "DHOF", logo: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" },
]

// Updated SVG with more densely packed dots
const dotPattern = `data:image/svg+xml;base64,${btoa(
  '<svg width="4" height="4" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="0.5" fill="#ffffff" opacity="0.3"/></svg>'
)}`

export default function SuppotersComponent() {
  return (
    <div className="h-auto flex items-center justify-center p-8">
      <div className="w-full max-w-5xl">
        <motion.div
          className="bg-black relative overflow-hidden border-2 border-slate-800"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-16"
            style={{ backgroundImage: `url(${dotPattern})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ backgroundImage: `url(${dotPattern})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.div
            className="relative"
            style={{
              backgroundImage: `url(${dotPattern})`,
              backgroundSize: '4px 4px',
              backgroundRepeat: 'repeat',
            }}
          >
            <motion.h2
              className="text-[#F7F2DA] text-3xl p-6 font-bold text-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                textShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff",
                letterSpacing: "4px",
              }}
            >
              TRUSTED AND BACKED BY
            </motion.h2>
          </motion.div>
          <hr className='bg-slate-500 border-slate-800 text-border-slate-800 w-full mb-20' />
          <div className="grid grid-cols-4 gap-8 sm:grid-cols-8 p-6 my-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#F7F2DA] flex items-center justify-center mb-2 overflow-hidden border-2 border-slate-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="rounded-full h-full w-full"
                  />
                </motion.div>
                <motion.p
                  className="text-[#F7F2DA] text-xs text-center mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  {partner.name}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}