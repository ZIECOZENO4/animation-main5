"use client";
import React from 'react';
import CubicButton from './CubicButton';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge, Button } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";
import NotificationAlert from "./Notification";
import FullConnectButton from './fullConnectButton';

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
    <div className='flex-row justify-between text-[#F7F2DA] h-20 flex md:gap-[80px] w-full p-[20px] md:px-[30px] px-[20px] sticky top-0 z-50 fixed'>
   <Link href="/" className="flex flex-row ">
 
            <motion.p
              className="mt-2 leading-10 tracking-tight text-[#F7F2DA] text-center sm:leading-none  hover:text-gray-500 text-inherit text-md md:text-2xl ml-2 md:ml-4 hover:scale-110 hover:text-xl md:hover:text-3xl hover:-translate-y-1 transition-all duration-300 ease-in-out  text-xl font-normal  "
              whileHover={{
                y: [-2, 2, -2],
                transition: { repeat: Infinity, duration: 0.5 }
              }}
            >
              OMNI PUMP
            </motion.p>
          </Link>

      <div className={styles.headerWrapper}>

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
  

       
      </div>
      <div className="flex items-center justify-end ml-4">
        <div className="md:w-auto hidden text-[#F7F2DA] rounded-md sm:flex w-12">
              <CubicButton />
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-opacity-60 text-[#F7F2DA] p-2 md:px-3 md:py-2 rounded-md text-sm font-medium cursor-pointer"
            >

                <Button
                  radius="full"
                  isIconOnly
                  aria-label="Notifications and Sidebar"
                  variant="light"
                  onClick={toggleNotification}
                >
                 <NotificationIcon
  size={24}
  fill='#94a3b8'
  background="#1e293b"
/>
                </Button>

            </motion.div>
        </div>
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
                  <h2 className="text-xl text-center font-bold md:hidden px-4 md:px-8">
                    Quick Links
                  </h2>
                  <h2 className="text-xl text-center font-bold hidden sm:flex px-4 md:px-8">
                    Transaction History
                  </h2>

                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    aria-label="Close"
                    onClick={toggleNotification}
                  >
                    X
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="md:hidden p-3 gap-4 aligm-middle flex flex-col">
                    <Link href="/">
                      <button className="p-[3px] relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r  from-slate-500 to-slate-700 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-[#F7F2DA] hover:bg-transparent">
                          Home
                        </div>
                      </button>
                    </Link>
                    <Link href="/create">
                      <button className="p-[3px] relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r  from-slate-500 to-slate-700 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-[#F7F2DA] hover:bg-transparent">
                          Create
                        </div>
                      </button>
                    </Link>
                    <Link href="/liquidity">
                      <button className="p-[3px] relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r  from-slate-500 to-slate-700 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-[#F7F2DA] hover:bg-transparent">
                          Liquidity
                        </div>
                      </button>
                    </Link>
             
                    <Link href="/lisiting">
                      <button className="p-[3px] relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r  from-slate-500 to-slate-700 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-[#F7F2DA] hover:bg-transparent">
                          Listing
                        </div>
                      </button>
                    </Link>    
                       <Link href="/website-comment">
                      <button className="p-[3px] relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r  from-slate-500 to-slate-700 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-[#F7F2DA] hover:bg-transparent">
                     Comment
                        </div>
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button className="p-[3px] relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r  from-slate-500 to-slate-700 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-[#F7F2DA] hover:bg-transparent">
                          Contact
                        </div>
                      </button>
                    </Link>
                    <div className="w-full">
            <FullConnectButton />
            </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-xl text-center font-bold mt-6 md:hidden px-4 md:px-8">
                      Transaction History
                    </h2>
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