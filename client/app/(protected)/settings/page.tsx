import SettingsPanel from "@/components/workspace/settings-panel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Batiyoun",
};

export default function SettingsPage() {
  return <SettingsPanel />;
}