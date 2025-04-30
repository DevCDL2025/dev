import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background px-16">
      <div className=" flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
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
          <p className="text-sm text-gray-500">
            © 2025 MediConnect. Tous droits réservés.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Plateforme</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="#features"
                className="text-sm text-gray-500 hover:underline"
              >
                Fonctionnalités
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm text-gray-500 hover:underline"
              >
                Comment ça marche
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Tarifs
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Ressources</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Centre d'aide
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Blog
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Témoignages
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Légal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Confidentialité
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Conditions d'utilisation
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Mentions légales
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
