"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, FileText, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  {
    id: 3,
    doctor: "Dr. Marc Biyoghé",
    specialty: "Médecine générale",
    date: "2 juin 2025",
    time: "09:15",
    status: "confirmed",
  },
];

const pastAppointments = [
  {
    id: 4,
    doctor: "Dr. Jean-Baptiste Ngoua",
    specialty: "Cardiologie",
    date: "15 mars 2025",
    time: "11:00",
    status: "completed",
    notes:
      "Contrôle de routine. Tension artérielle normale. Prochain rendez-vous dans 6 mois.",
  },
  {
    id: 5,
    doctor: "Dr. Marc Biyoghé",
    specialty: "Ophtalmologie",
    date: "28 février 2025",
    time: "16:30",
    status: "completed",
    notes: "Examen de la vue. Prescription de nouvelles lunettes.",
  },
  {
    id: 6,
    doctor: "Dr. Marc Biyoghé",
    specialty: "Médecine générale",
    date: "10 janvier 2025",
    time: "09:30",
    status: "cancelled",
    notes: "Annulé par le patient.",
  },
];

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");

  // Filter appointments based on search term and specialty
  const filteredUpcoming = upcomingAppointments.filter(
    (appointment) =>
      (appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.specialty
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (filterSpecialty === "" || appointment.specialty === filterSpecialty)
  );

  const filteredPast = pastAppointments.filter(
    (appointment) =>
      (appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.specialty
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (filterSpecialty === "" || appointment.specialty === filterSpecialty)
  );

  // Get unique specialties for filter
  const specialties = [
    ...new Set(
      [...upcomingAppointments, ...pastAppointments].map((a) => a.specialty)
    ),
  ];

  return (
    <div className="flex flex-col gap-4 px-10">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Mes rendez-vous</h1>
        <p className="text-muted-foreground">
          Consultez et gérez tous vos rendez-vous médicaux
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Rechercher
          </Label>
          <Input
            id="search"
            placeholder="Rechercher par médecin ou spécialité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par spécialité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les spécialités</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Link href="/dashboard/patient/new">
          <Button className="w-full md:w-auto bg-teal-600 hover:bg-teal-700">
            Nouveau rendez-vous
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 my-4">
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="past">Passés</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {filteredUpcoming.length > 0 ? (
            <div className="space-y-4">
              {filteredUpcoming.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border">
                          <AvatarFallback className="bg-teal-100 text-teal-800">
                            {appointment.doctor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {appointment.doctor}
                          </h3>
                          <p className="text-muted-foreground">
                            {appointment.specialty}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-1 h-4 w-4 text-teal-600" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-teal-600" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
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
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">
                  Aucun rendez-vous à venir
                </h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Vous n'avez pas de rendez-vous programmés pour le moment.
                </p>
                <Link href="/dashboard/new">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    Prendre un rendez-vous
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past">
          {filteredPast.length > 0 ? (
            <div className="space-y-4">
              {filteredPast.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border">
                          <AvatarFallback className="bg-gray-100">
                            {appointment.doctor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {appointment.doctor}
                          </h3>
                          <p className="text-muted-foreground">
                            {appointment.specialty}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-gray-500" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>

                          {appointment.notes && (
                            <div className="flex items-start mt-3 text-sm p-2 bg-gray-50 rounded-md">
                              <FileText className="mr-1 h-4 w-4 text-gray-500 shrink-0 mt-0.5" />
                              <span>{appointment.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          className={
                            appointment.status === "completed"
                              ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {appointment.status === "completed"
                            ? "Terminé"
                            : "Annulé"}
                        </Badge>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-1 h-4 w-4" />
                            Compte-rendu
                          </Button>
                          <Button variant="outline" size="sm">
                            Reprendre RDV
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Aucun rendez-vous passé</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Votre historique de rendez-vous est vide.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
