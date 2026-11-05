# 스마트천안 트래픽맵

주차장별 혼잡도를 보여주고 사용자에게 알맞은 주차 공간을 안내하는 웹 프로그램입니다.
첫 대상 지역은 천안시 서북구 불당동의 신불당 지역입니다. 신불당은 공식 행정구역이 아니라서 경계를 직접 그렸습니다. 경계는 `src/features/map/config.ts` 에서 고칩니다.

## 1차 개발 목표

1. 네이버 지도를 웹 화면에 띄운다. (완료)
2. 규모가 큰 주차장부터 후보 30곳을 조사해 지도에 표시한다. (완료, 위치 미확인 4곳 제외)

혼잡도는 아직 수집하지 않아 화면의 신호 색은 예시입니다. 화면 시안은 `/mockups` 에서 볼 수 있습니다.

## 기술 스택

TypeScript, Next.js, React, NAVER Maps JavaScript API v3

## 시작하기

Node.js 20 이상이 필요합니다.

```bash
npm install
cp .env.example .env.local
```

`.env.local` 에 Client ID를 넣은 뒤 개발 서버를 켭니다.

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## 네이버 지도 Client ID 발급

1. [네이버 클라우드 플랫폼 콘솔](https://console.ncloud.com)에서 Maps > Application 으로 이동해 애플리케이션을 등록합니다.
2. API 선택에서 **Dynamic Map** 을 고릅니다. 고르지 않으면 429 오류가 납니다.
3. Web 서비스 URL에 `http://localhost:3000` 을 등록합니다.
4. 발급된 Client ID를 `.env.local` 에 넣습니다.

`.env.local` 은 깃에 올리지 않습니다. Client Secret은 이 프로젝트의 지도 표시에 쓰지 않으니 저장소에 넣지 마세요.

## 폴더 구조

```
src/app/        화면 조립
src/features/   기능별 모듈
docs/           설계 문서
```

모듈 구성은 [docs/modules.md](docs/modules.md)를 봅니다. 건물별 CCTV 연동 문의처는 [docs/cctv-contacts.md](docs/cctv-contacts.md)를 봅니다.
