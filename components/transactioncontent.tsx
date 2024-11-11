"use client"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react" 

const RewardCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl p-2 shadow-2xl"
    >
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center">
            <span className="text-[#F7F2DA] p-2">TT</span>
          </div>
          <div>
            <h3 className="text-slate-500 font-medium">Nomad</h3>
          </div>
        </motion.div>

        <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.3, type: "spring" }}
  className="px-3 py-1 bg-slate-500/20 rounded-full flex items-center gap-1"
>
  <CheckCircle size={24} className="text-[#F7F2DA] px-1" />    
  <span className="text-[#F7F2DA] text-xs font-medium">Confirmed</span>
</motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-sm">0.9854 TT</span>
          <span>
         
          </span>
        </div>

      </motion.div>

      <div className="flex items-center justify-between mt-1">
          <span className="text-slate-500 text-sm">0.9854 TT = 0.0096 ETH</span>
          <span>
         
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-slate-500 text-xs">In less than a minute ago</span>
          <span>
         0x876....87766
          </span>
        </div>
    </motion.div>
  )
}

export default RewardCard