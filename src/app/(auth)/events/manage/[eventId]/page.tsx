import { ManageEventPage } from "@/components/features/manage-event";

type ManageEventPageProps = {
  params: Promise<{ eventId: string }>;
};

export default async function ManageEvent({ params }: ManageEventPageProps) {
  const { eventId } = await params;
  return <ManageEventPage eventId={eventId} />;
}
