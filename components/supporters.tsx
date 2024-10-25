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

export default function SuppotersComponent() {
  return (
    <div className=" h-auto flex items-center justify-center p-8 ">
      <div className="w-full max-w-4xl">
        <motion.div
          className="bg-black p-6 relative overflow-hidden border-2 border-slate-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.h2
            className="text-[#F7F2DA] text-3xl bg-black font-bold text-center mb-8 -mt-1 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              textShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff",
              fontFamily: "'Arial', sans-serif",
              letterSpacing: "4px",
            }}
          >
            TRUSTED AND BACKED BY
          </motion.h2>
          <div className="grid grid-cols-4 gap-8 sm:grid-cols-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#F7F2DA] flex items-center justify-center mb-2 overflow-hidden border-2 border-slate-500"
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
                  className="text-slate-500 text-xs text-center"
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