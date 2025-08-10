import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'

type Props = {
  user?: {
    socialPreferences?: {
      workWithPeople?: string
      beAroundPeople?: string
    }
  }
}

export default function SocialPreferences({ user }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Social Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">What Kind of People Do You Like to Work With</p>
          <p className="text-muted-foreground">{user?.socialPreferences?.workWithPeople || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm font-medium">What Kind of People Do You Like to Be Around</p>
          <p className="text-muted-foreground">{user?.socialPreferences?.beAroundPeople || "Not specified"}</p>
        </div>
        
      </CardContent>
    </Card>
  )
}
