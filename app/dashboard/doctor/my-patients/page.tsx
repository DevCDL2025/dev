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
import { FileText, Search, User, Calendar, Phone, Mail } from "lucide-react";
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

// Mock data for patients
const patients = [
  {
    id: 1,
    name: "Patrice Mboumba",
    age: 48,
    gender: "Homme",
    phone: "06 12 34 56 78",
    email: "patrice.mboumba@example.com",
    lastVisit: "15 septembre 2024",
    nextVisit: "15 mars 2025",
    condition: "Hypertension artérielle",
    status: "active",
  },
  {
    id: 2,
    name: "Aïssatou Diallo",
    age: 34,
    gender: "Femme",
    phone: "07 23 45 67 89",
    email: "aissatou.diallo@example.com",
    lastVisit: "20 octobre 2024",
    nextVisit: "20 avril 2025",
    condition: "Asthme chronique",
    status: "active",
  },
  {
    id: 3,
    name: "Jean-Claude Owono",
    age: 62,
    gender: "Homme",
    phone: "06 98 76 54 32",
    email: "jc.owono@example.com",
    lastVisit: "5 novembre 2024",
    nextVisit: "5 mai 2025",
    condition: "Arthrose",
    status: "follow-up",
  },
  {
    id: 4,
    name: "Grace Nzeng",
    age: 29,
    gender: "Femme",
    phone: "05 11 22 33 44",
    email: "grace.nzeng@example.com",
    lastVisit: "12 décembre 2024",
    nextVisit: "12 juin 2025",
    condition: "Anémie ferriprive",
    status: "active",
  },
  {
    id: 5,
    name: "Mohamed Keita",
    age: 55,
    gender: "Homme",
    phone: "06 55 44 33 22",
    email: "mohamed.keita@example.com",
    lastVisit: "3 janvier 2025",
    nextVisit: "3 juillet 2025",
    condition: "Diabète type 1",
    status: "chronic",
  },
  {
    id: 6,
    name: "Fatoumata Bamba",
    age: 40,
    gender: "Femme",
    phone: "07 77 66 55 44",
    email: "fatoumata.bamba@example.com",
    lastVisit: "18 février 2025",
    nextVisit: "18 août 2025",
    condition: "Migraines chroniques",
    status: "active",
  },
  {
    id: 7,
    name: "Marcellin Nguema",
    age: 70,
    gender: "Homme",
    phone: "06 34 56 78 90",
    email: "marcellin.nguema@example.com",
    lastVisit: "22 mars 2025",
    nextVisit: "22 septembre 2025",
    condition: "Insuffisance cardiaque",
    status: "chronic",
  },
  {
    id: 8,
    name: "Sylvie Okou",
    age: 25,
    gender: "Femme",
    phone: "05 67 89 01 23",
    email: "sylvie.okou@example.com",
    lastVisit: "8 avril 2025",
    nextVisit: "8 octobre 2025",
    condition: "Allergies saisonnières",
    status: "follow-up",
  },
  {
    id: 9,
    name: "Didier Mba",
    age: 45,
    gender: "Homme",
    phone: "06 45 67 89 01",
    email: "didier.mba@example.com",
    lastVisit: "14 mai 2025",
    nextVisit: "14 novembre 2025",
    condition: "Hypercholestérolémie",
    status: "active",
  },
  {
    id: 10,
    name: "Esther Nkoghe",
    age: 37,
    gender: "Femme",
    phone: "07 12 34 56 78",
    email: "esther.nkoghe@example.com",
    lastVisit: "30 juin 2025",
    nextVisit: "30 décembre 2025",
    condition: "Dépression modérée",
    status: "follow-up",
  },
];

export default function MyPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCondition, setFilterCondition] = useState("all"); // Changed from empty string to "all"
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filter patients based on search term, status and condition
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || patient.status === filterStatus) &&
      (filterCondition === "all" || patient.condition === filterCondition) // Changed from empty string to "all"
  );

  // Get unique conditions for filter
  const conditions = [...new Set(patients.map((p) => p.condition))];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mes patients</h1>
        <p className="text-muted-foreground">Liste complète de vos patients</p>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-4 mb-6 ">
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
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="active">Actifs</SelectItem>
              <SelectItem value="inactive">Inactifs</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex  gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            className={
              viewMode === "grid" ? "bg-teal-600 hover:bg-teal-700" : ""
            }
            onClick={() => setViewMode("grid")}
          >
            Grille
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            className={
              viewMode === "table" ? "bg-teal-600 hover:bg-teal-700" : ""
            }
            onClick={() => setViewMode("table")}
          >
            Tableau
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <Card key={patient.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-teal-100 text-teal-800">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {patient.age} ans - {patient.gender}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={
                        patient.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {patient.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-teal-600 mr-2" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-teal-600 mr-2" />
                      <span>{patient.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-teal-600 mr-2" />
                      <span>Dernière visite: {patient.lastVisit}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-teal-600 mr-2" />
                      <span>Prochain rendez-vous: {patient.nextVisit}</span>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <User className="h-4 w-4 text-teal-600 mr-2" />
                      <span>Condition: {patient.condition}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/doctor/patient/${patient.id}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        Dossier
                      </Button>
                    </Link>
                    <Link
                      href={`/dashboard/doctor/consultation/${patient.id}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">
                        Consulter
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <User className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Aucun patient trouvé</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aucun patient ne correspond à votre recherche.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Liste des patients</CardTitle>
            <CardDescription>
              Vue détaillée de tous vos patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Dernière visite</TableHead>
                  <TableHead>Prochain RDV</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-teal-100 text-teal-800">
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {patient.age} ans - {patient.gender}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{patient.phone}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>{patient.nextVisit}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            patient.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {patient.status === "active" ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/patient/${patient.id}`}>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Dossier</span>
                            </Button>
                          </Link>
                          <Link
                            href={`/dashboard/consultation/new?patient=${patient.id}`}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-teal-600 hover:text-teal-700"
                            >
                              Consultation
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Aucun patient trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
