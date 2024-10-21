
"use client"
import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconInfoCircle,
  IconChartBar,
  IconExchange,
  IconReceipt2,
} from "@tabler/icons-react";

import InfoComponent from "./InfoComponent";
import TradeComponent from "./TradeComponent";
import ChartComponent from "./ChartComponent";
import TransactionComponent from "./TransactionComponent";


const MobileCoin = () => {
  const [activeComponent, setActiveComponent] = useState("Info");

  const links = [
    {
      title: "Info",
      icon: (
        <IconInfoCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => setActiveComponent("Info"),
    },
    {
      title: "Trade",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => setActiveComponent("Trade"),
    },
    {
      title: "Chart",
      icon: (
        <IconChartBar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => setActiveComponent("Chart"),
    },
    {
      title: "Transaction",
      icon: (
        <IconReceipt2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => setActiveComponent("Transaction"),
    },
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case "Info":
        return <InfoComponent />;
      case "Trade":
        return <TradeComponent />;
      case "Chart":
        return <ChartComponent />;
      case "Transaction":
        return <TransactionComponent />;
      default:
        return <InfoComponent />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {renderComponent()}
      <FloatingDock
        className="fixed bottom-2 left-1/2 transform z-50 -translate-x-1/2"
        items={links}
        activeComponent={activeComponent}
      />
    </div>
  );
}

export default MobileCoin;