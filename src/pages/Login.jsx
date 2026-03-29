import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Mail, Lock, LogIn, Eye, EyeOff, Stethoscope, Shield, Activity, Bot, ChevronRight } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      login(email, password, role);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="auth-page">
      {/* Left Panel - Animated */}
      <div className="auth-visual-panel">
        <div className="auth-visual-bg">
          <div className="auth-orb auth-orb-1"></div>
          <div className="auth-orb auth-orb-2"></div>
          <div className="auth-orb auth-orb-3"></div>
        </div>
        
        <div className="auth-visual-content">
          <div className="auth-logo-large">
            <Heart size={40} />
          </div>
          <h1>HealthBridge</h1>
          <p>Your AI-powered healthcare companion. Smart, secure, and always available.</p>

          <div className="auth-features-list">
            {[
              { icon: <Bot size={18} />, text: "24/7 AI Health Assistant" },
              { icon: <Stethoscope size={18} />, text: "80+ Symptom Analysis" },
              { icon: <Shield size={18} />, text: "Drug Interaction Safety" },
              { icon: <Activity size={18} />, text: "Universal Medical Reports" },
            ].map((f, i) => (
              <div key={i} className="auth-feature-item" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="auth-feature-icon">{f.icon}</div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Heartbeat Line */}
          <div className="heartbeat-line">
            <svg viewBox="0 0 600 60" className="heartbeat-svg">
              <polyline points="0,30 50,30 80,30 95,10 110,50 125,5 140,55 155,30 200,30 250,30 280,30 295,12 310,48 325,8 340,52 355,30 400,30 450,30 480,30 495,10 510,50 525,5 540,55 555,30 600,30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <Link to="/" className="auth-back-link"><Heart size={20} /> HealthBridge</Link>
            <h2>{t('welcomeBack')}</h2>
            <p>Sign in to access your healthcare dashboard</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Role Selector */}
            <div className="role-selector">
              <label className="role-label">Login As</label>
              <div className="role-buttons">
                {[
                  { value: 'patient', label: 'Patient', icon: '👤' },
                  { value: 'doctor', label: 'Doctor', icon: '👨‍⚕️' },
                  { value: 'admin', label: 'Admin', icon: '🛡️' }
                ].map(r => (
                  <button type="button" key={r.value}
                    className={`role-btn ${role === r.value ? 'active' : ''}`}
                    onClick={() => setRole(r.value)}>
                    <span className="role-emoji">{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('email')}</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input type="email" className="form-input" value={email}
                  onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t('password')}</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input type={showPass ? 'text' : 'password'} className="form-input" value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className={`btn btn-primary btn-lg auth-submit ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? (
                <span className="auth-spinner"></span>
              ) : (
                <><LogIn size={18} /> Sign In</>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
