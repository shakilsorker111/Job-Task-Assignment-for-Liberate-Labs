import { useState } from "react";
import "./App.css";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

function App() {
  const [fetch, setFetch] = useState(false);
  console.log(fetch)
  const reFetch = () =>{
    setFetch(true);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 drop-shadow-lg">
            📅 Event Scheduler
          </h1>
          <p className="mt-2 text-gray-600 text-lg sm:text-xl">
            Organize your day with ease and clarity.
          </p>
        </header>

        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <EventForm reFetch={reFetch} />
        </section>

        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <EventList fetch={fetch} setFetch={setFetch} />
        </section>
      </div>
    </div>
  );
}

export default App;

