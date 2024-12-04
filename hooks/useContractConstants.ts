import { BatchState } from '@/app/true-types';
import { TokenFactoryService } from '@/hooks/allContractVariables';
import { useQuery } from '@tanstack/react-query';

const tokenFactory = new TokenFactoryService();

export function useTokenFactoryDurations() {
    const { data: durations, isLoading, isError } = useQuery({
        queryKey: ['VotingDuration'],
        queryFn: () => tokenFactory.getVotingDuration(),
        retry: false,
    });

    return {
        durations,
        isLoading,
        isError
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

export const getPhaseInfo = (state: BatchState, durations: bigint | undefined): PhaseInfo => {
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
            duration: Number(durations),
            color: 'bg-orange-500',
            textColor: 'text-orange-950',
            strokeColor: '#F97316', // orange-500
            description: 'Initial token voting phase'
        },
        [BatchState.INITIAL_COUNTING]: {
            label: 'Queue',
            duration: Number(0),
            color: 'bg-rose-600',
            textColor: 'text-back',
            strokeColor: '#3B82F6', // hash for for rose color 
            description: 'Tokens in queue for next phase'
        },
        [BatchState.ANONYMOUS_VOTING]: {
            label: 'Anonymous Voting',
            duration: Number(durations),
            color: 'bg-purple-500',
            textColor: 'text-purple-950',
            strokeColor: '#A855F7', // purple-500
            description: 'Anonymous voting period'
        },
        [BatchState.ANONYMOUS_COUNTING]: {
            label: 'Counting',
            duration: Number(durations),
            color: 'bg-green-500',
            textColor: 'text-green-950',
            strokeColor: '#22C55E', // green-500
            description: 'Vote counting in progress'
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