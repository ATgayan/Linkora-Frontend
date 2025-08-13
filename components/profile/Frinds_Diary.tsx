"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuth } from "firebase/auth";
import { EyeIcon } from "@heroicons/react/24/outline";

type Post = {
  createdAt: string | undefined;
  author: any;
  id: string;
  title: string;
  content: string;
};

type Props = {
  userId: string; // Target user's ID to fetch posts for
};

export default function DiaryPostsCard({ userId }: Props) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          alert("You must be logged in to view posts.");
          setLoading(false);
          return;
        }


        // Updated API call to match backend
        const response = await fetch(`${baseurl}/feed/friends-posts/${userId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to load posts");
        }

        const posts: Post[] = await response.json();
       
             setPostList(posts);
        
       
      } catch (error: any) {
        alert(error.message || "Error loading posts");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchPosts();
  }, [baseurl, userId]);

  return (
    <>
      {loading && <p className="text-gray-500">Loading posts...</p>}

      {!loading && postList.length === 0 && (
        <p className="text-gray-500">No posts found.</p>
      )}

      {postList.map((post) => (
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
            <time
              className="text-xs text-gray-400 dark:text-gray-500"
              dateTime={post.createdAt}
              title={new Date(post.createdAt ?? "").toLocaleString()}
            >
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString()
                : "Unknown date"}
            </time>
          </CardHeader>

          <CardContent className="flex-grow px-6 py-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-5 whitespace-pre-line leading-relaxed">
              {post.content}
            </p>
          </CardContent>

          <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 h-8 text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900"
              onClick={() => setSelectedPost(post)}
              aria-label="Read Post"
            >
              <EyeIcon className="w-4 h-4" /> Read
            </Button>
          </div>
        </Card>
      ))}
    </>
  );
}
