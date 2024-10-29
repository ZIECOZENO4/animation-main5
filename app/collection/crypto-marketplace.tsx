'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, TrendingUp, Star, Award, Menu, MoreVertical } from 'lucide-react'
import TrendingComponent from './trendinglist'
import PointsComponent from './pointlist'

// Define types
type TabId = 'collections' | 'trending' | 'favorites' | 'points';

interface Tab {
  id: TabId
  label: string
  icon: string | JSX.Element
}

interface Collection {
  name: string
  image: string
  floorPrice: number
  topBid: number | string
  change1d: number | string
  change7d: number | string
  volume1d: number
  volume7d: number
  owners: string
  supply: number
}

interface CollectionsTabProps {
  hoveredRow: number | null
  setHoveredRow: (index: number | null) => void
}

const tabs: Tab[] = [
  { id: 'collections', label: 'Collections', icon: <svg width="24px" height="24px"  className="bi bi-collection mr-1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"></path> </g></svg> },
  { id: 'favorites', label: 'Favorites', icon:  <svg width="24px" height="24px"  className="mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.5766 8.70419C11.2099 7.56806 11.5266 7 12 7C12.4734 7 12.7901 7.56806 13.4234 8.70419L13.5873 8.99812C13.7672 9.32097 13.8572 9.48239 13.9975 9.5889C14.1378 9.69541 14.3126 9.73495 14.6621 9.81402L14.9802 9.88601C16.2101 10.1643 16.825 10.3034 16.9713 10.7739C17.1176 11.2443 16.6984 11.7345 15.86 12.715L15.643 12.9686C15.4048 13.2472 15.2857 13.3865 15.2321 13.5589C15.1785 13.7312 15.1965 13.9171 15.2325 14.2888L15.2653 14.6272C15.3921 15.9353 15.4554 16.5894 15.0724 16.8801C14.6894 17.1709 14.1137 16.9058 12.9622 16.3756L12.6643 16.2384C12.337 16.0878 12.1734 16.0124 12 16.0124C11.8266 16.0124 11.663 16.0878 11.3357 16.2384L11.0378 16.3756C9.88634 16.9058 9.31059 17.1709 8.92757 16.8801C8.54456 16.5894 8.60794 15.9353 8.7347 14.6272L8.76749 14.2888C8.80351 13.9171 8.82152 13.7312 8.76793 13.5589C8.71434 13.3865 8.59521 13.2472 8.35696 12.9686L8.14005 12.715C7.30162 11.7345 6.88241 11.2443 7.02871 10.7739C7.17501 10.3034 7.78993 10.1643 9.01977 9.88601L9.33794 9.81402C9.68743 9.73495 9.86217 9.69541 10.0025 9.5889C10.1428 9.48239 10.2328 9.32097 10.4127 8.99812L10.5766 8.70419Z" stroke="#b6b8be" stroke-width="1.5"></path> <path opacity="0.5" d="M12 2V4" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M12 20V22" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M2 12L4 12" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M20 12L22 12" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 18L6.34305 17.657" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17.6567 6.34326L18 6" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18 18L17.657 17.657" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6.34326 6.34326L6 6" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> </g></svg> },
  { id: 'points', label: 'Points', icon:<svg fill="#ffffff" width="24px" height="24px"  className=" mr-1" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 496" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M317.703,192H352v-16h-20.688L360,147.312V0H136v147.312L164.688,176H144v16h34.297C124.897,217.953,88,272.747,88,336 c0,88.224,71.776,160,160,160s160-71.776,160-160C408,272.747,371.103,217.953,317.703,192z M384.244,289.363l-90.876-16.523 l-40.376-80.744C313.906,194.183,365.336,234.281,384.244,289.363z M317.104,433.688L248,399.048l-69.096,34.64l13.712-76.384 l-56.16-56.16l76.912-13.984L248,217.888l34.64,69.272l76.912,13.984l-56.16,56.16L317.104,433.688z M216,176V16h64v160H216z M344,140.688L308.688,176H296V16h48V140.688z M152,140.688V16h48v160h-12.688L152,140.688z M243.008,192.096l-40.376,80.744 l-90.876,16.523C130.664,234.281,182.094,194.183,243.008,192.096z M104,336c0-13.601,1.897-26.768,5.438-39.25l65.946,65.946 l-15.619,87.022C125.857,423.348,104,382.18,104,336z M169.188,456.456L248,416.952l78.812,39.504 C304.153,471.332,277.072,480,248,480C218.929,480,191.847,471.332,169.188,456.456z M336.235,449.718l-15.619-87.022 l65.946-65.946C390.103,309.232,392,322.399,392,336C392,382.18,370.143,423.348,336.235,449.718z"></path> <path d="M248,288c-26.472,0-48,21.528-48,48s21.528,48,48,48s48-21.528,48-48S274.472,288,248,288z M248,368 c-17.648,0-32-14.352-32-32s14.352-32,32-32s32,14.352,32,32S265.648,368,248,368z"></path> </g> </g> </g> </g></svg> },
]

const collections: Collection[] = [
  { name: 'PudgyPenguins', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 8.90, topBid: 8.75, change1d: -2.07, change7d: -5.62, volume1d: 257.34, volume7d: 1024.43, owners: '5259 (59%)', supply: 8888 },
  { name: 'BoredApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 11.65, topBid: 11.42, change1d: 0.95, change7d: -5.22, volume1d: 192.25, volume7d: 742.74, owners: '5455 (55%)', supply: 9998 },
  { name: 'Apu Apustajas', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.23, topBid: '-', change1d: -2.13, change7d: '-', volume1d: 157.54, volume7d: 938.05, owners: '1340 (17%)', supply: 7777 },
  { name: 'Infinex Patrons', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.23, topBid: 1.13, change1d: '-', change7d: '-', volume1d: 145.52, volume7d: 145.52, owners: '132 (0%)', supply: 67548 },
  { name: 'Milady', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 4.62, topBid: 4.42, change1d: 7.81, change7d: -5.24, volume1d: 144.07, volume7d: 896.98, owners: '5370 (54%)', supply: 9977 },
  { name: 'MutantApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.83, topBid: 1.81, change1d: -1.59, change7d: -4.64, volume1d: 90.12, volume7d: 453.29, owners: '11,826 (61%)', supply: 19498 },
  { name: 'LilPudgys', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.78, topBid: 0.77, change1d: -1.75, change7d: -5.92, volume1d: 53.16, volume7d: 218.78, owners: '8373 (39%)', supply: 21683 },
  { name: 'Azuki', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 4.90, topBid: 4.76, change1d: 1.47, change7d: -5.41, volume1d: 46.54, volume7d: 185.45, owners: '4136 (41%)', supply: 10000 },
  { name: 'Project AEON', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.64, topBid: 1.48, change1d: 13.18, change7d: 13.26, volume1d: 30.55, volume7d: 133.56, owners: '1450 (44%)', supply: 3332 },
  { name: 'MutantApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.83, topBid: 1.81, change1d: -1.59, change7d: -4.64, volume1d: 90.12, volume7d: 453.29, owners: '11,826 (61%)', supply: 19498 },
  { name: 'LilPudgys', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.78, topBid: 0.77, change1d: -1.75, change7d: -5.92, volume1d: 53.16, volume7d: 218.78, owners: '8373 (39%)', supply: 21683 },
  { name: 'Azuki', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 4.90, topBid: 4.76, change1d: 1.47, change7d: -5.41, volume1d: 46.54, volume7d: 185.45, owners: '4136 (41%)', supply: 10000 },
  { name: 'Project AEON', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.64, topBid: 1.48, change1d: 13.18, change7d: 13.26, volume1d: 30.55, volume7d: 133.56, owners: '1450 (44%)', supply: 3332 },
  { name: 'MutantApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.83, topBid: 1.81, change1d: -1.59, change7d: -4.64, volume1d: 90.12, volume7d: 453.29, owners: '11,826 (61%)', supply: 19498 },
  { name: 'LilPudgys', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.78, topBid: 0.77, change1d: -1.75, change7d: -5.92, volume1d: 53.16, volume7d: 218.78, owners: '8373 (39%)', supply: 21683 },
  { name: 'Azuki', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 4.90, topBid: 4.76, change1d: 1.47, change7d: -5.41, volume1d: 46.54, volume7d: 185.45, owners: '4136 (41%)', supply: 10000 },
  { name: 'Project AEON', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.64, topBid: 1.48, change1d: 13.18, change7d: 13.26, volume1d: 30.55, volume7d: 133.56, owners: '1450 (44%)', supply: 3332 },
  { name: 'MutantApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.83, topBid: 1.81, change1d: -1.59, change7d: -4.64, volume1d: 90.12, volume7d: 453.29, owners: '11,826 (61%)', supply: 19498 },
  { name: 'LilPudgys', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.78, topBid: 0.77, change1d: -1.75, change7d: -5.92, volume1d: 53.16, volume7d: 218.78, owners: '8373 (39%)', supply: 21683 },
  { name: 'Azuki', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 4.90, topBid: 4.76, change1d: 1.47, change7d: -5.41, volume1d: 46.54, volume7d: 185.45, owners: '4136 (41%)', supply: 10000 },
  { name: 'Project AEON', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.64, topBid: 1.48, change1d: 13.18, change7d: 13.26, volume1d: 30.55, volume7d: 133.56, owners: '1450 (44%)', supply: 3332 },
  { name: 'MutantApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.83, topBid: 1.81, change1d: -1.59, change7d: -4.64, volume1d: 90.12, volume7d: 453.29, owners: '11,826 (61%)', supply: 19498 },
  { name: 'LilPudgys', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.78, topBid: 0.77, change1d: -1.75, change7d: -5.92, volume1d: 53.16, volume7d: 218.78, owners: '8373 (39%)', supply: 21683 },
  { name: 'Azuki', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 4.90, topBid: 4.76, change1d: 1.47, change7d: -5.41, volume1d: 46.54, volume7d: 185.45, owners: '4136 (41%)', supply: 10000 },
  { name: 'Project AEON', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.64, topBid: 1.48, change1d: 13.18, change7d: 13.26, volume1d: 30.55, volume7d: 133.56, owners: '1450 (44%)', supply: 3332 },
  { name: 'PudgyPenguins', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 8.90, topBid: 8.75, change1d: -2.07, change7d: -5.62, volume1d: 257.34, volume7d: 1024.43, owners: '5259 (59%)', supply: 8888 },
  { name: 'BoredApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 11.65, topBid: 11.42, change1d: 0.95, change7d: -5.22, volume1d: 192.25, volume7d: 742.74, owners: '5455 (55%)', supply: 9998 },
  { name: 'Apu Apustajas', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.23, topBid: '-', change1d: -2.13, change7d: '-', volume1d: 157.54, volume7d: 938.05, owners: '1340 (17%)', supply: 7777 },
  { name: 'Infinex Patrons', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.23, topBid: 1.13, change1d: '-', change7d: '-', volume1d: 145.52, volume7d: 145.52, owners: '132 (0%)', supply: 67548 },
  { name: 'Milady', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 4.62, topBid: 4.42, change1d: 7.81, change7d: -5.24, volume1d: 144.07, volume7d: 896.98, owners: '5370 (54%)', supply: 9977 },
  { name: 'PudgyPenguins', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 8.90, topBid: 8.75, change1d: -2.07, change7d: -5.62, volume1d: 257.34, volume7d: 1024.43, owners: '5259 (59%)', supply: 8888 },
  { name: 'BoredApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 11.65, topBid: 11.42, change1d: 0.95, change7d: -5.22, volume1d: 192.25, volume7d: 742.74, owners: '5455 (55%)', supply: 9998 },
  { name: 'Apu Apustajas', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.23, topBid: '-', change1d: -2.13, change7d: '-', volume1d: 157.54, volume7d: 938.05, owners: '1340 (17%)', supply: 7777 },
  { name: 'Infinex Patrons', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.23, topBid: 1.13, change1d: '-', change7d: '-', volume1d: 145.52, volume7d: 145.52, owners: '132 (0%)', supply: 67548 },
  { name: 'Milady', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 4.62, topBid: 4.42, change1d: 7.81, change7d: -5.24, volume1d: 144.07, volume7d: 896.98, owners: '5370 (54%)', supply: 9977 },
  { name: 'PudgyPenguins', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 8.90, topBid: 8.75, change1d: -2.07, change7d: -5.62, volume1d: 257.34, volume7d: 1024.43, owners: '5259 (59%)', supply: 8888 },
  { name: 'BoredApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 11.65, topBid: 11.42, change1d: 0.95, change7d: -5.22, volume1d: 192.25, volume7d: 742.74, owners: '5455 (55%)', supply: 9998 },
  { name: 'Apu Apustajas', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.23, topBid: '-', change1d: -2.13, change7d: '-', volume1d: 157.54, volume7d: 938.05, owners: '1340 (17%)', supply: 7777 },
  { name: 'Infinex Patrons', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 1.23, topBid: 1.13, change1d: '-', change7d: '-', volume1d: 145.52, volume7d: 145.52, owners: '132 (0%)', supply: 67548 },
  { name: 'Milady', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 4.62, topBid: 4.42, change1d: 7.81, change7d: -5.24, volume1d: 144.07, volume7d: 896.98, owners: '5370 (54%)', supply: 9977 },
]

const CollectionsTab: React.FC<CollectionsTabProps> = ({ hoveredRow, setHoveredRow }) => (
  <table className="w-full text-sm text-[#F7F2DA]">
    <thead>
      <tr className="text-gray-400 border-b border-gray-800">
        <th className="px-4 py-2 text-left font-medium">FLOOR PRICE</th>
        <th className="px-4 py-2 text-left font-medium">FLOOR PRICE</th>
        <th className="px-4 py-2 text-left font-medium">TOP BID</th>
        <th className="px-4 py-2 text-left font-medium">1D CHANGE</th>
        <th className="px-4 py-2 text-left font-medium">7D CHANGE</th>
        <th className="px-4 py-2 text-left font-medium">15M VOLUME</th>
        <th className="px-4 py-2 text-left font-medium">1D VOLUME</th>
        <th className="px-4 py-2 text-left font-medium">7D VOLUME</th>
        <th className="px-4 py-2 text-left font-medium">OWNERS</th>
        <th className="px-4 py-2 text-left font-medium">SUPPLY</th>
      </tr>
    </thead>
    <tbody>
      <AnimatePresence>
        {collections.map((collection, index) => (
          <motion.tr
            key={collection.name}
            className="border-b border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
            onHoverStart={() => setHoveredRow(index)}
            onHoverEnd={() => setHoveredRow(null)}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <td className="px-4 py-2 flex items-center">
              <motion.img
                src={collection.image}
                alt={collection.name}
                className="w-8 h-8 rounded-full mr-2"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <span className="flex items-center">
                {collection.name}
                {hoveredRow === index && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 "
                  >
                    <Star className="w-4 h-4" />
                  </motion.span>
                )}
              </span>
            </td>
            <td className="px-4 py-2 ">
              <motion.div whileHover={{ scale: 1.05 }} className=" flex gap-2">
                {collection.floorPrice}  <img src='/images/eth.png' alt="coin" className="w-3 h-4" /> <ChevronDown className="inline w-4 h-4 text-slate-700" />
              </motion.div>
            </td>
            <td className="px-4 py-2">
  <motion.div whileHover={{ scale: 1.05 }} className="flex gap-2 items-center">
    {collection.topBid}
    {collection.topBid !== '-' && (
      <>
        <img src='/images/eth.png' alt="eth" className="w-3 h-4" />
        <ChevronDown className="inline w-4 h-4 text-slate-700" />
      </>
    )}
  </motion.div>
</td>
            <td className={`px-4 py-2 ${
  typeof collection.change1d === 'number' 
    ? collection.change1d > 0 
      ? 'text-slate-300' 
      : collection.change1d < 0 
        ? 'text-slate-600' 
        : ''
    : ''
}`}>
  <motion.div whileHover={{ scale: 1.05 }}>
    {typeof collection.change1d === 'number' ? `${collection.change1d}%` : '-'}
  </motion.div>
</td>
<td className={`px-4 py-2 ${
  typeof collection.change7d === 'number'
    ? collection.change7d > 0
      ? 'text-slate-300'
      : collection.change7d < 0
        ? 'text-slate-600'
        : ''
    : ''
}`}>
  <motion.div whileHover={{ scale: 1.05 }}>
    {typeof collection.change7d === 'number' ? `${collection.change7d}%` : '-'}
  </motion.div>
</td>
            <td className="px-4 py-2">-</td>
            <td className="px-4 py-2 ">
              <motion.div whileHover={{ scale: 1.05 }} className=" flex gap-2">
                {collection.volume1d}  <img src='/images/eth.png' alt="coin" className="w-3 h-4" /> <ChevronUp className="inline w-4 h-4 text-slate-500" />
              </motion.div>
            </td>
            <td className="px-4 py-2 ">
              <motion.div whileHover={{ scale: 1.05 }} className=" flex gap-2">
                {collection.volume7d}  <img src='/images/eth.png' alt="coin" className="w-3 h-4" /> <ChevronUp className="inline w-4 h-4 text-slate-500" />
              </motion.div>
            </td>
            <td className="px-4 py-2">{collection.owners}</td>
            <td className="px-4 py-2">{collection.supply}</td>
          </motion.tr>
        ))}
      </AnimatePresence>
    </tbody>
  </table>
)

const TrendingTab: React.FC = () => (
  <div className="">
    <TrendingComponent />
  </div>
)

const FavoritesTab: React.FC = () => (
  <div className="p-4 text-center text-sm">
    <h2 className="text-xl font-bold mb-4">Your Favorites</h2>
    <p className='text-slate-500'>Connect your wallet to view and manage your favorite NFT collections.</p>
  </div>
)

const PointsTab: React.FC = () => (
  <div className="">
    <PointsComponent />
  </div>
)


export default function MainComponent() {
  const [activeTab, setActiveTab] = useState<TabId>('collections')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const tabComponents: Record<TabId, JSX.Element> = {
    collections: <CollectionsTab hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} />,
    trending: <TrendingTab />,
    favorites: <FavoritesTab />,
    points: <PointsTab />,
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4">
      <div className="max-w-full mx-auto">
        <motion.div
          layout
          className="bg-black rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center border-b border-gray-800 px-4 py-2">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`flex items-center px-4 py-6  text-xl font-medium ${
                    activeTab === tab.id ? 'text-[#F7F2DA] border-b-2 border-[#F7F2DA]' : 'text-slate-500 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {typeof tab.icon === 'string' ? tab.icon : tab.icon}
                  <span className="ml-1">{tab.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex space-x-2">
              <motion.button
                className="text-gray-400 hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="text-gray-400 hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MoreVertical className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tabComponents[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}