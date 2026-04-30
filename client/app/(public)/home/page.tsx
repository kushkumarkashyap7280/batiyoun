import { Metadata } from "next";
import HomeClientPage from "@/components/home/client.page";

export const metadata: Metadata = {
  title: "Home | Batiyoun",
  description: "Batiyoun is a dynamic chat application that connects you globally.",
};

export default function HomePage() {
  return <HomeClientPage />;
}
