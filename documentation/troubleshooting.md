# Muhammad Aqil Khan Portfolio Platform — Troubleshooting Guide

This guide covers common issues, their root causes, and practical resolutions.

---

## 1. Frontend cannot connect to Backend API
- **Symptoms**: Projects or profile data fallback to offline constants; network requests to `/api/v1/*` fail.
- **Root Causes**:
  1. `VITE_API_URL` environment variable is misconfigured or points to an inactive backend URL.
  2. Backend service is starting up (e.g. Render free tier cold start).
  3. CORS policy rejecting the request.
- **Fix**:
  - Verify that `VITE_API_URL` in `client/.env.production` is set to `https://api.aqilkhan.dev/api/v1` (with no trailing slash after `v1`).
  - In server environment, verify `CLIENT_URL` matches `https://aqilkhan.dev`.

---

## 2. Admin Login returns 401 or Cookie Not Setting
- **Symptoms**: After entering credentials, login redirects back to `/admin/login` or shows unauthorized error.
- **Root Causes**:
  1. Incorrect password or unseeded admin account.
  2. Third-party cookie blocking or non-HTTPS connection in production.
- **Fix**:
  - If running in production, ensure you are accessing via `https://` (the `Secure` cookie flag rejects unencrypted HTTP).
  - Verify `ADMIN_INIT_EMAIL` matches your login email.
  - Reset admin password by updating `ADMIN_INIT_PASSWORD` and triggering server reboot.

---

## 3. Direct Route Refresh Returns 404
- **Symptoms**: Visiting `https://aqilkhan.dev/about` or `/projects/atmosfera` directly in the address bar throws a 404 error from the host.
- **Root Cause**: Web host does not rewrite unknown paths to `index.html`.
- **Fix**:
  - For Vercel: Ensure [`client/vercel.json`](file:///c:/Users/Atticus/OneDrive/Desktop/Web%20Dev/My%20Web%20Navtacc/NAVTTC/Projects/Aqil%20khan%20porfolio%201/client/vercel.json) contains `"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]`.
  - For Netlify: Ensure [`client/public/_redirects`](file:///c:/Users/Atticus/OneDrive/Desktop/Web%20Dev/My%20Web%20Navtacc/NAVTTC/Projects/Aqil%20khan%20porfolio%201/client/public/_redirects) contains `/* /index.html 200`.

---

## 4. WebGL 3D Canvas Shows Static Visual
- **Symptoms**: The floating geometric wireframe in the Hero section displays as a stylized radial monogram instead of 3D rotating geometry.
- **Root Cause**: Device hardware acceleration is unavailable, browser WebGL is disabled, or user enabled `prefers-reduced-motion: reduce`.
- **Fix**:
  - This is an intentional graceful degradation feature! The platform is designed to fall back smoothly to the high-contrast monogram visual rather than crash the page or freeze the browser.
