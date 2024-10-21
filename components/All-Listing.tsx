"use client";

import Image from "next/image";
import { Tabs } from "./ui/tabs";
import { TabsContent } from "./TabContent";

export function AllListing() {
  const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-[#F7F2DA] bg-black shadow-xl">
          <p>Product Tab</p>
          <TabsContent />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-[#F7F2DA] bg-black shadow-xl">
          <p>Services tab</p>
          <TabsContent />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-[#F7F2DA] bg-black shadow-xl">
          <p>Playground tab</p>
          <TabsContent />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-[#F7F2DA] bg-black shadow-xl">
          <p>Content tab</p>
          <TabsContent />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-[#F7F2DA] bg-black shadow-xl">
          <p>Random tab</p>
          <TabsContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-10">
      <Tabs tabs={tabs} />
    </div>
  );
}
