import { SpecialtyList } from "@/components/specialty-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choisir une spécialité - Système de Rendez-vous Hospitaliers",
  description: "Sélectionnez la spécialité médicale pour votre rendez-vous",
};

export default function SpecialtiesPage() {
  return (
    <div className=" py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Choisissez une spécialité 👨‍⚕️👩‍⚕️
        </h1>
        <p className="text-xl text-muted-foreground">
          Quelle spécialité médicale souhaitez-vous consulter aujourd'hui ?
        </p>
      </div>

      <SpecialtyList />
    </div>
  );
}
