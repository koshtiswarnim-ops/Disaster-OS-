import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DisasterProvider } from './context/DisasterContext';
import { Navbar } from './components/layout/Navbar';
import { NotificationToast } from './components/layout/NotificationToast';

// Public & Auth Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';

// Citizen Dashboard Pages
import { CitizenDashboardPage } from './pages/CitizenDashboardPage';
import { CitizenSOSPage } from './pages/CitizenSOSPage';
import { TrackSOSPage } from './pages/TrackSOSPage';
import { CitizenMapPage } from './pages/CitizenMapPage';
import { CitizenAlertsPage } from './pages/CitizenAlertsPage';
import { CitizenAssistantPage } from './pages/CitizenAssistantPage';
import { CitizenProfilePage } from './pages/CitizenProfilePage';

// Operator Dashboard Pages
import { CommandCenterPage } from './pages/CommandCenterPage';
import { IncidentsPage } from './pages/IncidentsPage';
import { SmartAllocationPage } from './pages/SmartAllocationPage';
import { ResourceReallocationPage } from './pages/ResourceReallocationPage';
import { LiveMapPage } from './pages/LiveMapPage';
import { RescueTeamsPage } from './pages/RescueTeamsPage';
import { LogisticsFleetPage } from './pages/LogisticsFleetPage';
import { HospitalsPage } from './pages/HospitalsPage';
import { SheltersPage } from './pages/SheltersPage';
import { WarehousesPage } from './pages/WarehousesPage';
import { HazardRoutesPage } from './pages/HazardRoutesPage';
import { NgoVolunteersPage } from './pages/NgoVolunteersPage';
import { AlertsBroadcastPage } from './pages/AlertsBroadcastPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { SimulationPage } from './pages/SimulationPage';
import { RiskAnalysisPage } from './pages/RiskAnalysisPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { WorkspaceSettingsPage } from './pages/WorkspaceSettingsPage';

