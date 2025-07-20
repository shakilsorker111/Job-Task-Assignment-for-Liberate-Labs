import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

interface EventFormProps {
  reFetch: () => void;
}

const EventForm: React.FC<EventFormProps> = ({reFetch}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (!title || !date || !time) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("https://server-pied-omega-19.vercel.app/post-event", {
        title,
        date,
        time,
        notes,
      });

      const createdEvent = res.data;

      // Reset form & show category
      setCategory(createdEvent.category);
      setTitle("");
      setDate("");
      setTime("");
      setNotes("");
      toast.success("Event added successfully!");
      reFetch();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl mx-auto space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        📅 Add New Event
      </h2>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter event title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          rows={3}
          placeholder="Optional notes..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category (auto-detected)
        </label>
        <input
          type="text"
          placeholder="Category will appear here..."
          readOnly
          value={category}
          className="w-full px-4 py-2 bg-gray-100 text-gray-500 border border-gray-300 rounded-lg cursor-not-allowed"
        />
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Adding..." : "➕ Add Event"}
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default EventForm;
