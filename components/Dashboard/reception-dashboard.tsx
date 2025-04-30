"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  Users,
  Clock,
  Search,
  PlusCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const todayAppointments = [
  {
    id: 1,
    patient: "Kévin Mboumba",
    doctor: "Dr. Jean-Baptiste Ngoua",
    specialty: "Cardiologie",
    time: "14:30",
    status: "waiting",
  },
  {
    id: 2,
    patient: "Laura Missambo",
    doctor: "Dr. Marie Ndong",
    specialty: "Dermatologie",
    time: "15:00",
    status: "in-progress",
  },
  {
    id: 3,
    patient: "Philippe Moreau",
    doctor: "Dr. Jean-Baptiste Ngoua",
    specialty: "Cardiologie",
    time: "16:15",
    status: "completed",
  },
  {
    id: 4,
    patient: "Marc Essono",
    doctor: "Dr. Marc Biyoghé",
    specialty: "Médecine générale",
    time: "17:00",
    status: "scheduled",
  },
];

export function ReceptionDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Rendez-vous du jour</CardTitle>
              <CardDescription>28 avril 2025</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/reception/manage-appointments">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendrier
                </Button>
              </Link>
              <Link href="/dashboard/reception/new-appointment-admin">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nouveau
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="waiting">En attente</TabsTrigger>
              <TabsTrigger value="in-progress">En cours</TabsTrigger>
              <TabsTrigger value="completed">Terminés</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-gray-100">
                          {appointment.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctor} - {appointment.specialty}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="mr-1 h-3 w-3" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          appointment.status === "waiting"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : appointment.status === "in-progress"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : appointment.status === "completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {appointment.status === "waiting"
                          ? "En attente"
                          : appointment.status === "in-progress"
                          ? "En cours"
                          : appointment.status === "completed"
                          ? "Terminé"
                          : "Programmé"}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="waiting">
              <div className="space-y-4">
                {todayAppointments
                  .filter((a) => a.status === "waiting")
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-gray-100">
                            {appointment.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.doctor} - {appointment.specialty}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="mr-1 h-3 w-3" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          En attente
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="in-progress">
              {/* Similar structure for in-progress appointments */}
              <div className="space-y-4">
                {todayAppointments
                  .filter((a) => a.status === "in-progress")
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      {/* Content similar to above */}
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-gray-100">
                            {appointment.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.doctor} - {appointment.specialty}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="mr-1 h-3 w-3" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          En cours
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="space-y-4">
                {todayAppointments
                  .filter((a) => a.status === "completed")
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-gray-100">
                            {appointment.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.doctor} - {appointment.specialty}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="mr-1 h-3 w-3" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Terminé
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recherche patient</CardTitle>
            <CardDescription>
              Rechercher un patient dans la base de données
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="Nom, prénom ou ID" />
              <Button
                type="submit"
                size="icon"
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques du jour</CardTitle>
            <CardDescription>28 avril 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                <p className="text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">rendez-vous</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                <p className="text-sm font-medium">En attente</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">patients</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                <p className="text-sm font-medium">En cours</p>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">consultations</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                <p className="text-sm font-medium">Terminés</p>
                <p className="text-2xl font-bold">7</p>
                <p className="text-xs text-muted-foreground">rendez-vous</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/dashboard/reception/new-appointment-admin">
              <Button variant="outline" className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouveau rendez-vous
              </Button>
            </Link>
            <Link href="/dashboard/reception/new-patient">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Nouveau patient
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
