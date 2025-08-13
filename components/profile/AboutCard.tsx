import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { User, Heart, UserPlus } from 'lucide-react'

type UserType = {
  
  relationshipState?: 'single' | 'in-relationship' | 'married' | 'complicated' | string
  hobbies?: string[]
  university?: {
    name?: string
    faculty?: string
    degree?: string
    universityYear?: string | number
  }
  personality?: {
    type?: string
    hobbies?: string[]
    interests?: string
    whoAmI?: string
  }
}

type Props = {
  users?: UserType
}

export default function AboutCard({ users }: Props) {
  // Map relationshipState to icons (only icons)
  console.log('User data about card:', users)

  const relationshipIcons = {
  single: <Heart className="h-5 w-5 text-pink-500" />,
  "i have relationship": <Heart className="h-5 w-5 text-red-600" />,
  married: <Heart className="h-5 w-5 text-purple-600" />,
  complicated: <Heart className="h-5 w-5 text-yellow-500" />,
  "no relationship": <UserPlus className="h-5 w-5 text-blue-500" />, // Added recommend icon
};

const relationshipIcon =
  users?.relationshipState &&
  relationshipIcons[
    users.relationshipState.toLowerCase() as keyof typeof relationshipIcons
  ]
    ? relationshipIcons[
        users.relationshipState.toLowerCase() as keyof typeof relationshipIcons
      ]
    : <Heart className="h-5 w-5 text-gray-400" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          About
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* How I'm / Self description */}
        <div>
          <h3 className="font-semibold text-sm mb-1">Who Am I?</h3>
          <p className="text-sm text-muted-foreground">{users?.personality?.whoAmI || 'Tell us who you are...'}</p>
        </div>

        {/* Personality type */}
        <div>
          <h3 className="font-semibold text-sm mb-1">Personality</h3>
          <p className="text-sm text-muted-foreground">{users?.personality?.type || 'Inrovard'}</p>
        </div>

        {/* Relationship state - icon only */}
        <div>
          <h3 className="font-semibold text-sm mb-1">Relationship</h3>
          <div>{relationshipIcon}</div>
        </div>

        {/* Hobby list */}
        {users?.hobbies && users.hobbies.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm mb-1">Hobbies</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {users.hobbies.map((hobby, i) => (
                <li key={i}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
