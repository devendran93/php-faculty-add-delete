import React, { useState, useRef, useContext } from "react";
import { Phone, Mail, BookOpen, Image, GraduationCap, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../js/AuthContext"; // ✅ named import

export default function Topbar() {
  const { adminLoggedIn, login, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const menuRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "masscollege") {
      login();
      setIsModalOpen(false);
    } else {
      alert("Invalid credentials!");
    }
    window.location.reload();
  };

  return (
    <div className="bg-red-600 text-white text-sm px-4 py-2 border-b border-gray-500 relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap" ref={menuRef}>
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Phone className="text-yellow-400 w-5 h-5" />
            <span className="text-sm font-light">0435-2400299 | +91 9488012299</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-yellow-400 w-5 h-5" />
            <span className="text-sm font-light">mass@masscollege.in</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-6 justify-end flex-1">
          <Link to="/government-orders" className="flex items-center gap-2 hover:text-black">
            <BookOpen className="w-5 h-5 text-yellow-400" /> Gov. Orders
          </Link>
          <Link to="/gallery" className="flex items-center gap-2 hover:text-black">
            <Image className="w-5 h-5 text-yellow-400" /> Gallery
          </Link>
          <Link to="/courses-offered" className="flex items-center gap-2 hover:text-black">
            <GraduationCap className="w-5 h-5 text-yellow-400" /> Courses
          </Link>

          {!adminLoggedIn && (
            <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-2 bg-yellow-400 text-red-700 px-3 py-1 rounded-md hover:bg-yellow-500 transition"
            >
              <LogIn className="w-4 h-4" />
            </button>
          )}

          {adminLoggedIn && (
            <div className="flex items-center gap-4">
              <span className="text-green-300 font-semibold">Welcome, Admin</span>
              <button 
              onClick={() => { logout(); window.location.reload(); }} 
              className="flex items-center gap-2 bg-gray-200 text-red-700 px-3 py-1 rounded-md hover:bg-gray-300 transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-60">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="text" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full p-3 border border-red-400 rounded-lg text-black" required />
              <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full p-3 border border-red-400 rounded-lg text-black" required />
              <button 
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
