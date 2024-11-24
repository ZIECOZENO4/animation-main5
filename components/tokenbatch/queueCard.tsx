// components/QueueCard.tsx
import { Button } from "@nextui-org/react"
import { Card } from "@nextui-org/react"
import { Badge } from "@nextui-org/react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from 'date-fns'
import { formatCurrency } from '@/lib/moreThings'
import { StatBlock } from "./BatchCard"
import { FormattedBatch } from "@/hooks/useFetchAllBatches"
import { PhaseInfo } from "@/hooks/useContractConstants"
import { BatchCountingButton } from "./BatchCountingButton"

interface QueueCardProps {
    batch: FormattedBatch;
    phaseInfo: PhaseInfo;
    stakedValueUSD: number;
    onCountResult: () => void;
}

export const QueueCard: React.FC<QueueCardProps> = ({
    batch,
    phaseInfo,
    stakedValueUSD,
    onCountResult
}) => {
    return (
        <Card
            className={cn(
                "relative overflow-hidden",
                "bg-gradient-to-br from-card/95 to-card/90",
                "border border-border/20",
                "transition-all duration-300 ease-in-out",
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
                                    {phaseInfo.label}
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

                    {/* Count Result Button */}
                    <div className="flex justify-center">
                        <BatchCountingButton batchId={batch.batchId.toString()} />
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