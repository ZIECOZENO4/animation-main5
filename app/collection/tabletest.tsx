"use client"
import React from 'react'
import { motion } from "framer-motion";
import "./WorkbenchFontTest.css";

const MainTable = () => {

  const items = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    name: `[$BEAT ${index + 1}]`,
    description: `[Beat Aslan Tonight ${index + 1}]`
  }));

  return (
    <div className="flex flex-col w-full mt-4 mb-10 px-6">
      {/* Header */}
      <motion.div 
        className="w-full h-[36px] px-[18px] pr-[31px] pt-[9px] pb-[12px] bg-[#0A0909] flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-[#F7F2DA] workbench-test w-[250px]"
          style={{
            fontSize: "10px",
            fontWeight: 200,
            lineHeight: "10px",
            textAlign: "left",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Token Details
        </motion.p>
        
        <motion.p
          className="text-[#F7F2DA] workbench-test flex-1 text-center"
          style={{
            fontSize: "10px",
            fontWeight: 200,
            lineHeight: "10px",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Approx. Ranking
        </motion.p>

        <motion.p
          className="text-[#F7F2DA] workbench-test flex-1 text-center"
          style={{
            fontSize: "10px",
            fontWeight: 200,
            lineHeight: "10px",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Price Change (1H)
        </motion.p>

        <motion.p
          className="text-[#F7F2DA] workbench-test flex-1 text-center"
          style={{
            fontSize: "10px",
            fontWeight: 200,
            lineHeight: "10px",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Member Change (1H)
        </motion.p>

        <motion.p
          className="text-[#F7F2DA] workbench-test w-[100px] text-center"
          style={{
            fontSize: "10px",
            fontWeight: 200,
            lineHeight: "10px",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Attention (Total)
        </motion.p>
        <motion.p
          className="text-[#F7F2DA] workbench-test w-[100px] text-center"
          style={{
            fontSize: "10px",
            fontWeight: 200,
            lineHeight: "10px",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
        Buy
        </motion.p>
      </motion.div>

      {/* Body - Repeated 30 times */}
      <div className="flex flex-col space-y-2">
        {items.map((item, index) => (
          <motion.div 
            key={item.id}
            className="w-full h-[72px] pr-[31px] bg-[#0A0909] flex items-center justify-between mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Token Info with fixed width */}
            <motion.div 
              className="flex items-center gap-4 px-4 w-[275px]"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
            >
              <motion.div 
                className="w-[58px] h-[52px] bg-[#5D5C5C]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="flex flex-col">
                <motion.p 
                  className="text-[20px] text-[#F7F2DA] font-normal leading-[20px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                >
                  {item.name}
                </motion.p>
                <motion.p
                  className="text-[#F7F2DA] mt-1 workbench-test"
                  style={{
                    fontSize: "10px",
                    fontWeight: 200,
                    lineHeight: "10px",
                    textAlign: "left",
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.4 }}
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>

            {/* Stats with flex-1 to distribute space */}
            <motion.p 
              className="flex-1 text-center text-[16px] pl-[3rem] text-[#DFDBC5] font-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.5 }}
            >  
              top {50 - index}
            </motion.p>

            <motion.p 
              className="flex-1 text-center text-[16px] pl-[2rem] text-[#BD8F8F] font-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.6 }}
            >
              {(4.2 + index * 0.1).toFixed(1)}%
            </motion.p>
       

            <motion.p 
              className="flex-1 text-center text-[16px] pl-[5rem] text-[#9CBD8F] font-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.6 }}
            >
              {(32.6 + index * 0.1).toFixed(1)}%
            </motion.p>

            <motion.p 
              className="flex-1 text-center text-[16px] pl-[1rem] text-[#DFDBC5] font-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * index + 0.7 }}
            >
              {3269 + index * 100}
            </motion.p>

            {/* Buy Button with centered text */}
            <motion.div 
              className="w-[59px] h-[36.22px] shake-button border-[0.63px] border-[#000000]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 * index + 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex">
                <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                <div className="flex items-center justify-center w-[56px] h-[33px] bg-[#787878]">
                  <motion.p 
                    className="text-[20px] text-[#F7F2DA] font-normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index + 0.9 }}
                  >
                    BUY
                  </motion.p>
                </div>
              </div>
              <div className="w-[59px] h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MainTable