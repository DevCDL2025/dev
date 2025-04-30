// app/register/page.tsx
"use client";

import { useFormStatus } from "react-dom";
import { registerPatient } from "@/actions/auth/register";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Création du compte...
        </>
      ) : (
        "S'inscrire"
      )}
    </Button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerPatient, null);
  const router = useRouter();

  // Gérer les messages d'erreur/succès
  useEffect(() => {
    if (state?.message) {
      if (state.success && state.userId) {
        toast.success(state.message);
        router.push(`/onboarding?userId=${state.userId}`);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">{/* Votre logo ici */}</div>
          <CardTitle className="text-2xl font-bold text-center">
            Création de compte
          </CardTitle>
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-4 pb-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom*</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Jean"
                  required
                />
                {state?.errors?.firstName && (
                  <p className="text-sm text-red-500">
                    {state.errors.firstName[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom*</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Dupont"
                  required
                />
                {state?.errors?.lastName && (
                  <p className="text-sm text-red-500">
                    {state.errors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="exemple@email.com"
                required
              />
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Mot de passe* (min. 8 caractères)
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
              />
              {state?.errors?.password && (
                <p className="text-sm text-red-500">
                  {state.errors.password[0]}
                </p>
              )}
            </div>
          </CardContent>

          <div className="px-6 pb-6 flex flex-col space-y-4">
            <SubmitButton />
            <div className="text-center text-sm">
              Vous avez déjà un compte?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
