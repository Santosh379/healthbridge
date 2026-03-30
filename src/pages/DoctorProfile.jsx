import { useParams, Link } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { useLanguage } from '../context/LanguageContext';
import { Star, Clock, Building, Globe, Calendar, ArrowLeft, Video, MapPin } from 'lucide-react';
import './DoctorProfile.css';

}


class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

export default function DoctorProfile() {
  // Assignment Requirement
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
const { id } = useParams();
  const { t } = useLanguage();
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="profile-not-found glass-card">
        <h2>Doctor not found</h2>
        <Link to="/doctors" className="btn btn-primary">Back to Doctors</Link>
      </div>
    );
  }

  const getAvailabilityClass = (status) => {
    if (status === 'Available today') return 'badge-success';
    if (status === 'Available tomorrow') return 'badge-primary';
    if (status === 'Busy') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div className="doctor-profile animate-fade-in">
      <Link to="/doctors" className="back-link">
        <ArrowLeft size={18} />
        Back to Doctors
      </Link>

      <div className="profile-layout">
        <div className="profile-main glass-card">
          <div className="profile-header-section">
            <div className="profile-avatar">
              {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="profile-header-info">
              <h1>{doctor.name}</h1>
              <p className="profile-spec">{doctor.specialization}</p>
              <div className="profile-badges">
                <span className={`badge ${getAvailabilityClass(doctor.availability)}`}>
                  {doctor.availability}
                </span>
                <span className="badge badge-primary">
                  <Video size={12} /> {doctor.consultationType}
                </span>
              </div>
            </div>
            <Link to={`/book/${doctor.id}`} className="btn btn-primary btn-lg profile-book-btn">
              <Calendar size={18} />
              {t('bookAppointment')}
            </Link>
          </div>

          <div className="profile-stats-row">
            <div className="profile-stat">
              <Clock size={20} />
              <div>
                <span className="ps-value">{doctor.experience} {t('years')}</span>
                <span className="ps-label">{t('experience')}</span>
              </div>
            </div>
            <div className="profile-stat">
              <Star size={20} className="star-icon" />
              <div>
                <span className="ps-value">{doctor.rating}</span>
                <span className="ps-label">{t('rating')}</span>
              </div>
            </div>
            <div className="profile-stat">
              <Building size={20} />
              <div>
                <span className="ps-value">{doctor.hospital}</span>
                <span className="ps-label">Hospital</span>
              </div>
            </div>
            <div className="profile-stat">
              <Globe size={20} />
              <div>
                <span className="ps-value">{doctor.languages.join(', ')}</span>
                <span className="ps-label">Languages</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Consultation Timing</h2>
            <div className="timing-card">
              <Clock size={18} />
              <span>{doctor.timing}</span>
            </div>
          </div>

          <div className="profile-section">
            <h2>Patient Reviews</h2>
            <div className="reviews-list">
              {doctor.reviews.map((review, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <div className="review-avatar">{review.patient.charAt(0)}</div>
                    <div>
                      <span className="review-name">{review.patient}</span>
                      <div className="review-stars">
                        {Array.from({ length: review.rating }, (_, j) => (
                          <Star key={j} size={14} className="star-filled" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="sidebar-card glass-card">
            <h3>Quick Book</h3>
            <p>Book an appointment with {doctor.name}</p>
            <Link to={`/book/${doctor.id}`} className="btn btn-primary" style={{ width: '100%' }}>
              {t('bookAppointment')}
            </Link>
          </div>
          <div className="sidebar-card glass-card">
            <h3>Hospital Location</h3>
            <div className="location-info">
              <MapPin size={16} />
              <span>{doctor.hospital}</span>
            </div>
            <div className="location-map-placeholder">
              <MapPin size={32} />
              <span>Map View</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
