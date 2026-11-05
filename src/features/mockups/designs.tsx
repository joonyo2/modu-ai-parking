"use client";

import { useState, type ComponentType } from "react";
import { MockMap } from "./MockMap";
import { LOTS, STATUS_COLOR, statusOf, walkMinutes, type Lot, type Status } from "./data";

const TITLE = "스마트천안 트래픽맵";
const byFree = [...LOTS].sort((a, b) => b.free - a.free);

// 1. 신호등
const m1Marker = (l: Lot, s: boolean) =>
  `<span class="m1-pin${s ? " is-on" : ""}" style="background:${STATUS_COLOR[statusOf(l)]}">${l.free}</span>`;

function Signal() {
  const [filter, setFilter] = useState<Status | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  const shown = filter ? byFree.filter((l) => statusOf(l) === filter) : byFree;
  return (
    <div className="m1">
      <aside className="m1-rail">
        <h1>{TITLE}</h1>
        <div className="m1-housing" role="group" aria-label="혼잡도로 거르기">
          {(["혼잡", "보통", "여유"] as Status[]).map((st) => (
            <button key={st} aria-pressed={filter === st} onClick={() => setFilter(filter === st ? null : st)} style={{ color: STATUS_COLOR[st] }} className={filter && filter !== st ? "is-off" : ""}>
              <i />
              <span>{st} {LOTS.filter((l) => statusOf(l) === st).length}곳</span>
            </button>
          ))}
        </div>
        <ul>
          {shown.map((l) => (
            <li key={l.id}>
              <button onClick={() => setSel(l.id)} aria-current={sel === l.id}>
                <span>{l.name}</span>
                <b>{l.free}</b>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <MockMap lots={shown} marker={m1Marker} selectedId={sel} onSelect={setSel} areaColor="#2b2d2f" />
    </div>
  );
}

// 2. 도로 표지판
const m2Marker = (l: Lot, s: boolean) => `<span class="m2-pin${s ? " is-on" : ""}">P<small>${l.free}</small></span>`;

function RoadSign() {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="m2">
      <MockMap lots={LOTS} marker={m2Marker} selectedId={sel} onSelect={setSel} areaColor="#00703c" />
      <section className="m2-sign">
        <div className="m2-inner">
          <h1>{TITLE}</h1>
          <p>신불당 주차 안내</p>
          <ol>
            {byFree.slice(0, 4).map((l) => (
              <li key={l.id}>
                <button onClick={() => setSel(l.id)} aria-current={sel === l.id}>
                  <span>{l.name}</span>
                  <b>{l.free}면</b>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

// 3. 주차권
const m3Marker = (l: Lot, s: boolean) => `<span class="m3-pin${s ? " is-on" : ""}">${l.free}</span>`;

function Ticket() {
  const [sel, setSel] = useState<string | null>(LOTS[0].id);
  return (
    <div className="m3">
      <header>
        <h1>{TITLE}</h1>
        <p>신불당 주차장을 고르면 주차권이 앞으로 나옵니다.</p>
      </header>
      <MockMap lots={LOTS} marker={m3Marker} selectedId={sel} onSelect={setSel} areaColor="#1c1c1c" />
      <div className="m3-tickets">
        {byFree.map((l) => (
          <button key={l.id} className="m3-ticket" aria-current={sel === l.id} onClick={() => setSel(l.id)}>
            <small>{l.group} 주차장</small>
            <strong>{l.name}</strong>
            <span className="m3-row"><em>여석</em><b>{l.free}</b></span>
            <span className="m3-row"><em>요금</em><b>{l.fee}</b></span>
            <i className="m3-code" aria-hidden />
          </button>
        ))}
      </div>
    </div>
  );
}

// 4. 노면 표시
const m4Marker = (l: Lot, s: boolean) => `<span class="m4-pin${s ? " is-on" : ""}">${l.name}</span>`;

function Pavement() {
  const [sel, setSel] = useState(byFree[1].id);
  const lot = LOTS.find((l) => l.id === sel)!;
  const total = 40;
  const empty = Math.round((lot.free / lot.spaces) * total);
  return (
    <div className="m4">
      <section className="m4-asphalt">
        <h1>스마트천안<br />트래픽맵</h1>
        <div className="m4-now">
          <h2>{lot.name}</h2>
          <p>{lot.spaces}면 중 <b>{lot.free}면</b>이 비었습니다.</p>
        </div>
        <div className="m4-bays" role="img" aria-label={`전체의 ${Math.round((lot.free / lot.spaces) * 100)}퍼센트가 비어 있음`}>
          {Array.from({ length: total }, (_, i) => <i key={i} className={i < empty ? "" : "is-full"} />)}
        </div>
        <div className="m4-tabs">
          {byFree.slice(0, 6).map((l) => (
            <button key={l.id} aria-current={sel === l.id} onClick={() => setSel(l.id)}>{l.name}</button>
          ))}
        </div>
      </section>
      <MockMap lots={LOTS} marker={m4Marker} selectedId={sel} onSelect={setSel} areaColor="#2e3134" />
    </div>
  );
}

// 5. 전광판
const m5Marker = (l: Lot, s: boolean) => `<span class="m5-pin${s ? " is-on" : ""}">${String(l.free).padStart(3, "0")}</span>`;

function LedBoard() {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="m5">
      <header className="m5-board">
        <h1>{TITLE}</h1>
        <div className="m5-cells">
          {byFree.slice(0, 5).map((l) => (
            <button key={l.id} aria-current={sel === l.id} onClick={() => setSel(l.id)}>
              <span>{l.name}</span>
              <b style={{ color: statusOf(l) === "혼잡" ? "#ff4a3d" : statusOf(l) === "보통" ? "#ffb000" : "#35e06f" }}>
                {statusOf(l) === "혼잡" && l.free < 5 ? "만차" : String(l.free).padStart(3, "0")}
              </b>
            </button>
          ))}
        </div>
      </header>
      <MockMap lots={LOTS} marker={m5Marker} selectedId={sel} onSelect={setSel} areaColor="#111" />
    </div>
  );
}

// 6. 큰 글씨 목적지
const PLACES = [
  { name: "갤러리아백화점", lat: 36.8012, lng: 127.1045 },
  { name: "천안시청", lat: 36.8152, lng: 127.1138 },
  { name: "종합운동장", lat: 36.819, lng: 127.115 },
  { name: "오엔시티호텔", lat: 36.8088, lng: 127.1115 },
];
const m6Marker = (l: Lot, s: boolean) => (s ? `<span class="m6-pin">여기에 세우세요</span>` : `<span class="m6-dot"></span>`);

function BigDestination() {
  const [place, setPlace] = useState(PLACES[1]);
  const best = [...LOTS]
    .filter((l) => statusOf(l) !== "혼잡")
    .sort((a, b) => walkMinutes(a, place) - walkMinutes(b, place))[0];
  return (
    <div className="m6">
      <section className="m6-panel">
        <p className="m6-brand">{TITLE}</p>
        <h1>어디로 가세요?</h1>
        <div className="m6-places">
          {PLACES.map((p) => (
            <button key={p.name} aria-pressed={place.name === p.name} onClick={() => setPlace(p)}>{p.name}</button>
          ))}
        </div>
        <div className="m6-answer">
          <h2>{best.name}에 세우세요.</h2>
          <p>지금 {best.free}면이 비어 있고, {place.name}까지 걸어서 {walkMinutes(best, place)}분입니다.</p>
          <button className="m6-go">길 안내 시작</button>
        </div>
      </section>
      <MockMap lots={LOTS} marker={m6Marker} selectedId={best.id} areaColor="#0e7c7b" />
    </div>
  );
}

// 7. 소개 랜딩
const m7Marker = (l: Lot) => `<span class="m7-pin" style="--c:${STATUS_COLOR[statusOf(l)]}">${l.free}</span>`;

function Landing() {
  return (
    <div className="m7">
      <nav>
        <strong>{TITLE}</strong>
        <span><a href="#how">이용 방법</a><a href="#map">지도</a></span>
        <a className="m7-cta" href="#map">지도 열기</a>
      </nav>
      <section className="m7-hero">
        <h1>신불당 주차,<br />출발하기 전에 확인하세요.</h1>
        <p>주차장별 혼잡도를 보고, 목적지에서 가까운 빈자리로 바로 갑니다.</p>
        <a className="m7-cta is-big" href="#map">지도 열기</a>
      </section>
      <div className="m7-frame" id="map"><MockMap lots={LOTS} marker={m7Marker} areaColor="#3346d3" /></div>
      <section className="m7-how" id="how">
        <h2>세 단계로 끝납니다</h2>
        <ol>
          <li><h3>혼잡도 확인</h3><p>주차장마다 지금 비어 있는 면 수를 봅니다.</p></li>
          <li><h3>주차장 추천</h3><p>목적지와 혼잡도를 함께 따져 한 곳을 추천합니다.</p></li>
          <li><h3>길 안내</h3><p>추천받은 주차장 입구까지 안내합니다.</p></li>
        </ol>
      </section>
      <section className="m7-close">
        <h2>오늘 신불당에 가신다면, 먼저 지도를 열어 보세요.</h2>
        <a className="m7-cta is-big is-light" href="#map">지도 열기</a>
      </section>
      <footer><span>{TITLE}</span><span>천안시 서북구 불당동 신불당 지역</span></footer>
    </div>
  );
}

// 8. 비교표
const m8Marker = (l: Lot, s: boolean) => `<span class="m8-pin${s ? " is-on" : ""}">${l.name}</span>`;
const yesNo = (v: boolean) => (v ? <span className="m8-yes">가능</span> : <span className="m8-no">없음</span>);

function Compare() {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="m8">
      <section>
        <h1>{TITLE}</h1>
        <p>신불당 주차장 {LOTS.length}곳을 비교합니다.</p>
        <div className="m8-scroll">
          <table>
            <thead><tr><th>주차장</th><th>여석</th><th>요금</th><th>전기차</th><th>24시간</th></tr></thead>
            <tbody>
              {byFree.map((l) => (
                <tr key={l.id} className={sel === l.id ? "is-on" : ""} onMouseEnter={() => setSel(l.id)} onClick={() => setSel(l.id)}>
                  <th scope="row">{l.name}</th>
                  <td><b style={{ color: STATUS_COLOR[statusOf(l)] }}>{l.free}</b> / {l.spaces}</td>
                  <td>{l.fee}</td>
                  <td>{yesNo(l.ev)}</td>
                  <td>{yesNo(l.allDay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <MockMap lots={LOTS} marker={m8Marker} selectedId={sel} onSelect={setSel} areaColor="#16325c" />
    </div>
  );
}

// 9. 모바일
const m9Marker = (l: Lot, s: boolean) =>
  `<span class="m9-pin${s ? " is-on" : ""}"><i style="background:${STATUS_COLOR[statusOf(l)]}"></i>${l.free}</span>`;

function Mobile() {
  const [sel, setSel] = useState(byFree[0].id);
  const [open, setOpen] = useState(false);
  const lot = LOTS.find((l) => l.id === sel)!;
  return (
    <div className="m9">
      <div className="m9-side">
        <h1>스마트천안<br />트래픽맵</h1>
        <p>차에 타기 전에 휴대폰으로 확인합니다.</p>
      </div>
      <div className="m9-phone">
        <div className="m9-search">목적지를 입력하세요</div>
        <MockMap lots={LOTS} marker={m9Marker} selectedId={sel} onSelect={setSel} areaColor="#ff5a1f" />
        <section className={`m9-sheet${open ? " is-open" : ""}`}>
          <button className="m9-handle" aria-expanded={open} aria-label="주차장 목록 펼치기" onClick={() => setOpen(!open)} />
          <h2>{lot.name}</h2>
          <p><b style={{ color: STATUS_COLOR[statusOf(lot)] }}>{statusOf(lot)}</b> {lot.free}면 비어 있음, {lot.fee}</p>
          <button className="m9-go">여기로 길 안내</button>
          <ul>
            {byFree.map((l) => (
              <li key={l.id}><button onClick={() => setSel(l.id)}><span>{l.name}</span><b>{l.free}면</b></button></li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

// 10. 운영자 관제
const m10Marker = (l: Lot, s: boolean) =>
  `<span class="m10-pin${s ? " is-on" : ""}" style="border-color:${STATUS_COLOR[statusOf(l)]}">${Math.round((1 - l.free / l.spaces) * 100)}%</span>`;
const HOURS = [12, 18, 30, 52, 74, 88, 92, 80, 67, 71, 84, 60];

function Console() {
  const [sel, setSel] = useState(LOTS[3].id);
  const lot = LOTS.find((l) => l.id === sel)!;
  return (
    <div className="m10">
      <aside className="m10-tree">
        <h1>{TITLE}</h1>
        {(["공공시설", "민간", "공영"] as const).map((g) => (
          <details key={g} open>
            <summary>{g}</summary>
            <ul>
              {LOTS.filter((l) => l.group === g).map((l) => (
                <li key={l.id}>
                  <button aria-current={sel === l.id} onClick={() => setSel(l.id)}>
                    <i style={{ background: STATUS_COLOR[statusOf(l)] }} />{l.name}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </aside>
      <main className="m10-main">
        <MockMap lots={LOTS} marker={m10Marker} selectedId={sel} onSelect={setSel} areaColor="#7aa2ff" />
        <section className="m10-chart" aria-label="시간대별 점유율 예시">
          <h2>{lot.name} 시간대별 점유율</h2>
          <div>
            {HOURS.map((h, i) => (
              <span key={i}><i style={{ height: `${h}%` }} /><small>{9 + i}</small></span>
            ))}
          </div>
        </section>
      </main>
      <aside className="m10-cams">
        <h2>{lot.name}</h2>
        <p>{lot.spaces}면 중 {lot.spaces - lot.free}면 사용 중</p>
        {["입구", "지하 1층", "지하 2층"].map((c) => (
          <figure key={c}><div>영상 연동 전</div><figcaption>{c} 카메라</figcaption></figure>
        ))}
      </aside>
    </div>
  );
}

export const MOCKS: Record<string, ComponentType> = {
  "1": Signal,
  "2": RoadSign,
  "3": Ticket,
  "4": Pavement,
  "5": LedBoard,
  "6": BigDestination,
  "7": Landing,
  "8": Compare,
  "9": Mobile,
  "10": Console,
};
