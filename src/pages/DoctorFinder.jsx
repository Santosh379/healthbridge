import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { doctors, specializations } from '../data/doctors';
import { Search, Filter, Star, Clock, MapPin, Video, Building, ChevronDown } from 'lucide-react';
import './DoctorFinder.css';

export default function DoctorFinder() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [specFilter, setSpecFilter] = useState('');
  const [expFilter, setExpFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = doctors.filter(doc => {
    const matchName = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSpec = !specFilter || doc.specialization === specFilter;
    const matchExp = !expFilter || (expFilter === '5+' && doc.experience >= 5) || (expFilter === '10+' && doc.experience >= 10) || (expFilter === '15+' && doc.experience >= 15) || (expFilter === '20+' && doc.experience >= 20);
    const matchRating = !ratingFilter || doc.rating >= parseFloat(ratingFilter);
    const matchType = !typeFilter || doc.consultationType === typeFilter || doc.consultationType === 'Both';
    return matchName && matchSpec && matchExp && matchRating && matchType;
  });

  const getAvailabilityClass = (status) => {
    if (status === 'Available today') return 'badge-success';
    if (status === 'Available tomorrow') return 'badge-primary';
    if (status === 'Busy') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div className="doctor-finder">
      <div className="page-header">
        <h1>{t('findDoctor')}</h1>
        <p>Find and book appointments with the best doctors</p>
      </div>

      {/* Search & Filters */}
      <div className="finder-controls glass-card">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search doctors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-secondary btn-sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            Filters
            <ChevronDown size={14} style={{ transform: showFilters ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
        </div>

        {showFilters && (
          <div className="filter-row animate-slide-up">
            <select className="form-select" value={specFilter} onChange={(e) => setSpecFilter(e.target.value)}>
              <option value="">All Specializations</option>
              {specializations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="form-select" value={expFilter} onChange={(e) => setExpFilter(e.target.value)}>
              <option value="">Any Experience</option>
              <option value="5+">5+ years</option>
              <option value="10+">10+ years</option>
              <option value="15+">15+ years</option>
              <option value="20+">20+ years</option>
            </select>
            <select className="form-select" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
              <option value="">Any Rating</option>
              <option value="4.5">4.5+ ⭐</option>
              <option value="4.7">4.7+ ⭐</option>
              <option value="4.9">4.9+ ⭐</option>
            </select>
            <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Types</option>
              <option value="Online">{t('online')}</option>
              <option value="Offline">{t('offline')}</option>
              <option value="Both">{t('both')}</option>
            </select>
          </div>
        )}
      </div>

      <div className="finder-count">
        Showing <strong>{filtered.length}</strong> doctors
      </div>

      {/* Doctor Cards Grid */}
      <div className="doctors-grid">
        {filtered.map((doc) => (
          <div key={doc.id} className="doctor-card glass-card">
            <div className="doc-card-top">
              <div className="doc-photo">
                {doc.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="doc-card-info">
                <h3>{doc.name}</h3>
                <p className="doc-spec">{doc.specialization}</p>
                <div className="doc-meta">
                  <span><Clock size={14} /> {doc.experience} {t('years')}</span>
                  <span><Star size={14} className="star-icon" /> {doc.rating}</span>
                </div>
              </div>
            </div>

            <div className="doc-card-details">
              <div className="doc-detail-row">
                <Building size={14} />
                <span>{doc.hospital}</span>
              </div>
              <div className="doc-detail-row">
                <Video size={14} />
                <span>{doc.consultationType === 'Both' ? 'Online & Offline' : doc.consultationType}</span>
              </div>
            </div>

            <div className="doc-card-bottom">
              <span className={`badge ${getAvailabilityClass(doc.availability)}`}>
                {doc.availability}
              </span>
              <div className="doc-card-actions">
                <Link to={`/doctor/${doc.id}`} className="btn btn-secondary btn-sm">{t('viewProfile')}</Link>
                <Link to={`/book/${doc.id}`} className="btn btn-primary btn-sm">{t('bookAppointment')}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="finder-empty glass-card">
          <Search size={48} />
          <h3>No doctors found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
