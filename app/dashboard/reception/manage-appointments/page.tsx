"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  eachDayOfInterval,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  PlusCircle,
  Trash2,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock data for appointments
const appointments = [
  {
    id: 1,
    patient: "Kévin Mboumba",
    doctor: "Dr. Pierre Martin",
    specialty: "Cardiologie",
    date: new Date(2025, 3, 28),
    time: "14:30",
    duration: 30,
    status: "confirmed",
    type: "follow-up",
  },
  {
    id: 2,
    patient: "Laura Missambo",
    doctor: "Dr. Sophie Bernard",
    specialty: "Dermatologie",
    date: new Date(2025, 3, 28),
    time: "15:00",
    duration: 30,
    status: "pending",
    type: "first-visit",
  },
  {
    id: 3,
    patient: "Philippe Moreau",
    doctor: "Dr. Pierre Martin",
    specialty: "Cardiologie",
    date: new Date(2025, 3, 29),
    time: "10:15",
    duration: 45,
    status: "confirmed",
    type: "follow-up",
  },
  {
    id: 4,
    patient: "Marc Essono",
    doctor: "Dr. Jean Dupont",
    specialty: "Médecine générale",
    date: new Date(2025, 3, 30),
    time: "09:00",
    duration: 30,
    status: "confirmed",
    type: "first-visit",
  },
  {
    id: 5,
    patient: "Laurent Dubois",
    doctor: "Dr. Marie Laurent",
    specialty: "Neurologie",
    date: new Date(2025, 4, 2),
    time: "11:30",
    duration: 60,
    status: "pending",
    type: "procedure",
  },
];

// Helper function to get appointments for a specific date
const getAppointmentsForDate = (date: Date, doctor?: string) => {
  return appointments
    .filter(
      (appointment) =>
        appointment.date.toDateString() === date.toDateString() &&
        (!doctor || doctor === "all" || appointment.doctor === doctor)
    )
    .sort((a, b) => {
      const timeA = Number.parseInt(a.time.replace(":", ""));
      const timeB = Number.parseInt(b.time.replace(":", ""));
      return timeA - timeB;
    });
};

// Helper function to get all doctors
const doctors = [...new Set(appointments.map((a) => a.doctor))];

export default function ManageAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [currentWeek, setCurrentWeek] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(
    null
  );

  // Generate days for the week view
  const weekDays = eachDayOfInterval({
    start: currentWeek,
    end: addDays(currentWeek, 6),
  });

  const handlePreviousWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, -1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const handleDeleteAppointment = () => {
    // In a real app, you would delete the appointment from the database
    toast("Rendez-vous annulé", {
      description: "Le rendez-vous a été annulé avec succès.",
    });
    setAppointmentToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des rendez-vous
          </h1>
          <p className="text-muted-foreground">
            Consultez et gérez tous les rendez-vous de la clinique
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/reception/new-patient">
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Nouveau patient
            </Button>
          </Link>
          <Link href="/dashboard/reception/new-appointment-admin">
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau rendez-vous
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
            <CardDescription>Sélectionnez une date</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border justify-center flex"
              modifiers={{
                appointment: appointments.map((a) => a.date),
              }}
              modifiersStyles={{
                appointment: {
                  fontWeight: "bold",
                  backgroundColor: "rgba(20, 184, 166, 0.1)",
                },
              }}
            />

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Filtrer par médecin
                </label>
                <Select
                  value={selectedDoctor}
                  onValueChange={setSelectedDoctor}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un médecin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les médecins</SelectItem>
                    {doctors.map((doctor, index) => (
                      <SelectItem key={index} value={doctor}>
                        {doctor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Légende</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Confirmé</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">En attente</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Annulé</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <Tabs defaultValue="day">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="day">Jour</TabsTrigger>
                  <TabsTrigger value="week">Semaine</TabsTrigger>
                </TabsList>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {format(selectedDate, "d MMMM yyyy", { locale: fr })}
                  </span>
                  <CalendarIcon className="h-4 w-4" />
                </div>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="day">
              <TabsContent value="day" className="space-y-4">
                <div className="rounded-md border">
                  <div className="bg-muted/50 p-3 text-center font-medium">
                    {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                  </div>
                  <div className="divide-y">
                    {getAppointmentsForDate(selectedDate, selectedDoctor)
                      .length > 0 ? (
                      getAppointmentsForDate(selectedDate, selectedDoctor).map(
                        (appointment) => (
                          <div key={appointment.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar>
                                  <AvatarFallback className="bg-teal-100 text-teal-800">
                                    {appointment.patient
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">
                                    {appointment.patient}
                                  </p>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {appointment.time} ({appointment.duration}{" "}
                                    min)
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  className={
                                    appointment.status === "confirmed"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : appointment.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-red-100 text-red-800 hover:bg-red-100"
                                  }
                                >
                                  {appointment.status === "confirmed"
                                    ? "Confirmé"
                                    : appointment.status === "pending"
                                    ? "En attente"
                                    : "Annulé"}
                                </Badge>
                                <Badge variant="outline">
                                  {appointment.type === "first-visit"
                                    ? "1ère visite"
                                    : appointment.type === "follow-up"
                                    ? "Suivi"
                                    : appointment.type}
                                </Badge>
                                <div className="flex">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-600"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          Annuler le rendez-vous
                                        </DialogTitle>
                                        <DialogDescription>
                                          Êtes-vous sûr de vouloir annuler ce
                                          rendez-vous ? Cette action ne peut pas
                                          être annulée.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter>
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            setAppointmentToDelete(null)
                                          }
                                        >
                                          Annuler
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          onClick={handleDeleteAppointment}
                                        >
                                          Confirmer
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              <span className="font-medium">
                                {appointment.doctor}
                              </span>{" "}
                              • {appointment.specialty}
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">
                          Aucun rendez-vous pour cette date.
                        </p>
                        <Link href="/dashboard/reception/new-appointment-admin">
                          <Button variant="link" className="mt-2">
                            Créer un rendez-vous
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="week">
                <div className="rounded-md border">
                  <div className="flex items-center justify-between bg-muted/50 p-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePreviousWeek}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">
                      {format(currentWeek, "d MMM", { locale: fr })} -{" "}
                      {format(addDays(currentWeek, 6), "d MMM yyyy", {
                        locale: fr,
                      })}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextWeek}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 divide-x">
                    {weekDays.map((day, i) => (
                      <div key={i} className="min-h-[200px]">
                        <div
                          className={cn(
                            "p-2 text-center text-sm font-medium",
                            day.toDateString() === new Date().toDateString() &&
                              "bg-teal-50"
                          )}
                        >
                          <div>{format(day, "EEE", { locale: fr })}</div>
                          <div>{format(day, "d", { locale: fr })}</div>
                        </div>
                        <div className="p-1">
                          {getAppointmentsForDate(day, selectedDoctor).map(
                            (appointment) => (
                              <div
                                key={appointment.id}
                                className={cn(
                                  "mb-1 rounded p-1 text-xs",
                                  appointment.status === "confirmed"
                                    ? "bg-green-100"
                                    : "bg-yellow-100"
                                )}
                              >
                                <div className="font-medium truncate">
                                  {appointment.time} {appointment.patient}
                                </div>
                                <div className="truncate text-[10px]">
                                  {appointment.doctor}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
