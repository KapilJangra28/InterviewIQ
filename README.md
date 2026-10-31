# InterviewIQ Backend

Node.js / Express API scaffold for the InterviewIQ React frontend.

## Local setup
1. Install Node.js 20 or 22.
2. In this directory run `cd backend && npm install`.
3. Copy `.env.example` to `.env` and set `MONGO_URI` and a long `JWT_SECRET`.
4. Optionally set `GEMINI_API_KEY` to enable Gemini-generated questions and assessment.
5. Run `npm run dev`.

Health check: `GET http://localhost:5000/api/health`.

## Render
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Configure `NODE_ENV=production`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `GEMINI_API_KEY`, and `CLIENT_URL` in Render Environment.
- `CLIENT_URL` is the exact Vercel origin (no trailing slash). For more than one allowed origin, separate origins with commas.

## API routes
- `/api/auth`: student/company registration, login, current user
- `/api/student`: profile, applications, interview history
- `/api/company`: company dashboard and profile
- `/api/jobs`: public job listing/details; company job management and applicants
- `/api/applications`: apply and update application status
- `/api/interviews`: start, view, submit, and list mock interviews
- `/api/ai`: question generation, follow-up, answer evaluation
- `/api/admin`: dashboard, companies, students, job moderation
- `/api/notifications`: authenticated notifications placeholder

## Notes
This backend is a new compatible starter because the repository currently only has the deployment-patch folder, not the original complete frontend or original backend sources. Frontend pages may expect different routes or response fields. Check and align each API call before considering all flows production-ready. Admin user provisioning must be performed securely by creating an admin account directly in MongoDB or via a controlled seed script; public registration never creates an admin. The fallback AI score clearly labels itself as a non-AI baseline when no Gemini key exists.
