"use client";
import React, { useState, useEffect } from "react";
import { Upload, ChevronUp, ChevronDown } from "lucide-react";
import { Progress, Modal, ModalBody, ModalFooter, ModalHeader, Button, useDisclosure } from "@nextui-org/react";
import { FileUpload } from "@/components/file-upload";

export default function Component() {
  const [showMore, setShowMore] = useState(false);
  const [ethAmount, setEthAmount] = useState(0);
  const [liquidity, setLiquidity] = useState(0);
  const [lockPercentage, setLockPercentage] = useState(0);
  const [initialPrice, setInitialPrice] = useState<number>(0);
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (liquidity > 0) {
      const price = ethAmount / (liquidity / 1000);
      setInitialPrice(Number(price.toFixed(0)));
    }
  }, [ethAmount, liquidity]);

  const isFormValid = () => {
    return name && ticker && description  && ethAmount > 0 && liquidity > 0 && lockPercentage > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onOpen();
    }
  };

  return (
    <div className="min-h-screen mt-8 text-gray-300 p-4">
      <style jsx global>{`
        input:focus,
        textarea:focus {
          outline: none;
          border-color: #4ae436 !important;
        }
      `}</style>

      <main className="max-w-3xl mx-auto ">
        <h1 className="text-xl md:text-2xl sm:text-3xl text-center mb-8 sm:mb-12">Fill the details to kick off your new coin</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col w-full gap-4 md:hidden">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                placeholder="Token name"
                className="w-full md:w-1/2 bg-black rounded p-2 border border-gray-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Ticker</label>
              <input
                type="text"
                placeholder="Token ticker"
                className="w-full md:w-1/2 bg-black rounded p-2 border border-gray-700"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="md:flex hidden space-x-4">
            <div className="flex-1">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                placeholder="Token name"
                className="w-full bg-black rounded p-2 border border-gray-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Ticker</label>
              <input
                type="text"
                placeholder="Token ticker"
                className="w-full bg-black rounded p-2 border border-gray-700"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              placeholder="Token description"
              className="w-full bg-black rounded p-2 border border-gray-700 h-24 md:h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label className="block mb-2">Image</label>
            <FileUpload />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-2">ETH Amount</label>
              <input
                type="number"
                placeholder="1"
                className="w-full bg-black rounded p-2 border border-gray-700"
                onChange={(e) => setEthAmount(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">liquidity</label>
              <input
                type="number"
                placeholder="10000"
                className="w-full bg-black rounded p-2 border border-gray-700"
                onChange={(e) => setLiquidity(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">
              Percentage of liquidity to be locked
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full md:w-1/2 bg-black rounded p-2 border border-gray-700"
              onChange={(e) =>
                setLockPercentage(parseFloat(e.target.value) || 0)
              }
              required
            />
          </div>
          <div className="bg-black border border-gray-700 rounded p-4 flex flex-col md:flex-row md:justify-between gap-4">
            <div className="md:w-1/2 w-full flex flex-col">
              <h3 className="font-bold mb-2">Liquidity Information</h3>
              <div className="mb-2">
                <Progress
                  aria-label="Liquidity locked"
                  size="md"
                  value={lockPercentage}
                  color="success"
                  showValueLabel={false}
                  className="max-w-md"
                />
              </div>
            </div>
            <div className="md:w-1/2 w-full flex flex-col">
              <p className="mt-2">
                <span className="font-bold mb-2">Initial Price</span>
                <br />
                The initial price will be approximately:{" "}
                {initialPrice.toFixed(8)} ETH per token
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-black border border-gray-700 text-[#F7F2DA] p-2 rounded flex items-center justify-center hover:bg-gradient-to-r from-slate-500 to-slate-700 transition-colors duration-300"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <>
                Hide More Options
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show More Options
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
          {showMore && (
            <>
              <div>
                <label className="block mb-2">Twitter Link</label>
                <input
                  type="text"
                  placeholder="https://twitter.com/..."
                  className="w-full bg-black rounded p-2 border border-gray-700"
                />
              </div>
              <div>
                <label className="block mb-2">Telegram Link</label>
                <input
                  type="text"
                  placeholder="https://t.me/..."
                  className="w-full bg-black rounded p-2 border border-gray-700"
                />
              </div>
              <div>
                <label className="block mb-2">Website</label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full bg-black rounded p-2 border border-gray-700"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!isFormValid()}
          className='flex flex-row w-full shake-button'>
      <div className="top-9 left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      <div className='flex flex-col flex-grow'>
        <div className="w-full h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
          <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
          DEPLOY COIN
          </span>
        </div>
        <div className="top-[69.7px] left-[1305px] w-full h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      </div>
    </button>
        </form>
      </main>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        className="bg-gray-800 border border-gray-600"
      >
        <ModalHeader className="text-[#F7F2DA]">Success</ModalHeader>
        <ModalBody>
          <p className="text-[#F7F2DA]">
            Your coin has been successfully created!
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}