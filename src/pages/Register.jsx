import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Mail, Lock, UserPlus, User, Eye, EyeOff, Stethoscope, Shield, Activity, Bot } from 'lucide-react';
import './Auth.css';

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('Please fill in all fields'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setTimeout(() => {
      register(name, email, password, role);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-visual-panel">
        <div className="auth-visual-bg">
          <div className="auth-orb auth-orb-1"></div>
          <div className="auth-orb auth-orb-2"></div>
          <div className="auth-orb auth-orb-3"></div>
        </div>
        <div className="auth-visual-content">
          <div className="auth-logo-large"><Heart size={40} /></div>
          <h1>Join HealthBridge</h1>
          <p>Create your free account and start your journey to smarter healthcare.</p>
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
          <div className="heartbeat-line">
            <svg viewBox="0 0 600 60" className="heartbeat-svg">
              <polyline points="0,30 50,30 80,30 95,10 110,50 125,5 140,55 155,30 200,30 250,30 280,30 295,12 310,48 325,8 340,52 355,30 400,30 450,30 480,30 495,10 510,50 525,5 540,55 555,30 600,30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <Link to="/" className="auth-back-link"><Heart size={20} /> HealthBridge</Link>
            <h2>Create Account</h2>
            <p>Join the future of healthcare today</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="role-selector">
              <label className="role-label">Register As</label>
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
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input type="text" className="form-input" value={name}
                  onChange={e => setName(e.target.value)} placeholder="Your full name" />
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
                  onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className={`btn btn-primary btn-lg auth-submit ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? <span className="auth-spinner"></span> : <><UserPlus size={18} /> Create Account</>}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
