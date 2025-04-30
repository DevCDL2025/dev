import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LandingHero() {
  return (
    <section className="py-18 md:py-28 bg-gradient-to-b from-white to-gray-50 h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Simplifiez vos rendez-vous médicaux
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Prenez rendez-vous facilement, soyez orienté vers le bon spécialiste
            et gérez vos consultations en toute simplicité.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row w-lg justify-center">
          <Link href="/auth/register">
            <Button variant="outline" className="w-full">
              Créer un compte
            </Button>
          </Link>
          <Link href="/appointment">
            <Button variant="default">Demo</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
