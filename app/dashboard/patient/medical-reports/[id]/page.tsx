"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  FileText,
  Download,
  Printer,
  ArrowLeft,
  Activity,
  Share2,
  BarChart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Mock data for a medical report
const reportData = {
  id: "1",
  name: "Analyse de sang complète",
  type: "Laboratoire",
  date: "15 mars 2025",
  doctor: "Dr. Pierre Martin",
  specialty: "Cardiologie",
  status: "completed",
  laboratory: "Laboratoire Central",
  results: [
    {
      name: "Globules rouges",
      value: "4.8 millions/μL",
      range: "4.5-5.5 millions/μL",
      status: "normal",
    },
    {
      name: "Hémoglobine",
      value: "14.2 g/dL",
      range: "13.5-17.5 g/dL",
      status: "normal",
    },
    { name: "Hématocrite", value: "42%", range: "41-50%", status: "normal" },
    { name: "VGM", value: "88 fL", range: "80-96 fL", status: "normal" },
    { name: "TCMH", value: "29.5 pg", range: "27-33 pg", status: "normal" },
    { name: "CCMH", value: "33.5 g/dL", range: "32-36 g/dL", status: "normal" },
    {
      name: "Globules blancs",
      value: "7,500/μL",
      range: "4,500-11,000/μL",
      status: "normal",
    },
    { name: "Neutrophiles", value: "60%", range: "40-70%", status: "normal" },
    { name: "Lymphocytes", value: "30%", range: "20-40%", status: "normal" },
    { name: "Monocytes", value: "7%", range: "2-10%", status: "normal" },
    { name: "Éosinophiles", value: "2%", range: "1-6%", status: "normal" },
    { name: "Basophiles", value: "1%", range: "0-2%", status: "normal" },
    {
      name: "Plaquettes",
      value: "250,000/μL",
      range: "150,000-450,000/μL",
      status: "normal",
    },
    {
      name: "Glucose à jeun",
      value: "95 mg/dL",
      range: "70-100 mg/dL",
      status: "normal",
    },
    {
      name: "Cholestérol total",
      value: "210 mg/dL",
      range: "<200 mg/dL",
      status: "elevated",
    },
    { name: "HDL", value: "55 mg/dL", range: ">40 mg/dL", status: "normal" },
    { name: "LDL", value: "130 mg/dL", range: "<130 mg/dL", status: "normal" },
    {
      name: "Triglycérides",
      value: "150 mg/dL",
      range: "<150 mg/dL",
      status: "normal",
    },
  ],
  notes:
    "Légère élévation du cholestérol total. Recommandation de suivi dans 3 mois.",
  recommendations: [
    "Maintenir une alimentation équilibrée, riche en fruits et légumes",
    "Limiter la consommation de graisses saturées et de sucres raffinés",
    "Pratiquer une activité physique régulière (30 minutes par jour, 5 fois par semaine)",
    "Contrôle du cholestérol dans 3 mois",
  ],
  history: [
    { date: "15 décembre 2024", value: "205 mg/dL", status: "elevated" },
    { date: "15 septembre 2024", value: "195 mg/dL", status: "normal" },
    { date: "15 juin 2024", value: "190 mg/dL", status: "normal" },
  ],
  patient: {
    name: "Jean Dupont",
    age: 45,
    gender: "Homme",
    birthDate: "15/05/1980",
    insuranceNumber: "1 23 45 67 890 123 45",
  },
};

// Types for TypeScript
type ResultStatus = "normal" | "elevated" | "low" | "critical" | "inconclusive";

