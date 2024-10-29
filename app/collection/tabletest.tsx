import React from 'react'

const MainTable = () => {
  return (
    <div>
        <div className="w-[1394px] h-[36px] px-[18px] pr-[31px] pt-[9px] pb-[12px] bg-[#0A0909] flex-row flex justify-between">
<p className='align-left text-[15px] text-[#FFFFFF]'>Token Details</p>
<p className='align-left text-[15px] text-[#FFFFFF]'>Approx. Ranking</p>
<p className='align-left text-[15px] text-[#FFFFFF]'>Price Change (1D)</p>
<p className='align-left text-[15px] text-[#FFFFFF]'>Member Change (1D)</p>
<p className='align-left text-[15px] text-[#FFFFFF]'>Attention (Total)</p>

        </div>
        <div className="w-[1394px] h-[72px] bg-[#0A0909] flex-row flex justify-between">
<div className="w-[167px] h-[52px] top-[9px] left-[18px] flex-row flex justify-between">
<div className="w-[58px] h-[52px] top-[9px] left-[18px] bg-[#5D5C5C]" />
<div className=" text-[#F7F2DA]">
<p className=" text-[20px] font-normal leading-[20px] text-left top-[18px] left-[85px]">[$BEAT]</p>
<p className=" text-[10px] font-normal leading-[10px] text-left top-[42px] left-[85px]">[Beat Aslan Tonight]</p>
</div>
</div>
<p className=" text-[16px] text-[#DFDBC5] font-normal leading-[16px] text-left top-[26px] left-[293px]">top 50</p>
<p className=" text-[16px] text-[#BD8F8F] font-normal leading-[16px] text-left top-[26px] left-[565px]">4.2%</p>
<p className=" text-[16px] text-[#DFDBC5] font-normal leading-[16px] text-left top-[26px] left-[1112px]">3,269</p>
<div className=" w-[59px] h-[36.22px] top-[18px] left-[1318px]  border-[0.63px] border-[#000000]">
<div className="flex">
<div className=" w-[2.84px] h-[36.22px] top-[18px] left-[1318.31px] bg-[#787878] border-t-[0.63px] border-black" />
<div className="text-center w-[56px] h-[33px] top-[18px] left-[1321px] bg-[#787878]">
<p className=" text-[20px] text-[#F7F2DA] font-normal leading-[20px]  top-[26px] left-[1334px]">BUY</p>
</div>
</div>
<div className=" w-[59px] h-[2px] top-[52px] left-[1318px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
</div>

        </div>
    </div>
  )
}

export default MainTable