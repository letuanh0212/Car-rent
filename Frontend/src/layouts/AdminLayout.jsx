import AdminSidebar from "../components/navigation/adminSidebar.jsx";
import AdminTopbar from "../components/navigation/adminTopbar.jsx";

export default function MainLayout({
    children
}) {

    return (

        <div
            className="
                min-h-screen
                flex
                bg-[#f5f7fb]
            "
        >

            {/* SIDEBAR */}

            <AdminSidebar />

            {/* RIGHT SIDE */}

            <div
                className="
                    flex-1
                    flex
                    flex-col
                    overflow-hidden
                "
            >

                {/* TOPBAR */}

                <AdminTopbar />``

                {/* PAGE CONTENT */}

                <main
                    className="
                        flex-1
                        overflow-auto
                        p-6
                    "
                >

                    {children}

                </main>

            </div>

        </div>
    );
}