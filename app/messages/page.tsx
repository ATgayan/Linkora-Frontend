'use client';

import { useChat } from '@/lib/StreamChatProvider';
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import { useEffect, useState } from 'react';
import type { Channel as StreamChannel } from 'stream-chat';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, Search } from 'lucide-react';
import { useTheme } from 'next-themes';

import 'stream-chat-react/dist/css/v2/index.css';

export default function ChatPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const chatClient = useChat();
  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [unread, setUnread] = useState<{ [userId: string]: boolean }>({});

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${baseUrl}/chat/all-users`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        setAllUsers(data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!chatClient) return;

    const handleNewMessage = (event: any) => {
      const senderId = event.user?.id;
      if (senderId === chatClient.userID) return;

      const senderUser = allUsers.find((u) => u.streamUserId === senderId);
      if (!senderUser) return;

      setRecentMessages((prev) => {
        const exists = prev.find((u) => u.streamUserId === senderId);
        if (exists) return prev;
        return [senderUser, ...prev];
      });

      setUnread((prev) => ({ ...prev, [senderId]: true }));
    };

    chatClient.on('message.new', handleNewMessage);
    return () => chatClient.off('message.new', handleNewMessage);
  }, [chatClient, allUsers]);

  if (!chatClient || !mounted) return null;

  return (
    <div className="fixed w-full bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        <Card className="shadow-xl border overflow-hidden bg-card">
          <Chat client={chatClient} key={theme} theme="messaging light">
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] min-h-[calc(100vh-200px)]">
              <div className="border-r border-border bg-muted/30">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      Chats
                    </h2>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {allUsers.length - 1}
                    </Badge>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-input rounded-lg"
                      placeholder="Search conversations..."
                    />
                  </div>
                </div>

                <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-350px)]">
                  {recentMessages.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2 flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary"></div>
                        Recent
                      </h3>
                      <div className="space-y-1">
                        {recentMessages.map((u) => (
                          <UserItem key={u.id} u={u} unread={unread[u.streamUserId]} selected={user?.id === u.id} openChat={openChat} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2 flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      All Users
                    </h3>
                    <div className="space-y-1">
                      {allUsers
                        .filter((u) => u.streamUserId !== chatClient.userID)
                        .filter((u) => !recentMessages.find((r) => r.id === u.id))
                        .map((u) => (
                          <UserItem key={u.id} u={u} unread={unread[u.streamUserId]} selected={user?.id === u.id} openChat={openChat} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-card">
                {channel ? (
                  <Channel channel={channel}>
                    <Window>
                      <ChannelHeader />
                      <div className="flex-1 min-h-[300px] max-h-[calc(100vh-350px)]">
                        <MessageList />
                      </div>
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                ) : (
                  <WelcomeMessage />
                )}
              </div>
            </div>
          </Chat>
        </Card>
      </div>
    </div>
  );

  async function openChat(u: any) {
    if (!chatClient) return;
    const newChannel = chatClient.channel('messaging', {
      members: [chatClient.userID!, u.streamUserId],
    });
    await newChannel.watch();
    setChannel(newChannel);
    setUser(u);
    setUnread((prev) => ({ ...prev, [u.streamUserId]: false }));
  }

  function UserItem({ u, unread, selected, openChat }: any) {
    return (
      <div
        className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
          selected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-accent'
        }`}
        onClick={() => openChat(u)}
      >
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
            <AvatarImage src={u.image || '/profile_Pic/nopic.jpg'} alt={u.name || 'User'} />
            <AvatarFallback>{u.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          {unread && <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-background"></div>}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-sm ${unread ? 'text-foreground' : 'text-foreground/80'} truncate`}>
            {u.name || 'User'} {unread && <strong className="ml-1">•</strong>}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {u.lastMessage || 'Click to start chatting...'}
          </p>
        </div>
      </div>
    );
  }

  function WelcomeMessage() {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <div className="rounded-full bg-primary/10 p-6 mb-6">
          <MessageCircle className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Welcome to Messages</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Select a user from the sidebar to start a conversation and collaborate with your peers.
        </p>
      </div>
    );
  }
}