"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Plus, Minus, MessageSquare, MessageCircle, MoreHorizontal, X } from "lucide-react"
import Link from 'next/link';

export default function BottomMore() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50  hidden  md:flex md:flex-col "
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Main component container */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="fixed hidden  md:flex md:flex-col bottom-4 left-4 z-50"
      >
        {/* Menu items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-900 bg-opacity-80 rounded-lg overflow-hidden mb-2 p-2"
            >
              <div className="space-y-1">
                <MenuItem icon={<Plus className="w-4 h-4" />} text="Add Liquidity" href="/liquidity" />
                <MenuItem icon={<Minus className="w-4 h-4" />} text="Remove Liquidity" href="/liquidity" />
                <MenuItem icon={<MessageSquare className="w-4 h-4" />} text="Comments" href="/comments" />
                <MenuItem icon={<MessageCircle className="w-4 h-4" />} text="Comment on Website" href="/website-comment" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={toggleMenu}
          className="bg-transparent hover:bg-slate-600 hover:bg-opacity-20 border border-slate-500 text-[#F7F2DA] rounded-lg p-2 px-4 flex items-center text-center justify-between w-full"
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex text-center mx-2">
            View More
          </span>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </motion.button>

        {/* Close button */}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMenu}
              className="absolute top-2 right-2 bg-zinc-800 text-[#F7F2DA] rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

function MenuItem({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) {
  return (
    <Link href={href} className="block">
      <div className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-[#F7F2DA] hover:bg-slate-500 hover:bg-opacity-20 rounded transition-colors duration-200">
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  )
}