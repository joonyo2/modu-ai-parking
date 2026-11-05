import Link from "next/link";
import { DESIGNS } from "@/features/mockups/data";

export const metadata = { title: "화면 시안 | 스마트천안 트래픽맵" };

export default function MockupsPage() {
  return (
    <main className="gallery">
      <h1>스마트천안 트래픽맵 화면 시안</h1>
      <p>시안을 누르면 실제 지도로 열립니다. 주차장 위치와 여석은 예시입니다.</p>
      <ul>
        {DESIGNS.map((d) => (
          <li key={d.id}>
            <Link href={`/mockups/${d.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/mockups/${d.id}.png`} alt={`${d.name} 시안 화면`} />
              <strong>{d.id}. {d.name}</strong>
              <span>{d.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
