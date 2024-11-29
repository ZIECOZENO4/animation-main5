
import React from 'react'
import Image from 'next/image'
import { Card } from "@nextui-org/react"
import { Badge } from "@nextui-org/react"
import { useRouter } from 'next/navigation'
import { extractAlphabetsFromAddress } from '@/lib/extraName'
import Link from 'next/link'
import { useEthereumPrice } from '../../../hooks/useEthPrice'
import { useCurrencyStore } from '@/zustand-store'
import { FormattedToken } from '@/hooks/useFetchTokens'
// Add this line:
import { FaLock } from 'react-icons/fa'

interface CustomCardProps {
    token: FormattedToken;
    batchId: string;
    batchState: number;
}

const BatchState = {
    INACTIVE: 0,
    INITIAL_VOTING: 1,
    QUEUE: 2,
    ANONYMOUS_VOTING: 3,
    COUNTING: 4,
    DISPUTABLE: 5,
    COMPLETED: 6
} as const;

export const CustomCard: React.FC<CustomCardProps> = ({ token, batchId, batchState }) => {
    const router = useRouter()
    const { isEth } = useCurrencyStore()
    const { data: ethPrice } = useEthereumPrice()

    const isAnonymousPhase = batchState >= BatchState.ANONYMOUS_VOTING
    const votingData = isAnonymousPhase ? token.metrics.anonymousVoting : token.metrics.initialVoting

    const truncatedDescription = token.description.length > 100
        ? token.description.substring(0, 100) + '...'
        : token.description

    const handleClick = () => {
        router.push(`/batch/${batchId}/tokens/${token.address}`)
    }

    // Calculate market value based on current phase
    const totalStakedNum = parseFloat(votingData.totalStaked)
    const marketValue = totalStakedNum * (ethPrice?.ethereum?.usd ?? 0)

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 2
        }).format(value)
    }

    // Encrypted data display component
    const EncryptedValue = () => (
        <div className="flex items-center space-x-1 text-purple-300">
            <FaLock className="h-3 w-3" />
            <span className="text-xs">Encrypted</span>
        </div>
    )

    // Get phase-specific styling
    const getPhaseStyle = () => {
        if (isAnonymousPhase) {
            return {
                cardBorder: 'border-purple-500/30',
                badgeStyle: 'bg-purple-500/20 text-purple-200',
                gradientFrom: 'from-purple-900/20',
                gradientTo: 'to-background/60',
                textColor: 'text-purple-200'
            }
        }
        return {
            cardBorder: 'border-primary/20',
            badgeStyle: 'bg-primary/20',
            gradientFrom: 'from-background/80',
            gradientTo: 'to-background/60',
            textColor: 'text-foreground'
        }
    }

    const styles = getPhaseStyle()

    return (
        <Card
            className={`w-full bg-gradient-to-br ${styles.gradientFrom} ${styles.gradientTo} backdrop-blur-lg border ${styles.cardBorder} text-card-foreground overflow-hidden transition-all duration-300 group rounded-xl cursor-pointer hover:border-purple-500/50`}
            onClick={handleClick}
        >
            <div className="flex items-stretch">
                <div className="relative w-2/5 overflow-hidden rounded-l-xl">
                    <Image
                        src={token.imageUrl}
                        alt={token.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    {isAnonymousPhase && (
                        <div className="absolute top-2 right-2">
                            <Badge  className="bg-purple-500/20 text-purple-200">
                                <FaLock className="h-3 w-3 mr-1" />
                                Anonymous
                            </Badge>
                        </div>
                    )}
                </div>

                <div className="p-3 w-3/5 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <Badge
                              
                                className={`text-[10px] ${styles.textColor} border-purple-500/30 px-1.5 py-0.5`}
                            >
                                {token.symbol}
                            </Badge>
                            {!isAnonymousPhase && (
                                <Link
                                    href={`/dashboard/user/${token.creator}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Badge
                                       
                                        className="text-[10px] font-normal px-1.5 py-0.5 cursor-pointer hover:bg-secondary/20 transition-colors duration-200"
                                    >
                                        {extractAlphabetsFromAddress(token.creator)}
                                    </Badge>
                                </Link>
                            )}
                        </div>

                        <h3 className={`text-sm font-semibold mb-1 ${styles.textColor}`}>
                            {token.name}
                        </h3>

                        <div className="space-y-2 mb-2">
                            {isAnonymousPhase ? (
                                <>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">Votes:</span>
                                        <EncryptedValue />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">Total Stake:</span>
                                        <EncryptedValue />
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-muted-foreground">Market Value:</span>
                                    <span className={`text-xs font-medium ${styles.textColor}`}>
                                        {isEth
                                            ? `${formatNumber(totalStakedNum)} ETH`
                                            : `$${formatNumber(marketValue)}`
                                        }
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <p className="text-xs text-muted-foreground mb-1 line-clamp-3">
                            {isAnonymousPhase
                                ? 'Votes are encrypted during anonymous voting phase to ensure fair participation'
                                : truncatedDescription
                            }
                        </p>

                        <div className="flex items-center justify-between text-[10px]">
                            <Badge
                                className={`text-[10px] font-normal px-1.5 py-0.5 ${styles.badgeStyle}`}
                            >
                                {isAnonymousPhase
                                    ? 'Anonymous Voting'
                                    : `${votingData.votesCount} votes`
                                }
                            </Badge>
                            {!isAnonymousPhase && (
                                <span className="text-muted-foreground">
                                    {votingData.stakePercentage} of total
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}