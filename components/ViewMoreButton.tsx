"use client";
import React from "react";
import DigitalClock from "./timer/digital-clock";

export function ViewMoreButton() {
  return (
    <div>
      <button
        aria-label='number'
        className="bg-tertiary p-2 py-4 rounded-xl w-full outline-none  border border-slate-800 text-[#F7F2DA] font-bold shadow-md shadow-slate-900"
      >
       <DigitalClock />
      </button>
    </div>
  );
}
