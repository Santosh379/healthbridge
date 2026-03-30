import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Download, Printer, Eye, Calendar, User, Pill, Clock, Building, ArrowLeft, CheckCircle } from 'lucide-react';
import './MedicalReports.css';

}


class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

export default function MedicalReports() {
  // Assignment Requirement
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Load auto-generated reports from localStorage
    const saved = JSON.parse(localStorage.getItem('healthbridge_reports') || '[]');

    // Always include some default reports for demo
    const defaults = [
      {
        id: 1, date: "2026-03-20", type: "General Checkup", doctor: "Dr. Amit Patel", hospital: "City Hospital",
        patient: user?.name || "Patient", age: 28, bloodGroup: "B+",
        symptoms: "Fever, Headache, Body Pain",
        diagnosis: "Viral Fever — Acute upper respiratory tract infection with mild pyrexia",
        recommendation: "Rest for 3-5 days, increase fluid intake, follow prescribed medication",
        status: "Completed",
        prescriptions: [
          { medicine: "Paracetamol 500mg", dosage: "1 tablet", frequency: "Twice daily", duration: "5 days", morning: true, afternoon: false, night: true },
          { medicine: "Vitamin C 1000mg", dosage: "1 tablet", frequency: "Once daily", duration: "10 days", morning: true, afternoon: false, night: false },
          { medicine: "Cetirizine 10mg", dosage: "1 tablet", frequency: "Once daily", duration: "5 days", morning: false, afternoon: false, night: true },
        ]
      },
      {
        id: 2, date: "2026-02-14", type: "Blood Test Report", doctor: "Dr. Lakshmi Venkat", hospital: "AIIMS",
        patient: user?.name || "Patient", age: 28, bloodGroup: "B+",
        symptoms: "Fatigue, Dizziness",
        diagnosis: "Mild Anemia — Iron deficiency detected, hemoglobin 10.5 g/dL",
        recommendation: "Iron-rich diet, regular exercise, follow-up in 4 weeks",
        status: "Completed",
        prescriptions: [
          { medicine: "Ferrous Sulfate 200mg", dosage: "1 tablet", frequency: "Once daily", duration: "30 days", morning: true, afternoon: false, night: false },
          { medicine: "Vitamin B12 1500mcg", dosage: "1 tablet", frequency: "Once daily", duration: "30 days", morning: false, afternoon: true, night: false },
          { medicine: "Folic Acid 5mg", dosage: "1 tablet", frequency: "Once daily", duration: "30 days", morning: true, afternoon: false, night: false },
        ]
      },
      {
        id: 3, date: "2026-01-05", type: "Dental Checkup", doctor: "Dr. Kavitha Sundaram", hospital: "Dental Care Plus",
        patient: user?.name || "Patient", age: 28, bloodGroup: "B+",
        symptoms: "Toothache, Sensitivity",
        diagnosis: "Dental Cavity — Grade II cavity in lower left molar",
        recommendation: "Root canal treatment recommended, maintain oral hygiene",
        status: "Completed",
        prescriptions: [
          { medicine: "Amoxicillin 500mg", dosage: "1 capsule", frequency: "Thrice daily", duration: "7 days", morning: true, afternoon: true, night: true },
          { medicine: "Ibuprofen 400mg", dosage: "1 tablet", frequency: "Twice daily", duration: "5 days", morning: true, afternoon: false, night: true },
          { medicine: "Chlorhexidine Mouthwash", dosage: "10ml rinse", frequency: "Twice daily", duration: "14 days", morning: true, afternoon: false, night: true },
        ]
      }
    ];

    // Merge defaults and saved
    const allReports = [...defaults, ...saved];
    setReports(allReports);
  }, [user]);

  const handleDownload = (report) => {
    // Generate a text representation of the report
    const content = `
═══════════════════════════════════════════════
           HEALTHBRIDGE MEDICAL REPORT
═══════════════════════════════════════════════
Report ID: HB-${report.id}
Date: ${report.date}
═══════════════════════════════════════════════

HOSPITAL: ${report.hospital || 'HealthBridge Network'}
CONSULTING DOCTOR: ${report.doctor}

PATIENT INFORMATION
───────────────────
Name: ${report.patient}
Age: ${report.age} years
Blood Group: ${report.bloodGroup}

CLINICAL DETAILS
───────────────────
Symptoms: ${report.symptoms}
Diagnosis: ${report.diagnosis}
Recommendation: ${report.recommendation}

PRESCRIPTION
───────────────────
${report.prescriptions?.map((rx, i) => `${i+1}. ${rx.medicine} — ${rx.dosage} (${rx.frequency || ''}) ${rx.duration ? `for ${rx.duration}` : ''}`).join('\n') || 'No prescriptions'}

═══════════════════════════════════════════════
This is a system-generated report from HealthBridge.
For medical emergencies, call 108.
© 2026 HealthBridge — Universal Healthcare Platform
═══════════════════════════════════════════════
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthBridge_Report_${report.date}_${report.doctor.replace(/\s/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="medical-reports animate-fade-in">
      <div className="page-header">
        <h1>{t('medicalReport')}</h1>
        <p>View, download, and manage your universal medical reports</p>
      </div>

      {!selectedReport ? (
        <div className="reports-grid">
          {reports.sort((a, b) => new Date(b.date) - new Date(a.date)).map((report, i) => (
            <div key={report.id} className="report-card glass-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="report-card-header">
                <div className="report-type-icon">
                  <FileText size={22} />
                </div>
                <div>
                  <h3>{report.type}</h3>
                  <p className="report-date"><Calendar size={14} /> {new Date(report.date).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <span className={`badge ${report.status === 'Completed' ? 'badge-success' : report.status === 'Upcoming' ? 'badge-primary' : 'badge-warning'}`}>
                  {report.status || 'Completed'}
                </span>
              </div>
              <div className="report-card-body">
                <div className="report-detail"><User size={14} /> {report.doctor}</div>
                <div className="report-detail"><Building size={14} /> {report.hospital}</div>
                <div className="report-detail"><Pill size={14} /> {report.diagnosis?.split('—')[0] || 'Pending'}</div>
              </div>
              <div className="report-card-actions">
                <button className="btn btn-primary btn-sm" onClick={() => setSelectedReport(report)}>
                  <Eye size={14} /> View
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleDownload(report)}>
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="report-viewer">
          <button className="btn btn-secondary btn-sm" onClick={() => setSelectedReport(null)} style={{ marginBottom: 20 }}>
            <ArrowLeft size={14} /> Back to Reports
          </button>

          <div className="report-document glass-card">
            <div className="report-hospital-header">
              <div className="hospital-logo">🏥</div>
              <div className="hospital-info-text">
                <h2>{selectedReport.hospital || 'HealthBridge Hospital'}</h2>
                <p>Universal Healthcare Network • Report ID: HB-{selectedReport.id}</p>
              </div>
              <div className="report-doc-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => handleDownload(selectedReport)}>
                  <Download size={14} /> Download
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
                  <Printer size={14} /> Print
                </button>
              </div>
            </div>

            <div className="report-divider"></div>

            <div className="report-patient-info">
              <div className="rpi-row"><span className="rpi-label">Patient Name:</span><span className="rpi-value">{selectedReport.patient}</span></div>
              <div className="rpi-row"><span className="rpi-label">Age:</span><span className="rpi-value">{selectedReport.age} years</span></div>
              <div className="rpi-row"><span className="rpi-label">Blood Group:</span><span className="rpi-value">{selectedReport.bloodGroup}</span></div>
              <div className="rpi-row"><span className="rpi-label">Date:</span><span className="rpi-value">{selectedReport.date}</span></div>
              <div className="rpi-row"><span className="rpi-label">Consulting Doctor:</span><span className="rpi-value">{selectedReport.doctor}</span></div>
              <div className="rpi-row"><span className="rpi-label">Hospital:</span><span className="rpi-value">{selectedReport.hospital}</span></div>
            </div>

            <div className="report-divider"></div>

            <div className="report-section">
              <h3>Symptoms</h3>
              <p>{selectedReport.symptoms}</p>
            </div>
            <div className="report-section">
              <h3>{t('diagnosis')}</h3>
              <p className="diagnosis-text">{selectedReport.diagnosis}</p>
            </div>
            <div className="report-section">
              <h3>{t('recommendation')}</h3>
              <p>{selectedReport.recommendation}</p>
            </div>

            {selectedReport.prescriptions?.length > 0 && (
              <>
                <div className="report-divider"></div>
                <div className="report-section">
                  <h3>{t('prescription')}</h3>
                  <table className="prescription-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{t('medicine')}</th>
                        <th>{t('dosage')}</th>
                        <th>Frequency</th>
                        <th>Duration</th>
                        <th>{t('morning')}</th>
                        <th>{t('afternoon')}</th>
                        <th>{t('night')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReport.prescriptions.map((rx, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td className="rx-medicine">{rx.medicine}</td>
                          <td>{rx.dosage}</td>
                          <td>{rx.frequency || '—'}</td>
                          <td>{rx.duration || '—'}</td>
                          <td>{rx.morning ? '✅' : '—'}</td>
                          <td>{rx.afternoon ? '✅' : '—'}</td>
                          <td>{rx.night ? '✅' : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <div className="report-footer">
              <div className="report-signature">
                <p>Doctor's Signature</p>
                <div className="signature-line"></div>
                <p className="sig-name">{selectedReport.doctor}</p>
              </div>
              <div className="report-stamp">
                <CheckCircle size={24} />
                <span>Verified Report</span>
              </div>
            </div>

            <p className="report-disclaimer">
              This is a system-generated report from HealthBridge Universal Healthcare Platform. 
              Valid at any hospital worldwide. For medical emergencies, call 108.
              © 2026 HealthBridge
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
