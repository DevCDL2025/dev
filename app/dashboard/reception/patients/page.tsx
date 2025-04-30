"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  FileText,
  Phone,
  PlusCircle,
  Search,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    name: "Kévin Mboumba",
    dob: "12/05/1975",
    phone: "06 12 34 56 78",
    email: "jean.dupont@email.com",
    lastVisit: "15/03/2025",
    nextAppointment: "28/04/2025",
    doctor: "Dr. Pierre Martin",
    status: "active",
    condition: "hypertension",
  },
  {
    id: 2,
    name: "Laura Missambo",
    dob: "23/09/1982",
    phone: "06 23 45 67 89",
    email: "marie.lefevre@email.com",
    lastVisit: "05/02/2025",
    nextAppointment: "15/05/2025",
    doctor: "Dr. Sophie Bernard",
    status: "active",
    condition: "dermatitis",
  },
  {
    id: 3,
    name: "Philippe Moreau",
    dob: "05/11/1968",
    phone: "06 34 56 78 90",
    email: "philippe.moreau@email.com",
    lastVisit: "20/03/2025",
    nextAppointment: "29/04/2025",
    doctor: "Dr. Pierre Martin",
    status: "active",
    condition: "diabetes",
  },
  {
    id: 4,
    name: "Marc Essono",
    dob: "17/03/1990",
    phone: "06 45 67 89 01",
    email: "isabelle.petit@email.com",
    lastVisit: "10/01/2025",
    nextAppointment: "30/04/2025",
    doctor: "Dr. Jean Dupont",
    status: "inactive",
    condition: "asthma",
  },
  {
    id: 5,
    name: "Laurent Dubois",
    dob: "30/07/1965",
    phone: "06 56 78 90 12",
    email: "laurent.dubois@email.com",
    lastVisit: "25/02/2025",
    nextAppointment: "02/05/2025",
    doctor: "Dr. Marie Laurent",
    status: "active",
    condition: "arthritis",
  },
  {
    id: 6,
    name: "Sophie Martin",
    dob: "14/02/1979",
    phone: "06 67 89 01 23",
    email: "sophie.martin@email.com",
    lastVisit: "18/03/2025",
    nextAppointment: null,
    doctor: "Dr. Jean Dupont",
    status: "inactive",
    condition: "migraine",
  },
  {
    id: 7,
    name: "Thomas Roux",
    dob: "09/12/1985",
    phone: "06 78 90 12 34",
    email: "thomas.roux@email.com",
    lastVisit: "22/03/2025",
    nextAppointment: "05/05/2025",
    doctor: "Dr. Sophie Bernard",
    status: "active",
    condition: "hypertension",
  },
  {
    id: 8,
    name: "Nathalie Fournier",
    dob: "21/06/1972",
    phone: "06 89 01 23 45",
    email: "nathalie.fournier@email.com",
    lastVisit: "01/04/2025",
    nextAppointment: "10/05/2025",
    doctor: "Dr. Marie Laurent",
    status: "active",
    condition: "diabetes",
  },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCondition, setFilterCondition] = useState("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  // Get unique conditions for filter
  const conditions = [...new Set(patients.map((p) => p.condition))];

  // Filter patients based on search term, status and condition
  const filteredPatients = patients.filter(
    (patient) =>
      (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || patient.status === filterStatus) &&
      (filterCondition === "all" || patient.condition === filterCondition)
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">
            Gérez les dossiers patients et créez des rendez-vous
          </p>
        </div>
        <Link href="/dashboard/new-patient">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Nouveau patient
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, téléphone ou email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:flex gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filterCondition}
                onValueChange={setFilterCondition}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les conditions</SelectItem>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition.charAt(0).toUpperCase() + condition.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex rounded-md border">
                <Button
                  variant="ghost"
                  className={`rounded-none rounded-l-md px-3 ${
                    view === "grid" ? "bg-muted" : ""
                  }`}
                  onClick={() => setView("grid")}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M7 2H1.5C1.22386 2 1 2.22386 1 2.5V7H7V2ZM8 2V7H14V2.5C14 2.22386 13.7761 2 13.5 2H8ZM14 8H8V13H13.5C13.7761 13 14 12.7761 14 12.5V8ZM7 13V8H1V12.5C1 12.7761 1.22386 13 1.5 13H7ZM1.5 1C0.671573 1 0 1.67157 0 2.5V12.5C0 13.3284 0.671573 14 1.5 14H13.5C14.3284 14 15 13.3284 15 12.5V2.5C15 1.67157 14.3284 1 13.5 1H1.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  className={`rounded-none rounded-r-md px-3 ${
                    view === "table" ? "bg-muted" : ""
                  }`}
                  onClick={() => setView("table")}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M8.5 2H13.5C13.7761 2 14 2.22386 14 2.5V5.5C14 5.77614 13.7761 6 13.5 6H8.5C8.22386 6 8 5.77614 8 5.5V2.5C8 2.22386 8.22386 2 8.5 2ZM8.5 9H13.5C13.7761 9 14 9.22386 14 9.5V12.5C14 12.7761 13.7761 13 13.5 13H8.5C8.22386 13 8 12.7761 8 12.5V9.5C8 9.22386 8.22386 9 8.5 9ZM1.5 2H6.5C6.77614 2 7 2.22386 7 2.5V5.5C7 5.77614 6.77614 6 6.5 6H1.5C1.22386 6 1 5.77614 1 5.5V2.5C1 2.22386 1.22386 2 1.5 2ZM1.5 9H6.5C6.77614 9 7 9.22386 7 9.5V12.5C7 12.7761 6.77614 13 6.5 13H1.5C1.22386 13 1 12.7761 1 12.5V9.5C1 9.22386 1.22386 9 1.5 9Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredPatients.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Aucun patient trouvé</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Aucun patient ne correspond à vos critères de recherche.
            </p>
            <Link href="/dashboard/new-patient">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Ajouter un patient
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 border">
                      <AvatarFallback className="bg-teal-100 text-teal-800">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Né(e) le {patient.dob}
                      </p>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Phone className="mr-1 h-3 w-3" />
                        <span>{patient.phone}</span>
                      </div>
                      <Badge
                        className={
                          patient.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 mt-2"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100 mt-2"
                        }
                      >
                        {patient.status === "active" ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Ouvrir le menu</span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Voir le dossier</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Créer un rendez-vous</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Modifier le patient</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className="text-muted-foreground">Médecin:</div>
                    <div>{patient.doctor}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className="text-muted-foreground">
                      Dernière visite:
                    </div>
                    <div>{patient.lastVisit}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className="text-muted-foreground">Prochain RDV:</div>
                    <div>{patient.nextAppointment || "Non programmé"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className="text-muted-foreground">Condition:</div>
                    <div>
                      {patient.condition.charAt(0).toUpperCase() +
                        patient.condition.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/dashboard/reception/patient/${patient.id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Dossier
                    </Button>
                  </Link>
                  <Link
                    href={`/dashboard/reception/new-appointment-admin/${patient.id}`}
                    className="flex-1"
                  >
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Rendez-vous
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Médecin</TableHead>
                  <TableHead>Dernière visite</TableHead>
                  <TableHead>Prochain RDV</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-teal-100 text-teal-800 text-xs">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Né(e) le {patient.dob}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{patient.phone}</div>
                      <div className="text-xs text-muted-foreground">
                        {patient.email}
                      </div>
                    </TableCell>
                    <TableCell>{patient.doctor}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>
                      {patient.nextAppointment || "Non programmé"}
                    </TableCell>
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
                    <TableCell>
                      <div className="flex space-x-1">
                        <Link
                          href={`/dashboard/reception/patient/${patient.id}`}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link
                          href={`/dashboard/reception/new-appointment-admin?patient=${patient.id}`}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-teal-600"
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <span>Modifier le patient</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
