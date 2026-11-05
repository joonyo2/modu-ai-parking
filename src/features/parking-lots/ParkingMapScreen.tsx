"use client";

import { useMemo, useState } from "react";
import { NaverMap, type MapMarker } from "@/features/map/NaverMap";
import { PARKING_LOTS, type LotGroup } from "./data";
import "./screen.css";

const GROUPS: LotGroup[] = ["민간", "공공시설", "공영"];

const GROUP_COLOR: Record<LotGroup, string> = {
  민간: "#f0a400",
  공공시설: "#3f8cff",
  공영: "#14a39a",
};

const BY_SIZE = [...PARKING_LOTS].sort((a, b) => (b.spaces ?? -1) - (a.spaces ?? -1));

function spacesText(spaces: number | null) {
  return spaces ? `${spaces.toLocaleString()}대` : "대수 미확인";
}

export function ParkingMapScreen() {
  const [filter, setFilter] = useState<LotGroup | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const shown = useMemo(() => (filter ? BY_SIZE.filter((lot) => lot.group === filter) : BY_SIZE), [filter]);

  const markers = useMemo<MapMarker[]>(
    () =>
      shown.map((lot) => {
        const color = GROUP_COLOR[lot.group];
        return {
          id: lot.id,
          title: lot.name,
          lat: lot.position.lat,
          lng: lot.position.lng,
          html:
            lot.id === selectedId
              ? `<span class="tm-pin is-selected" style="background:${color}">${lot.name} ${spacesText(lot.spaces)}</span>`
              : `<span class="tm-pin" style="background:${color}"></span>`,
        };
      }),
    [shown, selectedId],
  );

  const selected = PARKING_LOTS.find((lot) => lot.id === selectedId);

  return (
    <div className="tm">
      <aside className="tm-rail">
        <h1>스마트천안 트래픽맵</h1>
        <p className="tm-notice">신불당 주차장 후보 {PARKING_LOTS.length}곳입니다. 대수는 공개 자료의 전체 규모이고, 실시간 정보가 아닙니다.</p>
        <div className="tm-signal" role="group" aria-label="주차장 구분으로 거르기">
          {GROUPS.map((group) => (
            <button
              key={group}
              aria-pressed={filter === group}
              className={filter && filter !== group ? "is-off" : ""}
              style={{ color: GROUP_COLOR[group] }}
              onClick={() => setFilter(filter === group ? null : group)}
            >
              <i />
              <span>{group} {PARKING_LOTS.filter((lot) => lot.group === group).length}곳</span>
            </button>
          ))}
        </div>

        {selected && (
          <section className="tm-detail">
            <h2>{selected.name}</h2>
            <p>{selected.address}</p>
            <p>{spacesText(selected.spaces)}</p>
            <p className="tm-note">{selected.spacesNote}</p>
            {selected.position.accuracy === "근처" && <p className="tm-note">지도 위치는 건물 근처로 표시됩니다.</p>}
            <a href={selected.sourceUrl} target="_blank" rel="noreferrer">자료 출처 보기</a>
          </section>
        )}

        <ul className="tm-list">
          {shown.map((lot) => (
            <li key={lot.id}>
              <button aria-current={lot.id === selectedId} onClick={() => setSelectedId(lot.id)}>
                <i style={{ background: GROUP_COLOR[lot.group] }} />
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
