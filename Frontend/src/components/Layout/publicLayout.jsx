import AppBar from './AppBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
export default function PublicLayout( ) {
    return (
        <div className="public-layout">
            <AppBar />
            <main className="main-content pt-10 pb-10" >
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
