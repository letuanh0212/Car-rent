import { Routes, Route } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayouts.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

import Login from "./page/customer/login.jsx";
import Register from "./page/customer/register.jsx";

import CarList from "./page/car_articles/carlist.jsx";
import CreatedCar from "./components/board/createdCar.jsx";
import CarDetail from "./page/car_articles/cardetail.jsx";
import CarSearch from "./components/search/CarSearch.jsx";


import LoginSystem from "./page/accountsystem/Login.jsx";
import RegisterSystem from "./page/accountsystem/createManagerSystem.jsx";
import Carlist from "./page/System/fleetmanagement.jsx";
import Dashboard from "./page/System/dashboard.jsx";

function App() {
    return (
        <AuthProvider>
            <Routes>

                {/* PUBLIC using with customer */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
                {/* PRIVATE using with customer */}
                <Route
                    path="/loginsystem"
                    element={<LoginSystem />}
                />
                <Route 
                    path="/addmanager"
                    element={<RegisterSystem />}
                />  
                <Route
                    path="/management/cars"
                    element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Carlist/>
                        </AdminLayout>
                    </ProtectedRoute>}
                />
                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <Dashboard />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                {/* HOME */}

                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <CarList />
                        </MainLayout>
                    }
                />

                {/* CREATE CAR */}

                <Route
                    path="/create-car"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <CreatedCar />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                {/* SEARCH CARS */}

                <Route
                    path="/search"
                    element={
                        <MainLayout>
                            <CarSearch />
                        </MainLayout>
                    }
                />

                {/* CAR DETAIL */}

                <Route
                    path="/cars/:id"
                    element={
                        <MainLayout>
                            <CarDetail />
                        </MainLayout>
                    }
                />

            </Routes>
        </AuthProvider>
    );
}

export default App;