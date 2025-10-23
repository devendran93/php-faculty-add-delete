import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE = "http://masscollege.in/mass_polytechnic2/backend";

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    designation: "",
    department: "",
    image: null,
  });

  // Fetch faculty & check admin status
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get_faculty.php`);
      setFaculty(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("qualification", formData.qualification);
    data.append("designation", formData.designation);
    data.append("department", formData.department);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingFaculty) {
        await axios.post(`${API_BASE}/update_faculty.php?id=${editingFaculty.id}`, data);
        alert("✅ Faculty updated successfully!");
      } else {
        await axios.post(`${API_BASE}/add_faculty.php`, data);
        alert("✅ Faculty added successfully!");
      }

      setShowModal(false);
      setEditingFaculty(null);
      setFormData({ name: "", qualification: "", designation: "", department: "", image: null });
      fetchFaculty();
    } catch (err) {
      console.log(err);
      alert("❌ Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this faculty?")) {
      try {
        const res = await axios.post(`${API_BASE}/delete_faculty.php`, { id });
        if (res.data.status === "deleted") {
          alert("Faculty deleted successfully!");
          fetchFaculty();
        } else {
          alert("Delete failed: " + (res.data.message || "Unknown error"));
        }
      } catch (err) {
        console.error(err);
        alert("Error while deleting faculty. Check console.");
      }
    }
  };

  const handleEdit = (f) => {
    setEditingFaculty(f);
    setFormData({
      name: f.name,
      qualification: f.qualification,
      designation: f.designation,
      department: f.department,
      image: null,
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 via-white to-red-50 flex flex-col items-center">

    {/* 🌟 Hero Section with Enhanced Overlay */}
    <div className="relative w-full max-w-[200rem] mx-auto h-64 md:h-80 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/mass_polytechnic2/polytechnic_images/page/faculty.jpg')",
      }}
    >
      {/* Overlay layer with gradient + blur */}
      <div className="absolute inset-0" />

      {/* Animated title */}
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative text-4xl md:text-5xl font-extrabold text-white z-10 drop-shadow-2xl tracking-wide text-center px-4"
      >
        Faculty Members
      </motion.h1>
    </div>


      {/* 📋 Faculty Table */}
      <div className="w-full max-w-6xl overflow-x-auto bg-white mt-10 shadow-xl my-10">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-red-800 to-red-700 text-white text-center">
            <tr>
              <th className="p-3 border-2 border-black">S.No</th>
              <th className="p-3 border-2 border-black">Image</th>
              <th className="p-3 border-2 border-black">Name</th>  
              <th className="p-3 border-2 border-black">Qualification</th>
              <th className="p-3 border-2 border-black">Designation</th>
              <th className="p-3 border-2 border-black">Department</th>
              {isAdmin && <th className="p-3 border-2 border-black">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {faculty.map((f, index) => (
              <tr
                key={f.id}
                className="border-t hover:bg-red-50 transition-all text-center font-semibold text-black"
              >
                <td className="p-3 border-2">{index + 1}</td>
                <td className="p-3 border-2">
                  {f.image ? (
                    <img
                      src={`${API_BASE}/${f.image}`}
                      alt={f.name}
                      className="md:w-[150px] md:h-35 object-cover mx-auto  shadow"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="p-3 border-2">{f.name}</td>
                <td className="p-3 border-2">{f.qualification}</td>
                <td className="p-3 border-2">{f.designation}</td>
                <td className="p-3 border-2">{f.department}</td>
                {isAdmin && (
                  <td className="p-3 border-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(f)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➕ Add Button */}
      {isAdmin && (
        <div className="flex justify-end w-full max-w-6xl mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-800 transition"
          >
            + Add Faculty
          </button>
        </div>
      )}

      {/* ✏️ Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowModal(false);
              setEditingFaculty(null);
            }}
          ></div>
          <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md z-10">
            <h2 className="text-xl font-bold mb-4 text-center text-red-700">
              {editingFaculty ? "Update Faculty" : "Add Faculty"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
                required
              />
              <input
                type="text"
                placeholder="Qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
                required
              />
              <input
                type="text"
                placeholder="Designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
                required
              />
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                className="w-full"
              />
              <button
                type="submit"
                className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
              >
                {editingFaculty ? "Update" : "Add"}
              </button>
            </form>
            <button
              onClick={() => {
                setShowModal(false);
                setEditingFaculty(null);
              }}
              className="mt-4 w-full text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
