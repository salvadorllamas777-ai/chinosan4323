# Security Best Practices

## Secrets Management

1. **Never commit secrets** to git:
   - Use `.env.example` with placeholders
   - `.env` is in `.gitignore`
   - Use CI/CD secrets (GitHub Actions `secrets`)

2. **Environment variables** in production:
   - Set via hosting provider dashboard (Render, Vercel, etc.)
   - Or use Docker secrets for Kubernetes
   - Rotate secrets regularly

## Authentication

1. **JWT tokens**:
   - Expire after 1 hour (configurable in `src/controllers/authController.js`)
   - Store securely on client (not in localStorage if possible)
   - Use HTTPS only

2. **Passwords**:
   - Hashed with bcryptjs (10 rounds of salt)
   - Minimum 6 characters (enforce in production with 12+)
   - Never transmitted in logs or response bodies

3. **Email verification**:
   - Tokens expire (implement in production)
   - One-time use only (current implementation)

## Database Security

1. **MongoDB**:
   - Use MongoDB Atlas with IP whitelist
   - Enable authentication (user/password)
   - Encrypt connections (TLS)
   - Enable field-level encryption for sensitive data

2. **Backup**:
   - Enable automated backups (Atlas does this free)
   - Test restore procedures

## API Security

1. **Rate limiting**:
   - Add `express-rate-limit` to prevent brute force
   - Example: max 5 login attempts per 15 minutes

2. **HTTPS**:
   - Always use in production
   - Hosting providers (Render, Vercel) provide free SSL/TLS

3. **CORS**:
   - Configure correctly in `src/app.js` for production domains
   - Restrict to known origins only

4. **Input validation**:
   - Already implemented with `express-validator`
   - Add schema validation for complex requests

## Admin Panel

1. **Protect admin routes**:
   - Already protected with `admin` middleware
   - Add IP whitelist if internal use
   - Consider requiring 2FA for production

2. **Audit logs**:
   - Log all admin actions (role changes, user deletions)
   - Store in separate collection

## Regular Maintenance

1. **Dependency updates**:
   ```bash
   npm audit
   npm audit fix
   npm outdated
   npm update
   ```

2. **Monitoring**:
   - Set up error tracking (Sentry, Rollbar)
   - Monitor performance (New Relic, DataDog)
   - Alert on failures

3. **Testing**:
   - Run `npm test` before each deployment
   - Add integration tests with real database
   - Load testing for production

## Deployment Checklist

- [ ] All secrets set in hosting provider
- [ ] Database backups enabled
- [ ] HTTPS/SSL configured
- [ ] Email service tested
- [ ] Logging configured
- [ ] Error tracking set up
- [ ] Monitoring enabled
- [ ] Rate limiting configured
- [ ] CORS configured for production domains
- [ ] Admin credentials rotated
- [ ] Database permissions reviewed
