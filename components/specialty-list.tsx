"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Brain,
  Bone,
  Eye,
  Ear,
  Stethoscope,
  Baby,
  Pill,
  Scissors,
} from "lucide-react";

type Specialty = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
};

const specialties: Specialty[] = [
  {
    id: "cardiology",
    name: "Cardiologie",
    description: "Spécialistes des problèmes cardiaques et vasculaires",
    icon: <Heart className="h-12 w-12 text-red-500" />,
  },
  {
    id: "neurology",
    name: "Neurologie",
    description: "Spécialistes du cerveau et du système nerveux",
    icon: <Brain className="h-12 w-12 text-blue-500" />,
  },
  {
    id: "orthopedics",
    name: "Orthopédie",
    description: "Spécialistes des os, articulations et muscles",
    icon: <Bone className="h-12 w-12 text-amber-500" />,
  },
  {
    id: "ophthalmology",
    name: "Ophtalmologie",
    description: "Spécialistes des yeux et de la vision",
    icon: <Eye className="h-12 w-12 text-green-500" />,
  },
  {
    id: "ent",
    name: "ORL",
    description: "Spécialistes des oreilles, du nez et de la gorge",
    icon: <Ear className="h-12 w-12 text-purple-500" />,
  },
  {
    id: "general",
    name: "Médecine générale",
    description: "Consultations générales et bilans de santé",
    icon: <Stethoscope className="h-12 w-12 text-teal-500" />,
  },
  {
    id: "pediatrics",
    name: "Pédiatrie",
    description: "Spécialistes de la santé des enfants",
    icon: <Baby className="h-12 w-12 text-pink-500" />,
  },
  {
    id: "dermatology",
    name: "Dermatologie",
    description: "Spécialistes de la peau et des affections cutanées",
    icon: <Pill className="h-12 w-12 text-orange-500" />,
  },
  {
    id: "surgery",
    name: "Chirurgie",
    description: "Consultations pré et post opératoires",
    icon: <Scissors className="h-12 w-12 text-gray-500" />,
  },
];

export function SpecialtyList() {
  const router = useRouter();

  const handleSelectSpecialty = (specialtyId: string) => {
    router.push(`new/doctors?specialty=${specialtyId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {specialties.map((specialty) => (
        <Card
          key={specialty.id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-center mb-4">{specialty.icon}</div>
            <CardTitle className="text-xl text-center">
              {specialty.name}
            </CardTitle>
            <CardDescription className="text-center">
              {specialty.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            <p>Consultations disponibles</p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleSelectSpecialty(specialty.id)}
            >
              Choisir cette spécialité
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
