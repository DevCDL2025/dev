"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Pill, Stethoscope, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

// Mock data
const consultations = [
  {
    id: 1,
    date: "15 mars 2025",
    doctor: "Dr. Jean-Baptiste Ngoua",
    specialty: "Cardiologie",
    reason: "Suivi cardiaque",
    diagnosis: "Hypertension légère",
    notes:
      "Tension artérielle légèrement élevée. Recommandation d'exercice régulier et de réduction de sel.",
    prescriptions: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        instructions: "1 comprimé par jour",
      },
    ],
  },
  {
    id: 2,
    date: "28 février 2025",
    doctor: "Dr. Paul Essono",
    specialty: "Ophtalmologie",
    reason: "Examen de la vue",
    diagnosis: "Myopie légère",
    notes:
      "Vision correcte avec lunettes actuelles. Légère progression de la myopie.",
    prescriptions: [
      {
        name: "Nouvelles lunettes",
        dosage: "",
        instructions: "Prescription pour nouvelles lunettes",
      },
    ],
  },
  {
    id: 3,
    date: "10 janvier 2025",
    doctor: "Dr. Marc Biyoghé",
    specialty: "Médecine générale",
    reason: "Rhume et toux",
    diagnosis: "Infection virale des voies respiratoires supérieures",
    notes:
      "Symptômes typiques d'un rhume. Repos recommandé et hydratation abondante.",
    prescriptions: [
      {
        name: "Paracétamol",
        dosage: "500mg",
        instructions: "1-2 comprimés toutes les 6 heures si nécessaire",
      },
      {
        name: "Sirop pour la toux",
        dosage: "15ml",
        instructions: "3 fois par jour pendant 5 jours",
      },
    ],
  },
];

const tests = [
  {
    id: 1,
    name: "Électrocardiogramme (ECG)",
    date: "15 mars 2025",
    provider: "Dr. Jean-Baptiste Ngoua",
    location: "Centre Médical Saint-Michel",
    results: "Normal",
    notes: "Rythme cardiaque régulier, pas d'anomalies détectées",
  },
  {
    id: 2,
    name: "Analyse de sang complète",
    date: "15 mars 2025",
    provider: "Laboratoire Central",
    location: "Laboratoire Central",
    results: "Voir rapport détaillé",
    notes: "Cholestérol légèrement élevé, autres valeurs dans les normes",
  },
  {
    id: 3,
    name: "Radiographie pulmonaire",
    date: "10 janvier 2025",
    provider: "Dr. Marc Biyoghé",
    location: "Centre d'Imagerie Médicale",
    results: "Normal",
    notes: "Pas d'anomalies détectées",
  },
];

export default function MedicalHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const router = useRouter();

  // Filter consultations based on search term and specialty
  const filteredConsultations = consultations.filter(
    (consultation) =>
      (consultation.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.specialty
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        consultation.diagnosis
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (filterSpecialty === "" || consultation.specialty === filterSpecialty)
  );

  // Get unique specialties for filter
  const specialties = [...new Set(consultations.map((c) => c.specialty))];

  return (
    <div className="px-10 w-full flex flex-col gap-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Historique médical
        </h1>
        <p className="text-muted-foreground">
          Consultez votre historique médical complet
        </p>
      </div>

      <div className="flex flex-col w-full md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par médecin, spécialité ou diagnostic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="">
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
      </div>

      <Tabs defaultValue="consultations" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="tests">Tests & Examens</TabsTrigger>
        </TabsList>

        <TabsContent value="consultations">
          <div className="space-y-4">
            {filteredConsultations.length > 0 ? (
              filteredConsultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row justify-between gap-2">
                      <div>
                        <CardTitle>{consultation.reason}</CardTitle>
                        <CardDescription>
                          {consultation.date} - {consultation.doctor} (
                          {consultation.specialty})
                        </CardDescription>
                      </div>
                      <Badge className="w-fit bg-teal-100 text-teal-800 hover:bg-teal-100">
                        {consultation.diagnosis}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">
                          {consultation.notes}
                        </p>
                      </div>

                      {consultation.prescriptions.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Prescriptions
                          </h4>
                          <ul className="space-y-2">
                            {consultation.prescriptions.map(
                              (prescription, index) => (
                                <li key={index} className="flex items-start">
                                  <Pill className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                                  <div>
                                    <span className="font-medium">
                                      {prescription.name}
                                    </span>
                                    {prescription.dosage && (
                                      <span className="text-muted-foreground">
                                        {" "}
                                        ({prescription.dosage})
                                      </span>
                                    )}
                                    {prescription.instructions && (
                                      <p className="text-sm text-muted-foreground">
                                        {prescription.instructions}
                                      </p>
                                    )}
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Stethoscope className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">
                    Aucune consultation trouvée
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aucune consultation ne correspond à votre recherche.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tests">
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Tests et examens</CardTitle>
              <CardDescription>
                Historique de vos tests et examens médicaux
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {tests.map((test) => (
                  <AccordionItem key={test.id} value={`test-${test.id}`}>
                    <AccordionTrigger>
                      <div className="flex flex-col items-start text-left">
                        <div className="font-medium">{test.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {test.date}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm font-medium">Prestataire</p>
                            <p className="text-sm text-muted-foreground">
                              {test.provider}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Lieu</p>
                            <p className="text-sm text-muted-foreground">
                              {test.location}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Résultats</p>
                          <p className="text-sm text-muted-foreground">
                            {test.results}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Notes</p>
                          <p className="text-sm text-muted-foreground">
                            {test.notes}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            router.push(
                              `/dashboard/patient/medical-reports/${test.id}`
                            );
                          }}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Voir le rapport complet
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
