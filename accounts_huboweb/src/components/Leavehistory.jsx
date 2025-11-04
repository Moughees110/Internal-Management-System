import { useEffect, useState } from "react";

export default function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/leaves/getLeaves");
        const data = await res.json();
        setLeaves(data.leaves || []);
      } catch (err) {
        console.error("Failed to fetch leaves:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="max-w-full px-4 mx-auto mt-6 p-4 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Leave History</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : leaves.length === 0 ? (
        <p className="text-center text-gray-500">No leave history found.</p>
      ) : (
        <table className="min-w-full border-collapse rounded-lg overflow-hidden text-sm md:text-base">
          <thead>
            <tr className="text-white bg-gradient-to-b from-[#1E3A8A] to-[#4891e4]">
              <th className="p-2 text-sm text-left">Type</th>
              <th className="p-2 text-sm text-left">From</th>
              <th className="p-2 text-sm text-left">To</th>
              <th className="p-2 text-sm text-left">Reason</th>
              <th className="p-2 text-sm text-left">Applied At</th>
            </tr>
          </thead>
<tbody>
  {leaves.map((leave) => (
    <tr
      key={leave.id}
      className="bg-gray-50 even:bg-white hover:bg-gray-100 transition duration-200"
    >
      <td className="p-2">{leave.leaveType}</td>
      <td className="p-2">{new Date(leave.startDate).toLocaleDateString()}</td>
      <td className="p-2">{new Date(leave.endDate).toLocaleDateString()}</td>
      <td className="p-2">{leave.reason}</td>
      <td className="p-2">{new Date(leave.createdAt).toLocaleString()}</td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
}
