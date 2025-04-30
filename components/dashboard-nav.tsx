"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  CreditCard,
  Menu,
  MessageSquare,
  Home,
  User,
  BookUser,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./logout-button";

const user = {
  name: "Jonhathan",
  role: "patient",
};

export function DashboardNav() {
  const pathname = usePathname();
  const segments = pathname.split("/dashboard/")[1]?.split("/") || [];
  const userRole = segments[0]; // "patient" ou "doctor" (ou undefined)

  const [open, setOpen] = useState(false);

  // Navigation items based on user role
  const getNavItems = () => {
    if (!user?.role) return [];

    const role = userRole;
    const basePath = `/dashboard/${role}`;

    const commonItems = [
      {
        title: "Tableau de bord",
        href: `/dashboard/${role}`,
        icon: <Home className="h-5 w-5" />,
      },
    ];

    const roleSpecificItems = {
      patient: [
        {
          title: "Mes rendez-vous",
          href: "appointments",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          title: "Nouveau rendez-vous",
          href: "new",
          icon: <MessageSquare className="h-5 w-5" />,
        },
        {
          title: "Mon profil",
          href: "profile",
          icon: <User className="h-5 w-5" />,
        },
      ],
      reception: [
        {
          title: "Gestion des rendez-vous",
          href: "manage-appointments",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          title: "Salle d'attente",
          href: "waiting-room",
          icon: <BookUser className="h-5 w-5" />,
        },
        {
          title: "Patients",
          href: "patients",
          icon: <Users className="h-5 w-5" />,
        },
      ],
      doctor: [
        {
          title: "Historique des consultations",
          href: "/consultations-history",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          title: "Mes patients",
          href: "/my-patients",
          icon: <Users className="h-5 w-5" />,
        },
      ],
      payment: [
        {
          title: "Paiements",
          href: "payments",
          icon: <CreditCard className="h-5 w-5" />,
        },
        {
          title: "Factures",
          href: "invoices",
          icon: <CreditCard className="h-5 w-5" />,
        },
      ],
    };

    const items =
      roleSpecificItems[role as keyof typeof roleSpecificItems]?.map(
        (item) => ({
          ...item,
          href: `${basePath}/${item.href.replace(/^\/|\/$/g, "")}`, // Nettoie les slashes
        })
      ) ?? [];

    return [...commonItems, ...items];
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-40 border-b bg-background px-20">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:w-72">
              <div className="flex items-center gap-2 pb-4 pt-2">
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
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === item.href
                        ? "bg-teal-100 text-teal-900"
                        : "hover:bg-muted"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}

                <LogoutButton className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium justify-start hover:bg-muted" />
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="flex items-center gap-2">
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
            <span className="text-xl font-bold hidden md:inline">
              MediConnect
            </span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium ${
                pathname === item.href
                  ? "text-teal-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-sm">
            <p className="font-medium">
              {userRole === "doctor" ? `Dr. ${user?.name}` : user?.name}
            </p>
            <p className="text-muted-foreground capitalize">{userRole}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg"
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-teal-100 text-teal-800">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Paramètres</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium justify-start hover:bg-muted" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
