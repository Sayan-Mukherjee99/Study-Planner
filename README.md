# 📚 Study Planner

> A full-stack personal study management web app — built by [Sayan-Mukherjee99](https://github.com/Sayan-Mukherjee99)

---

## 📖 Description

**Study Planner** (branded as *StudyFlow* in-app) is a full-stack web application that helps students organise their academic life. Users can create and colour-code subjects, manage tasks with priorities and deadlines, and log study sessions — all behind a secure login system.

The stack is:
- **Frontend** — React + Vite + Tailwind CSS
- **Backend** — Node.js + Express.js
- **Database** — MySQL

---

## 📁 File Structure

```
Study-Planner/
├── package.json               # Root scripts (run both servers together)
├── package-lock.json
│
├── backend/
│   ├── server.js              # Express app entry point
│   ├── schema.sql             # MySQL schema (users, subjects, tasks, study_sessions)
│   ├── initdb.js              # DB initialisation helper
│   ├── test_db.js             # DB connection test
│   ├── config/                # Database connection config
│   ├── controllers/
│   │   ├── authController.js  # Register / login / logout logic
│   │   ├── subjectController.js
│   │   └── taskController.js
│   ├── middleware/            # JWT auth middleware
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── subjectRoutes.js
│   │   └── taskRoutes.js
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── src/
        ├── main.jsx           # React entry point
        ├── App.jsx            # Router + protected route wrapper
        ├── index.css
        ├── context/
        │   └── AuthContext.jsx  # Global auth state (JWT)
        ├── services/          # Axios API helpers
        ├── components/
        │   └── Sidebar.jsx    # Navigation sidebar
        └── pages/
            ├── Login.jsx
            ├── Signup.jsx
            ├── Dashboard.jsx  # Overview stats
            ├── Subjects.jsx   # Subject management
            ├── Tasks.jsx      # Task management
            └── Calendar.jsx   # Calendar view
```

---

## 🛠️ How to Run

### Prerequisites
- Node.js ≥ 18
- MySQL running locally

### 1. 🗃️ Database Setup

Create the database and apply the schema:

```bash
mysql -u root -p study_planner < backend/schema.sql
```

> *(Default password used in `.env`: `Work@Bench#CSDBMS@90`)*

### 2. ⚙️ Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=Work@Bench#CSDBMS@90
DB_NAME=study_planner
JWT_SECRET=supersecretkey_studyplanner_2026
```

### 3. 📦 Install All Dependencies

From the project root:

```bash
npm run install-all
```

### 4. 🚀 Run Both Servers

```bash
npm run dev
```

This starts both the backend and frontend concurrently:

| Service  | URL                     |
|----------|-------------------------|
| Backend  | http://localhost:5000   |
| Frontend | http://localhost:5173   |

#### Run separately (optional)

```bash
# Backend only
npm run backend

# Frontend only
npm run frontend
```

---

## 🎮 Controls

| Page / Feature   | Action                                    |
|------------------|-------------------------------------------|
| **Sign Up**      | Create a new account with name + email + password |
| **Log In**       | Authenticate with email + password (JWT issued) |
| **Dashboard**    | View summary stats for subjects, tasks, and sessions |
| **Subjects**     | Add / delete subjects; assign a custom colour |
| **Tasks**        | Add tasks with title, deadline, priority (`low` / `medium` / `high`), and linked subject; mark as complete |
| **Calendar**     | View tasks by date in a calendar layout |
| **Sidebar**      | Navigate between pages; collapse on mobile via hamburger menu |
| **Log Out**      | End session and clear JWT from context |

---

## 🔄 User Flow

```
[Visit App]
     │
     ▼
[Sign Up / Log In]
     │  JWT stored in AuthContext
     ▼
[Dashboard]  ──── overview of subjects, pending tasks, recent activity
     │
     ├──► [Subjects Page]
     │         Add a subject → give it a name & colour
     │         Delete a subject (cascades to tasks)
     │
     ├──► [Tasks Page]
     │         Add a task → title, deadline, priority, linked subject
     │         Toggle task status: pending ↔ completed
     │         Filter / sort by priority or deadline
     │
     ├──► [Calendar Page]
     │         See tasks plotted on a monthly calendar by deadline
     │
     └──► [Log Out]
               Clears auth state → redirected to /login
```

---

## 🗄️ Database Schema (Summary)

| Table            | Key Columns |
|------------------|-------------|
| `users`          | `id`, `name`, `email`, `password` |
| `subjects`       | `id`, `user_id`, `name`, `color` |
| `tasks`          | `id`, `user_id`, `subject_id`, `title`, `deadline`, `priority`, `status` |
| `study_sessions` | `id`, `user_id`, `task_id`, `start_time`, `end_time`, `duration_minutes`, `notes` |

All user data is isolated by `user_id`. Deleting a user cascades through all related records.

---

## 👨‍💻 Contributor

| Name | GitHub |
|------|--------|
| Sayan Mukherjee | [@Sayan-Mukherjee99](https://github.com/Sayan-Mukherjee99) |

---

> 📌 *This project was built as a mini full-stack project to demonstrate React, Express, and MySQL integration with JWT authentication.*
