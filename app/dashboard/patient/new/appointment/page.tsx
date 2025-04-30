import { AppointmentScheduler } from "@/components/appointment-scheduler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choisir un créneau - Système de Rendez-vous Hospitaliers",
  description:
    "Sélectionnez une date et un créneau horaire pour votre rendez-vous",
};

export default function AppointmentPage({
  searchParams,
}: {
  searchParams: { doctor: string };
}) {
  const doctorId = searchParams.doctor || "";

  return (
    <div className="px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Choisissez votre créneau 📅
        </h1>
        <p className="text-xl text-muted-foreground">
          Sélectionnez une date et un horaire qui vous conviennent
        </p>
      </div>

      <AppointmentScheduler doctorId={doctorId} />
    </div>
  );
}
