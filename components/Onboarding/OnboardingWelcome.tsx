"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OnboardingWelcome = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <Card className="w-full md:w-2/3 m-10">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl font-bold text-center mb-3 text-accent-foreground">
          Bienvenue dans votre espace santé 👋
        </CardTitle>
        <CardDescription className="text-lg text-center mb-8 text-gray-600">
          {showOptions
            ? " Comment pouvons-nous vous aider aujourd'hui?"
            : "Nous sommes ravis de vous accueillir dans notre clinique virtuelle.  Cliquez sur commencer !"}
        </CardDescription>
      </CardHeader>
      {!showOptions ? (
        <CardFooter>
          <Button className="w-full" onClick={() => setShowOptions(true)}>
            Commencer 🚀
          </Button>
        </CardFooter>
      ) : (
        <CardContent className="grid md:grid-cols-2 gap-6">
          <Card className="hover:ring-2 hover:ring-primary flex justify-between shadow-primary/90">
            <div className="text-center p-4">
              <span className="text-5xl mb-4 block">👨‍⚕️</span>
              <h2 className="text-xl font-semibold mb-2">
                Je suis déjà patient
              </h2>
              <p className="text-gray-600 mb-4">
                Connectez-vous à votre compte
              </p>
              <Link href="/auth/login">
                <Button>Se connecter</Button>
              </Link>
            </div>
          </Card>

          <Card className="hover:ring-2 hover:ring-blue-400 flex justify-between shadow-blue-500/90">
            <div className="text-center p-4">
              <span className="text-5xl mb-4 block">🧑‍💼</span>
              <h2 className="text-xl font-semibold mb-2">
                Je suis un nouveau visiteur
              </h2>
              <p className="text-gray-600 mb-4">Continuez en tant qu'invité</p>
              <div className="flex gap-3 justify-center">
                <Link href="appointment/new">
                  <Button variant={"accent"}>Continuer</Button>
                </Link>
              </div>
            </div>
          </Card>
        </CardContent>
      )}
    </Card>
  );
};

export default OnboardingWelcome;
