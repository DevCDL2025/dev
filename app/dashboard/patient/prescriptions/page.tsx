"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, FileText, Pill, Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

// Mock data
const prescriptions = [
  {
    id: 1,
    name: "Ordonnance - Cardiologie",
    doctor: "Dr. Pierre Martin",
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
    name: "Ordonnance - Ophtalmologie",
    doctor: "Dr. Marie Laurent",
    specialty: "Ophtalmologie",
    date: "28 février 2025",
    expiryDate: "28 août 2025",
    status: "active",
    medications: [
      {
        name: "Nouvelles lunettes",
        dosage: "",
        instructions: "Prescription pour nouvelles lunettes",
      },
    ],
    notes: "Ordonnance valable 6 mois",
  },
  {
    id: 3,
    name: "Ordonnance - Médecine générale",
    doctor: "Dr. Jean Dupont",
    specialty: "Médecine générale",
    date: "10 janvier 2025",
    expiryDate: "10 février 2025",
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
  {
    id: 4,
    name: "Ordonnance - Analyses de sang",
    doctor: "Dr. Pierre Martin",
    specialty: "Cardiologie",
    date: "15 mars 2025",
    expiryDate: "15 juin 2025",
    status: "active",
    medications: [],
    tests: [
      { name: "Numération formule sanguine complète" },
      { name: "Bilan lipidique" },
      { name: "Glycémie à jeun" },
    ],
    notes: "À réaliser à jeun",
  },
];

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filter prescriptions based on search term, status and specialty
  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      (prescription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "" || prescription.status === filterStatus)
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mes ordonnances</h1>
        <p className="text-muted-foreground">
          Consultez et gérez vos ordonnances médicales
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par nom ou médecin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Actives</SelectItem>
              <SelectItem value="expired">Expirées</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="medications">Médicaments</TabsTrigger>
          <TabsTrigger value="tests">Analyses & Examens</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {prescription.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {prescription.doctor} ({prescription.specialty})
                        </p>
                      </div>
                      <Badge
                        className={
                          prescription.status === "active"
                            ? "w-fit h-fit bg-green-100 text-green-800 hover:bg-green-100"
                            : "w-fit h-fit bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {prescription.status === "active"
                          ? "Active"
                          : "Expirée"}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm mt-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-teal-600" />
                        <span>Délivrée le: {prescription.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-teal-600" />
                        <span>Valable jusqu'au: {prescription.expiryDate}</span>
                      </div>
                    </div>

                    {prescription.medications &&
                      prescription.medications.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            Médicaments
                          </h4>
                          <ul className="space-y-2">
                            {prescription.medications.map(
                              (medication, index) => (
                                <li key={index} className="flex items-start">
                                  <Pill className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                                  <div>
                                    <span className="font-medium">
                                      {medication.name}
                                    </span>
                                    {medication.dosage && (
                                      <span className="text-muted-foreground">
                                        {" "}
                                        ({medication.dosage})
                                      </span>
                                    )}
                                    {medication.instructions && (
                                      <p className="text-sm text-muted-foreground">
                                        {medication.instructions}
                                      </p>
                                    )}
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {prescription.tests && prescription.tests.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Analyses & Examens
                        </h4>
                        <ul className="space-y-2">
                          {prescription.tests.map((test, index) => (
                            <li key={index} className="flex items-start">
                              <FileText className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                              <div>
                                <span className="font-medium">{test.name}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {prescription.notes && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Notes</h4>
                        <p className="text-sm text-muted-foreground">
                          {prescription.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link href={`/dashboard/prescription/${prescription.id}`}>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer className="mr-2 h-4 w-4" />
                        Imprimer
                      </Button>
                      {prescription.status !== "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-teal-600 hover:text-teal-700"
                        >
                          Renouveler
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">
                    Aucune ordonnance trouvée
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aucune ordonnance ne correspond à votre recherche.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="medications">
          <div className="space-y-4">
            {filteredPrescriptions.filter(
              (p) => p.medications && p.medications.length > 0
            ).length > 0 ? (
              filteredPrescriptions
                .filter((p) => p.medications && p.medications.length > 0)
                .map((prescription) => (
                  <Card key={prescription.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {prescription.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {prescription.doctor} ({prescription.specialty})
                          </p>
                        </div>
                        <Badge
                          className={
                            prescription.status === "active"
                              ? "w-fit h-fit bg-green-100 text-green-800 hover:bg-green-100"
                              : "w-fit h-fit bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {prescription.status === "active"
                            ? "Active"
                            : "Expirée"}
                        </Badge>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm mt-4">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-teal-600" />
                          <span>Délivrée le: {prescription.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-teal-600" />
                          <span>
                            Valable jusqu'au: {prescription.expiryDate}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Médicaments
                        </h4>
                        <ul className="space-y-2">
                          {prescription.medications.map((medication, index) => (
                            <li key={index} className="flex items-start">
                              <Pill className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                              <div>
                                <span className="font-medium">
                                  {medication.name}
                                </span>
                                {medication.dosage && (
                                  <span className="text-muted-foreground">
                                    {" "}
                                    ({medication.dosage})
                                  </span>
                                )}
                                {medication.instructions && (
                                  <p className="text-sm text-muted-foreground">
                                    {medication.instructions}
                                  </p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {prescription.notes && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Notes</h4>
                          <p className="text-sm text-muted-foreground">
                            {prescription.notes}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Link
                          href={`/dashboard/prescription/${prescription.id}`}
                        >
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Voir
                          </Button>
                        </Link>
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
                    </CardContent>
                  </Card>
                ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Pill className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">
                    Aucune ordonnance de médicaments trouvée
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aucune ordonnance de médicaments ne correspond à votre
                    recherche.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tests">
          <div className="space-y-4">
            {filteredPrescriptions.filter((p) => p.tests && p.tests.length > 0)
              .length > 0 ? (
              filteredPrescriptions
                .filter((p) => p.tests && p.tests.length > 0)
                .map((prescription) => (
                  <Card key={prescription.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {prescription.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {prescription.doctor} ({prescription.specialty})
                          </p>
                        </div>
                        <Badge
                          className={
                            prescription.status === "active"
                              ? "w-fit h-fit bg-green-100 text-green-800 hover:bg-green-100"
                              : "w-fit h-fit bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {prescription.status === "active"
                            ? "Active"
                            : "Expirée"}
                        </Badge>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm mt-4">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-teal-600" />
                          <span>Délivrée le: {prescription.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-teal-600" />
                          <span>
                            Valable jusqu'au: {prescription.expiryDate}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Analyses & Examens
                        </h4>
                        <ul className="space-y-2">
                          {prescription.tests?.map((test, index) => (
                            <li key={index} className="flex items-start">
                              <FileText className="h-4 w-4 text-teal-600 mr-2 mt-0.5" />
                              <div>
                                <span className="font-medium">{test.name}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {prescription.notes && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Notes</h4>
                          <p className="text-sm text-muted-foreground">
                            {prescription.notes}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Link
                          href={`/dashboard/prescription/${prescription.id}`}
                        >
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Voir
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="mr-2 h-4 w-4" />
                          Imprimer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">
                    Aucune ordonnance d'analyses trouvée
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aucune ordonnance d'analyses ou d'examens ne correspond à
                    votre recherche.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
