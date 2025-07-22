// types/User.ts
export type User = {
  uid: string
  fullName: string
  degreeCard?: string
  profilePicture?: string
  email?: string
  profileCompleteness: number

  university?: {
    name?: string
    faculty?: string
    degree?: string
    positions?: string
    universityYear?: string
  }

  whoAmI?: string
  relationshipState?: string
  location?: string
  joinDate?: string
  personality?: {
    hobbies?: string[]
    talents?: string[]
  }
  professional?: {
    currentJobs?: string
    societyPositions?: string
    workWithPeople?: string
    beAroundPeople?: string
  }
  activity?: {
    posts?: number
    collaborations?: number
  }
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
    personalWebsite?: string
  }
  interests?: string
  achievements?: string
  abilities?: string
  skills?: string[]
}
