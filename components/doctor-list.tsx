"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  specialtyName: string;
  experience: string;
  languages: string[];
  availability: string;
};

const doctors: Doctor[] = [
  {
    id: "dr-ngoua",
    name: "Dr. Jean-Baptiste Ngoua",
    specialty: "cardiology",
    specialtyName: "Cardiologie",
    experience: "15 ans d'expérience",
    languages: ["Français", "Anglais"],
    availability: "Disponible dès demain",
  },
  {
    id: "dr-mbadinga",
    name: "Dr. Léonie Mbadinga",
    specialty: "gynecology",
    specialtyName: "Gynécologie",
    experience: "12 ans d'expérience",
    languages: ["Français", "Espagnol"],
    availability: "Disponible ce vendredi",
  },
  {
    id: "dr-essono",
    name: "Dr. Paul Essono",
    specialty: "neurology",
    specialtyName: "Neurologie",
    experience: "20 ans d'expérience",
    languages: ["Français", "Anglais", "Portugais"],
    availability: "Sur rendez-vous",
  },
  {
    id: "dr-owondo",
    name: "Dr. Sarah Owondo",
    specialty: "pediatrics",
    specialtyName: "Pédiatrie",
    experience: "10 ans d'expérience",
    languages: ["Français", "Anglais", "Fang"],
    availability: "Disponible en urgence",
  },
  {
    id: "dr-mboumba",
    name: "Dr. Daniel Mboumba",
    specialty: "surgery",
    specialtyName: "Chirurgie générale",
    experience: "18 ans d'expérience",
    languages: ["Français", "Anglais"],
    availability: "Disponible la semaine prochaine",
  },
  {
    id: "dr-ndong",
    name: "Dr. Marie Ndong",
    specialty: "dermatology",
    specialtyName: "Dermatologie",
    experience: "14 ans d'expérience",
    languages: ["Français", "Anglais", "Yoruba"],
    availability: "Sur rendez-vous uniquement",
  },
  {
    id: "dr-biyoghe",
    name: "Dr. Marc Biyoghé",
    specialty: "ophthalmology",
    specialtyName: "Ophtalmologie",
    experience: "16 ans d'expérience",
    languages: ["Français", "Anglais", "Médical"],
    availability: "Disponible en ligne",
  },
  {
    id: "dr-ntutume",
    name: "Dr. Laura Ntutume",
    specialty: "internal-medicine",
    specialtyName: "Médecine interne",
    experience: "13 ans d'expérience",
    languages: ["Français", "Anglais", "Swahili"],
    availability: "Disponible ce weekend",
  },
  {
    id: "dr-okoue",
    name: "Dr. Jacques Okué",
    specialty: "radiology",
    specialtyName: "Radiologie",
    experience: "19 ans d'expérience",
    languages: ["Français", "Anglais", "Allemand"],
    availability: "Disponible en consultation virtuelle",
  },
  {
    id: "dr-missambo",
    name: "Dr. Amina Missambo",
    specialty: "infectiology",
    specialtyName: "Infectiologie",
    experience: "17 ans d'expérience",
    languages: ["Français", "Anglais", "Arabe"],
    availability: "Disponible en clinique",
  },
];

export function DoctorList({ specialty }: { specialty: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const filteredDoctors = specialty
    ? doctors.filter((doctor) => doctor.specialty === specialty)
    : doctors;

  const handleSelectDoctor = (doctorId: string) => {
    if (!pathname.startsWith("/dashboard/patient")) {
      router.push(`chat?doctor=${doctorId}`);
    }
    router.push(`appointment?doctor=${doctorId}`);
  };

  return (
    <div>
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl">
            Aucun médecin disponible pour cette spécialité actuellement.
          </p>
          <Button className="mt-4" onClick={() => router.back()}>
            Retour aux spécialités
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=96&width=96&text=${
                        doctor.name.split(" ")[1][0]
                      }${doctor.name.split(" ")[0][0]}`}
                      alt={doctor.name}
                      fill
                      className="object-cover bg-primary text-white"
                    />
                  </div>
                </div>
                <CardTitle className="text-xl text-center">
                  {doctor.name}
                </CardTitle>
                <CardDescription className="text-center">
                  <Badge variant="secondary" className="mb-1">
                    {doctor.specialtyName}
                  </Badge>
                  <div className="mt-1">{doctor.experience}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-center">
                  <p className="text-green-600 font-medium">
                    {doctor.availability} ✅
                  </p>
                  <p className="mt-1">Langues: {doctor.languages.join(", ")}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleSelectDoctor(doctor.id)}
                >
                  Choisir ce médecin
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
