"use client"
import React from "react";
import { Card} from "@nextui-org/react";

const TransactionComponent = () => {
  return (
    <div className='w-full p-2 flex flex-col '>
      <h1 className='text-xl md:text-3xl text-center py-2 md:py-4'>Transaction History</h1>
      <Card className="bg-black p-4 flex   border border-slate-600 flex-row items-center justify-center h-48">
      <div className="text-gray-400 text-2xl flex flex-row gap-4">
      <svg width="30px" height="30px" className='text-gray-400 my-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.0619 4.4295C12.6213 3.54786 11.3636 3.54786 10.9229 4.4295L3.89008 18.5006C3.49256 19.2959 4.07069 20.2317 4.95957 20.2317H19.0253C19.9142 20.2317 20.4923 19.2959 20.0948 18.5006L13.0619 4.4295ZM9.34196 3.6387C10.434 1.45376 13.5508 1.45377 14.6429 3.63871L21.6758 17.7098C22.6609 19.6809 21.2282 22 19.0253 22H4.95957C2.75669 22 1.32395 19.6809 2.3091 17.7098L9.34196 3.6387Z" fill="#ffffff"></path>
              <path d="M12 8V13" stroke="#f20202" strokeWidth="1.7" strokeLinecap="round"></path>
              <path d="M12 16L12 16.5" stroke="#f20202" strokeWidth="1.7" strokeLinecap="round"></path>
            </g>
          </svg> <p>You have no current transaction history</p>
             </div>
      </Card>
    </div>
  );
};

export default TransactionComponent;