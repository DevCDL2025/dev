"use server";

import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function createSession(userId: number) {
  // Génération d'un token unique
  const token = randomBytes(32).toString("hex");

  // Création de la session en base de données
  const session = await prisma.session.create({
    data: {
      token,
      utilisateur_id: userId,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 semaine
    },
  });

  return session;
}

export async function deleteSession(token: string) {
  try {
    await prisma.session.delete({
      where: { token },
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de la session:", error);
  }
}

export async function validateSession(token: string) {
  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        utilisateur: {
          include: {
            Patient: { select: { id: true } },
            Medecin: { select: { id: true } },
            Receptionniste: { select: { id: true } },
          },
        },
      },
    });

    if (!session || session.expires_at < new Date()) {
      return null;
    }

    return {
      userId: session.utilisateur_id,
      email: session.utilisateur.email,
      role: session.utilisateur.role,
      patientId: session.utilisateur.Patient?.id,
      medecinId: session.utilisateur.Medecin?.id,
      receptionnisteId: session.utilisateur.Receptionniste?.id,
    };
  } catch (error) {
    console.error("Erreur lors de la validation de la session:", error);
    return null;
  }
}
