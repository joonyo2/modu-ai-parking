import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "스마트천안 트래픽맵",
  description: "주차장별 혼잡도를 보여주고 알맞은 주차 공간으로 안내합니다.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Noto+Sans+KR:wght@400;600&display=swap"
          precedence="default"
        />
        {children}
      </body>
    </html>
  );
}
