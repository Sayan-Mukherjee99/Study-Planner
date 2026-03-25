The application expects a database named `study_planner`.
You can run the schema manually using:
```bash
mysql -u root -p study_planner < backend/schema.sql
```
*(Default password used in .env: `Work@Bench#CSDBMS@90`)*

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The backend runs on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend runs on `http://localhost:5173`.

## Environment Variables
Create a `.env` file in the `backend` folder:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=Work@Bench#CSDBMS@90
DB_NAME=study_planner
JWT_SECRET=supersecretkey_studyplanner_2026
```
