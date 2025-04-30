"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema } from "@/lib/validations/auth";
import { createSession, deleteSession } from "./session";

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function login(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  // Validation des données
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Veuillez corriger les erreurs dans le formulaire",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    // Recherche de l'utilisateur
    const user = await prisma.utilisateur.findUnique({
      where: { email },
      include: {
        Patient: { select: { id: true } },
        Medecin: { select: { id: true } },
        Receptionniste: { select: { id: true } },
      },
    });

    if (!user || !user.est_actif) {
      return {
        message: "Identifiants incorrects ou compte désactivé",
      };
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(
      password,
      user.mot_de_passe_hash
    );
    if (!passwordMatch) {
      return {
        message: "Identifiants incorrects",
      };
    }

    // Création de la session
    const session = await createSession(user.id);

    // Stockage du cookie de session
    (await cookies()).set("session_token", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
      path: "/",
    });

    // Mise à jour de la dernière connexion
    await prisma.utilisateur.update({
      where: { id: user.id },
      data: { dernier_login: new Date() },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return {
      message: "Une erreur est survenue lors de la connexion",
    };
  }

  // Redirection vers le dashboard selon le type d'utilisateur
  redirect("/dashboard/patient");
}

export async function logout() {
  const sessionToken = (await cookies()).get("session_token")?.value;

  if (sessionToken) {
    await deleteSession(sessionToken);
  }

  // Suppression du cookie
  (await cookies()).delete("session_token");
  redirect("/auth/login");
}
