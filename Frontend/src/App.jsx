import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/Layout/publicLayout';
import Car from '~/pages/Car';
import LoginPage from '~/pages/authCustomers/LoginPage';
import RegisterPage from '~/pages/authCustomers/RegisterPage';
function App() {
    return (
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Car />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
                
            </Routes>
    );   
}

export default App;
