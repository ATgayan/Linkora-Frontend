'use client';

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import { useChat } from '@/lib/StreamChatProvider';
import { useEffect, useState } from 'react';
import type { Channel as StreamChannel } from 'stream-chat';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Search, Loader2 } from 'lucide-react';
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
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

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
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setAllUsers(data.users || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setConnectionError('Failed to load users');
      }
    };

    if (mounted) {
      fetchUsers();
    }
  }, [mounted, baseUrl]);

  useEffect(() => {
    if (!chatClient || !mounted) return;

    // Check if client is connected
    if (!chatClient.userID || !chatClient.user) {
      console.warn('Chat client is not properly connected');
      setConnectionError('Chat client not connected');
      return;
    }

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
    
    // Add connection state listeners
    const handleConnectionChanged = (event: any) => {
      if (event.online) {
        setConnectionError(null);
      } else {
        setConnectionError('Connection lost');
      }
    };

    chatClient.on('connection.changed', handleConnectionChanged);

    return () => {
      chatClient.off('message.new', handleNewMessage);
      chatClient.off('connection.changed', handleConnectionChanged);
    };
  }, [chatClient, allUsers, mounted]);

  const openChat = async (u: any) => {
    if (!chatClient) {
      setConnectionError('Chat client not available');
      return;
    }

    // Check if client is connected
    if (!chatClient.userID || !chatClient.user) {
      setConnectionError('Please wait for connection to establish');
      return;
    }

    setIsConnecting(true);
    setConnectionError(null);

    try {
      const channelId = [chatClient.userID, u.streamUserId].sort().join('-');
      
      const newChannel = chatClient.channel('messaging', channelId, {
        members: [chatClient.userID, u.streamUserId],
        // name: `Chat between ${chatClient.user.name || chatClient.userID} and ${u.name || u.streamUserId}`,
      });

      await newChannel.watch();
      setChannel(newChannel);
      setUser(u);
      setUnread((prev) => ({ ...prev, [u.streamUserId]: false }));
    } catch (error: any) {
      console.error('Failed to open chat:', error);
      setConnectionError(`Failed to open chat: ${error.message || 'Unknown error'}`);
    } finally {
      setIsConnecting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="fixed w-full h-full bg-background p-4 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!chatClient) {
    return (
      <div className="fixed w-full h-full bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Connecting to chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed w-full h-full bg-background p-4">
      <Card className="shadow-xl border overflow-hidden bg-card h-full">
        {connectionError && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 text-sm">
            {connectionError}
          </div>
        )}
        <Chat client={chatClient} key={theme} theme="messaging light">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] mb-5 h-full">
            <div className="border-r border-border bg-muted/30">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground">
                    Messages
                  </h2>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {Math.max(0, allUsers.length - 1)}
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

              <div className="p-4 space-y-2 overflow-y-auto m-2">
                {recentMessages.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary"></div>
                      Recent
                    </h3>
                    <div className="space-y-1">
                      {recentMessages.map((u) => (
                        <UserItem 
                          key={u.id} 
                          u={u} 
                          unread={unread[u.streamUserId]} 
                          selected={user?.id === u.id} 
                          openChat={openChat}
                          isConnecting={isConnecting}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2 flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-muted-foreground/50"></div>
                    All Users
                  </h3>
                  <div className="space-y-1">
                    {allUsers
                      .filter((u) => u.streamUserId !== chatClient?.userID)
                      .filter((u) => !recentMessages.find((r) => r.id === u.id))
                      .map((u) => (
                        <UserItem 
                          key={u.id} 
                          u={u} 
                          unread={unread[u.streamUserId]} 
                          selected={user?.id === u.id} 
                          openChat={openChat}
                          isConnecting={isConnecting}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-card">
              {channel ? (
                <Channel channel={channel}>
                  <Window>
                    <ChannelHeader 
                      image={user?.image || '/profile_Pic/nopic.jpg'} 
                      title={user?.name || 'User'} 
                    />
                    <div className="flex-1 min-h-[500px] max-h-[calc(100vh-350px)]">
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
  );

  function UserItem({ u, unread, selected, openChat, isConnecting }: any) {
    const isCurrentUserConnecting = isConnecting && selected;
    
    return (
      <div
        className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
          selected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-accent'
        } ${isCurrentUserConnecting ? 'opacity-50' : ''}`}
        onClick={() => !isConnecting && openChat(u)}
      >
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
            <AvatarImage src={u.image || '/profile_Pic/nopic.jpg'} alt={u.name || 'User'} />
            <AvatarFallback>{u.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          {unread && <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-background"></div>}
          {isCurrentUserConnecting && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
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