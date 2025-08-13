import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { User } from 'lucide-react'

type Props = {
  users?: {
    skills?: string[] 
  }
}

export default function PersonalitySkillsCard({ users }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
           Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          {users?.skills && users.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {users.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No skills added.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
