# Muhammad Aqil Khan Portfolio Platform — REST API & Dynamic Content Specification

This document details the public and administrative API contracts, authentication mechanisms, data models, visibility rules, and synchronization architecture.

---

## 1. Architectural Principles

1. **Single Source of Truth**: MongoDB via the Express API is the authoritative source for editable portfolio content. Client components consume dynamic data through centralized services and hooks (`usePortfolio()`), falling back gracefully to validated defaults if the API is offline.
2. **Strict Public vs. Admin Separation**:
   - **Public Endpoints** (`/api/v1/public/*` and canonical `/api/v1/*` aliases): Strictly read-only, non-sensitive data. Draft projects, unread visitor messages, administrative metadata, and internal user records are never exposed.
   - **Admin Endpoints** (`/api/v1/admin/*`): Protected by JWT authentication (`HttpOnly` cookie or Bearer token) and role verification (`super_admin`).
3. **Optimized Payload Delivery**: Public listing endpoints return lightweight summary models (`title`, `slug`, `thumbnailUrl`, `category`, `technologies`, `summary`), while full case-study narratives and media galleries are reserved for the slug-based detail endpoint (`/api/v1/projects/:slug`).

---

## 2. Public API Endpoints

All public endpoints are accessible without authentication.

### A. Profile Information
- **Endpoint**: `GET /api/v1/profile` (or `GET /api/v1/public/profile`)
- **Description**: Returns verified developer identity, headline roles, bio narrative, coordinates, active CV link, and verified contact channels.
- **Sample Response**:
  ```json
  {
    "success": true,
    "data": {
      "fullName": "Muhammad Aqil Khan",
      "primaryRole": "MERN Stack Developer",
      "secondaryRole": "Full-Stack Web Developer",
      "bio": "Disciplined Full-Stack Web Developer specializing in the MERN stack...",
      "location": "Charsadda, Pakistan",
      "email": "aqilk4992@gmail.com",
      "phone": "+92 342 5730066",
      "whatsapp": "+92 342 5730066",
      "githubUrl": "https://github.com/aqilk66-oss",
      "linkedinUrl": "https://www.linkedin.com/in/muhammad-aqil-khan-a20a87428/",
      "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      "activeCvUrl": "/api/v1/public/cv/download"
    }
  }
  ```

### B. Contact Information
- **Endpoint**: `GET /api/v1/contact-info` (or `GET /api/v1/public/contact-info`)
- **Description**: Returns consolidated communication channels and availability coordinates.

### C. Skills Catalog
- **Endpoint**: `GET /api/v1/skills` (or `GET /api/v1/public/skills`)
- **Query Parameters**: `featured=true` (optional)
- **Description**: Returns published skills sorted by backend priority weight (`order: 1, 2, ...`).
- **Fields**: `id`, `name`, `category`, `icon`, `proficiency`, `description`, `featured`, `order`.

### D. Projects Listing
- **Endpoint**: `GET /api/v1/projects` (or `GET /api/v1/public/projects`)
- **Query Parameters**:
  - `featured=true`: Filters strictly for projects marked as featured.
  - `category`: Filters by project category (e.g. `MERN Stack`, `Web Application`).
- **Visibility Constraint**: Returns **only** items with `isPublished === true`. Drafts are rejected at the query level.
- **Ordering**: Sorted ascending by `order` property defined in the Admin CMS.

### E. Project Case Study Detail
- **Endpoint**: `GET /api/v1/projects/:slug` (or `GET /api/v1/public/projects/:slug`)
- **Description**: Detailed case study including full problem statement, technical architecture, challenges, live URL, and media gallery.
- **Visibility Constraint**: If the project exists in MongoDB but is marked `isPublished === false`, the endpoint responds with `404 Not Found`.

### F. Education & Experience
- **Endpoints**:
  - `GET /api/v1/education`
  - `GET /api/v1/experience`
- **Description**: Chronological academic credentials (B.S. CS 2022–2026, GPGC Charsadda) and verified developmental journey milestones.

### G. Active Curriculum Vitae (CV)
- **Endpoints**:
  - `GET /api/v1/cv`: Metadata for the currently active CV version.
  - `GET /api/v1/cv/download` (or `/api/v1/public/cv/download`): Streams or redirects to the active PDF file with appropriate `Content-Disposition` attachment headers.
- **Multi-Version Rule**: Only the record flagged `isActive: true` is publicly accessible. Inactive or previous drafts are never served.

### H. Contact Form Submission
- **Endpoint**: `POST /api/v1/messages` (or `POST /api/v1/public/messages`)
- **Rate Limit**: Maximum 3 submissions per hour per IP.
- **Payload**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Full-Stack Opportunity",
    "message": "Hello Muhammad, we reviewed your MERN portfolio..."
  }
  ```

---

## 3. Admin CMS Management API

All endpoints require `Authorization: Bearer <token>` or `jwt` session cookie with `super_admin` role.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Authenticate admin, set secure cookie |
| `POST` | `/api/v1/auth/logout` | Revoke token and clear session |
| `GET` | `/api/v1/auth/me` | Fetch active admin session profile |
| `GET` | `/api/v1/admin/dashboard` | Aggregated CMS statistics |
| `PUT` | `/api/v1/admin/profile` | Update profile bio, titles, and social URLs |
| `GET` | `/api/v1/admin/projects` | List all projects (including drafts) |
| `POST` | `/api/v1/admin/projects` | Create new project |
| `PUT` | `/api/v1/admin/projects/:id` | Update project contents and media |
| `PATCH` | `/api/v1/admin/projects/:id/publish` | Toggle `isPublished` boolean flag |
| `DELETE` | `/api/v1/admin/projects/:id` | Remove project permanently |
| `POST` | `/api/v1/admin/cv/upload` | Upload PDF and register new CV version |
| `PATCH` | `/api/v1/admin/cv/:id/activate` | Set active CV (deactivates other versions) |
| `GET` | `/api/v1/admin/messages` | Read visitor inquiries |
| `DELETE` | `/api/v1/admin/messages/:id` | Delete visitor inquiry |

---

## 4. Frontend Data Synchronization & Lifecycle

1. **Provider Initialization**: `PortfolioProvider` mounts in `App.jsx` and executes asynchronous parallel fetching for `profile`, `projects`, `skills`, `education`, `experience`, and `activeCv`.
2. **Instant Paint via Fallback**: To prevent layout shifts or blank screens before backend handshake completes, verified static constants (`VERIFIED_PROFILE`, `PROJECTS_DATA`, etc.) populate context immediately.
3. **Hydration & ScrollTrigger Recalculation**: Once the API response resolves, state updates smoothly, and `ScrollTrigger.refresh()` is scheduled via microtask/raf to recalculate trigger markers without animation hitches.
4. **Cache Invalidation on Admin Action**: Admin dashboard mutations trigger query revalidation (`refetchAll()`), delivering real-time synchronization between management actions and public view.
