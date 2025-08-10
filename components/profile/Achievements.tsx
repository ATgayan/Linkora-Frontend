'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Trophy } from 'lucide-react'

type achievement = {
  title: string
  description?: string
  year?: string
};




export default function AchievementCard( { achievement }: { achievement: achievement[] }) {
  console.log(achievement);
  return (
    <Card className="w-full h-[300px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2" />
          Achievements
        </CardTitle>
      </CardHeader>

      {/* Scrollable content */}
      <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2">
        {achievement.length === 0 ? (
          <p className="text-muted-foreground text-sm">No achievements listed</p>
        ) : (
          achievement.map((ach, idx) => (
            <div
              key={idx}
              className="flex flex-col border-l-4 border-blue-400 pl-3"
            >
              <span
                className="font-semibold truncate max-w-full"
                title={ach.title}
              >
                {ach.title}
              </span>
              {ach.year && (
                <span className="text-xs text-muted-foreground truncate max-w-full" title={ach.year}>
                  {ach.year}
                </span>
              )}
              {ach.description && (
                <span
                  className="text-sm text-gray-600 truncate max-w-full"
                  title={ach.description}
                >
                  {ach.description}
                </span>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
