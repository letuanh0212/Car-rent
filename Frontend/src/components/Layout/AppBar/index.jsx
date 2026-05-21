import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "~/components/Button";

export default function AppBar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-16 bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl  items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-extrabold text-black">
            LuxeDrive
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-[#0058be] py-1 text-sm font-bold text-[#0058be]"
                  : "py-1 text-sm font-semibold text-[#45464d] hover:text-[#0058be]"
              }
            >
              Browse Cars
            </NavLink>

            <NavLink
              to="/deals"
              className="py-1 text-sm font-semibold text-[#45464d] hover:text-[#0058be]"
            >
              Deals
            </NavLink>

            <NavLink
              to="/about"
              className="py-1 text-sm font-semibold text-[#45464d] hover:text-[#0058be]"
            >
              About
            </NavLink>
          </div>
        </div>

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
      </div>
    </nav>
  );
}