import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        {/* Icône stylisée */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
          <svg
            className="h-12 w-12 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Titre et message */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page non trouvée
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Désolé, nous ne trouvons pas la page que vous recherchez. Elle a
          peut-être été déplacée ou supprimée.
        </p>

        {/* Code d'erreur stylisé */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 rounded-full bg-gray-100 px-6 py-2 text-sm font-semibold text-gray-800">
            <span>Erreur</span>
            <span className="text-lg font-bold text-blue-600">404</span>
          </div>
        </div>

        {/* Options pour l'utilisateur */}
        <div className="flex justify-center">
          <Button asChild variant="default" className="flex items-center gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        {/* Liens d'aide supplémentaires */}
        <div className="mt-6 flex justify-center space-x-6 text-sm">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-500"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Centre d'aide
          </Link>
        </div>
      </div>
    </div>
  );
}
