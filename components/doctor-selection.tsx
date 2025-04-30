import DoctorCard, { DoctorProps } from "./doctor-select-card";

// Sample doctors data
const mockDoctors: Omit<DoctorProps, "onSelect">[] = [
  {
    id: "dr-1",
    name: "Dr. Sophie Martin",
    specialty: "Dermatologie",
    photoUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&h=300&auto=format&fit=crop",
    availability: "available",
    nextAvailableSlot: "Aujourd'hui, 14:30",
  },
  {
    id: "dr-2",
    name: "Dr. Thomas Dubois",
    specialty: "Cardiologie",
    photoUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&h=300&auto=format&fit=crop",
    availability: "limited",
    nextAvailableSlot: "Demain, 10:15",
  },
  {
    id: "dr-3",
    name: "Dr. Claire Petit",
    specialty: "Pédiatre",
    photoUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&h=300&auto=format&fit=crop",
    availability: "unavailable",
    nextAvailableSlot: "Lundi prochain, 09:00",
  },
  {
    id: "dr-4",
    name: "Dr. Boussamba Grace",
    specialty: "Neurologie",
    photoUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&h=300&auto=format&fit=crop",
    availability: "unavailable",
    nextAvailableSlot: "Mardi prochain, 09:00",
  },
];

interface DoctorsSelectionProps {
  onDoctorSelect: (doctor: Omit<DoctorProps, "onSelect">) => void;
  speciality: string;
}

const DoctorsSelection: React.FC<DoctorsSelectionProps> = ({
  onDoctorSelect,
  speciality,
}) => {
  const handleSelectDoctor = (doctorId: number) => {
    onDoctorSelect(mockDoctors[doctorId]); // Appel de la fonction passée en props
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {mockDoctors
        .filter((doctor) => doctor.specialty === speciality)
        .map((doctor, index) => (
          <DoctorCard
            key={doctor.id}
            {...doctor}
            onSelect={() => {
              handleSelectDoctor(index);
            }}
          />
        ))}
    </div>
  );
};

export default DoctorsSelection;
