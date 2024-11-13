// "use client";

// import { motion } from "framer-motion";
// import React from "react";
// import EnhanceTradingView from "../chart/enhanced-trading-interface";
// export default function TestContent() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const MiddleBorderComponent = ({
//     children
//   }: {
//     children?: React.ReactNode;
//   }) => (
//     <div className="relative h-full">
//       <div className="relative p-6 h-full">{children}</div>

//       {/* Top border - Solid Black */}
//       <div
//         className="absolute -top-[2px] -right-[2px] -left-[2px]"
//         style={{
//           height: "2px",
//           backgroundColor: "#000000"
//         }}
//       />

//       {/* Bottom border - Custom Pattern */}
//       <div
//         className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
//         style={{
//           height: "2px",
//           backgroundImage: `
//       repeating-linear-gradient(
//         to right,
//         #555555 0,
//         #555555 8px,
//         transparent 8px,
//         transparent 16px,
//         #555555 16px,
//         #555555 32px,
//         transparent 32px,
//         transparent 48px
//       )
//     `
//         }}
//       />

//       {/* Left border - Solid Black */}
//       <div
//         className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
//         style={{
//           width: "2px",
//           backgroundColor: "#000000"
//         }}
//       />

//       {/* Right border - Solid Black */}
//       <div
//         className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
//         style={{
//           width: "2px",
//           backgroundColor: "#000000"
//         }}
//       />
//     </div>
//   );

//   const BorderComponent = ({
//     children,
//     className = ""
//   }: {
//     children?: React.ReactNode;
//     className?: string;
//   }) => (
//     <div className="relative h-full">
//       <div className="relative  h-full">{children}</div>
//       {/* Top border */}
//       <div
//         className="absolute -top-[2px] -right-[2px] -left-[2px]"
//         style={{
//           height: "2px",
//           backgroundImage: `
//       repeating-linear-gradient(
//         to right,
//         #555555 0,
//         #555555 8px,
//         transparent 8px,
//         transparent 16px,
//         #555555 16px,
//         #555555 32px,
//         transparent 32px,
//         transparent 48px
//       )
//     `
//         }}
//       />
//       {/* Bottom border */}
//       <div
//         className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
//         style={{
//           height: "2px",
//           backgroundImage: `
//       repeating-linear-gradient(
//         to right,
//         #555555 0,
//         #555555 8px,
//         transparent 8px,
//         transparent 16px,
//         #555555 16px,
//         #555555 32px,
//         transparent 32px,
//         transparent 48px
//       )
//     `
//         }}
//       />
//       {/* Left border */}
//       <div
//         className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
//         style={{
//           width: "2px",
//           backgroundImage: `
//       repeating-linear-gradient(
//         to bottom,
//         #555555 0,
//         #555555 8px,
//         transparent 8px,
//         transparent 16px,
//         #555555 16px,
//         #555555 32px,
//         transparent 32px,
//         transparent 48px
//       )
//     `
//         }}
//       />
//       {/* Right border */}
//       <div
//         className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
//         style={{
//           width: "2px",
//           backgroundImage: `
//       repeating-linear-gradient(
//         to bottom,
//         #555555 0,
//         #555555 8px,
//         transparent 8px,
//         transparent 16px,
//         #555555 16px,
//         #555555 32px,
//         transparent 32px,
//         transparent 48px
//       )
//     `
//         }}
//       />
//     </div>
//   );

//   const BoxComponent = ({ title }: { title: string }) => (
//     <motion.div
//       variants={itemVariants}
//       whileHover={{ scale: 1.02 }}
//       className="mb-4"
//     >
//       <BorderComponent>
//         <div className="flex justify-between items-center p-2">
//           <span className="text-xs text-gray-500">{title}</span>
//           <motion.div
//             whileHover={{ scale: 1.1, borderColor: "#ffffff" }}
//             whileTap={{ scale: 0.9 }}
//             className="w-4 h-4 border border-gray-800 cursor-pointer"
//           />
//         </div>
//       </BorderComponent>
//     </motion.div>
//   );

//   return (
//     <motion.div
//       className="overflow-hidden"
//       style={{ height: "calc(100vh - 5rem)" }}
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <div className="relative z-10 h-full p-2">
//         <div className="flex flex-row w-full  gap-6 h-full">
//           {/* Left Column */}
//           <div className="flex w-[70%] flex-col gap-6 h-full">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, ease: "easeOut" }}

