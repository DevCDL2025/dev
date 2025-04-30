// app/actions/auth/onboarding.ts
"use server";

import { Genre } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Utilisateur } from "../../lib/generated/prisma/index";

export async function completeOnboarding(prevState: any, formData: FormData) {
  const userId = formData.get("userId");

  if (!userId || typeof userId !== "string") {
    return { error: "ID utilisateur manquant" };
  }

  try {
    const birthdate = formData.get("birthdate");
    const gender = formData.get("gender");
    const phone = formData.get("phone");
    const insurance = formData.get("insurance");
    const insuranceNumber = formData.get("insuranceNumber");
    const allergies = formData.get("allergies");

    const data = await prisma.patient.create({
      data: {
        utilisateur: {
          connect: {
            id: parseInt(userId),
          },
        },
        date_naissance: birthdate ? new Date(birthdate.toString()) : new Date(),
        genre: (gender as Genre) || "Autre",
        telephone: phone?.toString(),
        assurance: insurance?.toString(),
        numero_assurance: insuranceNumber?.toString(),
        allergies: allergies?.toString(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'onboarding:", error);
    return { error: "Une erreur est survenue" };
  } finally {
    redirect("/dashboard");
  }
}
