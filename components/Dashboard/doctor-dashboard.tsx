"use client";

import { useState } from "react";
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
import { Calendar, Users, Clock, FileText, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const todayAppointments = [
  {
    id: 1,
    patient: "Kévin Mboumba",
    age: 45,
    reason: "Suivi cardiaque",
    time: "14:30",
    status: "waiting",
  },
  {
    id: 2,
    patient: "Laura Missambo",
    age: 32,
    reason: "Douleurs thoraciques",
    time: "15:00",
    status: "in-progress",
  },
  {
    id: 3,
    patient: "Philippe Moreau",
    age: 58,
    reason: "Contrôle post-opératoire",
    time: "16:15",
    status: "scheduled",
  },
  {
    id: 4,
    patient: "Marc Essono",
    age: 67,
    reason: "Hypertension",
    time: "17:00",
    status: "scheduled",
  },
  {
    id: 5,
    patient: "Thomas Dubois",
    age: 41,
    reason: "Douleurs abdominales",
    time: "11:30",
    status: "completed",
  },
  {
    id: 6,
    patient: "Sophie Martin",
    age: 29,
    reason: "Migraine",
    time: "10:00",
    status: "completed",
  },
];

const recentPatients = [
  {
    id: 1,
    name: "Kévin Mboumba",
    lastVisit: "15 mars 2025",
    condition: "Hypertension",
  },
  {
    id: 2,
    name: "Laura Missambo",
    lastVisit: "28 février 2025",
    condition: "Arythmie",
  },
  {
    id: 3,
    name: "Philippe Moreau",
    lastVisit: "10 février 2025",
    condition: "Post-infarctus",
  },
];

export function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter appointments based on search term and status
  const filteredAppointments = todayAppointments.filter(
    (appointment) =>
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || appointment.status === filterStatus)
  );

  // Count appointments by status
  const waitingCount = todayAppointments.filter(
    (a) => a.status === "waiting"
  ).length;
  const inProgressCount = todayAppointments.filter(
    (a) => a.status === "in-progress"
  ).length;
  const scheduledCount = todayAppointments.filter(
    (a) => a.status === "scheduled"
  ).length;
  const completedCount = todayAppointments.filter(
    (a) => a.status === "completed"
  ).length;
  const totalCount = todayAppointments.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Patients du jour</CardTitle>
              <CardDescription>28 avril 2025</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un patient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-9 w-full sm:w-[200px]"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-9 w-full sm:w-[150px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="waiting">En attente</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="scheduled">Programmé</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/dashboard/doctor/consultations-history">
                <Button variant="outline" size="sm" className="h-9">
                  <Calendar className="mr-2 h-4 w-4" />
                  Historique
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
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
                        {appointment.age} ans - {appointment.reason}
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
                    <Link href={`/dashboard/doctor/patient/${appointment.id}`}>
                      <Button variant="outline" size="sm">
                        Dossier
                      </Button>
                    </Link>
                    {appointment.status === "waiting" && (
                      <Link
                        href={`/dashboard/doctor/consultation/${appointment.id}`}
                      >
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          Commencer
                        </Button>
                      </Link>
                    )}
                    {appointment.status === "in-progress" && (
                      <Link
                        href={`/dashboard/doctor/consultation/${appointment.id}`}
                      >
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          Continuer
                        </Button>
                      </Link>
                    )}
                    {appointment.status === "completed" && (
                      <Link
                        href={`/dashboard/doctor/consultation/${appointment.id}`}
                      >
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Aucun patient trouvé</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Aucun patient ne correspond à votre recherche.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Progression journalière</CardTitle>
            <CardDescription>28 avril 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Consultations</p>
                  <p className="text-sm font-medium">
                    {completedCount}/{totalCount}
                  </p>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">En attente</p>
                  <p className="text-2xl font-bold">{waitingCount}</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">En cours</p>
                  <p className="text-2xl font-bold">{inProgressCount}</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">À venir</p>
                  <p className="text-2xl font-bold">{scheduledCount}</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">Terminés</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patients récents</CardTitle>
            <CardDescription>Derniers patients consultés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-gray-100">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.condition}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {patient.lastVisit}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/doctor/patient/${patient.id}`}>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/doctor/my-patients" className="w-full">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Tous mes patients
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
