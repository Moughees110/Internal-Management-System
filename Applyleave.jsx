import { useState } from "react";

export default function Applyleave() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLeave = {
      leaveType,
      startDate,
      endDate,
      reason,
    };

    try {
      const response = await fetch("http://localhost:5000/api/leaves/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLeave),
      });

      const data = await response.json();

      if (response.ok) {
        alert(" Leave Applied Successfully!");
        setLeaveType("");
        setStartDate("");
        setEndDate("");
        setReason("");
      } else {
        alert(` Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Apply Leave Error:", error);
      alert(" Server Error");
    }
  };

  return (
    <div className="max-w-full overflow-x-auto mt-6 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Apply Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border border-gray-300 rounded-lg p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Annual Leave">Annual Leave</option>
        </select>

        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <textarea
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-gradient-to-b from-[#1E3A8A] to-[#3f99ff] text-white py-2 rounded-lg"
        >
          Apply Leave
        </button>
      </form>
    </div>
  );
}
