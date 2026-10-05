# Muhammad Aqil Khan Portfolio Platform — Production Deployment Guide & Infrastructure Runbook

**Principal**: Muhammad Aqil Khan  
**Discipline**: MERN Stack Developer / Full-Stack Web Developer  
**Status**: Production Infrastructure & Deployment Specification (Stage 14)

---

## 1. Production Architecture Overview

The system runs on a decoupled, production-hardened topology:

```text
                           CUSTOM DOMAIN (DNS)
                       https://aqilkhan.dev (Vercel/Netlify)
                                   │
                                   ▼
                 ┌───────────────────────────────────┐
                 │       PUBLIC PORTFOLIO UI         │
                 │   React 18 / Vite 5 / Tailwind    │
                 └─────────────────┬─────────────────┘
                                   │
                              HTTPS API
                                   │
                                   ▼
                 ┌───────────────────────────────────┐
                 │       PRODUCTION REST API         │
                 │    Node.js 20 / Express (Render)  │
                 │     https://api.aqilkhan.dev      │
                 └─────────┬───────────────┬─────────┘
                           │               │
                           ▼               ▼
                 ┌───────────────────┐   ┌───────────────────┐
                 │   MONGODB ATLAS   │   │ CLOUDINARY / S3   │
                 │  Dedicated Cluster│   │ CDN Media Storage │
                 └───────────────────┘   └───────────────────┘
```

---

## 2. Infrastructure & Hosting Providers

| Component | Recommended Provider | Responsibilities | Justification |
|---|---|---|---|
| **Frontend** | **Vercel** / **Netlify** | Static HTML/CSS/JS delivery, Edge CDN, SPA rewrites, Brotli/Gzip compression | Zero-config SPA rewrites via `vercel.json` / `_redirects`, automated preview branches, global low-latency CDN. |
| **Backend API** | **Render** / **Railway** | Node.js Express server, JWT authentication, rate limiting, MongoDB Mongoose ODM | Native Docker/Node support, automated SSL/TLS termination, automated deploy-on-push, zero-cost scale down or dedicated web service. |
| **Database** | **MongoDB Atlas** | Managed MongoDB replica set, Mongoose schemas, indexes, automated daily snapshots | Official managed cloud database, automated network IP access lists, automated backup retention, zero local DB dependency. |
| **Media Assets & CV** | **Cloudinary** / **AWS S3** | Profile portraits, project screenshots, active PDF CV storage | Offloads media storage from backend container filesystem, CDN optimization, on-the-fly image transformations. |

---

## 3. Environment Variables Specification

### A. Frontend (`client/.env.production`)
*Note: Only public, browser-safe variables are exposed to Vite.*

```bash
VITE_API_URL="https://api.aqilkhan.dev/api/v1"
VITE_PUBLIC_SITE_URL="https://aqilkhan.dev"
```

### B. Backend (`server/.env.production`)
*Configured in Render / Railway Environment Secrets Manager. Never committed to source control.*

```bash
NODE_ENV="production"
PORT=5000
CLIENT_URL="https://aqilkhan.dev"
MONGO_URI="mongodb+srv://<db_user>:<db_password>@cluster0.xxxxx.mongodb.net/aqil_portfolio_prod?retryWrites=true&w=majority"
JWT_SECRET="<generate_secure_random_64_character_hex_secret>"
JWT_EXPIRES_IN="7d"
COOKIE_SECRET="<generate_secure_random_32_character_hex_secret>"
ADMIN_INIT_EMAIL="aqilk4992@gmail.com"
ADMIN_INIT_PASSWORD="<strong_admin_initial_master_password>"
```

---

## 4. Domain & DNS Configuration

Canonical Domain: **`https://aqilkhan.dev`**  
API Subdomain: **`https://api.aqilkhan.dev`**

### DNS Records Table:
| Type | Name / Host | Target / Value | Purpose |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` (or Vercel Anycast IP) | Apex domain to frontend CDN |
| `CNAME` | `www` | `cname.vercel-dns.com.` | Redirect `www` to canonical apex |
| `CNAME` | `api` | `portfolio-server.onrender.com.` | Route API traffic to Node.js backend |
| `TXT` | `@` | `v=spf1 include:... ~all` | Domain verification and anti-spoofing |

---

## 5. Security & Network Policies

1. **HTTPS Enforcement**: All HTTP traffic is permanently redirected to HTTPS with HSTS headers enabled.
2. **CORS Protocol**:
   - Backend `corsOptions` verifies `origin === config.cors.clientUrl` (`https://aqilkhan.dev`).
   - `credentials: true` enables authenticated cookie transmission over HTTPS.
3. **Cookie Attributes (Production)**:
   - `HttpOnly`: true (mitigates XSS token extraction)
   - `Secure`: true (transmitted exclusively over TLS/HTTPS)
   - `SameSite`: `'Strict'` (mitigates CSRF)
   - `Domain`: `.aqilkhan.dev` (allows seamless cross-subdomain API communication)
4. **Rate Limiting**:
   - Auth endpoints: 10 attempts per 15 min per IP.
   - Contact form: 5 inquiries per hour per IP.
   - Global requests: 200 requests per 15 min per IP.

---

## 6. Database Seeding & Production Migration

To initialize a fresh production database with verified portfolio content:

1. Provision MongoDB Atlas Cluster and create database user with read/write access.
2. In MongoDB Atlas Network Access, add `0.0.0.0/0` (or Render outbound IPs) to IP Access List.
3. Execute seed script against the production database URI:
   ```bash
   MONGO_URI="mongodb+srv://user:pass@cluster0.../aqil_portfolio_prod" npm run seed:content
   ```
4. This populates:
   - Profile: Muhammad Aqil Khan (`aqilk4992@gmail.com`, `+92 342 5730066`, Charsadda)
   - Education: B.S. Computer Science (2022–2026), GPGC Charsadda
   - Verified Projects: Atmosfera, NexCart, MERN Portfolio CMS
   - Skills & Active CV (`Muhammad_Aqil_Khan_CV.pdf`)

---

## 7. CI/CD Workflow (`.github/workflows/deploy.yml`)

1. **Trigger**: Push or Pull Request to `main`.
2. **Steps**:
   - `npm install` across both workspaces.
   - Run `npm run build:client` to verify 0 bundling or rollup errors.
   - Verify server startup syntax via clean ESM dynamic import check.
3. **Automated Deploy**: Vercel and Render automatically deploy upon green commits to `main`.

---

## 8. Rollback Procedures

### Frontend Rollback
1. Open Vercel / Netlify dashboard.
2. Navigate to **Deployments**.
3. Locate previous stable deployment and click **Promote to Production** (takes < 5 seconds).

### Backend Rollback
1. Open Render / Railway dashboard.
2. Navigate to **Events / Deploy History**.
3. Select previous green commit and trigger **Redeploy**.

### Database Backup & Restore (Atlas)
1. In MongoDB Atlas, navigate to **Backup** tab.
2. Click **Restore Backup** > select snapshot point > restore to cluster.
