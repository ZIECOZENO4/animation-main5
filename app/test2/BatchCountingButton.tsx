"use client"
import { useState } from "react"
import { Button } from "@nextui-org/react"
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react"
import { Progress } from "@nextui-org/react"
import { InfoIcon, LoaderIcon, CheckCircle2Icon, AlertCircle, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { getLastUpdateTimestamp, useBatchCountingStatus } from "@/hooks/useBatchCounting"
import {
    useWriteTokenFactoryContinueInitialization,
    useWriteTokenFactoryFinalizeCounting,
    useWriteTokenFactoryInitializeBatchCounting,
    useWriteTokenFactoryProcessNextBatch
} from "@/generated"
import { NormalTxStatus, useNormalTransactionStore } from "@/zustand-store"
import { useQueryClient } from "@tanstack/react-query"

// Define enums to match smart contract
enum BatchState {
    INACTIVE,
    INITIAL_VOTING,
    QUEUE,
    ANONYMOUS_VOTING,
    COUNTING,
    DISPUTABLE,
    COMPLETED
}

enum BatchCountingState {
    NOT_STARTED,
    INITIALIZED,
    FULLY_INITIALIZED,
    PROCESSING_IN_PROGRESS,
    PROCESSING_COMPLETED,
    FINALIZED
}

const buttonVariants = {
    initialize: "bg-primary text-primary-foreground hover:bg-primary/90",
    continue: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    process: "bg-accent text-accent-foreground hover:bg-accent/90",
    finalize: "bg-muted text-muted-foreground hover:bg-muted/90",
    complete: "bg-muted text-muted-foreground cursor-not-allowed",
    loading: "bg-secondary text-secondary-foreground cursor-wait",
} as const

export const BatchCountingButton = ({
    batchId,
    className,
}: {
    batchId: string
    className?: string
}) => {
    const [showProgress, setShowProgress] = useState(false)
    const { data: batchStatus, isLoading } = useBatchCountingStatus(batchId)
    const { addNormalTransaction } = useNormalTransactionStore();
    const queryClient = useQueryClient();

    const { writeContractAsync: initializeCounting } = useWriteTokenFactoryInitializeBatchCounting()
    const { writeContractAsync: continueInitialization } = useWriteTokenFactoryContinueInitialization()
    const { writeContractAsync: processNextBatch } = useWriteTokenFactoryProcessNextBatch()
    const { writeContractAsync: finalizeCounting } = useWriteTokenFactoryFinalizeCounting()

    const getButtonConfig = () => {
        if (!batchStatus) {
            return {
                text: "Initialize Counting",
                action: () => {
                    toast.promise(
                        initializeCounting({ args: [BigInt(batchId)] }, {
                            onSuccess(data, variables, context) {
                                addNormalTransaction({
                                    hash: data,
                                    status: NormalTxStatus.PENDING,
                                    additionalData: {
                                        type: 'InitialVotingBatchCounting',
                                        tokenAmount: "000000000",
                                        ethAmount: "0000000000",
                                        tokenName: `non`,
                                        tokenTicker: "non",
                                        transactionHash: data,
                                    }
                                });
                                queryClient.invalidateQueries();
                            },

                        }),
                        {
                            loading: 'Initializing batch counting...',
                            success: 'Successfully initialized batch counting',
                            error: 'Failed to initialize batch counting'
                        }
                    )
                },
                variant: buttonVariants.initialize
            }
        }

        // Check if batch is in QUEUE state
        if (batchStatus.state !== BatchState.QUEUE) {
            return {
                text: "Not in Queue State",
                action: null,
                variant: buttonVariants.complete
            }
        }

        // Get latest counting state
        const countingState = batchStatus.countingProgress?.state ?? BatchCountingState.NOT_STARTED

        switch (countingState) {
            case BatchCountingState.NOT_STARTED:
                return {
                    text: "Initialize Counting",
                    action: () => {
                        toast.promise(
                            initializeCounting({ args: [BigInt(batchId)] }, {
                                onSuccess(data, variables, context) {
                                    addNormalTransaction({
                                        hash: data,
                                        status: NormalTxStatus.PENDING,
                                        additionalData: {
                                            type: 'InitialVotingBatchCounting',
                                            tokenAmount: "000000000",
                                            ethAmount: "0000000000",
                                            tokenName: `Batch #${batchStatus.batchId}`,
                                            tokenTicker: `${batchStatus.batchId}`,
                                            transactionHash: data,
                                        }
                                    });
                                    queryClient.invalidateQueries();

                                },
                            }),
                            {
                                loading: 'Initializing batch counting...',
                                success: 'Successfully initialized batch counting',
                                error: 'Failed to initialize batch counting'
                            }
                        )
                    },
                    variant: buttonVariants.initialize
                }

            case BatchCountingState.INITIALIZED:
                return {
                    text: "Continue Initialization",
                    action: () => {
                        toast.promise(
                            continueInitialization({ args: [BigInt(batchId)] }, {
                                onSuccess(data, variables, context) {
                                    addNormalTransaction({
                                        hash: data,
                                        status: NormalTxStatus.PENDING,
                                        additionalData: {
                                            type: 'InitialVotingBatchCounting',
                                            tokenAmount: "000000000",
                                            ethAmount: "0000000000",
                                            tokenName: `Batch #${batchStatus.batchId}`,
                                            tokenTicker: `${batchStatus.batchId}`,
                                            transactionHash: data,
                                        }
                                    });
                                    queryClient.invalidateQueries();

                                },
                            }),
                            {
                                loading: 'Continuing batch initialization...',
                                success: 'Successfully continued batch initialization',
                                error: 'Failed to continue initialization'
                            }
                        )
                    },
                    variant: buttonVariants.continue
                }

            case BatchCountingState.FULLY_INITIALIZED:
            case BatchCountingState.PROCESSING_IN_PROGRESS:
                return {
                    text: "Process Next Batch",
                    action: () => {
                        toast.promise(
                            processNextBatch({ args: [BigInt(batchId)] }, {
                                onSuccess(data, variables, context) {
                                    addNormalTransaction({
                                        hash: data,
                                        status: NormalTxStatus.PENDING,
                                        additionalData: {
                                            type: 'InitialVotingBatchCounting',
                                            tokenAmount: "000000000",
                                            ethAmount: "0000000000",
                                            tokenName: `Batch #${batchStatus.batchId}`,
                                            tokenTicker: `${batchStatus.batchId}`,
                                            transactionHash: data,
                                        }
                                    });
                                    queryClient.invalidateQueries();

                                },
                            }),
                            {
                                loading: 'Processing next batch...',
                                success: 'Successfully processed batch',
                                error: 'Failed to process batch'
                            }
                        )
                    },
                    variant: buttonVariants.process
                }

            case BatchCountingState.PROCESSING_COMPLETED:
                return {
                    text: "Finalize Counting",
                    action: () => {
                        toast.promise(
                            finalizeCounting({ args: [BigInt(batchId)] }, {
                                onSuccess(data, variables, context) {
                                    addNormalTransaction({
                                        hash: data,
                                        status: NormalTxStatus.PENDING,
                                        additionalData: {
                                            type: 'InitialVotingBatchCounting',
                                            tokenAmount: "000000000",
                                            ethAmount: "0000000000",
                                            tokenName: `Batch #${batchStatus.batchId}`,
                                            tokenTicker: `${batchStatus.batchId}`,
                                            transactionHash: data,
                                        }
                                    });
                                    queryClient.invalidateQueries();

                                },
                            }),
                            {
                                loading: 'Finalizing batch counting...',
                                success: 'Successfully finalized counting',
                                error: 'Failed to finalize counting'
                            }
                        )
                    },
                    variant: buttonVariants.finalize
                }

            case BatchCountingState.FINALIZED:
                return {
                    text: "Counting Complete",
                    action: null,
                    variant: buttonVariants.complete
                }

            default:
                return {
                    text: "Process Counting",
                    action: null,
                    variant: buttonVariants.initialize
                }
        }
    }

    const buttonConfig = getButtonConfig()

    return (
        <div className={cn("flex items-center gap-4", className)}>
            <div className="flex items-center p-0 justify-between">
            <Button
                onClick={() => {
                    if (buttonConfig.action) {
                        buttonConfig.action()
                    }
                }}
                className={cn(
                    "transition-all duration-200",
                    " rounded-[var(--radius)]",
                    "flex items-center justify-between  text-xs m-0 py-0 my-0 p-0",
                    buttonConfig.variant
                )}
                disabled={!buttonConfig.action || isLoading}
            >
                {isLoading ? (
                    <LoaderIcon className="h-2 w-2 animate-spin " />
                ) : buttonConfig.text}
            </Button>

            <button
                 onClick={() => setShowProgress(true)}
                className="hover:bg-accent/20 bg-transparent justify-end p-0"
                aria-label='number'
            >
                <ArrowUp className="h-4 w-4" />
            </button>
            </div>
    

            <Modal isOpen={showProgress} onOpenChange={setShowProgress}>
  <ModalContent>
    <ModalHeader>
      <h2 className="text-lg font-semibold">Batch Counting Progress</h2>
    </ModalHeader>
    <ModalBody>
                    {isLoading ? (
                        <div className="flex items-center justify-center p-6">
                            <LoaderIcon  className="h-6 w-6 animate-spin" /> {/* Add your spinner component */}
                        </div>
                    ) : batchStatus ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Batch State</span>
                                    <span className="font-medium">
                                        {BatchState[batchStatus.state]}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Counting State</span>
                                    <span className="font-medium">
                                        {batchStatus.countingProgress
                                            ? BatchCountingState[batchStatus.countingProgress.state]
                                            : 'NOT_STARTED'}
                                    </span>
                                </div>
                            </div>

                            {batchStatus.initializationProgress && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Initialization Progress</span>
                                        <span className="font-medium">
                                            {`${Math.round(batchStatus.initializationProgress.percentage)}%`}
                                        </span>
                                    </div>
                                    <Progress
                                        value={batchStatus.initializationProgress.percentage}
                                        className="h-2 bg-secondary"
                                    />
                                    <div className="text-xs text-muted-foreground">
                                        {`${batchStatus.initializationProgress.batchesProcessed} / ${batchStatus.initializationProgress.totalBatches} batches`}
                                    </div>
                                </div>
                            )}

                            {batchStatus.heapProgress && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Processing Progress</span>
                                        <span className="font-medium">
                                            {`${Math.round(batchStatus.heapProgress.percentage)}%`}
                                        </span>
                                    </div>
                                    <Progress
                                        value={batchStatus.heapProgress.percentage}
                                        className="h-2 bg-secondary"
                                    />
                                    <div className="text-xs text-muted-foreground">
                                        {`${batchStatus.heapProgress.processedTokens} / ${batchStatus.heapProgress.processedTokens + batchStatus.heapProgress.remainingTokens} tokens`}
                                    </div>
                                </div>
                            )}

                            {batchStatus.finalResults && (
                                <div className="rounded-[var(--radius)] border bg-accent/20 p-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2Icon className="h-5 w-5 text-primary" />
                                        <h4 className="font-medium">Final Results</h4>
                                    </div>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <p>Total Processed: {batchStatus.finalResults.totalProcessed}</p>
                                        <p>Total Staked: {batchStatus.finalResults.totalStaked}</p>
                                        <p>Duration: {batchStatus.finalResults.duration}s</p>
                                        <p>Completed: {batchStatus.finalResults.completedAt.toLocaleString()}</p>
                                    </div>
                                </div>
                            )}

                            <div className="text-xs text-muted-foreground text-right">
                                Last updated: {getLastUpdateTimestamp(batchStatus)?.toLocaleString() || 'N/A'}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">No batch data available</p>
                        </div>
                    )}
                     </ModalBody>
           </ModalContent>
</Modal>
        </div>
    )
}