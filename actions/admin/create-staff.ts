// app/actions/admin/create-staff.ts
"use server";

import { createUser } from "@/actions/user/create-user";
import { currentUser } from "@/lib/auth";

export async function createStaffMember(
  role: "medecin" | "receptionniste",
  formData: FormData
) {
  const user = await currentUser();

  // Vérification des permissions
  if (!user || user.type !== "admin") {
    return { error: "Non autorisé" };
  }

  const rawUserData = {
    email: formData.get("email"),
    password: formData.get("password"),
    role,
  };

  const profileData =
    role === "medecin"
      ? {
          nom: formData.get("nom"),
          prenom: formData.get("prenom"),
          specialite: formData.get("specialite"),
          numero_licence: formData.get("numero_licence"),
          est_generaliste: formData.get("est_generaliste") === "on",
        }
      : {
          nom: formData.get("nom"),
          prenom: formData.get("prenom"),
        };

  const result = await createUser(rawUserData, profileData, role);

  if (!result.success) {
    return { error: result.message };
  }

  return { success: true, userId: result.userId };
}
