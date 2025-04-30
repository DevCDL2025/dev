import { ReceptionDashboard } from "@/components/Dashboard/reception-dashboard";
import React from "react";
const user = {
  name: "Jonhathan",
  role: "reception",
};
function getRoleName(role?: string) {
  switch (role) {
    case "patient":
      return "patient";
    case "reception":
      return "réception";
    case "doctor":
      return "médecin";
    case "payment":
      return "paiement";
    default:
      return "";
  }
}
export default function page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue, {user?.name}. Voici votre espace {getRoleName(user?.role)}.
        </p>
      </div>

      <ReceptionDashboard />
    </div>
  );
}
