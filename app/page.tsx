import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { LandingHero } from "@/components/landing-hero"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-screen">
      <header className="border-b bg-background px-10">
        <div className="flex h-16 items-center sm:justify-between justify-center py-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-teal-600"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span className="text-xl font-bold">MediConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:underline"
            >
              Comment ça marche
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:underline"
            >
              Contact
            </Link>
          </nav>
          <div className="sm:flex hidden items-center gap-4">
            <Link href="/appointment">
              <Button variant="outline">Demo</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-teal-600 hover:bg-teal-700">
                Inscription
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <LandingHero />
        <Features />
        <HowItWorks />

        <section id="contact" className="p-16 bg-gray-50">
          <div className="">
            <h2 className="text-3xl font-bold text-center mb-12">
              Contactez-nous
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Assistance technique</CardTitle>
                  <CardDescription>
                    Besoin d'aide avec l'application ? Notre équipe est là pour
                    vous.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    <span className="font-medium">Email:</span>{" "}
                    support@mediconnect.fr
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Téléphone:</span> +241 74 76
                    61 65
                  </p>
                  <p>
                    <span className="font-medium">Horaires:</span> Lun-Ven,
                    9h-18h
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partenariats</CardTitle>
                  <CardDescription>
                    Vous êtes un établissement de santé et souhaitez collaborer
                    ?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    <span className="font-medium">Email:</span>{" "}
                    partenariats@mediconnect.fr
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Téléphone:</span> +241 74 76
                    61 65
                  </p>
                  <Button className="mt-4 bg-teal-600 hover:bg-teal-700">
                    Demander une démo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
