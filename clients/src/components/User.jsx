import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, X, Edit2, Trash2 } from "lucide-react";

const GENDERS = ["Male", "Female", "Other"];

const api = axios.create({
  baseURL: "http://localhost:5000/api/users",
  headers: { "Content-Type": "application/json" },
});

export default function User() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null); 

  const [form, setForm] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    username: "",
    gender: GENDERS[0],
    roleId: "",
    newPassword: "",
    confirmPassword: "",
    address: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  async function fetchUsers() {
    try {
      const res = await api.get("/getUsers");
      setUsers(res.data.userList);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to load users!");
    }
  }

  async function fetchRoles() {
    try {
      const res = await axios.get("http://localhost:5000/api/roles/all");
      setRoles(res.data.roles || []);
    } catch (err) {
      console.error("Error fetching roles:", err);
      alert("Failed to load roles!");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function openAddModal() {
    setEditingUser(null);
    setForm({
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      username: "",
      gender: GENDERS[0],
      roleId: roles.length > 0 ? roles[0].id : "",
      newPassword: "",
      confirmPassword: "",
      address: "",
    });
    setModalOpen(true);
  }

  function openEditModal(user) {
    const roleMatch = roles.find((r) => r.roleName === user.role);
    setEditingUser(user);
    setForm({
      firstname: user.firstName,
      middlename: user.middleName,
      lastname: user.lastName,
      email: user.email,
      username: user.userName,
      gender: user.gender,
      roleId: roleMatch?.id || "",
      newPassword: "",
      confirmPassword: "",
      address: user.address || "",
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.firstname || !form.lastname || !form.email || !form.username) {
      alert("Please fill in all required fields!");
      return;
    }

    if (form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoadingSave(true);
    try {
      const payload = {
        id: editingUser?.id,
        firstName: form.firstname,
        middleName: form.middlename,
        lastName: form.lastname,
        email: form.email,
        userName: form.username,
        gender: form.gender,
        roleId: parseInt(form.roleId),
        address: form.address,
      };

      if (form.newPassword && form.confirmPassword) {
        payload.newPassword = form.newPassword;
        payload.confirmPassword = form.confirmPassword;
      }

      await api.post("/addUser", payload);
      await fetchUsers();

      setModalOpen(false);
 
      setForm((f) => ({ ...f, newPassword: "", confirmPassword: "" }));
    } catch (err) {
      console.error("Error saving user:", err);
      alert("Failed to save user!");
    } finally {
      setLoadingSave(false);
    }
  }
async function handleDelete(user) {
  if (!window.confirm(`Delete ${user.firstName} permanently?`)) return;

  setLoadingDeleteId(user.id);
  try {
    const res = await api.delete(`/deleteUser/${user.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Critical
      }
    });
    
    alert(res.data.message);
    await fetchUsers(); // Refresh list
  } catch (err) {
    alert(err.response?.data?.error || "Deletion failed");
  } finally {
    setLoadingDeleteId(null);
  }
}  return (
    <div className="relative">
      <div className={`p-4 sm:p-6 max-w-full overflow-x-auto ${modalOpen  ? "blur-sm" : ""}`}>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-black text-xl sm:text-2xl font-semibold">User Management</h2>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-2 py-2 rounded shadow text-sm sm:text-base"
            disabled={loadingSave}
          >
            <Plus className="w-5 h-5" />
            Add User 
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
              <tr className="border-b border-blue-300">
                {[
                  "First Name",
                  "Middle Name",
                  "Last Name",
                  "Email",
                  "Username",
                  "Gender",
                  "Role",
                  "Address",
                  "Actions",
                ].map((header) => (
                  <th key={header} className="text-left px-1 py-1 sm:py-2 text-sm font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {users.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={9} className="py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-4 py-2">{user.firstName}</td>
                    <td className="px-4 py-2">{user.middleName}</td>
                    <td className="px-4 py-2">{user.lastName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.userName}</td>
                    <td className="px-4 py-2">{user.gender}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">{user.address}</td>
                    <td className="px-4 py-2 flex gap-3">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-yellow-600 hover:text-yellow-800"
                        disabled={loadingSave || loadingDeleteId === user.id}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-red-600 hover:text-red-800"
                        disabled={loadingSave || loadingDeleteId === user.id}
                      >
                        {loadingDeleteId === user.id ? (
                          <span className="animate-spin inline-block w-5 h-5 border-2 border-t-transparent border-red-600 rounded-full"></span>
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed top-16 right-0 bottom-0 z-40 sm:w-[95%] md:w-[700px] bg-white shadow-lg overflow-y-auto transition-all">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-blue-800">
              {editingUser ? "Edit User" : "Add User"}
            </h3>
            <button
              onClick={() => setModalOpen(false)}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Close modal"
              disabled={loadingSave}
            >
              <X className="w-6 h-6 text-red-600 hover:text-red-700" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { label: "First Name", name: "firstname", required: true },
              { label: "Middle Name", name: "middlename" },
              { label: "Last Name", name: "lastname", required: true },
              { label: "Email", name: "email", type: "email", required: true },
              { label: "Username", name: "username", required: true },
            ].map(({ label, name, required, type = "text" }) => (
              <label key={name} className="flex flex-col text-gray-900 text-sm">
                {label} {required && <span className="text-red-500">*</span>}
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  required={required}
                  className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loadingSave}
                />
              </label>
            ))}

            <label className="flex flex-col text-gray-900 text-sm">
              Gender
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={loadingSave}
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Role
              <select
                name="roleId"
                value={form.roleId}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                disabled={loadingSave}
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.roleName}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              New Password
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={loadingSave}
              />
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={loadingSave}
              />
            </label>

            <label className="flex flex-col text-gray-900 text-sm md:col-span-2">
              Address
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={loadingSave}
              />
            </label>

            <div className="flex justify-end gap-3 mt-4 md:col-span-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={loadingSave}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white rounded"
                disabled={loadingSave}
              >
                {loadingSave ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
