import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Mock available time slots for different dates
const mockTimeSlots: Record<string, string[]> = {
  // Today
  [format(new Date(), "yyyy-MM-dd")]: ["09:00", "10:30", "14:00", "16:30"],
  // Tomorrow
  [format(
    new Date(new Date().setDate(new Date().getDate() + 1)),
    "yyyy-MM-dd"
  )]: ["08:30", "11:00", "15:30"],
  // Day after tomorrow
  [format(
    new Date(new Date().setDate(new Date().getDate() + 2)),
    "yyyy-MM-dd"
  )]: ["09:30", "13:00", "17:00"],
  // Set some slots for a week from now
  [format(
    new Date(new Date().setDate(new Date().getDate() + 7)),
    "yyyy-MM-dd"
  )]: ["10:00", "12:30", "14:30", "16:00"],
};

// Function to determine which days should be disabled (mock implementation)
const isDateAvailable = (date: Date) => {
  const dateStr = format(date, "yyyy-MM-dd");
  return dateStr in mockTimeSlots;
};

interface DoctorInfo {
  id: string;
  name: string;
  specialty?: string;
  photoUrl?: string;
}

interface AppointmentBookingProps {
  doctor: DoctorInfo;
  onConfirm: (date: Date, time: string) => void;
  onBack: () => void;
}

const AppointmentBooking = ({
  doctor,
  onConfirm,
  onBack,
}: AppointmentBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when a new date is selected
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm(selectedDate, selectedTime); // Ici on passe date et heure
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Choisir une date</h2>
          <Card>
            <CardContent className="flex justify-center items-center ">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                classNames={{
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day_outside: "text-muted-foreground opacity-50",
                  day_range_end: "day-range-end",
                  day_range_start: "day-range-start",
                }}
                disabled={(date) => {
                  // Disable past dates, weekends, and dates without available slots
                  return (
                    date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                    !isDateAvailable(date)
                  );
                }}
                className="pointer-events-auto"
                locale={fr}
              />
            </CardContent>
          </Card>
        </div>

        {/* Time slots section */}
        <div>
          <h2 className="text-lg font-medium mb-4">
            {selectedDate
              ? `Horaires disponibles pour le ${format(
                  selectedDate,
                  "d MMMM yyyy",
                  { locale: fr }
                )}`
              : "Sélectionnez une date pour voir les horaires disponibles"}
          </h2>

          {selectedDate ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mockTimeSlots[format(selectedDate, "yyyy-MM-dd")]?.map(
                (time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`text-center py-6 ${
                      selectedTime === time ? "bg-primary" : ""
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                  </Button>
                )
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 border rounded-lg bg-slate-50">
              <p className="text-muted-foreground">
                Veuillez d'abord choisir une date
              </p>
            </div>
          )}

          {selectedDate && selectedTime && (
            <Button className="w-full mt-8" size="lg" onClick={handleConfirm}>
              Confirmer ce rendez-vous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
