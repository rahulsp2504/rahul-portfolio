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

export default function HeroMap({ fullscreen = false, onClose }) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const markersRef = useRef({});
  const [activePin, setActivePin] = useState('target');
  const { isDark } = useTheme();

  useEffect(() => {
    if (instanceRef.current || !mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [33.684023644500854, -117.80864814845685],
      zoom: 10,
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

  useEffect(() => {
    const map = instanceRef.current;
    if (!map) return;

    if (fullscreen) {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      // Wait for React to apply fullscreen DOM layout before invalidating Leaflet
      setTimeout(() => {
        map.invalidateSize({ animate: false });
        map.setView([25, 40], 3); // Changed from flyTo to setView for instant snap, preventing NaN from animations during layout shift
      }, 100);
      setTimeout(() => {
        map.invalidateSize({ animate: false });
      }, 400);
    } else {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      setTimeout(() => {
        map.invalidateSize({ animate: false });
      }, 100);
    }
  }, [fullscreen]);

  // Handle pin card click
  const handlePinClick = (pin) => {
    setActivePin(pin.id);
    const map = instanceRef.current;
    if (!map) return;

    // Explicitly validate Lat/Lng before calling flyTo
    if (pin.lat && pin.lng) {
      map.flyTo([pin.lat, pin.lng], pin.zoom, { duration: 1.2 });
      setTimeout(() => {
        markersRef.current[pin.id]?.marker.openPopup();
      }, 1300);
    }
  };

  const containerStyle = fullscreen ? {
    position: 'fixed',
    inset: 0,
    zIndex: 99999, /* High z-index */
    background: 'var(--bg)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'fadeIn 0.2s ease',
  } : {
    display: 'grid',
    gridTemplateColumns: '1fr 180px',
    gap: '0.75rem',
    height: '100%',
    width: '100%',
  };

  const gridStyle = fullscreen ? {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 280px',
    gap: '0',
    overflow: 'hidden',
  } : {
    display: 'contents'
  };

  return (
    <div style={containerStyle} className={`hero-map-root ${fullscreen ? "map-fullscreen-overlay map-fullscreen-enter" : ""}`}>

      {/* Fullscreen header bar */}
      {fullscreen && (
        <div className="map-fullscreen-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.8rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
          zIndex: 10000,
          flexShrink: 0,
        }}>
          <button onClick={onClose} style={{
            background: 'transparent',
            border: '1px solid var(--neon)',
            color: 'var(--neon)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            padding: '0.4rem 1rem',
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}>
            ✕ CLOSE MAP
          </button>
        </div>
      )}

      {/* Map + Sidebar layout (changes via gridStyle between normal/fullscreen) */}
      <div className={fullscreen ? "map-fullscreen-grid" : ""} style={gridStyle}>

        {/* MAP CONTAINER */}
        <div style={{
          border: fullscreen ? 'none' : '1px solid var(--border)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div ref={mapRef} style={{ height: '100%', width: '100%' }} />

          {/* Bottom fade (hide in fullscreen) */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '60px',
            background: 'linear-gradient(transparent, var(--bg))',
            pointerEvents: 'none',
            zIndex: 1000,
            display: fullscreen ? 'none' : 'block'
          }} />

          {/* Label (hide in fullscreen since it has a top header) */}
          <div style={{
            position: 'absolute',
            bottom: '0.6rem', left: '0.8rem',
            zIndex: 1001,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem',
            color: 'var(--neon)',
            letterSpacing: '0.08em',
            display: fullscreen ? 'none' : 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
          </div>
        </div>

        {/* PIN CARDS SIDEBAR */}
        <div className="pin-sidebar map-fullscreen-sidebar" style={fullscreen ? {
          borderLeft: '1px solid var(--border)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          background: 'var(--bg)',
        } : {
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
                padding: fullscreen ? '1.2rem 1.5rem' : '0.7rem 0.8rem',
                borderBottom: fullscreen ? '1px solid var(--border)' : 'none',
                background: activePin === pin.id ? 'rgba(0,245,196,0.05)' : (fullscreen ? 'transparent' : 'var(--surface)'),
                border: fullscreen ? 'none' : `1px solid ${activePin === pin.id ? pin.color : 'var(--border)'}`,
                borderLeft: fullscreen ? `3px solid ${activePin === pin.id ? pin.color : 'transparent'}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden',
                flex: fullscreen ? 'none' : 1,
              }}
            >
              {/* left accent bar (normal mode) */}
              {!fullscreen && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '3px', height: '100%',
                  background: pin.color,
                }} />
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: fullscreen ? '0.5rem' : '0.4rem',
                marginBottom: fullscreen ? '0.4rem' : '0.3rem',
                paddingLeft: fullscreen ? '0' : '0.4rem',
              }}>
                <span style={{ fontSize: fullscreen ? '1rem' : '0.8rem' }}>{pin.emoji}</span>
                <span style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: fullscreen ? '0.9rem' : '0.72rem',
                  color: 'var(--text)',
                  lineHeight: 1.2,
                }}>{fullscreen ? pin.city : pin.city.split(',')[0]}</span>
              </div>

              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: fullscreen ? '0.72rem' : '0.6rem',
                color: 'var(--muted)',
                paddingLeft: fullscreen ? '0' : '0.4rem',
                marginBottom: fullscreen ? '0.3rem' : '0',
                lineHeight: 1.4,
              }}>
                {fullscreen ? pin.role : pin.role.split('·')[0].trim()}
              </div>

              {fullscreen && (
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  color: pin.color,
                }}>{pin.stat}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
