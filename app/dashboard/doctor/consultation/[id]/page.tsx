"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  FileText,
  Folder,
  Pill,
  Plus,
  Save,
  Trash2,
  User,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import Link from "next/link";

// Mock data for a patient
const patientData = {
  id: "7",
  name: "Daniel Mboumba",
  age: 52,
  gender: "Homme",
  birthDate: "22/08/1972",
  phone: "06 34 56 78 90",
  email: "daniel.mboumba@example.com",
  address: "Avenue du Colonel Parant, Libreville, Gabon",
  insuranceProvider: "CNAMGS",
  insuranceNumber: "7 89 01 23 456 78 90",
  bloodType: "O+",
  allergies: "Sulfamides, crustacés",
  chronicConditions: "Diabète type 2",
  currentMedications: "Metformine 850mg, 2 comprimés par jour",
};

// Mock data for previous consultations
const previousConsultations = [
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
    date: "15 décembre 2024",
    doctor: "Dr. Jean-Baptiste Ngoua",
    specialty: "Cardiologie",
    reason: "Douleurs thoraciques",
    diagnosis: "Anxiété",
    notes:
      "Douleurs thoraciques liées à l'anxiété. ECG normal. Recommandation de techniques de relaxation.",
    prescriptions: [],
  },
];

// Mock data for test results
const testResults = [
  {
    id: 1,
    name: "Électrocardiogramme (ECG)",
    date: "15 mars 2025",
    provider: "Dr. Jean-Baptiste Ngoua",
    results: "Normal",
    notes: "Rythme cardiaque régulier, pas d'anomalies détectées",
    file: "ecg_15032025.pdf",
  },
  {
    id: 2,
    name: "Analyse de sang complète",
    date: "15 mars 2025",
    provider: "Laboratoire Central",
    results: "Voir rapport détaillé",
    notes: "Cholestérol légèrement élevé, autres valeurs dans les normes",
    file: "blood_test_15032025.pdf",
  },
];

// Current appointment data
const appointmentData = {
  id: "123",
  patient: "Daniel Mboumba",
  date: "28 avril 2025",
  time: "14:30",
  reason: "Suivi cardiaque",
  status: "in-progress",
};

