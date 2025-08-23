import DoctorProfilePage from "./DoctorProfilePage";

export default async function DoctorProfile({ params }: { params: Promise<{ doctorId: string }> }) {
  const { doctorId } = await params;

  return <DoctorProfilePage doctorId={doctorId} />
}