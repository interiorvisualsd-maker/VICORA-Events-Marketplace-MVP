import AdminClient from "./AdminClient";
import { getInquiries } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const inquiries = getInquiries();
  return <AdminClient initialInquiries={inquiries} />;
}
