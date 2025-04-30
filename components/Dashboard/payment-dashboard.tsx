"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, FileText, Search, Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data
const pendingPayments = [
  {
    id: 1,
    patient: "Kévin Mboumba",
    service: "Consultation Cardiologie",
    doctor: "Dr. Jean-Baptiste Ngoua",
    amount: 75,
    date: "28 avril 2025",
  },
  {
    id: 2,
    patient: "Laura Missambo",
    service: "Consultation Dermatologie",
    doctor: "Dr. Marie Ndong",
    amount: 65,
    date: "28 avril 2025",
  },
  {
    id: 3,
    patient: "Philippe Moreau",
    service: "Échographie cardiaque",
    doctor: "Dr. Jean-Baptiste Ngoua",
    amount: 120,
    date: "28 avril 2025",
  },
];

const recentTransactions = [
  {
    id: 1,
    patient: "Marc Essono",
    service: "Consultation Médecine générale",
    amount: 55,
    date: "27 avril 2025",
    method: "Carte bancaire",
  },
  {
    id: 2,
    patient: "Thomas Dubois",
    service: "Électrocardiogramme",
    amount: 85,
    date: "27 avril 2025",
    method: "Espèces",
  },
];

export function PaymentDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Paiements en attente</CardTitle>
              <CardDescription>28 avril 2025</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard/payments">
                <Button variant="outline" size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Tous les paiements
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-gray-100">
                      {payment.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{payment.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.service}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payment.doctor}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{payment.amount} €</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.date}
                    </p>
                  </div>
                  <Link href={`/dashboard/process-payment/${payment.id}`}>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                      Encaisser
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Résumé financier</CardTitle>
            <CardDescription>28 avril 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">En attente</p>
                  <p className="text-2xl font-bold">260 €</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <p className="text-sm font-medium">Encaissé</p>
                  <p className="text-2xl font-bold">140 €</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3 col-span-2">
                  <p className="text-sm font-medium">Total du jour</p>
                  <p className="text-2xl font-bold">400 €</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transactions récentes</CardTitle>
            <CardDescription>Derniers paiements encaissés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium text-sm">{transaction.patient}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.service}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date} - {transaction.method}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount} €</p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/dashboard/search-invoice">
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Rechercher une facture
              </Button>
            </Link>
            <Link href="/dashboard/export-report">
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Exporter le rapport
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
