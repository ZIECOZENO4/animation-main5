"use client"
import React from 'react'
import { motion } from "framer-motion";
import "./WorkbenchFontTest.css";
const MainTable = () => {
  return (
    <div>
        <div className="w-full h-[36px] px-[18px] pr-[31px] pt-[9px] pb-[12px] mx-4 my-2 bg-[#0A0909] flex-row flex justify-between">
<motion.p
                className="text-[#F7F2DA] workbench-test "
                style={{
                  width: "60px",
                  height: "10px",
                  left: "137px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "10px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
               Token Details
              </motion.p>
              <motion.p
                className="text-[#F7F2DA] workbench-test "
                style={{
                  width: "60px",
                  height: "10px",
                  left: "137px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "10px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
              Approx. Ranking
              </motion.p>
              <motion.p
                className="text-[#F7F2DA] workbench-test "
                style={{
                  width: "60px",
                  height: "10px",
                  left: "137px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "10px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
              Price Change (1D)
              </motion.p>
              <motion.p
                className="text-[#F7F2DA] workbench-test "
                style={{
                  width: "60px",
                  height: "10px",
                  left: "137px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "10px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
            Member Change (1D)
              </motion.p>
              <motion.p
                className="text-[#F7F2DA] workbench-test "
                style={{
                  width: "60px",
                  height: "10px",
                  left: "137px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "10px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
        Attention (Total)
              </motion.p>
        </div>
        <div className="w-full h-[72px] pr-[31px] pt-[9px] pb-[12px] mx-4 my-2 bg-[#0A0909] flex-row flex justify-between">
<div className="w-[167px] h-[52px] top-[9px] left-[18px] flex-row flex justify-between">
<div className="w-[58px] h-[52px] top-[9px] left-[18px] bg-[#5D5C5C]" />
<div className=" text-[#F7F2DA]">
<p className=" text-[20px] font-normal leading-[20px] text-left top-[18px] left-[85px]">[$BEAT]</p>
<motion.p
                className="text-[#F7F2DA] leading-[10px] workbench-test top-[42px] left-[85px]"
                style={{
                  width: "60px",
                  height: "10px",
                  left: "137px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "10px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
               Token Details
              </motion.p>
</div>
</div>
<p className=" text-[16px] text-[#DFDBC5] font-normal leading-[16px] text-left ">top 50</p>
<p className=" text-[16px] text-[#BD8F8F] font-normal leading-[16px] text-left">4.2%</p>
<p className=" text-[16px] text-[#DFDBC5] font-normal leading-[16px] text-left top-[26px] lft-[1112px]">3,269</p>
<div className=" w-[59px] h-[36.22px]   border-[0.63px] border-[#000000]">
<div className="flex">
<div className=" w-[2.84px] h-[36.22px]  bg-[#787878] border-t-[0.63px] border-black" />
<div className="text-center w-[56px] h-[33px]  bg-[#787878]">
<p className=" text-[20px] text-[#F7F2DA] font-normal leading-[20px] ">BUY</p>
</div>
</div>
<div className=" w-[59px] h-[2px]  bg-[#787878] border-t-[0.63px] border-[#000000]" />
</div>

        </div>
    </div>
  )
}

export default MainTable