// 1차 후보 30곳. 규모는 공개 자료 기준이고, 민간 건물은 대부분 주거를 포함한 건물 전체 대수다.
export type LotGroup = "공영" | "공공시설" | "민간";
export type PositionAccuracy = "건물" | "근처";

export type ParkingLot = {
  id: string;
  name: string;
  group: LotGroup;
  address: string;
  spaces: number | null;
  spacesNote: string;
  sourceUrl: string;
  // null 이면 정확한 위치를 아직 못 찾아 지도에 찍지 않는다.
  position: { lat: number; lng: number; accuracy: PositionAccuracy } | null;
};

const CAUC = "https://www.cauc.or.kr/_parking/main.asp?no=1";
const ZIPPOOM = "https://zippoom.com/";

export const PARKING_LOTS: ParkingLot[] = [
  { id: "city-pradium-3", name: "시티프라디움 3차 상가", group: "민간", address: "공원로 176", spaces: 2247, spacesNote: "오피스텔 포함 건물 전체", sourceUrl: ZIPPOOM, position: { lat: 36.79739, lng: 127.09904, accuracy: "건물" } },
  { id: "pentaport-mall", name: "펜타포트몰 (CGV 천안펜타포트)", group: "민간", address: "공원로 196", spaces: 2215, spacesNote: "주거 포함 건물 전체, 단지 전체 2,055대 자료도 있음", sourceUrl: "https://cnc.cacf.or.kr/main/html/sub01/01.html?mode=V&mng_no=2441", position: { lat: 36.79831, lng: 127.10149, accuracy: "건물" } },
  { id: "stadium", name: "천안종합운동장·유관순체육관", group: "공공시설", address: "번영로 208", spaces: 1430, spacesNote: "자료마다 1,430~1,467면, 증설 계획 있음", sourceUrl: "https://www.data.go.kr/data/15110970/fileData.do", position: { lat: 36.8189, lng: 127.1151, accuracy: "근처" } },
  { id: "gwell-1", name: "지웰시티몰 (푸르지오 1단지)", group: "민간", address: "불당26로 80", spaces: 1314, spacesNote: "아파트·오피스텔 포함 단지 전체", sourceUrl: ZIPPOOM, position: { lat: 36.8135, lng: 127.1063, accuracy: "근처" } },
  { id: "galleria", name: "갤러리아 센터시티", group: "민간", address: "공원로 227", spaces: 1148, spacesNote: "2010년 개점 보도 수치, 1,047대 보도도 있음", sourceUrl: "https://www.seoul.co.kr/news/economy/2010/11/30/20101130019016", position: { lat: 36.80056, lng: 127.10475, accuracy: "건물" } },
  { id: "pentaport-1", name: "펜타포트 1블럭 상가", group: "민간", address: "공원로 195", spaces: 1135, spacesNote: "주거 479세대 기준 건물 전체", sourceUrl: ZIPPOOM, position: { lat: 36.79995, lng: 127.10148, accuracy: "건물" } },
  { id: "gwell-2", name: "지웰시티 푸르지오 2단지 상가", group: "민간", address: "불당26로 50", spaces: 1106, spacesNote: "주거 800세대 포함 단지 전체", sourceUrl: "https://aptgin.com/home/popup/pp_danji/apt/am19456em3292", position: { lat: 36.81181, lng: 127.10572, accuracy: "건물" } },
  { id: "gwell-sharp", name: "지웰더샵 상가", group: "민간", address: "불당26로 77", spaces: 924, spacesNote: "주거 685세대 기준 단지 전체", sourceUrl: "https://zippoom.com/review/vhneURszcoQ7WGSWi6tJ1B", position: { lat: 36.81352, lng: 127.10506, accuracy: "건물" } },
  { id: "pradium-leaders", name: "시티프라디움 리더스 상가", group: "민간", address: "공원로 177", spaces: 769, spacesNote: "오피스텔 포함 건물 전체, 757대 자료도 있음", sourceUrl: ZIPPOOM, position: { lat: 36.79954, lng: 127.09903, accuracy: "건물" } },
  { id: "radnice", name: "한성필하우스 라드니체", group: "민간", address: "불당23로 73-8", spaces: 592, spacesNote: "오피스텔 포함 건물 전체, 567대 자료도 있음", sourceUrl: ZIPPOOM, position: { lat: 36.8183, lng: 127.1099, accuracy: "근처" } },
  { id: "coaru", name: "불당 코아루 와이드시티", group: "민간", address: "불당25로 244", spaces: 567, spacesNote: "오피스텔 포함 건물 전체, 시간권 판매 이력 있음", sourceUrl: "https://app.modu.kr/map?id=265458&type=P", position: { lat: 36.82243, lng: 127.11042, accuracy: "건물" } },
  { id: "cent-avenue", name: "센트에비뉴 (CGV 천안시청)", group: "민간", address: "번영로 201", spaces: 518, spacesNote: "상가 매물 광고 문구가 유일한 근거", sourceUrl: "https://realty.daangn.com/articles/3648932", position: { lat: 36.8191, lng: 127.11013, accuracy: "건물" } },
  { id: "monarch-545", name: "신불당 모나크545", group: "민간", address: "불당25로 174", spaces: 467, spacesNote: "오피스텔 포함 건물 전체", sourceUrl: "https://zippoom.com/review/YNMxqNjzB7kGRY2YvehguQ", position: { lat: 36.81635, lng: 127.10844, accuracy: "건물" } },
  { id: "park-2", name: "파크푸르지오 2단지 상가", group: "민간", address: "불당26로 122", spaces: 444, spacesNote: "주거 351세대 포함 단지 전체", sourceUrl: "https://realty.daangn.com/complexes/19770354/reviews/209044", position: { lat: 36.81913, lng: 127.10797, accuracy: "건물" } },
  { id: "twinstar", name: "동문 디이스트 트윈스타", group: "민간", address: "불당23로 73-36", spaces: 299, spacesNote: "B동 수치, 전체 대수인지 불명확", sourceUrl: ZIPPOOM, position: { lat: 36.8203, lng: 127.1106, accuracy: "근처" } },
  { id: "civic-park", name: "천안시민체육공원", group: "공공시설", address: "불당동 242-3", spaces: 186, spacesNote: "소형 180대, 대형 6대. 종합운동장 수치와 겹칠 수 있음", sourceUrl: "https://www.ktriptips.com/kor/tourspot/3046296", position: { lat: 36.8127, lng: 127.1134, accuracy: "근처" } },
  { id: "parkview", name: "불당파크뷰", group: "민간", address: "불당21로 67-26", spaces: 196, spacesNote: "오피스텔 포함 건물 전체", sourceUrl: ZIPPOOM, position: { lat: 36.81479, lng: 127.10879, accuracy: "건물" } },
  { id: "marvelous", name: "마블러스티타워", group: "민간", address: "불당22대로 92", spaces: 182, spacesNote: "매물 정보의 건물 대수", sourceUrl: "https://realty.daangn.com/articles/3809025", position: { lat: 36.81527, lng: 127.10868, accuracy: "건물" } },
  { id: "jungseok-4", name: "정석프라자 4차 (롯데시네마)", group: "민간", address: "불당21로 67-8", spaces: 167, spacesNote: "건물 전체, 주거 없음으로 보임", sourceUrl: ZIPPOOM, position: { lat: 36.8143, lng: 127.1084, accuracy: "근처" } },
  { id: "sky-tower", name: "SKY타워빌딩", group: "민간", address: "검은들1길 26", spaces: 163, spacesNote: "건물 전체", sourceUrl: ZIPPOOM, position: { lat: 36.81187, lng: 127.11067, accuracy: "건물" } },
  { id: "buldang-1", name: "불당 제1주차장", group: "공영", address: "검은들1길 15", spaces: 144, spacesNote: "유료, 24시간", sourceUrl: CAUC, position: { lat: 36.81097, lng: 127.10995, accuracy: "근처" } },
  { id: "dm-centum", name: "디엠센텀시티", group: "민간", address: "불당25로 236", spaces: 139, spacesNote: "건물 전체", sourceUrl: "https://zippoom.com/review/ApBwo6mtxLbODTnLuStYDg", position: { lat: 36.82195, lng: 127.11024, accuracy: "건물" } },
  { id: "buldang-5", name: "불당 제5주차장", group: "공영", address: "불당동 1543", spaces: 128, spacesNote: "유료, 24시간. 2021년 기사는 136면", sourceUrl: CAUC, position: null },
  { id: "buldang-3", name: "불당 제3주차장", group: "공영", address: "불당동 910", spaces: 57, spacesNote: "무료", sourceUrl: CAUC, position: null },
  { id: "buldang-2", name: "불당 제2주차장", group: "공영", address: "불당동 735", spaces: 49, spacesNote: "유료, 24시간. 170면 주차타워 계획 있음", sourceUrl: CAUC, position: null },
  { id: "buldang-4", name: "불당 제4주차장", group: "공영", address: "불당동 970", spaces: 28, spacesNote: "무료", sourceUrl: CAUC, position: null },
  { id: "cityhall", name: "천안시청", group: "공공시설", address: "번영로 156", spaces: null, spacesNote: "대수 미확인, 유료화 언급 있음", sourceUrl: "https://www.vegannews.co.kr/mobile/article.html?no=277927", position: { lat: 36.81514, lng: 127.11403, accuracy: "건물" } },
  { id: "on-city-hotel", name: "오엔시티호텔", group: "민간", address: "불당4로 105", spaces: null, spacesNote: "대수 미확인, 비투숙객 이용 조건 미확인", sourceUrl: "https://www.ktriptips.com/kor/stay/2595037", position: { lat: 36.81113, lng: 127.11137, accuracy: "건물" } },
  { id: "no-brand", name: "노브랜드 천안불당점", group: "민간", address: "불당19로 95", spaces: null, spacesNote: "대수 미확인, 구매 시 1시간 무료", sourceUrl: "https://emartapp.emart.com/branch/view.do?id=1664", position: { lat: 36.81646, lng: 127.10299, accuracy: "건물" } },
  { id: "gng-tower", name: "지앤지홀딩스타워 (씨네큐)", group: "민간", address: "불당33길 28", spaces: null, spacesNote: "대수 미확인, 관람 시 4시간 무료", sourceUrl: "https://mobile.cineq.co.kr/Home/Theater/4101", position: { lat: 36.81142, lng: 127.10776, accuracy: "근처" } },
];
