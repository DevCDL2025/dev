"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Clock,
  UserCheck,
  UserPlus,
  Users,
  AlertTriangle,
  ArrowRight,
  MoreVertical,
  Coffee,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Types
type PatientStatus =
  | "waiting"
  | "in-progress"
  | "completed"
  | "no-show"
  | "delayed";
type Priority = "normal" | "urgent" | "vip";

interface WaitingPatient {
  id: number;
  name: string;
  appointmentTime: string;
  doctor: string;
  specialty: string;
  arrivalTime: Date;
  status: PatientStatus;
  priority: Priority;
  estimatedDuration: number; // in minutes
  notes?: string;
  room?: string;
}

// Mock data
const initialPatients: WaitingPatient[] = [
  {
    id: 1,
    name: "Kévin Mboumba",
    appointmentTime: "14:30",
    doctor: "Dr. Pierre Martin",
    specialty: "Cardiologie",
    arrivalTime: new Date(new Date().getTime() - 25 * 60000), // 25 minutes ago
    status: "waiting",
    priority: "normal",
    estimatedDuration: 30,
  },
  {
    id: 2,
    name: "Laura Missambo",
    appointmentTime: "14:45",
    doctor: "Dr. Sophie Bernard",
    specialty: "Dermatologie",
    arrivalTime: new Date(new Date().getTime() - 15 * 60000), // 15 minutes ago
    status: "waiting",
    priority: "normal",
    estimatedDuration: 20,
  },
  {
    id: 3,
    name: "Marc Essono",
    appointmentTime: "15:00",
    doctor: "Dr. Pierre Martin",
    specialty: "Cardiologie",
    arrivalTime: new Date(new Date().getTime() - 5 * 60000), // 5 minutes ago
    status: "waiting",
    priority: "urgent",
    estimatedDuration: 45,
    notes: "Patient avec douleurs thoraciques",
  },
  {
    id: 4,
    name: "Marc Essono",
    appointmentTime: "15:15",
    doctor: "Dr. Jean Dupont",
    specialty: "Médecine générale",
    arrivalTime: new Date(new Date().getTime() - 40 * 60000), // 40 minutes ago
    status: "in-progress",
    priority: "normal",
    estimatedDuration: 30,
    room: "Salle 3",
  },
  {
    id: 5,
    name: "Laurent Dubois",
    appointmentTime: "15:30",
    doctor: "Dr. Marie Laurent",
    specialty: "Neurologie",
    arrivalTime: new Date(), // Just arrived
    status: "waiting",
    priority: "vip",
    estimatedDuration: 60,
  },
  {
    id: 6,
    name: "Sophie Martin",
    appointmentTime: "14:00",
    doctor: "Dr. Jean Dupont",
    specialty: "Médecine générale",
    arrivalTime: new Date(new Date().getTime() - 60 * 60000), // 60 minutes ago
    status: "completed",
    priority: "normal",
    estimatedDuration: 15,
  },
  {
    id: 7,
    name: "Thomas Roux",
    appointmentTime: "13:45",
    doctor: "Dr. Sophie Bernard",
    specialty: "Dermatologie",
    arrivalTime: new Date(new Date().getTime() - 90 * 60000), // 90 minutes ago
    status: "no-show",
    priority: "normal",
    estimatedDuration: 30,
  },
];

// Helper functions
const calculateWaitTime = (arrivalTime: Date): number => {
  return Math.floor((new Date().getTime() - arrivalTime.getTime()) / 60000);
};

const formatWaitTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

