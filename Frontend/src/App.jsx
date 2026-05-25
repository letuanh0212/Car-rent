import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/Layout/publicLayout';
import Car from '~/pages/Car';
import LoginPage from '~/pages/authCustomers/LoginPage';
import RegisterPage from '~/pages/authCustomers/RegisterPage';
import CarDetailPage from '~/pages/Car/_id';
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
                </Route>
                    <Route path='/dashboard' element={<Dashboard/>}></Route>
                <Route path='/loginSystem' element={<LoginPageSystem/>} />
            </Routes>
    );   
}

export default App;
