# School Management System

A web application for managing a preschool/school, with separate workspaces for administrators, teachers, and parents. The project is organized as a React client and an Express API backed by MongoDB and Mongoose.

## Features

- Role-based experiences for administrators, teachers, and parents.
- Management of students, classes, teachers, notices, activities, fees, and payments.
- Student progress records, attendance, and parent complaints.
- Real-time parent/teacher messaging using Socket.IO.
- Redux Toolkit and RTK Query for client state and API requests.

## Tech stack

- **Client:** React 18, Vite, React Router, Redux Toolkit, Tailwind CSS.
- **Server:** Node.js (ES modules), Express, Socket.IO.
- **Database:** MongoDB with Mongoose.

## Project structure

```text
client/
  src/
    pages/       Role-based pages and UI components
    redux/       Redux store, API slices, and feature state
    helpers/     Client-side helpers
server/
  controllers/   Request handlers
  models/        Mongoose models
  routes/        Express API routes
  seed/          Demo account seeding
  socket/        Socket.IO setup and event handlers
```

## Requirements

- Node.js and npm.
- A MongoDB database, either local or hosted (for example, MongoDB Atlas).

## Run locally

1. Configure the server database connection. Create `server/.env` and set `DATABASE_URL` to a MongoDB connection string that includes the database name:

   ```env
   DATABASE_URL=mongodb://127.0.0.1:27017/quanlynhatruong
   ```

   For MongoDB Atlas, use the connection string supplied by Atlas instead. Keep credentials out of source control.

2. Install and start the server:

   ```powershell
   cd server
   npm install
   npm run dev
   ```

   The API and Socket.IO server listens on `http://localhost:3000`. The root endpoint (`GET /`) returns `Hello World`.

3. In a second terminal, install and start the client:

   ```powershell
   cd client
   npm install
   npm run dev
   ```

   Open the local URL printed by Vite (normally `http://localhost:5173`).

### Local API configuration

The client currently uses the deployed API URL `https://quanlynhatruong.onrender.com` in its RTK Query setup and Socket.IO connections. Running the client locally therefore does **not** automatically make it use the local server. To test against `http://localhost:3000`, update those client API and Socket.IO URLs in the source before starting the client.

The Socket.IO server also restricts its allowed origin to the deployed client URL. For local real-time messaging, allow the local Vite origin in `server/socket/index.js`.

### MongoDB collections

Connecting to MongoDB does not by itself create the database or empty collections. Mongoose creates a model's collection when data is first written. For example, the `User` model writes to the `users` collection; a successful `DATABASE_URL` connection alone may not make that collection appear in MongoDB tools.

## Demo accounts

On server startup, the project calls its demo-account seeder. The configured development credentials are:

| Role | Username | Password |
| --- | --- | --- |
| Administrator | `admin` | `admin123` |
| Parent | `parent1` | `parent1` |
| Teacher | `teacher1` | `teacher1` |

These credentials are for development only. Do not use them in a public or production deployment.

## API overview

The Express router is mounted at `/`. Routes cover:

- Login and account/parent management.
- Teacher, student, and class management, including class schedules and attendance.
- Notices, group activities, and activities.
- Fees, payments, and payment reminders.
- Student progress records and parent feedback.
- Parent complaints.

See `server/routes/route.js` for the complete list of endpoints. Real-time messaging events are handled separately by Socket.IO.

## Available scripts

Run these commands from the relevant package directory:

| Directory | Command | Description |
| --- | --- | --- |
| `client` | `npm run dev` | Start the Vite development server. |
| `client` | `npm run build` | Build the client for production. |
| `client` | `npm run preview` | Preview the production build locally. |
| `client` | `npm run lint` | Run ESLint on the client. |
| `server` | `npm run dev` | Start the API with Node's watch mode. |
