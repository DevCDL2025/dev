import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MessageSquare, Users, CreditCard, Clock, Shield } from "lucide-react"

export function Features() {
  return (
    <section id="features" className="py-16 bg-white h-screen">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700">
              Fonctionnalités
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Tout ce dont vous avez besoin
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Notre plateforme offre une solution complète pour les patients et
              les établissements de santé.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Card>
            <CardHeader className="pb-2">
              <CalendarDays className="h-6 w-6 text-teal-600 mb-2" />
              <CardTitle>Prise de rendez-vous</CardTitle>
              <CardDescription>
                Réservez facilement vos consultations en quelques clics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Choisissez la date, l'heure et le praticien selon vos
                disponibilités. Recevez des confirmations et rappels
                automatiques.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Users className="h-6 w-6 text-teal-600 mb-2" />
              <CardTitle>Gestion multi-niveaux</CardTitle>
              <CardDescription>
                Solution complète pour les établissements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Interfaces dédiées pour la réception, les médecins et le service
                de paiement pour une gestion optimale des flux.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Clock className="h-6 w-6 text-teal-600 mb-2" />
              <CardTitle>Gestion du temps</CardTitle>
              <CardDescription>
                Optimisez l'organisation des consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Réduisez les temps d'attente grâce à une planification
                intelligente et des notifications en temps réel.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
