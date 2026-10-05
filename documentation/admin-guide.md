# Muhammad Aqil Khan Portfolio Platform — Administrator User Manual

**Platform**: Muhammad Aqil Khan — Professional Portfolio Platform  
**Target User**: Muhammad Aqil Khan (Super Administrator)  
**Security Model**: JWT Session (`HttpOnly; Secure; SameSite=Strict`) + Role Guard (`super_admin`)

---

## 1. Accessing the Administration Portal

- **URL**: Navigate directly to `/admin/login` on your portfolio domain.
- **Authentication**:
  1. Enter your administrator email (default: `aqilk4992@gmail.com`).
  2. Enter your secure master password.
  3. Click **Sign In to Dashboard**.
  4. Upon successful handshake, you will be redirected to `/admin/dashboard`.
  5. *Security Note*: Sessions persist securely for 7 days via encrypted cookies. If an unauthenticated visitor attempts to access any `/admin/*` route, they are automatically redirected to the login portal.

---

## 2. Dashboard Overview (`/admin/dashboard`)

The metrics hub provides real-time counts across the platform:
- **Total Published Projects**: Active case studies visible to the public.
- **Draft Projects**: Private projects under authoring.
- **Technical Skills**: Total categorized proficiencies in database.
- **Active Curriculum Vitae**: Shows current active CV file version.
- **Inquiry Inbox**: Unread contact form submissions from recruiters or prospective clients.

---

## 3. Managing Projects (`/admin/projects`)

### A. Creating a New Project
1. Navigate to `/admin/projects/new`.
2. Fill in the required fields:
   - **Title**: Project name (e.g. `Atmosfera`).
   - **Category**: Select `Full-Stack`, `Frontend`, `Backend & API`, etc.
   - **Summary**: Concise 1–2 sentence overview for cards.
   - **Description**: In-depth markdown case study narrative.
   - **Technologies**: Tag keywords (e.g. `React`, `Node.js`, `Express`, `MongoDB`).
   - **Features**: Key deliverable bullet points.
   - **Links**: Live Demo URL (`https://...`) and GitHub repository.
   - **Thumbnail & Gallery**: Provide image asset URLs.
   - **Order**: Integer weight (1 = highest priority).
   - **Published**: Toggle on to make live, or leave off for draft.
3. Click **Save Project**.

### B. Publishing / Unpublishing
- In `/admin/projects`, click the **Publish / Unpublish** toggle switch next to any project.
- *Instant Synchronization*: When marked draft, the project immediately vanishes from the public `/projects` grid and `/projects/:slug` responds with a 404 state.

---

## 4. Managing Curriculum Vitae (`/admin/cv`)

1. Navigate to `/admin/cv`.
2. To upload a new resume:
   - Enter the version number (e.g. `v1.3`).
   - Enter the display title (e.g. `Muhammad Aqil Khan - MERN Stack Resume`).
   - Upload the new `.pdf` document.
3. Click **Activate Version**.
4. *Single Active Rule*: Activating this version automatically deactivates all previous CV versions. Public visitors clicking **Download CV** or navigating to `/resume` will immediately receive the new file.

---

## 5. Updating Profile & Contact Information (`/admin/profile`)

1. Navigate to `/admin/profile`.
2. You can update:
   - **Full Name**: `Muhammad Aqil Khan`
   - **Primary Role**: `MERN Stack Developer`
   - **Secondary Role**: `Full-Stack Web Developer`
   - **Location**: `Charsadda, Pakistan`
   - **Verified Channels**: Email (`aqilk4992@gmail.com`), WhatsApp (`+92 342 5730066`), GitHub, and LinkedIn.
   - **Bio & Trajectory Narrative**: Editorial trajectory paragraphs.
3. Click **Save Changes**. Changes rehydrate across Hero, About, Contact, and Footer immediately.

---

## 6. Reviewing Inquiries & Messages (`/admin/messages`)

1. Navigate to `/admin/messages`.
2. Incoming submissions from the public `/contact` form appear in chronological order.
3. Click any message to expand and view the full inquiry, sender email, and timestamp.
4. Mark as **Read** or click **Delete** once handled.
