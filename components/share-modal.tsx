"use client"
import { Copy, Facebook, Link, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/hooks/use-toast"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
  type: "post" | "profile"
}

export function ShareModal({ isOpen, onClose, title, url, type }: ShareModalProps) {
  const { toast } = useToast()

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
    })
  }

  const shareText = type === "post" ? "Check out this post on Linkora!" : "Check out my profile on Linkora!"

  return (
    <Modal title="Share" description="Share this content with your network" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 py-4">
        <div className="flex items-center space-x-2">
          <Input value={url} readOnly />
          <Button variant="outline" size="icon" onClick={handleCopyLink}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center space-x-2">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Share on Twitter</span>
            </a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Share on Facebook</span>
            </a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={handleCopyLink}>
            <Link className="h-4 w-4" />
            <span className="sr-only">Copy link</span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
