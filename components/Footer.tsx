"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
<section className="">
       <div
            className=" px-4 pt-24 py-8 mx-auto text-left  md:text-center"
          >
            <h1
              className="text-3xl  leading-10 tracking-tight text-left text-[#F7F2DA] text-center sm:leading-none md:text-6xl text-4xl lg:text-7xl"
            >
              <span className="inline md:block">OmniPump</span>
              <br />
              <span
  className="mt-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 md:inline-block"
>
ultimate{" "}
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-slate-300 to-sky-200">
    Coin Marketplace
  </span>
</span>

            </h1>
            <div
              className="mx-auto rounded-lg font-black mt-5 text-zinc-400 md:mt-12 md:max-w-lg text-center lg:text-lg"
            >
              <Link href="/lunch" className="bg-tkb border text-sm text-[#F7F2DA] py-3 px-7 rounded-full" >
         Start Lunch
              </Link>
            </div>
          </div>
  </section>
  
<hr className="text-[#F7F2DA] mx-5" />
  <footer className=" pb-5">
  <div className=" px-4 pt-8 mx-auto sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex justify-center text-teal-300 sm:justify-start">
     <img alt="" className="rounded-full" src="https://cryptologos.cc/logos/ethereum-eth-logo.png" width="40" height="40" />
      </div>

      <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-200 text-sm">
            &copy; OmniPump All rights reserved 2019.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            <Link href="#" className="text-slate-600 hover:text-slate-100 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer