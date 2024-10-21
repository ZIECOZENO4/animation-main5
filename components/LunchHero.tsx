

"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "./ui/apple-cards-carousel";

interface BlockchainData {
  category: string;
  title: string;
  src: string;
  content: React.ReactNode;
}

export function BlockchainCarouselDemo(): JSX.Element {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 ">
       Select a Blockchain
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

interface BlockchainContentProps {
  content: string;
  src: string;
  title: string;
}

const BlockchainContent: React.FC<BlockchainContentProps> = ({ content, src, title }) => {
  return (
    <div className="p-8 md:p-14 rounded-3xl mb-4 shadow-2xl bg-gray-900 border border-gray-800">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <p className="text-neutral-400 text-base md:text-2xl  max-w-3xl mx-auto">
        {content}
      </p>
      <Image
        src={src}
        alt={`${title} logo`}
        height={200}
        width={200}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

const data: BlockchainData[] = [
  {
    category: 'Layer 1',
    title: 'Ethereum',
    src: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    content: <BlockchainContent content='Ethereum is a decentralized platform for building smart contracts and dApps.' src='https://cryptologos.cc/logos/ethereum-eth-logo.png' title='Ethereum' />,
  },
  {
    category: 'Layer 1',
    title: 'Bitcoin',
    src: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    content: <BlockchainContent content='Bitcoin is the first decentralized cryptocurrency, launched in 2009.' src='https://cryptologos.cc/logos/bitcoin-btc-logo.png' title='Bitcoin' />,
  },
  {
    category: 'Layer 2',
    title: 'Arbitrum',
    src: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
    content: <BlockchainContent content='Arbitrum is a Layer 2 solution for Ethereum that improves scalability and reduces fees.' src='https://cryptologos.cc/logos/arbitrum-arb-logo.png' title='Arbitrum' />,
  },
  {
    category: 'Layer 2',
    title: 'zkSync',
    src: 'https://cryptologos.cc/logos/zksync-logo.png',
    content: <BlockchainContent content='zkSync is a user-friendly Layer 2 scaling solution for Ethereum, leveraging zk-Rollups.' src='https://cryptologos.cc/logos/zksync-logo.png' title='zkSync' />,
  },
  {
    category: 'Layer 1',
    title: 'Binance Smart Chain',
    src: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    content: <BlockchainContent content='A blockchain network running in parallel to Binance Chain, facilitating smart contracts.' src='https://cryptologos.cc/logos/binance-coin-bnb-logo.png' title='Binance Smart Chain' />,
  },
  {
    category: 'Layer 1',
    title: 'Cardano',
    src: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    content: <BlockchainContent content='Cardano is a blockchain platform for smart contracts with a focus on sustainability and security.' src='https://cryptologos.cc/logos/cardano-ada-logo.png' title='Cardano' />,
  },
];