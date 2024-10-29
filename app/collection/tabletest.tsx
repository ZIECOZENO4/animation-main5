"use client"
import React from 'react'
import { motion } from "framer-motion";
import "./WorkbenchFontTest.css";

const MainTable = () => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Header */}
      <motion.div 
        className="w-full h-[36px] px-[18px] pr-[31px] pt-[9px] pb-[12px] mx-4 my-2 bg-[#0A0909] flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header items */}
        {['Token Details', 'Approx. Ranking', 'Price Change (1D)', 'Member Change (1D)', 'Attention (Total)'].map((text, index) => (
          <motion.p
            key={index}
            className="text-[#F7F2DA] workbench-test"
            style={{
              fontSize: "10px",
              fontWeight: 200,
              lineHeight: "10px",
              textAlign: "left",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>

      {/* Body */}
      <motion.div 
        className="w-full h-[72px] pr-[31px] mx-4 my-2 bg-[#0A0909] flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Token Info */}
        <motion.div 
          className="flex items-center gap-4 px-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="w-[58px] h-[52px] bg-[#5D5C5C]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="text-[#F7F2DA]">
            <motion.p 
              className="text-[20px] font-normal leading-[20px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              [$BEAT]
            </motion.p>
            <motion.p
              className="text-[10px] font-light leading-[10px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              Token Details
            </motion.p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.p 
          className="text-[16px] text-[#DFDBC5] font-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          top 50
        </motion.p>

        <motion.p 
          className="text-[16px] text-[#BD8F8F] font-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          4.2%
        </motion.p>

        <motion.p 
          className="text-[16px] text-[#DFDBC5] font-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          3,269
        </motion.p>

        {/* Buy Button */}
        <motion.div 
          className="w-[59px] h-[36.22px] border-[0.63px] border-[#000000]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex">
            <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
            <div className="text-center w-[56px] h-[33px] bg-[#787878]">
              <motion.p 
                className="text-[20px] text-[#F7F2DA] text-center font-normal leading-[20px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                BUY
              </motion.p>
            </div>
          </div>
          <div className="w-[59px] h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MainTable