//               className="relative h-[65%] w-full bg-[#000000]"
//             >
//               <BorderComponent>
//                 <motion.span
//                   className="text-sm  text-gray-500"
//                   whileHover={{ color: "#ffffff" }}
//                 >

//                   <div className="mx-0 pt-4 px-0  h-full w-full flex-grow ">
//                     <EnhanceTradingView />
//                   </div>
//                 </motion.span>
//               </BorderComponent>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}

//               className="relative h-[35%]  bg-[#000000]"
//             >
//               <BorderComponent>
//                 <motion.span
//                   className="text-sm text-gray-500"
//                   whileHover={{ color: "#ffffff" }}
//                 ></motion.span>
//               </BorderComponent>
//             </motion.div>
//           </div>

//           {/* Right Column */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="h-full  w-[30%]  bg-[#000000]"
//           >
//             <BorderComponent>
//               <div className="flex flex-col h-full p-6 gap-4">
//                 {/* Top Section */}

//                 <div className="space-y-4 h-[65%]">
//                   {/* First Row */}

//                   <div className="flex gap-4">
//                     <div className="w-[80%] h-[51px] bg-[#5555554D]">
//                       <BorderComponent>
//                         <div className="flex justify-end items-center h-full">
//                           <span className="text-[20px] pr-2 text-[#F7F2DA80]">
//                             MONAD
//                           </span>
//                         </div>
//                       </BorderComponent>
//                     </div>
//                     <div className="w-[20%] h-[51px] bg-[#5555554D]">
//                       <BorderComponent>
//                         <div className="flex items-center justify-center h-full"></div>
//                       </BorderComponent>
//                     </div>
//                   </div>
//                   {/* Second Row - Full Width */}
//                   <div className="w-full h-[51px] bg-[#5555554D]">
//                     <BorderComponent>
//                       <div className="flex justify-end items-center h-full">
//                         <span className="text-[20px] pr-2 text-[#F7F2DA80]">
//                           BEAT
//                         </span>
//                       </div>
//                     </BorderComponent>
//                   </div>
//                 </div>

//                 {/* Middle Empty Section with Border */}
//                 <div className="flex-grow">
//                   <MiddleBorderComponent />
//                 </div>

//                 {/* Bottom Section */}
//                 <div className="flex flex-col justify-between h-[35%]"> {/* Changed from space-y-4 to flex with justify-between */}
//     <div className="space-y-4"> {/* Container for top two rows */}
//         {/* First Row */}
//         <div className="flex gap-4">
//             <div className="w-[80%] h-[51px] bg-[#5555554D]">
//                 <BorderComponent>
//                     <div className="flex justify-center items-center h-full">
//                         <span className="text-[20px] text-[#F7F2DA80]">
//                             MONAD
//                         </span>
//                     </div>
//                 </BorderComponent>
//             </div>
//             <div className="w-[20%] h-[51px] bg-[#5555554D]">
//                 <BorderComponent>
//                     <div className="flex items-center justify-center h-full"></div>
//                 </BorderComponent>
//             </div>
//         </div>
//         {/* Second Row */}
//         <div className="flex gap-4">
//             <div className="w-[80%] h-[51px] bg-[#5555554D]">
//                 <BorderComponent>
//                     <div className="flex justify-center items-center h-full">
//                         <span className="text-[20px] text-[#F7F2DA80]">
//                             MONAD
//                         </span>
//                     </div>
//                 </BorderComponent>
//             </div>
//             <div className="w-[20%] h-[51px] bg-[#5555554D]">
//                 <BorderComponent>
//                     <div className="flex items-center justify-center h-full"></div>
//                 </BorderComponent>
//             </div>
//         </div>
//     </div>

//     {/* Third Row - Full Width (at bottom) */}
//     <div className="w-full h-[51px] bg-[#5555554D]">
//         <BorderComponent>
//             <div className="flex justify-end items-center h-full">
//                 <span className="text-[20px] pr-2 text-[#F7F2DA80]">
//                     BEAT
//                 </span>
//             </div>
//         </BorderComponent>
//     </div>
// </div>
//               </div>
//             </BorderComponent>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import React from "react";
import EnhanceTradingView from "../chart/enhanced-trading-interface";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@nextui-org/react";
import { useState } from "react";
interface Token {
  name: string;
  rate: string;
  chain: string;
  symbol: string;
  balance: string;
}

