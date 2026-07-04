import { notFound } from "next/navigation";
import { getVenueById } from "@/lib/data";
import VenueDetailClient from "./VenueDetailClient";

export const dynamic = "force-dynamic";

export default async function VenueDetailPage({ params }: { params: { id: string } }) {
  const venue = getVenueById(params.id);
  if (!venue) notFound();
  return <VenueDetailClient venue={venue} />;
}
