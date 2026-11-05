import type { ReactNode } from "react";
import "@/features/mockups/mockups.css";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Do+Hyeon&family=Gugi&family=Hahmlet:wght@400;500;600;700&family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Jua&family=Noto+Sans+KR:wght@400;600;700;800;900&family=Orbit&display=swap";

export default function MockupsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href={FONTS} precedence="default" />
      {children}
    </>
  );
}
