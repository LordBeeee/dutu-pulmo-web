import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import VerifyOTP from './pages/Verify-otp/VerifyOTP'
import Home from './pages/Home/Home'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile/Profile'
import ForgotPassword from './pages/forgot-password/ForgotPassword'
import ResetPassword from './pages/Reset-password/ResetPassword'
import DoctorAppointment from './pages/Doctor-appointment/Doctor-appointment'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-OTP" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctor-appointment" element={<DoctorAppointment />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
