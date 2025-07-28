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
    hobbies?: string[] // hobbies = thingsYouLikeToDo
    talents?: string[] // talents = abilities
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
  abilities?: string[] // changed from string to string[] ✅
  skills?: string[] // used in filters ✅
  thingsYouLikeToDo?: string[] // for consistency with hobbies ✅
}
