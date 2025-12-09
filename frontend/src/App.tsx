// src/App.tsx

// Core routing + auth providers
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MotherProvider } from './contexts/MotherContext'; 

// ASHA Worker Screens
import { Login } from './pages/Login'; 
import { Dashboard } from './pages/Dashboard'; 
import { MotherForm } from './pages/MotherForm'; 
import { MotherProfile } from './pages/MotherProfile'; 

// Urban Mother Flow Screens
import { MotherLogin } from './pages/MotherLogin'; 
import { MotherDashboard } from './pages/MotherDashboard';
import { HealthRecords } from './pages/HealthRecords';
import { EmergencyContacts } from './pages/EmergencyContacts';
import { PregnancyDietPlan } from './pages/PregnancyDietPlan';
import { BabyKickHistory } from './pages/BabyKickHistory'; 


/* -------------------------------------------------------
   1. Private Route Wrapper for ASHA Worker
   - Blocks access until ASHA user is authenticated
   - Uses global AuthContext for validation
--------------------------------------------------------*/
const AshaPrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { asha, loading } = useAuth(); 

    // Show loading screen while auth state is being checked
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-pink-600 font-bold">
                Loading...
            </div>
        );
    }

    // If authenticated → allow access
    // If not authenticated → redirect to ASHA login
    return asha ? children : <Navigate to="/login" replace />;
};


/* -------------------------------------------------------
   2. Private Route Wrapper for Urban Mother
   - Uses a mock auth check stored in sessionStorage
   - Protects mother-specific routes
--------------------------------------------------------*/
const MotherPrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = sessionStorage.getItem('mother_auth') === 'authenticated';

    // Allow access only if mother login session exists
    return isAuthenticated ? children : <Navigate to="/mother/login" replace />;
};


export default function App() {
    return (
        // Global providers wrapping the entire application
        <AuthProvider>
            <MotherProvider>
                <BrowserRouter>
                    <Routes>

                        {/*
                          --------------------------------------------------
                          ASHA WORKER ROUTES (Primary Admin Workflow)
                          --------------------------------------------------
                        */}
                        <Route path="/login" element={<Login />} />

                        <Route path="/dashboard" element={
                            <AshaPrivateRoute>
                                <Dashboard />
                            </AshaPrivateRoute>
                        } />

                        <Route path="/add-mother" element={
                            <AshaPrivateRoute>
                                <MotherForm />
                            </AshaPrivateRoute>
                        } />

                        <Route path="/mother/:id" element={
                            <AshaPrivateRoute>
                                <MotherProfile />
                            </AshaPrivateRoute>
                        } />


                        {/*
                          --------------------------------------------------
                          URBAN MOTHER ROUTES (Mobile-like Mother Flow)
                          --------------------------------------------------
                        */}
                        <Route path="/mother/login" element={<MotherLogin />} />

                        <Route path="/mother/dashboard" element={
                            <MotherPrivateRoute>
                                <MotherDashboard />
                            </MotherPrivateRoute>
                        } />

                        <Route path="/mother/health-records" element={
                            <MotherPrivateRoute>
                                <HealthRecords />
                            </MotherPrivateRoute>
                        } />

                        <Route path="/mother/emergency-contacts" element={
                            <MotherPrivateRoute>
                                <EmergencyContacts />
                            </MotherPrivateRoute>
                        } />

                        <Route path="/mother/diet-plan" element={
                            <MotherPrivateRoute>
                                <PregnancyDietPlan />
                            </MotherPrivateRoute>
                        } />

                        <Route path="/mother/baby-kicks" element={
                            <MotherPrivateRoute>
                                <BabyKickHistory />
                            </MotherPrivateRoute>
                        } />


                        {/*
                          --------------------------------------------------
                          Default Redirect
                          - Send any unknown root request to ASHA dashboard
                          --------------------------------------------------
                        */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    </Routes>
                </BrowserRouter>
            </MotherProvider>
        </AuthProvider>
    );
}
