type Achievement = {
  title: string
  description?: string
  year: string
}


export type Post = {
  id: string
  title: string
  content: string
}

export type Props = {
  posts?: Post[]
}

export type User = {
  
  
  uid: string
  fullName: string
  degreeCard?: string | null
  Gender?: string | null
  profilePicture?: string | null
  bannerImage?: string | null
  email?: string | null
  profileCompleteness: number

  university?: {
    name?: string | null
    faculty?: string | null
    degree?: string | null
    universityYear?: string | null
    positions?: string | null
  }

  
  relationshipState?: string | null
  location?: string | null
  joinDate?: string | null

  personality?: {
    type: string | null
    whoAmI?: string | null
    hobbies?: string[]
    interests?: string | null
    achievements?:Achievement[] | null
    abilities?: string[] | null
    skills?: string[]
  }
  socialPreferences?: {
    workWithPeople?: string
    beAroundPeople?: string
  }

  activity?: {
    posts?: number
   
  }

 role?: string 
 register_state?: string
 userquality?: string
 profile_state?: string

 
}
