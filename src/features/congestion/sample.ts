// 실제 수집 전까지 화면을 확인하기 위한 예시 값이다. 수집을 시작하면 이 파일을 교체한다.
export type CongestionLevel = "혼잡" | "보통" | "여유";

export const CONGESTION_COLOR: Record<CongestionLevel, string> = {
  혼잡: "#e0352b",
  보통: "#f0a400",
  여유: "#14a44d",
};

const LEVELS: CongestionLevel[] = ["여유", "보통", "혼잡"];

export function sampleCongestion(lotId: string): CongestionLevel {
  const sum = [...lotId].reduce((total, char) => total + char.charCodeAt(0), 0);
  return LEVELS[sum % LEVELS.length];
}
