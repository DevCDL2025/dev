"use client"

import { Heart, Scan, Brain, Eye, Baby } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpecialtyProps {
  specialty: {
    id: number
    name: string
    icon: string
  }
  onClick: () => void
}

export function SpecialtyCard({ specialty, onClick }: SpecialtyProps) {
  const getIcon = () => {
    switch (specialty.icon) {
      case "Heart":
        return <Heart className="h-6 w-6" />
      case "Scan":
        return <Scan className="h-6 w-6" />
      case "Brain":
        return <Brain className="h-6 w-6" />
      case "Eye":
        return <Eye className="h-6 w-6" />
      case "Baby":
        return <Baby className="h-6 w-6" />
      default:
        return <Heart className="h-6 w-6" />
    }
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200",
        "hover:border-blue-300 hover:bg-primary/70 transition-colors",
        "focus:outline-none hover:cursor-pointer hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      )}
    >
      <div className="bg-primary p-3 rounded-full text-white mb-3">
        {getIcon()}
      </div>
      <span className="text-sm font-medium ">{specialty.name}</span>
    </button>
  );
}
