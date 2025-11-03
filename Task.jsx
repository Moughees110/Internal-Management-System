import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import axios from "axios";

const PRIORITIES = ["Low", "Medium", "High"];
const STATUSES = ["In Progress", "Done"];
const REPORTERS = ["Sir Moughees Hasan Raza", "Sir Nouman", "Sir Akhtar"];

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    startDate: "",
    endDate: "",
    priority: PRIORITIES[0],
    assignedTo: "",
    project: "",
    status: STATUSES[0],
    reporter: REPORTERS[0],
    estimate: "",
    timeTracking: "",
    comments: [],
  });

  const API_BASE_URL = "http://localhost:5000/api/tasks";
  const PROJECTS_API_URL = "http://localhost:5000/api/projects/getProjects";
  const USERS_API_URL = "http://localhost:5000/api/users/getUsers";

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/getTasks`);
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
      alert("Failed to fetch tasks");
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(PROJECTS_API_URL);
      setProjects(res.data.projectList);
      if (res.data.projectList.length > 0) {
        setForm(prev => ({
          ...prev,
          project: res.data.projectList[0].name
        }));
      }
    } catch (error) {
      console.error("Error fetching projects", error);
      alert("Failed to fetch projects");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(USERS_API_URL);
      const userList = res.data.userList || [];
      setUsers(userList);
      if (userList.length > 0) {
        const fullName = `${userList[0].firstName} ${userList[0].lastName}`;
        setForm(prev => ({
          ...prev,
          assignedTo: fullName
        }));
      }
    } catch (error) {
      console.error("Error fetching users", error);
      alert("Failed to fetch users");
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function openAddModal() {
    setEditingTask(null);
    setForm({
      title: "",
      summary: "",
      startDate: "",
      endDate: "",
      priority: PRIORITIES[0],
      assignedTo: users.length > 0 ? `${users[0].firstName} ${users[0].lastName}` : "",
      project: projects.length > 0 ? projects[0].name : "",
      status: STATUSES[0],
      reporter: REPORTERS[0],
      estimate: "",
      timeTracking: "",
      comments: [],
    });
    setModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setForm({ 
      ...task,
      startDate: task.startDate.split('T')[0],
      endDate: task.endDate.split('T')[0],
      comments: task.comments || [] 
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.title || !form.startDate || !form.endDate) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      if (editingTask) {
        await axios.put(`${API_BASE_URL}/updateTask/${editingTask.id}`, form);
      } else {
        await axios.post(`${API_BASE_URL}/addTask`, form);
      }
      
      alert(editingTask ? "Task updated!" : "Task added!");
      setModalOpen(false);
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task");
    }
  }

  async function handleDelete(task) {
    const confirmDelete = window.confirm(`Are you sure you want to delete '${task.title}'?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/deleteTask/${task.id}`);
      alert("Task deleted!");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  }

  return (
    <div className="relative">
      <div className={`p-4 sm:p-6 max-w-full overflow-x-auto ${modalOpen ? "blur-sm" : ""}`}>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-black text-xl sm:text-2xl font-semibold">Task Management</h2>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-1 py-1 rounded shadow text-sm sm:text-base"
          >
            <Plus className="w-2 h-2 text-sm sm:w-5 sm:h-5" />
            Add Task
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading tasks...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
                <tr className="border-b border-blue-300">
                  {[
                    "Title",
                    "Summary",
                    "Start Date",
                    "End Date",
                    "Priority",
                    "Assigned To",
                    "Project",
                    "Status",
                    "Reporter",
                    "Estimate",
                    "Time Tracking",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="text-left px-1 py-1 sm:py-2 text-sm font-medium"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white text-gray-900">
                {tasks.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan={12} className="py-6 text-gray-500">
                      No tasks found.
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-100 transition-colors">
                      <td className="px-4 py-2">{task.title}</td>
                      <td className="px-4 py-2 line-clamp-2 max-w-xs">{task.summary}</td>
                      <td className="px-4 py-2">{new Date(task.startDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{new Date(task.endDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{task.priority}</td>
                      <td className="px-4 py-2">{task.assignedTo}</td>
                      <td className="px-4 py-2">{task.project}</td>
                      <td className="px-4 py-2">{task.status}</td>
                      <td className="px-4 py-2">{task.reporter}</td>
                      <td className="px-4 py-2">{task.estimate}</td>
                      <td className="px-4 py-2">{task.timeTracking}</td>
                      <td className="px-4 py-2 flex gap-3">
                        <button
                          onClick={() => openEditModal(task)}
                          className="text-yellow-600 hover:text-yellow-800"
                          aria-label="Edit task"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(task)}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Delete task"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed top-17 right-0 bottom-0 z-40 sm:w-[90%] md:w-[650px] bg-white shadow-lg overflow-y-auto transition-all">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-blue-800">
              {editingTask ? "Edit Task" : "Add Task"}
            </h3>
            <button
              onClick={() => setModalOpen(false)}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-red-600 hover:text-red-700" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="p-4 flex flex-col gap-4"
          >
            <label className="flex flex-col text-gray-900 text-sm">
              Title <span className="text-red-500">*</span>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                required
                className="mt-1 p-2 rounded border border-gray-300"
              />
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Summary
              <textarea
                name="summary"
                rows={3}
                value={form.summary}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300"
              />
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Reporter
              <select
                name="reporter"
                value={form.reporter}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300"
              >
                {REPORTERS.map((reporter) => (
                  <option key={reporter} value={reporter}>
                    {reporter}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex flex-col text-gray-900 text-sm w-full">
                Start Date <span className="text-red-500">*</span>
                <input
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 rounded border border-gray-300"
                />
              </label>
              <label className="flex flex-col text-gray-900 text-sm w-full">
                End Date <span className="text-red-500">*</span>
                <input
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 rounded border border-gray-300"
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex flex-col text-gray-900 text-sm w-full">
                Priority
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded border border-gray-300"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col text-gray-900 text-sm w-full">
                Project
                <select
                  name="project"
                  value={form.project}
                  onChange={handleChange}
                  className="mt-1 p-2 rounded border border-gray-300"
                  required
                >
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <option key={project.id} value={project.name}>
                        {project.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No projects available</option>
                  )}
                </select>
              </label>
            </div>

            <label className="flex flex-col text-gray-900 text-sm">
              Assigned To
              <select
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300"
              >
                {users.length > 0 ? (
                  users.map((user) => (
                    <option 
                      key={user.id} 
                      value={`${user.firstName} ${user.lastName}`}
                    >
                      {user.firstName} {user.lastName}
                    </option>
                  ))
                ) : (
                  <option value="">No users available</option>
                )}
              </select>
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Estimate (e.g., 3h or 2 days)
              <input
                name="estimate"
                type="text"
                value={form.estimate}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300"
              />
            </label>

            <label className="flex flex-col text-gray-900 text-sm">
              Time Tracking (e.g., 1h 30m)
              <input
                name="timeTracking"
                type="text"
                value={form.timeTracking}
                onChange={handleChange}
                className="mt-1 p-2 rounded border border-gray-300"
              />
            </label>

            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Task Comments
              </h4>
              {form.comments.length === 0 ? (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              ) : (
                <ul className="space-y-2 text-sm text-gray-700">
                  {form.comments.map((comment, idx) => (
                    <li key={idx} className="bg-gray-100 p-2 rounded">
                      <strong>User ID:</strong> {comment.userId} <br />
                      <strong>Comment:</strong> {comment.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}