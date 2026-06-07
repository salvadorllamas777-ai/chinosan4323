# Production Deployment Guide

## Option 1: Render (Recommended for free tier)

1. Create a free account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Render will auto-detect `render.yaml` and deploy
5. Set these environment variables in Render dashboard:
   - `MONGO_URI` — MongoDB Atlas connection string
   - `JWT_SECRET` — Secret key for JWT tokens
   - `APP_URL` — Your Render app URL (e.g., https://my-app.onrender.com)
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE` — Email SMTP settings
   - `EMAIL_USER`, `EMAIL_PASS` — Email credentials
   - `EMAIL_FROM` — Sender email address

## Option 2: GitHub Container Registry + Docker

The workflow in `.github/workflows/deploy.yml` automatically:
1. Runs tests on push to `main`
2. Builds and pushes Docker image to GHCR
3. Image is available at `ghcr.io/salvadorllamas777-ai/chinosan4323:latest`

Deploy this image to any Docker-compatible hosting:
- AWS ECS, Google Cloud Run, Azure Container Instances, DigitalOcean App Platform, Fly.io, etc.

## Option 3: Traditional Node.js Hosting

Run on any Node.js host:
```bash
git clone https://github.com/salvadorllamas777-ai/chinosan4323.git
cd chinosan4323
npm install
npm start
```

## Database

Use MongoDB Atlas (free tier available):
1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a cluster (free tier)
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
4. Set as `MONGO_URI` environment variable

## Email Service

Use any SMTP provider:
- Gmail (with app-specific password)
- SendGrid, Mailgun, Brevo, AWS SES, etc.

Example for Gmail:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```
