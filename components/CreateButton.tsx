"use client";
import React from "react";
import Link from "next/link";
import {HoverBorderGradient} from './ui/hover-border-gradient'
export function StartingButton() {
  return (
    <div className="m-4 flex justify-center text-center ">
        <Link  href='/create'>
        <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-black text-[#F7F2DA] flex items-center space-x-2 hover:scale-110 hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out md:px-6 md:p-4 p-2 px-4"
      >
            <span>Start Creating</span>
        <AceternityLogo />
    
      </HoverBorderGradient>
        </Link>
   
    </div>
  );
}

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-black dark:text-[#F7F2DA]"
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
