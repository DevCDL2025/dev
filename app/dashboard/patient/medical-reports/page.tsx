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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Printer, Search, Activity } from "lucide-react";
import Link from "next/link";

// Mock data
const medicalReports = [
  {
    id: 1,
    name: "Analyse de sang complète",
    type: "Laboratoire",
    date: "15 mars 2025",
    doctor: "Dr. Pierre Martin",
    status: "completed",
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
      {
        name: "Globules blancs",
        value: "7,500/μL",
        range: "4,500-11,000/μL",
        status: "normal",
      },
      {
        name: "Plaquettes",
        value: "250,000/μL",
        range: "150,000-450,000/μL",
        status: "normal",
      },
      {
        name: "Cholestérol total",
        value: "210 mg/dL",
        range: "<200 mg/dL",
        status: "elevated",
      },
    ],
    notes:
      "Légère élévation du cholestérol total. Recommandation de suivi dans 3 mois.",
  },
  {
    id: 2,
    name: "Radiographie pulmonaire",
    type: "Imagerie",
    date: "10 février 2025",
    doctor: "Dr. Jean Dupont",
    status: "completed",
    results: [
      { name: "Champs pulmonaires", value: "Clairs", status: "normal" },
      { name: "Silhouette cardiaque", value: "Normale", status: "normal" },
      { name: "Structures osseuses", value: "Normales", status: "normal" },
    ],
    notes: "Radiographie pulmonaire normale. Pas d'anomalies détectées.",
  },
  {
    id: 3,
    name: "Électrocardiogramme (ECG)",
    type: "Cardiologie",
    date: "15 mars 2025",
    doctor: "Dr. Pierre Martin",
    status: "completed",
    results: [
      { name: "Rythme", value: "Sinusal", status: "normal" },
      {
        name: "Fréquence cardiaque",
        value: "72 bpm",
        range: "60-100 bpm",
        status: "normal",
      },
      {
        name: "Intervalle PR",
        value: "160 ms",
        range: "120-200 ms",
        status: "normal",
      },
      {
        name: "Intervalle QT",
        value: "380 ms",
        range: "350-440 ms",
        status: "normal",
      },
    ],
    notes: "ECG normal. Rythme sinusal régulier sans anomalies significatives.",
  },
  {
    id: 4,
    name: "Test d'effort",
    type: "Cardiologie",
    date: "20 mars 2025",
    doctor: "Dr. Pierre Martin",
    status: "pending",
    notes: "Rendez-vous programmé pour le 20 mars 2025 à 14h30.",
  },
  {
    id: 5,
    name: "IRM cérébrale",
    type: "Neurologie",
    date: "5 janvier 2025",
    doctor: "Dr. Sophie Bernard",
    status: "completed",
    results: [
      { name: "Parenchyme cérébral", value: "Normal", status: "normal" },
      { name: "Ventricules", value: "Normaux", status: "normal" },
      { name: "Structures vasculaires", value: "Normales", status: "normal" },
    ],
    notes: "IRM cérébrale sans anomalies significatives.",
  },
];

// Types for TypeScript
type ReportStatus = "completed" | "pending" | "in-progress" | "cancelled";
type ResultStatus = "normal" | "elevated" | "low" | "critical" | "inconclusive";

export default function MedicalReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filter reports based on search term, type and status
  const filteredReports = medicalReports.filter(
    (report) =>
      (report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType === "" || report.type === filterType) &&
      (filterStatus === "" || report.status === filterStatus)
  );

  // Get unique types for filter
  const types = [...new Set(medicalReports.map((r) => r.type))];

  // Function to get status badge color
  const getStatusBadgeClass = (status: ReportStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "in-progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

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

  // Function to get status text in French
  const getStatusText = (status: ReportStatus) => {
    switch (status) {
      case "completed":
        return "Complété";
      case "pending":
        return "En attente";
      case "in-progress":
        return "En cours";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Rapports médicaux</h1>
        <p className="text-muted-foreground">
          Consultez vos résultats d'examens et analyses médicales
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom ou médecin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Type d'examen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allTypes">Tous les types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-48">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allStatuses">Tous les statuts</SelectItem>
              <SelectItem value="completed">Complétés</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="in-progress">En cours</SelectItem>
              <SelectItem value="cancelled">Annulés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">Tous les rapports</TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="abnormal">Résultats anormaux</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row justify-between gap-2">
                      <div>
                        <CardTitle>{report.name}</CardTitle>
                        <CardDescription>
                          {report.date} - {report.doctor}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                          {report.type}
                        </Badge>
                        <Badge
                          className={getStatusBadgeClass(
                            report.status as ReportStatus
                          )}
                        >
                          {getStatusText(report.status as ReportStatus)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {report.status === "completed" && report.results && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Résultats</h4>
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
                            {report.results.map((result, index) => (
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
                      </div>
                    )}

                    {report.notes && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">
                          {report.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link
                        href={`/dashboard/patient/medical-reports/${report.id}`}
                      >
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Voir le rapport complet
                        </Button>
                      </Link>
                      {report.status === "completed" && (
                        <>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                          </Button>
                          <Button variant="outline" size="sm">
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimer
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Aucun rapport trouvé</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aucun rapport médical ne correspond à votre recherche.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="space-y-4">
            {filteredReports
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .slice(0, 5)
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row justify-between gap-2">
                      <div>
                        <CardTitle>{report.name}</CardTitle>
                        <CardDescription>
                          {report.date} - {report.doctor}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                          {report.type}
                        </Badge>
                        <Badge
                          className={getStatusBadgeClass(
                            report.status as ReportStatus
                          )}
                        >
                          {getStatusText(report.status as ReportStatus)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {report.status === "completed" && report.results && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Résultats</h4>
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
                            {report.results.map((result, index) => (
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
                      </div>
                    )}

                    {report.notes && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">
                          {report.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link href={`/dashboard/medical-reports/${report.id}`}>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Voir le rapport complet
                        </Button>
                      </Link>
                      {report.status === "completed" && (
                        <>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                          </Button>
                          <Button variant="outline" size="sm">
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimer
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="abnormal">
          <div className="space-y-4">
            {filteredReports
              .filter(
                (report) =>
                  report.status === "completed" &&
                  report.results &&
                  report.results.some((r) => r.status !== "normal")
              )
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row justify-between gap-2">
                      <div>
                        <CardTitle>{report.name}</CardTitle>
                        <CardDescription>
                          {report.date} - {report.doctor}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                          {report.type}
                        </Badge>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          Résultats anormaux
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">
                        Résultats anormaux
                      </h4>
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
                          {report.results
                            ?.filter((r) => r.status !== "normal")
                            .map((result, index) => (
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
                                    {result.status === "elevated"
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
                    </div>

                    {report.notes && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">
                          {report.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link href={`/dashboard/medical-reports/${report.id}`}>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Voir le rapport complet
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <Activity className="mr-2 h-4 w-4" />
                        Suivi recommandé
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
