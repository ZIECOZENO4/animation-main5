"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, Tab } from "@nextui-org/react"
import { ArrowUpRight, ChevronDown, Maximize2, X } from "lucide-react"
import SalesChart from "./sales-chart"
import DeptComponent from "./dept-graph"

export default function EnhanceTradingView() {
  const [view, setView] = useState<"trading" | "depth">("trading")
  const [selectedInterval, setSelectedInterval] = useState("1D")
  const [isZoomedOut, setIsZoomedOut] = useState(false)
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("15m")
  
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between px-4 py-3 border-b border-gray-800"
            >
              {/* Left Side - Time Frame Toggle */}
              <div className="flex items-center gap-4">
              <svg fill="#F7F2DA" width="34px" height="34px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#F7F2DA" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 21 4 L 21 28 L 29 28 L 29 4 Z M 23 6 L 27 6 L 27 26 L 23 26 Z M 3 10 L 3 28 L 11 28 L 11 10 Z M 5 12 L 9 12 L 9 26 L 5 26 Z M 12 16 L 12 28 L 20 28 L 20 16 Z M 14 18 L 18 18 L 18 26 L 14 26 Z"></path></g></svg>
                <h1 className="text-xl font-bold leading-6">Time Frame</h1>
                <div className="flex rounded bg-black">
                  <Tabs 
                    variant="bordered" 
                    aria-label="Time frame options"
                    selectedKey={selectedTimeFrame}
                    onSelectionChange={(key) => setSelectedTimeFrame(key as string)}
                  >
                    {intervals.map((interval) => (
                      <Tab key={interval} title={interval} />
                    ))}
                  </Tabs>
                </div>
              </div>

              {/* Right Side - View Toggle */}
              <div className="flex items-center gap-4">
                <Tabs 
                  variant="bordered" 
                  aria-label="View options"
                  selectedKey={view}
                  onSelectionChange={(key) => setView(key as "trading" | "depth")}
                >
                  <Tab key="trading" title="Trading view" />
                  <Tab key="depth" title="Depth" />
                </Tabs>
              </div>
            </motion.div>

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