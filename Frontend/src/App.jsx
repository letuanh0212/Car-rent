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
import Bookings from "./page/bookings/booking.jsx";
import ProfilePage from "./page/customer/profile.jsx";
import CustomerBooking from "./page/bookings/customerBooking.jsx";
import EditMyBooking from "./components/from/editMyBooking.jsx";



import LoginSystem from "./page/accountsystem/Login.jsx";
import RegisterSystem from "./page/accountsystem/createManagerSystem.jsx";
import Carlist from "./page/System/fleetmanagement.jsx";
import Dashboard from "./page/System/dashboard.jsx";
import AddVD from "./components/board/addVD.jsx";
import AddImages from "./components/board/addImages.jsx";

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
                {/* ADD VD */}
                <Route
                    path="/add-vd"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <AddVD />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                {/* ADD IMAGES */}
                <Route
                    path="/add-images"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <AddImages />
                            </AdminLayout>
                        </ProtectedRoute>
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
                <Route 
                    path="/my-bookings/:id"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <EditMyBooking />
                            </MainLayout>
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
                {/* PROFILE */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <ProfilePage />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />
                {/* BOOKING */}
                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <CustomerBooking />
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
                <Route
                    path="/booking/:id"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Bookings />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


            </Routes>
        </AuthProvider>
    );
}

export default App;