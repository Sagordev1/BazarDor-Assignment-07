# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার দাম, দামের ওঠানামা এবং বাজারভিত্তিক বিস্তারিত তুলনা।

## ✨ Features
1. **Navbar + Live Price Ticker** — বাংলা তারিখসহ লোগো, active ক্যাটাগরি হাইলাইট, অসীম স্ক্রলিং দামের স্ট্রিপ (hover করলে pause)।
2. **আজ দাম বেড়েছে ▲ / কমেছে ▼** — সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য, সাথে "সব পণ্য" গ্রিড (বাংলা সংখ্যায়)।
3. **ক্যাটাগরি পেজ + Sort** — ডিফল্ট / দাম কম→বেশি / বেশি→কম; বাংলা সংখ্যা parse করে numeric sort।
4. **Protected Product Details** — লগইন ছাড়া ঢুকলে `/signin` এ redirect + toast; min / max / avg ও বাজারভিত্তিক টেবিল।
5. **BetterAuth Authentication** — Email/Password, Google ও GitHub login, toast + inline error।
6. **My Profile + Update Name** — আলাদা route (`/profile/update`) থেকে `updateUser` দিয়ে নাম পরিবর্তন।
7. **Skeleton loaders, 404 পেজ ও fully responsive UI** — mobile / tablet / desktop।

## 🧰 Technologies
Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Better Auth · MongoDB · react-hot-toast · Hind Siliguri font

## 🚀 Run locally
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

## 🔐 Environment variables
`.env.example` দেখুন। OAuth callback URL: `{BETTER_AUTH_URL}/api/auth/callback/google` ও `/api/auth/callback/github`

## ☁️ Deploy (Vercel)
Repo import করে সব env variable বসান (`BETTER_AUTH_URL` ও `NEXT_PUBLIC_APP_URL` = live domain)। Dynamic route (`/category/[slug]`, `/product/[slug]`) refresh করলেও কাজ করে।

## 🔌 API
`https://api.api-store.workers.dev/api/bazardor` (fallback: `https://api.abcz.workers.dev/api/bazardor`) — `/categories`, `/categories/:id`, `/products`, `/products?category=`, `/products/:id`
