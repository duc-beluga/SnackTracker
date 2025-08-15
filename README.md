# Wutsdis 🍫🥟🍪

Wutsdis is a snack discovery platform that helps users find, share, and explore snacks from around the world.  
Built with **Next.js**, **Supabase**, and **Shadcn** for the web, plus **Expo React Native** (in progress) for mobile, it combines real-time data, location-based snack search, and gamified contributions.

## 🚀 Features
- **Snack Search & Discovery** – Find snacks by name, type, or location.
- **Snack Upload Form** – Add new snacks with descriptions, images, and location tags.
- **Duplicate Prevention** – Prevents adding the same snack multiple times by allowing location additions to existing snacks.
- **Ranking System** – Earn points and rewards for contributions.
- **Token Rewards** – Gamified experience for active users.
- **Image Moderation** – AWS Rekognition integration for safe content uploads.
- **Real-Time Updates** – Powered by Supabase subscriptions.
- **Responsive UI** – Built with Shadcn UI components for a modern, accessible design.

## 🛠 Tech Stack
**Web App**
- [Next.js](https://nextjs.org/) – Frontend framework
- [Supabase](https://supabase.com/) – Backend (database, auth, storage)
- [Shadcn/UI](https://ui.shadcn.com/) – Component library
- [React Query](https://tanstack.com/query/latest) – Data fetching & caching

**Mobile App**  
_Work in progress – built with Expo React Native, sharing the same Supabase backend as the web app._

**Cloud & Security**
- **AWS Rekognition** – Image moderation
- **Aikido Security** – Vulnerability scanning
- **Sentry** – Error monitoring
- **CI/CD** – Automated deployments
