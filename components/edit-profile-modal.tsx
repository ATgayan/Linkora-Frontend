"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Upload, User, MapPin, GraduationCap, Target, Sparkles, Camera } from "lucide-react"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const [name, setName] = React.useState("Jamie Smith")
  const [bio, setBio] = React.useState(
    "Music producer and audio engineer with 3 years of experience. Currently studying Music Technology at MIT. Passionate about creating innovative sounds and collaborating with talented artists.",
  )
  const [university, setUniversity] = React.useState("MIT")
  const [location, setLocation] = React.useState("Cambridge, MA")
  const [avatar, setAvatar] = React.useState("/placeholder.svg?height=120&width=120")
  const [skills, setSkills] = React.useState(["Music", "Production", "Mixing", "Mastering", "Logic Pro", "Ableton"])
  const [lookingFor, setLookingFor] = React.useState("Vocalists, Songwriters")
  const [newSkill, setNewSkill] = React.useState("")
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [hoveredSkill, setHoveredSkill] = React.useState("")

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSubmit = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      onClose()
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 animate-in zoom-in-95 fade-in-0">
        {/* Header with gradient */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 backdrop-blur-3xl" />
          <div className="relative flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold">Edit Profile</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex justify-center">
              <div className="relative group">
                <div 
                  className="relative cursor-pointer transition-all duration-300 group-hover:scale-105"
                  onClick={handleAvatarClick}
                >
                  <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-xl bg-gradient-to-r from-purple-600 to-blue-500 p-1">
                    <img
                      src={avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover transition-all duration-300 group-hover:brightness-75"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-2 shadow-lg transform transition-transform duration-200 group-hover:scale-110">
                    <Upload className="h-4 w-4 text-white" />
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Name */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <User className="h-4 w-4 text-purple-500" />
                  Name
                </label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="transition-all duration-200 border-2 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl h-12"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Bio */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Sparkles className="h-4 w-4 text-pink-500" />
                  Bio
                </label>
                <Textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  className="transition-all duration-200 border-2 focus:border-pink-500 focus:ring-pink-500/20 rounded-xl min-h-[120px] resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* University and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <GraduationCap className="h-4 w-4 text-blue-500" />
                    University
                  </label>
                  <Input 
                    value={university} 
                    onChange={(e) => setUniversity(e.target.value)}
                    className="transition-all duration-200 border-2 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-12"
                    placeholder="Your university"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    Location
                  </label>
                  <Input 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="transition-all duration-200 border-2 focus:border-green-500 focus:ring-green-500/20 rounded-xl h-12"
                    placeholder="Your location"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <Target className="h-4 w-4 text-orange-500" />
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl min-h-[60px]">
                  {skills.map((skill, index) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className={`
                        rounded-full flex items-center gap-2 px-3 py-1.5 
                        bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0
                        transition-all duration-300 hover:scale-105 hover:shadow-lg
                        animate-in fade-in-0 slide-in-from-bottom-2
                        cursor-pointer group
                        ${hoveredSkill === skill ? 'shadow-lg scale-105' : ''}
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill("")}
                    >
                      {skill}
                      <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 p-0.5 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                    className="transition-all duration-200 border-2 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl h-11"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSkill()
                      }
                    }}
                  />
                  <Button
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim() || skills.includes(newSkill.trim())}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Looking For */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Target className="h-4 w-4 text-teal-500" />
                  Looking For
                </label>
                <Input
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  placeholder="What skills or collaborators are you looking for?"
                  className="transition-all duration-200 border-2 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl h-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="rounded-xl px-6 h-11 transition-all duration-200 hover:scale-105 border-2"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isAnimating}
              className={`
                bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                text-white border-0 rounded-xl px-8 h-11 transition-all duration-200 hover:scale-105 hover:shadow-lg
                ${isAnimating ? 'animate-pulse' : ''}
              `}
            >
              {isAnimating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #2563eb);
        }
        
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}