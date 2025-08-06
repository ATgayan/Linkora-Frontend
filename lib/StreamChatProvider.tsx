import { StreamChat } from 'stream-chat';
import { useEffect, useState } from 'react';
import { useAuth } from "@/lib/useAuth";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || '';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const initChat = async (authUser: any) => {
  console.log('Initializing chat client with user:', authUser?.uid);
  console.log('baseUrl:', baseUrl);

  if (!authUser) {
    console.warn('No authenticated user found, skipping chat client initialization');
    return null;
  }

  const res = await fetch(`${baseUrl}/chat/token`, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: authUser.uid }),
  });

  const data = await res.json();

  const client = StreamChat.getInstance(apiKey);

   // Disconnect if a user is already connected
  if (client.user) {
    await client.disconnectUser();
  }
  
  await client.connectUser(
    {
      id: authUser.uid,
      name: authUser.displayName ?? undefined,
      image: authUser.photoURL ?? undefined,
    },
    data.token
  );

  return client;
};



// Optional hook for components
export const useChat = () => {
  const { user: authUser } = useAuth();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (!authUser) return;

    const startChat = async () => {
      const client = await initChat(authUser);
      if (client) {
        setChatClient(client);
      }
    };

    startChat();
  }, [authUser]);

  return chatClient;
};
