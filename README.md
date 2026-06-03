# proyecto2 — Node + MongoDB scaffold

Repo: https://github.com/salvadorllamas777-ai/chinosan4323

Minimal scaffold with Express and Mongoose.

Quick start:

```bash
npm install
cp .env.example .env
# adjust .env if needed
npm run dev
```

Endpoints:
- `GET /health` — simple health check

Authentication & user CRUD:
- `POST /api/auth/register` — register a new user and receive a verification email
- `GET /api/auth/verify?token=<token>` — verify email
- `POST /api/auth/login` — login and receive a JWT (only after email is verified)
- `GET /api/users` — list users (requires `Authorization: Bearer <token>`, admin only)
- `GET /api/users/:id` — get a user by ID
- `PUT /api/users/:id` — update a user
- `DELETE /api/users/:id` — delete a user
- `GET /api/admin/users` — list all users (admin only)
- `PUT /api/admin/users/:id/role` — change user role (admin only)

Deployment from GitHub:
- `/.github/workflows/deploy.yml` builds the Docker image and pushes it to GitHub Container Registry on `main`

Deploy to Render (free):
1. Create a free account on [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service and select this repository
4. Render will auto-detect `render.yaml` and deploy
5. Set environment variables in Render dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `APP_URL` (your Render app URL)
   - `EMAIL_*` (email service credentials)

Optional with Docker:

```bash
docker-compose up --build
```

CI status
----------

[![CI](https://github.com/salvadorllamas777-ai/chinosan4323/actions/workflows/ci.yml/badge.svg)](https://github.com/salvadorllamas777-ai/chinosan4323/actions/workflows/ci.yml)