// Route Guard to enforce Citizen vs Operator permissions
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requireRole?: 'citizen' | 'operator';
}> = ({ children, requireRole }) => {
  const { isAuthenticated, isCitizen } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`/login?portal=${requireRole || 'citizen'}`} replace />;
  }

  if (requireRole === 'operator' && isCitizen) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Animated Routes wrapper for smooth page transitions and navbar spacing
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div key={location.pathname} className={`flex-1 flex flex-col ${isLanding ? '' : 'pt-18 sm:pt-20'}`}>
      <Routes location={location}>
        {/* Public Landing & Authentication */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* 1. CITIZEN DASHBOARD EXPERIENCE */}
        <Route path="/citizen" element={<Navigate to="/citizen/dashboard" replace />} />
        <Route 
          path="/citizen/dashboard" 
          element={
            <ProtectedRoute requireRole="citizen">
              <CitizenDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/citizen/sos" 
          element={
            <ProtectedRoute requireRole="citizen">
              <CitizenSOSPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/citizen/track" 
          element={
            <ProtectedRoute requireRole="citizen">
              <TrackSOSPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/citizen/track/:code" 
          element={
            <ProtectedRoute requireRole="citizen">
              <TrackSOSPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/citizen/map" 
          element={
            <ProtectedRoute requireRole="citizen">
              <CitizenMapPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/citizen/alerts" 
          element={
            <ProtectedRoute requireRole="citizen">
              <CitizenAlertsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/citizen/assistant" 
          element={
            <ProtectedRoute requireRole="citizen">
              <CitizenAssistantPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/citizen/profile" 
          element={
            <ProtectedRoute requireRole="citizen">
              <CitizenProfilePage />
            </ProtectedRoute>
          } 
        />

        {/* 2. OPERATOR DASHBOARD EXPERIENCE */}
        <Route path="/operator" element={<Navigate to="/operator/dashboard" replace />} />
        <Route 
          path="/operator/dashboard" 
          element={
            <ProtectedRoute requireRole="operator">
              <CommandCenterPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/incidents" 
          element={
            <ProtectedRoute requireRole="operator">
              <IncidentsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/allocation" 
          element={
            <ProtectedRoute requireRole="operator">
              <SmartAllocationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/reallocation" 
          element={
            <ProtectedRoute requireRole="operator">
              <ResourceReallocationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/map" 
          element={
            <ProtectedRoute requireRole="operator">
              <LiveMapPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/teams" 
          element={
            <ProtectedRoute requireRole="operator">
              <RescueTeamsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/fleet" 
          element={
            <ProtectedRoute requireRole="operator">
              <LogisticsFleetPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/hospitals" 
          element={
            <ProtectedRoute requireRole="operator">
              <HospitalsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/shelters" 
          element={
            <ProtectedRoute requireRole="operator">
              <SheltersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/warehouses" 
          element={
            <ProtectedRoute requireRole="operator">
              <WarehousesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/routes" 
          element={
            <ProtectedRoute requireRole="operator">
              <HazardRoutesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/alerts" 
          element={
            <ProtectedRoute requireRole="operator">
              <AlertsBroadcastPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/assistant" 
          element={
            <ProtectedRoute requireRole="operator">
              <AIAssistantPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/simulation" 
          element={
            <ProtectedRoute requireRole="operator">
              <SimulationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/risk" 
          element={
            <ProtectedRoute requireRole="operator">
              <RiskAnalysisPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/analytics" 
          element={
            <ProtectedRoute requireRole="operator">
              <AnalyticsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/audit" 
          element={
            <ProtectedRoute requireRole="operator">
              <AuditLogsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/operator/settings" 
          element={
            <ProtectedRoute requireRole="operator">
              <WorkspaceSettingsPage />
            </ProtectedRoute>
          } 
        />

        {/* Backward Compatibility Shims */}
        <Route path="/command-center" element={<Navigate to="/operator/dashboard" replace />} />
        <Route path="/dashboard" element={<Navigate to="/operator/dashboard" replace />} />
        <Route path="/map" element={<Navigate to="/operator/map" replace />} />
        <Route path="/incidents" element={<Navigate to="/operator/incidents" replace />} />
        <Route path="/incidents/:id" element={<Navigate to="/operator/incidents" replace />} />
        <Route path="/resources" element={<Navigate to="/operator/allocation" replace />} />
        <Route path="/allocation" element={<Navigate to="/operator/allocation" replace />} />
        <Route path="/shelters" element={<Navigate to="/operator/shelters" replace />} />
        <Route path="/analytics" element={<Navigate to="/operator/analytics" replace />} />
        <Route path="/sos" element={<Navigate to="/citizen/sos" replace />} />
        <Route path="/alerts" element={<Navigate to="/operator/alerts" replace />} />
        <Route path="/simulation" element={<Navigate to="/operator/simulation" replace />} />
        <Route path="/warehouses" element={<Navigate to="/operator/warehouses" replace />} />
        <Route path="/rescue-teams" element={<Navigate to="/operator/teams" replace />} />
        <Route path="/logistics" element={<Navigate to="/operator/fleet" replace />} />
        <Route path="/vehicles" element={<Navigate to="/operator/fleet" replace />} />
        <Route path="/hospitals" element={<Navigate to="/operator/hospitals" replace />} />
        <Route path="/routes" element={<Navigate to="/operator/routes" replace />} />
        <Route path="/audit-logs" element={<Navigate to="/operator/audit" replace />} />
        <Route path="/settings" element={<Navigate to="/operator/settings" replace />} />
        <Route path="/profile" element={<Navigate to="/citizen/profile" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DisasterProvider>
          <div className="min-h-screen bg-[#05070d] text-[#F5F7FB] flex flex-col font-sans antialiased selection:bg-[#38bdf8] selection:text-[#05070d]">
            <Navbar />
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[#05070d]">
              <AnimatedRoutes />
            </main>
            <NotificationToast />
          </div>
        </DisasterProvider>
      </AuthProvider>
    </Router>
  );
}
