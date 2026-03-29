import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, Save, Heart, Activity, Droplets, Moon, Monitor, Dumbbell, CheckCircle, Shield, Calendar, FileText, Star, Award, Target, TrendingUp, Clock, MapPin, Phone, AlertTriangle, Edit3, Camera, Stethoscope, Pill } from 'lucide-react';
import './UserProfile.css';

export default function UserProfile() {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [editingAvatar, setEditingAvatar] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    age: '',
    bloodGroup: 'B+',
    allergies: '',
    height: '',
    weight: '',
    gender: 'Male',
    phone: '',
    email: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    medications: '',
  });

  const [healthInputs, setHealthInputs] = useState({
    sleepHours: 7,
    waterIntake: 6,
    exerciseFrequency: 3,
    screenTime: 6,
  });

  const [healthGoals, setHealthGoals] = useState({
    steps: { current: 6500, target: 10000 },
    water: { current: 6, target: 8 },
    sleep: { current: 7, target: 8 },
    exercise: { current: 3, target: 5 },
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('healthbridge_profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(prev => ({ ...prev, ...parsed }));
    } else if (user) {
      setProfile(prev => ({ ...prev, name: user.name || '' }));
    }

    const savedHealth = localStorage.getItem('healthbridge_health');
    if (savedHealth) setHealthInputs(JSON.parse(savedHealth));
  }, [user]);

  const bmi = profile.height && profile.weight
    ? (parseFloat(profile.weight) / ((parseFloat(profile.height) / 100) ** 2)).toFixed(1)
    : null;

  const getBmiCategory = (bmi) => {
    if (!bmi) return { label: 'N/A', class: '', color: 'var(--text-tertiary)' };
    const val = parseFloat(bmi);
    if (val < 18.5) return { label: 'Underweight', class: 'bmi-under', color: 'var(--warning-500)' };
    if (val < 25) return { label: 'Normal', class: 'bmi-normal', color: 'var(--success-500)' };
    if (val < 30) return { label: 'Overweight', class: 'bmi-over', color: 'var(--warning-500)' };
    return { label: 'Obese', class: 'bmi-obese', color: 'var(--danger-500)' };
  };

  const calculateHealthScore = () => {
    let score = 0;
    const { sleepHours, waterIntake, exerciseFrequency, screenTime } = healthInputs;
    if (sleepHours >= 7 && sleepHours <= 9) score += 25; else if (sleepHours >= 6) score += 18; else if (sleepHours >= 5) score += 10; else score += 5;
    if (waterIntake >= 8) score += 25; else if (waterIntake >= 6) score += 20; else if (waterIntake >= 4) score += 12; else score += 5;
    if (exerciseFrequency >= 5) score += 25; else if (exerciseFrequency >= 3) score += 20; else if (exerciseFrequency >= 1) score += 10;
    if (screenTime <= 4) score += 25; else if (screenTime <= 6) score += 18; else if (screenTime <= 8) score += 10; else score += 3;
    return score;
  };

  const healthScore = calculateHealthScore();

  const getHealthSuggestions = () => {
    const suggestions = [];
    if (healthInputs.sleepHours < 7) suggestions.push({ icon: '😴', text: "Aim for 7-9 hours of sleep per night" });
    if (healthInputs.waterIntake < 8) suggestions.push({ icon: '💧', text: "Increase water intake to 8+ glasses/day" });
    if (healthInputs.exerciseFrequency < 3) suggestions.push({ icon: '🏃', text: "Exercise at least 3-5 days per week" });
    if (healthInputs.screenTime > 6) suggestions.push({ icon: '📱', text: "Reduce screen time, take breaks every 30 min" });
    if (healthScore >= 80) suggestions.push({ icon: '🌟', text: "Great job! Maintain your healthy lifestyle" });
    return suggestions;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success-500)';
    if (score >= 60) return 'var(--warning-500)';
    return 'var(--danger-500)';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const handleSave = () => {
    localStorage.setItem('healthbridge_profile', JSON.stringify(profile));
    localStorage.setItem('healthbridge_health', JSON.stringify(healthInputs));
    updateUser({ name: profile.name });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const bmiInfo = getBmiCategory(bmi);
  const appointments = JSON.parse(localStorage.getItem('healthbridge_appointments') || '[]');
  const reports = JSON.parse(localStorage.getItem('healthbridge_reports') || '[]');
  const memberSince = 'March 2026';

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="user-profile animate-fade-in">
      {saved && (
        <div className="save-toast animate-slide-up">
          <CheckCircle size={18} />
          Profile saved successfully!
        </div>
      )}

      {/* Profile Hero Header */}
      <div className="profile-hero glass-card">
        <div className="profile-hero-bg"></div>
        <div className="profile-hero-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              <span className="avatar-initials">{getInitials(profile.name)}</span>
              <div className="avatar-status-dot"></div>
            </div>
            <div className="profile-identity">
              <h1>{profile.name || 'Welcome, User!'}</h1>
              <div className="profile-badges">
                <span className="profile-role-badge"><User size={12} /> {user?.role || 'Patient'}</span>
                {profile.bloodGroup && <span className="profile-blood-badge"><Droplets size={12} /> {profile.bloodGroup}</span>}
                <span className="profile-member-badge"><Calendar size={12} /> Since {memberSince}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="profile-quick-stats">
            <div className="pqs-item">
              <div className="pqs-icon" style={{ '--pqs-color': getScoreColor(healthScore) }}><Heart size={18} /></div>
              <div className="pqs-data">
                <span className="pqs-value" style={{ color: getScoreColor(healthScore) }}>{healthScore}</span>
                <span className="pqs-label">Health Score</span>
              </div>
            </div>
            <div className="pqs-item">
              <div className="pqs-icon" style={{ '--pqs-color': bmiInfo.color }}><Activity size={18} /></div>
              <div className="pqs-data">
                <span className="pqs-value" style={{ color: bmiInfo.color }}>{bmi || '—'}</span>
                <span className="pqs-label">BMI ({bmiInfo.label})</span>
              </div>
            </div>
            <div className="pqs-item">
              <div className="pqs-icon" style={{ '--pqs-color': 'var(--primary-500)' }}><Calendar size={18} /></div>
              <div className="pqs-data">
                <span className="pqs-value">{appointments.length}</span>
                <span className="pqs-label">Appointments</span>
              </div>
            </div>
            <div className="pqs-item">
              <div className="pqs-icon" style={{ '--pqs-color': '#8b5cf6' }}><FileText size={18} /></div>
              <div className="pqs-data">
                <span className="pqs-value">{reports.length || 0}</span>
                <span className="pqs-label">Reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        {[
          { id: 'personal', label: 'Personal Info', icon: <User size={16} /> },
          { id: 'health', label: 'Health Metrics', icon: <Heart size={16} /> },
          { id: 'medical', label: 'Medical ID', icon: <Shield size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="profile-tab-content">
        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <div className="profile-grid animate-fade-in">
            <div className="profile-section-card glass-card">
              <h2><User size={20} /> Personal Information</h2>
              <div className="profile-form">
                <div className="form-group">
                  <label className="form-label">{t('name')}</label>
                  <input className="form-input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Your full name" />
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">{t('age')}</label>
                    <input className="form-input" type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} placeholder="28" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-select" value={profile.gender} onChange={e => setProfile({ ...profile, gender: e.target.value })}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">{t('bloodGroup')}</label>
                    <select className="form-select" value={profile.bloodGroup} onChange={e => setProfile({ ...profile, bloodGroup: e.target.value })}>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('allergies')}</label>
                  <input className="form-input" value={profile.allergies} onChange={e => setProfile({ ...profile, allergies: e.target.value })} placeholder="e.g., Penicillin, Peanuts, Dust" />
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">{t('height')} (cm)</label>
                    <input className="form-input" type="number" value={profile.height} onChange={e => setProfile({ ...profile, height: e.target.value })} placeholder="170" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('weight')} (kg)</label>
                    <input className="form-input" type="number" value={profile.weight} onChange={e => setProfile({ ...profile, weight: e.target.value })} placeholder="70" />
                  </div>
                </div>
              </div>
            </div>

            {/* BMI Card */}
            <div className="bmi-card glass-card">
              <h2><Activity size={20} /> {t('bmi')} Calculator</h2>
              {bmi ? (
                <div className="bmi-display">
                  <div className="bmi-circle" style={{ '--bmi-color': bmiInfo.color }}>
                    <span className="bmi-value">{bmi}</span>
                    <span className="bmi-unit">BMI</span>
                  </div>
                  <span className={`badge ${bmiInfo.class === 'bmi-normal' ? 'badge-success' : bmiInfo.class === 'bmi-under' ? 'badge-warning' : 'badge-danger'}`}>
                    {bmiInfo.label}
                  </span>
                  <div className="bmi-scale">
                    <div className="bmi-range" style={{ left: `${Math.min(Math.max((parseFloat(bmi) - 15) / 25 * 100, 0), 100)}%` }}></div>
                  </div>
                  <div className="bmi-scale-labels">
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                  <div className="bmi-interpretation">
                    {bmiInfo.class === 'bmi-normal' ? '✅ Your BMI is in the healthy range!' : bmiInfo.class === 'bmi-under' ? '⚠️ Consider consulting a nutritionist' : '⚠️ Consider lifestyle changes & consult doctor'}
                  </div>
                </div>
              ) : (
                <div className="bmi-empty">
                  <Activity size={40} />
                  <p>Enter your height and weight to calculate BMI</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Health Metrics Tab */}
        {activeTab === 'health' && (
          <div className="health-tab animate-fade-in">
            {/* Health Score */}
            <div className="health-score-section glass-card">
              <div className="hs-left">
                <h2><Heart size={20} /> Your Health Score</h2>
                <p className="hs-subtitle">Based on your daily habits and lifestyle</p>

                <div className="health-inputs">
                  <div className="health-input-row">
                    <label><Moon size={16} /> {t('sleepHours')}</label>
                    <input type="range" min="3" max="12" value={healthInputs.sleepHours} onChange={e => setHealthInputs({ ...healthInputs, sleepHours: parseInt(e.target.value) })} />
                    <span className="health-input-value">{healthInputs.sleepHours}h</span>
                  </div>
                  <div className="health-input-row">
                    <label><Droplets size={16} /> {t('waterIntake')}</label>
                    <input type="range" min="1" max="15" value={healthInputs.waterIntake} onChange={e => setHealthInputs({ ...healthInputs, waterIntake: parseInt(e.target.value) })} />
                    <span className="health-input-value">{healthInputs.waterIntake} 🥛</span>
                  </div>
                  <div className="health-input-row">
                    <label><Dumbbell size={16} /> {t('exerciseFrequency')}</label>
                    <input type="range" min="0" max="7" value={healthInputs.exerciseFrequency} onChange={e => setHealthInputs({ ...healthInputs, exerciseFrequency: parseInt(e.target.value) })} />
                    <span className="health-input-value">{healthInputs.exerciseFrequency}d/wk</span>
                  </div>
                  <div className="health-input-row">
                    <label><Monitor size={16} /> {t('screenTime')}</label>
                    <input type="range" min="1" max="16" value={healthInputs.screenTime} onChange={e => setHealthInputs({ ...healthInputs, screenTime: parseInt(e.target.value) })} />
                    <span className="health-input-value">{healthInputs.screenTime}h</span>
                  </div>
                </div>
              </div>

              <div className="hs-right">
                <div className="score-circle-container">
                  <div className="score-circle" style={{ '--score-color': getScoreColor(healthScore), '--score-pct': `${healthScore}%` }}>
                    <svg viewBox="0 0 100 100" className="score-ring">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border-color)" strokeWidth="6" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--score-color)" strokeWidth="6" strokeDasharray={`${healthScore * 2.64} 264`} strokeLinecap="round" transform="rotate(-90 50 50)" className="score-ring-progress" />
                    </svg>
                    <div className="score-text">
                      <span className="score-value">{healthScore}</span>
                      <span className="score-label">/ 100</span>
                    </div>
                  </div>
                  <span className="score-grade" style={{ color: getScoreColor(healthScore) }}>{getScoreLabel(healthScore)}</span>
                </div>

                <div className="health-suggestions">
                  <h3><TrendingUp size={16} /> Suggestions</h3>
                  {getHealthSuggestions().map((s, i) => (
                    <div key={i} className="suggestion-item">
                      <span className="suggestion-emoji">{s.icon}</span>
                      <span>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Goals */}
            <div className="health-goals-card glass-card">
              <h2><Target size={20} /> Daily Health Goals</h2>
              <div className="goals-grid">
                {[
                  { label: 'Steps', icon: '🚶', current: healthGoals.steps.current, target: healthGoals.steps.target, unit: 'steps', color: '#3b82f6' },
                  { label: 'Water', icon: '💧', current: healthGoals.water.current, target: healthGoals.water.target, unit: 'glasses', color: '#06b6d4' },
                  { label: 'Sleep', icon: '😴', current: healthGoals.sleep.current, target: healthGoals.sleep.target, unit: 'hours', color: '#8b5cf6' },
                  { label: 'Exercise', icon: '🏋️', current: healthGoals.exercise.current, target: healthGoals.exercise.target, unit: 'days/wk', color: '#10b981' },
                ].map((goal, i) => {
                  const pct = Math.min((goal.current / goal.target) * 100, 100);
                  return (
                    <div key={i} className="goal-item">
                      <div className="goal-header">
                        <span className="goal-icon">{goal.icon}</span>
                        <span className="goal-label">{goal.label}</span>
                        <span className="goal-pct" style={{ color: goal.color }}>{Math.round(pct)}%</span>
                      </div>
                      <div className="goal-bar">
                        <div className="goal-bar-fill" style={{ width: `${pct}%`, background: goal.color }}></div>
                      </div>
                      <span className="goal-detail">{goal.current} / {goal.target} {goal.unit}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Medical ID Tab */}
        {activeTab === 'medical' && (
          <div className="medical-tab animate-fade-in">
            {/* Emergency Medical ID Card */}
            <div className="medical-id-card">
              <div className="mid-header">
                <Shield size={24} />
                <h2>Emergency Medical ID</h2>
              </div>
              <div className="mid-body">
                <div className="mid-avatar">
                  <span>{getInitials(profile.name)}</span>
                </div>
                <h3 className="mid-name">{profile.name || 'Your Name'}</h3>
                <div className="mid-info-grid">
                  <div className="mid-info-item">
                    <span className="mid-info-label">Blood Group</span>
                    <span className="mid-info-value mid-blood">{profile.bloodGroup}</span>
                  </div>
                  <div className="mid-info-item">
                    <span className="mid-info-label">Age</span>
                    <span className="mid-info-value">{profile.age || '—'}</span>
                  </div>
                  <div className="mid-info-item">
                    <span className="mid-info-label">Gender</span>
                    <span className="mid-info-value">{profile.gender}</span>
                  </div>
                  <div className="mid-info-item">
                    <span className="mid-info-label">Allergies</span>
                    <span className="mid-info-value mid-alert">{profile.allergies || 'None'}</span>
                  </div>
                </div>
                <div className="mid-divider"></div>
                <div className="mid-section">
                  <h4><Pill size={14} /> Current Medications</h4>
                  <p>{profile.medications || 'None listed'}</p>
                </div>
                <div className="mid-section">
                  <h4><Stethoscope size={14} /> Medical Conditions</h4>
                  <p>{profile.medicalConditions || 'None listed'}</p>
                </div>
              </div>
              <div className="mid-footer">
                <span>HealthBridge Medical ID</span>
                <span>⚕️ Show in Emergency</span>
              </div>
            </div>

            {/* Medical Details Form */}
            <div className="medical-form-card glass-card">
              <h2><AlertTriangle size={20} /> Emergency & Medical Info</h2>
              <div className="profile-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Emergency Contact Name</label>
                    <input className="form-input" value={profile.emergencyContact} onChange={e => setProfile({ ...profile, emergencyContact: e.target.value })} placeholder="Parent / Spouse / Guardian" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Emergency Phone</label>
                    <input className="form-input" value={profile.emergencyPhone} onChange={e => setProfile({ ...profile, emergencyPhone: e.target.value })} placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Medical Conditions</label>
                  <textarea className="form-textarea" value={profile.medicalConditions} onChange={e => setProfile({ ...profile, medicalConditions: e.target.value })} placeholder="e.g., Diabetes Type 2, Hypertension, Asthma" rows={3} />
                </div>
                <div className="form-group">
                  <label className="form-label">Current Medications</label>
                  <textarea className="form-textarea" value={profile.medications} onChange={e => setProfile({ ...profile, medications: e.target.value })} placeholder="e.g., Metformin 500mg twice daily, Amlodipine 5mg" rows={3} />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-card glass-card">
              <h2><Clock size={20} /> Recent Activity</h2>
              <div className="activity-timeline">
                {appointments.length > 0 ? (
                  appointments.slice(0, 5).map((apt, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-dot" style={{ background: apt.status === 'Confirmed' ? 'var(--success-500)' : 'var(--primary-500)' }}></div>
                      <div className="activity-content">
                        <span className="activity-title">{apt.status === 'Confirmed' ? '📅' : '✅'} Appointment with {apt.doctorName}</span>
                        <span className="activity-meta">{apt.date} · {apt.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="activity-item">
                      <div className="activity-dot" style={{ background: 'var(--success-500)' }}></div>
                      <div className="activity-content">
                        <span className="activity-title">🎉 Account Created</span>
                        <span className="activity-meta">Welcome to HealthBridge!</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-dot" style={{ background: 'var(--primary-500)' }}></div>
                      <div className="activity-content">
                        <span className="activity-title">👤 Profile Setup</span>
                        <span className="activity-meta">Complete your profile for better recommendations</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button className="btn btn-primary btn-lg save-profile-btn" onClick={handleSave}>
        <Save size={18} />
        {t('save')} Profile
      </button>
    </div>
  );
}
