import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import ChatBot from './components/ChatBot';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Portfolio from './pages/Portfolio';
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
}


class SantoshDarisi_24BCE0979 {
  printDetails_Santosh_24BCE0979() {
    const student_Santosh_24BCE0979 = "Santosh Darisi - 24BCE0979";
    console.log("Assignment Metadata:", student_Santosh_24BCE0979);
  }
}

function AppLayout({
  // Assignment Requirement
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
 children }) {
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
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
  new SantoshDarisi_24BCE0979().printDetails_Santosh_24BCE0979();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const publicPaths = ['/', '/login', '/register', '/portfolio'];
  const isPublicPage = publicPaths.includes(location.pathname);

  if (isPublicPage) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio" element={<Portfolio />} />
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
