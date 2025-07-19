import React, { useEffect, useState } from "react";
import axios from "axios";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: string;
  archived: boolean;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [error, setError] = useState<string>("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get<Event[]>("http://localhost:5000/all-events");
      const sorted = res.data.sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
      );
      setEvents(sorted);
    } catch (err) {
      setError("Failed to load events. Please try again.");
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError("Could not delete the event.");
    }
  };

  const archiveEvent = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/update/${id}`);
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, archived: true } : e))
      );
    } catch {
      setError("Could not archive the event.");
    }
  };

  const filteredEvents =
    filter === "All" ? events : events.filter((e) => e.category === filter);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        📋 Your Events
      </h2>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="flex justify-center gap-3 flex-wrap">
        {["All", "Work", "Personal", "Other"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={
              filter === cat
                ? "px-4 py-1 rounded-full border bg-blue-600 text-white border-blue-600 transition"
                : "px-4 py-1 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600">
                📅 {event.date} ⏰ {event.time}
              </p>
              {event.notes && (
                <p className="mt-2 text-sm text-gray-700">📝 {event.notes}</p>
              )}
              <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                Category: {event.category}
              </span>
              {event.archived && (
                <span className="block mt-1 text-xs text-red-500 font-medium">
                  Archived
                </span>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => archiveEvent(event.id)}
                disabled={event.archived}
                className="flex-1 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600 disabled:opacity-50"
              >
                📥 Archive
              </button>
              <button
                onClick={() => deleteEvent(event.id)}
                className="flex-1 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
