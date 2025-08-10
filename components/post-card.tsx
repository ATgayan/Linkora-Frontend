import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Post = {
  id: number
  user: {
    name: string | null
    avatar: string | null
    university: string | null
  } | null
  content: string | null
  image?: string | null
  tags: string[] | null
  status: 'Have' | 'Find' | null
  likes: number | null
  comments: number | null
  timeAgo: string | null
}

type Props = {
  posts?: Post[]
}

export default function PostsCard({ posts = [] }: Props) {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Life's Interesting Moments</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center">No posts to show.</p>
        ) : (
          <div className="max-h-96 overflow-y-auto space-y-4 px-2">
            {posts.map(post => (
              <div
                key={post.id}
                className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-lg mb-1">
                  {post.user?.name ?? 'Anonymous'}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {post.user?.university ?? 'University not specified'} • {post.timeAgo ?? 'some time ago'}
                </p>
                <p className="text-sm text-gray-700">
                  {post.content ?? 'No content provided.'}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(post.tags && post.tags.length > 0 ? post.tags : ['No tags']).map((tag, i) => (
                    <span
                      key={i}
                      className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-muted-foreground flex justify-between">
                  <span>Status: {post.status ?? 'Unknown'}</span>
                  <span>👍 {post.likes ?? 0} Likes</span>
                  <span>💬 {post.comments ?? 0} Comments</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
