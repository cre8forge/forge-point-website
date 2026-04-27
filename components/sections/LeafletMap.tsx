"use client";

import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";

// Regional service areas — large overlapping circles that show broad coverage
// rather than individual zip codes
const SERVICE_REGIONS = [
  { name: "Longmont",              lat: 40.167,  lng: -105.101, radius: 14000 },
  { name: "Firestone · Frederick", lat: 40.110,  lng: -104.940, radius: 12000 },
  { name: "Erie",                  lat: 40.052,  lng: -105.042, radius: 11000 },
  { name: "Boulder",               lat: 40.015,  lng: -105.270, radius: 13000 },
  { name: "Lafayette · Louisville", lat: 39.985, lng: -105.115, radius: 11000 },
  { name: "Broomfield",            lat: 39.924,  lng: -105.047, radius: 12000 },
  { name: "Brighton",              lat: 40.025,  lng: -104.820, radius: 12000 },
  { name: "Thornton · Northglenn", lat: 39.883,  lng: -104.972, radius: 12000 },
  { name: "Westminster · Arvada",  lat: 39.852,  lng: -105.070, radius: 13000 },
  { name: "N. Denver Metro",       lat: 39.780,  lng: -104.985, radius: 11000 },
] as const;

const CIRCLE_OPTIONS = {
  color:       "#C85A00",
  fillColor:   "#C85A00",
  fillOpacity: 0.15,
  weight:      1.5,
  opacity:     0.65,
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
      center={[39.98, -105.04]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ height, width: "100%", borderRadius: "2px" }}
      className="z-0"
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTR} />

      {SERVICE_REGIONS.map((region) => (
        <Circle
          key={region.name}
          center={[region.lat, region.lng]}
          radius={region.radius}
          pathOptions={CIRCLE_OPTIONS}
        >
          <Tooltip direction="top" opacity={0.9}>
            <span className="font-sans text-xs font-semibold">
              {region.name}
            </span>
          </Tooltip>
        </Circle>
      ))}
    </MapContainer>
  );
}
