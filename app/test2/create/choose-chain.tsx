


"use client";
import { useState, useEffect, ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react'
import { useChainId, useChains, useAccount } from 'wagmi'
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { Card } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import { NetworkEthereum, NetworkOptimism, NetworkArbitrumOne, IconComponentProps } from '@web3icons/react'
import { SEPOLIA_ARBITRUM_CHAIN_ID } from '@/constants';

interface CreateTokenPageProps {
    children: ReactNode;
}

export const networkConfigs = [
    {
        chainId: 421614, // Base Sepolia
        name: 'Arbitrum',
        Icon: NetworkArbitrumOne,
        bgClass: 'bg-gradient-to-r from-[#0052FF] via-[#1E54FF] to-[#3C76FF]',
        recommended: true,
    },
    {
        chainId: 11155111, // Sepolia
        name: 'Ethereum',
        Icon: NetworkEthereum,
        bgClass: 'bg-gradient-to-r from-[#627EEA] via-[#4A67D8] to-[#3C3C3D]',
    },
    {
        chainId: 11155420, // Optimism Sepolia
        name: 'Optimism',
        Icon: NetworkOptimism,
        bgClass: 'bg-gradient-to-r from-[#FF0420] via-[#FF4D00] to-[#FF7A00]',
    },
];
export const NetworkCardSmall: React.FC<{
    name: string;
    Icon: ForwardRefExoticComponent<Omit<IconComponentProps, "ref"> & RefAttributes<SVGSVGElement>>;
    isSelected: boolean;
    onClick: () => void;
    bgClass: string;
    recommended?: boolean;
}> = ({ name, Icon, isSelected, onClick, bgClass, recommended }) => {
    const chainId = useChainId();

    return (
        <Card
            className={`w-full h-30  md:h-40 rounded-lg overflow-hidden cursor-pointer ${bgClass} transition-all duration-300 transform hover:scale-105 ${isSelected ? 'ring-2 ring-primary' : ''} relative`}
            onClick={onClick}
        >
            <div className="flex flex-col items-center justify-center h-full p-3">
                <div className="mb-2">
                    <Icon size={36} variant="branded" className="w-9 h-9" />
                </div>
                <h2 className="text-sm font-semibold text-white text-center">{name}</h2>
                {recommended && (
                    <div className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center">
                        <span className="mr-1">Recommended</span>
                        <div className="relative">
                            <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};
export const NetworkCard: React.FC<{
    name: string;
    Icon: ForwardRefExoticComponent<Omit<IconComponentProps, "ref"> & RefAttributes<SVGSVGElement>>;
    bgClass: string;
    isSelected: boolean;
    onClick: () => void;
    recommended?: boolean;
}> = ({ name, Icon, bgClass, isSelected, onClick, recommended }) => {
    const chainId = useChainId();
    return (
        <Card
            className={`w-full sm:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden ${bgClass} cursor-pointer transition-all duration-300 transform hover:scale-105 ${isSelected ? 'ring-2 ring-primary' : ''} relative`}
            onClick={onClick}
        >
            <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6">
                <div className="mb-6 sm:mb-8">
                    <Icon size={96} variant="branded" className="sm:w-32 sm:h-32" />
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-white text-center">{name}</h2>
            </div>
            {recommended && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <span className="mr-2 text-[10px] sm:text-sm">Recommended</span>
                    <div className="relative">
                        <span className=" absolute inline-flex h-3 w-3 rounded-full bg-red-400 animate-ping opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                </div>
            )}
        </Card>
    );
};

const ActionCard: React.FC<{ message: string; actionText: string; onAction: () => void }> = ({ message, actionText, onAction }) => (
    <Card className="w-full max-w-md p-6 sm:p-8 bg-card text-card-foreground shadow-lg rounded-xl">
        <div className="flex flex-col items-center space-y-6">
            <p className="text-base sm:text-xl text-center">{message}</p>
            <Button
                onClick={onAction}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground rounded-lg text-base sm:text-xl font-semibold hover:bg-primary/90 transition-colors"
            >
                {actionText}
            </Button>
        </div>
    </Card>
);

const CreateTokenPage: React.FC<CreateTokenPageProps> = ({ children }) => {
    const currentChainId = useChainId()
    const chains = useChains();
    const { address, isConnected } = useAccount()
    const { openConnectModal } = useConnectModal()
    const { openChainModal } = useChainModal()
    const [selectedChainId, setSelectedChainId] = useState<number | null>(null)
    useEffect(() => {
        if (selectedChainId && isConnected) {
            if (selectedChainId !== currentChainId) {
                openChainModal?.()
            }
        }
    }, [selectedChainId, currentChainId, isConnected, openChainModal])

    const handleChainSelect = (chainId: number) => {
        setSelectedChainId(chainId)
        if (!isConnected) {
            openConnectModal?.()
        } else if (chainId !== currentChainId) {
            openChainModal?.()
        }
    }

    const availableNetworks = networkConfigs.filter(network =>
        chains.some(chain => chain.id === network.chainId)
    );

    const sortedNetworks = [...availableNetworks].sort((a, b) => {
        if (a.recommended) return -1;
        if (b.chainId === SEPOLIA_ARBITRUM_CHAIN_ID) return 1;
        if (a.chainId === currentChainId) return -1;
        if (b.chainId === currentChainId) return 1;
        return 0;
    });

    const renderNetworkGrid = () => (
        <div className="p-4 sm:p-8 bg-background text-foreground">
            <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Select a Blockchain</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
                {sortedNetworks.map((network) => (
                    <NetworkCard
                        key={network.chainId}
                        name={network.name}
                        Icon={network.Icon}
                        bgClass={network.bgClass}
                        isSelected={network.chainId === currentChainId}
                        onClick={() => handleChainSelect(network.chainId)}
                        recommended={network.recommended}
                    />
                ))}
            </div>
        </div>
    )

    if (!isConnected || !selectedChainId) {
        return renderNetworkGrid()
    }

    if (selectedChainId !== currentChainId) {
        return (
            <>
                {renderNetworkGrid()}
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <ActionCard
                        message="Switch to the correct network to proceed with token creation."
                        actionText="Switch Network"
                        onAction={openChainModal || (() => { })}
                    />
                </div>
            </>
        )
    }

    return <div className="bg-background text-foreground">{children}</div>
}

export default CreateTokenPage