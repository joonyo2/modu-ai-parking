import Link from "next/link";
import { notFound } from "next/navigation";
import { MockView } from "./MockView";
import { DESIGNS } from "@/features/mockups/data";

export default async function MockupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!DESIGNS.some((d) => d.id === id)) notFound();
  return (
    <>
      <Link className="mock-tag" href="/mockups">시안 {id}, 여석은 예시 (목록으로)</Link>
      <div className="mock-screen"><MockView id={id} /></div>
    </>
  );
}
