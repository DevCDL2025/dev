// app/onboarding/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { completeOnboarding } from "@/actions/auth/onboarding";

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const userId = Number(searchParams.get("userId"));
  const [step, setStep] = useState(1);
  const [state, formAction] = useActionState(completeOnboarding, null);

  useEffect(() => {
    if (!userId) {
      window.location.href = "/register";
    }
  }, [userId]);

  if (!userId) {
    return <div>Redirection...</div>;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {step === 1
              ? "Informations personnelles"
              : "Informations médicales"}
          </CardTitle>
        </CardHeader>

        {step === 1 ? (
          <PersonalInfoStep userId={userId} onComplete={() => setStep(2)} />
        ) : (
          <MedicalInfoStep
            userId={userId}
            formAction={formAction}
            state={state}
          />
        )}
      </Card>
    </div>
  );
}

function PersonalInfoStep({
  userId,
  onComplete,
}: {
  userId: number;
  onComplete: () => void;
}) {
  return (
    <>
      <CardContent className="space-y-4 pb-5">
        <input type="hidden" name="userId" value={userId} />
        <div className="space-y-2">
          <Label htmlFor="birthdate">Date de naissance</Label>
          <Input id="birthdate" name="birthdate" type="date" required />
        </div>
        <div className="space-y-2">
          <Label>Genre</Label>
          <div className="flex gap-4">
            {["M", "F", "Autre"].map((gender) => (
              <label key={gender} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  required
                  className="h-4 w-4"
                />
                {gender === "M"
                  ? "Masculin"
                  : gender === "F"
                  ? "Féminin"
                  : "Autre"}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="0600000000" />
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <Button className="w-full" onClick={onComplete}>
          Continuer
        </Button>
      </div>
    </>
  );
}

function MedicalInfoStep({
  userId,
  formAction,
  state,
}: {
  userId: number;
  formAction: (formData: FormData) => void;
  state: any;
}) {
  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} />
      <CardContent className="space-y-4 pb-5">
        <div className="space-y-2">
          <Label htmlFor="insurance">Assurance médicale</Label>
          <Input
            id="insurance"
            name="insurance"
            placeholder="Nom de votre assurance"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="insuranceNumber">Numéro d'assuré</Label>
          <Input
            id="insuranceNumber"
            name="insuranceNumber"
            placeholder="Votre numéro d'assuré"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="allergies">Allergies connues</Label>
          <Input
            id="allergies"
            name="allergies"
            placeholder="Liste vos allergies séparées par des virgules"
          />
        </div>
      </CardContent>
      <div className="px-6 pb-6 flex flex-col space-y-4">
        <SubmitButton />
        <Button variant="outline" type="submit" name="skip" value="true">
          Compléter plus tard
        </Button>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enregistrement...
        </>
      ) : (
        "Terminer l'onboarding"
      )}
    </Button>
  );
}
