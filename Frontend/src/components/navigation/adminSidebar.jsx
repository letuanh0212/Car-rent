import {
    Link,
    useLocation,

} from "react-router-dom";

import {
    LayoutDashboard,
    Car,
    CalendarDays,
    Users,
    ShieldAlert,
    Star,
    Settings,

} from "lucide-react";

export default function AdminSidebar() {


    const location = useLocation();


    const menuItems = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard size={20} />
        },
        {
            title: "Car Listings",
            path: "/management/cars",
            icon: <Car size={20} />
        },
        {
            title: "Bookings",
            path: "/management/bookings",
            icon: <CalendarDays size={20} />
        },
        {
            title: "Customers",
            path: "/management/customers",
            icon: <Users size={20} />
        },
        {
            title: "Reviews",
            path: "/management/reviews",
            icon: <Star size={20} />
        },
        {
            title: "Reports",
            path: "/management/reports",
            icon: <ShieldAlert size={20} />
        },
        {
            title: "Settings",
            path: "/management/settings",
            icon: <Settings size={20} />
        }
    ];

    return (

        <aside
            className="
                w-72
                min-h-screen
                flex
                flex-col
                justify-between
                px-5
                py-6
                text-white
                border-r
            "
            style={{
                background: "#1a2b3c",
                borderColor: "#24384d"
            }}
        >

            {/* TOP */}

            <div>

                {/* LOGO */}

                <div className="mb-12">

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <div
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                text-xl
                                font-bold
                            "
                            style={{
                                background: "#27445d"
                            }}
                        >
                            V
                        </div>

                        <div>

                            <h1
                                className="
                                    text-2xl
                                    font-bold
                                    tracking-wide
                                "
                            >
                                Velocity Fleet
                            </h1>

                            <p
                                className="
                                    text-sm
                                "
                                style={{
                                    color: "#94a3b8"
                                }}
                            >
                                Fleet Intelligence System
                            </p>

                        </div>

                    </div>

                </div>

                {/* MENU */}

                <nav
                    className="
                        flex
                        flex-col
                        gap-2
                    "
                >

                    {
                        menuItems.map((item) => {

                            const active =
                                location.pathname === item.path;

                            return (

                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                        px-4
                                        py-4
                                        rounded-2xl
                                        transition-all
                                        duration-200
                                    "
                                    style={{
                                        background: active
                                            ? "#27445d"
                                            : "transparent",

                                        color: active
                                            ? "#ffffff"
                                            : "#cbd5e1",

                                        boxShadow: active
                                            ? "0 4px 14px rgba(0,0,0,0.15)"
                                            : "none"
                                    }}
                                    onMouseEnter={(e) => {

                                        if (!active) {

                                            e.currentTarget.style.background =
                                                "#223548";
                                        }
                                    }}
                                    onMouseLeave={(e) => {

                                        if (!active) {

                                            e.currentTarget.style.background =
                                                "transparent";
                                        }
                                    }}
                                >

                                    <div>

                                        {item.icon}

                                    </div>

                                    <span
                                        className="
                                            font-medium
                                            text-[15px]
                                        "
                                    >
                                        {item.title}
                                    </span>

                                </Link>
                            );
                        })
                    }

                </nav>

            </div>

            {/* BOTTOM */}



        </aside>
    );
}