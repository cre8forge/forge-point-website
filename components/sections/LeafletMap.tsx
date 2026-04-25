"use client";

import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";

const SERVICE_AREA = [
  { zip: "80516", name: "Erie",          lat: 40.0505, lng: -105.0472 },
  { zip: "80504", name: "Longmont E",    lat: 40.1500, lng: -104.9889 },
  { zip: "80550", name: "Windsor",       lat: 40.4775, lng: -104.9011 },
  { zip: "80514", name: "Dacono",        lat: 40.0853, lng: -104.9422 },
  { zip: "80520", name: "Firestone",     lat: 40.1522, lng: -104.9506 },
  { zip: "80530", name: "Frederick",     lat: 40.1006, lng: -104.9281 },
  { zip: "80026", name: "Lafayette",     lat: 39.9939, lng: -105.0894 },
  { zip: "80027", name: "Louisville",    lat: 39.9778, lng: -105.1442 },
  { zip: "80023", name: "Broomfield N",  lat: 39.9716, lng: -104.9475 },
  { zip: "80501", name: "Longmont W",    lat: 40.1672, lng: -105.1019 },
  { zip: "80503", name: "Gunbarrel",     lat: 40.0753, lng: -105.1558 },
  { zip: "80301", name: "Boulder N",     lat: 40.0586, lng: -105.2544 },
  { zip: "80303", name: "Boulder S",     lat: 40.0039, lng: -105.2186 },
  { zip: "80602", name: "Brighton N",    lat: 39.9469, lng: -104.9700 },
  { zip: "80603", name: "Brighton",      lat: 40.0247, lng: -104.8089 },
] as const;

const CIRCLE_OPTIONS = {
  color:       "#C85A00",
  fillColor:   "#C85A00",
  fillOpacity: 0.18,
  weight:      1.5,
  opacity:     0.75,
};

// CartoDB Dark Matter tiles — free, no API key, matches brand
const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

interface LeafletMapProps {
  height?: string;
}

export function LeafletMap({ height = "420px" }: LeafletMapProps) {
  return (
    <MapContainer
      center={[40.12, -105.07]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ height, width: "100%", borderRadius: "2px" }}
      className="z-0"
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTR} />

      {SERVICE_AREA.map((area) => (
        <Circle
          key={area.zip}
          center={[area.lat, area.lng]}
          radius={4800}
          pathOptions={CIRCLE_OPTIONS}
        >
          <Tooltip direction="top" opacity={0.9}>
            <span className="font-sans text-xs font-semibold">
              {area.name} · {area.zip}
            </span>
          </Tooltip>
        </Circle>
      ))}
    </MapContainer>
  );
}
