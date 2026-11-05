"use client";

import { useMemo, useState } from "react";
import { NaverMap, type MapMarker } from "@/features/map/NaverMap";
import { CONGESTION_COLOR, sampleCongestion, type CongestionLevel } from "@/features/congestion/sample";
import { PARKING_LOTS } from "./data";
import "./screen.css";

const LAMPS: CongestionLevel[] = ["혼잡", "보통", "여유"];

function countOf(level: CongestionLevel) {
  return PARKING_LOTS.filter((lot) => sampleCongestion(lot.id) === level).length;
}

export function ParkingMapScreen() {
  const [filter, setFilter] = useState<CongestionLevel | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const shown = useMemo(
    () => (filter ? PARKING_LOTS.filter((lot) => sampleCongestion(lot.id) === filter) : PARKING_LOTS),
    [filter],
  );

  const markers = useMemo<MapMarker[]>(
    () =>
      shown.flatMap((lot) =>
        lot.position
          ? [
              {
                id: lot.id,
                title: lot.name,
                lat: lot.position.lat,
                lng: lot.position.lng,
                html:
                  lot.id === selectedId
                    ? `<span class="tm-pin is-selected" style="background:${CONGESTION_COLOR[sampleCongestion(lot.id)]}">${lot.name} ${lot.spaces ? `${lot.spaces.toLocaleString()}대` : ""}</span>`
                    : `<span class="tm-pin" style="background:${CONGESTION_COLOR[sampleCongestion(lot.id)]}"></span>`,
              },
            ]
          : [],
      ),
    [shown, selectedId],
  );

  const selected = PARKING_LOTS.find((lot) => lot.id === selectedId);

  return (
    <div className="tm">
      <aside className="tm-rail">
        <h1>스마트천안 트래픽맵</h1>
        <p className="tm-notice">혼잡도는 예시입니다. 실제 수집 전입니다.</p>
        <div className="tm-signal" role="group" aria-label="혼잡도로 주차장 거르기">
          {LAMPS.map((level) => (
            <button
              key={level}
              aria-pressed={filter === level}
              className={filter && filter !== level ? "is-off" : ""}
              style={{ color: CONGESTION_COLOR[level] }}
              onClick={() => setFilter(filter === level ? null : level)}
            >
              <i />
              <span>{level} {countOf(level)}곳</span>
            </button>
          ))}
        </div>

        {selected && (
          <section className="tm-detail">
            <h2>{selected.name}</h2>
            <p>{selected.address}</p>
            <p>{selected.spaces ? `${selected.spaces.toLocaleString()}대` : "대수 미확인"}</p>
            <p className="tm-note">{selected.spacesNote}</p>
            {!selected.position && <p className="tm-note">위치 확인이 필요해 지도에 표시하지 않았습니다.</p>}
            {selected.position?.accuracy === "근처" && <p className="tm-note">지도 위치는 건물 근처로 표시됩니다.</p>}
            <a href={selected.sourceUrl} target="_blank" rel="noreferrer">자료 출처 보기</a>
          </section>
        )}

        <ul className="tm-list">
          {shown.map((lot) => (
            <li key={lot.id}>
              <button aria-current={lot.id === selectedId} onClick={() => setSelectedId(lot.id)}>
                <i style={{ background: CONGESTION_COLOR[sampleCongestion(lot.id)] }} />
                <span>{lot.name}</span>
                <b>{lot.spaces ? lot.spaces.toLocaleString() : "미확인"}</b>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="tm-map">
        <NaverMap markers={markers} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
    </div>
  );
}
