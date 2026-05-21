import AppBar from './AppBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
export default function PublicLayout( ) {
    return (
        <div className="public-layout">
            <AppBar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
