"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

// Mock data for patients
const patients = [
  { id: 1, name: "Kévin Mboumba", dob: "12/05/1975", phone: "06 12 34 56 78" },
  { id: 2, name: "Laura Missambo", dob: "23/09/1982", phone: "06 23 45 67 89" },
  {
    id: 3,
    name: "Philippe Moreau",
    dob: "05/11/1968",
    phone: "06 34 56 78 90",
  },
  { id: 4, name: "Marc Essono", dob: "17/03/1990", phone: "06 45 67 89 01" },
  { id: 5, name: "Laurent Dubois", dob: "30/07/1965", phone: "06 56 78 90 12" },
];

export default function NewAppointmentAdminPage() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const pathname = usePathname();
  const patientID = pathname.split(
    "/dashboard/reception/new-appointment-admin/"
  )[1];
  const [selectedPatient, setSelectedPatient] = useState<
    (typeof patients)[0] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSelectedPatient(patients[parseInt(patientID) - 1]);
  }, [patientID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPatient || !date || !time) {
      toast.error("Formulaire incomplet", {
        description: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }

    setLoading(true);

    try {
      // Simuler un délai d'enregistrement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Rendez-vous créé", {
        description: `Rendez-vous pour ${selectedPatient.name} le ${format(
          date,
          "PPP",
          { locale: fr }
        )} à ${time} créé avec succès.`,
      });

      router.back();
    } catch (error) {
      toast.error("Erreur", {
        description:
          "Une erreur est survenue lors de la création du rendez-vous.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Nouveau rendez-vous
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informations du rendez-vous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Patient</Label>
              {selectedPatient && (
                <div className="mt-2 text-sm">
                  <span className="font-bold text-xl">
                    {selectedPatient.name}
                  </span>
                  <p className="text-muted-foreground">
                    Date de naissance: {selectedPatient.dob} • Téléphone:{" "}
                    {selectedPatient.phone}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Médecin</Label>
              <Select>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Sélectionnez un médecin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-martin">
                    Dr. Pierre Martin (Cardiologie)
                  </SelectItem>
                  <SelectItem value="dr-bernard">
                    Dr. Sophie Bernard (Dermatologie)
                  </SelectItem>
                  <SelectItem value="dr-dupont">
                    Dr. Jean Dupont (Médecine générale)
                  </SelectItem>
                  <SelectItem value="dr-laurent">
                    Dr. Marie Laurent (Neurologie)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date et heure</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date
                        ? format(date, "PPP", { locale: fr })
                        : "Sélectionnez une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>

                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une heure">
                      {time ? (
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </div>
                      ) : (
                        "Sélectionnez une heure"
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="09:30">09:30</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="10:30">10:30</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="11:30">11:30</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="14:30">14:30</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="15:30">15:30</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="16:30">16:30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type de consultation</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-visit">Première visite</SelectItem>
                  <SelectItem value="follow-up">Suivi</SelectItem>
                  <SelectItem value="emergency">Urgence</SelectItem>
                  <SelectItem value="procedure">Procédure médicale</SelectItem>
                  <SelectItem value="test">Test/Examen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Durée estimée</Label>
              <Select defaultValue="30">
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Sélectionnez une durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700"
              disabled={loading}
            >
              {loading ? "Création en cours..." : "Créer le rendez-vous"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
