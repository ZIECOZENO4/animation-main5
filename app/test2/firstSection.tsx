"use client";
import React, { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button, Tooltip } from "@nextui-org/react";
import { Tabs, Tab } from '@nextui-org/react';
import { useAllBatchesMetrics } from '@/hooks/useFetchAllBatches';
import { BatchCard } from '../../components/tokenbatch/BatchCard';
import { useTokenFactoryDurations } from '@/hooks/useContractConstants';
import "./WorkbenchFontTest.css";
  import { motion, AnimatePresence } from "framer-motion";
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function FirstSection() {
    const { durations, isLoading: durationsLoading, isError: durationsError } = useTokenFactoryDurations();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useAllBatchesMetrics(durations);

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false
    });

    const handleFetchNextPage = useCallback(() => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

    useEffect(() => {
        if (inView) {
            handleFetchNextPage();
        }
    }, [inView, handleFetchNextPage]);

    const allBatches = React.useMemo(() => 
        data?.pages?.flatMap(page => page.batches) || [], 
        [data?.pages]
    );

    const renderContent = () => {
        if (isLoading || durationsLoading) {
            return <div className="flex justify-center items-center h-full">Loading batches...</div>;
        }

        if (isError || durationsError) {
            return (
                <div className="flex justify-center items-center h-full text-red-500">
                    Error fetching batches. Please try again.
                </div>
            );
        }

        if (allBatches.length === 0) {
            return <div className="flex justify-center items-center h-full">No batches found.</div>;
        }

        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allBatches.map((batch) => (
                        <BatchCard
                            key={batch.id}
                            batch={batch}
                        />
                    ))}
                </div>
                <div ref={ref} className="flex justify-center mt-4">
                    {isFetchingNextPage ? (
                        <div className="text-center">Loading more batches...</div>
                    ) : hasNextPage ? (
                        <Button
                            onClick={handleFetchNextPage}
                            disabled={isFetchingNextPage}
                            variant="flat"
                            size="lg"
                        >
                            Load More
                        </Button>
                    ) : null}
                </div>
            </>
        );
    };

    return (
        <div className="min-h-screen p-1 md:p-6 lg:p-8">
            <Tabs className="w-full max-w-8xl mx-auto">
                <Tab key="initial" title="Initial">
                    <div className="h-[calc(100vh-200px)]">
                        {renderContent()}
                    </div>
                    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
                </Tab>
                <Tab key="following" title="Following">
                    <div className="h-[calc(100vh-200px)]">
                    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card2 />
        </Link>

        <Link href="/test">
          <Card2 />
        </Link>

        <Link href="/test">
          <Card2 />
        </Link>
        <Link href="/test">
          <Card2 />
        </Link>
      </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

const Card2 = () => (
    <motion.div
      className="w-full md:w-[350px] px-2 mb-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ scale: 1.07 }}
    >
      {/* Anonymous Stage Overlay - Shows on component hover */}
      <Tooltip
          content="Still in Anonymous Stage"
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
                  [SPEAR]
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
                  Pear Network
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
                  <p className="text-[10px] text-[#F7F2DA]">Time to Launch:</p>
                  <p className="text-[12px] text-[#F7F2DA]">00D/4H/24m</p>
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
                  <p className="text-[10px] text-[#F7F2DA]">Chain:</p>
                  <p className="text-[10px] text-[#F7F2DA]">Arbitrum</p>
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
                  aslan is a scammer, always have been
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Tooltip>
    </motion.div>
  )

  const Card = () => (
    <motion.div
      className="w-full md:w-[350px] px-2 mb-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ scale: 1.07 }}
    >
                  <Tooltip
          content="Still in Initial Stage"
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
  <div
        className="bg-[#0A0909]  overflow-hidden"
        style={{ height: "150px" }}
      >
        <div className="p-3 text-[#F7F2DA]">
          <div className="flex justify-between items-start">
            <motion.div 
              className="w-[100px] h-[100px] my-[10px] mx-[10px] bg-[#D9D9D966]"
              whileHover={{ 
                boxShadow: "0 0 8px rgba(247, 242, 218, 0.3)",
                transition: { duration: 0.2 }
              }}
            />
  
            <div className="text-right flex flex-col p-2">
              {/* Rest of your existing code remains exactly the same */}
              <div className="flex flex-row justify-between align-middle">
                <motion.h2
                  className="text-left text-[#F7F2DA] font-normal"
                  style={{
                    width: "70px",
                    height: "20px",
                    top: "14px",
                    left: "137px",
                    fontSize: "20px",
                    lineHeight: "20px"
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  [SPEAR]
                </motion.h2>
                <motion.h2
                  className="hover:underline text-[#F7F2DA] workbench-test"
                  style={{
                    width: "20px",
                    height: "10px",
                    top: "9px",
                    left: "302px",
                    fontSize: "10px",
                    fontWeight: 200,
                    lineHeight: "20px",
                    textAlign: "left",
                    color: "#F7F2DA"
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
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
                  Pear Network
                </motion.p>
  
                <motion.div
                  className="mt-[22px]"
                  style={{
                    width: "180px",
                    height: "10px",
                    top: "85px",
                    left: "137px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <p
                    className="workbench-test"
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: "10px",
                      textAlign: "left",
                      color: "#F7F2DA"
                    }}
                  >
                    Time to Launch:
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "10px",
                      textAlign: "left",
                      color: "#F7F2DA"
                    }}
                  >
                    00D/4H/24m
                  </p>
                </motion.div>
                <motion.div
                  className="my-[8px] workbench-test"
                  style={{
                    width: "180px",
                    height: "10px",
                    top: "85px",
                    left: "137px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: "10px",
                      textAlign: "left",
                      color: "#F7F2DA"
                    }}
                  >
                    Chain:
                  </p>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: "10px",
                      textAlign: "left",
                      color: "#F7F2DA"
                    }}
                  >
                    Arbitrum
                  </p>
                </motion.div>
                <motion.div
                  className="mb-[8px]"
                  style={{
                    width: "180px",
                    height: "10px",
                    top: "102px",
                    left: "137px",
                    fontSize: "10px",
                    fontWeight: 400,
                    lineHeight: "10px",
                    textAlign: "left",
                    color: "#F7F2DA"
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  aslan is a scammer, always have been
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </Tooltip>
  
    </motion.div>
  );