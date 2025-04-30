// lib/auth.ts
import bcrypt from "bcryptjs";
import { UserRole } from "@/lib/validations/user";
import prisma from "./prisma";
import { cookies } from "next/headers";
import { validateSession } from "@/actions/auth/session";

export type AuthUser = {
  id: number;
  email: string;
  type: UserRole;
  patientId?: string;
  medecinId?: number;
  receptionnisteId?: number;
};

export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthUser | null> {
  try {
    // Trouver l'utilisateur par email
    const user = await prisma.utilisateur.findUnique({
      where: { email },
      include: {
        Patient: { select: { id: true } },
        Medecin: { select: { id: true } },
        Receptionniste: { select: { id: true } },
      },
    });

    if (!user || !user.est_actif) {
      return null;
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(
      password,
      user.mot_de_passe_hash
    );
    if (!passwordMatch) {
      return null;
    }

    // Mettre à jour la date de dernière connexion
    await prisma.utilisateur.update({
      where: { id: user.id },
      data: { dernier_login: new Date() },
    });

    // Retourner les informations de l'utilisateur authentifié
    return {
      id: user.id,
      email: user.email,
      type: user.role as UserRole,
      patientId: user.Patient?.id,
      medecinId: user.Medecin?.id,
      receptionnisteId: user.Receptionniste?.id,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

export async function currentUser(): Promise<AuthUser | null> {
  // Implémentation dépendante de votre gestion de session
  // Voir plus bas pour l'implémentation avec next-auth
  throw new Error("Implémentez cette fonction selon votre gestion de session");
}

export async function getUserById(id: number): Promise<AuthUser | null> {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { id },
      include: {
        Patient: { select: { id: true } },
        Medecin: { select: { id: true } },
        Receptionniste: { select: { id: true } },
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      type: user.role as UserRole,
      patientId: user.Patient?.id,
      medecinId: user.Medecin?.id,
      receptionnisteId: user.Receptionniste?.id,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function changePassword(
  userId: number,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { success: false, message: "Utilisateur non trouvé" };
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.mot_de_passe_hash
    );
    if (!passwordMatch) {
      return { success: false, message: "Mot de passe actuel incorrect" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.utilisateur.update({
      where: { id: userId },
      data: { mot_de_passe_hash: hashedPassword },
    });

    return { success: true, message: "Mot de passe mis à jour avec succès" };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors du changement de mot de passe",
    };
  }
}

export async function deactivateUser(
  userId: number
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.utilisateur.update({
      where: { id: userId },
      data: { est_actif: false },
    });

    return { success: true, message: "Compte désactivé avec succès" };
  } catch (error) {
    console.error("Error deactivating user:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la désactivation du compte",
    };
  }
}

export async function getCurrentUser() {
  const sessionToken = (await cookies()).get("session_token")?.value;

  if (!sessionToken) {
    return null;
  }

  return await validateSession(sessionToken);
}
