const SCRIPT_URL = "https://oapi.map.naver.com/openapi/v3/maps.js";

let pending: Promise<void> | null = null;

// 스크립트는 페이지당 한 번만 넣는다.
export function loadNaverMaps(clientId: string): Promise<void> {
  if (pending) return pending;

  pending = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${SCRIPT_URL}?ncpKeyId=${encodeURIComponent(clientId)}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      pending = null;
      script.remove();
      reject(new Error("네이버 지도 스크립트를 불러오지 못했습니다."));
    };
    document.head.appendChild(script);
  });

  return pending;
}
