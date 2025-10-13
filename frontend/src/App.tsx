import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import EquipmentList from './components/equipment/EquipmentList';
import ReservationList from './components/reservations/ReservationList';
import AllReservationsList from './components/reservations/AllReservationsList';
import Layout from './components/common/Layout';
import Profile from './components/auth/Profile';
import AnalyticsPage from './components/dashboard/AnalyticsPage';

const queryClient = new QueryClient();
const theme = createTheme();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="equipment" element={<EquipmentList />} />
                <Route path="reservations" element={<ReservationList />} /> {/* User's own */}
                <Route path="profile" element={<Profile />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                {/* 👇 ADD ADMIN ROUTES */}
                <Route path="admin">
                  <Route path="reservations" element={<AllReservationsList />} /> {/* All reservations */}
                  {/* Add other admin routes as needed */}
                </Route>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;