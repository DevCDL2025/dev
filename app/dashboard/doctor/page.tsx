import { DoctorDashboard } from "@/components/Dashboard/doctor-dashboard";
import React from "react";

export default function page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre espace Médecin, Dr. Jonhathan.
        </p>
      </div>

      <DoctorDashboard />
    </div>
  );
}
