// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   Heart,
//   Briefcase,
//   GraduationCap,
//   User,
//   Users,
//   LinkIcon,
//   Github,
//   Linkedin,
//   Twitter,
//   Instagram,
//   Share2,
//   MessageSquare,
//   UserPlus,
//   Flag,
//   MoreHorizontal,
// } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { PostCard } from "@/components/post-card"
// import { CollaborationModal } from "@/components/collaboration-modal"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// // Sample user data for another user
// const otherUserData = {
//   nickname: "Jamie_S",
//   fullName: "Jamie Smith",
//   profilePicture: "/placeholder.svg?height=128&width=128",

//   // University Information
//   universityName: "MIT",
//   facultyName: "Music Technology",
//   degreeName: "Bachelor of Arts",
//   universityYear: "4th Year (Senior)",

//   // Personal Information
//   relationshipState: "I have relationship",
//   whoAmI:
//     "I'm a passionate music technology student who loves creating innovative sounds and collaborating with talented artists. I enjoy experimenting with different genres and am always looking for new ways to express creativity through music.",
//   thingsYouLikeToDo: ["Music Production", "DJing", "Vinyl Collecting", "Hiking", "Podcasting", "Sound Design"],
//   achievementsReceived:
//     "Released EP on Spotify with 50K+ streams, Campus DJ of the Year 2022, Produced University Anthem, Music Festival Organizer Award",
//   abilities: ["Music Production", "Audio Engineering", "Mixing", "Mastering", "Ableton Live", "DJ Performance"],

//   isConnected: false,
//   activity: {
//     posts: 42,
//     collaborations: 8,
//     connections: 156,
//   },
//   // Sample posts
//   posts: [
//     {
//       id: 1,
//       user: {
//         name: "Jamie Smith",
//         avatar: "/placeholder.svg?height=40&width=40",
//         university: "MIT",
//       },
//       content:
//         "Just finished my latest music production project! Looking for vocalists and lyricists for future collaborations. Check out my portfolio in bio.",
//       image: "/placeholder.svg?height=400&width=600",
//       tags: ["Music", "Production", "Vocals"],
//       status: "Have",
//       likes: 42,
//       comments: 15,
//       timeAgo: "5 hours ago",
//     },
//     {
//       id: 2,
//       user: {
//         name: "Jamie Smith",
//         avatar: "/placeholder.svg?height=40&width=40",
//         university: "MIT",
//       },
//       content:
//         "Anyone interested in collaborating on a podcast about student life and academic experiences? I have the equipment and editing skills, looking for co-hosts!",
//       tags: ["Podcast", "Audio", "Content Creation"],
//       status: "Find",
//       likes: 28,
//       comments: 9,
//       timeAgo: "2 days ago",
//     },
//   ],
// }

// export default function OtherProfileView() {
//   const [isCollabModalOpen, setIsCollabModalOpen] = useState(false)
//   const [isConnected, setIsConnected] = useState(otherUserData.isConnected)
//   const [isPending, setIsPending] = useState(false)

//   const handleConnect = () => {
//     if (isPending) {
//       // Cancel connection request
//       setIsPending(false)
//     } else if (!isConnected) {
//       // Send connection request
//       setIsPending(true)
//     } else {
//       // Disconnect
//       setIsConnected(false)
//     }
//   }

//   const handleMessage = () => {
//     // In a real app, this would navigate to the messages page with this user's conversation
//     console.log("Navigate to messages with this user")
//   }

//   const handleCollaborate = () => {
//     setIsCollabModalOpen(true)
//   }

//   return (
//     <div className="container mx-auto py-6 px-4 md:px-6">
//       {/* Profile Header */}
//       <div className="relative mb-8">
//         <div className="h-48 w-full rounded-xl bg-gradient-to-r from-purple-600/30 to-blue-500/30 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-500/20 rounded-xl"></div>
//         </div>

//         <div className="absolute top-32 left-8 flex items-end">
//           <Avatar className="h-32 w-32 border-4 border-background">
//             <AvatarImage src={otherUserData.profilePicture || "/placeholder.svg"} alt={otherUserData.fullName} />
//             <AvatarFallback>{otherUserData.fullName.charAt(0)}</AvatarFallback>
//           </Avatar>
//         </div>

