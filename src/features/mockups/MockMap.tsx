"use client";

import { useEffect, useRef, useState } from "react";
import { loadNaverMaps } from "@/features/map/loadNaverMaps";
import { SERVICE_AREA } from "@/features/map/config";
import type { Lot } from "./data";

type Props = {
  lots: Lot[];
  marker: (lot: Lot, selected: boolean) => string;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  areaColor?: string;
};

export function MockMap({ lots, marker, selectedId, onSelect, areaColor = "#1f6feb" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    if (!clientId) return;
    let created: naver.maps.Map | undefined;
    let cancelled = false;
    loadNaverMaps(clientId).then(() => {
      if (cancelled || !containerRef.current) return;
      created = new naver.maps.Map(containerRef.current);
      const area = new naver.maps.Polygon({
        map: created,
        paths: [SERVICE_AREA.boundary.map(({ lat, lng }) => new naver.maps.LatLng(lat, lng))],
        strokeColor: areaColor,
        strokeWeight: 2,
        fillColor: areaColor,
        fillOpacity: 0.05,
      });
      created.fitBounds(area.getBounds());
      setMap(created);
    });
    return () => {
      cancelled = true;
      created?.destroy();
      setMap(null);
    };
  }, [areaColor]);

  useEffect(() => {
    if (!map) return;
    const markers = lots.map((lot) => {
      const m = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(lot.lat, lot.lng),
        title: lot.name,
        zIndex: lot.id === selectedId ? 100 : 10,
        icon: {
          content: `<div style="transform:translate(-50%,-50%);width:max-content;cursor:pointer">${marker(lot, lot.id === selectedId)}</div>`,
          anchor: new naver.maps.Point(0, 0),
        },
      });
      const listener = naver.maps.Event.addListener(m, "click", () => onSelect?.(lot.id));
      return { m, listener };
    });
    return () => {
      markers.forEach(({ m, listener }) => {
        naver.maps.Event.removeListener(listener);
        m.setMap(null);
      });
    };
  }, [map, lots, marker, selectedId, onSelect]);

  return <div ref={containerRef} className="mock-map" />;
}
