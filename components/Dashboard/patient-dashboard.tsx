"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  MessageSquare,
  FileText,
  Bell,
  Pill,
  Syringe,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Mock data
const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Jean-Baptiste Ngoua",
    specialty: "Cardiologie",
    date: "28 avril 2025",
    time: "14:30",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Marie Ndong",
    specialty: "Dermatologie",
    date: "15 mai 2025",
    time: "10:00",
    status: "pending",
  },
];

const recentPrescriptions = [
  {
    id: 1,
    name: "Ordonnance - Cardiologie",
    doctor: "Dr. Jean-Baptiste Ngoua",
    date: "15 mars 2025",
  },
  {
    id: 2,
    name: "Ordonnance - Médecine générale",
    doctor: "Dr. Marc Biyoghé",
    date: "28 février 2025",
  },
];

export function PatientDashboard() {
  const router = useRouter();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Rendez-vous à venir</CardTitle>
            <CardDescription>
              Vos prochains rendez-vous médicaux
            </CardDescription>
          </div>
          <Link href="/dashboard/patient/appointments">
            <Button variant="outline">Voir tous</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-teal-100 text-teal-800">
                        {appointment.doctor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.specialty}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="mr-1 h-3 w-3" />
                        {appointment.date} à {appointment.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      className={
                        appointment.status === "confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {appointment.status === "confirmed"
                        ? "Confirmé"
                        : "En attente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Aucun rendez-vous à venir</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Vous n'avez pas de rendez-vous programmés pour le moment.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/patient/new" className="w-full">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              Prendre un nouveau rendez-vous
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Accès rapide</CardTitle>
            <CardDescription>Actions fréquentes</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/dashboard/patient/new">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Nouveau rendez-vous
              </Button>
            </Link>
            <Link href="/dashboard/patient/medical-history">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Historique médical
              </Button>
            </Link>
            <Link href="/dashboard/patient/prescriptions">
              <Button variant="outline" className="w-full justify-start">
                <Pill className="mr-2 h-4 w-4" />
                Mes ordonnances
              </Button>
            </Link>
            <Link href="/dashboard/patient/medical-reports">
              <Button variant="outline" className="w-full justify-start">
                <Syringe className="mr-2 h-4 w-4" />
                Mes examens
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ordonnances récentes</CardTitle>
            <CardDescription>Vos dernières ordonnances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium text-sm">{prescription.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {prescription.doctor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {prescription.date}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/dashboard/patient/prescription/${prescription.id}`
                      )
                    }
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
