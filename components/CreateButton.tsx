"use client";
import React from "react";
import Link from "next/link";
import {HoverBorderGradient} from './ui/hover-border-gradient'
import { Button } from "@nextui-org/react";
export function StartingButton() {
  return (
    <div className="m-4 flex justify-center text-center ">
        <Link  href='/create'>
        {/* <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-black text-[#F7F2DA] flex items-center space-x-2 hover:scale-110 hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out md:px-6 md:p-4 p-2 px-4"
      >
            <span>Start Creating</span>
        <AceternityLogo />
    
      </HoverBorderGradient> */}
            <Button 
            className={`relative rounded-none px-8 py-4 bg-[#0A0909] text-[#F7F2DA] hover:text-slate-500
                border-2 border-[#1a1a1a]`}
            style={{
                boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)',
            }}
      
        >
          <div className="flex items-center space-x-4 hover:scale-110 text-xl hover:text-2xl  text-center">
          <span>Start Creating</span>
        <AceternityLogo />
          </div>
     
        </Button>
        </Link>
   
    </div>
  );
}

const AceternityLogo = () => {
  return (
    <svg
      width="71"
      height="70"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-black dark:text-[#F7F2DA] hover:text-slate-500"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};
