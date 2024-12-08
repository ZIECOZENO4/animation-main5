"use client";
import React, { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import CubicButton from './CubicButton';
import { NotificationIcon } from "./NotificationIcon";
import NotificationAlert from "./Notification";
import FullConnectButton from './fullConnectButton';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import { ChevronDownIcon } from "lucide-react"
import CubicButtonSide from './CubicButtonside';


type ActiveItem = string | null;

interface NavItem {
  name: string;
  path: string;
}
const styles = {
  navLink: `text-[#F7F2DA] flex mx-[10px]`,
  badge: `rounded-full bg-blue-600 h-1 w-1 absolute bottom-5 right-0 top-1 ring-4`,
  navItem: `relative mr-1 cursor-pointer hover:opacity-60`,
  nav: `flex justify-center items-center gap-[20px]`,
  headerWrapper: `md:flex md:justify-between h-full max-w-screen-xl mx-auto px-4 hidden`,
  inputContainer: `flex items-center justify-center p-2 rounded `,
  input: `bg-transparent outline-none text-[#F7F2DA] w-70 ml-3`,
  cursorPointer: `mr-5 cursor-pointer`,
};

const MdNavBar = () => {
  const [activeItem, setActiveItem] = useState<ActiveItem>(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const currentPath = usePathname();
    const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show navbar if scrolling up or at top of page
    const isScrollingUp = latest < lastScrollY || latest < 50;
    setIsVisible(isScrollingUp);
    setLastScrollY(latest);
  });

  const navVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

    const navItems: NavItem[] = [
      { name: "Home", path: "/" },
      { name: "Create", path: "/create" },
      { name: "Liquidity", path: "/liquidity" },
      { name: "Listing", path: "/listing" },
      { name: "Comment", path: "/website-comment" },
      { name: "Contact", path: "/contact" }
    ];
  
    const toggleNotification = () => {
      setIsNotificationOpen(!isNotificationOpen);
    };
  return (
  <div className="div">
    <motion.div 
            className='flex justify-between items-center text-[#F7F2DA] h-20 w-full py-5 px-4 sticky top-0 z-50'
        >
            {/* Left Section: First Component */}
            <Link href="/" className="flex flex-row">
                <motion.p
                    className="mt-2 leading-10 tracking-tight text-[#F7F2DA] text-center hover:text-gray-500 text-md md:text-2xl ml-2 md:ml-4 hover:scale-110 hover:text-xl md:hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out text-xl font-normal relative"
                    whileHover={{
                        y: [-2, 2, -2],
                        transition: { repeat: Infinity, duration: 0.5 }
                    }}
                >
                    KANNON
                    <motion.span
                        className="absolute inset-0 text-transparent pointer-events-none"
                        style={{
                            textShadow: `
                                0 0 20px rgba(247, 242, 218, 0.7),
                                0 0 40px rgba(247, 242, 218, 0.5), 
                                0 0 60px rgba(247, 242, 218, 0.3)
                            `,
                            WebkitTextStroke: "2px rgba(247, 242, 218, 0.2)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0, 1, 1, 0] 
                        }}
                        transition={{ 
                            repeat: Infinity,
                            duration: 5,
                            times: [0, 0.1, 0.9, 1],
                            ease: "easeInOut"
                        }}
                    >
                        KANNON
                    </motion.span>
                </motion.p>
            </Link>

            {/* Center Section: Navigation Items */}
            {/* <div className="md:flex-grow md:flex hidden md:items-center  md:pl-[15%]  md:justify-center">
                <nav className="flex items-center">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.name}
                            className="relative mx-4"
                            onHoverStart={() => setActiveItem(item.name)}
                            onHoverEnd={() => setActiveItem(null)}
                            onClick={() => setActiveItem(item.name)}
                        >
                            <Link
                                href={item.path}
                                className={`text-md hover:scale-110 transition-all duration-300 ease-in-out font-bold ${
                                    currentPath === item.path ? "text-[#F7F2DA]" : "text-gray-500 hover:text-[#F7F2DA]"
                                }`}
                            >
                                {item.name}
                            </Link>
                            <AnimatePresence>
                                {activeItem === item.name && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        exit={{ width: "0%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </nav>
            </div> */}

            {/* Right Section: Cubic Button and Notification Icon */}
            <div className="flex items-center justify-end mr-2">
                <div   onClick={toggleNotification} className="w-auto text-[#F7F2DA] rounded-md flex w-12">
                    <CubicButton />
                </div>
       
            </div>
        </motion.div>
    <AnimatePresence>
        {isNotificationOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 top-20"
              onClick={toggleNotification}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full bg-black text-[#F7F2DA] z-50 overflow-y-auto"
              style={{
                width:
                  typeof window !== "undefined" && window.innerWidth >= 768
                    ? "40%"
                    : "80%"
              }}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
            
                  <h2 className="text-md text-center  flex px-4 md:px-8">
                  Wallet Details 
                  </h2>

                  <Button
  isIconOnly
  className="bg-black hover:bg-slate-800 border border-slate-800 "
  variant="bordered"
  aria-label="Close"
  onClick={toggleNotification}
>
  <span className="font-bold text-2xl">×</span>
</Button>
                </div>
                <div className="space-y-4">
                  <div className="p-[3px]">
                  <CubicButtonSide />
                  </div>
               
                  <div className="space-y-4 mt-6">
                  
                    <NotificationAlert />
                  </div>
                  {/* Add more notifications as needed */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
  </div>

  );
};

export default MdNavBar;

