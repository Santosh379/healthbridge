import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Stethoscope, Calendar, AlertTriangle, FileText, Shield, Activity, ChevronRight, Moon, Sun, Globe, Star, ArrowRight, Bot, Pill, MapPin, Bell, Mic } from 'lucide-react';
import './Landing.css';
}


class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

export default function Landing() {
  // Assignment Requirement
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

  const features = [
    { icon: <Bot size={28} />, title: "AI Health Assistant", desc: "24/7 intelligent chatbot for instant health guidance, first aid, and medical advice in real-time", color: "#6366f1", tag: "AI-Powered" },
    { icon: <Stethoscope size={28} />, title: "80+ Symptom Analyzer", desc: "Voice-enabled symptom checker with detailed AI analysis, home remedies, and specialist recommendations", color: "#3b82f6", tag: "Voice Input" },
    { icon: <Calendar size={28} />, title: "Smart Booking", desc: "Book appointments with top doctors, get push notification reminders, and track with live countdown", color: "#10b981", tag: "Notifications" },
    { icon: <Pill size={28} />, title: "Drug Interaction Checker", desc: "Enter your medications — AI checks for dangerous drug interactions and flags risks instantly", color: "#f59e0b", tag: "Safety" },
    { icon: <MapPin size={28} />, title: "Live Hospital Map", desc: "Interactive Leaflet.js map showing nearest hospitals and clinics with real-time status", color: "#ef4444", tag: "GPS-Enabled" },
    { icon: <FileText size={28} />, title: "Universal Reports", desc: "Auto-generated medical reports after every appointment — works for any hospital worldwide", color: "#8b5cf6", tag: "Universal" },
    { icon: <Star size={28} />, title: "Doctor Reviews", desc: "Rate and review doctors after appointments. Help others choose the best healthcare providers", color: "#ec4899", tag: "Community" },
    { icon: <Shield size={28} />, title: "Emergency Services", desc: "One-tap ambulance call, nearest hospital finder, and comprehensive first aid guides", color: "#14b8a6", tag: "Life-Saving" },
  ];

  const specialties = [
    { icon: <Heart />, name: "Cardiologist", color: "#ef4444" },
    { icon: <Activity />, name: "Neurologist", color: "#8b5cf6" },
    { icon: <Shield />, name: "Dermatologist", color: "#ec4899" },
    { icon: <Stethoscope />, name: "General Physician", color: "#10b981" },
    { icon: <Pill />, name: "Dentist", color: "#3b82f6" },
    { icon: <AlertTriangle />, name: "Psychiatrist", color: "#f59e0b" },
  ];

  return (
    <div className="landing-page" data-theme={theme}>
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo"><Heart size={24} /> <span>HealthBridge</span></Link>
          <div className="nav-right">
            <Link to="/portfolio" className="nav-link">Portfolio</Link>
            <button className="nav-theme-btn" onClick={toggleTheme}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
            <Link to="/login" className="nav-link">{t('login')}</Link>
            <Link to="/register" className="btn btn-primary nav-cta">{t('getStarted')}</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-effects">
          <div className="hero-gradient-orb orb-1"></div>
          <div className="hero-gradient-orb orb-2"></div>
          <div className="hero-gradient-orb orb-3"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Bot size={14} /> AI-Powered Healthcare for Everyone
            </div>
            <h1 className="hero-title">
              {t('heroTitle')}
            </h1>
            <p className="hero-subtitle">
              {t('heroSubtitle')}
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-xl hero-btn">
                {t('getStarted')} <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn btn-secondary btn-xl hero-btn">
                Explore Platform
              </Link>
            </div>

            <div className="hero-capabilities">
              {[
                { icon: <Mic size={14} />, text: "Voice Input" },
                { icon: <Bot size={14} />, text: "AI Chatbot" },
                { icon: <Pill size={14} />, text: "Drug Safety" },
                { icon: <MapPin size={14} />, text: "Live Maps" },
                { icon: <Bell size={14} />, text: "Smart Reminders" },
              ].map((cap, i) => (
                <span key={i} className="capability-tag">
                  {cap.icon} {cap.text}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-stack">
              <div className="floating-card card-vitals">
                <Activity size={20} />
                <div>
                  <span className="fc-label">Heart Rate</span>
                  <span className="fc-value">72 <small>BPM</small></span>
                </div>
                <div className="vitals-wave">
                  <svg viewBox="0 0 120 40" className="wave-svg">
                    <polyline points="0,20 10,20 15,8 20,32 25,12 30,28 35,20 45,20 55,20 60,8 65,32 70,15 75,25 80,20 90,20 100,20 105,10 110,30 115,20 120,20" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>

              <div className="floating-card card-ai">
                <Bot size={20} />
                <div>
                  <span className="fc-label">AI Analysis</span>
                  <span className="fc-value-sm">Analyzing 80+ symptoms</span>
                </div>
              </div>

              <div className="floating-card card-appointment">
                <Calendar size={20} />
                <div>
                  <span className="fc-label">Next Appointment</span>
                  <span className="fc-value-sm">Tomorrow, 10:00 AM</span>
                </div>
              </div>

              <div className="hero-center-icon">
                <Heart size={48} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Everything You Need For Smarter Healthcare</h2>
            <p>Powerful features that make HealthBridge the most comprehensive healthcare platform</p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{ '--feature-color': f.color }}>
                <div className="feature-tag">{f.tag}</div>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <Link to="/register" className="feature-link">
                  Try it free <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="section-container">
          <div className="section-header">
            <h2>How HealthBridge Works</h2>
            <p>Three simple steps to better healthcare</p>
          </div>
          <div className="how-steps">
            {[
              { num: "01", title: "Sign Up Free", desc: "Create your account in seconds. No credit card needed. Works worldwide.", icon: <Shield size={28} /> },
              { num: "02", title: "Describe Symptoms", desc: "Type or use voice input. Our AI analyzes 80+ symptoms and provides instant guidance.", icon: <Mic size={28} /> },
              { num: "03", title: "Get Care", desc: "Book doctors, get reports, check drug interactions, and access emergency help.", icon: <Heart size={28} /> },
            ].map((step, i) => (
              <div key={i} className="how-step-card">
                <span className="how-step-num">{step.num}</span>
                <div className="how-step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="specialties-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Browse by Specialty</h2>
            <p>Connect with expert doctors across all medical fields</p>
          </div>
          <div className="specialties-grid">
            {specialties.map((s, i) => (
              <Link to="/register" key={i} className="specialty-card" style={{ '--spec-color': s.color }}>
                <div className="specialty-icon">{s.icon}</div>
                <span className="specialty-name">{s.name}</span>
                <ArrowRight size={16} className="specialty-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Transform Your Healthcare Experience?</h2>
            <p>Join thousands of users worldwide. Free to use. No hospital restrictions.</p>
            <Link to="/register" className="btn btn-primary btn-xl cta-btn">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3><Heart size={20} /> HealthBridge</h3>
              <p>Universal healthcare companion. Smart, secure, and available worldwide for everyone.</p>
            </div>
            <div className="footer-links">
              <h4>Platform</h4>
              <Link to="/register">Symptom Checker</Link>
              <Link to="/register">Find Doctors</Link>
              <Link to="/register">Drug Checker</Link>
              <Link to="/register">AI Assistant</Link>
            </div>
            <div className="footer-links">
              <h4>Emergency</h4>
              <span>🚑 Ambulance: 108</span>
              <span>📞 Emergency: 112</span>
              <span>🏥 Available worldwide</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 HealthBridge. Built for universal healthcare access. 💙</p>
            <p>Developed by <Link to="/portfolio" style={{ color: 'inherit', textDecoration: 'underline' }}>Santosh Darisi</Link></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
