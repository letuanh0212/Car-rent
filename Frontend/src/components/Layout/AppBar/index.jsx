import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "~/components/Button";
import { logout } from "~/store/slices/customerAuthSlice";

export default function AppBar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  // Customer auth is registered in the Redux store under `customer`.
  const { user, isAuthenticated } = useSelector(
    (state) => state.customer || {}
  );

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "border-b-2 border-(--color-secondary) py-1 text-sm font-bold text-(--color-secondary)"
      : "py-1 text-sm font-semibold text-(--color-text-secondary) transition hover:text-(--color-secondary)";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-16 border-b border-(--color-border) bg-(--color-surface-lowest) shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-2xl font-extrabold text-(--color-text-primary)"
          >
            LuxeDrive
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={navLinkClass}>
              Browse Cars
            </NavLink>

            <NavLink to="/deals" className={navLinkClass}>
              Deals
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="compact"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              size="compact"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-primary) text-(--color-on-primary) transition hover:opacity-90"
            >
              <span className="material-symbols-outlined">
                person
              </span>
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface-lowest) shadow-lg">
                <div className="border-b border-(--color-border) px-4 py-3">
                  <p className="text-sm font-bold text-(--color-text-primary)">
                    {user?.name || user?.email || "Customer"}
                  </p>
                  <p className="text-xs text-(--color-text-muted)">
                    Signed in
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-(--color-text-secondary) hover:bg-(--color-surface-low)"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    person
                  </span>
                  Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate("/bookings");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-(--color-text-secondary) hover:bg-(--color-surface-low)"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    event_note
                  </span>
                  My Bookings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-(--color-error) hover:bg-(--color-error-bg)"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    logout
                  </span>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
