"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { getAuth } from "firebase/auth"
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

import { Loader2 } from "lucide-react"

type Post = {
  createdAt: string | undefined
  author: any
  id: string
  title: string
  content: string
}

type Props = {
  posts?: Post[]
}

export default function DiaryPostsCard({ posts = [] }: Props) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [postList, setPostList] = useState<Post[]>(posts)
  const [loading, setLoading] = useState(false)

  const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const auth = getAuth()
        const user = auth.currentUser

        if (!user) {
          alert("You must be logged in to view posts.")
          setLoading(false)
          return
        }

        const token = await user.getIdToken()

        const response = await fetch(`${baseurl}/feed/posts`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to load posts")
        }

        const posts: Post[] = await response.json()
        setPostList(posts)
      } catch (error: any) {
        alert(error.message || "Error loading posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [baseurl])

  const handleCreatePost = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Please enter both title and content.")
      return
    }

    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) {
        alert("You must be logged in to create a post.")
        return
      }
      const token = await user.getIdToken()

      const response = await fetch(`${baseurl}/feed/posts-create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create post")
      }

      const createdPost: Post = await response.json()
      setPostList([createdPost, ...postList])
      setNewTitle("")
      setNewContent("")
      setShowCreateModal(false)
    } catch (error: any) {
      alert(error.message || "Error creating post")
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) {
        alert("You must be logged in to delete posts.")
        return
      }
      const token = await user.getIdToken()

      const response = await fetch(`${baseurl}/feed/posts-delete/${postId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete post")
      }

      setPostList(postList.filter(post => post.id !== postId))
    } catch (error: any) {
      alert(error.message || "Error deleting post")
    }
  }

  const handleUpdatePost = async (post: Post) => {
    const updatedTitle = prompt("Edit Title:", post.title)
    if (updatedTitle === null) return // User cancelled

    const updatedContent = prompt("Edit Content:", post.content)
    if (updatedContent === null) return

    if (!updatedTitle.trim() || !updatedContent.trim()) {
      alert("Title and Content cannot be empty.")
      return
    }

    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) {
        alert("You must be logged in to update posts.")
        return
      }
      const token = await user.getIdToken()

      const response = await fetch(`${baseurl}/feed/posts-update/${post.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedTitle.trim(),
          content: updatedContent.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update post")
      }

      setPostList(
        postList.map(p =>
          p.id === post.id
            ? { ...p, title: updatedTitle.trim(), content: updatedContent.trim() }
            : p
        )
      )
    } catch (error: any) {
      alert(error.message || "Error updating post")
    }
  }

  return (
    <>
      <Card className="max-w-6xl mx-auto my-8 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-600">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Life's Interesting Moments
          </CardTitle>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            <PlusIcon className="w-5 h-5" />
            Create Post
          </Button>
        </CardHeader>

        <CardContent className="p-6 m-5 w-[1000px]">
          {loading ? (
            <Loader2/>
          ) : postList.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500">No posts to show.</p>
          ) : (
            <div
              className="max-h-[520px] overflow-y-auto pr-4 space-y-4
              scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postList.map(post => (
                  <Card
  key={post.id}
  className="max-w-xl w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-gray-50 dark:bg-gray-800 flex flex-col"
>
  <CardHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
    <div className="flex flex-col">
      <CardTitle
        className="truncate text-xl font-semibold text-indigo-700 dark:text-indigo-300 cursor-pointer hover:underline"
        onClick={() => setSelectedPost(post)}
        title={post.title}
      >
        {post.title}
      </CardTitle>
      {post.author && (
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          By <strong>{post.author}</strong>
        </span>
      )}
    </div>
    
  </CardHeader>

  <CardContent className="flex-grow px-6 py-4">
    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-5 whitespace-pre-line leading-relaxed break-words">
      {post.content}
    </p>
  </CardContent>

  <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900"
      onClick={() => setSelectedPost(post)}
      aria-label="Read Post"
    >
      <EyeIcon className="w-4 h-4" /> Read
    </Button>
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-1 text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900"
      onClick={() => handleUpdatePost(post)}
      aria-label="Update Post"
    >
      <PencilIcon className="w-4 h-4" /> Update
    </Button>
    <Button
      variant="destructive"
      size="sm"
      className="flex items-center gap-1"
      onClick={() => handleDeletePost(post.id)}
      aria-label="Delete Post"
    >
      <TrashIcon className="w-4 h-4" /> Delete
    </Button>
  </div>
</Card>

                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popup Modal for Reading Post */}
      <Dialog
        open={!!selectedPost}
        onOpenChange={() => setSelectedPost(null)}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto rounded-xl p-6 bg-white dark:bg-gray-900 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
              {selectedPost?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="text-base text-gray-800 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {selectedPost?.content}
          </div>
          <div className="flex justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => setSelectedPost(null)}
              className="text-indigo-600 dark:text-indigo-400"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Post Modal */}
      <Dialog
        open={showCreateModal}
        onOpenChange={() => setShowCreateModal(false)}
        
      >
        <DialogContent className="max-w-lg rounded-xl bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 shadow-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-300">
              Create New Post
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Input
              placeholder="Title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="text-lg font-semibold text-indigo-900 dark:text-indigo-200"
            />
            <Textarea
              placeholder="Content"
              rows={6}
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="text-indigo-900 dark:text-indigo-200"
            />
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="text-indigo-700 dark:text-indigo-400 border-indigo-700 dark:border-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800"
              >
                Cancel <XMarkIcon className="w-4 h-4 ml-1 inline" />
              </Button>
              <Button
                onClick={handleCreatePost}
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
              >
                Save <PlusIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
