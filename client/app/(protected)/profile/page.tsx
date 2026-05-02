import ProfilePanel from "@/components/workspace/profile-panel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Batiyoun",
};

export default function ProfilePage() {
  return <ProfilePanel />;
}