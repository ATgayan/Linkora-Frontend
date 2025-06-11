"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
  PaperclipIcon,
  SendIcon,
  SmileIcon,
  SearchIcon,
  PhoneIcon,
  VideoIcon,
  InfoIcon,
  ImageIcon,
  MicIcon,
  ThumbsUpIcon,
  PlusIcon,
} from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = React.useState(1)
  const [message, setMessage] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Sample chat data with more realistic messenger-like data
  const [chats, setChats] = React.useState([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        lastSeen: "Active now",
        username: "alex-johnson",
      },
      lastMessage: {
        content: "That sounds perfect! I'd love to see your portfolio.",
        time: "2m",
        sender: "me",
        unread: false,
      },
      messages: [
        {
          id: 1,
          content:
            "Hey! I saw your post about the mobile app project. I'm interested in helping with the UI/UX design.",
          sender: "them",
          time: "10:30 AM",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: 2,
          content:
            "That's great! I've been looking for someone with design skills. Do you have any examples of your previous work?",
          sender: "me",
          time: "10:32 AM",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: 3,
          content:
            "Yes, I can share my portfolio with you. I've worked on several mobile apps before, including a campus events app for my previous university.",
          sender: "them",
          time: "10:35 AM",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: 4,
          content:
            "That sounds perfect! I'd love to see your portfolio. When would you be available to discuss the project in more detail?",
          sender: "me",
          time: "10:38 AM",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: 5,
          content: "I'm free this weekend if you'd like to meet up and discuss the project in detail.",
          sender: "them",
          time: "10:40 AM",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        },
        {
          id: 6,
          content: "Perfect! Let's meet at the campus coffee shop on Saturday at 2 PM.",
          sender: "me",
          time: "10:42 AM",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        },
        {
          id: 7,
          content: "Sounds great! I'll bring my portfolio and some initial mockups I've been working on.",
          sender: "them",
          time: "10:45 AM",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
        {
          id: 8,
          content: "Awesome! Looking forward to seeing your work. This is going to be an exciting collaboration! 🚀",
          sender: "me",
          time: "2m",
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Taylor Reed",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        lastSeen: "Active 2h ago",
        username: "taylor-reed",
      },
      lastMessage: {
        content: "Hello! Thanks for reaching out. Do you have experience with sound design for films?",
        time: "2h",
        sender: "me",
        unread: false,
      },
      messages: [
        {
          id: 1,
          content: "Hi there! I'm interested in your short film sound design project.",
          sender: "them",
          time: "Yesterday",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        {
          id: 2,
          content: "Hello! Thanks for reaching out. Do you have experience with sound design for films?",
          sender: "me",
          time: "2h",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Jordan Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        lastSeen: "Active now",
        username: "jordan-patel",
      },
      lastMessage: {
        content:
          "Hey, I saw your profile and noticed you're into game development. I'm working on a 2D platformer and looking for collaborators.",
        time: "1d",
        sender: "them",
        unread: true,
      },
      messages: [
        {
          id: 1,
          content:
            "Hey, I saw your profile and noticed you're into game development. I'm working on a 2D platformer and looking for collaborators.",
          sender: "them",
          time: "1d",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: 4,
      user: {
        name: "Riley Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        lastSeen: "Active 1h ago",
        username: "riley-kim",
      },
      lastMessage: {
        content: "Thanks for the collaboration! The design looks amazing 🎨",
        time: "3h",
        sender: "them",
        unread: true,
      },
      messages: [
        {
          id: 1,
          content: "Thanks for the collaboration! The design looks amazing 🎨",
          sender: "them",
          time: "3h",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        },
      ],
    },
  ])

  const activeConversation = chats.find((chat) => chat.id === activeChat)

  // Filter chats based on search
  const filteredChats = chats.filter((chat) => chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px"
    }
  }

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [activeConversation?.messages])

  React.useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  const handleSendMessage = () => {
    if (message.trim() === "") return

    const newMessage = {
      id: Date.now(),
      content: message,
      sender: "me" as const,
      time: "now",
      timestamp: new Date(),
    }

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: {
                content: message,
                time: "now",
                sender: "me",
                unread: false,
              },
            }
          : chat,
      ),
    )

    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (message.trim()) {
        handleSendMessage()
      }
    }
  }

  const sendLike = () => {
    const likeMessage = {
      id: Date.now(),
      content: "👍",
      sender: "me" as const,
      time: "now",
      timestamp: new Date(),
    }

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat
          ? {
              ...chat,
              messages: [...chat.messages, likeMessage],
              lastMessage: {
                content: "👍",
                time: "now",
                sender: "me",
                unread: false,
              },
            }
          : chat,
      ),
    )
  }

  const formatMessageTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "now"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return timestamp.toLocaleDateString()
  }

  return (
    <ProtectedRoute>
    <div className="h-[calc(100vh-3.5rem)] flex bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col bg-card">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Chats</h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <PlusIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Messenger"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 rounded-full"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 hover:bg-muted/50 ${
                  activeChat === chat.id ? "bg-muted" : ""
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.user.avatar || "/placeholder.svg"} alt={chat.user.name} />
                      <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.user.status === "online" && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background bg-green-500"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold truncate text-sm">{chat.user.name}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">{chat.lastMessage.time}</span>
                        {chat.lastMessage.unread && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {chat.lastMessage.sender === "me" && <span className="text-xs text-muted-foreground">You: </span>}
                      <p
                        className={`text-xs truncate ${chat.lastMessage.unread ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                      >
                        {chat.lastMessage.content}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b border-border bg-card px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={activeConversation.user.avatar || "/placeholder.svg"}
                    alt={activeConversation.user.name}
                  />
                  <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {activeConversation.user.status === "online" && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500"></div>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">{activeConversation.user.name}</p>
                <p className="text-xs text-muted-foreground">{activeConversation.user.lastSeen}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full text-blue-500 hover:bg-blue-50">
                <PhoneIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-blue-500 hover:bg-blue-50">
                <VideoIcon className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/profile/${activeConversation.user.username}`}>
                  <InfoIcon className="h-4 w-4 mr-1" />
                  Profile
                </Link>
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-1">
                {activeConversation.messages.map((msg, index) => {
                  const showTime =
                    index === 0 ||
                    (activeConversation.messages[index - 1] &&
                      msg.timestamp.getTime() - activeConversation.messages[index - 1].timestamp.getTime() >
                        5 * 60 * 1000)

                  return (
                    <div key={msg.id}>
                      {showTime && (
                        <div className="text-center my-4">
                          <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full">
                            {formatMessageTime(msg.timestamp)}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} mb-1`}>
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                            msg.sender === "me"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-12"
                              : "bg-muted mr-12"
                          }`}
                        >
                          <p className="text-sm break-words">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Message Input */}
          <div className="border-t border-border bg-card p-4">
            <div className="flex items-end gap-3">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full text-blue-500 hover:bg-blue-50">
                  <PlusIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-blue-500 hover:bg-blue-50">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-blue-500 hover:bg-blue-50">
                  <PaperclipIcon className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  placeholder="Aa"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full min-h-[40px] max-h-[120px] px-4 py-2 pr-12 rounded-full border border-input bg-muted/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-muted-foreground"
                  rows={1}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-blue-500 hover:bg-blue-50"
                >
                  <SmileIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full text-blue-500 hover:bg-blue-50">
                  <MicIcon className="h-5 w-5" />
                </Button>

                {message.trim() ? (
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <SendIcon className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={sendLike}
                    size="icon"
                    className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <ThumbsUpIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-muted/20">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Your Messages</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Send private messages to collaborators, share ideas, and build amazing projects together.
          </p>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full px-6">
            Start New Conversation
          </Button>
        </div>
      )}
    </div>
    </ProtectedRoute>
  )
}
