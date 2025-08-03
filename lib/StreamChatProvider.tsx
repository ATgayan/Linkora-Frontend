// lib/stream.ts
import { StreamChat } from 'stream-chat';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
export const streamClient = StreamChat.getInstance(apiKey);
