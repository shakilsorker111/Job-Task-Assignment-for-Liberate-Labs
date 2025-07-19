# 📅 Mini Event Scheduler

A full-stack TypeScript-based Event Scheduling App that allows users to create, view, filter, archive, and delete events. Categorization is intelligently done based on event keywords using a simple AI-like logic.

## 🚀 Live Site

🔗 [Visit Live Site]()

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