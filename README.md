# 📅 Mini Event Scheduler

A full-stack TypeScript-based Event Scheduling App that allows users to create, view, filter, archive, and delete events. Categorization is intelligently done based on event keywords using a simple AI-like logic.

## 🚀 Live Site

🔗 [Visit Live Site](https://spectacular-hotteok-29028d.netlify.app/)

---

## 📌 Features

- 📆 **Add Events** with title, date, time, notes, and automatic category
- 🧠 **Smart Categorization**: Categorizes events as "Work", "Personal", or "Other" based on keywords
- 📋 **View All Events**, sorted by date & time (ascending)
- 📂 **Filter Events by Category**
- ✅ **Archive** completed or irrelevant events
- 🗑️ **Delete** events
- ⚡ **In-memory Data Store** (No database needed)
- 🧪 **Unit Testing** with Jest
- 📱 **Fully Responsive UI** for mobile, tablet, and desktop
- 🎨 **Tailwind CSS** for modern, elegant design
- 🔄 **RESTful API** built with Express.js + TypeScript

---

## 🛠️ Tech Stack

**Frontend:**
- React (TypeScript)
- Vite
- Tailwind CSS
- Axios
- hot toast

**Backend:**
- Node.js
- Express.js (TypeScript)

---

## 🧠 Categorization Logic

- **Work**: meeting, project, client, deadline, report
- **Personal**: birthday, family, anniversary, friend, party
- **Other**: Anything else

Example:  
Event titled `"Team Meeting with Client"` → `Category: Work`


✅ Setup Instructions (Frontend & Backend):

🖥️ Backend (Node.js + TypeScript + Express):
1. just clone the repository
2. Navigate to server folder : cd server
3. give prompt in terminal : npm install
4. Start the backend server (dev mode) : npm run dev


💻 Frontend (React + TypeScript + Tailwind CSS);
1. just clone the repository
2. Navigate to server folder : cd client
3. give prompt in terminal : npm install
4. Start the frontend app : npm run dev