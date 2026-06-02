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
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive a JWT
- `GET /api/users` — list users (requires `Authorization: Bearer <token>`)
- `GET /api/users/:id` — get a user by ID
- `PUT /api/users/:id` — update a user
- `DELETE /api/users/:id` — delete a user

Optional with Docker:

```bash
docker-compose up --build
```

CI status
----------

[![CI](https://github.com/salvadorllamas777-ai/chinosan4323/actions/workflows/ci.yml/badge.svg)](https://github.com/salvadorllamas777-ai/chinosan4323/actions/workflows/ci.yml)
