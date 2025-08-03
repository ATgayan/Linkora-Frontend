'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Window,
  ChannelList
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
import { streamClient } from '@/lib/StreamChatProvider'

import { useAuth } from '@/lib/useAuth'



export default function ChatPage() {
  const [channel, setChannel] = useState<any>(null)
  const [ready, setReady] = useState(false)
  
  const {user } =useAuth();

  useEffect(() => {
    async function init() {
      console.log('user',user);
      if (!user) return
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/token`, {
        userId: user?.uid || null,
      })

      await streamClient.connectUser(user as any, res.data.token)

      const channel = streamClient.channel('messaging', {
 members: [user?.uid || '', 'otherUserId'], // Replace 'otherUserId' with the actual ID of the user you want to chat with
 })

      await channel.watch()
      setChannel(channel)
      setReady(true)
    }

    init()

    return () => {
      streamClient.disconnectUser()
    }
  }, [])

  if (!ready || !channel) return <div>Loading chat...</div>

  return (
    <Chat client={streamClient} theme='str-chat__theme-light'>
      <Channel channel={channel}>
        <Window>
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  )
}
