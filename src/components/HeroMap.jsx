import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useTheme } from '../context/ThemeContext';
import 'leaflet/dist/leaflet.css';

const pins = [
  {
    id: 'uci',
    lat: 33.6846, lng: -117.8265,
    color: '#a855f7',
    emoji: '🎓',
    place: 'UC Irvine',
    city: 'Irvine, CA · USA',
    role: 'M.S. CS Eng · Present',
    stat: 'Expected Dec 2026',
    zoom: 12,
  },
  {
    id: 'target',
    lat: 12.9352, lng: 77.6245,
    color: '#00f5c4',
    emoji: '🎯',
    place: 'Target Corporation',
    city: 'Bengaluru, India',
    role: 'Software Engineer · 2022–2025',
    stat: 'Full Stack · Geospatial · AI Systems',
    zoom: 13,
  },
  {
    id: 'bit',
    lat: 12.9716, lng: 77.5946,
    color: '#f59e0b',
    emoji: '🎓',
    place: 'Bangalore Institute of Technology',
    city: 'Bengaluru, India',
    role: 'B.E. ECE · 2018–2022',
    stat: 'CGPA 8.59 / 10',
    zoom: 12,
  },
  {
    id: 'w4',
    lat: 12.9135, lng: 77.6383,
    color: '#3b82f6',
    emoji: '🤖',
    place: 'W4Talent',
    city: 'Bengaluru, India',
    role: 'SWE Intern · 2020',
    stat: 'ML · AI · Deep Learning',
    zoom: 13,
  }
];

export default function HeroMap() {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const markersRef = useRef({});
  const [activePin, setActivePin] = useState('target');
  const { isDark } = useTheme();

  useEffect(() => {
    if (instanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [25, 78],
      zoom: 3,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    pins.forEach(p => {
      const marker = L.marker([p.lat, p.lng], {
        icon: L.divIcon({
          className: '',
          html: `<div style="
            width:30px;height:30px;border-radius:50%;
            background:rgba(8,12,20,0.9);
            border:2px solid ${p.color};
            display:flex;align-items:center;justify-content:center;
            font-size:0.85rem;
            box-shadow:0 0 14px ${p.color}70;
          ">${p.emoji}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -18],
        }),
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family:'JetBrains Mono',monospace;min-width:180px;padding:0.2rem 0">
          <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:0.88rem;color:${p.color};margin-bottom:0.3rem">${p.place}</div>
          <div style="font-size:0.7rem;color:#5d7a99;margin-bottom:0.4rem;line-height:1.5">${p.role}</div>
          <div style="font-size:0.72rem;color:#e2eaf5">${p.stat}</div>
        </div>
      `);

      markersRef.current[p.id] = { marker, map };
    });

    L.polyline(pins.map(p => [p.lat, p.lng]), {
      color: 'rgba(0,245,196,0.35)',
      weight: 1.5,
      dashArray: '6 6',
    }).addTo(map);

    instanceRef.current = map;
  }, []);

  // Apply dark/light tile filter
  useEffect(() => {
    if (!mapRef.current) return;
    const tiles = mapRef.current.querySelector('.leaflet-tile-pane');
    if (tiles) {
      tiles.style.filter = isDark
        ? 'invert(1) hue-rotate(180deg) brightness(0.6) saturate(0.7) contrast(1.1)'
        : 'none';
    }
  }, [isDark]);

  // Handle pin card click
  const handlePinClick = (pin) => {
    setActivePin(pin.id);
    const map = instanceRef.current;
    if (!map) return;
    map.flyTo([pin.lat, pin.lng], pin.zoom, { duration: 1.2 });
    setTimeout(() => {
      markersRef.current[pin.id]?.marker.openPopup();
    }, 1300);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 180px',
      gap: '0.75rem',
      height: '440px',
      width: '100%',
    }}>
      {/* MAP */}
      <div style={{
        border: '1px solid var(--border)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '60px',
          background: 'linear-gradient(transparent, var(--bg))',
          pointerEvents: 'none',
          zIndex: 1000,
        }} />
      </div>

      {/* PIN CARDS SIDEBAR */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        overflowY: 'auto',
      }}>
        {pins.map(pin => (
          <div
            key={pin.id}
            onClick={() => handlePinClick(pin)}
            style={{
              background: activePin === pin.id ? 'rgba(0,245,196,0.05)' : 'var(--surface)',
              border: `1px solid ${activePin === pin.id ? pin.color : 'var(--border)'}`,
              padding: '0.7rem 0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {/* left accent bar */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '3px', height: '100%',
              background: pin.color,
            }} />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '0.3rem',
              paddingLeft: '0.4rem',
            }}>
              <span style={{ fontSize: '0.8rem' }}>{pin.emoji}</span>
              <span style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '0.72rem',
                color: 'var(--text)',
                lineHeight: 1.2,
              }}>{pin.city.split(',')[0]}</span>
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              color: 'var(--muted)',
              paddingLeft: '0.4rem',
              lineHeight: 1.4,
            }}>
              {pin.role.split('·')[0].trim()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
