import React from 'react'
import { Card } from "@nextui-org/react"
import { Badge } from "@nextui-org/react"
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useEthereumPrice } from '@/hooks/useEthPrice'
import Countdown from 'react-countdown'
import { formatCurrency } from '@/lib/moreThings'
import { getPhaseInfo, useTokenFactoryDurations } from '@/hooks/useContractConstants'
import { FormattedBatch } from '@/hooks/useFetchAllBatches'
import { QueueCard } from './queueCard'
import { BatchState } from '@/hooks/useFetchLatestBatch'
import { toast } from 'sonner'


interface BatchCardProps {
    batch: FormattedBatch;
}

const CountdownDisplay = ({ hours, minutes, seconds, completed, phase }: any) => {
    if (completed) {
        return (
            <div className="text-destructive font-semibold">
                Needs Migration
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <div className="text-sm font-medium text-muted-foreground">
                {phase}
            </div>
            <div className="flex items-center gap-1.5">
                <TimeBlock value={hours} unit="H" />
                <span className="text-primary text-xl">:</span>
                <TimeBlock value={minutes} unit="M" />
                <span className="text-primary text-xl">:</span>
                <TimeBlock value={seconds} unit="S" />
            </div>
        </div>
    )
}

const TimeBlock = ({ value, unit }: { value: number; unit: string }) => (
    <div className="flex flex-col items-center">
        <span className="text-xl font-bold text-primary tabular-nums">
            {String(value).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-muted-foreground font-medium">
            {unit}
        </span>
    </div>
)

export const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
    const router = useRouter()
    const { data: ethPrice } = useEthereumPrice()
    const { durations } = useTokenFactoryDurations()
    const phaseInfo = getPhaseInfo(batch.stateNumber, durations)
    const deadline = new Date(batch.stateUpdatedAt.getTime() + (phaseInfo.duration * 1000))
    const stakedValueUSD = parseFloat(batch.initialVoting.totalStaked.toString()) * (ethPrice?.ethereum?.usd || 0)
    console.log("this is the batch that is passed into the batch card 000000000000000000000", { batch });
    const handleBatchClick = () => {
        // For INACTIVE state
        if (batch.stateNumber === BatchState.INACTIVE) {
            toast.info("This batch is currently inactive")
            return
        }

        // For ANONYMOUS_VOTING and above states
        if (batch.stateNumber >= BatchState.ANONYMOUS_VOTING) {
            router.push(`/batch/${batch.batchId}`)

            return
        }

        // For INITIAL_VOTING and QUEUE states
        if (batch.stateNumber === BatchState.INITIAL_VOTING ||
            batch.stateNumber === BatchState.QUEUE) {
            router.push(`/batch/${batch.batchId}`)
            return
        }
    }

    const handleCountResult = () => {
        toast.info("counting result function called")
    }

    // If the phase is Queue, render the QueueCard
    if (batch.stateNumber === BatchState.QUEUE) {
        return (
            <QueueCard
                batch={batch}
                phaseInfo={phaseInfo}
                stakedValueUSD={stakedValueUSD}
                onCountResult={handleCountResult}
            />
        )
    }

    return (
        <Card
            onClick={handleBatchClick}
            className={cn(
                "relative overflow-hidden cursor-pointer",
                "bg-gradient-to-br from-card/95 to-card/90",
                "border border-border/20 hover:border-primary/30",
                "transition-all duration-300 ease-in-out",
                "hover:shadow-lg hover:shadow-primary/10",
                "hover:translate-y-[-2px]",
                batch.stateNumber >= BatchState.ANONYMOUS_VOTING && "bg-secondary/20",
                batch.stateNumber === BatchState.INACTIVE && "opacity-60 cursor-not-allowed"
            )}
        >

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            <div className="p-6">
                <div className="space-y-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-4xl font-bold text-primary">
                                    #{batch.batchId}
                                </span>
                                <Badge
                                    variant="shadow"
                                    className={cn(
                                        "px-3 py-1",
                                        `bg-${phaseInfo.color}/10 text-${phaseInfo.color}`,
                                        "border-${phaseInfo.color}/20"
                                    )}
                                >
                                    {batch.state}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Created {formatDistanceToNow(batch.createdAt, { addSuffix: true })}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-1">
                                Total Staked
                            </p>
                            <p className="text-2xl font-bold text-primary">
                                {formatCurrency(stakedValueUSD)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {batch.initialVoting.totalStaked} ETH
                            </p>
                        </div>
                    </div>

                    {/* Countdown Section */}
                    <div className="bg-secondary/10 rounded-lg p-4 backdrop-blur-sm">
                        <Countdown
                            date={deadline}
                            renderer={(props) => (
                                <CountdownDisplay {...props} phase={phaseInfo.label} />
                            )}
                        />
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 gap-4">
                        <StatBlock
                            label="Total Tokens"
                            value={batch.totalTokens}
                            icon="🔸"
                        />
                        <StatBlock
                            label="Total Votes"
                            value={batch.initialVoting.totalVotes}
                            icon="📊"
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export const StatBlock = ({ label, value, icon }: { label: string; value: string | number; icon: string }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
        <span className="text-xl">{icon}</span>
        <div>
            <div className="text-sm font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
        </div>
    </div>
)