export default function MedicalReportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to get result status badge color
  const getResultStatusBadgeClass = (status: ResultStatus) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "elevated":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "inconclusive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    // Simulate printing
    setTimeout(() => {
      toast("Impression lancée", {
        description: "Le rapport a été envoyé à l'imprimante.",
      });
      setIsPrinting(false);
    }, 1500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      toast("Téléchargement terminé", {
        description: "Le rapport a été téléchargé au format PDF.",
      });
      setIsDownloading(false);
    }, 1500);
  };

  const handleShare = () => {
    toast("Partage du rapport", {
      description: "Fonctionnalité de partage en cours de développement.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Rapport médical
            </h1>
            <p className="text-muted-foreground">{reportData.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
            {reportData.type}
          </Badge>
          <Button variant="outline" onClick={handlePrint} disabled={isPrinting}>
            <Printer className="mr-2 h-4 w-4" />
            {isPrinting ? "Impression..." : "Imprimer"}
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Partager
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
            <div>
              <h2 className="text-xl font-bold">{reportData.name}</h2>
              <p className="text-muted-foreground">{reportData.type}</p>
              <div className="mt-2">
                <p className="text-sm">
                  <span className="font-medium">Médecin:</span>{" "}
                  {reportData.doctor}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Spécialité:</span>{" "}
                  {reportData.specialty}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Laboratoire:</span>{" "}
                  {reportData.laboratory}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Calendar className="h-4 w-4 text-teal-600" />
                  <span>Date: {reportData.date}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <FileText className="h-4 w-4 text-teal-600" />
                  <span>Référence: #{reportData.id}</span>
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
                  {reportData.patient.name}
                </p>
              </div>
              <div>
                <p className="font-medium">Âge</p>
                <p className="text-muted-foreground">
                  {reportData.patient.age} ans
                </p>
              </div>
              <div>
                <p className="font-medium">Date de naissance</p>
                <p className="text-muted-foreground">
                  {reportData.patient.birthDate}
                </p>
              </div>
              <div>
                <p className="font-medium">Numéro de sécurité sociale</p>
                <p className="text-muted-foreground">
                  {reportData.patient.insuranceNumber}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="results">Résultats</TabsTrigger>
              <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="results">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Résultats d'analyse
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paramètre</TableHead>
                      <TableHead>Valeur</TableHead>
                      <TableHead>Plage normale</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.results.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {result.name}
                        </TableCell>
                        <TableCell>{result.value}</TableCell>
                        <TableCell>{result.range || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            className={getResultStatusBadgeClass(
                              result.status as ResultStatus
                            )}
                          >
                            {result.status === "normal"
                              ? "Normal"
                              : result.status === "elevated"
                              ? "Élevé"
                              : result.status === "low"
                              ? "Bas"
                              : result.status === "critical"
                              ? "Critique"
                              : "Inconclusif"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {reportData.notes && (
                  <div className="mt-6">
                    <h4 className="text-md font-semibold mb-2">Notes</h4>
                    <p className="text-muted-foreground">{reportData.notes}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Recommandations médicales
                </h3>
                <ul className="space-y-2">
                  {reportData.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <Activity className="h-5 w-5 text-teal-600 mr-2 mt-0.5 shrink-0" />
                      <p>{recommendation}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h4 className="text-md font-semibold mb-2 text-yellow-800">
                    Suivi recommandé
                  </h4>
                  <p className="text-yellow-800">
                    Un contrôle du cholestérol est recommandé dans 3 mois.
                    Veuillez prendre rendez-vous avec votre médecin.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Historique des valeurs
                </h3>
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-2">
                    Cholestérol total
                  </h4>
                  <div className="h-64 border rounded-md p-4 flex items-center justify-center">
                    <div className="flex items-center justify-center">
                      <BarChart className="h-12 w-12 text-muted-foreground" />
                      <p className="ml-2 text-muted-foreground">
                        Graphique d'évolution du cholestérol
                      </p>
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Valeur</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        {reportData.date}
                      </TableCell>
                      <TableCell>210 mg/dL</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          Élevé
                        </Badge>
                      </TableCell>
                    </TableRow>
                    {reportData.history.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.date}
                        </TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.status === "normal"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {item.status === "normal" ? "Normal" : "Élevé"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
