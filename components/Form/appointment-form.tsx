"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { ChatBubble } from "@/components/chat-bubble";

import { CheckCircle2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { SpecialtyCard } from "@/components/specialty-card";
import { toast } from "sonner";
import DoctorsSelection from "../doctor-selection";
import { DoctorProps } from "../doctor-select-card";
import AppointmentBooking from "../AppointmentBooking";
import AppointmentType from "../AppointmentType";
import Link from "next/link";
import { SpecialtyList } from "../specialty-list";

// Données fictives
const specialties = [
  { id: 1, name: "Cardiologie", icon: "Heart" },
  { id: 2, name: "Dermatologie", icon: "Scan" },
  { id: 3, name: "Neurologie", icon: "Brain" },
  { id: 4, name: "Ophtalmologie", icon: "Eye" },
  { id: 5, name: "Pédiatrie", icon: "Baby" },
];

type Step =
  | "specialty"
  | "doctor"
  | "chatbot-followed"
  | "chatbot-referral"
  | "chatbot-self"
  | "date"
  | "appointment-type"
  | "confirmation"
  | "success";

export default function AppointmentForm({ isPatien }: { isPatien?: boolean }) {
  const [step, setStep] = useState<Step>("specialty");
  const [specialty, setSpecialty] = useState<string>("");
  const [doctor, setDoctor] = useState<Omit<DoctorProps, "onSelect">>({
    id: "",
    availability: "available",
    name: "",
    specialty: "",
    nextAvailableSlot: "",
    photoUrl: "",
  });
  const [date, setDate] = useState<Date>();
  const [patientName, SetPatientName] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [appointmentType, setAppointmentType] =
    useState<string>("consultation");
  const [chatHistory, setChatHistory] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);

  const handleSpecialtySelect = (value: string) => {
    setSpecialty(specialties[parseInt(value) - 1].name);
    console.log(specialties[parseInt(value) - 1].name);
    setStep("doctor");
  };

  const handleDoctorSelect = (value: Omit<DoctorProps, "onSelect">) => {
    setDoctor(value);
    // Commencer le chatbot
    setChatHistory([
      { text: "Êtes-vous suivi par un spécialiste ?", isUser: false },
    ]);
    setStep("chatbot-followed");
  };

  const handleChatResponse = (response: "oui" | "non") => {
    const newHistory = [...chatHistory, { text: response, isUser: true }];

    if (step === "chatbot-followed") {
      if (response === "oui") {
        // Si déjà suivi, passer à la sélection de date
        newHistory.push({
          text: "Parfait ! Vous pouvez maintenant choisir une date pour votre rendez-vous.",
          isUser: false,
        });
        setChatHistory(newHistory);
        setStep("date");
      } else {
        // Si pas suivi, demander s'il a été orienté
        newHistory.push({
          text: "Avez-vous été orienté par un médecin généraliste ?",
          isUser: false,
        });
        setChatHistory(newHistory);
        setStep("chatbot-referral");
      }
    } else if (step === "chatbot-referral") {
      if (response === "oui") {
        // Si orienté, passer à la sélection de date
        newHistory.push({
          text: "Parfait ! Vous pouvez maintenant choisir une date pour votre rendez-vous.",
          isUser: false,
        });
        setChatHistory(newHistory);
        setStep("date");
      } else {
        // Si pas orienté, demander s'il vient de lui-même
        newHistory.push({
          text: "Venez-vous de vous-même ?",
          isUser: false,
        });
        setChatHistory(newHistory);
        setStep("chatbot-self");
      }
    } else if (step === "chatbot-self") {
      if (response === "oui") {
        // Si vient de lui-même, proposer un généraliste
        newHistory.push({
          text: "Nous vous recommandons de consulter d'abord un médecin généraliste. Nous proposons des consultations 24/24.",
          isUser: false,
        });
        newHistory.push({
          text: "Souhaitez-vous prendre rendez-vous avec un généraliste ?",
          isUser: false,
        });
        setChatHistory(newHistory);
        // On reste sur le même step pour gérer la réponse suivante
      } else {
        // Cas improbable, mais on gère quand même
        newHistory.push({
          text: "Nous vous recommandons de consulter d'abord un médecin généraliste.",
          isUser: false,
        });
        setChatHistory(newHistory);
        setStep("date");
      }
    }
  };
  const handleDateSelect = (selectedDate: Date, selectedTime: string) => {
    setDate(selectedDate);
    setTime(selectedTime);
    setStep("appointment-type"); // Passer à l'étape suivante
  };

  const handleAppointmentTypeSelect = (value: string) => {
    setAppointmentType(value);
    setStep("confirmation");
  };

  const handleConfirmation = () => {
    setStep("success");
    toast("Rendez-vous confirmé !", {
      description: `Votre rendez-vous avec ${doctor.name} le ${
        date && format(date, "dd MMMM yyyy", { locale: fr })
      } à ${time} a été enregistré.`,
    });
  };

  const goBack = () => {
    switch (step) {
      case "doctor":
        setStep("specialty");
        break;
      case "chatbot-followed":
        setStep("doctor");
        setChatHistory([]);
        break;
      case "chatbot-referral":
      case "chatbot-self":
        setStep("chatbot-followed");
        setChatHistory([
          { text: "Êtes-vous suivi par un spécialiste ?", isUser: false },
        ]);
        break;
      case "date":
        setStep("doctor");
        setChatHistory([]);
        break;
      case "appointment-type":
        setStep("date");
        break;
      case "confirmation":
        setStep("appointment-type");
        break;
      default:
        break;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "specialty":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-center text-xl font-bold">
                Choisissez une spécialité
              </Label>
              <SpecialtyList />
            </div>
          </div>
        );

      case "doctor":
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">
                Choisissez votre médecin 👨‍⚕️👩‍⚕️
              </h1>
            </div>
            <DoctorsSelection
              onDoctorSelect={handleDoctorSelect}
              speciality={specialty}
            />
          </div>
        );

      case "chatbot-followed":
      case "chatbot-referral":
      case "chatbot-self":
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-medium">Quelques questions</h3>
            </div>
            <div className="space-y-4">
              {chatHistory.map((message, index) => (
                <ChatBubble
                  key={index}
                  message={message.text}
                  isUser={message.isUser}
                />
              ))}
            </div>
            <div className="flex gap-2 justify-center mt-4">
              <Button
                onClick={() => handleChatResponse("oui")}
                variant="outline"
                className="w-24"
              >
                Oui
              </Button>
              <Button
                onClick={() => handleChatResponse("non")}
                variant="outline"
                className="w-24"
              >
                Non
              </Button>
            </div>
          </div>
        );

      case "date":
        return (
          <div className="space-y-4 pb-4">
            <div className="flex flex-col gap-0">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goBack}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-xl font-bold">Prendre un rendez-vous 📅</h1>
              </div>
              <p className="text-muted-foreground text-sm">
                {doctor.name} - Sélectionnez une date et un horaire disponible
              </p>
            </div>
            <AppointmentBooking
              doctor={doctor}
              onBack={goBack}
              onConfirm={handleDateSelect}
            />
          </div>
        );

      case "appointment-type":
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-medium">Type de rendez-vous</h3>
            </div>
            <AppointmentType onTypeSelect={handleAppointmentTypeSelect} />
          </div>
        );

      case "confirmation":
        return (
          <div className="space-y-6 pb-20">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-medium">
                Confirmez votre rendez-vous
              </h3>
            </div>

            {/* Formulaire nom du patient */}
            {!isPatien && (
              <div className="space-y-3">
                <Label htmlFor="patientName">Nom complet du patient</Label>
                <input
                  id="patientName"
                  type="text"
                  onChange={(e) => SetPatientName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Prénom Nom"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Veuillez entrer le nom de la personne qui consultera.
                </p>
              </div>
            )}

            {/* Ticket de rendez-vous */}
            <div className="border-2 border-primary rounded-lg overflow-hidden shadow-lg">
              <div className="bg-primary p-4 text-white">
                <h4 className="font-bold text-lg">Votre rendez-vous</h4>
                <p className="text-sm opacity-90">
                  N°RDV-
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-600">Spécialité:</span>
                  <span>
                    {
                      specialties.find((s) => s.id.toString() === specialty)
                        ?.name
                    }
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-600">Médecin:</span>
                  <span>{doctor.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-600">Date:</span>
                  <span>
                    {date && format(date, "dd MMMM yyyy", { locale: fr })}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-600">Heure:</span>
                  <span>{time}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-600">Type:</span>
                  <span>
                    {appointmentType === "consultation"
                      ? "Consultation"
                      : "Présentation de résultats"}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleConfirmation}
              className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
              disabled={patientName === "" && !isPatien ? true : false}
            >
              Confirmer le rendez-vous
            </Button>
          </div>
        );

      case "success":
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-green-700">
              Rendez-vous confirmé !
            </h3>
            <p className="text-gray-600">
              Votre rendez-vous avec {doctor.name} le{" "}
              {date && format(date, "dd MMMM yyyy", { locale: fr })} à {time} a
              été enregistré.
            </p>
            <div className="flex flex-row justify-center items-center gap-4">
              <Button
                onClick={() => {
                  setStep("specialty");
                  setSpecialty("");
                  setDoctor(doctor);
                  setDate(undefined);
                  setTime("");
                  setAppointmentType("consultation");
                  setChatHistory([]);
                }}
                variant="outline"
              >
                Prendre un autre rendez-vous
              </Button>
              <Link href="/">
                <Button>Revenir au menu</Button>
              </Link>
            </div>
          </div>
        );
    }
  };

  return <div className="space-y-6">{renderStepContent()}</div>;
}
