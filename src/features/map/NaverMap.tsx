"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICE_AREA } from "./config";
import { loadNaverMaps } from "./loadNaverMaps";

declare global {
  interface Window {
    navermap_authFailure?: () => void;
  }
}

type Problem = "missing-key" | "auth-failed" | "load-failed";

const PROBLEM_MESSAGES: Record<Problem, string> = {
  "missing-key": ".env.local 에 NEXT_PUBLIC_NAVER_MAP_CLIENT_ID 를 넣고 개발 서버를 다시 켜 주세요.",
  "auth-failed": "네이버 지도 인증에 실패했습니다. Client ID, Dynamic Map 선택, Web 서비스 URL 등록을 확인해 주세요.",
  "load-failed": "네이버 지도 스크립트를 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.",
};

export function NaverMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [problem, setProblem] = useState<Problem | null>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    if (!clientId) {
      setProblem("missing-key");
      return;
    }

    let map: naver.maps.Map | undefined;
    let cancelled = false;

    window.navermap_authFailure = () => setProblem("auth-failed");

    loadNaverMaps(clientId)
      .then(() => {
        if (cancelled || !containerRef.current) return;
        map = new naver.maps.Map(containerRef.current);
        const area = new naver.maps.Polygon({
          map,
          paths: [SERVICE_AREA.boundary.map(({ lat, lng }) => new naver.maps.LatLng(lat, lng))],
          strokeColor: "#1f6feb",
          strokeWeight: 2,
          fillColor: "#1f6feb",
          fillOpacity: 0.06,
        });
        map.fitBounds(area.getBounds());
      })
      .catch(() => {
        if (!cancelled) setProblem("load-failed");
      });

    return () => {
      cancelled = true;
      map?.destroy();
      delete window.navermap_authFailure;
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {problem && (
        <p
          role="alert"
          style={{
            position: "absolute",
            inset: "16px 16px auto",
            margin: 0,
            padding: "12px 16px",
            borderRadius: 8,
            background: "#fff",
            border: "1px solid #d0d0d0",
          }}
        >
          {PROBLEM_MESSAGES[problem]}
        </p>
      )}
    </div>
  );
}
