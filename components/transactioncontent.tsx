"use client"
import { motion } from "framer-motion"

const RewardCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl"
    >
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white font-semibold">R</span>
          </div>
          <div>
            <h3 className="text-white font-medium">Reward</h3>
            <p className="text-slate-400 text-sm">$500.15</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="px-3 py-1 bg-green-500/20 rounded-full"
        >
          <span className="text-green-400 text-xs font-medium">Connected</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Last claim 3 days ago</span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-white text-sm cursor-pointer hover:text-slate-300"
          >
            View History
          </motion.span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-shadow"
        >
          Claim Reward
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-4 border-t border-slate-700/50"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Next reward in</span>
          <span className="text-white font-medium">2h 45m</span>
        </div>
        
        <motion.div 
          className="mt-2 w-full h-2 bg-slate-700/50 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div 
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default RewardCard