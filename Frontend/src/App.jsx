import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/Layout/publicLayout';
import Car from '~/pages/Car';
import LoginPage from '~/pages/authCustomers/LoginPage';
import RegisterPage from '~/pages/authCustomers/RegisterPage';
import CarDetailPage from '~/pages/Car/_id';
import Profile from '~/pages/authCustomers/Profile';
import BookingForm from '~/pages/Booking';
import _id from './pages/Booking/_id';

import PrivateLayout from './components/Layout/privateLayout';
import BookingsManagement from './pages/DashBoard/Booking';
import CarManagement from './pages/DashBoard/Car';
import CustomersManagement from './pages/DashBoard/Customer';
import LoginPageSystem from '~/pages/authAccountSystem/LoginPageSystem';
import Dashboard from './pages/DashBoard';
function App() {
    return (
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Car />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cars/:id" element={<CarDetailPage />} />
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/bookings' element={<BookingForm/>}/>
                    <Route path='/booking/:id' element={<_id/>}/>
                 </Route>
                <Route element = {<PrivateLayout/>}>
                    <Route path='/dashboard' element={<Dashboard/>}></Route>
                    <Route path='/dashboard/cars' element={<CarManagement/>} />
                    <Route path='/dashboard/bookings' element={<BookingsManagement/>} />
                    <Route path='/dashboard/customers' element={<CustomersManagement/>} />
                </Route>s
                <Route path='/loginSystem' element={<LoginPageSystem/>} />
            </Routes>
    );   
}

export default App;