//         <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
//           <div className="ml-40">
//             <h1 className="text-3xl font-bold tracking-tight">{otherUserData.fullName}</h1>
//             <p className="text-muted-foreground">@{otherUserData.nickname}</p>
//           </div>
//           <div className="flex gap-2 mt-4 md:mt-0 ml-40 md:ml-0">
//             <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleMessage}>
//               <MessageSquare className="h-4 w-4" />
//               Message
//             </Button>
//             <Button
//               variant={isConnected ? "outline" : isPending ? "secondary" : "default"}
//               size="sm"
//               className={`flex items-center gap-1 ${
//                 !isConnected && !isPending ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white" : ""
//               }`}
//               onClick={handleConnect}
//             >
//               <UserPlus className="h-4 w-4" />
//               {isConnected ? "Connected" : isPending ? "Pending" : "Connect"}
//             </Button>
//             <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleCollaborate}>
//               <Users className="h-4 w-4" />
//               Collaborate
//             </Button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem className="flex items-center">
//                   <Share2 className="mr-2 h-4 w-4" />
//                   <span>Share Profile</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="flex items-center text-red-500">
//                   <Flag className="mr-2 h-4 w-4" />
//                   <span>Report Profile</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Panel */}
//         <div className="md:col-span-1 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <User className="h-5 w-5 mr-2" />
//                 About
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Heart className="h-4 w-4 text-pink-500" />
//                 <span className="text-sm">{otherUserData.relationshipState}</span>
//               </div>
//               {/*<div className="flex items-center gap-2">
//                 <MapPin className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">{otherUserData.location}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">Joined {otherUserData.joinDate}</span>
//               </div>*/}
//               <div className="flex items-center gap-2">
//                 <GraduationCap className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">{otherUserData.universityName}</span>
//               </div>

