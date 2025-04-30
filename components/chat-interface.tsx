"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Home, ArrowRight } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  options?: Array<{
    label: string;
    value: string;
    action: () => void;
  }>;
};

type DoctorInfo = {
  id: string;
  name: string;
  specialty: string;
};

const doctors: Record<string, DoctorInfo> = {
  "dr-martin": {
    id: "dr-martin",
    name: "Dr. Sophie Martin",
    specialty: "Cardiologie",
  },
  "dr-dubois": {
    id: "dr-dubois",
    name: "Dr. Thomas Dubois",
    specialty: "Cardiologie",
  },
  "dr-petit": {
    id: "dr-petit",
    name: "Dr. Marie Petit",
    specialty: "Neurologie",
  },
  "dr-bernard": {
    id: "dr-bernard",
    name: "Dr. Philippe Bernard",
    specialty: "Neurologie",
  },
  "dr-moreau": {
    id: "dr-moreau",
    name: "Dr. Claire Moreau",
    specialty: "Orthopédie",
  },
  "dr-leroy": {
    id: "dr-leroy",
    name: "Dr. Jean Leroy",
    specialty: "Orthopédie",
  },
  "dr-simon": {
    id: "dr-simon",
    name: "Dr. Émilie Simon",
    specialty: "Ophtalmologie",
  },
  "dr-laurent": {
    id: "dr-laurent",
    name: "Dr. Michel Laurent",
    specialty: "ORL",
  },
  "dr-rousseau": {
    id: "dr-rousseau",
    name: "Dr. Anne Rousseau",
    specialty: "Médecine générale",
  },
  "dr-girard": {
    id: "dr-girard",
    name: "Dr. François Girard",
    specialty: "Pédiatrie",
  },
  "dr-blanc": {
    id: "dr-blanc",
    name: "Dr. Isabelle Blanc",
    specialty: "Dermatologie",
  },
  "dr-mercier": {
    id: "dr-mercier",
    name: "Dr. Paul Mercier",
    specialty: "Chirurgie",
  },
};

export function ChatInterface({ doctorId }: { doctorId: string }) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [messagesEndRef, setMessagesEndRef] = useState<HTMLDivElement | null>(
    null
  );

  const doctor = doctors[doctorId] || {
    name: "notre spécialiste",
    specialty: "médecine",
  };

  // Fonction pour rediriger vers la page de choix de créneau
  const redirectToAppointment = () => {
    router.push(`appointment?doctor=${doctorId}`);
  };

  // Fonction pour rediriger vers l'accueil
  const redirectToHome = () => {
    router.push("/");
  };

  // Fonction pour continuer malgré la recommandation
  const continueAnyway = () => {
    redirectToAppointment();
  };

  // Fonction pour ajouter un message utilisateur
  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  // Fonction pour passer à la question suivante
  const goToNextQuestion = (userResponse: string) => {
    // Ajouter la réponse de l'utilisateur
    addUserMessage(userResponse);

    // Attendre un peu pour simuler un délai de réponse
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 500);
  };

  // Effet pour afficher la question initiale
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      content: `Bonjour ! 👋 Je suis votre assistant virtuel. Je vais vous poser quelques questions pour préparer votre rendez-vous avec ${doctor.name} en ${doctor.specialty}.`,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);

    // Afficher la première question après un court délai
    setTimeout(() => {
      const firstQuestion: Message = {
        id: "question-1",
        content: "Êtes-vous déjà suivi par un spécialiste ? 🩺",
        sender: "bot",
        timestamp: new Date(),
        options: [
          {
            label: "Oui",
            value: "Oui",
            action: () => {
              goToNextQuestion("Oui");
              redirectToAppointment();
            },
          },
          {
            label: "Non",
            value: "Non",
            action: () => goToNextQuestion("Non"),
          },
        ],
      };
      setMessages((prev) => [...prev, firstQuestion]);
    }, 1000);
  }, [doctor.name, doctor.specialty]);

  // Effet pour afficher les questions suivantes en fonction de l'étape actuelle
  useEffect(() => {
    if (currentStep === 1) {
      // Deuxième question
      const secondQuestion: Message = {
        id: "question-2",
        content: "Avez-vous été orienté par un médecin généraliste ? 📋",
        sender: "bot",
        timestamp: new Date(),
        options: [
          {
            label: "Oui",
            value: "Oui",
            action: () => {
              goToNextQuestion("Oui");
              redirectToAppointment();
            },
          },
          {
            label: "Non",
            value: "Non",
            action: () => goToNextQuestion("Non"),
          },
        ],
      };
      setMessages((prev) => [...prev, secondQuestion]);
    } else if (currentStep === 2) {
      // Troisième question
      const thirdQuestion: Message = {
        id: "question-3",
        content: "Venez-vous de vous-même ? 🤔",
        sender: "bot",
        timestamp: new Date(),
        options: [
          {
            label: "Oui",
            value: "Oui",
            action: () => {
              goToNextQuestion("Oui");
              redirectToAppointment();
            },
          },
          {
            label: "Non",
            value: "Non",
            action: () => goToNextQuestion("Non"),
          },
        ],
      };
      setMessages((prev) => [...prev, thirdQuestion]);
    } else if (currentStep === 3) {
      // Recommandation finale
      const recommendation: Message = {
        id: "recommendation",
        content:
          "Nous vous recommandons de consulter d'abord un médecin généraliste. Nous proposons des consultations 24/24. ⏰",
        sender: "bot",
        timestamp: new Date(),
        options: [
          {
            label: "Retour à l'accueil",
            value: "home",
            action: redirectToHome,
          },
          {
            label: "Continuer quand même",
            value: "continue",
            action: continueAnyway,
          },
        ],
      };
      setMessages((prev) => [...prev, recommendation]);
    }
  }, [currentStep]);

  // Effet pour scroller vers le bas quand les messages changent
  useEffect(() => {
    messagesEndRef?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className=" flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Assistant Virtuel
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-[calc(600px-8rem)] px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-primary flex items-center justify-center text-white">
                      {message.sender === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}

                      {message.options && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {message.options.map((option) => (
                            <Button
                              key={option.value}
                              variant={
                                option.value === "home" ? "outline" : "default"
                              }
                              size="sm"
                              onClick={option.action}
                              className={
                                option.value === "home"
                                  ? "gap-2"
                                  : option.value === "continue"
                                  ? "gap-2"
                                  : ""
                              }
                            >
                              {option.value === "home" && (
                                <Home className="h-4 w-4" />
                              )}
                              {option.value === "continue" && (
                                <ArrowRight className="h-4 w-4" />
                              )}
                              {option.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={setMessagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4 justify-center">
          <p className="text-sm text-muted-foreground">
            Veuillez répondre aux questions ci-dessus pour continuer
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
