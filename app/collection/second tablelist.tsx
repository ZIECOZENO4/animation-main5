import React from 'react'

interface TokenData {
  name: string
  ranking: string
  priceChange: string
  memberChange: string
  attention: string
}

const tokenData: TokenData[] = Array(6).fill({
  name: '[SBEAT]',
  ranking: 'top 58',
  priceChange: '4.2%',
  memberChange: '32.6%',
  attention: '3,269',
})

const TableRow: React.FC<TokenData & { isHeader?: boolean }> = ({
  name,
  ranking,
  priceChange,
  memberChange,
  attention,
  isHeader = false,
}) => {
  const cellClass = isHeader
    ? 'text-gray-400 text-xs'
    : 'text-white'

  return (
    <div className="grid grid-cols-6 gap-4 py-2 border-b border-gray-800">
      <div className={`flex items-center ${cellClass}`}>
        {!isHeader && <div className="w-8 h-8 bg-gray-700 mr-2"></div>}
        {name}
      </div>
      <div className={cellClass}>{ranking}</div>
      <div className={`${cellClass} ${!isHeader ? 'text-green-500' : ''}`}>{priceChange}</div>
      <div className={`${cellClass} ${!isHeader ? 'text-green-500' : ''}`}>{memberChange}</div>
      <div className={cellClass}>{attention}</div>
      <div className={cellClass}>
        {isHeader ? 'buy' : (
          <button className="bg-gray-700 text-white px-4 py-1 rounded">
            BUY
          </button>
        )}
      </div>
    </div>
  )
}

export default function TokenDetailsTable() {
  return (
    <div className="bg-black p-4 ">
      <TableRow
        isHeader
        name="token details"
        ranking="approx. ranking"
        priceChange="price change (1D)"
        memberChange="member change (1D)"
        attention="attention (total)"
      />
      {tokenData.map((token, index) => (
        <TableRow key={index} {...token} />
      ))}
    </div>
  )
}