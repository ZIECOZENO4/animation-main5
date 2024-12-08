"use client";
import Dashboard from "./content/body";
import BottomStatus from "./content/crypto-status-bar";
import TokenHeader from "./content/header";

export default function Home() {
  return (
    <main className="flex flex-col h-[calc(100vh-5rem)]">
      <TokenHeader />
      <div className="flex-grow overflow-hidden">
        <Dashboard />
      </div>
      <BottomStatus />
    </main>
  );
}