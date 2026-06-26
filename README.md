# 📚 LibraryHub — Frontend

A modern, single-page **Library Management System** UI — a book-rental platform
with two role-based portals (readers & admins), a complete authentication
experience, and a custom **"Aurora Glass"** design system.

This is the SPA half of a two-part app. The Express/MongoDB API lives in
`../library-backend`.

---

## 🧰 Tech Stack

| Area | Technology |
|------|-----------|
| Framework | **React 19** |
| Build tool | **Vite 8** + **PWA** (`vite-plugin-pwa`, autoUpdate) |
| Styling | **Tailwind CSS 4** (`@tailwindcss/vite`) — custom Aurora Glass theme |
| Data fetching | **TanStack React Query** + **Axios** |
| Routing | **react-router-dom 7** |
| Forms & validation | **Formik** + **Yup** |
| Social login | `@react-oauth/google` + Facebook JS SDK |
| Notifications | **react-toastify** |
| Tooling | **ESLint 10** (flat config) + **Prettier** |

---

## 🎨 Aurora Glass theme

A bespoke dark theme: a midnight base (`#0b0b14`) with **iridescent violet→cyan
gradients**, **frosted-glass surfaces**, soft glows, and an animated aurora
background.

- **Design tokens** live in `src/index.css` (`@theme` — colors, fonts,
  breakpoints) — a single Tailwind root.
- **Reusable utilities**: `.glass` / `.glass-strong`, `.aurora-field`,
  `.text-gradient`, `.bg-aurora`, and motion (`.animate-rise`, `.animate-float`).
- **UI primitives** in `src/components/ui/` — `GlassCard`, `StatCard`, `Badge`,
  `PageHeader`, `EmptyState`, `Avatar`, `AuthWrapper`.

---

## 🏛️ Architecture

### Provider tree
```
GoogleOAuthProvider → QueryClientProvider → BrowserRouter → AuthProvider → ModalProvider → App
```

### Role-based routing (RBAC)
A **single signup** feeds the app. `AppRoutes` shows a `SplashScreen` while the
session loads, then renders `AuthLayout` (unauthenticated) or `HomeLayout`
(authenticated). `HomeLayout` branches the **entire route tree on `user.role`** —
admins get the admin portal, everyone else gets the reader portal — all wrapped
in a shared `AppShell` (sidebar + topbar).

### Barrel exports
Components are grouped and re-exported through barrels so consumers import from a
single path:
```js
import { GlassCard, PageHeader, Modal, SocialAuth } from "@/components";
```
Folders: `common/` (shared), `ui/` (primitives), `layout/` (AppShell), `profile/`
(profile sections). Single-use components (e.g. `Sidebar`, `Topbar`) are imported
directly rather than barreled.

### API layer (`src/api/`)
A single Axios instance composed from per-domain factories (`createAuthApi`,
`createUserApi`, `createCommonApi`). A request interceptor injects the `Bearer`
token from `localStorage`; a response interceptor unwraps backend error messages
into a rejected string. Add endpoints by extending the relevant `*Routes.js`
factory.

### Contexts
- **`AuthContext`** — JWT in `localStorage`, exposes
  `{ isAuthenticated, user, preferences, login, logout, refreshProfile }`.
  `refreshProfile()` silently re-pulls profile data (no splash flash) after edits.
- **`ModalContext`** — a global `{ type, data }` modal state with
  `openModal(type, data)` / `closeModal()`, driving the portal-based `Modal`.

### Path aliases
`@/...` (configured in `vite.config.js` + `jsconfig.json`): `@/api`,
`@/components`, `@/context`, `@/constants`, `@/hooks`, `@/layout`, `@/pages`,
`@/utils`.

---

## 🔐 Authentication experience

Every auth screen shares the `AuthWrapper` (immersive aurora brand panel + form
card). The full flow:

