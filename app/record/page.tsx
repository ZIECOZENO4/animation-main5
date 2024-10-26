"use client";
import Dashboard from "./content/body";
import BottomStatus from "./content/crypto-status-bar";
import TokenHeader from "./content/header";

export default function Home() {
  return (
    <main className="">
 <TokenHeader />
 <Dashboard />
 <BottomStatus />
    </main>
  );
}
