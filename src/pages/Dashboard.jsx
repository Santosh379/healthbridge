import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, FileText, Heart, Activity, ChevronRight, Star, Stethoscope, AlertTriangle, Clock, Users, DollarSign, CheckCircle, Bell, Pill, TrendingUp, Bot, Mic, Timer } from 'lucide-react';
import { doctors } from '../data/doctors';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const role = user?.role || 'patient';

  if (role === 'doctor') return <DoctorDashboard user={user} t={t} />;
  if (role === 'admin') return <AdminDashboard user={user} t={t} />;
  return <PatientDashboard user={user} t={t} />;
}

function PatientDashboard({ user, t }) {
  const [appointments, setAppointments] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [vitals] = useState({ hr: 72, bp: '120/80', spo2: 98, temp: 98.4 });
  const [healthTip] = useState(healthTips[Math.floor(Math.random() * healthTips.length)]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('healthbridge_appointments') || '[]');
    setAppointments(saved.filter(a => a.status === 'Confirmed'));
  }, []);

  // Countdown timer for next appointment
  useEffect(() => {
    if (appointments.length === 0) return;
    const next = appointments.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    if (!next) return;

    const interval = setInterval(() => {
      const target = new Date(`${next.date} ${next.time?.replace(' AM', ':00').replace(' PM', ':00') || '10:00:00'}`);
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) { setCountdown(null); return; }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setCountdown({ days, hours, minutes, seconds, doctor: next.doctorName });
    }, 1000);
    return () => clearInterval(interval);
  }, [appointments]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const reports = JSON.parse(localStorage.getItem('healthbridge_reports') || '[]');

  return (
    <div className="dashboard animate-fade-in">
      <div className="dash-header">
        <div>
          <h1>Welcome, {user?.name} 👋</h1>
          <p>Here's your health overview for today</p>
        </div>
        <div className="dash-date">{new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
      </div>

      {/* Countdown Timer */}
      {countdown && (
        <div className="countdown-banner glass-card">
          <div className="countdown-info">
            <Timer size={22} />
            <div>
              <span className="countdown-label">Next Appointment with {countdown.doctor}</span>
            </div>
          </div>
          <div className="countdown-timer">
            {[
              { val: countdown.days, label: 'Days' },
              { val: countdown.hours, label: 'Hours' },
              { val: countdown.minutes, label: 'Min' },
              { val: countdown.seconds, label: 'Sec' },
            ].map((t, i) => (
              <div key={i} className="countdown-unit">
                <span className="countdown-val">{String(t.val).padStart(2, '0')}</span>
                <span className="countdown-unit-label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vitals Row */}
      <div className="vitals-row">
        <div className="vital-card glass-card" style={{ '--vital-color': '#ef4444' }}>
          <div className="vital-icon"><Heart size={22} /></div>
          <div className="vital-data">
            <span className="vital-value">{vitals.hr} <small>BPM</small></span>
            <span className="vital-label">Heart Rate</span>
          </div>
          <div className="vital-wave">
            <svg viewBox="0 0 80 30"><polyline points="0,15 8,15 12,5 16,25 20,10 24,20 28,15 40,15 48,15 52,5 56,25 60,8 64,22 68,15 80,15" fill="none" stroke="var(--vital-color)" strokeWidth="1.5"/></svg>
          </div>
        </div>
        <div className="vital-card glass-card" style={{ '--vital-color': '#3b82f6' }}>
          <div className="vital-icon"><Activity size={22} /></div>
          <div className="vital-data">
            <span className="vital-value">{vitals.bp}</span>
            <span className="vital-label">Blood Pressure</span>
          </div>
          <span className="badge badge-success">Normal</span>
        </div>
        <div className="vital-card glass-card" style={{ '--vital-color': '#10b981' }}>
          <div className="vital-icon"><Activity size={22} /></div>
          <div className="vital-data">
            <span className="vital-value">{vitals.spo2}%</span>
            <span className="vital-label">SpO2 Level</span>
          </div>
          <span className="badge badge-success">Healthy</span>
        </div>
        <div className="vital-card glass-card" style={{ '--vital-color': '#f59e0b' }}>
          <div className="vital-icon"><Activity size={22} /></div>
          <div className="vital-data">
            <span className="vital-value">{vitals.temp}°F</span>
            <span className="vital-label">Temperature</span>
          </div>
          <span className="badge badge-success">Normal</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card glass-card" style={{ '--stat-accent': 'var(--primary-500)' }}>
          <div className="stat-icon"><Calendar size={22} /></div>
          <div className="stat-data">
            <span className="stat-value">{appointments.length}</span>
            <span className="stat-label">Upcoming Appointments</span>
          </div>
        </div>
        <div className="stat-card glass-card" style={{ '--stat-accent': 'var(--success-500)' }}>
          <div className="stat-icon"><FileText size={22} /></div>
          <div className="stat-data">
            <span className="stat-value">{reports.length || 3}</span>
            <span className="stat-label">Medical Reports</span>
          </div>
        </div>
        <div className="stat-card glass-card" style={{ '--stat-accent': '#8b5cf6' }}>
          <div className="stat-icon"><Heart size={22} /></div>
          <div className="stat-data">
            <span className="stat-value">85%</span>
            <span className="stat-label">Health Score</span>
          </div>
        </div>
      </div>

      <div className="dash-grid">
        {/* Quick Actions */}
        <div className="glass-card dash-section">
          <h2><Stethoscope size={20} /> Quick Actions</h2>
          <div className="quick-actions-grid">
            {[
              { icon: <Mic size={20} />, label: "Voice Symptom Check", to: "/symptom-checker", color: "#6366f1" },
              { icon: <Bot size={20} />, label: "AI Assistant", to: "/dashboard", color: "#3b82f6", onClick: true },
              { icon: <Pill size={20} />, label: "Drug Interaction", to: "/medicine-checker", color: "#f59e0b" },
              { icon: <Calendar size={20} />, label: "Book Appointment", to: "/doctors", color: "#10b981" },
              { icon: <AlertTriangle size={20} />, label: "Emergency Help", to: "/emergency", color: "#ef4444" },
              { icon: <FileText size={20} />, label: "View Reports", to: "/reports", color: "#8b5cf6" },
            ].map((a, i) => (
              <Link key={i} to={a.to} className="quick-action-item" style={{ '--qa-color': a.color }}>
                <div className="qa-icon">{a.icon}</div>
                <span>{a.label}</span>
                <ChevronRight size={16} className="qa-arrow" />
              </Link>
            ))}
          </div>
        </div>

        {/* Health Tip */}
        <div className="glass-card dash-section health-tip-card">
          <h2><Heart size={20} /> Daily Health Tip</h2>
          <div className="health-tip">
            <span className="tip-emoji">{healthTip.emoji}</span>
            <div>
              <h3>{healthTip.title}</h3>
              <p>{healthTip.tip}</p>
            </div>
          </div>
        </div>

        {/* Recommended Doctors */}
        <div className="glass-card dash-section">
          <div className="section-header-row">
            <h2><Star size={20} /> Recommended Doctors</h2>
            <Link to="/doctors" className="see-all">See All <ChevronRight size={14} /></Link>
          </div>
          <div className="rec-doctors-list">
            {doctors.slice(0, 4).map(doc => (
              <Link to={`/doctor/${doc.id}`} key={doc.id} className="rec-doc-item">
                <div className="rec-doc-avatar">{doc.name.charAt(3)}</div>
                <div className="rec-doc-info">
                  <span className="rec-doc-name">{doc.name}</span>
                  <span className="rec-doc-spec">{doc.specialization}</span>
                </div>
                <div className="rec-doc-rating"><Star size={14} /> {doc.rating}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DoctorDashboard({ user, t }) {
  const [patients] = useState([
    { name: "Ravi Kumar", time: "09:00 AM", status: "waiting", symptoms: "Fever, Headache" },
    { name: "Anita Sharma", time: "09:30 AM", status: "in-progress", symptoms: "Chest Pain" },
    { name: "Suresh Babu", time: "10:00 AM", status: "waiting", symptoms: "Back Pain" },
    { name: "Meena R.", time: "10:30 AM", status: "waiting", symptoms: "Skin Rash" },
    { name: "Arjun P.", time: "11:00 AM", status: "completed", symptoms: "Follow-up" },
  ]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [notes, setNotes] = useState('');

  const markDone = (index) => {
    // In real app this would update state
    alert(`Patient ${patients[index].name} marked as completed`);
  };

  return (
    <div className="dashboard animate-fade-in">
      <div className="dash-header">
        <div>
          <h1>Dr. {user?.name} 👨‍⚕️</h1>
          <p>Doctor Dashboard — {new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="availability-toggle">
          <button className={`avail-btn ${isAvailable ? 'available' : 'unavailable'}`} onClick={() => setIsAvailable(!isAvailable)}>
            {isAvailable ? '🟢 Available' : '🔴 Unavailable'}
          </button>
        </div>
      </div>

      {/* Doctor Stats */}
      <div className="stats-row">
        <div className="stat-card glass-card" style={{ '--stat-accent': 'var(--primary-500)' }}>
          <div className="stat-icon"><Users size={22} /></div>
          <div className="stat-data">
            <span className="stat-value">{patients.filter(p => p.status === 'waiting').length}</span>
            <span className="stat-label">Patients Waiting</span>
          </div>
        </div>
        <div className="stat-card glass-card" style={{ '--stat-accent': 'var(--success-500)' }}>
          <div className="stat-icon"><CheckCircle size={22} /></div>
          <div className="stat-data">
            <span className="stat-value">{patients.filter(p => p.status === 'completed').length}</span>
            <span className="stat-label">Completed Today</span>
          </div>
        </div>
        <div className="stat-card glass-card" style={{ '--stat-accent': '#f59e0b' }}>
          <div className="stat-icon"><Star size={22} /></div>
          <div className="stat-data">
            <span className="stat-value">4.8</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
        <div className="stat-card glass-card" style={{ '--stat-accent': '#8b5cf6' }}>
          <div className="stat-icon"><TrendingUp size={22} /></div>
          <div className="stat-data">
            <span className="stat-value">156</span>
            <span className="stat-label">Total Patients</span>
          </div>
        </div>
      </div>

      <div className="dash-grid">
        {/* Patient Queue */}
        <div className="glass-card dash-section patient-queue-card">
          <h2><Users size={20} /> Today's Patient Queue</h2>
          <div className="patient-queue">
            {patients.map((p, i) => (
              <div key={i} className={`queue-item ${p.status}`}>
                <div className="queue-info">
                  <div className="queue-avatar">{p.name.charAt(0)}</div>
                  <div>
                    <span className="queue-name">{p.name}</span>
                    <span className="queue-symptoms">{p.symptoms}</span>
                    <span className="queue-time"><Clock size={12} /> {p.time}</span>
                  </div>
                </div>
                <div className="queue-actions">
                  <span className={`badge ${p.status === 'waiting' ? 'badge-warning' : p.status === 'in-progress' ? 'badge-primary' : 'badge-success'}`}>
                    {p.status === 'waiting' ? 'Waiting' : p.status === 'in-progress' ? 'In Progress' : 'Done'}
                  </span>
                  {p.status === 'waiting' && (
                    <button className="btn btn-primary btn-sm" onClick={() => markDone(i)}>Start</button>
                  )}
                  {p.status === 'in-progress' && (
                    <button className="btn btn-success btn-sm" onClick={() => markDone(i)}>Complete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Rx */}
        <div className="glass-card dash-section">
          <h2><Pill size={20} /> Quick Prescription</h2>
          <textarea className="quick-rx-input" placeholder="Write prescription notes here..." value={notes} onChange={e => setNotes(e.target.value)} rows={6}></textarea>
          <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>
            <FileText size={14} /> Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ user, t }) {
  return (
    <div className="dashboard animate-fade-in">
      <div className="dash-header">
        <h1>Admin Dashboard 🛡️</h1>
        <p>System overview and management</p>
      </div>
      <div className="stats-row">
        <div className="stat-card glass-card" style={{ '--stat-accent': 'var(--primary-500)' }}>
          <div className="stat-icon"><Users size={22} /></div>
          <div className="stat-data"><span className="stat-value">1,240</span><span className="stat-label">Total Users</span></div>
        </div>
        <div className="stat-card glass-card" style={{ '--stat-accent': 'var(--success-500)' }}>
          <div className="stat-icon"><Stethoscope size={22} /></div>
          <div className="stat-data"><span className="stat-value">85</span><span className="stat-label">Active Doctors</span></div>
        </div>
        <div className="stat-card glass-card" style={{ '--stat-accent': '#f59e0b' }}>
          <div className="stat-icon"><Calendar size={22} /></div>
          <div className="stat-data"><span className="stat-value">342</span><span className="stat-label">Appointments Today</span></div>
        </div>
        <div className="stat-card glass-card" style={{ '--stat-accent': '#8b5cf6' }}>
          <div className="stat-icon"><TrendingUp size={22} /></div>
          <div className="stat-data"><span className="stat-value">98.5%</span><span className="stat-label">System Uptime</span></div>
        </div>
      </div>
    </div>
  );
}

const healthTips = [
  { emoji: "💧", title: "Stay Hydrated", tip: "Drink at least 8 glasses of water daily. Dehydration can cause headaches, fatigue, and reduced concentration." },
  { emoji: "🏃", title: "Exercise Daily", tip: "Just 30 minutes of moderate exercise can reduce your risk of cardiovascular disease by 35%." },
  { emoji: "😴", title: "Quality Sleep", tip: "Aim for 7-9 hours of sleep. Poor sleep is linked to obesity, diabetes, and depression." },
  { emoji: "🥗", title: "Eat Your Greens", tip: "Leafy greens contain iron, calcium, and vitamins that boost immunity and bone health." },
  { emoji: "🧘", title: "Manage Stress", tip: "Practice 5 minutes of deep breathing. Chronic stress weakens immunity and raises blood pressure." },
  { emoji: "🫁", title: "Breathing Exercise", tip: "Try 4-7-8 breathing: Inhale 4s, Hold 7s, Exhale 8s. It reduces anxiety and improves focus." },
];
