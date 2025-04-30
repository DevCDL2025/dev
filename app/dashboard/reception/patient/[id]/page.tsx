"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  FileText,
  Pill,
  User,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Activity,
  Download,
  Printer,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

// Mock data for a patient
const patientData = {
  id: "1",
  name: "Daniel Mboumba",
  age: 52,
  gender: "Homme",
  birthDate: "22/08/1972",
  phone: "06 34 56 78 90",
  email: "daniel.mboumba@example.com",
  address: "Avenue du Colonel Parant, Libreville, Gabon",
  insuranceProvider: "CNAMGS",
  insuranceNumber: "7 89 01 23 456 78 90",
  bloodType: "A+",
  allergies: [
    {
      name: "Pénicilline",
      severity: "Sévère",
      reaction: "Urticaire, gonflement du visage",
    },
    {
      name: "Arachides",
      severity: "Modérée",
      reaction: "Éruption cutanée, démangeaisons",
    },
  ],
  chronicConditions: ["Hypertension"],
  currentMedications: [
    { name: "Lisinopril", dosage: "10mg", instructions: "1 comprimé par jour" },
  ],
  emergencyContact: {
    name: "Marie Dupont",
    relation: "Épouse",
    phone: "06 98 76 54 32",
  },
};

// Mock data for consultations
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
    status: "completed",
  },
  {
    id: 2,
    date: "15 décembre 2024",
    doctor: "Dr. Jean-Baptiste Ngoua",
    specialty: "Cardiologie",
    reason: "Douleurs thoraciques",
    diagnosis: "Anxiété",
    notes:
      "Douleurs thoraciques liées à l'anxiété. ECG normal. Recommandation de techniques de relaxation.",
    prescriptions: [],
    status: "completed",
  },
  {
    id: 3,
    date: "10 septembre 2024",
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
    status: "completed",
  },
];

// Mock data for prescriptions
const prescriptions = [
  {
    id: 1,
    name: "Ordonnance - Cardiologie",
    doctor: "Dr. Jean-Baptiste Ngoua",
    specialty: "Cardiologie",
    date: "15 mars 2025",
    expiryDate: "15 juin 2025",
    status: "active",
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        instructions: "1 comprimé par jour",
      },
    ],
    notes: "Renouvellement possible 2 fois",
  },
  {
    id: 2,
    name: "Ordonnance - Médecine générale",
    doctor: "Dr. Marc Biyoghé",
    specialty: "Médecine générale",
    date: "10 septembre 2024",
    expiryDate: "10 octobre 2024",
    status: "expired",
    medications: [
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
    notes:
      "Traitement pour infection virale des voies respiratoires supérieures",
  },
];

// Mock data for test results
const testResults = [
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
    date: "10 septembre 2024",
    provider: "Dr. Marc Biyoghé",
    location: "Centre d'Imagerie Médicale",
    results: "Normal",
    notes: "Pas d'anomalies détectées",
  },
];

