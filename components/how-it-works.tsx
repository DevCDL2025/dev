import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700">Comment ça marche</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">En quelques étapes simples</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Découvrez comment notre plateforme facilite la gestion des rendez-vous médicaux.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">1</div>
              <h3 className="mt-4 text-xl font-bold">Créez votre compte</h3>
              <p className="mt-2 text-gray-500">
                Inscrivez-vous en quelques minutes et complétez votre profil médical.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">2</div>
              <h3 className="mt-4 text-xl font-bold">Petit questionnaire</h3>
              <p className="mt-2 text-gray-500">
                Utilisez notre chatbot intelligent pour vous aidez à mieux vous orienter.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">3</div>
              <h3 className="mt-4 text-xl font-bold">Prenez rendez-vous</h3>
              <p className="mt-2 text-gray-500">
                Choisissez un créneau disponible qui vous convient et confirmez votre rendez-vous.
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/register">
              <Button className="bg-teal-600 hover:bg-teal-700">Commencer maintenant</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
