import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/expenses", label: "Expenses" },
  { to: "/rooms", label: "Rooms & Goals" },
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#3b5323]
        text-white p-6 transition-transform z-40
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-xl font-bold mb-6">Expense Manager</h2>

        <nav className="space-y-2">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 ${
                  active ? "bg-[#6b8e23]" : "hover:bg-[#6b8e23]/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
