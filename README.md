# 🚀 Stacklet Landing Page

A modern, responsive landing page for **Stacklet** — a fictional no-code internal tools builder for operations teams.

**Live Demo:** [https://sprint-day1.vercel.app](https://sprint-day1.vercel.app)

---

## ✨ Features

- **Sticky Navigation** with smooth anchor links
- **Hero Section** with gradient background and CTA buttons
- **Features Grid** showcasing 6 product capabilities
- **Pricing Section** with 3 tiers (Starter, Growth, Scale)
- **FAQ Section** addressing common questions
- **Waitlist Form** with Supabase integration
- **Fully Responsive** design (mobile, tablet, desktop)
- **Dark Theme** with modern UI/UX

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Fast build tool
- **Tailwind CSS v4** — Utility-first styling
- **shadcn/ui** design system
- **Supabase** — Backend & database
- **Lucide React** — Icons
- **Vercel** — Deployment

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Madko111/Sprint-Day1.git
cd Sprint-Day1
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Copy `.env.example` to `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Supabase Setup

Create a `waitlist` table in your Supabase project:

```sql
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_anon_insert" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

---

## 📝 Project Structure

```
├── src/
│   ├── App.tsx           # Main component
│   ├── main.tsx          # Entry point
│   ├── styles.css        # Tailwind base styles
│   ├── supabaseClient.ts # Supabase configuration
│   └── lib/
│       └── utils.ts      # Utility functions (cn)
├── public/               # Static assets
├── .env.example          # Environment variables template
├── BUSINESS.md           # Business context & positioning
└── README.md             # This file
```

---

## 🎨 Design Highlights

- **Color Palette:**
  - Primary: Purple (`#7c3aed`)
  - Secondary: Mint (`#14b8a6`)
  - Accent: Orange (`#f97316`)
  - Background: Dark Navy (`#0a0e27`)

- **Typography:** Inter font family
- **Animations:** Hover effects with scale & shadow transitions
- **Accessibility:** WCAG compliant contrast ratios

---

## 📄 License

MIT License - feel free to use this project for learning or portfolio purposes.

---

## 👤 Author

Created by [Madko111](https://github.com/Madko111)

---

## 🙏 Acknowledgments

- Design inspired by modern SaaS landing pages
- Built as part of Sprint Day 1 challenge
