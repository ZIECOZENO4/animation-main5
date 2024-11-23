import RewardCard from "@/components/transactioncontent";
import React from "react";
import Component from "./chart1";
import { Tooltip } from "@nextui-org/react";
const TestPage = () => {
  return (
    <div>
      <Tooltip 
  content="Still in Initial Stage"
  placement="top"
  showArrow={false}
  offset={-5}
  classNames={{
    base: [
      "py-2 px-4",
      "border-none",
      "shadow-none",
      "backdrop-blur-none",
      "relative",
      "mb-2 tooltip-custom" // Added custom class
    ].join(" "),
    content: [
      "text-[#F7F2DA]",
      "text-sm",
      "font-normal",
      "px-2 py-1",
      "rounded-none"
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
  }} >
    hello wporld 
  </Tooltip>
    </div>
  );
};

export default TestPage;
