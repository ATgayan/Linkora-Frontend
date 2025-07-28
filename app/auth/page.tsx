"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/useAuth";

import { User } from "@/model/User"

export default function AuthPage() {

  const router = useRouter()
  const { login, signup } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupStep, setSignupStep] = useState(1)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [DegreeCard, setDegreeCard] = useState("")
  const [university, setUniversity] = useState("")
  const [faculty, setFaculty] = useState("")
  const [degree, setDegree] = useState("")
  const [universityYear, setUniversityYear] = useState("")
  const [hobbies, setHobbies] = useState("")

  const [activeTab, setActiveTab] = useState("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isNavigatingSteps, setIsNavigatingSteps] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const userCredential = await login(email, password)
      if (userCredential && userCredential.user) {
        const token = await userCredential.user.getIdToken()
        // Send the token to your backend to create a session and set an HttpOnly cookie.
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })


        if (!response.ok) { throw new Error("Failed to create session on the backend.") }

        router.push("/") // redirect to home or dashboard
      } else {
        throw new Error("Login failed to return user information.")
      }
    } catch (err: any) {
      alert(`Login failed: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    let userCredential


    try {
      // 1. Create user in Firebase Auth
      userCredential = await signup(signupEmail, signupPassword)
      if (!userCredential || !userCredential.user) {
        throw new Error("Signup failed to return user information.")
      }

      const { user } = userCredential
      const token = await user.getIdToken(true)
      const userObject: User = {
        uid: user.uid,
        fullName: `${firstName} ${lastName}`.trim(),
        email: signupEmail,
        degreeCard:DegreeCard ||'',
        profilePicture: "/placeholder.svg?height=128&width=128",
        profileCompleteness: 85,
        relationshipState: "Looking for a relationship",
        joinDate: "",
        university: {
          name: university,
          faculty,
          degree,
          universityYear,
          positions: "No positions yet"
        },
        professional: {
          currentJobs: "Part-time Web Developer at TechStart, Campus Barista",
          societyPositions: "Treasurer of Debate Society, Volunteer at Local Shelter",
          workWithPeople: "Creative thinkers, problem solvers, and those who bring diverse perspectives",
          beAroundPeople: "Energetic, positive, and intellectually curious individuals who enjoy deep conversations"
        },
        personality: {
          hobbies: ["Photography", "Hiking", "Chess", "Coding", "Reading"],
          talents: ["Web Development", "Public Speaking", "Creative Writing", "UI/UX Design"]
        },
        socialLinks: {
          github: "github.com/alexj",
          linkedin: "linkedin.com/in/alexjohnson",
          twitter: "twitter.com/alexj",
          instagram: "instagram.com/alex.johnson",
          personalWebsite: "https://alexjohnson.dev"
        },
        activity: {
          posts: 24,
          collaborations: 5,
        },
        achievements: "Dean's List 2022-2023, 1st Place Hackathon 2022, Published Research Paper on AI Ethics",
      }


      const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ userObject })
      })

      if (!backendResponse.ok) {
        const errorData = await backendResponse.json()
        throw new Error(errorData.message || "Failed to save user profile to backend.")
      } else {
        console.log("User registered successfully!")
      }

      router.push("/")
    } catch (err: any) {
      if (userCredential) {
        console.error("Firebase user created, but backend failed")
      }
      alert(`Signup failed: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }




  const handleNextStep = () => {
    setIsNavigatingSteps(true)
    setTimeout(() => {
      setSignupStep(2)
      setIsNavigatingSteps(false)
    }, 300)
  }

  const handlePrevStep = () => {
    setIsNavigatingSteps(true)
    setTimeout(() => {
      setSignupStep(1)
      setIsNavigatingSteps(false)
    }, 300)
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <Image
          src="/Auth_images/f.jpg"
          alt="Authentication"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-[0.4]"
        />
        <Link href="/" className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Linkora
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Linkora has completely transformed how I connect with other students. I've found amazing collaborators
              and made lifelong friends!"
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 overflow-y-auto max-h-screen">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome to Linkora</h1>
            <p className="text-sm text-muted-foreground">Connect with students based on shared interests and skills</p>
          </div>

          <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>



            {/* Sign In Form */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <Card>
                  <CardHeader>
                    <CardTitle>Sign in to your account</CardTitle>
                    <CardDescription>Enter your email and password to access your profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="name@university.edu" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white" disabled={isSubmitting}>
                      {isSubmitting && activeTab === "signin" && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Sign In
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <Card>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                      {signupStep === 1 ? "Enter your basic information" : "Tell us about your academic background and interests"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {signupStep === 1 ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input
                              id="first-name"
                              placeholder="Alex"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                              id="last-name"
                              placeholder="Johnson"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nickname">Nickname</Label>
                          <Input
                            id="nickname"
                            placeholder="alex_j"
                            value={DegreeCard}
                            onChange={(e) => setDegreeCard(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            id="email"
                            type="email"
                            placeholder="name@university.edu"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Password</Label>
                          <div className="relative">
                            <Input
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              id="new-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="university">University</Label>
                          <Input
                            id="university"
                            placeholder="Start typing your university..."
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="faculty">Faculty/Department</Label>
                          <Input
                            id="faculty"
                            placeholder="e.g., Computer Science, Engineering..."
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="degree">Degree Program</Label>
                          <Input
                            id="degree"
                            placeholder="e.g., BSc Computer Science, MSc Data Science..."
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="university-year">University Year</Label>
                          <Select value={universityYear} onValueChange={setUniversityYear}>
                            <SelectTrigger id="university-year">
                              <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="First Year">First Year</SelectItem>
                              <SelectItem value="Second Year">Second Year</SelectItem>
                              <SelectItem value="Third Year">Third Year</SelectItem>
                              <SelectItem value="Fourth Year">Fourth Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              terms of service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              privacy policy
                            </Link>
                          </label>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {signupStep === 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                        disabled={isNavigatingSteps}
                      >
                        {isNavigatingSteps && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Back
                      </Button>
                    )}
                    {signupStep === 1 ? (
                      <Button
                        type="button"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                        onClick={handleNextStep}
                        disabled={isNavigatingSteps}
                      >
                        {isNavigatingSteps && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white m-4"
                        disabled={isSubmitting}
                      >
                        {isSubmitting && activeTab === "signup" && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create Account
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
