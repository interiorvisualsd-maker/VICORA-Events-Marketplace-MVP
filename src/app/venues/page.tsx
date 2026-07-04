import VenuesClient from "./VenuesClient";

export const dynamic = "force-dynamic";

export default function VenuesPage({
  searchParams,
}: {
  searchParams: { city?: string; type?: string; eventType?: string; minCapacity?: string; maxPrice?: string; search?: string };
}) {
  return <VenuesClient searchParams={searchParams} />;
}
