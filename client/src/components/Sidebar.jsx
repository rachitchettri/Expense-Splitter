import { Menu } from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setOpen(!open)}
      >
        <Menu />
      </button>

      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#3b5323]
        text-white p-6 transition-transform
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-xl font-bold mb-6">Expense Manager</h2>
        {/* group list here */}
      </div>
    </>
  );
}
