// app/actions/auth/register.ts
"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

// Schéma de validation étendu
const RegisterSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

export type RegisterState = {
  errors?: {
    email?: string[];
    password?: string[];
    firstName?: string[];
    lastName?: string[];
  };
  message?: string | null;
  success?: boolean;
  userId?: string;
};

export async function registerPatient(
  prevState: RegisterState | null,
  formData: FormData
): Promise<RegisterState> {
  // Extraire et valider les données
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  // Si validation échoue, retourner les erreurs
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Champs invalides. Veuillez corriger les erreurs.",
    };
  }

  const { email, password, firstName, lastName } = validatedFields.data;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        errors: { email: ["Cet email est déjà utilisé"] },
        message: "Un compte existe déjà avec cet email.",
      };
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur et le patient en transaction
    const newUser = await prisma.$transaction(async (prisma) => {
      const user = await prisma.utilisateur.create({
        data: {
          email,
          mot_de_passe_hash: hashedPassword,
          role: "patient",
        },
      });

      return user;
    });

    // Retourner le succès avec l'ID utilisateur
    return {
      success: true,
      message: "Compte créé avec succès!",
      userId: newUser.id.toString(),
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return {
      message: "Une erreur est survenue lors de la création du compte.",
    };
  }
}
