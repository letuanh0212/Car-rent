import AdminSidebar from "./Sibar";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r bg-white">
        <AdminSidebar />
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </main>

    </div>
  );
}