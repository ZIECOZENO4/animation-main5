"use client";

import { motion } from "framer-motion";
import React from "react";
import EnhanceTradingView from "../chart/enhanced-trading-interface";
export default function TestContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const MiddleBorderComponent = ({
    children
  }: {
    children?: React.ReactNode;
  }) => (
    <div className="relative h-full">
      <div className="relative p-6 h-full">{children}</div>

      {/* Top border - Solid Black */}
      <div
        className="absolute -top-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundColor: "#000000"
        }}
      />

      {/* Bottom border - Custom Pattern */}
      <div
        className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to right,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />

      {/* Left border - Solid Black */}
      <div
        className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundColor: "#000000"
        }}
      />

      {/* Right border - Solid Black */}
      <div
        className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundColor: "#000000"
        }}
      />
    </div>
  );

  const BorderComponent = ({
    children,
    className = ""
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => (
    <div className="relative h-full">
      <div className="relative  p-6 h-full">{children}</div>
      {/* Top border */}
      <div
        className="absolute -top-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to right,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
      {/* Bottom border */}
      <div
        className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to right,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
      {/* Left border */}
      <div
        className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to bottom,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
      {/* Right border */}
      <div
        className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to bottom,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
    </div>
  );

  const BoxComponent = ({ title }: { title: string }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="mb-4"
    >
      <BorderComponent>
        <div className="flex justify-between items-center p-2">
          <span className="text-xs text-gray-500">{title}</span>
          <motion.div
            whileHover={{ scale: 1.1, borderColor: "#ffffff" }}
            whileTap={{ scale: 0.9 }}
            className="w-4 h-4 border border-gray-800 cursor-pointer"
          />
        </div>
      </BorderComponent>
    </motion.div>
  );

  return (
    <motion.div
      className="overflow-hidden"
      style={{ height: "calc(100vh - 5rem)" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative z-10 h-full p-2">
        <div className="flex flex-row w-screen  gap-6 h-full">
          {/* Left Column */}
          <div className="flex w-[60%] flex-col gap-6 h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              className="relative h-[65%] w-[680px] bg-[#1D1D1D]/45"
            >
              <BorderComponent>
                <motion.span
                  className="text-sm  h-[65%] w-[680px] text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                >
                  <div className="m-0 p-0  h-[65%] w-[680px]">
                    <EnhanceTradingView />
                  </div>
                </motion.span>
              </BorderComponent>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              className="relative h-[35%] w-[60%] bg-[#000000]"
            >
              <BorderComponent>
                <motion.span
                  className="text-sm text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                ></motion.span>
              </BorderComponent>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full  w-[60%]  bg-[#000000]"
          >
            <BorderComponent>
              <div className="flex flex-col h-full gap-4">
                {/* Top Section */}
                <div className="space-y-4">
                  {/* First Row */}

                  <div className="flex gap-4">
                    <div className="w-[80%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex justify-end items-center h-full">
                          <span className="text-[20px] text-[#F7F2DA80]">
                            NOMAD
                          </span>
                        </div>
                      </BorderComponent>
                    </div>
                    <div className="w-[20%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex items-center justify-center h-full"></div>
                      </BorderComponent>
                    </div>
                  </div>
                  {/* Second Row - Full Width */}
                  <div className="w-full h-[51px] bg-[#5555554D]">
                    <BorderComponent>
                      <div className="flex justify-end items-center h-full">
                        <span className="text-[20px] text-[#F7F2DA80]">
                          BEAT
                        </span>
                      </div>
                    </BorderComponent>
                  </div>
                </div>

                {/* Middle Empty Section with Border */}
                <div className="flex-grow">
                  <MiddleBorderComponent />
                </div>

                {/* Bottom Section */}
                <div className="space-y-4">
                  {/* First Row */}
                  <div className="flex gap-4">
                    <div className="w-[80%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex justify-center items-center h-full">
                          <span className="text-[20px] text-[#F7F2DA80]">
                            NOMAD
                          </span>
                        </div>
                      </BorderComponent>
                    </div>
                    <div className="w-[20%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex items-center justify-center h-full"></div>
                      </BorderComponent>
                    </div>
                  </div>
                  {/* Second Row */}
                  <div className="flex gap-4 ">
                    <div className="w-[80%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex justify-center items-center h-full">
                          <span className="text-[20px] text-[#F7F2DA80]">
                            NOMAD
                          </span>
                        </div>
                      </BorderComponent>
                    </div>
                    <div className="w-[20%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex items-center justify-center h-full"></div>
                      </BorderComponent>
                    </div>
                  </div>
                  {/* Third Row - Full Width */}
                  <div className="w-full h-[51px] bg-[#5555554D]">
                    <BorderComponent>
                      <div className="flex justify-end items-center h-full">
                        <span className="text-[20px] text-[#F7F2DA80]">
                          BEAT
                        </span>
                      </div>
                    </BorderComponent>
                  </div>
                </div>
              </div>
            </BorderComponent>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
