import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "~/components/Button";
import { logout } from "~/store/slices/authSlice";

const menuItems = [
  {
    label: "Dashboard",
    icon: "dashboard",
    to: "/dashboard",
  },
  {
    label: "Fleet Management",
    icon: "directions_car",
    to: "/dashboard/cars",
  },
  {
    label: "Bookings",
    icon: "calendar_month",
    to: "/dashboard/bookings",
  },
  {
    label: "User Management",
    icon: "group",
    to: "/dashboard/users",
  },
];

function SidebarLink({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200",
          isActive
            ? "translate-x-1 bg-(--color-admin-primary) text-(--color-on-admin-primary)"
            : "text-(--color-text-secondary) hover:bg-(--color-admin-primary-bg) hover:text-(--color-admin-primary)",
        ].join(" ")
      }
    >
      <span className="material-symbols-outlined text-[20px]">
        {icon}
      </span>
      <span>{children}</span>
    </NavLink>
  );
}

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/loginSystem");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-(--color-border) bg-(--color-surface-lowest) px-4 py-8 md:flex">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-(--color-admin-primary)">
          Admin Portal
        </h1>
        <p className="text-sm font-semibold text-(--color-text-secondary)">
          LuxeDrive Fleet
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => (
          <SidebarLink
            key={item.to}
            to={item.to}
            icon={item.icon}
          >
            {item.label}
          </SidebarLink>
        ))}
      </nav>

      <Button
        type="button"
        variant="admin"
        onClick={() => navigate("/dashboard/cars/new")}
        fullWidth
        className="mt-4 min-h-0 rounded-lg px-4 py-3 text-sm font-bold normal-case shadow-(--shadow-sm)"
      >
        <span className="material-symbols-outlined text-[20px]">
          add
        </span>
        Add New Vehicle
      </Button>

      <div className="mt-4 border-t border-(--color-border) pt-4">
        <SidebarLink to="/dashboard/settings" icon="settings">
          Settings
        </SidebarLink>

        <Button
          type="button"
          variant="danger"
          onClick={handleLogout}
          fullWidth
          className="mt-2 min-h-0 justify-start rounded-lg px-3 py-2 text-sm font-semibold normal-case"
        >
          <span className="material-symbols-outlined text-[20px]">
            logout
          </span>
          Logout
        </Button>
      </div>
    </aside>
  );
}
