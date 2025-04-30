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
import { FileText, Search, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const consultations = [
  {
    id: 1,
    patient: "Kévin Mboumba",
    age: 32,
    date: "28 avril 2025",
    time: "10:30",
    reason: "Fièvre persistante",
    diagnosis: "Paludisme",
    status: "completed",
  },
  {
    id: 2,
    patient: "Amina Nzeng",
    age: 45,
    date: "29 avril 2025",
    time: "14:15",
    reason: "Vertiges fréquents",
    diagnosis: "Anémie",
    status: "completed",
  },
  {
    id: 3,
    patient: "Pascal Owondo",
    age: 28,
    date: "30 avril 2025",
    time: "11:00",
    reason: "Éruption cutanée",
    diagnosis: "Allergie médicamenteuse",
    status: "completed",
  },
  {
    id: 4,
    patient: "Laura Missambo",
    age: 50,
    date: "2 mai 2025",
    time: "16:45",
    reason: "Douleurs articulaires",
    diagnosis: "Arthrite",
    status: "pending",
  },
  {
    id: 5,
    patient: "Marc Essono",
    age: 38,
    date: "3 mai 2025",
    time: "08:30",
    reason: "Toux sèche prolongée",
    diagnosis: "Bronchite aiguë",
    status: "completed",
  },
];

export default function ConsultationsHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [filterDiagnosis, setFilterDiagnosis] = useState("");

  // Filter consultations based on search term and filters
  const filteredConsultations = consultations.filter(
    (consultation) =>
      consultation.patient.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterDiagnosis === "" || consultation.diagnosis === filterDiagnosis)
  );

  // Get unique diagnoses for filter
  const diagnoses = [...new Set(consultations.map((c) => c.diagnosis))];

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Historique des consultations
        </h1>
        <p className="text-muted-foreground">
          Consultez l'historique de vos consultations
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full ">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="">
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les périodes</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Select value={filterDiagnosis} onValueChange={setFilterDiagnosis}>
            <SelectTrigger>
              <SelectValue placeholder="Diagnostic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les diagnostics</SelectItem>
              {diagnoses.map((diagnosis) => (
                <SelectItem key={diagnosis} value={diagnosis}>
                  {diagnosis}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des consultations</CardTitle>
          <CardDescription>
            Historique complet des consultations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Motif</TableHead>
                <TableHead>Diagnostic</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-gray-100">
                            {consultation.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{consultation.patient}</p>
                          <p className="text-xs text-muted-foreground">
                            {consultation.age} ans
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{consultation.date}</span>
                        <span className="text-xs text-muted-foreground">
                          {consultation.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{consultation.reason}</TableCell>
                    <TableCell>{consultation.diagnosis}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        {consultation.status === "completed"
                          ? "Terminé"
                          : "En cours"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/dashboard/doctor/consultation/${consultation.id}`}
                      >
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Aucune consultation trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
