import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doctors, timeSlots } from '../data/doctors';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, CheckCircle, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import './BookAppointment.css';

}


class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

export default function BookAppointment() {
  // Assignment Requirement
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const doctor = doctors.find(d => d.id === parseInt(id));

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [booked, setBooked] = useState(false);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      dates.push({
        full: d.toISOString().split('T')[0],
        day: d.toLocaleDateString('en', { weekday: 'short' }),
        date: d.getDate(),
        month: d.toLocaleDateString('en', { month: 'short' })
      });
    }
    return dates;
  };

  const dates = generateDates();

  const handleConfirm = () => {
    const appointment = {
      id: Date.now(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      hospital: doctor.hospital,
      date: selectedDate,
      time: selectedTime,
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    };

    const saved = JSON.parse(localStorage.getItem('healthbridge_appointments') || '[]');
    saved.push(appointment);
    localStorage.setItem('healthbridge_appointments', JSON.stringify(saved));

    // Auto-generate medical report
    const report = {
      id: Date.now(),
      date: selectedDate,
      type: `${doctor.specialization} Consultation`,
      doctor: doctor.name,
      hospital: doctor.hospital,
      patient: JSON.parse(localStorage.getItem('healthbridge_user') || '{}').name || 'Patient',
      age: 28,
      bloodGroup: JSON.parse(localStorage.getItem('healthbridge_profile') || '{}').bloodGroup || 'B+',
      symptoms: 'To be assessed during consultation',
      diagnosis: 'Pending — Report will be updated after consultation',
      recommendation: 'Please arrive 15 minutes before your scheduled appointment time',
      prescriptions: [],
      status: 'Upcoming',
      appointmentId: appointment.id,
    };
    const reports = JSON.parse(localStorage.getItem('healthbridge_reports') || '[]');
    reports.push(report);
    localStorage.setItem('healthbridge_reports', JSON.stringify(reports));

    // Send notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('HealthBridge — Appointment Confirmed', {
        body: `Your appointment with ${doctor.name} on ${selectedDate} at ${selectedTime} has been confirmed.`,
        icon: '🏥'
      });
    }

    setBooked(true);
  };

  if (!doctor) {
    return (
      <div className="profile-not-found glass-card">
        <h2>Doctor not found</h2>
        <Link to="/doctors" className="btn btn-primary">Back to Doctors</Link>
      </div>
    );
  }

  if (booked) {
    return (
      <div className="booking-success animate-scale-in">
        <div className="success-card glass-card">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>{t('appointmentBooked')}</h1>
          <p>Your appointment with <strong>{doctor.name}</strong> has been confirmed.</p>
          <div className="success-details">
            <div className="sd-row"><Calendar size={16} /> <span>{selectedDate}</span></div>
            <div className="sd-row"><Clock size={16} /> <span>{selectedTime}</span></div>
            <div className="sd-row"><User size={16} /> <span>{doctor.specialization}</span></div>
          </div>
          <div className="success-actions">
            <button onClick={() => navigate('/appointments')} className="btn btn-primary btn-lg">View Appointments</button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary btn-lg">Go to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-appointment animate-fade-in">
      <Link to={`/doctor/${doctor.id}`} className="back-link">
        <ArrowLeft size={18} /> Back to Profile
      </Link>

      <div className="page-header">
        <h1>{t('bookAppointment')}</h1>
        <p>Schedule your appointment with {doctor.name}</p>
      </div>

      {/* Step Indicator */}
      <div className="steps-bar">
        {[
          { num: 1, label: t('selectDoctor') },
          { num: 2, label: t('selectDate') },
          { num: 3, label: t('selectTime') },
          { num: 4, label: t('confirmBooking') }
        ].map((s, i) => (
          <div key={s.num} className={`step-item ${step >= s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}>
            <div className="step-num">{step > s.num ? '✓' : s.num}</div>
            <span className="step-label">{s.label}</span>
            {i < 3 && <ChevronRight size={16} className="step-arrow" />}
          </div>
        ))}
      </div>

      <div className="booking-content glass-card">
        {/* Step 1: Doctor Info */}
        {step === 1 && (
          <div className="booking-step">
            <h2>Selected Doctor</h2>
            <div className="selected-doctor">
              <div className="doc-photo">{doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
              <div>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization} • {doctor.hospital}</p>
                <p className="doc-exp">{doctor.experience} years experience • Rating: {doctor.rating} ⭐</p>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(2)}>
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: Select Date */}
        {step === 2 && (
          <div className="booking-step">
            <h2>{t('selectDate')}</h2>
            <div className="date-grid">
              {dates.map(d => (
                <button
                  key={d.full}
                  className={`date-btn ${selectedDate === d.full ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(d.full)}
                >
                  <span className="date-day">{d.day}</span>
                  <span className="date-num">{d.date}</span>
                  <span className="date-month">{d.month}</span>
                </button>
              ))}
            </div>
            <div className="step-actions">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button className="btn btn-primary" onClick={() => setStep(3)} disabled={!selectedDate}>
                Continue <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Select Time */}
        {step === 3 && (
          <div className="booking-step">
            <h2>{t('selectTime')}</h2>
            <div className="time-grid">
              {timeSlots.map(time => (
                <button
                  key={time}
                  className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  <Clock size={14} />
                  {time}
                </button>
              ))}
            </div>
            <div className="step-actions">
              <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button className="btn btn-primary" onClick={() => setStep(4)} disabled={!selectedTime}>
                Continue <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div className="booking-step">
            <h2>{t('confirmBooking')}</h2>
            <div className="confirm-summary">
              <div className="confirm-row">
                <span className="confirm-label">Doctor</span>
                <span className="confirm-value">{doctor.name}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-label">Specialization</span>
                <span className="confirm-value">{doctor.specialization}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-label">Hospital</span>
                <span className="confirm-value">{doctor.hospital}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-label">Date</span>
                <span className="confirm-value">{selectedDate}</span>
              </div>
              <div className="confirm-row">
                <span className="confirm-label">Time</span>
                <span className="confirm-value">{selectedTime}</span>
              </div>
            </div>
            <div className="step-actions">
              <button className="btn btn-secondary" onClick={() => setStep(3)}>Back</button>
              <button className="btn btn-success btn-lg" onClick={handleConfirm}>
                <CheckCircle size={18} /> Confirm Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
