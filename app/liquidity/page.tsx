"use client"
import { useState } from "react";
import { Button, Card, CardHeader, Input, Modal, ModalBody, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"

export default function Component() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDepositClicked, setIsDepositClicked] = useState(false);
  const [isWithdrawClicked, setIsWithdrawClicked] = useState(false);

  const handleDepositClick = () => {
    setIsDepositClicked(true);
    onOpen();
  };

  const handleWithdrawClick = () => {
    setIsWithdrawClicked(true);
    onOpen();
  };

  return (
    <div className="py-8 px-4 md:px-[10vw] text-[#F7F2DA] min-h-screen mt-2 md:mt-4">
      <style jsx global>{`
        Input:focus, textarea:focus {
          outline: none;
          border-color: #4ae436 !important;
        }
      `}</style>
      
      <Card className="bg-black border border-gray-600 p-6 mb-8">
        <h1 className="text-gray-400 mb-4">Liquidity Pool</h1>
        <p className="text-2xl mb-6">Deposit and withdraw your liquidity</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-gray-400 mb-2">Your Balance</h2>
            <p className="text-2xl">0.00 ETH</p>
          </div>
          <div>
            <h2 className="text-gray-400 mb-2">Your Pool Balance</h2>
            <p className="text-2xl">0.00 POL</p>
          </div>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-black border border-gray-600 p-6">
          <CardHeader>
            <h2 className="text-2xl">Deposit</h2>
          </CardHeader>
          <div className="mt-4">
            <label htmlFor="deposit-amount" className="block text-sm font-medium text-gray-400 mb-2">
              Amount to Deposit
            </label>
            <Input
              id="deposit-amount"
              type="number"
              placeholder="0.0"
              className="bg-black w-full text-[#F7F2DA] mb-4 rounded-2xl border-white hover:border hover:border-green-500"
              variant="bordered"
            />
            <button
            type="submit"
            onClick={handleDepositClick}
          className='flex flex-row w-full shake-button'>
      <div className="top-9 left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      <div className='flex flex-col flex-grow'>
        <div className="w-full h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
          <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
          DEOSIT COIN
          </span>
        </div>
        <div className="top-[69.7px] left-[1305px] w-full h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      </div>
    </button>
          </div>
        </Card>
        
        <Card className="bg-black border border-gray-600 p-6">
          <CardHeader>
            <h2 className="text-2xl">Withdraw</h2>
          </CardHeader>
          <div className="mt-4">
            <label htmlFor="withdraw-amount" className="block text-sm font-medium text-gray-400 mb-2">
              Amount to Withdraw
            </label>
            <Input
              id="withdraw-amount"
              type="number"
              placeholder="0.0"
              className="bg-black w-full text-[#F7F2DA] mb-4 rounded-2xl border-white hover:border hover:border-green-500"
              variant="bordered"
            />
 
            <button
            type="submit"
            onClick={handleWithdrawClick}
          className='flex flex-row w-full shake-button'>
      <div className="top-9 left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      <div className='flex flex-col flex-grow'>
        <div className="w-full h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
          <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
         WITHDRAW COIN
          </span>
        </div>
        <div className="top-[69.7px] left-[1305px] w-full h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      </div>
    </button>
          </div>
        </Card>
      </div>
      
      <Button
        variant="bordered"
        className="w-full shake-button bg-gradient-to-r mt-2 md:mt-6 from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 text-[#F7F2DA] border-blue-300"
      >
        Learn More
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => {
          onClose();
          setIsDepositClicked(false);
          setIsWithdrawClicked(false);
        }}
        className="bg-gray-800 border border-gray-600"
      >
        <ModalHeader className="text-[#F7F2DA]">Success</ModalHeader>
        <ModalBody>
          <p className="text-[#F7F2DA]">
            {isDepositClicked ? "Deposit" : "Withdrawal"} successful!
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}