import React from "react";
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
            "mb-2 tooltip-custom" // Custom class for styling
          ].join(" "),
          content: [
            "text-[#000]", // Text color
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
        }}
      >
        Hover over me
      </Tooltip>
    </div>
  );
};

export default TestPage;