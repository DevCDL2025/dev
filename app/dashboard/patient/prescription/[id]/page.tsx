"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Pill,
  Download,
  Printer,
  ArrowLeft,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Mock data for a prescription
const prescriptionData = {
  id: "1",
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
      instructions: "1 comprimé par jour le matin",
    },
    {
      name: "Aspirine",
      dosage: "75mg",
      instructions: "1 comprimé par jour pendant les repas",
    },
  ],
  notes: "Renouvellement possible 2 fois",
  patient: {
    name: "Kévin Mboumba",
    age: 45,
    gender: "Homme",
    birthDate: "15/05/1980",
    insuranceNumber: "1 23 45 67 890 123 45",
  },
  hospital: {
    name: "Centre Médical Saint-Michel",
    address: "45 Avenue de la Santé, 69000 Lyon",
    phone: "04 72 XX XX XX",
  },
};

export default function PrescriptionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    // Simulate printing
    setTimeout(() => {
      toast("Impression lancée", {
        description: "L'ordonnance a été envoyée à l'imprimante.",
      });
      setIsPrinting(false);
    }, 1500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      toast("Téléchargement terminé", {
        description: "L'ordonnance a été téléchargée au format PDF.",
      });
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ordonnance</h1>
            <p className="text-muted-foreground">{prescriptionData.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={
              prescriptionData.status === "active"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }
          >
            {prescriptionData.status === "active" ? "Active" : "Expirée"}
          </Badge>
          <Button variant="outline" onClick={handlePrint} disabled={isPrinting}>
            <Printer className="mr-2 h-4 w-4" />
            {isPrinting ? "Impression..." : "Imprimer"}
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download className="mr-2 h-4 w-4" />
            {isDownloading ? "Téléchargement..." : "Télécharger"}
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarFallback className="bg-teal-100 text-teal-800 text-xl">
                  {prescriptionData.doctor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{prescriptionData.doctor}</h2>
                <p className="text-muted-foreground">
                  {prescriptionData.specialty}
                </p>
                <p className="text-sm mt-1">{prescriptionData.hospital.name}</p>
                <p className="text-sm text-muted-foreground">
                  {prescriptionData.hospital.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {prescriptionData.hospital.phone}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Calendar className="h-4 w-4 text-teal-600" />
                  <span>Délivrée le: {prescriptionData.date}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span>Valable jusqu'au: {prescriptionData.expiryDate}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Patient</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Nom</p>
                <p className="text-muted-foreground">
                  {prescriptionData.patient.name}
                </p>
              </div>
              <div>
                <p className="font-medium">Âge</p>
                <p className="text-muted-foreground">
                  {prescriptionData.patient.age} ans
                </p>
              </div>
              <div>
                <p className="font-medium">Date de naissance</p>
                <p className="text-muted-foreground">
                  {prescriptionData.patient.birthDate}
                </p>
              </div>
              <div>
                <p className="font-medium">Numéro de sécurité sociale</p>
                <p className="text-muted-foreground">
                  {prescriptionData.patient.insuranceNumber}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Médicaments prescrits
            </h3>
            <div className="space-y-6">
              {prescriptionData.medications.map((medication, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 border rounded-md"
                >
                  <Pill className="h-6 w-6 text-teal-600 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h4 className="text-lg font-medium">
                        {medication.name} {medication.dosage}
                      </h4>
                    </div>
                    <p className="text-muted-foreground mt-1">
                      {medication.instructions}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {prescriptionData.notes && (
            <>
              <Separator className="my-6" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Notes</h3>
                <p className="text-muted-foreground">
                  {prescriptionData.notes}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informations importantes</CardTitle>
          <CardDescription>
            À lire avant de prendre vos médicaments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Conseils généraux</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                Respectez scrupuleusement la posologie prescrite par votre
                médecin.
              </li>
              <li>
                N'arrêtez pas votre traitement sans avis médical, même si vous
                vous sentez mieux.
              </li>
              <li>
                Signalez à votre médecin ou pharmacien tout effet indésirable
                non mentionné dans la notice du médicament.
              </li>
              <li>Conservez vos médicaments hors de portée des enfants.</li>
              <li>
                Vérifiez la date de péremption avant de prendre vos médicaments.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Renouvellement</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Cette ordonnance est renouvelable selon les indications de votre
              médecin. Consultez votre pharmacien pour plus d'informations sur
              les modalités de renouvellement.
            </p>
          </div>

          <div>
            <h4 className="font-medium">En cas d'urgence</h4>
            <p className="text-sm text-muted-foreground mt-2">
              En cas d'urgence ou de réaction indésirable grave, contactez
              immédiatement votre médecin ou le SAMU en composant le 15.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
