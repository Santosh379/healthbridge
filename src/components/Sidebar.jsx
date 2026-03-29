import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard, Search, CalendarDays, FileText, Stethoscope,
  AlertTriangle, User, LogOut, Heart, Sun, Moon, Globe, Menu, X, Pill
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const patientLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: t('dashboard') },
    { to: '/doctors', icon: <Search size={20} />, label: t('findDoctor') },
    { to: '/appointments', icon: <CalendarDays size={20} />, label: t('appointments') },
    { to: '/reports', icon: <FileText size={20} />, label: t('reports') },
    { to: '/symptom-checker', icon: <Stethoscope size={20} />, label: t('symptomChecker') },
    { to: '/medicine-checker', icon: <Pill size={20} />, label: 'Medicine Checker' },
    { to: '/emergency', icon: <AlertTriangle size={20} />, label: t('emergency') },
    { to: '/profile', icon: <User size={20} />, label: t('profile') },
  ];

  const doctorLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: t('dashboard') },
    { to: '/appointments', icon: <CalendarDays size={20} />, label: t('appointments') },
    { to: '/reports', icon: <FileText size={20} />, label: t('reports') },
    { to: '/profile', icon: <User size={20} />, label: t('profile') },
  ];

  const adminLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: t('dashboard') },
    { to: '/doctors', icon: <Search size={20} />, label: t('findDoctor') },
    { to: '/appointments', icon: <CalendarDays size={20} />, label: t('appointments') },
    { to: '/reports', icon: <FileText size={20} />, label: t('reports') },
    { to: '/profile', icon: <User size={20} />, label: t('profile') },
  ];

  const role = user?.role || 'patient';
  const links = role === 'doctor' ? doctorLinks : role === 'admin' ? adminLinks : patientLinks;

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Heart size={28} className="logo-icon" />
            <span className="logo-text">HealthBridge</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-controls">
            <button className="control-btn" onClick={toggleTheme} title="Toggle theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          <div className="sidebar-user">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-role">{role}</span>
            </div>
          </div>

          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
