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
  // Time-related states
  const [selectedInterval, setSelectedInterval] = useState("1D")
  const [activeTimeFrame, setActiveTimeFrame] = useState("1M")
  
  // View-related states
  const [view, setView] = useState<"trading" | "depth">("trading")
  const [activeView, setActiveView] = useState("trading")
  
  // Other states
  const [isZoomedOut, setIsZoomedOut] = useState(false)

  // Constants
  const timeFrames: TimeFrame[] = [
    { id: "1D", label: "1D" },
    { id: "1W", label: "1W" },
    { id: "1M", label: "1M" },
  ]

  const viewOptions = [
    { id: "trading", label: "Trading" },
    { id: "depth", label: "Depth" },
  ]

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
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
              <svg width="18px" height="18px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#765b5b"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M9.5 8.5H9.51M19.5 7.5H19.51M14.5 12.5H14.51M8.5 15.5H8.51M18.5 15.5H18.51" stroke="#f7f2da" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <span className="text-sm font-medium tracking-wide pt-[0.5px] text-zinc-200">
                  SALES
                </span>
              </div>
              <div className="flex gap-2">
                {/* Time Frame Selector */}
                <div className="flex items-center bg-zinc-800/50 rounded-lg p-1">
                  {timeFrames.map((timeFrame) => (
                    <motion.button
                      key={timeFrame.id}
                      className={`relative px-3 py-1 text-sm font-medium rounded-md ${
                        activeTimeFrame === timeFrame.id
                          ? "text-[#F7F2DA]"
                          : "text-zinc-400"
                      }`}
                      onClick={() => setActiveTimeFrame(timeFrame.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {timeFrame.label}
                      {activeTimeFrame === timeFrame.id && (
                        <motion.div
                          layoutId="timeFrameIndicator"
                          className="absolute inset-0 bg-slate-500/20 rounded-md"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-zinc-800/50 rounded-lg p-1">
                  {viewOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      className={`relative px-3 py-1 text-sm font-medium rounded-md ${
                        activeView === option.id
                          ? "text-[#F7F2DA]"
                          : "text-zinc-400"
                      }`}
                      onClick={() => {
                        setActiveView(option.id)
                        setView(option.id as "trading" | "depth")
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {option.label}
                      {activeView === option.id && (
                        <motion.div
                          layoutId="viewIndicator"
                          className="absolute inset-0 bg-slate-500/20 rounded-md"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
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