# Quick Start Guide

## Local Development

1. **Clone the repo**:
```bash
git clone https://github.com/salvadorllamas777-ai/chinosan4323.git
cd chinosan4323
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment**:
```bash
cp .env.example .env
# Edit .env with your values
```

Required environment variables:
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Any random string (e.g., `openssl rand -hex 32`)
- `APP_URL` — http://localhost:3000 (for local dev)
- Email variables (optional for local testing, required for production)

4. **Start the app**:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Test the API

### 1. Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

You'll receive a message about email verification.

### 2. Verify email
In production, the verification link would be sent via email. For local testing, check the backend logs for the token or modify the email service.

```bash
curl "http://localhost:3000/api/auth/verify?token=YOUR_TOKEN_HERE"
```

### 3. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

You'll receive a JWT token. Copy it.

### 4. Use the token
```bash
TOKEN="your_jwt_token_here"

# Get all users (requires auth)
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/users

# Get a specific user
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/users/1

# Update your profile
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe"}'
```

## Run Tests

```bash
npm test
```

Tests use mocked data (no real database needed).

## Docker

Build and run locally:
```bash
docker build -t proyecto2 .
docker run -p 3000:3000 \
  -e MONGO_URI="mongodb://..." \
  -e JWT_SECRET="secret" \
  proyecto2
```

With docker-compose (includes MongoDB):
```bash
docker-compose up --build
```

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions.

Quick start with Render:
1. Push to GitHub
2. Create account on [render.com](https://render.com)
3. Connect repository
4. Render auto-deploys using `render.yaml`

## Troubleshooting

**Port already in use**:
```bash
export PORT=3001
npm run dev
```

**Can't connect to MongoDB**:
- Check `MONGO_URI` in `.env`
- Verify MongoDB is running or Atlas cluster is accessible
- Check firewall/IP whitelist on MongoDB Atlas

**Email not sending**:
- Verify SMTP credentials in `.env`
- Check email provider settings (allow less secure apps, 2FA, etc.)
- Test with online SMTP tool first

**Verification token not working**:
- Tokens expire after 24 hours (set in code)
- Make sure you're using the exact token from registration response
- In development, check server logs for the token

## Next Steps

- Add rate limiting
- Set up error tracking (Sentry)
- Configure database backups
- Add comprehensive logging
- Set up monitoring
- Add API documentation (Swagger/OpenAPI)
