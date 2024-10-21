"use client"
import { useState } from 'react'
import { Avatar, Button, ScrollShadow } from "@nextui-org/react"
import { ChevronLeft } from "lucide-react"

type ChatMessage = {
  id: string
  user: string
  avatar: string
  time: string
  message: string
  address: string
}

const chatData: ChatMessage[] = [
  { id: '1', user: 'ziecozeno4', address: '0xre...wer', avatar: '/placeholder-avatar.jpg', time: 'Yesterday at 2:41 PM', message: "didnt get any voice from the video but i got the notes" },
  { id: '2', user: 'oz', address: '0xre...wer', avatar: '/placeholder-avatar-2.jpg', time: 'Yesterday at 4:42 PM', message: "can hear the voice here" },
  { id: '3', user: 'ziecozeno4', address: '0xre...wer', avatar: '/placeholder-avatar.jpg', time: 'Yesterday at 6:36 PM', message: "omohh\nthis slack is not just myside aswrr\njust headache" },
  { id: '4', user: 'oz', address: '0xre...wer', avatar: '/placeholder-avatar-2.jpg', time: 'Today at 11:33 AM', message: "lmao" },
]

export default function Component() {
  const [selectedChat, setSelectedChat] = useState<ChatMessage | null>(null)

  const renderChatList = () => (
    <ScrollShadow className="h-screen text-[#F7F2DA]">
      <div className="space-y-4 p-4">
        <h2 className="text-2xl font-bold mb-4">All Comments</h2>
        <hr />
        {chatData.map((chat) => (
          <Button
            key={chat.id}
            variant="bordered"
            className="w-full justify-start  text-left p-2 h-auto hover:bg-gray-700 hover:bg-opacity-60"
            onClick={() => setSelectedChat(chat)}
          >
            <div className="flex flex-row justify-between">
            <Avatar src={chat.avatar} alt={chat.user} className="w-12 h-12 mr-3 m-2" />
            <div className="flex flex-col gap-2 p-2 overflow-hidden">
              <div className="font-semibold">{chat.user}</div>
              <div className="text-xs text-gray-400">{chat.address}</div>
            <div className="text-xs text-gray-100 ml-2">{chat.time}</div>
            </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollShadow>
  )

  const renderChatDetail = () => (
    <div className="flex flex-col h-screen">
      <header className=" border border-slate-600 p-4 flex items-center">
        <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)} className="mr-4">
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Back to list</span>
        </Button>
        <Avatar src={selectedChat?.avatar} alt={selectedChat?.user} className="w-12 h-12 mr-4 m-2" />
        <div>
          <div className="text-xl md:text-2xl">{selectedChat?.user}</div>
          <div className="text-xs text-gray-400">{selectedChat?.address}</div>
          <div className="text-sm text-gray-400">{selectedChat?.time}</div>
        </div>
      </header>
      <ScrollShadow className="flex-1 p-4">
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar src={selectedChat?.avatar} alt={selectedChat?.user} />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold">{selectedChat?.user}</span>
                <span className="text-gray-400 text-sm">{selectedChat?.time}</span>
              </div>
              <div className="text-xs text-gray-400 mb-1">{selectedChat?.address}</div>
              <p className="text-gray-300 whitespace-pre-line text-xl md:text-2xl mt-3">{selectedChat?.message}</p>
            </div>
          </div>
        </div>
      </ScrollShadow>
    </div>
  )

  return (
    <div className=" border border-slate-600 text-[#F7F2DA]">
      <div className="md:hidden">
        {selectedChat ? renderChatDetail() : renderChatList()}
      </div>
      <div className="hidden md:flex">
        <div className="w-64 border-r  border border-slate-600">
          {renderChatList()}
        </div>
        <div className="flex-1">
          {selectedChat ? renderChatDetail() : (
            <div className="h-screen text-2xl flex flex-col gap-4 items-center justify-center text-gray-400">
<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.09436 11.2288C6.03221 10.8282 5.99996 10.4179 5.99996 10C5.99996 5.58172 9.60525 2 14.0526 2C18.4999 2 22.1052 5.58172 22.1052 10C22.1052 10.9981 21.9213 11.9535 21.5852 12.8345C21.5154 13.0175 21.4804 13.109 21.4646 13.1804C21.4489 13.2512 21.4428 13.301 21.4411 13.3735C21.4394 13.4466 21.4493 13.5272 21.4692 13.6883L21.8717 16.9585C21.9153 17.3125 21.9371 17.4895 21.8782 17.6182C21.8266 17.731 21.735 17.8205 21.6211 17.8695C21.4911 17.9254 21.3146 17.8995 20.9617 17.8478L17.7765 17.3809C17.6101 17.3565 17.527 17.3443 17.4512 17.3448C17.3763 17.3452 17.3245 17.3507 17.2511 17.3661C17.177 17.3817 17.0823 17.4172 16.893 17.4881C16.0097 17.819 15.0524 18 14.0526 18C13.6344 18 13.2237 17.9683 12.8227 17.9073M7.63158 22C10.5965 22 13 19.5376 13 16.5C13 13.4624 10.5965 11 7.63158 11C4.66668 11 2.26316 13.4624 2.26316 16.5C2.26316 17.1106 2.36028 17.6979 2.53955 18.2467C2.61533 18.4787 2.65322 18.5947 2.66566 18.6739C2.67864 18.7567 2.68091 18.8031 2.67608 18.8867C2.67145 18.9668 2.65141 19.0573 2.61134 19.2383L2 22L4.9948 21.591C5.15827 21.5687 5.24 21.5575 5.31137 21.558C5.38652 21.5585 5.42641 21.5626 5.50011 21.5773C5.5701 21.5912 5.67416 21.6279 5.88227 21.7014C6.43059 21.8949 7.01911 22 7.63158 22Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
             <p>Select a chat to view details</p> 
            </div>
          )}
        </div>
      </div>
    </div>
  )
}