// lib/validations/user.ts
import { z } from "zod";
import bcrypt from "bcryptjs";

export const UserRole = z.enum([
  "patient",
  "medecin",
  "receptionniste",
  "admin",
]);
export type UserRole = z.infer<typeof UserRole>;

export const UserSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(50, "Le mot de passe ne peut pas dépasser 50 caractères"),
  role: UserRole,
});

export const PatientSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  date_naissance: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)"),
  genre: z.enum(["M", "F", "Autre"]),
  adresse: z.string().optional(),
  telephone: z.string().optional(),
  assurance: z.string().optional(),
  numero_assurance: z.string().optional(),
  allergies: z.string().optional(),
  antecedents: z.string().optional(),
});

export const MedecinSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  specialite: z.string().min(2),
  numero_licence: z.string().min(5),
  est_generaliste: z.boolean().default(false),
});

export const ReceptionnisteSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
});
