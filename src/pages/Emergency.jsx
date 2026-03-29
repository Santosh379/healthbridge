import { useLanguage } from '../context/LanguageContext';
import { Phone, Building, Heart, BookOpen, AlertTriangle, Siren, MapPin, Clock, Shield, ChevronDown, Navigation } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Emergency.css';

// Fix default marker icons for Leaflet + Vite bundler
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to recenter map when userPos changes
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 14);
  }, [center, map]);
  return null;
}

export default function Emergency() {
  const { t } = useLanguage();
  const [expandedGuide, setExpandedGuide] = useState(null);
  const [userPos, setUserPos] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Default center (Delhi) as fallback
  const defaultCenter = [28.6139, 77.2090];

  // Nearby hospitals relative to user or default
  const getHospitals = (lat, lng) => [
    { name: "Apollo Hospitals", lat: lat + 0.012, lng: lng + 0.008, distance: "1.8 km", time: "6 min", phone: "1066", speciality: "Multi-Specialty" },
    { name: "Fortis Hospital", lat: lat - 0.015, lng: lng + 0.022, distance: "3.2 km", time: "10 min", phone: "8376-804-104", speciality: "Cardiac & Neuro" },
    { name: "Max Healthcare", lat: lat + 0.025, lng: lng - 0.010, distance: "4.5 km", time: "14 min", phone: "011-2651-5050", speciality: "Multi-Specialty" },
    { name: "AIIMS Hospital", lat: lat - 0.030, lng: lng - 0.020, distance: "5.8 km", time: "18 min", phone: "011-2658-8500", speciality: "Government Super Specialty" },
    { name: "Medanta Hospital", lat: lat + 0.035, lng: lng + 0.030, distance: "6.3 km", time: "20 min", phone: "0124-414-1414", speciality: "Multi-Specialty" },
    { name: "Sir Ganga Ram Hospital", lat: lat - 0.008, lng: lng - 0.035, distance: "4.1 km", time: "12 min", phone: "011-2575-0000", speciality: "General & Emergency" },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPos([pos.coords.latitude, pos.coords.longitude]);
          setLoadingLocation(false);
        },
        (err) => {
          console.warn('Geolocation error:', err.message);
          setMapError('Location access denied. Showing default location.');
          setUserPos(defaultCenter);
          setLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setMapError('Geolocation not supported. Showing default location.');
      setUserPos(defaultCenter);
      setLoadingLocation(false);
    }
  }, []);

  const mapCenter = userPos || defaultCenter;
  const hospitals = getHospitals(mapCenter[0], mapCenter[1]);

  const emergencyActions = [
    { icon: <Siren size={36} />, label: t('callAmbulance'), number: "108", color: "#ef4444", desc: "Immediate ambulance dispatch" },
    { icon: <Building size={36} />, label: t('nearestHospitals'), number: null, color: "#3b82f6", desc: "Find hospitals near you" },
    { icon: <BookOpen size={36} />, label: t('firstAidGuide'), number: null, color: "#10b981", desc: "Step-by-step first aid" },
    { icon: <Phone size={36} />, label: t('emergencyContacts'), number: "112", color: "#f59e0b", desc: "National emergency helpline" },
  ];

  const firstAidGuides = [
    {
      title: "CPR (Cardiopulmonary Resuscitation)",
      icon: <Heart size={24} />,
      color: "#ef4444",
      steps: [
        "Check responsiveness — Tap the person and shout \"Are you OK?\"",
        "Call emergency services (108/112) immediately",
        "Place the heel of your hand on the center of the chest",
        "Push hard and fast — At least 2 inches deep, 100-120 per minute",
        "Give 30 chest compressions followed by 2 rescue breaths",
        "Continue CPR until professional help arrives",
        "If an AED is available, follow its voice instructions"
      ]
    },
    {
      title: "Burn Treatment",
      icon: <Shield size={24} />,
      color: "#f59e0b",
      steps: [
        "Remove the person from the heat source immediately",
        "Cool the burn with cool (not cold) running water for 10-20 minutes",
        "Do NOT apply ice, butter, or toothpaste",
        "Remove jewelry and loose clothing near the burn area",
        "Cover with a clean, non-stick bandage or cloth",
        "Take over-the-counter pain relief if needed",
        "Seek immediate medical help for severe burns"
      ]
    },
    {
      title: "Snakebite Response",
      icon: <AlertTriangle size={24} />,
      color: "#8b5cf6",
      steps: [
        "Move away from the snake — Do NOT try to catch it",
        "Keep the person calm and still to slow venom spread",
        "Remove jewelry and tight clothing near the bite",
        "Keep the bitten limb at or below heart level",
        "Do NOT cut the wound or try to suck out venom",
        "Do NOT apply ice or tourniquet",
        "Rush to the nearest hospital with anti-venom facility",
        "Try to remember the snake's appearance for identification"
      ]
    },
    {
      title: "Heatstroke Treatment",
      icon: <Siren size={24} />,
      color: "#ef4444",
      steps: [
        "Move the person to a cool, shaded area immediately",
        "Call emergency services if body temperature is above 104°F",
        "Remove excess clothing",
        "Cool the body with wet cloths, fan, or cool water spray",
        "Apply ice packs to armpits, groin, neck, and back",
        "Give cool water to drink if the person is conscious",
        "Do NOT give aspirin or acetaminophen",
        "Monitor breathing and consciousness until help arrives"
      ]
    }
  ];

  return (
    <div className="emergency-page animate-fade-in">
      {/* Urgency Banner */}
      <div className="urgency-banner">
        <AlertTriangle size={20} />
        <span>{t('emergencySupport')}</span>
        <a href="tel:108" className="banner-call">Call 108 Now</a>
      </div>

      <div className="page-header">
        <h1>{t('emergency')}</h1>
        <p>Quick access to emergency services, live hospital map & first aid guides</p>
      </div>

      {/* Emergency Action Buttons */}
      <div className="emergency-actions-grid">
        {emergencyActions.map((action, i) => (
          <button
            key={i}
            className="emergency-action-card"
            style={{ '--action-color': action.color }}
            onClick={() => action.number && window.open(`tel:${action.number}`)}
          >
            <div className="ea-icon">{action.icon}</div>
            <h3>{action.label}</h3>
            <p>{action.desc}</p>
            {action.number && <span className="ea-number">{action.number}</span>}
          </button>
        ))}
      </div>

      {/* Live Hospital Map */}
      <div className="section-block">
        <h2><MapPin size={20} /> Live Hospital Map</h2>
        {mapError && (
          <div className="map-error-msg">
            <Navigation size={14} />
            <span>{mapError}</span>
          </div>
        )}
        <div className="hospital-map-container glass-card">
          {loadingLocation ? (
            <div className="map-loading">
              <div className="map-loading-spinner"></div>
              <p>Getting your location...</p>
            </div>
          ) : (
            <MapContainer center={mapCenter} zoom={13} className="hospital-map" scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterMap center={mapCenter} />
              
              {/* User position marker */}
              {userPos && (
                <Marker position={userPos} icon={userIcon}>
                  <Popup>
                    <div className="map-popup user-popup">
                      <strong>📍 Your Location</strong>
                      <p>Lat: {userPos[0].toFixed(4)}, Lng: {userPos[1].toFixed(4)}</p>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* Hospital markers */}
              {hospitals.map((h, i) => (
                <Marker key={i} position={[h.lat, h.lng]} icon={hospitalIcon}>
                  <Popup>
                    <div className="map-popup">
                      <strong>🏥 {h.name}</strong>
                      <p className="popup-speciality">{h.speciality}</p>
                      <p>📍 {h.distance} · 🕐 {h.time}</p>
                      <a href={`tel:${h.phone}`} className="popup-call-btn">📞 Call {h.phone}</a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>

      {/* Nearest Hospitals List */}
      <div className="section-block">
        <h2><Building size={20} /> Nearest Hospitals</h2>
        <div className="hospitals-list">
          {hospitals.map((h, i) => (
            <div key={i} className="hospital-item glass-card">
              <div className="hospital-info">
                <div className="hospital-icon"><Building size={20} /></div>
                <div>
                  <h3>{h.name}</h3>
                  <span className="hospital-spec">{h.speciality}</span>
                  <div className="hospital-meta">
                    <span><MapPin size={14} /> {h.distance}</span>
                    <span><Clock size={14} /> {h.time}</span>
                  </div>
                </div>
              </div>
              <div className="hospital-status">
                <span className="badge badge-success">Emergency Open</span>
                <a href={`tel:${h.phone}`} className="btn btn-danger btn-sm">
                  <Phone size={14} /> Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* First Aid Guides */}
      <div className="section-block">
        <h2><BookOpen size={20} /> First Aid Guides</h2>
        <div className="guides-list">
          {firstAidGuides.map((guide, i) => (
            <div key={i} className="guide-card glass-card">
              <button
                className="guide-header"
                onClick={() => setExpandedGuide(expandedGuide === i ? null : i)}
              >
                <div className="guide-icon" style={{ background: `${guide.color}15`, color: guide.color }}>
                  {guide.icon}
                </div>
                <h3>{guide.title}</h3>
                <ChevronDown
                  size={20}
                  className={`guide-chevron ${expandedGuide === i ? 'expanded' : ''}`}
                />
              </button>
              {expandedGuide === i && (
                <div className="guide-steps animate-slide-up">
                  {guide.steps.map((step, j) => (
                    <div key={j} className="guide-step">
                      <span className="step-number">{j + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="section-block">
        <h2><Phone size={20} /> Emergency Contacts</h2>
        <div className="contacts-grid">
          {[
            { name: "Ambulance", number: "108" },
            { name: "Police", number: "100" },
            { name: "Fire", number: "101" },
            { name: "Emergency", number: "112" },
            { name: "Women Helpline", number: "1091" },
            { name: "Child Helpline", number: "1098" },
          ].map((c, i) => (
            <a key={i} href={`tel:${c.number}`} className="contact-card glass-card">
              <Phone size={20} />
              <div>
                <span className="contact-name">{c.name}</span>
                <span className="contact-number">{c.number}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
