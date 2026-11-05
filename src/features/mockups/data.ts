// 목업 전용 예시 데이터. 위치와 여석은 화면을 보여 주기 위한 값이다.
export type Lot = {
  id: string;
  name: string;
  group: "공영" | "공공시설" | "민간";
  spaces: number;
  free: number;
  fee: string;
  ev: boolean;
  allDay: boolean;
  lat: number;
  lng: number;
};

export const LOTS: Lot[] = [
  { id: "stadium", name: "천안종합운동장", group: "공공시설", spaces: 1430, free: 612, fee: "무료", ev: false, allDay: true, lat: 36.819, lng: 127.115 },
  { id: "park", name: "시민체육공원", group: "공공시설", spaces: 180, free: 41, fee: "무료", ev: false, allDay: true, lat: 36.8115, lng: 127.1135 },
  { id: "cityhall", name: "천안시청", group: "공공시설", spaces: 400, free: 22, fee: "유료", ev: true, allDay: false, lat: 36.8152, lng: 127.1138 },
  { id: "galleria", name: "갤러리아 센터시티", group: "민간", spaces: 1148, free: 96, fee: "유료", ev: true, allDay: false, lat: 36.8012, lng: 127.1045 },
  { id: "hotel", name: "오엔시티호텔", group: "민간", spaces: 300, free: 88, fee: "유료", ev: false, allDay: true, lat: 36.8088, lng: 127.1115 },
  { id: "b1", name: "불당 제1주차장", group: "공영", spaces: 144, free: 12, fee: "유료", ev: true, allDay: true, lat: 36.8062, lng: 127.1055 },
  { id: "b5", name: "불당 제5주차장", group: "공영", spaces: 128, free: 34, fee: "유료", ev: false, allDay: true, lat: 36.81118, lng: 127.10658 },
  { id: "b3", name: "불당 제3주차장", group: "공영", spaces: 57, free: 26, fee: "무료", ev: true, allDay: true, lat: 36.81737, lng: 127.10473 },
  { id: "b2", name: "불당 제2주차장", group: "공영", spaces: 49, free: 3, fee: "유료", ev: false, allDay: true, lat: 36.81459, lng: 127.10722 },
  { id: "b4", name: "불당 제4주차장", group: "공영", spaces: 28, free: 9, fee: "무료", ev: false, allDay: true, lat: 36.82086, lng: 127.10439 },
];

export type Status = "여유" | "보통" | "혼잡";

export function statusOf(lot: Lot): Status {
  const ratio = lot.free / lot.spaces;
  if (ratio >= 0.3) return "여유";
  if (ratio >= 0.12) return "보통";
  return "혼잡";
}

export const STATUS_COLOR: Record<Status, string> = {
  여유: "#12a150",
  보통: "#e9a100",
  혼잡: "#d92d20",
};

export function walkMinutes(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const dy = (a.lat - b.lat) * 111000;
  const dx = (a.lng - b.lng) * 89100;
  return Math.max(1, Math.round(Math.hypot(dx, dy) / 70));
}

export const DESIGNS = [
  { id: "1", name: "신호등", note: "초록·노랑·빨강 신호로 주차장을 거른다" },
  { id: "2", name: "도로 표지판", note: "운전자가 아는 녹색 표지판으로 읽는다" },
  { id: "3", name: "주차권", note: "주차장 한 곳이 주차권 한 장이다" },
  { id: "4", name: "노면 표시", note: "빈칸과 찬 칸을 주차면으로 그린다" },
  { id: "5", name: "주차 안내 전광판", note: "도로의 여석 안내판을 화면으로 옮겼다" },
  { id: "6", name: "큰 글씨 목적지", note: "목적지를 고르면 세울 곳 하나만 알려 준다" },
  { id: "7", name: "서비스 소개 랜딩", note: "aside.com의 소개 페이지 구성을 참고했다" },
  { id: "8", name: "주차장 비교표", note: "aside.com의 비교표 구성을 참고했다" },
  { id: "9", name: "모바일 앱", note: "운전 전 휴대폰에서 지도와 하단 목록으로 본다" },
  { id: "10", name: "운영자 관제", note: "aside.com의 사이드바 트리를 참고한 CCTV 관제 화면" },
];
