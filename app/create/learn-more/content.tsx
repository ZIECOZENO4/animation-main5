"use client"
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, BookOpen, Coins, Rocket } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    id: "standard-tokens",
    title: "Standard Tokens",
    icon: <Coins className="w-4 h-4" />
  },
  {
    id: "presale-tokens",
    title: "Presale Tokens",
    icon: <Rocket className="w-4 h-4" />
  }
];

export function LearnMoreAboutDifferentTokens() {
    const [activeSection, setActiveSection] = useState("overview");
    const [isNavOpen, setIsNavOpen] = useState(true);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-background">
            {/* Sidebar Navigation */}
            <motion.aside 
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                className="lg:w-64 bg-card border-r border-border"
            >
                <div className="sticky top-0 p-4">
                    <motion.div 
                        className="flex flex-col space-y-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold   text-gray-500  ">Documentation</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsNavOpen(!isNavOpen)}
                                className="lg:hidden"
                            >
                                <ChevronDown className={`w-4 h-4 transition-transform ${isNavOpen ? 'rotate-180' : ''}`} />
                            </Button>
                        </div>

                        {isNavOpen && (
                            <nav className="space-y-2">
                                {sections.map((section) => (
                                    <motion.button
                                        key={section.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-sm ${
                                            activeSection === section.id
                                                ? 'bg-gray-500   text-gray-500  -foreground'
                                                : 'hover:bg-accent'
                                        }`}
                                    >
                                        {section.icon}
                                        <span>{section.title}</span>
                                    </motion.button>
                                ))}
                            </nav>
                        )}
                    </motion.div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <motion.main 
                className="flex-1 p-6 lg:p-8"
                variants={fadeIn}
                initial="initial"
                animate="animate"
            >
                <motion.div 
                    className="max-w-4xl mx-auto space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.section 
                        id="overview"
                        variants={fadeIn}
                        className={activeSection === "overview" ? "block" : "hidden"}
                    >
                        <h1 className="text-3xl font-bold  text-gray-500  mb-6">
                            Token Creation Guide
                        </h1>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-lg text-muted-foreground">
                                Choose between standard tokens and presale tokens based on your project's needs and goals.
                                This guide will help you understand the key differences and make an informed decision.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section 
                        id="standard-tokens"
                        variants={fadeIn}
                        className={activeSection === "standard-tokens" ? "block" : "hidden"}
                    >
                        <h2 className="text-2xl font-semibold  text-gray-500  mb-4">Standard Tokens</h2>
                        <div className="bg-card rounded-lg p-6 shadow-lg">
                            <h3 className="text-xl font-medium mb-4">Key Features</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <motion.li 
                                    className="flex items-center space-x-2"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="w-2 h-2 bg-gray-500 rounded-full" />
                                    <span>Immediate creation and liquidity addition</span>
                                </motion.li>
                                <motion.li 
                                    className="flex items-center space-x-2"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="w-2 h-2 bg-gray-500 rounded-full" />
                                    <span>Suitable for projects ready for immediate trading</span>
                                </motion.li>
                                <motion.li 
                                    className="flex items-center space-x-2"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="w-2 h-2 bg-gray-500 rounded-full" />
                                    <span>Requires ETH for initial liquidity</span>
                                </motion.li>
                            </ul>
                        </div>
                    </motion.section>

                    <motion.section 
                        id="presale-tokens"
                        variants={fadeIn}
                        className={activeSection === "presale-tokens" ? "block" : "hidden"}
                    >
                        <h2 className="text-2xl font-semibold  text-gray-500  mb-4">Presale Tokens</h2>
                        <div className="bg-card rounded-lg p-6 shadow-lg">
                            <h3 className="text-xl font-medium mb-4">Key Features</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <motion.li 
                                    className="flex items-center space-x-2"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="w-2 h-2 bg-gray-500 rounded-full" />
                                    <span>Gradual token distribution following a bonding curve</span>
                                </motion.li>
                                <motion.li 
                                    className="flex items-center space-x-2"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="w-2 h-2 bg-gray-500 rounded-full" />
                                    <span>Ideal for projects seeking community-driven growth</span>
                                </motion.li>
                                <motion.li 
                                    className="flex items-center space-x-2"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="w-2 h-2 bg-gray-500 rounded-full" />
                                    <span>Lower initial investment</span>
                                </motion.li>
                            </ul>
                        </div>
                    </motion.section>

                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4 mt-8"
                        variants={fadeIn}
                    >
                        <Link href="/create" passHref>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="shadow" size="lg" className="w-full">
                                    Create Standard Token
                                </Button>
                            </motion.div>
                        </Link>
                        <Link href="/create/presale-token" passHref>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="ghost" size="lg" className="w-full">
                                    Start Presale Token
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.main>
        </div>
    );
}