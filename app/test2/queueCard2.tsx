// components/QueueCard.tsx
import { Button, Tooltip } from "@nextui-org/react"
import { Card } from "@nextui-org/react"
import { Badge } from "@nextui-org/react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from 'date-fns'
import { formatCurrency } from '@/lib/moreThings'
import { StatBlock } from "./BatchCard2"
import { FormattedBatch } from "@/hooks/useFetchAllBatches"
import { PhaseInfo } from "@/hooks/useContractConstants"
import { BatchCountingButton } from "./BatchCountingButton"
import "./WorkbenchFontTest.css";
  import { motion, AnimatePresence } from "framer-motion";
import { Lock } from 'lucide-react';
import Link from 'next/link';

interface QueueCardProps {
    batch: FormattedBatch;
    phaseInfo: PhaseInfo;
    stakedValueUSD: number;
    onCountResult: () => void;
}

export const QueueCard2: React.FC<QueueCardProps> = ({
    batch,
    phaseInfo,
    stakedValueUSD,
    onCountResult
}) => {
    return (
        <motion.div
          className= "w-full md:w-[350px] px-2 mb-4 relative"
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
                className="w-[100px] h-[110px] my-[10px] mx-[10px] bg-[#D9D9D966] relative"
                whileHover={{ 
                  boxShadow: "0 0 8px rgba(247, 242, 218, 0.3)",
                  transition: { duration: 0.2 }
                }}
              >
        
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
                  [#{batch.batchId}]
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
                      {phaseInfo.label}
                </motion.p>
  
                {/* Time to Launch Section */}
                <motion.div
                  className="mt-[18px]"
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
                  <p className="text-[12px] text-[#F7F2DA]"> {formatDistanceToNow(batch.createdAt, { addSuffix: true })}</p>
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
                  <p className="text-[10px] text-[#F7F2DA]">    {formatCurrency(stakedValueUSD)}</p>
                </motion.div>
                <motion.div
                  className=" workbench-test"
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
                  <p className="text-[10px] text-[#F7F2DA]">  {batch.initialVoting.totalStaked} ETH</p>
                </motion.div>
                {/* Description */}
                <motion.div
                  className="my-[8px]"
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
                 <BatchCountingButton batchId={batch.batchId.toString()} />
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
