"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, Tab } from "@nextui-org/react"
import { ArrowUpRight, ChevronDown, Maximize2, X } from "lucide-react"
import SalesChart from "./sales-chart"
import DeptComponent from "./dept-graph"


interface TimeFrame {
  id: string
  label: string
}
export default function EnhanceTradingView() {
  const [view, setView] = useState<"trading" | "depth">("trading")
  const [selectedInterval, setSelectedInterval] = useState("1D")
  const [isZoomedOut, setIsZoomedOut] = useState(false)
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("15m")
  const timeFrames: TimeFrame[] = [
    { id: "1D", label: "1D" },
    { id: "1W", label: "1W" },
    { id: "1M", label: "1M" },
  ]

  const [activeTimeFrame, setActiveTimeFrame] = useState("1M")

  const intervals = ["15m", "1H", "4H", "1D", "1W"]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isZoomedOut) {
        setIsZoomedOut(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isZoomedOut])

  return (
    <div className="h-full w-full bg-black">
      <AnimatePresence>
        {!isZoomedOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <div className="flex items-center justify-between px-4 py-3 ">
      <div className="flex items-center gap-2">
        <ChevronDown className="w-5 h-5 text-zinc-400" />
        <span className="text-sm font-medium tracking-wide text-zinc-200">SALES</span>
      </div>
      
      <div className="flex items-center bg-zinc-800/50 rounded-lg p-1">
        {timeFrames.map((timeFrame) => (
          <motion.button
            key={timeFrame.id}
            className={`relative px-3 py-1 text-sm font-medium rounded-md ${
              activeTimeFrame === timeFrame.id ? "text-[#F7F2DA]" : "text-zinc-400"
            }`}
            onClick={() => setActiveTimeFrame(timeFrame.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {timeFrame.label}
            {activeTimeFrame === timeFrame.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-slate-500/20 rounded-md"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
      <div className="flex items-center bg-zinc-800/50 rounded-lg p-1">
  {["trading", "depth"].map((viewOption) => (
    <motion.button
      key={viewOption}
      className={`relative px-3 py-1 text-sm font-medium rounded-md ${
        view === viewOption ? "text-[#F7F2DA]" : "text-zinc-400"
      }`}
      onClick={() => setView(viewOption as "trading" | "depth")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)} {/* Capitalizes the first letter */}
      {view === viewOption && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 bg-slate-500/20 rounded-md"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      )}
    </motion.button>
  ))}
</div>
    </div>
            

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
              {view === "trading" ? (
                <motion.div
                  key="trading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full w-full flex items-center justify-center"
                >
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="text-4xl font-bold"
                  >
                    <SalesChart />
                  </motion.h2>
                </motion.div>
              ) : (
                <motion.div
                  key="depth"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full w-full flex items-center justify-center"
                >
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="text-4xl font-bold"
                  >
                    <DeptComponent />
                  </motion.h2>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}