export default function ConsultationPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [consultationData, setConsultationData] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    diagnosis: "",
    followUp: "",
  });
  const [medications, setMedications] = useState<
    Array<{ name: string; dosage: string; instructions: string }>
  >([{ name: "", dosage: "", instructions: "" }]);
  const [tests, setTests] = useState<
    Array<{ name: string; instructions: string }>
  >([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const [standardExams, setStandardExams] = useState<Record<string, string>>(
    {}
  );
  const [customExams, setCustomExams] = useState<
    { name: string; result: string }[]
  >([]);

  const handleCustomExamChange = (
    index: number,
    field: "name" | "result",
    value: string
  ) => {
    const updated = [...customExams];
    updated[index][field] = value;
    setCustomExams(updated);
  };

  const addCustomExam = () => {
    setCustomExams([...customExams, { name: "", result: "" }]);
  };

  const removeCustomExam = (index: number) => {
    const updated = [...customExams];
    updated.splice(index, 1);
    setCustomExams(updated);
  };

  // Handle form changes
  const handleConsultationChange = (field: string, value: string) => {
    setConsultationData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle medication changes
  const handleMedicationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value,
    };
    setMedications(updatedMedications);
  };

  // Add new medication field
  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", instructions: "" },
    ]);
  };

  // Remove medication field
  const removeMedication = (index: number) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(
      updatedMedications.length
        ? updatedMedications
        : [{ name: "", dosage: "", instructions: "" }]
    );
  };

  // Add new test field
  const addTest = () => {
    setTests([...tests, { name: "", instructions: "" }]);
  };

  // Remove test field
  const removeTest = (index: number) => {
    const updatedTests = tests.filter((_, i) => i !== index);
    setTests(updatedTests);
  };

  // Handle test changes
  const handleTestChange = (index: number, field: string, value: string) => {
    const updatedTests = [...tests];
    updatedTests[index] = { ...updatedTests[index], [field]: value };
    setTests(updatedTests);
  };

  // Save consultation as draft
  const saveDraft = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast("Brouillon enregistré", {
        description: "La consultation a été enregistrée en tant que brouillon.",
      });
      setIsSaving(false);
    }, 1000);
  };

  // Complete consultation
  const completeConsultation = () => {
    setIsCompleting(true);
    // Validate form
    if (!consultationData.diagnosis || !consultationData.assessment) {
      toast.error("Formulaire incomplet", {
        description: "Veuillez remplir au moins le diagnostic et l'évaluation.",
      });
      setIsCompleting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast("Consultation terminée", {
        description:
          "La consultation a été enregistrée et terminée avec succès.",
      });
      setIsCompleting(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Consultation</h1>
          <p className="text-muted-foreground">
            {appointmentData.date} à {appointmentData.time} -{" "}
            {appointmentData.reason}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={
              appointmentData.status === "in-progress"
                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                : "bg-green-100 text-green-800 hover:bg-green-100"
            }
          >
            {appointmentData.status === "in-progress" ? "En cours" : "Terminé"}
          </Badge>
          <Button variant="outline" onClick={() => router.back()}>
            Retour
          </Button>
          <Button variant="outline" onClick={saveDraft} disabled={isSaving}>
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={completeConsultation}
            disabled={isCompleting}
          >
            {isCompleting ? "Finalisation..." : "Terminer la consultation"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient information column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Patient</CardTitle>
                  <CardDescription>Informations du patient</CardDescription>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-teal-100 text-teal-800">
                    {patientData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Button
                variant={"outline"}
                onClick={() => {
                  router.push("/dashboard/doctor/patient/1");
                }}
              >
                <Folder />
                Dossier patient
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{patientData.name}</h3>
                <div className="flex flex-col text-sm space-y-1 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>
                      {patientData.age} ans - {patientData.gender}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Né(e) le {patientData.birthDate}</span>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="contact">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Coordonnées
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Téléphone:</span>{" "}
                        {patientData.phone}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {patientData.email}
                      </p>
                      <p>
                        <span className="font-medium">Adresse:</span>{" "}
                        {patientData.address}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="insurance">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Assurance
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Assurance:</span>{" "}
                        {patientData.insuranceProvider}
                      </p>
                      <p>
                        <span className="font-medium">Numéro:</span>{" "}
                        {patientData.insuranceNumber}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="medical">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Informations médicales
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Groupe sanguin:</span>{" "}
                        {patientData.bloodType}
                      </p>
                      <p>
                        <span className="font-medium">Allergies:</span>{" "}
                        {patientData.allergies}
                      </p>
                      <p>
                        <span className="font-medium">
                          Maladies chroniques:
                        </span>{" "}
                        {patientData.chronicConditions}
                      </p>
                      <p>
                        <span className="font-medium">
                          Médicaments actuels:
                        </span>{" "}
                        {patientData.currentMedications}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Consultations précédentes</CardTitle>
              <CardDescription>Historique des consultations</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto">
              {previousConsultations.length > 0 ? (
                <div className="space-y-4">
                  {previousConsultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="border rounded-md p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{consultation.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {consultation.reason}
                          </p>
                        </div>
                        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                          {consultation.diagnosis}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{consultation.notes}</p>
                      {consultation.prescriptions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Prescriptions:
                          </p>
                          <ul className="text-sm text-muted-foreground">
                            {consultation.prescriptions.map(
                              (prescription, idx) => (
                                <li key={idx} className="flex items-start">
                                  <Pill className="h-3 w-3 mr-1 mt-1" />
                                  <span>
                                    {prescription.name} {prescription.dosage} -{" "}
                                    {prescription.instructions}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Aucune consultation précédente</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Résultats d'examens</CardTitle>
              <CardDescription>Examens et analyses récents</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-y-auto">
              {testResults.length > 0 ? (
                <div className="space-y-4">
                  {testResults.map((test) => (
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
                      <p className="text-sm text-muted-foreground mb-2">
                        {test.notes}
                      </p>
                      <Link href="/dashboard/doctor/medical-reports/1">
                        <Button variant="outline" size="sm" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Voir le rapport
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Aucun résultat d'examen disponible</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Consultation form column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Notes de consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="motif">Motif de la consultation</Label>
                <Textarea
                  id="motif"
                  placeholder="Décrivez les motifs de la consultation"
                  value={consultationData.subjective}
                  onChange={(e) =>
                    handleConsultationChange("motif", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="">
                <Label htmlFor="examen_gen" className="pb-4">
                  Examen Général
                </Label>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Examens généraux standards */}
                    {[
                      "Température",
                      "SpO2",
                      "Taille",
                      "FC",
                      "TA",
                      "Glycémie",
                      "FR",
                      "Poids",
                    ].map((examName, index) => (
                      <div key={index} className="">
                        <div className="col-span-12 md:col-span-6 space-y-2">
                          <Input
                            id={`standard-exam-${index}`}
                            placeholder={`Résultat de ${examName}`}
                            value={standardExams[examName] || ""}
                            onChange={(e) =>
                              setStandardExams({
                                ...standardExams,
                                [examName]: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Examens personnalisés */}
                  {customExams.map((exam, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-2 justify-center items-center py-2 w-full"
                    >
                      <div className="space-y-2 w-full">
                        <Label htmlFor={`custom-exam-name-${index}`}>Nom</Label>
                        <Input
                          id={`custom-exam-name-${index}`}
                          placeholder="Nom de l'examen"
                          value={exam.name}
                          onChange={(e) =>
                            handleCustomExamChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2 w-full">
                        <Label htmlFor={`custom-exam-result-${index}`}>
                          Résultat
                        </Label>
                        <Input
                          id={`custom-exam-result-${index}`}
                          placeholder="Résultat"
                          value={exam.result}
                          onChange={(e) =>
                            handleCustomExamChange(
                              index,
                              "result",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCustomExam(index)}
                          className="h-10 w-10 rounded-full"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Ajouter un examen personnalisé */}
                  <Button
                    variant="outline"
                    onClick={addCustomExam}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un examen
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">Examen physique</Label>
                <Textarea
                  id="objective"
                  placeholder="Notez vos observations"
                  value={consultationData.objective}
                  onChange={(e) =>
                    handleConsultationChange("objective", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assessment">Examens complémentaire</Label>
                <Textarea
                  id="assessment"
                  placeholder="Votre évaluation de l'état du patient"
                  value={consultationData.assessment}
                  onChange={(e) =>
                    handleConsultationChange("assessment", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnostic</Label>
                  <Input
                    id="diagnosis"
                    placeholder="Diagnostic principal"
                    value={consultationData.diagnosis}
                    onChange={(e) =>
                      handleConsultationChange("diagnosis", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="followUp">Suivi recommandé</Label>
                  <Input
                    id="followUp"
                    placeholder="Ex: Dans 3 mois"
                    value={consultationData.followUp}
                    onChange={(e) =>
                      handleConsultationChange("followUp", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Plan de traitement</Label>
                <Textarea
                  id="plan"
                  placeholder="Plan de traitement et recommandations"
                  value={consultationData.plan}
                  onChange={(e) =>
                    handleConsultationChange("plan", e.target.value)
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ordonnance</CardTitle>
              <CardDescription>Prescriptions de médicaments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((medication, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 items-start"
                >
                  <div className="col-span-12 md:col-span-4 space-y-2">
                    <Label htmlFor={`medication-name-${index}`}>
                      Médicament
                    </Label>
                    <Input
                      id={`medication-name-${index}`}
                      placeholder="Nom du médicament"
                      value={medication.name}
                      onChange={(e) =>
                        handleMedicationChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-5 md:col-span-2 space-y-2">
                    <Label htmlFor={`medication-dosage-${index}`}>Dosage</Label>
                    <Input
                      id={`medication-dosage-${index}`}
                      placeholder="Ex: 10mg"
                      value={medication.dosage}
                      onChange={(e) =>
                        handleMedicationChange(index, "dosage", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-7 md:col-span-5 space-y-2">
                    <Label htmlFor={`medication-instructions-${index}`}>
                      Instructions
                    </Label>
                    <Input
                      id={`medication-instructions-${index}`}
                      placeholder="Ex: 1 comprimé par jour"
                      value={medication.instructions}
                      onChange={(e) =>
                        handleMedicationChange(
                          index,
                          "instructions",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="col-span-12 md:col-span-1 flex justify-end md:justify-center items-end h-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMedication(index)}
                      className="h-10 w-10 rounded-full"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addMedication}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un médicament
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Examens complémentaires</CardTitle>
              <CardDescription>
                Prescriptions d'examens et analyses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tests.length > 0 ? (
                tests.map((test, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-2 items-start"
                  >
                    <div className="col-span-12 md:col-span-5 space-y-2">
                      <Label htmlFor={`test-name-${index}`}>Examen</Label>
                      <Input
                        id={`test-name-${index}`}
                        placeholder="Nom de l'examen"
                        value={test.name}
                        onChange={(e) =>
                          handleTestChange(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6 space-y-2">
                      <Label htmlFor={`test-instructions-${index}`}>
                        Instructions
                      </Label>
                      <Input
                        id={`test-instructions-${index}`}
                        placeholder="Instructions spécifiques"
                        value={test.instructions}
                        onChange={(e) =>
                          handleTestChange(
                            index,
                            "instructions",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-12 md:col-span-1 flex justify-end md:justify-center items-end h-full">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTest(index)}
                        className="h-10 w-10 rounded-full"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Aucun examen prescrit</p>
                </div>
              )}

              <Button variant="outline" onClick={addTest} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un examen
              </Button>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={completeConsultation}
                disabled={isCompleting}
              >
                <Save className="h-4 w-4 mr-2" />
                {isCompleting ? "Finalisation..." : "Terminer la consultation"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
