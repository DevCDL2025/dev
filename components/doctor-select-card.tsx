import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import { Button } from "./ui/button";

export type DoctorAvailability = "available" | "limited" | "unavailable";

export interface DoctorProps {
  id: string;
  name: string;
  specialty: string;
  photoUrl?: string;
  availability: DoctorAvailability;
  nextAvailableSlot?: string;
  onSelect?: (doctorId: string) => void;
}

const DoctorCard = ({
  id,
  name,
  specialty,
  photoUrl,
  availability,
  nextAvailableSlot,
  onSelect,
}: DoctorProps) => {
  const getAvailabilityColor = (status: DoctorAvailability) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "limited":
        return "bg-amber-500";
      case "unavailable":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAvailabilityText = (status: DoctorAvailability) => {
    switch (status) {
      case "available":
        return "Disponible aujourd'hui";
      case "limited":
        return "Disponibilité limitée";
      case "unavailable":
        return "Non disponible";
      default:
        return "";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16 border-2 border-primary/20">
          <AvatarImage src={photoUrl} alt={name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{specialty}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${getAvailabilityColor(
                availability
              )}`}
            ></span>
            <span className="text-xs font-medium">
              {getAvailabilityText(availability)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => onSelect && onSelect(id)}
          className="w-full"
          variant={availability === "unavailable" ? "outline" : "default"}
          disabled={availability === "unavailable"}
        >
          {availability === "unavailable"
            ? "Non disponible"
            : "Prendre rendez-vous"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
