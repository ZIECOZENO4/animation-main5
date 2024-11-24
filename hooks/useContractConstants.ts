// hooks/useTokenFactoryDurations.ts
import { BatchState } from '@/hooks/useFetchLatestBatch';
import { TokenFactoryService } from '@/hooks/allContractVariables';
import { useQueries } from '@tanstack/react-query';
import { formatUnits, parseUnits } from 'viem';

const tokenFactory = new TokenFactoryService();

export interface BatchDurations {
    initialVoting: bigint;
    anonymousVoting: bigint;
    counting: bigint;
    dispute: bigint;
}

export function useTokenFactoryDurations(): {
    durations: BatchDurations | null;
    isLoading: boolean;
    isError: boolean;
} {
    const results = useQueries({
        queries: [
            {
                queryKey: ['initialVotingDuration'],
                queryFn: () => tokenFactory.getInitialVotingDuration(),
                retry: false,
            },
            {
                queryKey: ['anonymousVotingDuration'],
                queryFn: () => tokenFactory.getAnonymousVotingDuration(),
                retry: false,
            },
            {
                queryKey: ['countingDuration'],
                queryFn: () => tokenFactory.getCountingDuration(),
                retry: false,
            },
            {
                queryKey: ['disputeDuration'],
                queryFn: () => tokenFactory.getDisputeDuration(),
                retry: false,
            },
        ],
    });

    const isLoading = results.some(query => query.isLoading);
    const isError = results.some(query => query.isError);

    // Check if any result is invalid (undefined, null, zero, or error)
    const hasInvalidResult = results.some(
        query =>
            query.isError ||
            !query.data ||
            query.data === 0n ||
            query.data === undefined
    );

    // If any result is invalid, return null for durations
    if (hasInvalidResult) {
        return {
            durations: null,
            isLoading,
            isError,
        };
    }

    // All results are valid, return the durations object
    const durations: BatchDurations = {
        initialVoting: results[0].data!,
        anonymousVoting: results[1].data!,
        counting: results[2].data!,
        dispute: results[3].data!,
    };

    return {
        durations,
        isLoading,
        isError,
    };
}
export interface PhaseInfo {
    label: string;
    duration: number;
    color: string;
    textColor: string;
    strokeColor: string;
    description: string;
}

export const getPhaseInfo = (state: BatchState, durations: BatchDurations | null): PhaseInfo => {
    if (!durations) return {
        label: 'Inactive',
        duration: 0,
        color: 'bg-gray-700',
        textColor: 'text-gray-300',
        strokeColor: '#374151', // gray-700
        description: 'Batch is inactive'
    };
    const phases: Record<BatchState, PhaseInfo> = {
        [BatchState.INACTIVE]: {
            label: 'Inactive',
            duration: 0,
            color: 'bg-gray-700',
            textColor: 'text-gray-300',
            strokeColor: '#374151', // gray-700
            description: 'Batch is inactive'
        },
        [BatchState.INITIAL_VOTING]: {
            label: 'Initial Voting',
            duration: Number(durations.initialVoting),
            color: 'bg-orange-500',
            textColor: 'text-orange-950',
            strokeColor: '#F97316', // orange-500
            description: 'Initial token voting phase'
        },
        [BatchState.QUEUE]: {
            label: 'Queue',
            duration: Number(0),
            color: 'bg-rose-600',
            textColor: 'text-back',
            strokeColor: '#3B82F6', // hash for for rose color 
            description: 'Tokens in queue for next phase'
        },
        [BatchState.ANONYMOUS_VOTING]: {
            label: 'Anonymous Voting',
            duration: Number(durations.anonymousVoting),
            color: 'bg-purple-500',
            textColor: 'text-purple-950',
            strokeColor: '#A855F7', // purple-500
            description: 'Anonymous voting period'
        },
        [BatchState.COUNTING]: {
            label: 'Counting',
            duration: Number(durations.counting),
            color: 'bg-green-500',
            textColor: 'text-green-950',
            strokeColor: '#22C55E', // green-500
            description: 'Vote counting in progress'
        },
        [BatchState.DISPUTABLE]: {
            label: 'Disputable',
            duration: Number(durations.dispute),
            color: 'bg-red-500',
            textColor: 'text-red-950',
            strokeColor: '#EF4444', // red-500
            description: 'Results can be disputed'
        },
        [BatchState.COMPLETED]: {
            label: 'Completed',
            duration: 0,
            color: 'bg-gray-600',
            textColor: 'text-gray-300',
            strokeColor: '#4B5563', // gray-600
            description: 'Batch completed'
        }
    };

    return phases[state];
};