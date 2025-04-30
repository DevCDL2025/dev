// app/actions/user/create-user.ts
"use server";

import prisma from "@/lib/prisma";
import {
  UserSchema,
  PatientSchema,
  MedecinSchema,
  ReceptionnisteSchema,
} from "@/lib/validations/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export type CreateUserResponse = {
  success: boolean;
  message: string;
  userId?: number;
};

export async function createUser(
  userData: unknown,
  profileData: unknown,
  role: "patient" | "medecin" | "receptionniste"
): Promise<CreateUserResponse> {
  try {
    // Validation des données utilisateur de base
    const validatedUser = UserSchema.parse(userData);

    // Vérification si l'email existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email: validatedUser.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Un utilisateur avec cet email existe déjà.",
      };
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(validatedUser.password, 12);

    // Création de l'utilisateur dans la base de données
    const user = await prisma.utilisateur.create({
      data: {
        email: validatedUser.email,
        mot_de_passe_hash: hashedPassword,
        role: role,
      },
    });

    // Création du profil spécifique selon le rôle
    switch (role) {
      case "patient":
        const patientData = PatientSchema.parse(profileData);
        await prisma.patient.create({
          data: {
            utilisateur_id: user.id,
            ...patientData,
            date_naissance: new Date(patientData.date_naissance),
          },
        });
        break;

      case "medecin":
        const medecinData = MedecinSchema.parse(profileData);
        await prisma.medecin.create({
          data: {
            utilisateur_id: user.id,
            ...medecinData,
          },
        });
        break;

      case "receptionniste":
        const receptionnisteData = ReceptionnisteSchema.parse(profileData);
        await prisma.receptionniste.create({
          data: {
            utilisateur_id: user.id,
            ...receptionnisteData,
          },
        });
        break;
    }

    revalidatePath("/admin/utilisateurs");
    return {
      success: true,
      message: "Utilisateur créé avec succès.",
      userId: user.id,
    };
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue lors de la création de l'utilisateur.",
    };
  }
}
