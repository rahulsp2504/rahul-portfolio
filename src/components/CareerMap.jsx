import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import './CareerMap.css';

// Fix default leaflet icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const locations = [
  {
    id: 'bit',
    label: 'BIT Bengaluru',
    sublabel: 'B.E. Electronics & Communication',
    years: '2018 – 2022',
    detail: 'CGPA 8.59 / 10.0',
    emoji: '🎓',
    color: '#f59e0b',
    colorVar: '--neon3',
    coords: [12.954869443060744, 77.57419200877986],
    popupText: 'B.E. ECE 2018–2022 · CGPA 8.59',
  },
  {
    id: 'w4t',
    label: 'W4Talent',
    sublabel: 'Software Engineer Intern',
    years: '2020 – 2021',
    detail: '+27% model accuracy',
    emoji: '🤖',
    color: '#3b82f6',
    colorVar: '--neon2',
    coords: [12.9135, 77.6383],
    popupText: 'SWE Intern 2020–2021 · +27% accuracy',
  },
  {
    id: 'target',
    label: 'Target Corporation',
    sublabel: 'Software Engineer',
    years: '2022 – 2025',
    detail: '−46% manual work · 20K req/day',
    emoji: '🗺',
    color: '#00f5c4',
    colorVar: '--neon',
    coords: [13.041717693514514, 77.61977675609569],
    popupText: 'Software Engineer 2022–2025 · −46% manual work · 20K req/day',
  },
  {
    id: 'uci',
    label: 'UC Irvine',
    sublabel: 'M.S. Computer Engineering',
    years: '2025 – Present',
    detail: 'Current · Irvine, CA',
    emoji: '🎯',
    color: '#a855f7',
    colorVar: '--neon4',
    coords: [33.64292488227152, -117.84110343103403],
    popupText: 'M.S. CS Engineering · Present',
  },
];

const polylinePositions = locations.map(l => l.coords);

function createDivIcon(emoji, color) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:36px;height:36px;border-radius:50%;
        background:${color}22;
        border:2.5px solid ${color};
        display:flex;align-items:center;justify-content:center;
        font-size:16px;
        box-shadow: 0 0 16px ${color}66, 0 0 40px ${color}22;
        cursor:pointer;
      ">${emoji}</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

function FlyTo({ coords }) {
  const map = useMap();
  React.useEffect(() => {
    if (coords) {
      map.flyTo(coords, 13, { duration: 1.4 });
    }
  }, [coords, map]);
  return null;
}

export default function CareerMap() {
  const [activeId, setActiveId] = useState(null);
  const [flyTarget, setFlyTarget] = useState(null);
  const markerRefs = useRef({});

  const handleCardClick = (loc) => {
    setActiveId(loc.id);
    setFlyTarget(loc.coords);
    setTimeout(() => {
      const marker = markerRefs.current[loc.id];
      if (marker) marker.openPopup();
    }, 1500);
  };

  return (
    <section id="career-map" className="career-map-section">
      <div className="section">
        <div className="section-header">
          <span className="sec-num">{'// 01'}</span>
          <h2>Career Map</h2>
          <div className="divider" />
        </div>

        <div className="map-layout">
          {/* Map */}
          <div className="map-wrapper">
            <MapContainer
              center={[20, 80]}
              zoom={4}
              className="leaflet-map"
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {flyTarget && <FlyTo coords={flyTarget} />}
              <Polyline
                positions={polylinePositions}
                pathOptions={{
                  color: '#00f5c4',
                  weight: 1.5,
                  dashArray: '6 8',
                  opacity: 0.5,
                }}
              />
              {locations.map((loc) => (
                <Marker
                  key={loc.id}
                  position={loc.coords}
                  icon={createDivIcon(loc.emoji, loc.color)}
                  ref={(ref) => { if (ref) markerRefs.current[loc.id] = ref; }}
                >
                  <Popup className="custom-popup">
                    <div className="popup-inner">
                      <div className="popup-emoji">{loc.emoji}</div>
                      <div>
                        <div className="popup-title">{loc.label}</div>
                        <div className="popup-sub">{loc.popupText}</div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Sidebar */}
          <div className="map-sidebar">
            <p className="sidebar-hint">Click a location to explore</p>
            {locations.map((loc, i) => (
              <button
                key={loc.id}
                className={`location-card ${activeId === loc.id ? 'active' : ''}`}
                style={{ '--loc-color': loc.color }}
                onClick={() => handleCardClick(loc)}
              >
                <div className="loc-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="loc-body">
                  <div className="loc-header">
                    <span className="loc-emoji">{loc.emoji}</span>
                    <span className="loc-label">{loc.label}</span>
                  </div>
                  <div className="loc-sublabel">{loc.sublabel}</div>
                  <div className="loc-years">{loc.years}</div>
                  <div className="loc-detail">{loc.detail}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