// Mock data for vaccinations
const vaccinations = [
  {
    id: 1,
    name: "Grippe saisonnière",
    date: "15 octobre 2024",
    provider: "Dr. Marc Biyoghé",
    location: "Cabinet Médical Central",
    nextDue: "Octobre 2025",
  },
  {
    id: 2,
    name: "Tétanos-Diphtérie-Poliomyélite",
    date: "20 mai 2020",
    provider: "Dr. Marc Biyoghé",
    location: "Cabinet Médical Central",
    nextDue: "Mai 2030",
  },
  {
    id: 3,
    name: "COVID-19 (Rappel)",
    date: "5 janvier 2024",
    provider: "Centre de vaccination municipal",
    location: "Hôpital Saint-Joseph",
    nextDue: "À déterminer",
  },
];

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dossier patient</h1>
          <p className="text-muted-foreground">
            Informations complètes du patient
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Retour
          </Button>
          <Link href={`/dashboard/consultation/new?patient=${params.id}`}>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Nouvelle consultation
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Patient information sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl bg-teal-100 text-teal-800">
                    {patientData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{patientData.name}</h2>
                <p className="text-muted-foreground">
                  {patientData.age} ans - {patientData.gender}
                </p>
                <div className="flex items-center justify-center mt-2">
                  <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                    Actif
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Date de naissance</p>
                    <p className="text-sm text-muted-foreground">
                      {patientData.birthDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-sm text-muted-foreground">
                      {patientData.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {patientData.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">
                      {patientData.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Contact d'urgence</p>
                    <p className="text-sm text-muted-foreground">
                      {patientData.emergencyContact.name} (
                      {patientData.emergencyContact.relation})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {patientData.emergencyContact.phone}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Informations médicales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Groupe sanguin</p>
                <p className="text-sm text-muted-foreground">
                  {patientData.bloodType}
                </p>
              </div>

              <div>
                <p className="font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  Allergies
                </p>
                {patientData.allergies.length > 0 ? (
                  <ul className="mt-1 space-y-1">
                    {patientData.allergies.map((allergy, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{allergy.name}</span> -{" "}
                        <span
                          className={
                            allergy.severity === "Sévère"
                              ? "text-red-600"
                              : allergy.severity === "Modérée"
                              ? "text-amber-600"
                              : "text-blue-600"
                          }
                        >
                          {allergy.severity}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {allergy.reaction}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucune allergie connue
                  </p>
                )}
              </div>

              <div>
                <p className="font-medium flex items-center">
                  <Activity className="h-4 w-4 text-teal-600 mr-1" />
                  Maladies chroniques
                </p>
                {patientData.chronicConditions.length > 0 ? (
                  <ul className="mt-1">
                    {patientData.chronicConditions.map((condition, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {condition}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucune maladie chronique
                  </p>
                )}
              </div>

              <div>
                <p className="font-medium flex items-center">
                  <Pill className="h-4 w-4 text-teal-600 mr-1" />
                  Médicaments actuels
                </p>
                {patientData.currentMedications.length > 0 ? (
                  <ul className="mt-1 space-y-1">
                    {patientData.currentMedications.map((medication, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">
                          {medication.name} {medication.dosage}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {medication.instructions}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucun médicament actuel
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
              <TabsTrigger value="prescriptions">Ordonnances</TabsTrigger>
              <TabsTrigger value="tests">Tests & Examens</TabsTrigger>
              <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dernière consultation</CardTitle>
                    <CardDescription>
                      Informations sur la dernière visite
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {consultations.length > 0 ? (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-medium">
                              {consultations[0].date}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {consultations[0].reason}
                            </p>
                          </div>
                          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                            {consultations[0].diagnosis}
                          </Badge>
                        </div>
                        <p className="text-sm mb-4">{consultations[0].notes}</p>
                        {consultations[0].prescriptions.length > 0 && (
                          <div>
                            <p className="text-sm font-medium mb-2">
                              Prescriptions:
                            </p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {consultations[0].prescriptions.map(
                                (prescription, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <Pill className="h-3 w-3 mr-1 mt-1" />
                                    <span>
                                      {prescription.name} {prescription.dosage}{" "}
                                      - {prescription.instructions}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <p>Aucune consultation enregistrée</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ordonnances actives</CardTitle>
                    <CardDescription>
                      Ordonnances en cours de validité
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {prescriptions.filter((p) => p.status === "active").length >
                    0 ? (
                      <div className="space-y-4">
                        {prescriptions
                          .filter((p) => p.status === "active")
                          .map((prescription) => (
                            <div
                              key={prescription.id}
                              className="border rounded-md p-3"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <p className="font-medium">
                                  {prescription.name}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                  {prescription.date}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                Valable jusqu'au: {prescription.expiryDate}
                              </p>
                              <ul className="text-sm space-y-1 mb-3">
                                {prescription.medications.map(
                                  (medication, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <Pill className="h-3 w-3 mr-1 mt-1" />
                                      <span>
                                        {medication.name} {medication.dosage} -{" "}
                                        {medication.instructions}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                              <div className="flex flex-col gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                >
                                  <FileText className="mr-1 h-3 w-3" />
                                  Voir
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                >
                                  <Printer className="mr-1 h-3 w-3" />
                                  Imprimer
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <p>Aucune ordonnance active</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Derniers résultats</CardTitle>
                    <CardDescription>
                      Résultats d'examens récents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {testResults.length > 0 ? (
                      <div className="space-y-4">
                        {testResults.slice(0, 2).map((test) => (
                          <div key={test.id} className="border rounded-md p-3">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-medium">{test.name}</p>
                              <span className="text-xs text-muted-foreground">
                                {test.date}
                              </span>
                            </div>
                            <p className="text-sm mb-1">
                              <span className="font-medium">Résultat:</span>{" "}
                              {test.results}
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">
                              {test.notes}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Voir le rapport
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <p>Aucun résultat d'examen disponible</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prochains rappels</CardTitle>
                    <CardDescription>
                      Vaccins et suivis à prévoir
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vaccinations
                        .filter((v) => v.nextDue !== "À déterminer")
                        .slice(0, 2)
                        .map((vaccination) => (
                          <div
                            key={vaccination.id}
                            className="flex justify-between items-center border-b pb-3"
                          >
                            <div>
                              <p className="font-medium">{vaccination.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Prochain rappel: {vaccination.nextDue}
                              </p>
                            </div>
                            <Badge variant="outline">À planifier</Badge>
                          </div>
                        ))}
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Suivi cardiologique</p>
                          <p className="text-xs text-muted-foreground">
                            Prochain rendez-vous: Septembre 2025
                          </p>
                        </div>
                        <Badge variant="outline">À planifier</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="consultations">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des consultations</CardTitle>
                  <CardDescription>
                    Liste complète des consultations du patient
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {consultations.length > 0 ? (
                    <div className="space-y-6">
                      {consultations.map((consultation) => (
                        <Accordion
                          key={consultation.id}
                          type="single"
                          collapsible
                          className="w-full border rounded-md"
                        >
                          <AccordionItem
                            value={`consultation-${consultation.id}`}
                            className="border-none"
                          >
                            <AccordionTrigger className="px-4 py-2 hover:no-underline">
                              <div className="flex flex-col items-start text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {consultation.date}
                                  </span>
                                  <Badge
                                    className={
                                      consultation.status === "completed"
                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                        : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    }
                                  >
                                    {consultation.status === "completed"
                                      ? "Terminé"
                                      : "En cours"}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {consultation.reason} - {consultation.doctor}
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <div className="space-y-4">
                                <div>
                                  <p className="font-medium">Diagnostic</p>
                                  <p className="text-sm">
                                    {consultation.diagnosis}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Notes</p>
                                  <p className="text-sm">
                                    {consultation.notes}
                                  </p>
                                </div>
                                {consultation.prescriptions.length > 0 && (
                                  <div>
                                    <p className="font-medium">Prescriptions</p>
                                    <ul className="mt-2 space-y-2">
                                      {consultation.prescriptions.map(
                                        (prescription, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-start text-sm"
                                          >
                                            <Pill className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                                            <div>
                                              <span className="font-medium">
                                                {prescription.name}{" "}
                                                {prescription.dosage}
                                              </span>
                                              <p className="text-muted-foreground">
                                                {prescription.instructions}
                                              </p>
                                            </div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                                <div className="flex justify-end">
                                  <Link
                                    href={`/dashboard/consultation/${consultation.id}`}
                                  >
                                    <Button variant="outline" size="sm">
                                      <FileText className="mr-2 h-4 w-4" />
                                      Voir les détails
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Aucune consultation enregistrée pour ce patient</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescriptions">
              <Card>
                <CardHeader>
                  <CardTitle>Ordonnances</CardTitle>
                  <CardDescription>
                    Historique des ordonnances du patient
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {prescriptions.length > 0 ? (
                    <div className="space-y-6">
                      {prescriptions.map((prescription) => (
                        <div
                          key={prescription.id}
                          className="border rounded-md p-4"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                            <div>
                              <h3 className="font-medium text-lg">
                                {prescription.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {prescription.doctor} - {prescription.specialty}
                              </p>
                              <div className="flex items-center gap-4 mt-1 text-sm">
                                <div className="flex items-center">
                                  <Calendar className="mr-1 h-4 w-4 text-teal-600" />
                                  <span>Délivrée le: {prescription.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-4 w-4 text-teal-600" />
                                  <span>
                                    Valable jusqu'au: {prescription.expiryDate}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              className={
                                prescription.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {prescription.status === "active"
                                ? "Active"
                                : "Expirée"}
                            </Badge>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">
                              Médicaments
                            </h4>
                            <ul className="space-y-2">
                              {prescription.medications.map(
                                (medication, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <Pill className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                                    <div>
                                      <span className="font-medium">
                                        {medication.name} {medication.dosage}
                                      </span>
                                      <p className="text-sm text-muted-foreground">
                                        {medication.instructions}
                                      </p>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          {prescription.notes && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">
                                Notes
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {prescription.notes}
                              </p>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </Button>
                            <Button variant="outline" size="sm">
                              <Printer className="mr-2 h-4 w-4" />
                              Imprimer
                            </Button>
                            {prescription.status === "active" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-teal-600 hover:text-teal-700"
                              >
                                Renouveler
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Aucune ordonnance enregistrée pour ce patient</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tests">
              <Card>
                <CardHeader>
                  <CardTitle>Tests et examens</CardTitle>
                  <CardDescription>
                    Résultats des tests et examens médicaux
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Examen</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Prestataire</TableHead>
                        <TableHead>Résultat</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testResults.length > 0 ? (
                        testResults.map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">
                              {test.name}
                            </TableCell>
                            <TableCell>{test.date}</TableCell>
                            <TableCell>{test.provider}</TableCell>
                            <TableCell>{test.results}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Voir le rapport</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-8 text-muted-foreground"
                          >
                            Aucun résultat d'examen disponible
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vaccinations">
              <Card>
                <CardHeader>
                  <CardTitle>Vaccinations</CardTitle>
                  <CardDescription>
                    Historique des vaccinations du patient
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vaccin</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Administré par</TableHead>
                        <TableHead>Lieu</TableHead>
                        <TableHead>Prochain rappel</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vaccinations.length > 0 ? (
                        vaccinations.map((vaccination) => (
                          <TableRow key={vaccination.id}>
                            <TableCell className="font-medium">
                              {vaccination.name}
                            </TableCell>
                            <TableCell>{vaccination.date}</TableCell>
                            <TableCell>{vaccination.provider}</TableCell>
                            <TableCell>{vaccination.location}</TableCell>
                            <TableCell>{vaccination.nextDue}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-8 text-muted-foreground"
                          >
                            Aucune vaccination enregistrée
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
