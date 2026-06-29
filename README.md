# Micro-ATS: Technical Interview Scheduler & Recruitment Panel

This repository implements a modular, high-performance Technical Interview Scheduler with anti-collision validation rules to prevent double-booking technical interviewers.

---

## Deployed Links
* **Frontend Dashboard**: [https://micro-ats-frontend-three.vercel.app/](https://micro-ats-frontend-three.vercel.app/)
* **Backend API**: [https://micro-ats-backend.vercel.app/](https://micro-ats-backend.vercel.app/)
* **Swagger API Documentation**: [https://micro-ats-backend.vercel.app/api-docs](https://micro-ats-backend.vercel.app/api-docs)

---

## Technology Stack (Backend)
* **Core**: Node.js & Express
* **Language**: TypeScript (strictly typed, zero `any` usage)
* **Database**: MongoDB & Mongoose Object Data Modeling (ODM)
* **API Documentation & Router Generation**: TSOA (TypeScript OpenAPI Annotation framework) & Swagger UI
* **Validation**: AJV (Another JSON Schema Validator) for automatic body payload structure checks

---

## Key Backend Implementations

### 1. Overlap Prevention Constraint (Anti-AI Double-Booking)
An interviewer cannot be booked for two interviews simultaneously. The booking/rescheduling logic prevents double-bookings at the database level by running date-range overlap checks before updating records:
* **Conflict Condition**: `startTime < existingEndTime && endTime > existingStartTime`
* **Exclusion Handling**: Rescheduling operations verify overlap conflicts excluding the current slot document being adjusted to prevent false positives.
* **Return status**: Returns `409 Conflict` with the specific conflicting candidate's name in the response payload.

### 2. Soft Cancellation Status
Interviews are not hard-deleted when cancelled. Instead, the nested interview slot's `status` attribute is set to `'Cancelled'`. 
* Overlap checks automatically bypass slots marked as `'Cancelled'`.
* This allows recruiters to track cancellation records without blocking calendar availability.

### 3. Cascading Deletion Cleanups
* **Delete Candidate**: Deleting a candidate record cancels all their scheduled interviews.
* **Delete Interviewer**: Deleting an interviewer deletes the interviewer profile and automatically pulls (`$pull`) all scheduled slots referencing their ID from all candidate documents.

---

## Local Setup Guide

### 1. Prerequisites
* Install [Node.js](https://nodejs.org) (v18+ recommended)
* A running [MongoDB](https://www.mongodb.com/) instance (local or Atlas cluster URI)

### 2. Configuration
Create a `.env` file in the root directory:
```env
PORT=4545
MONGO_URI=mongodb://localhost:27017/micro-ats
```

### 3. Dependency Installation
Run the following command at the project root:
```bash
npm install
```

### 4. Code Generation & Local Run
Build routes and start the Express live-reloading development server:
```bash
# Generate Swagger docs & TSOA express routes
npm run tsoa:generate

# Launch live-reload server (nodemon)
npm run start
```
The backend API is now running locally at `http://localhost:4545`.

---

## Swagger API Documentation Guide

TSOA automatically generates the OpenAPI specification based on TypeScript controllers. 

* **Swagger UI Route**: Open `http://localhost:4545/api-docs` in your browser to view and interact with endpoints.
* **Deployed Swagger UI**: Open [https://micro-ats-backend.vercel.app/api-docs](https://micro-ats-backend.vercel.app/api-docs) to view and interact with the deployed API endpoints.
* **OpenAPI Schema location**: The JSON spec file is generated at `swagger.json` at the root of the project.
* **To manually regenerate schemas**:
  ```bash
  npm run tsoa:generate
  ```

---

## Deploying to Vercel

The backend includes a root `vercel.json` config and entry point adaptation to run as Vercel serverless functions.
1. Connect this repository to Vercel.
2. Select the root directory.
3. Configure the environment variables (`MONGO_URI`).
4. Vercel automatically deploys the server.
