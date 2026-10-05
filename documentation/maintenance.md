# Muhammad Aqil Khan Portfolio Platform — Maintenance, Monitoring & Operations Runbook

---

## 1. Routine Maintenance Schedule

### Monthly Maintenance (15–20 minutes)
1. **Health Verification**: Send a GET request to `https://api.aqilkhan.dev/api/v1/health`. Ensure status is `healthy`.
2. **Review Inquiries**: Check `/admin/messages` and archive or delete resolved recruiter leads.
3. **Database Snapshot Check**: In MongoDB Atlas, verify that automated daily cloud snapshots are succeeding without errors.
4. **Link Audit**: Confirm verified live demo URLs are active:
   - Atmosfera: `https://atmosfera-pied.vercel.app/`
   - NexCart: `https://nex-cart-red.vercel.app/`

### Quarterly Maintenance (30–45 minutes)
1. **Dependency Audit**: Run `npm audit` across client and server. Update any high-severity security vulnerabilities.
2. **Review Technical Proficiencies**: Check `/admin/skills` and update or add new libraries, frameworks, or tools learned.
3. **Active CV Review**: If you have completed new projects or coursework in your B.S. CS program (2022–2026), upload and activate an updated PDF CV version in `/admin/cv`.

---

## 2. Health Monitoring & Logs Inspection

- **API Liveness**: `GET /api/v1/health` returns:
  ```json
  {
    "success": true,
    "data": {
      "status": "healthy",
      "version": "1.0.0",
      "environment": "production"
    }
  }
  ```
- **Server Logs (Render / Railway)**:
  - Open service dashboard > **Logs**.
  - Monitor for repeated `401 Unauthorized` (brute-force attempts handled by rate limiting) or `500 Server Error`.
  - Sensitive parameters (passwords, JWTs, cookie secrets) are strictly excluded from logging.

---

## 3. Secret Rotation Procedures

If credentials ever need to be rotated:
1. **JWT Secret (`JWT_SECRET`)**:
   - Generate a new 64-character random string:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - Update in Render environment settings.
   - *Impact*: Automatically invalidates all active admin sessions; you will simply log in again.
2. **MongoDB Connection String (`MONGO_URI`)**:
   - In MongoDB Atlas: **Database Access** > Change password for the database user.
   - Update `MONGO_URI` in Render environment settings > Redeploy.