//               <div className="pt-2">
//                 <p className="text-sm font-medium mb-2">Activity</p>
//                 <div className="flex justify-between text-sm">
//                   <div className="text-center">
//                     <p className="font-bold">{otherUserData.activity.posts}</p>
//                     <p className="text-xs text-muted-foreground">Posts</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="font-bold">{otherUserData.activity.collaborations}</p>
//                     <p className="text-xs text-muted-foreground">Collabs</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="font-bold">{otherUserData.activity.connections}</p>
//                     <p className="text-xs text-muted-foreground">Connections</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <GraduationCap className="h-5 w-5 mr-2" />
//                 University
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div>
//                 <p className="font-medium">{otherUserData.universityName}</p>
//                 <p className="text-sm text-muted-foreground">{otherUserData.facultyName}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium">Degree</p>
//                 <p className="text-sm text-muted-foreground">{otherUserData.degreeName}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium">Year</p>
//                 <p className="text-sm text-muted-foreground">{otherUserData.universityYear}</p>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <LinkIcon className="h-5 w-5 mr-2" />
//                 Social Links
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               {otherUserData.socialLinks?.website && (
//                 <a
//                   href={otherUserData.socialLinks.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm hover:text-primary"
//                 >
//                   <LinkIcon className="h-4 w-4" />
//                   <span>{otherUserData.socialLinks.website}</span>
//                 </a>
//               )}
//               {otherUserData.socialLinks?.github && (
//                 <a
//                   href={`https://${otherUserData.socialLinks.github}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm hover:text-primary"
//                 >
//                   <Github className="h-4 w-4" />
//                   <span>{otherUserData.socialLinks.github}</span>
//                 </a>
//               )}
//               {otherUserData.socialLinks?.linkedin && (
//                 <a
//                   href={`https://${otherUserData.socialLinks.linkedin}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm hover:text-primary"
//                 >
//                   <Linkedin className="h-4 w-4" />
//                   <span>{otherUserData.socialLinks.linkedin}</span>
//                 </a>
//               )}
//               {otherUserData.socialLinks?.twitter && (
//                 <a
//                   href={`https://${otherUserData.socialLinks.twitter}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm hover:text-primary"
//                 >
//                   <Twitter className="h-4 w-4" />
//                   <span>{otherUserData.socialLinks.twitter}</span>
//                 </a>
//               )}
//               {otherUserData.socialLinks?.instagram && (
//                 <a
//                   href={`https://${otherUserData.socialLinks.instagram}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm hover:text-primary"
//                 >
//                   <Instagram className="h-4 w-4" />
//                   <span>{otherUserData.socialLinks.instagram}</span>
//                 </a>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Panel */}
//         <div className="md:col-span-2 space-y-6">
//           <Tabs defaultValue="about" className="w-full">
//             <TabsList className="w-full justify-start">
//               <TabsTrigger value="about">About</TabsTrigger>
//               <TabsTrigger value="posts">Posts</TabsTrigger>
//               <TabsTrigger value="collabs">Collaborations</TabsTrigger>
//               <TabsTrigger value="connections">Connections</TabsTrigger>
//             </TabsList>

//             <TabsContent value="about" className="space-y-6 mt-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <User className="h-5 w-5 mr-2" />
//                     About Me
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <p className="text-sm font-medium">Who am I?</p>
//                     <p className="text-muted-foreground">{otherUserData.whoAmI}</p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Heart className="h-5 w-5 mr-2" />
//                     Things I like to do
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex flex-wrap gap-2">
//                     {(otherUserData.thingsYouLikeToDo || []).map((item, index) => (
//                       <Badge key={index} variant="secondary" className="rounded-full">
//                         {item}
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Briefcase className="h-5 w-5 mr-2" />
//                     Achievements Received
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <p className="text-muted-foreground">{otherUserData.achievementsReceived}</p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Briefcase className="h-5 w-5 mr-2" />
//                     Abilities
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex flex-wrap gap-2">
//                     {(otherUserData.abilities || []).map((item, index) => (
//                       <Badge
//                         key={index}
//                         variant="outline"
//                         className="rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-500 border-purple-200 dark:border-purple-800"
//                       >
//                         {item}
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="posts" className="mt-6 space-y-4">
//               {otherUserData.posts.map((post) => (
//                 <PostCard key={post.id} post={post} />
//               ))}
//             </TabsContent>

//             <TabsContent value="collabs" className="mt-6">
//               <Card>
//                 <CardContent className="pt-6">
//                   <div className="flex flex-col items-center justify-center py-12 text-center">
//                     <div className="rounded-full bg-muted p-4 mb-4">
//                       <Users className="h-8 w-8 text-muted-foreground" />
//                     </div>
//                     <h3 className="text-lg font-medium mb-2">No Public Collaborations</h3>
//                     <p className="text-muted-foreground mb-4">
//                       {otherUserData.fullName} hasn't shared any public collaborations yet
//                     </p>
//                     <Button
//                       className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
//                       onClick={handleCollaborate}
//                     >
//                       Invite to Collaborate
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="connections" className="mt-6">
//               <Card>
//                 <CardContent className="pt-6">
//                   <div className="flex flex-col items-center justify-center py-12 text-center">
//                     <div className="rounded-full bg-muted p-4 mb-4">
//                       <LinkIcon className="h-8 w-8 text-muted-foreground" />
//                     </div>
//                     <h3 className="text-lg font-medium mb-2">Connections are Private</h3>
//                     <p className="text-muted-foreground mb-4">
//                       {otherUserData.fullName}'s connections are not publicly visible
//                     </p>
//                     {!isConnected && !isPending ? (
//                       <Button
//                         className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
//                         onClick={handleConnect}
//                       >
//                         Connect with {otherUserData.fullName.split(" ")[0]}
//                       </Button>
//                     ) : isPending ? (
//                       <Button variant="secondary" onClick={handleConnect}>
//                         Cancel Connection Request
//                       </Button>
//                     ) : (
//                       <Button variant="outline">Already Connected</Button>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       {/* Collaboration Modal */}
//       <CollaborationModal
//         isOpen={isCollabModalOpen}
//         onClose={() => setIsCollabModalOpen(false)}
//         post={{
//           id: 999,
//           user: {
//             name: otherUserData.fullName,
//             avatar: otherUserData.profilePicture,
//             university: otherUserData.universityName,
//           },
//           content: `I'm interested in collaborating on projects related to ${otherUserData.abilities.join(", ")}.`,
//           tags: otherUserData.abilities.slice(0, 3),
//         }}
//       />
//     </div>
//   )
// }
