"use client";

import type React from "react";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  CalendarIcon,
  Clock,
  Mail,
  MessageSquare,
  Download,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type DoctorInfo = {
  id: string;
  name: string;
  specialty: string;
};

const doctors: Record<string, DoctorInfo> = {
  "dr-ngoua": {
    id: "dr-ngoua",
    name: "Dr. Jean-Baptiste Ngoua",
    specialty: "Cardiologie",
  },
  "dr-mbadinga": {
    id: "dr-mbadinga",
    name: "Dr. Léonie Mbadinga",
    specialty: "Gynécologie",
  },
  "dr-essono": {
    id: "dr-essono",
    name: "Dr. Paul Essono",
    specialty: "Neurologie",
  },
  "dr-owondo": {
    id: "dr-owondo",
    name: "Dr. Sarah Owondo",
    specialty: "Pédiatrie",
  },
  "dr-mboumba": {
    id: "dr-mboumba",
    name: "Dr. Daniel Mboumba",
    specialty: "Chirurgie générale",
  },
  "dr-ndong": {
    id: "dr-ndong",
    name: "Dr. Marie Ndong",
    specialty: "Dermatologie",
  },
  "dr-biyoghe": {
    id: "dr-biyoghe",
    name: "Dr. Marc Biyoghé",
    specialty: "Ophtalmologie",
  },
  "dr-ntutume": {
    id: "dr-ntutume",
    name: "Dr. Laura Ntutume",
    specialty: "Médecine interne",
  },
  "dr-okoue": {
    id: "dr-okoue",
    name: "Dr. Jacques Okué",
    specialty: "Radiologie",
  },
  "dr-missambo": {
    id: "dr-missambo",
    name: "Dr. Amina Missambo",
    specialty: "Infectiologie",
  },
};

// Créneaux horaires disponibles
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

// Fonction pour générer des créneaux disponibles aléatoires
const generateAvailableSlots = (date: Date) => {
  // Simuler des créneaux indisponibles aléatoirement
  return timeSlots.filter(() => Math.random() > 0.3);
};

// Fonction pour générer un numéro de confirmation aléatoire
const generateConfirmationNumber = () => {
  return `HC-${Math.floor(100000 + Math.random() * 900000)}`;
};

export function AppointmentScheduler({ doctorId }: { doctorId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPatient = pathname.startsWith("/dashboard/patient");
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isGuest,] = useState(!isPatient); // Simuler un utilisateur invité
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [contactMethod, setContactMethod] = useState<"email" | "sms">("email");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const doctor = doctors[doctorId] || {
    name: "notre spécialiste",
    specialty: "médecine",
  };

  // Mettre à jour les créneaux disponibles lorsque la date change
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setAvailableSlots(generateAvailableSlots(newDate));
      setSelectedSlot(null);
    }
  };

  const handleConfirm = () => {
    if (date && selectedSlot) {
      setConfirmationNumber(generateConfirmationNumber());
      setIsConfirmed(true);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleNewAppointment = () => {
    router.push("/appointment/new");
  };

  // Générer les données pour le QR code
  const generateQRData = () => {
    const appointmentData = {
      confirmationNumber,
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: date ? format(date, "yyyy-MM-dd") : "",
      time: selectedSlot,
      patientName: contactInfo.fullName || "Invité",
    };
    return JSON.stringify(appointmentData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {isConfirmed ? (
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">
              Rendez-vous confirmé ! 🎉
            </CardTitle>
            <CardDescription>
              Votre rendez-vous a été enregistré avec succès
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {date && format(date, "EEEE d MMMM yyyy", { locale: fr })}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">{selectedSlot}</span>
              </div>
              <div className="font-medium mb-4">
                {doctor.name} - {doctor.specialty}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Numéro de confirmation
              </div>
              <div className="text-xl font-bold mb-6">{confirmationNumber}</div>

              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white rounded-lg">
                  <QRCodeSVG value={generateQRData()} size={180} />
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Télécharger le QR code
              </Button>
            </div>

            {isGuest && !contactSubmitted ? (
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">
                  Recevez votre confirmation 📩
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Votre nom complet</Label>
                    <Input
                      id="fullName"
                      placeholder="Prénom et nom"
                      value={contactInfo.fullName}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <Tabs
                    defaultValue="email"
                    onValueChange={(value) =>
                      setContactMethod(value as "email" | "sms")
                    }
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </TabsTrigger>
                      <TabsTrigger
                        value="sms"
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        SMS
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="email" className="space-y-2 mt-2">
                      <Label htmlFor="email">Votre adresse email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemple@email.com"
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            email: e.target.value,
                          })
                        }
                        required={contactMethod === "email"}
                      />
                    </TabsContent>
                    <TabsContent value="sms" className="space-y-2 mt-2">
                      <Label htmlFor="phone">Votre numéro de téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        value={contactInfo.phone}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            phone: e.target.value,
                          })
                        }
                        required={contactMethod === "sms"}
                      />
                    </TabsContent>
                  </Tabs>

                  <Button type="submit" className="w-full">
                    Envoyer ma confirmation
                  </Button>
                </form>
              </div>
            ) : contactSubmitted ? (
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-medium text-green-800 mb-2">
                  Confirmation envoyée ! ✅
                </h3>
                <p className="text-green-700">
                  {contactMethod === "email"
                    ? `Votre confirmation a été envoyée à ${contactInfo.email}`
                    : `Votre confirmation a été envoyée par SMS au ${contactInfo.phone}`}
                </p>
              </div>
            ) : (
              <p>
                Un email de confirmation a été envoyé à votre adresse email.
                Vous recevrez également un rappel 24h avant votre rendez-vous.
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleNewAppointment}>
              Prendre un autre rendez-vous
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Choisissez une date
              </CardTitle>
              <CardDescription>
                Sélectionnez le jour qui vous convient le mieux
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                locale={fr}
                disabled={{ before: addDays(new Date(), 1) }}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Choisissez un horaire
              </CardTitle>
              <CardDescription>
                {date
                  ? `Créneaux disponibles pour le ${format(
                      date,
                      "d MMMM yyyy",
                      { locale: fr }
                    )}`
                  : "Veuillez d'abord sélectionner une date"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {date ? (
                availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedSlot === slot ? "default" : "outline"}
                        className={`text-center py-6 ${
                          selectedSlot === slot ? "bg-primary" : ""
                        }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Aucun créneau disponible pour cette date. Veuillez
                      sélectionner une autre date.
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Les horaires disponibles s'afficheront ici une fois que vous
                    aurez sélectionné une date.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!date || !selectedSlot}
                onClick={handleConfirm}
              >
                Confirmer le rendez-vous
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
