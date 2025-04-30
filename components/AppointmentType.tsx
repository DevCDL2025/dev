import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { IconNode, LucideIcon, Microscope, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentTypeProps {
  onTypeSelect: (type: string) => void;
}

export default function AppointmentType({
  onTypeSelect,
}: AppointmentTypeProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full">
      <Type
        type="Consultation"
        icon={<Stethoscope size={20} className="text-white" />}
        color="primary"
        onClick={() => onTypeSelect("consultation")}
      />
      <Type
        type="Présentation de résultat"
        icon={<Microscope size={20} className="text-white" />}
        color="primary"
        onClick={() => onTypeSelect("result-presentation")}
      />
    </div>
  );
}

const Type = ({
  type,
  icon,
  color,
  onClick,
}: {
  type: string;
  icon: ReactNode;
  color?: string;
  onClick: () => void;
}) => {
  return (
    <Card
      className={`hover:bg-${color} hover:cursor-pointer hover:text-white w-full h-50`}
      onClick={onClick}
    >
      <CardContent
        className={cn(
          `ring-${color}`,
          "flex flex-col items-center justify-center size-full font-semibold text-xl"
        )}
      >
        <div
          className={cn(
            `bg-${color}`,
            "flex justify-center items-center rounded-full size-10"
          )}
        >
          {icon}
        </div>
        {type}
      </CardContent>
    </Card>
  );
};