interface TokenSelectModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onTokenSelect: (token: Token) => void;
  selectedTokens: string[];
}

interface ConfirmSwapModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  token1: Token | null;
  token2: Token | null;
  amount1: string;
  amount2: string;
}

interface BorderComponentProps {
  children: React.ReactNode;
}

const tokens: Token[] = [
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Arbitrum",
    symbol: "MONAD",
    balance: "100"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Ethereum",
    symbol: "BEAT",
    balance: "200"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Polygon",
    symbol: "USDC",
    balance: "500"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Polygon",
    symbol: "MONAD",
    balance: "100"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Arbitrum",
    symbol: "BEAT",
    balance: "200"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Ethereum",
    symbol: "USDC",
    balance: "500"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Polygon",
    symbol: "MONAD",
    balance: "100"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Ethereum",
    symbol: "BEAT",
    balance: "200"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Arbitrum",
    symbol: "USDC",
    balance: "500"
  }
];

const TokenSelectModal: React.FC<TokenSelectModalProps> = ({
  isOpen,
  onOpenChange,
  onTokenSelect,
  selectedTokens
}) => {
  const availableTokens = tokens.filter(
    (token) => !selectedTokens.includes(token.symbol)
  );
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-[#000000]/50 backdrop-blur-sm",
        base: "bg-[#000000] border-[#555555] border-2",
        header: "border-b border-[#555555]",
        body: "py-6"
      }}
    >
      <ModalContent>
        <ModalHeader className="text-[#F7F2DA80]">Select Token</ModalHeader>
        <ModalBody>
          <input
            type="text"
            placeholder="Search tokens..."
            className="w-full bg-[#5555554D] text-[#F7F2DA80] p-3 rounded-lg border border-[#555555] focus:outline-none"
          />
          <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto">
            {availableTokens.map((token) => (
              <motion.div
                key={token.symbol}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-between items-center p-3 cursor-pointer hover:bg-[#5555554D] rounded-lg"
                onClick={() => onTokenSelect(token)}
              >
                <div className="flex flex-col">
                  <span className="text-[#F7F2DA80] text-lg">{token.name}</span>
                  <span className="text-[#F7F2DA40] text-xs">
                    ${token.rate}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[#F7F2DA40] text-sm">
                    {token.chain}
                  </span>
                  <span className="text-[#F7F2DA40] text-xs">
                    Balance: {token.balance}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ConfirmSwapModal: React.FC<ConfirmSwapModalProps> = ({
  isOpen,
  onOpenChange,
  token1,
  token2,
  amount1,
  amount2
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-[#000000]/50 backdrop-blur-sm",
        base: "bg-[#000000] border-[#555555] border-2",
        header: "border-b border-[#555555]",
        body: "py-6"
      }}
    >
      <ModalContent>
        <ModalHeader className="text-[#F7F2DA80]">Confirm Swap</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="bg-[#5555554D] p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-[#F7F2DA80]">From:</span>
                <span className="text-[#F7F2DA80]">
                  {amount1} {token1?.symbol}
                </span>
              </div>
              <div className="text-[#F7F2DA40] text-sm">
                Chain: {token1?.chain}
              </div>
            </div>

            <div className="bg-[#5555554D] p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-[#F7F2DA80]">To:</span>
                <span className="text-[#F7F2DA80]">
                  {amount2} {token2?.symbol}
                </span>
              </div>
              <div className="text-[#F7F2DA40] text-sm">
                Chain: {token2?.chain}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#5555554D] text-[#F7F2DA80] p-3 rounded-lg border border-[#555555]"
              onClick={() => {
                // Handle swap confirmation here
                console.log("Swap confirmed");
              }}
            >
              Confirm Swap
            </motion.button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default function TestContent() {
  const tokenModal = useDisclosure();
  const confirmModal = useDisclosure();
  const [selectedToken1, setSelectedToken1] = useState<Token | null>(null);
  const [selectedToken2, setSelectedToken2] = useState<Token | null>(null);
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [amount1, setAmount1] = useState<string>("");
  const [amount2, setAmount2] = useState<string>("");

  const handleTokenSelect = (token: Token) => {
    if (activeInput === 1) {
      setSelectedToken1(token);
    } else {
      setSelectedToken2(token);
    }
    tokenModal.onClose();
  };

  const selectedTokens = [
    selectedToken1?.symbol,
    selectedToken2?.symbol
  ].filter((symbol): symbol is string => symbol !== undefined);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const MiddleBorderComponent = ({
    children
  }: {
    children?: React.ReactNode;
  }) => (
    <div className="relative h-full">
      <div className="relative p-6 h-full">{children}</div>

      {/* Top border - Solid Black */}
      <div
        className="absolute -top-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundColor: "#000000"
        }}
      />

      {/* Bottom border - Custom Pattern */}
      <div
        className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to right,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />

      {/* Left border - Solid Black */}
      <div
        className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundColor: "#000000"
        }}
      />

      {/* Right border - Solid Black */}
      <div
        className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundColor: "#000000"
        }}
      />
    </div>
  );

  const BorderComponent = ({
    children,
    className = ""
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => (
    <div className="relative h-full">
      <div className="relative  h-full">{children}</div>
      {/* Top border */}
      <div
        className="absolute -top-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to right,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
      {/* Bottom border */}
      <div
        className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to right,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
      {/* Left border */}
      <div
        className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to bottom,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
      {/* Right border */}
      <div
        className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to bottom,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
    </div>
  );

  const BoxComponent = ({ title }: { title: string }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="mb-4"
    >
      <BorderComponent>
        <div className="flex justify-between items-center p-2">
          <span className="text-xs text-gray-500">{title}</span>
          <motion.div
            whileHover={{ scale: 1.1, borderColor: "#ffffff" }}
            whileTap={{ scale: 0.9 }}
            className="w-4 h-4 border border-gray-800 cursor-pointer"
          />
        </div>
      </BorderComponent>
    </motion.div>
  );

  return (
    <motion.div
      className="overflow-hidden"
      style={{ height: "calc(100vh - 5rem)" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative z-10 h-full p-2">
        <div className="flex flex-row w-full  gap-6 h-full">
          {/* Left Column */}
          <div className="flex w-[70%] flex-col gap-6 h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative h-[65%] w-full bg-[#000000]"
            >
              <BorderComponent>
                <motion.span
                  className="text-sm  text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                >
                  <div className="mx-0 pt-4 px-0  h-full w-full flex-grow ">
                    <EnhanceTradingView />
                  </div>
                </motion.span>
              </BorderComponent>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="relative h-[35%]  bg-[#000000]"
            >
              <BorderComponent>
                <motion.span
                  className="text-sm text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                ></motion.span>
              </BorderComponent>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full  w-[30%]  bg-[#000000]"
          >
            <BorderComponent>
              <div className="flex flex-col h-full p-6 gap-4">
                {/* Top Section */}

                <div className="space-y-4 h-[65%]">
                  <p className="text-center mb-2 text-[#F7F2DA80] text-xl">
                    SWAP TOKENS
                  </p>

                  {/* First Token Input */}
                  <div className="flex gap-4">
                    <div className="w-[80%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex justify-between items-center h-full px-4">
                          <input
                            type="text"
                            value={amount1}
                            onChange={(e) => setAmount1(e.target.value)}
                            placeholder="Enter amount..."
                            className="bg-transparent text-[#F7F2DA80] text-[20px] w-1/2 focus:outline-none placeholder:text-[#F7F2DA40]"
                          />
                          {selectedToken1 && (
                            <div className="flex flex-col items-end">
                              <span className="text-[20px] text-[#F7F2DA80]">
                                {selectedToken1.symbol}
                              </span>
                              <span className="text-xs text-[#F7F2DA40]">
                                {selectedToken1.chain}
                              </span>
                            </div>
                          )}
                        </div>
                      </BorderComponent>
                    </div>
                    <motion.div
                      className="w-[20%] h-[51px] bg-[#5555554D]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BorderComponent>
                        <div
                          className="flex items-center text-xs justify-center text-[#F7F2DA80] h-full cursor-pointer"
                          onClick={() => {
                            setActiveInput(1);
                            tokenModal.onOpen();
                          }}
                        >
                          Select
                        </div>
                      </BorderComponent>
                    </motion.div>
                  </div>

                  {/* Second Token Input */}
                  <div className="flex gap-4">
                    <div className="w-[80%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex justify-between items-center h-full px-4">
                          <input
                            type="text"
                            value={amount2}
                            onChange={(e) => setAmount2(e.target.value)}
                            placeholder="Enter amount..."
                            className="bg-transparent text-[#F7F2DA80] text-[20px] w-1/2 focus:outline-none placeholder:text-[#F7F2DA40]"
                          />
                          {selectedToken2 && (
                            <div className="flex flex-col items-end">
                              <span className="text-[20px] text-[#F7F2DA80]">
                                {selectedToken2.symbol}
                              </span>
                              <span className="text-xs text-[#F7F2DA40]">
                                {selectedToken2.chain}
                              </span>
                            </div>
                          )}
                        </div>
                      </BorderComponent>
                    </div>
                    <motion.div
                      className="w-[20%] h-[51px] bg-[#5555554D]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BorderComponent>
                        <div
                          className="flex items-center text-xs justify-center text-[#F7F2DA80] h-full cursor-pointer"
                          onClick={() => {
                            setActiveInput(2);
                            tokenModal.onOpen();
                          }}
                        >
                          Select
                        </div>
                      </BorderComponent>
                    </motion.div>
                  </div>

                  {/* Confirm Button */}
                  <motion.div
                    className="w-full h-[51px] bg-[#5555554D]"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      if (
                        selectedToken1 &&
                        selectedToken2 &&
                        amount1 &&
                        amount2
                      ) {
                        confirmModal.onOpen();
                      }
                    }}
                  >
                    <BorderComponent>
                      <div className="flex justify-center items-center h-full cursor-pointer">
                        <span className="text-[20px] pr-2 text-[#F7F2DA80]">
                          CONFIRM SWAP
                        </span>
                      </div>
                    </BorderComponent>
                  </motion.div>

                  <TokenSelectModal
                    isOpen={tokenModal.isOpen}
                    onOpenChange={tokenModal.onOpenChange}
                    onTokenSelect={handleTokenSelect}
                    selectedTokens={selectedTokens}
                  />

                  <ConfirmSwapModal
                    isOpen={confirmModal.isOpen}
                    onOpenChange={confirmModal.onOpenChange}
                    token1={selectedToken1}
                    token2={selectedToken2}
                    amount1={amount1}
                    amount2={amount2}
                  />
                </div>

                {/* Middle Empty Section with Border */}
                <div className="flex-grow">
                  <MiddleBorderComponent />
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col justify-between h-[35%]">
                  {" "}
                  {/* Changed from space-y-4 to flex with justify-between */}
                  <div className="space-y-4">
                    {" "}
                    {/* Container for top two rows */}
                    {/* First Row */}
                    <div className="flex gap-4">
                      <div className="w-[80%] h-[51px] bg-[#5555554D]">
                        <BorderComponent>
                          <div className="flex justify-center items-center h-full">
                            <span className="text-[20px] text-[#F7F2DA80]">
                              MONAD
                            </span>
                          </div>
                        </BorderComponent>
                      </div>
                      <div className="w-[20%] h-[51px] bg-[#5555554D]">
                        <BorderComponent>
                          <div className="flex items-center justify-center h-full"></div>
                        </BorderComponent>
                      </div>
                    </div>
                    {/* Second Row */}
                    <div className="flex gap-4">
                      <div className="w-[80%] h-[51px] bg-[#5555554D]">
                        <BorderComponent>
                          <div className="flex justify-center items-center h-full">
                            <span className="text-[20px] text-[#F7F2DA80]">
                              MONAD
                            </span>
                          </div>
                        </BorderComponent>
                      </div>
                      <div className="w-[20%] h-[51px] bg-[#5555554D]">
                        <BorderComponent>
                          <div className="flex items-center justify-center h-full"></div>
                        </BorderComponent>
                      </div>
                    </div>
                  </div>
                  {/* Third Row - Full Width (at bottom) */}
                  <div className="w-full h-[51px] bg-[#5555554D]">
                    <BorderComponent>
                      <div className="flex justify-end items-center h-full">
                        <span className="text-[20px] pr-2 text-[#F7F2DA80]">
                          BEAT
                        </span>
                      </div>
                    </BorderComponent>
                  </div>
                </div>
              </div>
            </BorderComponent>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
