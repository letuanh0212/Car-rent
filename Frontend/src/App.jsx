import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/Layout/publicLayout';
import Car from '~/pages/Car';
import LoginPage from '~/pages/authCustomers/LoginPage';
function App() {
    return (
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Car />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
                
            </Routes>
    );   
}

export default App;
