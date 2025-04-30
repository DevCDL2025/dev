"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon, UserPlus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function NewPatientPage() {
  const [birthDate, setBirthDate] = useState<Date>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simuler un délai d'enregistrement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Patient créé avec succès", {
        description: "Le nouveau patient a été ajouté à la base de données.",
      });

      // Réinitialiser le formulaire ou rediriger
      // window.location.href = "/dashboard/patients"
    } catch (error) {
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de la création du patient.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Nouveau patient</h1>
        <p className="text-muted-foreground">
          Créer un nouveau dossier patient dans le système
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="personal">
              Informations personnelles
            </TabsTrigger>
            <TabsTrigger value="medical">Informations médicales</TabsTrigger>
            <TabsTrigger value="insurance">Assurance</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Entrez les informations personnelles du patient
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Nom de famille"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Prénom" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Date de naissance</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !birthDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {birthDate
                            ? format(birthDate, "PPP", { locale: fr })
                            : "Sélectionnez une date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={birthDate}
                          onSelect={setBirthDate}
                          initialFocus
                          disabled={(date) => date > new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Genre</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Sélectionnez un genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Homme</SelectItem>
                        <SelectItem value="female">Femme</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea id="address" placeholder="Adresse complète" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" placeholder="Ville" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input id="postalCode" placeholder="Code postal" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Numéro de téléphone"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Adresse email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contact d'urgence</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="Nom et numéro de téléphone"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    const medicalTab = document.querySelector(
                      '[data-value="medical"]'
                    ) as HTMLElement;
                    if (medicalTab) {
                      medicalTab.click();
                    }
                  }}
                >
                  Suivant
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Informations médicales</CardTitle>
                <CardDescription>
                  Entrez les informations médicales du patient
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Groupe sanguin</Label>
                  <Select>
                    <SelectTrigger id="bloodType">
                      <SelectValue placeholder="Sélectionnez un groupe sanguin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="unknown">Inconnu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Allergies connues</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="allergy-none" />
                      <label
                        htmlFor="allergy-none"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Aucune allergie connue
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="allergy-medication" />
                      <label
                        htmlFor="allergy-medication"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Médicaments
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="allergy-food" />
                      <label
                        htmlFor="allergy-food"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Aliments
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="allergy-latex" />
                      <label
                        htmlFor="allergy-latex"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Latex
                      </label>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Détails des allergies"
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Conditions médicales existantes</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="condition-none" />
                      <label
                        htmlFor="condition-none"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Aucune condition connue
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="condition-diabetes" />
                      <label
                        htmlFor="condition-diabetes"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Diabète
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="condition-hypertension" />
                      <label
                        htmlFor="condition-hypertension"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hypertension
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="condition-asthma" />
                      <label
                        htmlFor="condition-asthma"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Asthme
                      </label>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Autres conditions médicales"
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentMedications">
                    Médicaments actuels
                  </Label>
                  <Textarea
                    id="currentMedications"
                    placeholder="Liste des médicaments actuellement pris"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surgicalHistory">
                    Antécédents chirurgicaux
                  </Label>
                  <Textarea
                    id="surgicalHistory"
                    placeholder="Interventions chirurgicales passées"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="familyHistory">Antécédents familiaux</Label>
                  <Textarea
                    id="familyHistory"
                    placeholder="Maladies héréditaires ou conditions familiales"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const element = document.querySelector(
                      '[data-value="personal"]'
                    ) as HTMLButtonElement;
                    if (element) {
                      element.click();
                    }
                  }}
                >
                  Précédent
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    const element = document.querySelector(
                      '[data-value="insurance"]'
                    ) as HTMLButtonElement;
                    if (element) {
                      element.click();
                    }
                  }}
                >
                  Suivant
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="insurance">
            <Card>
              <CardHeader>
                <CardTitle>Informations d'assurance</CardTitle>
                <CardDescription>
                  Entrez les informations d'assurance du patient
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Type d'assurance</Label>
                  <RadioGroup defaultValue="public">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="insurance-public" />
                      <Label htmlFor="insurance-public">
                        Assurance maladie publique
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="insurance-private" />
                      <Label htmlFor="insurance-private">
                        Assurance privée
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="insurance-both" />
                      <Label htmlFor="insurance-both">Les deux</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceNumber">
                    Numéro d'assurance maladie
                  </Label>
                  <Input
                    id="insuranceNumber"
                    placeholder="Numéro d'assurance maladie"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">
                    Compagnie d'assurance privée
                  </Label>
                  <Input
                    id="insuranceProvider"
                    placeholder="Nom de la compagnie d'assurance"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Ayant droit</Label>
                  <Select>
                    <SelectTrigger id="relationship">
                      <SelectValue placeholder="Sélectionnez une relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Soi-même</SelectItem>
                      <SelectItem value="spouse">Conjoint(e)</SelectItem>
                      <SelectItem value="child">Enfant</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">
                    Informations supplémentaires
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Informations supplémentaires concernant l'assurance"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const medicalTab = document.querySelector(
                      '[data-value="medical"]'
                    ) as HTMLButtonElement;
                    if (medicalTab) {
                      medicalTab.click();
                    }
                  }}
                >
                  Précédent
                </Button>
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>Enregistrement en cours...</>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Créer le patient
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
