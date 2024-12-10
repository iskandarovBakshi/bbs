import { AdminPanel } from "@/components/AdminPanel/AdminPanel";
import { Metadata } from "next";

const drawerWidth = 240;

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default function Page() {
  return <AdminPanel />;
}
