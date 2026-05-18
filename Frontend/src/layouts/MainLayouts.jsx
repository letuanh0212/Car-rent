// layouts/MainLayout.jsx

import Header from "../components/navigation/header.jsx";
import Navbar from "../components/navigation/Navbar";
// import Sidebar from "../components/navigation/Sidebar";
import Footer from "../components/navigation/Footer";

export default function MainLayout({ children }) {

    return (

        <div className="min-h-screen flex flex-col bg-gray-100">

            {/* HEADER */}

            <Header />

            {/* MENU DƯỚI HEADER */}

            <Navbar />

            {/* BODY */}

            <div className="flex flex-1">

                {/* CONTENT */}

                <main className="flex-1 p-5">

                    {children}

                </main>

            </div>

            {/* FOOTER */}

            <Footer />

        </div>
    );
}