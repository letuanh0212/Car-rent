import AdminSidebar from "./Sibar";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-(--color-border) bg-(--color-surface-lowest)">
        <AdminSidebar />
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-(--color-surface) p-6">
        <Outlet />
      </main>

    </div>
  );
}