const getStatusColor = (status: PatientStatus): string => {
  switch (status) {
    case "waiting":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "in-progress":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "no-show":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "delayed":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getStatusLabel = (status: PatientStatus): string => {
  switch (status) {
    case "waiting":
      return "En attente";
    case "in-progress":
      return "En consultation";
    case "completed":
      return "Terminé";
    case "no-show":
      return "Absent";
    case "delayed":
      return "Retardé";
    default:
      return status;
  }
};

const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "vip":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getPriorityLabel = (priority: Priority): string => {
  switch (priority) {
    case "urgent":
      return "Urgent";
    case "vip":
      return "VIP";
    default:
      return "Normal";
  }
};

export default function WaitingRoomPage() {
  const [patients, setPatients] = useState<WaitingPatient[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filter patients based on search query and filters
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDoctor =
      selectedDoctor === "all" || patient.doctor === selectedDoctor;
    const matchesStatus =
      selectedStatus === "all" || patient.status === selectedStatus;

    return matchesSearch && matchesDoctor && matchesStatus;
  });

  // Get unique doctors for filter
  const doctors = Array.from(new Set(patients.map((p) => p.doctor)));

  // Calculate statistics
  const waitingCount = patients.filter((p) => p.status === "waiting").length;
  const inProgressCount = patients.filter(
    (p) => p.status === "in-progress"
  ).length;
  const completedCount = patients.filter(
    (p) => p.status === "completed"
  ).length;
  const noShowCount = patients.filter((p) => p.status === "no-show").length;

  const averageWaitTime = Math.round(
    patients
      .filter((p) => p.status === "waiting" || p.status === "in-progress")
      .reduce((acc, p) => acc + calculateWaitTime(p.arrivalTime), 0) /
      (waitingCount + inProgressCount || 1)
  );

  // Handle patient status change
  const updatePatientStatus = (
    id: number,
    status: PatientStatus,
    room?: string
  ) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status, room: room || p.room } : p
      )
    );

    const patient = patients.find((p) => p.id === id);
    if (patient) {
      toast(
        `Patient ${
          status === "in-progress"
            ? "en consultation"
            : status === "completed"
            ? "terminé"
            : "mis à jour"
        }`,
        {
          description: `${patient.name} a été ${
            status === "in-progress"
              ? "appelé en consultation"
              : status === "completed"
              ? "marqué comme terminé"
              : "mis à jour"
          }.`,
        }
      );
    }
  };

  // Handle notify doctor
  const notifyDoctor = (patient: WaitingPatient) => {
    toast("Médecin notifié", {
      description: `${patient.doctor} a été notifié que ${patient.name} est prêt.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Salle d'attente</h1>
          <p className="text-muted-foreground">
            Gérez les patients présents et les temps d'attente
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
              <CardDescription>Temps d'attente et patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Temps d'attente moyen
                  </span>
                  <span className="text-2xl font-bold">
                    {formatWaitTime(averageWaitTime)}
                  </span>
                </div>
                <Progress
                  value={Math.min((averageWaitTime / 60) * 100, 100)}
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">En attente</p>
                  <p className="text-2xl font-bold">{waitingCount}</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">En cours</p>
                  <p className="text-2xl font-bold">{inProgressCount}</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">Terminés</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">Absents</p>
                  <p className="text-2xl font-bold">{noShowCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Recherche</Label>
                <Input
                  id="search"
                  placeholder="Nom du patient ou médecin"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor-filter">Médecin</Label>
                <Select
                  value={selectedDoctor}
                  onValueChange={setSelectedDoctor}
                >
                  <SelectTrigger id="doctor-filter">
                    <SelectValue placeholder="Sélectionner un médecin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les médecins</SelectItem>
                    {doctors.map((doctor, index) => (
                      <SelectItem key={index} value={doctor}>
                        {doctor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-filter">Statut</Label>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="waiting">En attente</SelectItem>
                    <SelectItem value="in-progress">En consultation</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="no-show">Absent</SelectItem>
                    <SelectItem value="delayed">Retardé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <Tabs defaultValue="waiting">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="waiting">
                    En attente ({waitingCount})
                  </TabsTrigger>
                  <TabsTrigger value="in-progress">
                    En cours ({inProgressCount})
                  </TabsTrigger>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                </TabsList>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      Statistiques détaillées
                    </span>
                  </Button>
                </div>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="waiting">
              <TabsContent value="waiting" className="space-y-4">
                {filteredPatients.filter((p) => p.status === "waiting").length >
                0 ? (
                  <div className="space-y-4">
                    {filteredPatients
                      .filter((p) => p.status === "waiting")
                      .sort((a, b) => {
                        // Sort by priority first (urgent > vip > normal)
                        if (a.priority !== b.priority) {
                          if (a.priority === "urgent") return -1;
                          if (b.priority === "urgent") return 1;
                          if (a.priority === "vip") return -1;
                          if (b.priority === "vip") return 1;
                        }
                        // Then by wait time (longest first)
                        return (
                          calculateWaitTime(b.arrivalTime) -
                          calculateWaitTime(a.arrivalTime)
                        );
                      })
                      .map((patient) => (
                        <PatientWaitingCard
                          key={patient.id}
                          patient={patient}
                          onStatusChange={updatePatientStatus}
                          onNotifyDoctor={notifyDoctor}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Coffee className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">
                      Aucun patient en attente
                    </p>
                    <p className="text-muted-foreground">
                      Tous les patients ont été pris en charge ou aucun n'est
                      encore arrivé.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="in-progress" className="space-y-4">
                {filteredPatients.filter((p) => p.status === "in-progress")
                  .length > 0 ? (
                  <div className="space-y-4">
                    {filteredPatients
                      .filter((p) => p.status === "in-progress")
                      .map((patient) => (
                        <PatientInProgressCard
                          key={patient.id}
                          patient={patient}
                          onStatusChange={updatePatientStatus}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Coffee className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">
                      Aucune consultation en cours
                    </p>
                    <p className="text-muted-foreground">
                      Aucun patient n'est actuellement en consultation.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                {filteredPatients.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPatients.map((patient) =>
                      patient.status === "waiting" ? (
                        <PatientWaitingCard
                          key={patient.id}
                          patient={patient}
                          onStatusChange={updatePatientStatus}
                          onNotifyDoctor={notifyDoctor}
                        />
                      ) : patient.status === "in-progress" ? (
                        <PatientInProgressCard
                          key={patient.id}
                          patient={patient}
                          onStatusChange={updatePatientStatus}
                        />
                      ) : (
                        <PatientCompletedCard
                          key={patient.id}
                          patient={patient}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Aucun patient trouvé</p>
                    <p className="text-muted-foreground">
                      Essayez de modifier vos filtres de recherche.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Patient Card Components
interface PatientCardProps {
  patient: WaitingPatient;
  onStatusChange?: (id: number, status: PatientStatus, room?: string) => void;
  onNotifyDoctor?: (patient: WaitingPatient) => void;
}

function PatientWaitingCard({
  patient,
  onStatusChange,
  onNotifyDoctor,
}: PatientCardProps) {
  const waitTime = calculateWaitTime(patient.arrivalTime);
  const [roomNumber, setRoomNumber] = useState("");
  const [showRoomDialog, setShowRoomDialog] = useState(false);

  const handleCallPatient = () => {
    setShowRoomDialog(true);
  };

  const confirmCallPatient = () => {
    if (onStatusChange) {
      onStatusChange(patient.id, "in-progress", roomNumber);
    }
    setShowRoomDialog(false);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback className="bg-teal-100 text-teal-800">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{patient.name}</p>
              {patient.priority !== "normal" && (
                <Badge className={getPriorityColor(patient.priority)}>
                  {getPriorityLabel(patient.priority)}
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              RDV: {patient.appointmentTime}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(patient.status)}>
            {getStatusLabel(patient.status)}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCallPatient}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Appeler en consultation
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onNotifyDoctor && onNotifyDoctor(patient)}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifier le médecin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onStatusChange && onStatusChange(patient.id, "delayed")
                }
              >
                <Clock className="mr-2 h-4 w-4" />
                Marquer comme retardé
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onStatusChange && onStatusChange(patient.id, "no-show")
                }
              >
                <XCircle className="mr-2 h-4 w-4" />
                Marquer comme absent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {patient.doctor} • {patient.specialty}
          </span>
          <div className="flex items-center">
            <span
              className={
                waitTime > 30
                  ? "text-red-600 font-medium"
                  : "text-muted-foreground"
              }
            >
              En attente depuis {formatWaitTime(waitTime)}
            </span>
            {waitTime > 30 && (
              <AlertTriangle className="ml-1 h-4 w-4 text-red-600" />
            )}
          </div>
        </div>

        {patient.notes && (
          <div className="mt-2 text-sm bg-amber-50 p-2 rounded-md">
            <span className="font-medium">Note:</span> {patient.notes}
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNotifyDoctor && onNotifyDoctor(patient)}
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifier
        </Button>
        <Button
          size="sm"
          className="bg-teal-600 hover:bg-teal-700"
          onClick={handleCallPatient}
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Appeler
        </Button>
      </div>

      <Dialog open={showRoomDialog} onOpenChange={setShowRoomDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appeler en consultation</DialogTitle>
            <DialogDescription>
              Indiquez la salle où le patient sera reçu.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room" className="text-right">
                Salle
              </Label>
              <Input
                id="room"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="col-span-3"
                placeholder="ex: Salle 1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoomDialog(false)}>
              Annuler
            </Button>
            <Button onClick={confirmCallPatient}>Confirmer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PatientInProgressCard({ patient, onStatusChange }: PatientCardProps) {
  const consultationTime = calculateWaitTime(patient.arrivalTime);
  const estimatedProgress = Math.min(
    (consultationTime / patient.estimatedDuration) * 100,
    100
  );

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback className="bg-teal-100 text-teal-800">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{patient.name}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              RDV: {patient.appointmentTime}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(patient.status)}>
            {getStatusLabel(patient.status)}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  onStatusChange && onStatusChange(patient.id, "completed")
                }
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Marquer comme terminé
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {patient.doctor} • {patient.specialty}
          </span>
          <span className="text-muted-foreground">
            {patient.room || "Salle non spécifiée"}
          </span>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Progression estimée</span>
            <span>{Math.round(estimatedProgress)}%</span>
          </div>
          <Progress value={estimatedProgress} className="h-2" />

          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              En consultation depuis {formatWaitTime(consultationTime)}
            </span>
            <span className="text-muted-foreground">
              Durée prévue: {patient.estimatedDuration} min
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          onClick={() =>
            onStatusChange && onStatusChange(patient.id, "completed")
          }
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Terminer
        </Button>
      </div>
    </div>
  );
}

function PatientCompletedCard({ patient }: PatientCardProps) {
  return (
    <div className="rounded-lg border p-4 opacity-75">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback className="bg-gray-100 text-gray-800">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{patient.name}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              RDV: {patient.appointmentTime}
            </div>
          </div>
        </div>
        <Badge className={getStatusColor(patient.status)}>
          {getStatusLabel(patient.status)}
        </Badge>
      </div>

      <div className="mt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {patient.doctor} • {patient.specialty}
          </span>
        </div>
      </div>
    </div>
  );
}
