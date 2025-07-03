# Marketplace App

A modern, full-stack marketplace web application built with [Next.js](https://nextjs.org), [Supabase](https://supabase.com), and [Tailwind CSS](https://tailwindcss.com).

**Live Demo:** [https://marketplace-app-ten.vercel.app](https://marketplace-app-ten.vercel.app)

---

## Features

- **Create Listings:** Users can post items for sale with images, categories, price, and location.
- **Browse & Search:** Responsive grid/listing view with category tabs and instant search.
- **Listing Detail:** Dedicated page for each item with image, full info, and seller contact.
- **Message Seller:** Buyers can send messages to sellers; messages are stored in Supabase and trigger an email notification.
- **Image Upload:** Listing images are uploaded and served via Supabase Storage.
- **Modern UI/UX:** Clean design, skeleton loaders, toasts for feedback, and empty states for a seamless experience.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Supabase (Database, Auth, Storage, Edge Functions)
- **Email:** Resend via Supabase Edge Function
- **Deployment:** Vercel

---

## Getting Started

1. **Clone the repo:**

   ```bash
   git clone https://github.com/AEG14/marketplace-app.git
   cd marketplace-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   - Copy `.env.local.example` to `.env.local` and fill in your Supabase project credentials.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Project Structure

- `src/app/` — Next.js App Router pages
- `src/components/marketplace/` — Marketplace UI components (ProductGrid, ProductCard, CreateListingForm, etc.)
- `src/components/ui/` — Reusable UI components (Button, etc.)
- `src/lib/` — Utility files (Supabase client, categories, etc.)

---

## Database Schema

- **listings:** Stores all marketplace items (title, description, price, category, seller_email, image_url, etc.)
- **messages:** Stores messages sent from buyers to sellers.
- **Supabase Storage:** For listing images.

---

## Email Messaging

- When a buyer sends a message, it is stored in Supabase and an email is sent to the seller using a Supabase Edge Function and Resend.

---

## Customization

- **Categories:** Edit `src/lib/categories.ts` to add or change marketplace categories.
- **Styling:** Uses Tailwind CSS for rapid UI changes.
- **Edge Functions:** See `supabase/functions/send-email` for email logic.

---

## Demo

Try the live demo:  
👉 [https://marketplace-app-ten.vercel.app](https://marketplace-app-ten.vercel.app)

---

## License

MIT

---
