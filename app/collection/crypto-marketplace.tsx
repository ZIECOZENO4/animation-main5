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
  { id: 'collections', label: 'Collections', icon: <svg width="24px" height="24px"  className=" mr-1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#cbc8c8" stroke="#cbc8c8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>collection</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> <rect width="48" height="48" fill="none"></rect> <rect width="48" height="48" fill="none"></rect> </g> <g id="Q3_icons" data-name="Q3 icons"> <g> <path d="M42,18H6a2,2,0,0,0-2,2V42a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V20A2,2,0,0,0,42,18ZM40,40H8V22H18a6,6,0,0,0,12,0H40Z"></path> <path d="M9,14H39a2,2,0,0,0,0-4H9a2,2,0,0,0,0,4Z"></path> <path d="M12,6H36a2,2,0,0,0,0-4H12a2,2,0,0,0,0,4Z"></path> </g> </g> </g> </g></svg> },
  { id: 'trending', label: 'Trending', icon: <svg width="24px" height="24px"  className="mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 6h8v8h-2v-4h-2V8h-4V6zm2 6v-2h2v2h-2zm-2 2v-2h2v2h-2zm-2 0h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2 0v-2h2v2H8zm-2 2v-2h2v2H6zm-2 2v-2h2v2H4zm0 0v2H2v-2h2z" fill="#a39f9f"></path> </g></svg> },
  { id: 'favorites', label: 'Favorites', icon:  <svg width="24px" height="24px"  className="mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.5766 8.70419C11.2099 7.56806 11.5266 7 12 7C12.4734 7 12.7901 7.56806 13.4234 8.70419L13.5873 8.99812C13.7672 9.32097 13.8572 9.48239 13.9975 9.5889C14.1378 9.69541 14.3126 9.73495 14.6621 9.81402L14.9802 9.88601C16.2101 10.1643 16.825 10.3034 16.9713 10.7739C17.1176 11.2443 16.6984 11.7345 15.86 12.715L15.643 12.9686C15.4048 13.2472 15.2857 13.3865 15.2321 13.5589C15.1785 13.7312 15.1965 13.9171 15.2325 14.2888L15.2653 14.6272C15.3921 15.9353 15.4554 16.5894 15.0724 16.8801C14.6894 17.1709 14.1137 16.9058 12.9622 16.3756L12.6643 16.2384C12.337 16.0878 12.1734 16.0124 12 16.0124C11.8266 16.0124 11.663 16.0878 11.3357 16.2384L11.0378 16.3756C9.88634 16.9058 9.31059 17.1709 8.92757 16.8801C8.54456 16.5894 8.60794 15.9353 8.7347 14.6272L8.76749 14.2888C8.80351 13.9171 8.82152 13.7312 8.76793 13.5589C8.71434 13.3865 8.59521 13.2472 8.35696 12.9686L8.14005 12.715C7.30162 11.7345 6.88241 11.2443 7.02871 10.7739C7.17501 10.3034 7.78993 10.1643 9.01977 9.88601L9.33794 9.81402C9.68743 9.73495 9.86217 9.69541 10.0025 9.5889C10.1428 9.48239 10.2328 9.32097 10.4127 8.99812L10.5766 8.70419Z" stroke="#b6b8be" stroke-width="1.5"></path> <path opacity="0.5" d="M12 2V4" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M12 20V22" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M2 12L4 12" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M20 12L22 12" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 18L6.34305 17.657" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path d="M17.6567 6.34326L18 6" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18 18L17.657 17.657" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6.34326 6.34326L6 6" stroke="#b6b8be" stroke-width="1.5" stroke-linecap="round"></path> </g></svg> },
  { id: 'points', label: 'Points', icon: <svg  height="22px" fill='#F7F2DA' width="22px" className='mr-1' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"   xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 496" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M248,72c-57.344,0-104,46.656-104,104s46.656,104,104,104s104-46.656,104-104S305.344,72,248,72z M248,264 c-48.52,0-88-39.48-88-88s39.48-88,88-88s88,39.48,88,88S296.52,264,248,264z"></path> <path d="M424,176c0-26.744-18.862-49.164-43.975-54.685c13.852-21.662,11.338-50.849-7.569-69.763 c-18.922-18.908-48.108-21.428-69.769-7.568C297.169,18.867,274.747,0,248,0c-26.747,0-49.169,18.866-54.687,43.982 c-21.657-13.86-50.847-11.345-69.769,7.57c-18.914,18.914-21.429,48.101-7.571,69.763C90.861,126.837,72,149.257,72,176 c0,26.747,18.866,49.169,43.983,54.687c-13.86,21.659-11.346,50.854,7.569,69.769c7.875,7.869,17.529,12.889,27.68,15.086 L118.416,496h28.248l28.584-21.44l21.44,21.44h26.088l24.003-144.031C247.186,351.978,247.59,352,248,352 s0.814-0.022,1.221-0.031L273.224,496h26.088l21.44-21.44L349.336,496h28.248l-32.816-180.458 c10.15-2.197,19.804-7.217,27.68-15.086c18.916-18.916,21.43-48.106,7.568-69.769C405.133,225.169,424,202.747,424,176z M248,296 c-66.168,0-120-53.832-120-120S181.832,56,248,56s120,53.832,120,120S314.168,296,248,296z M361.144,62.864 c13.056,13.063,15.172,32.977,6.363,48.265c-12.557-23.041-31.584-42.07-54.624-54.63 C328.172,47.692,348.089,49.809,361.144,62.864z M248,16c18.457,0,34.026,12.569,38.619,29.594C274.371,41.961,261.411,40,248,40 s-26.371,1.961-38.619,5.594C213.974,28.569,229.543,16,248,16z M134.856,62.864c13.055-13.055,32.972-15.172,48.262-6.365 c-23.04,12.559-42.067,31.588-54.624,54.63C119.684,95.841,121.8,75.927,134.856,62.864z M88,176 c0-18.457,12.569-34.026,29.594-38.619C113.961,149.629,112,162.589,112,176s1.961,26.371,5.594,38.619 C100.569,210.026,88,194.457,88,176z M128.499,240.882c12.559,23.04,31.588,42.067,54.629,54.625 c-15.289,8.809-35.209,6.693-48.265-6.363C121.809,276.082,119.692,256.169,128.499,240.882z M209.224,480h-5.912l-26.56-26.56 L141.336,480h-3.752l29.692-163.335c9.108-0.668,18.08-3.546,26.039-8.638c4.299,19.549,18.835,35.304,37.686,41.326L209.224,480 z M209.381,306.406C221.629,310.039,234.589,312,248,312s26.371-1.961,38.619-5.594C282.026,323.431,266.457,336,248,336 C229.543,336,213.974,323.431,209.381,306.406z M354.664,480l-35.416-26.56L292.688,480h-5.912l-21.777-130.647 c18.85-6.022,33.387-21.777,37.686-41.325c7.958,5.091,16.928,7.97,26.039,8.637L358.416,480H354.664z M361.136,289.144 c-13.056,13.056-32.975,15.172-48.265,6.363c23.041-12.557,42.07-31.584,54.629-54.625 C376.308,256.169,374.191,276.082,361.136,289.144z M378.406,214.619C382.039,202.371,384,189.411,384,176 s-1.961-26.371-5.594-38.619C395.431,141.974,408,157.543,408,176C408,194.457,395.431,210.026,378.406,214.619z"></path> </g> </g> </g> </g></svg> },
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