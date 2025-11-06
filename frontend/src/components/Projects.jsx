import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X, Pencil, Trash2 } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    client: "",
    description: "",
    attachment: null,
    preview: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [imageModal, setImageModal] = useState({ open: false, src: null });
const [clients, setClients] = useState([]);

useEffect(() => {
  fetchProjects();
  fetchClients(); 
}, []);

const fetchClients = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/clients/getClients");
    setClients(response.data.clientList);
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
};

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects/getProjects");
      setProjects(response.data.projectList);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const openModal = (index = null) => {
    if (index !== null) {
      const proj = projects[index];
      setForm({
        name: proj.name,
        client: proj.client,
        description: proj.description,
        attachment: null,
        preview: proj.attachment ? `http://localhost:5000${proj.attachment}` : null,
      });
      setEditProject(proj);
    } else {
      setForm({
        name: "",
        client: "",
        description: "",
        attachment: null,
        preview: null,
      });
      setEditProject(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({
      name: "",
      client: "",
      description: "",
      attachment: null,
      preview: null,
    });
    setEditProject(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const ext = file.name.split(".").pop().toLowerCase();
      const isImage = ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext);
      console.log(file)

      setForm((f) => ({
        ...f,
        [name]: file,
        preview: isImage
          ? URL.createObjectURL(file)
          : ext === "pdf"
          ? "📄"
          : ["doc", "docx"].includes(ext)
          ? "📝"
          : "📎",
      }));
    } else {
      setForm((f) => ({
        ...f,
        [name]: value,
      }));
    }
    console.log(form)
  };

  const handleSave = async () => {
    const { name, client, description, attachment } = form;
    if (!name || !client || !description) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("client", client);
      formData.append("description", description);
      if (attachment instanceof File) {
        formData.append("attachment", attachment);
      }
      if (editProject) {
        formData.append("id", editProject.id);
      }

      await axios.post("http://localhost:5000/api/projects/addProject", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchProjects();
      closeModal();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project.");
    }
  };

  const handleDelete = async (index) => {
    const project = projects[index];
    if (!project) return;
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/deleteProject/${project.id}`);
        alert("Project deleted!");
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project.");
      }
    }
  };

  return (
    <div className="relative">
      <div className={`p-4 sm:p-6 max-w-full ${isModalOpen ? "blur-sm" : ""}`}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
          <h2 className="text-black text-xl sm:text-2xl font-semibold">Project Management</h2>
          <button
            onClick={() => openModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white px-2 py-1 rounded shadow text-sm sm:text-base"
          >
            <Plus className="w-2 h-2 sm:w-3 sm:h-5" size={18} /> Add Project
          </button>
        </div>
<div className="overflow-x-auto rounded-lg shadow-lg">
  <table className="min-w-full text-sm sm:text-base">
<thead className="bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white">
  <tr>
    <th className="text-left px-4 py-2">Name</th>
    <th className="text-left px-4 py-2">Client</th>
    <th className="text-left px-4 py-2">Description</th>
    <th className="text-left px-4 py-2">Attachment</th>
    <th className="text-left px-4 py-2">Actions</th>
  </tr>
</thead>
    <tbody className="bg-white text-gray-900">
      {projects.length === 0 ? (
        <tr>
          <td colSpan={5} className="text-center py-6 text-gray-500">
            No projects found.
          </td>
        </tr>
      ) : (
        projects.map((proj, i) => (
          <tr key={i} className="hover:bg-gray-100 transition">
            <td className="px-4 py-2">{proj.name}</td>
            <td className="px-4 py-2">{proj.client}</td>
            <td className="px-4 py-2">{proj.description}</td>
            <td className="px-4 py-2 text-left"> {/* Changed to text-left */}
              {proj.attachment ? (() => {
                const attachmentUrl = `http://localhost:5000${proj.attachment}`;
                const ext = proj.attachment.split(".").pop().toLowerCase();
                const isImage = ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext);

                if (isImage) {
                  return (
                    <div className="flex">
                      <img
                        src={attachmentUrl}
                        alt="Attachment"
                        className="w-16 h-16 object-cover rounded cursor-pointer"
                        onClick={() => setImageModal({ open: true, src: attachmentUrl })}
                      />
                    </div>
                  );
                } else {
                  let icon = "📎";
                  if (ext === "pdf") icon = "📄";
                  else if (["doc", "docx"].includes(ext)) icon = "📝";
                  else if (["xls", "xlsx"].includes(ext)) icon = "📊";

                  return (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{icon}</span>
                      <a
                        href={attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        View
                      </a>
                    </div>
                  );
                }
              })() : <span className="text-gray-500">No Attachment</span>}
            </td>
            <td className="px-4 py-2">
              <div className="flex gap-3">
                <button onClick={() => openModal(i)} className="text-blue-600 hover:text-blue-800">
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDelete(i)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
      </div>

      {isModalOpen && (
        <div className="fixed top-17 right-0 bottom-0 z-40 sm:w-[90%] md:w-96 bg-white shadow-lg overflow-y-auto transition-all">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold text-blue-800">{editProject ? "Edit Project" : "Add Project"}</h3>
            <button onClick={closeModal} className="text-gray-700 hover:text-gray-900">
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
  <label className="flex flex-col text-sm text-gray-900">
    Proejct Name <span className="text-red-500">*</span>
    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      required
      className="mt-1 p-2 rounded border border-gray-300"
    />
  </label>

  <label className="flex flex-col text-sm text-gray-900">
    Client <span className="text-red-500">*</span>
    <select
      name="client"
      value={form.client}
      onChange={handleChange}
      required
      className="mt-1 p-2 rounded border border-gray-300 bg-white"
    >
      <option value="" disabled>Select client</option>
      {clients.map((c) => (
        <option key={c.id} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  </label>

  <label className="flex flex-col text-sm text-gray-900">
    Description <span className="text-red-500">*</span>
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      required
      rows={3}
      className="mt-1 p-2 rounded border border-gray-300"
    />
  </label>

  <label className="flex flex-col text-sm text-gray-900">
    Attachment
    <input type="file" name="attachment" onChange={handleChange} className="mt-1" />
    {form.preview && (
      typeof form.preview === "string" && (
        form.preview.startsWith("http") || form.preview.startsWith("blob")
      ) ? (
        <img
          src={form.preview}
          alt="Preview"
          className="mt-2 w-24 h-24 object-cover rounded border"
        />
      ) : (
        <div className="text-5xl mt-2">{form.preview}</div>
      )
    )}
  </label>

  <div className="flex justify-end gap-3 mt-4">
    <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
      Cancel
    </button>
    <button type="submit" className="px-4 py-2 bg-gradient-to-b from-[#1E3A8A] to-[#4891e4] text-white rounded">
      Save
    </button>
  </div>
</form>
        </div>
      )}

      {imageModal.open && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={() => setImageModal({ open: false, src: null })}
        >
          <img
            src={imageModal.src}
            alt="Preview"
            className="max-w-full max-h-full rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
