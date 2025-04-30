import { DoctorList } from "@/components/doctor-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choisir un médecin - Système de Rendez-vous Hospitaliers",
  description: "Sélectionnez le médecin pour votre rendez-vous",
};

export default function DoctorsPage({
  searchParams,
}: {
  searchParams: { specialty?: string };
}) {
  const specialty = searchParams.specialty || "";

  return (
    <div className="px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Choisissez votre médecin 🩺
        </h1>
        <p className="text-xl text-muted-foreground">
          Voici les médecins disponibles pour vous accueillir
        </p>
      </div>

      <DoctorList specialty={specialty} />
    </div>
  );
}
