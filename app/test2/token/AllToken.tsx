
import { useAllTokens } from '@/hooks/useFetchAllToken';
import { Card, Chip } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { FormattedToken } from '@/types/token';
export function TokenLists() {
  const { data: tokens, isLoading, error } = useAllTokens();

  if (isLoading) return <div>Loading tokens...</div>;
  if (error) return <div>Error loading tokens</div>;

  const initialTokens = tokens?.filter(token => token.votes.initial > 0);
  const anonymousTokens = tokens?.filter(token => token.votes.anonymous > 0);

 // components/TokenCard.tsx
const TokenCard = ({ token }: { token: FormattedToken }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="p-4 mb-4 bg-black/40 backdrop-blur-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[#F7F2DA] text-lg mb-2">
            {token.details.name} ({token.details.symbol})
          </h3>
          <Chip size="sm" color="warning" className="mb-2">
            Batch #{token.batchId}
          </Chip>
        </div>
        <Chip color="default" variant="shadow">
          State: {token.state}
        </Chip>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-gray-400">Total Votes</p>
          <p className="text-[#F7F2DA]">{token.votes.total}</p>
        </div>
        <div>
          <p className="text-gray-400">Total Staked</p>
          <p className="text-[#F7F2DA]">
            {token.staked.total.toFixed(6)} ETH
          </p>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mt-4 line-clamp-2">
        {token.details.description}
      </p>
      
      <div className="flex gap-2 mt-4">
        {token.details.twitter && (
          <Chip size="sm" variant="flat">Twitter</Chip>
        )}
        {token.details.telegram && (
          <Chip size="sm" variant="flat">Telegram</Chip>
        )}
        {token.details.website && (
          <Chip size="sm" variant="flat">Website</Chip>
        )}
      </div>
    </Card>
  </motion.div>
);
        }