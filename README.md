# 📁 Malfy

**Live demo:** https://malfy.vercel.app

Malfy is a cloud file storage app in the spirit of Google Drive, built with a simpler, more focused interface. Sign in with a one-time email code, upload files, and manage them from a clean dashboard.

---

## ✨ Features

- **Passwordless login**: sign up and sign in with a one-time code sent to your email, no password to manage.
- **File upload**: drag-and-drop file uploads stored in Appwrite.
- **Browse & organize**: view files by type, search by name, and sort by date, name, or size.
- **File actions**: rename, share with another user by email, download, and delete.
- **Storage usage chart**: see how much space each file type (images, documents, video, audio, other) is using, out of your available quota.
- **Responsive UI**: a sidebar on desktop and a mobile-friendly navigation menu, built with Tailwind CSS and shadcn/ui components.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router) with TypeScript
- **Backend/Storage**: Appwrite (authentication, database, file storage)
- **UI**: Tailwind CSS, shadcn/ui (Radix primitives), Lucide icons
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts

---

## 🏃 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file with your Appwrite project credentials (endpoint, project ID, API key, database ID, storage bucket ID, and collection IDs). See `src/lib/appwrite/config.ts` for the exact variable names the app expects.

### 3. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🚀 Deployment

Deployed on [Vercel](https://vercel.com). Environment variables need to be configured in the Vercel project settings to match your Appwrite instance.
