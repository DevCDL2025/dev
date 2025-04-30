import type { Metadata } from "next";
import { ChatInterface } from "@/components/chat-interface";

export const metadata: Metadata = {
  title: "Consultation préliminaire - Système de Rendez-vous Hospitaliers",
  description: "Discutez avec notre assistant virtuel avant votre rendez-vous",
};

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor: string }>;
}) {
  const { doctor } = await searchParams;

  return (
    <div className=" py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Consultation préliminaire 💬
        </h1>
        <p className="text-xl text-muted-foreground">
          Discutez avec notre assistant virtuel pour préparer votre rendez-vous
        </p>
      </div>

      <ChatInterface doctorId={doctor} />
    </div>
  );
}
