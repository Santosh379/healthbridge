import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, X, RefreshCw, ChevronRight } from 'lucide-react';
import './AppointmentHistory.css';

export default function AppointmentHistory() {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('healthbridge_appointments') || '[]');
    // Add some mock historical data if empty
    if (saved.length === 0) {
      const mockHistory = [
        { id: 1, doctorName: "Dr. Amit Patel", specialization: "General Physician", hospital: "City Hospital", date: "2026-01-10", time: "10:00 AM", status: "Completed", bookedAt: "2026-01-08" },
        { id: 2, doctorName: "Dr. Kavitha Sundaram", specialization: "Dentist", hospital: "Dental Care Plus", date: "2026-02-12", time: "11:30 AM", status: "Completed", bookedAt: "2026-02-10" },
        { id: 3, doctorName: "Dr. Arun Sharma", specialization: "Cardiologist", hospital: "Apollo Hospitals", date: "2026-03-22", time: "09:00 AM", status: "Completed", bookedAt: "2026-03-20" },
      ];
      setAppointments(mockHistory);
    } else {
      setAppointments(saved);
    }
  }, []);

  const cancelAppointment = (id) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a);
    setAppointments(updated);
    localStorage.setItem('healthbridge_appointments', JSON.stringify(updated));
    setShowModal(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed': return 'badge-success';
      case 'Completed': return 'badge-primary';
      case 'Cancelled': return 'badge-danger';
      default: return 'badge-warning';
    }
  };

  return (
    <div className="appointment-history animate-fade-in">
      <div className="page-header">
        <h1>{t('appointmentHistory')}</h1>
        <p>View and manage your appointment history</p>
      </div>

      <div className="history-timeline">
        {appointments.length > 0 ? (
          appointments.sort((a, b) => new Date(b.date) - new Date(a.date)).map((appt, i) => (
            <div key={appt.id} className="history-item glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="history-date-badge">
                <Calendar size={16} />
                <span>{new Date(appt.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="history-content">
                <div className="history-main">
                  <div className="history-avatar">{appt.doctorName?.charAt(0) || 'D'}</div>
                  <div className="history-info">
                    <h3>{appt.doctorName}</h3>
                    <p>{appt.specialization} • {appt.hospital}</p>
                    <div className="history-time">
                      <Clock size={14} /> {appt.time}
                    </div>
                  </div>
                </div>
                <div className="history-actions">
                  <span className={`badge ${getStatusClass(appt.status)}`}>{appt.status}</span>
                  {appt.status === 'Confirmed' && (
                    <div className="history-btns">
                      <button className="btn btn-secondary btn-sm" onClick={() => setShowModal({ type: 'reschedule', appt })}>
                        <RefreshCw size={14} /> Reschedule
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setShowModal({ type: 'cancel', appt })}>
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="history-empty glass-card">
            <Calendar size={48} />
            <h3>No appointments yet</h3>
            <p>Book your first appointment to get started</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {showModal.type === 'cancel' ? (
              <>
                <h2>Cancel Appointment</h2>
                <p>Are you sure you want to cancel your appointment with <strong>{showModal.appt.doctorName}</strong> on {showModal.appt.date}?</p>
                <div className="modal-actions">
                  <button className="btn btn-secondary" onClick={() => setShowModal(null)}>Keep</button>
                  <button className="btn btn-danger" onClick={() => cancelAppointment(showModal.appt.id)}>Cancel Appointment</button>
                </div>
              </>
            ) : (
              <>
                <h2>Reschedule Appointment</h2>
                <p>Rescheduling feature will redirect you to book a new slot. Your current appointment with <strong>{showModal.appt.doctorName}</strong> will be updated.</p>
                <div className="modal-actions">
                  <button className="btn btn-secondary" onClick={() => setShowModal(null)}>Close</button>
                  <button className="btn btn-primary" onClick={() => setShowModal(null)}>Select New Date</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
