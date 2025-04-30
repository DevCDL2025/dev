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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function ProfilePage() {
  // Mock user data
  const [profileData, setProfileData] = useState({
    firstName: "Marc",
    lastName: "Mboumba",
    email: "patient@example.com",
    phone: "06 12 34 56 78",
    birthDate: "15/05/1980",
    gender: "male",
    address: "Bessieux",
    city: "Libreville",
    postalCode: "69000",
    country: "France",
    insuranceProvider: "CPAM",
    insuranceNumber: "1 23 45 67 890 123 45",
    emergencyContactName: "Marie Dupont",
    emergencyContactPhone: "06 98 76 54 32",
    emergencyContactRelation: "Épouse",
    allergies: "Pénicilline, arachides",
    chronicConditions: "Hypertension",
    currentMedications: "Lisinopril 10mg, 1 comprimé par jour",
    bloodType: "A+",
    height: "175",
    weight: "70",
    smoker: false,
    alcoholConsumption: "occasional",
    physicalActivity: "moderate",
    dietaryPreferences: "Équilibrée",
    notificationsEmail: true,
    notificationsSMS: true,
    dataSharing: true,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Profil mis à jour", {
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mon profil</h1>
        <p className="text-muted-foreground">
          Consultez et modifiez vos informations personnelles
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="w-full md:w-64 h-fit">
          <CardContent className="p-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src="/placeholder.svg"
                alt={`${profileData.firstName} ${profileData.lastName}`}
              />
              <AvatarFallback className="text-xl bg-teal-100 text-teal-800">
                {profileData.firstName[0]}
                {profileData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold text-center">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {profileData.email}
            </p>
            <Button variant="outline" className="w-full">
              Changer la photo
            </Button>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="personal">
                Informations personnelles
              </TabsTrigger>
              <TabsTrigger value="medical">Informations médicales</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Modifiez vos informations personnelles et vos coordonnées
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            handleChange("firstName", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            handleChange("lastName", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Date de naissance</Label>
                        <Input
                          id="birthDate"
                          value={profileData.birthDate}
                          onChange={(e) =>
                            handleChange("birthDate", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Genre</Label>
                        <Select
                          value={profileData.gender}
                          onValueChange={(value) =>
                            handleChange("gender", value)
                          }
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Sélectionnez votre genre" />
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
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input
                          id="postalCode"
                          value={profileData.postalCode}
                          onChange={(e) =>
                            handleChange("postalCode", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Input
                          id="country"
                          value={profileData.country}
                          onChange={(e) =>
                            handleChange("country", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="insuranceProvider">
                          Assurance maladie
                        </Label>
                        <Input
                          id="insuranceProvider"
                          value={profileData.insuranceProvider}
                          onChange={(e) =>
                            handleChange("insuranceProvider", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="insuranceNumber">
                          Numéro de sécurité sociale
                        </Label>
                        <Input
                          id="insuranceNumber"
                          value={profileData.insuranceNumber}
                          onChange={(e) =>
                            handleChange("insuranceNumber", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-md font-medium">Contact d'urgence</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactName">Nom</Label>
                          <Input
                            id="emergencyContactName"
                            value={profileData.emergencyContactName}
                            onChange={(e) =>
                              handleChange(
                                "emergencyContactName",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactPhone">
                            Téléphone
                          </Label>
                          <Input
                            id="emergencyContactPhone"
                            value={profileData.emergencyContactPhone}
                            onChange={(e) =>
                              handleChange(
                                "emergencyContactPhone",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactRelation">
                            Relation
                          </Label>
                          <Input
                            id="emergencyContactRelation"
                            value={profileData.emergencyContactRelation}
                            onChange={(e) =>
                              handleChange(
                                "emergencyContactRelation",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-5">
                    <Button
                      type="submit"
                      className="ml-auto bg-teal-600 hover:bg-teal-700"
                    >
                      Enregistrer les modifications
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="medical">
              <Card>
                <CardHeader>
                  <CardTitle>Informations médicales</CardTitle>
                  <CardDescription>
                    Mettez à jour vos informations médicales pour un meilleur
                    suivi
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        placeholder="Listez vos allergies connues"
                        value={profileData.allergies}
                        onChange={(e) =>
                          handleChange("allergies", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chronicConditions">
                        Maladies chroniques
                      </Label>
                      <Textarea
                        id="chronicConditions"
                        placeholder="Listez vos maladies chroniques"
                        value={profileData.chronicConditions}
                        onChange={(e) =>
                          handleChange("chronicConditions", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentMedications">
                        Médicaments actuels
                      </Label>
                      <Textarea
                        id="currentMedications"
                        placeholder="Listez vos médicaments actuels et leur posologie"
                        value={profileData.currentMedications}
                        onChange={(e) =>
                          handleChange("currentMedications", e.target.value)
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodType">Groupe sanguin</Label>
                        <Select
                          value={profileData.bloodType}
                          onValueChange={(value) =>
                            handleChange("bloodType", value)
                          }
                        >
                          <SelectTrigger id="bloodType">
                            <SelectValue placeholder="Sélectionnez" />
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
                            <SelectItem value="unknown">
                              Je ne sais pas
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Taille (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={profileData.height}
                          onChange={(e) =>
                            handleChange("height", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Poids (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          value={profileData.weight}
                          onChange={(e) =>
                            handleChange("weight", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smoker">Fumeur</Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="smoker"
                            checked={profileData.smoker}
                            onCheckedChange={(checked: string | boolean) =>
                              handleChange("smoker", checked)
                            }
                          />
                          <Label htmlFor="smoker">
                            {profileData.smoker ? "Oui" : "Non"}
                          </Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alcoholConsumption">
                          Consommation d'alcool
                        </Label>
                        <Select
                          value={profileData.alcoholConsumption}
                          onValueChange={(value) =>
                            handleChange("alcoholConsumption", value)
                          }
                        >
                          <SelectTrigger id="alcoholConsumption">
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Aucune</SelectItem>
                            <SelectItem value="occasional">
                              Occasionnelle
                            </SelectItem>
                            <SelectItem value="moderate">Modérée</SelectItem>
                            <SelectItem value="regular">Régulière</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="physicalActivity">
                          Activité physique
                        </Label>
                        <Select
                          value={profileData.physicalActivity}
                          onValueChange={(value) =>
                            handleChange("physicalActivity", value)
                          }
                        >
                          <SelectTrigger id="physicalActivity">
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Aucune</SelectItem>
                            <SelectItem value="light">Légère</SelectItem>
                            <SelectItem value="moderate">Modérée</SelectItem>
                            <SelectItem value="intense">Intense</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dietaryPreferences">
                          Régime alimentaire
                        </Label>
                        <Input
                          id="dietaryPreferences"
                          value={profileData.dietaryPreferences}
                          onChange={(e) =>
                            handleChange("dietaryPreferences", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="ml-auto bg-teal-600 hover:bg-teal-700"
                    >
                      Enregistrer les modifications
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences</CardTitle>
                  <CardDescription>
                    Gérez vos préférences de notifications et de confidentialité
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-md font-medium">Notifications</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notificationsEmail">
                            Notifications par email
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir des rappels de rendez-vous par email
                          </p>
                        </div>
                        <Switch
                          id="notificationsEmail"
                          checked={profileData.notificationsEmail}
                          onCheckedChange={(checked: string | boolean) =>
                            handleChange("notificationsEmail", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notificationsSMS">
                            Notifications par SMS
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recevoir des rappels de rendez-vous par SMS
                          </p>
                        </div>
                        <Switch
                          id="notificationsSMS"
                          checked={profileData.notificationsSMS}
                          onCheckedChange={(checked: string | boolean) =>
                            handleChange("notificationsSMS", checked)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-md font-medium">Confidentialité</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dataSharing">
                            Partage de données
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Autoriser le partage de vos données médicales entre
                            professionnels de santé
                          </p>
                        </div>
                        <Switch
                          id="dataSharing"
                          checked={profileData.dataSharing}
                          onCheckedChange={(checked: string | boolean) =>
                            handleChange("dataSharing", checked)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-md font-medium">Sécurité</h3>
                      <Button variant="outline" type="button">
                        Changer le mot de passe
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-5">
                    <Button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Enregistrer les préférences
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
