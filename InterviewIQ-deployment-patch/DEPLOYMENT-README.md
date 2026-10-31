# InterviewIQ deployment patch

This is a **patch bundle**, not a complete copy of the GitHub repository. Overlay these files onto the matching paths in your existing clone of `KapilJangra28/InterviewIQ`.

## Included changes
- `backend/package.json`: uses a published Google Gen AI SDK (`^2.32.0`) and declares a supported Node runtime range.
- `backend/config/db.js`: requires MongoDB configuration in production and fails clearly if the connection cannot be made.
- `backend/server.js`: awaits MongoDB before listening, supports comma-separated CORS origins, handles Render's assigned port, and adds graceful shutdown.
- `frontend/src/api.js`: shared Axios client that uses `VITE_API_URL` in production and attaches the stored bearer token.
- `backend/.env.example`: production environment variable template.

## Important frontend wiring still required
The current project calls `axios.post('/api/...')` and similar relative URLs in many files. The Vite proxy only works locally. Replace those calls with the new shared `api` client imported from `frontend/src/api.js`. The file `frontend/src/context/AuthContext.REPLACE-NOTE.txt` explains the migration. Do not deploy expecting the API client to work until all API calls are migrated.

## Render backend settings
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Runtime: Node
- Set the environment variables from `.env.example` in Render's Environment tab. Use actual credentials; never commit `.env`.

## Vercel frontend settings
- Root Directory: `frontend`
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment variable: `VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com`

After changing Vercel environment variables, redeploy. Set `CLIENT_URL` in Render to the exact Vercel origin (without a trailing slash). If using preview and production domains, separate them with commas.

## Before production use
1. Run `npm install` in `backend` and `npm install` in `frontend`.
2. Run `npm run build` in `frontend`.
3. Test the backend locally with a real MongoDB database.
4. Review the current authentication fallback in `frontend/src/context/AuthContext.jsx`: it creates mock users after API failure. Remove/disable that behavior for production so failed backend authentication does not appear successful.
5. Verify admin provisioning and secrets separately. Never expose Gemini, MongoDB, JWT, or Cloudinary secrets in Vite variables.

This patch addresses deployment configuration and known startup issues; it does not certify every business-logic route or feature as bug-free. Test registration, login, jobs, applications, file uploads, AI calls, sockets, and interview evaluation after deployment.
