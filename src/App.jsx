import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import ChatBot from './components/ChatBot';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DoctorFinder from './pages/DoctorFinder';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';
import AppointmentHistory from './pages/AppointmentHistory';
import SymptomChecker from './pages/SymptomChecker';
import MedicineChecker from './pages/MedicineChecker';
import MedicalReports from './pages/MedicalReports';
import Emergency from './pages/Emergency';
import UserProfile from './pages/UserProfile';

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        {children}
      </main>
      <ChatBot />
    </div>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const publicPaths = ['/', '/login', '/register'];
  const isPublicPage = publicPaths.includes(location.pathname);

  if (isPublicPage) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<DoctorFinder />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/book/:id" element={<BookAppointment />} />
        <Route path="/appointments" element={<AppointmentHistory />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/medicine-checker" element={<MedicineChecker />} />
        <Route path="/reports" element={<MedicalReports />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </AppLayout>
  );
}
