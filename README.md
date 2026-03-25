# 📚 Study Planner

> A full-stack productivity web application that helps students organise their study sessions, track tasks, and manage subjects — all in one clean, dark-themed dashboard.

Contributed by [@Sayan-Mukherjee99](https://github.com/Sayan-Mukherjee99)

---

## ✨ Features

- 🔐 **Authentication** — Secure JWT-based user registration and login
- 📊 **Dashboard** — At-a-glance overview of upcoming tasks and study progress
- 📖 **Subjects** — Create and colour-code subjects to categorise your work
- ✅ **Tasks** — Add tasks with titles, deadlines, priority levels, and completion status
- 📅 **Calendar** — Visual calendar view of all scheduled tasks
- 📱 **Responsive Design** — Mobile-friendly layout with a collapsible sidebar

---

## 🕹️ Controls / Navigation

| Section | Description |
|---|---|
| **Dashboard** (`/`) | Overview of pending tasks and study session stats |
| **Subjects** (`/subjects`) | Add, edit, or delete subjects; assign a colour to each |
| **Tasks** (`/tasks`) | Create tasks, set priority (`low` / `medium` / `high`), mark as complete |
| **Calendar** (`/calendar`) | Browse tasks by date in a monthly/weekly calendar view |
| **Login** (`/login`) | Sign in with email and password |
| **Sign Up** (`/signup`) | Register a new account |

---

## 🗂️ File Structure

```
Study-Planner/
├── backend/                  # Express.js REST API
│   ├── config/               # Database connection configuration
│   ├── controllers/          # Route handler logic
│   ├── middleware/           # JWT authentication middleware
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.js
│   │   ├── subjectRoutes.js
│   │   └── taskRoutes.js
│   ├── schema.sql            # MySQL database schema
│   ├── server.js             # Entry point for the backend
│   └── package.json
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components (e.g. Sidebar)
│   │   ├── context/          # React context (AuthContext)
│   │   ├── pages/            # Page-level components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Subjects.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Calendar.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── services/         # Axios API service helpers
│   │   ├── App.jsx           # App router and protected routes
│   │   └── main.jsx          # React entry point
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── package.json              # Root-level scripts (concurrently)
└── README.md
```

---

## 🚀 How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) (running locally)

---

### 1. 🗄️ Database Setup

The application expects a database named `study_planner`. Run the provided schema to create it:

```bash
mysql -u root -p study_planner < backend/schema.sql
```

> *(Default password used in `.env`: `Work@Bench#CSDBMS@90`)*

---

### 2. ⚙️ Backend Setup

```bash
cd backend
npm install
npm start
```

The backend runs on **http://localhost:5000**.

---

### 3. 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**.

---

### ⚡ Run Everything at Once

From the root directory:

```bash
npm install      # installs root dev dependencies (concurrently)
npm run dev      # starts both backend and frontend concurrently
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=Work@Bench#CSDBMS@90
DB_NAME=study_planner
JWT_SECRET=supersecretkey_studyplanner_2026
```

> ⚠️ Never commit your `.env` file to version control.

---

## 🍴 Clone or Fork

### Clone

```bash
git clone https://github.com/Sayan-Mukherjee99/Study-Planner.git
cd Study-Planner
```

### Fork

1. Click the **Fork** button at the top-right of this repository page.
2. Clone your forked copy:

   ```bash
   git clone https://github.com/<your-username>/Study-Planner.git
   cd Study-Planner
   ```

3. Create a new branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Push and open a Pull Request against `main`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router v7 |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Node.js, Express 5 |
| Database | MySQL 2 |
| Auth | JWT (jsonwebtoken), bcryptjs |

---

## 👤 Contributor

| Name | GitHub |
|---|---|
| Sayan Mukherjee | [@Sayan-Mukherjee99](https://github.com/Sayan-Mukherjee99) |
