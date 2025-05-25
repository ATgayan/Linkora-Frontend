"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, Users, Calendar, MessageSquare, UserPlus, CheckCircle, XCircle, Eye } from "lucide-react"
import { CollaborationFeed } from "@/components/collaboration-feed"

interface CollaborationDetailModalProps {
  isOpen: boolean
  onClose: () => void
  collaboration: any
  onApply?: () => void
}

export function CollaborationDetailModal({ isOpen, onClose, collaboration, onApply }: CollaborationDetailModalProps) {
  const [selectedApplicant, setSelectedApplicant] = React.useState<any>(null)
  const [isApplicantDetailOpen, setIsApplicantDetailOpen] = React.useState(false)

  if (!collaboration) return null

  const handleViewApplicant = (applicant: any) => {
    setSelectedApplicant(applicant)
    setIsApplicantDetailOpen(true)
  }

  const handleAcceptApplicant = (applicantId: number) => {
    // In a real app, this would update the backend
    console.log(`Accepted applicant ${applicantId}`)
  }

  const handleRejectApplicant = (applicantId: number) => {
    // In a real app, this would update the backend
    console.log(`Rejected applicant ${applicantId}`)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto w-[95vw] max-w-[95vw] sm:w-full sm:max-w-[800px]">
          <DialogHeader className="px-4 sm:px-6">
            <DialogTitle className="text-lg sm:text-2xl pr-8">{collaboration.title}</DialogTitle>
            <DialogDescription className="text-sm">Collaboration details and applicants</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
            {/* Author Section */}
            <Card>
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                  Project Author
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto sm:mx-0">
                    <AvatarImage
                      src={collaboration.author.avatar || "/placeholder.svg"}
                      alt={collaboration.author.name}
                    />
                    <AvatarFallback>{collaboration.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold">{collaboration.author.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 sm:mb-3">{collaboration.author.university}</p>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 justify-center sm:justify-start">
                      {collaboration.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 justify-center sm:justify-start">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Timeframe: {collaboration.timeframe}</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center sm:justify-start">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{collaboration.applicants?.length || 0} applicants</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="text-xs">
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg">Project Description</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                  {collaboration.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-green-500 bg-green-500/10 text-green-500 text-xs">
                      {collaboration.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Posted 2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Applicants Section */}
            <Card>
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    Applicants ({collaboration.applicants?.length || 0})
                  </span>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm w-full sm:w-auto"
                    onClick={onApply}
                  >
                    Apply to Join
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                {collaboration.applicants && collaboration.applicants.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {collaboration.applicants.map((applicant: any) => (
                      <div key={applicant.id} className="border rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row items-start gap-3">
                          <div className="flex items-start gap-3 w-full sm:flex-1">
                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                              <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
                              <AvatarFallback className="text-xs">{applicant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm sm:text-base">{applicant.name}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground mb-2">{applicant.university}</p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {applicant.skills.map((skill: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                {applicant.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">Applied {applicant.appliedAt}</p>
                            </div>
                          </div>
                          <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewApplicant(applicant)}
                              className="flex-1 sm:flex-none text-xs"
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50 flex-1 sm:flex-none text-xs"
                              onClick={() => handleAcceptApplicant(applicant.id)}
                            >
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 flex-1 sm:flex-none text-xs"
                              onClick={() => handleRejectApplicant(applicant.id)}
                            >
                              <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <div className="rounded-full bg-muted p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      <Users className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2 text-sm sm:text-base">No applicants yet</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      Be the first to apply for this collaboration!
                    </p>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm"
                      onClick={onApply}
                    >
                      Apply Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Team Feed Section - Only show if there are accepted members */}
            {collaboration.teamMembers && collaboration.teamMembers.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <CollaborationFeed collaborationId={collaboration.id} members={collaboration.teamMembers} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Applicant Detail Modal */}
      <Dialog open={isApplicantDetailOpen} onOpenChange={setIsApplicantDetailOpen}>
        <DialogContent className="sm:max-w-[600px] w-[95vw] max-w-[95vw] sm:w-full">
          <DialogHeader className="px-4 sm:px-6">
            <DialogTitle className="text-lg sm:text-xl">Applicant Details</DialogTitle>
            <DialogDescription className="text-sm">Review applicant information and application</DialogDescription>
          </DialogHeader>

          {selectedApplicant && (
            <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto sm:mx-0">
                  <AvatarImage src={selectedApplicant.avatar || "/placeholder.svg"} alt={selectedApplicant.name} />
                  <AvatarFallback>{selectedApplicant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold">{selectedApplicant.name}</h3>
                  <p className="text-muted-foreground mb-2 sm:mb-3 text-sm sm:text-base">
                    {selectedApplicant.university}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {selectedApplicant.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="rounded-full text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Application Message</h4>
                <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm leading-relaxed">{selectedApplicant.message}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Applied {selectedApplicant.appliedAt}</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button variant="outline" onClick={() => setIsApplicantDetailOpen(false)} className="text-sm">
                  Close
                </Button>
                <Button variant="outline" className="text-sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button variant="outline" className="text-sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Profile
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white text-sm"
                  onClick={() => {
                    handleAcceptApplicant(selectedApplicant.id)
                    setIsApplicantDetailOpen(false)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Accept
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
