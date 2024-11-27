import React from 'react'
import { Card, Tooltip } from "@nextui-org/react"
import { Badge } from "@nextui-org/react"
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useEthereumPrice } from '@/hooks/useEthPrice'
import Countdown from 'react-countdown'
import { formatCurrency } from '@/lib/moreThings'
import { getPhaseInfo, useTokenFactoryDurations } from '@/hooks/useContractConstants'
import { FormattedBatch } from '@/hooks/useFetchAllBatches'
import { QueueCard } from '@/components/tokenbatch/queueCard'
import { BatchState } from '@/hooks/useFetchLatestBatch'
import { toast } from 'sonner'
import "./WorkbenchFontTest.css";
  import { motion, AnimatePresence } from "framer-motion";
import { Lock } from 'lucide-react';
import Link from 'next/link';

interface BatchCardProps {
    batch: FormattedBatch;
}

const CountdownDisplay = ({ hours, minutes, seconds, completed, phase }: any) => {
    if (completed) {
        return (
            <div className="text-destructive font-semibold">
                Needs Migration
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="text-sm font-medium text-muted-foreground">
                {phase}
            </div>
            <div className="flex items-center gap-1.5">
                <TimeBlock value={hours} unit="H" />
                <span className="text-primary text-xl">:</span>
                <TimeBlock value={minutes} unit="M" />
                <span className="text-primary text-xl">:</span>
                <TimeBlock value={seconds} unit="S" />
            </div>
        </div>
    )
}

const TimeBlock = ({ value, unit }: { value: number; unit: string }) => (
    <div className="flex flex-col items-center">
        <span className="text-xl font-bold text-primary tabular-nums">
            {String(value).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-muted-foreground font-medium">
            {unit}
        </span>
    </div>
)

export const BatchCard2: React.FC<BatchCardProps> = ({ batch }) => {
    const router = useRouter()
    const { data: ethPrice } = useEthereumPrice()
    const { durations } = useTokenFactoryDurations()
    const phaseInfo = getPhaseInfo(batch.stateNumber, durations)
    const deadline = new Date(batch.stateUpdatedAt.getTime() + (phaseInfo.duration * 1000))
    const stakedValueUSD = parseFloat(batch.initialVoting.totalStaked.toString()) * (ethPrice?.ethereum?.usd || 0)
    console.log("this is the batch that is passed into the batch card 000000000000000000000", { batch });
    const handleBatchClick = () => {
        // For INACTIVE state
        if (batch.stateNumber === BatchState.INACTIVE) {
            toast.info("This batch is currently inactive")
            return
        }

        // For ANONYMOUS_VOTING and above states
        if (batch.stateNumber >= BatchState.ANONYMOUS_VOTING) {
            router.push(`/batch/${batch.batchId}`)

            return
        }

        // For INITIAL_VOTING and QUEUE states
        if (batch.stateNumber === BatchState.INITIAL_VOTING ||
            batch.stateNumber === BatchState.QUEUE) {
            router.push(`/batch/${batch.batchId}`)
            return
        }
    }

    const handleCountResult = () => {
        toast.info("counting result function called")
    }

    // If the phase is Queue, render the QueueCard
    if (batch.stateNumber === BatchState.QUEUE) {
        return (
            <QueueCard
                batch={batch}
                phaseInfo={phaseInfo}
                stakedValueUSD={stakedValueUSD}
                onCountResult={handleCountResult}
            />
        )
    }

    return (
        <motion.div
        className="w-full md:w-[350px] px-2 mb-4 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.07 }}
      >
        {/* Anonymous Stage Overlay - Shows on component hover */}
        <Tooltip
            content= {batch.state}
            placement="top"
            showArrow={false}
            offset={15} // Increased offset to create more space
            classNames={{
              base: [
                "py-2 px-4",
                "border-none",
                "shadow-none",
                "backdrop-blur-none",
                "relative",
                "mb-2 tooltip-custom", // Increased bottom margin
                "translate-y-[-8px]" // Move tooltip up slightly
              ].join(" "),
              content: [
                "text-[#F7F2DA]",
                "text-sm",
                "font-normal",
                "px-2 py-1",
                "rounded-none",
                "bg-[#000000]"
              ].join(" ")
            }}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: { duration: 0.1, ease: "easeIn" }
                },
                enter: {
                  opacity: 1,
                  transition: { duration: 0.15, ease: "easeOut" }
                }
              }
            }}
          >
        <div className="bg-[#0A0909]  overflow-hidden" style={{ height: "150px" }}>
          <div className="p-3 text-[#F7F2DA]">
            <div className="flex justify-between items-start">
              {/* Image container with lock */}
         
                <motion.div 
                  className="w-[100px] h-[100px] my-[10px] mx-[10px] bg-[#D9D9D966] relative"
                  whileHover={{ 
                    boxShadow: "0 0 8px rgba(247, 242, 218, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="absolute -top-1 -right-1 w-6 h-6 bg-[#1A1A1A] rounded-md flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Lock className="h-3 w-3 text-gray-400" />
                  </motion.div>
                </motion.div>
       
    
              <div className="text-right flex flex-col p-2">
                <div className="flex flex-row justify-between align-middle">
                  <motion.h2
                    className="text-left text-[#F7F2DA] font-normal"
                    style={{
                      width: "70px",
                      height: "20px",
                      fontSize: "20px",
                      lineHeight: "20px"
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      scale: 1.05,
                      color: "#F7F2DA",
                      textShadow: "0 0 8px rgba(247, 242, 218, 0.5)"
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    [{batch.batchId}]
                  </motion.h2>
                  <motion.h2
                    className="hover:underline text-[#F7F2DA] workbench-test"
                    style={{
                      width: "20px",
                      height: "10px",
                      fontSize: "10px",
                      fontWeight: 200,
                      lineHeight: "20px",
                      textAlign: "left",
                      color: "#F7F2DA"
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      color: "#F7F2DA",
                    }}
                  >
                    More
                  </motion.h2>
                </div>
    
                <div className="flex flex-col align-middle">
                  <motion.p
                    className="text-[#F7F2DA] workbench-test flex flex-row mt-[5px]"
                    style={{
                      width: "60px",
                      height: "10px",
                      fontSize: "10px",
                      fontWeight: 200,
                      lineHeight: "10px",
                      textAlign: "left",
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      color: "#F7F2DA",
                    }}
                  >
                     {batch.state}
                  </motion.p>
    
                  {/* Time to Launch Section */}
                  <motion.div
                    className="mt-[22px]"
                    style={{
                      width: "180px",
                      height: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                    whileHover={{ 
                      backgroundColor: "rgba(247, 242, 218, 0.1)",
                      borderRadius: "4px",
                      padding: "4px"
                    }}
                  >
                    <p className="text-[10px] text-[#F7F2DA]">Creation Time:</p>
                    <p className="text-[12px] text-[#F7F2DA]">{formatDistanceToNow(batch.createdAt, { addSuffix: true })}</p>
                  </motion.div>
    
                  {/* Chain Section */}
                  <motion.div
                    className="my-[8px] workbench-test"
                    style={{
                      width: "180px",
                      height: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                    whileHover={{ 
                      backgroundColor: "rgba(247, 242, 218, 0.1)",
                      borderRadius: "4px",
                      padding: "4px"
                    }}
                  >
                    <p className="text-[10px] text-[#F7F2DA]"> Total Staked:</p>
                    <p className="text-[10px] text-[#F7F2DA]">   {formatCurrency(stakedValueUSD)}</p>
                  </motion.div>
                  <motion.div
                    className="my-[8px] workbench-test"
                    style={{
                      width: "180px",
                      height: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                    whileHover={{ 
                      backgroundColor: "rgba(247, 242, 218, 0.1)",
                      borderRadius: "4px",
                      padding: "4px"
                    }}
                  >
                    <p className="text-[10px] text-[#F7F2DA]"> Token Value:</p>
                    <p className="text-[10px] text-[#F7F2DA]">       {batch.initialVoting.totalStaked} ETH </p>
                  </motion.div>
                  {/* Description */}
                  <motion.div
                    className="mb-[8px]"
                    style={{
                      width: "180px",
                      height: "10px",
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: "10px",
                      textAlign: "left",
                      color: "#F7F2DA"
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      color: "#F7F2DA",
                      textShadow: "0 0 8px rgba(247, 242, 218, 0.3)"
                    }}
                  >
                  <Countdown
                              date={deadline}
                              renderer={(props) => (
                                  <CountdownDisplay {...props} phase={phaseInfo.label} />
                              )}
                          />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Tooltip>
      </motion.div>
    )
}

export const StatBlock = ({ label, value, icon }: { label: string; value: string | number; icon: string }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
        <span className="text-xl">{icon}</span>
        <div>
            <div className="text-sm font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
        </div>
    </div>
)