| Screen | Route | What it does |
|--------|-------|--------------|
| **Login** | `/login` | Email/password; routes to 2FA or verify-email when needed |
| **Signup** | `/signup` | Registration → redirects to OTP verification |
| **Verify OTP** | `/verify-otp` | 6-digit email verification + **resend** (60s cooldown) |
| **Forgot password** | `/forgot-password` | Request a reset link |
| **Reset password** | `/reset-password/:token` | Set a new password |
| **2FA challenge** | `/two-factor` | Enter the authenticator code (pending-token flow) |

### Social sign-in
The shared **`SocialAuth`** component (on Login & Signup) renders the Google
button (`@react-oauth/google`, returns an `id_token`) and a Facebook button (lazy
`utils/facebook.js` SDK loader, returns an access token), posts to
`/auth/social`, and handles the **link-confirmation dialog** when the email
already exists.

### Smart redirects
The login flow reacts to the backend's response shape:
- `twoFactorRequired` → navigate to `/two-factor` with the pending token.
- `linkRequired` (social) → open the link-confirmation `Modal`.
- "verify your email" → route to `/verify-otp` so the user can resend & verify.

---

## ✨ Features

- **Reader & Admin portals** — role-aware sidebar/topbar shell with distinct
  navigation and dashboards.
- **Full profile screen** — identity card with **avatar upload/remove**, editable
  personal info (name, bio, phone, alt email, DOB, gender, notification
  toggles), **change password**, **two-factor auth** (QR enable / disable), and
  **connected accounts** (linked providers).
- **Two-factor auth UI** — scan-the-QR enable modal, disable modal, and the login
  challenge screen.
- **Reusable `Modal`** — portal-rendered (escapes transformed ancestors), themed,
  with ESC / outside-click / scroll-lock, driven by `ModalContext`.
- **`useUpload` hook** (`@/hooks`) — one place for `/common/upload`
  (FormData + response unwrapping); returns `upload` / `uploadAsync`.
- **Custom `Input`** — one component for text, password (show/hide), textarea,
  checkbox, **select**, and **date**, with Formik-friendly props.
- **PWA** — installable, auto-updating service worker.

---

## 📂 Project structure

```
library-fronend/
├── src/
│   ├── api/           axios instance + per-domain route factories
│   ├── components/
│   │   ├── common/    Input, PrimaryButton, Modal, SocialAuth, SplashScreen, Sidebar, Topbar, AuroraBackground
│   │   ├── ui/        GlassCard, StatCard, Badge, PageHeader, EmptyState, Avatar, AuthWrapper
│   │   ├── layout/    AppShell
│   │   └── profile/   PersonalInfo, Security, TwoFactor, ConnectedAccounts
│   ├── constants/     baseURL, social client ids, navigation config
│   ├── context/       AuthContext, ModalContext
│   ├── hooks/         useUpload
│   ├── layout/        AuthLayout (router), HomeLayout (RBAC router)
│   ├── pages/         Auth/*, User/*, Admin/*, Profile/*
│   ├── utils/         helper, facebook (SDK loader)
│   ├── App.jsx        provider tree
│   └── index.css      Aurora Glass theme (tokens + utilities)
```

---

## ⚙️ Environment variables

Create a `.env` in `library-fronend/`:

```bash
VITE_APP_ENV=development                # "development" → backend at localhost:5001
VITE_GOOGLE_CLIENT_ID=<google client id>.apps.googleusercontent.com
VITE_FACEBOOK_APP_ID=<facebook app id>
```

> These IDs are **public** (they ship in browser code). The Google/Facebook
> *secrets* stay only in the backend. Vite reads `.env` at startup — restart the
> dev server after changing it.

---

## 🚀 Getting started

```bash
cd library-fronend
npm install
# create .env (see above)
npm run dev        # Vite dev server on http://localhost:5173
```

> The backend must be running on **port 5001** (the dev API base URL is
> hardcoded in `src/constants/index.js`).

### Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server (port 5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` / `format:check` | Prettier write / check |

---

_Built by Aarish_
