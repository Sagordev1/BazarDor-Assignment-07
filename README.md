<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে**

চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, দামের ওঠানামা এবং বাজারভিত্তিক বিস্তারিত তুলনা — এক জায়গায়।

[![Live Demo](https://img.shields.io/badge/Live-Demo-05893e?style=for-the-badge&logo=vercel&logoColor=white)](https://bazar-dor-assignment-07.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-1d271f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sagordev1/BazarDor-Assignment-07)

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-Auth-black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

</div>

---

## 🔗 Links

| | |
|---|---|
| 🌐 **Live Site** | https://bazar-dor-assignment-07.vercel.app |
| 💻 **GitHub Repository** | https://github.com/Sagordev1/BazarDor-Assignment-07 |

---

## 📖 About

**BazarDor (বাজার দর)** একটি বাংলা ভাষার বাজারদর ট্র্যাকার ওয়েব অ্যাপ। ব্যবহারকারী এক নজরে দেখতে পারেন কোন পণ্যের দাম বাড়ল, কোনটির কমল, আর সাইন ইন করে প্রতিটি পণ্যের বাজারভিত্তিক (বিভাগসহ) সর্বনিম্ন, সর্বোচ্চ ও গড় দাম বিস্তারিত দেখতে পারেন। পুরো UI বাংলা সংখ্যা ও ফন্টে তৈরি এবং মোবাইল, ট্যাবলেট ও ডেস্কটপে সমানভাবে কাজ করে।

---

## ✨ Key Features

1. **📈 Live Price Ticker + Smart Navbar** — বাংলা তারিখসহ লোগো, active ক্যাটাগরি হাইলাইট, এবং অসীম স্ক্রলিং দামের স্ট্রিপ (emoji, নাম, টাকা/একক, ▲/▼ %)। Hover করলে ticker থামে।
2. **🔺🔻 আজ দাম বেড়েছে / কমেছে** — সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য আলাদা সেকশনে, সাথে "সব পণ্য" গ্রিড। দাম ও পরিবর্তন বাংলা সংখ্যায়, লাল (বাড়া) / সবুজ (কমা) / ধূসর (অপরিবর্তিত) badge।
3. **🗂️ ক্যাটাগরি পেজ + Sort** — `ডিফল্ট`, `দাম: কম থেকে বেশি`, `দাম: বেশি থেকে কম`। বাংলা সংখ্যাকে number-এ parse করে **numeric sort** করা হয় (string sort নয়)।
4. **🔒 Protected Product Details** — লগইন ছাড়া ঢুকলে `/signin` এ redirect ও toast। ভেতরে মূল্য সারসংক্ষেপ (সর্বনিম্ন / সর্বোচ্চ / গড়) এবং বাজারভিত্তিক টেবিল।
5. **🔐 Better Auth Authentication** — Email/Password, **Google** ও **GitHub** social login, validation, inline error ও toast notification।
6. **👤 My Profile + Update Information** — প্রোফাইল পেজ থেকে আলাদা route (`/profile/update`) এ গিয়ে `authClient.updateUser` দিয়ে নাম আপডেট।
7. **⚡ Skeleton Loaders, 404 ও Fully Responsive UI** — Home / Category / Product পেজে skeleton loading, অবৈধ route এ বন্ধুসুলভ 404, এবং সব স্ক্রিনে কাজ করে।

### Extra highlights
- API fallback: প্রধান API ডাউন থাকলে স্বয়ংক্রিয়ভাবে বিকল্প API ব্যবহার হয়
- API এর ইংরেজি unit (`kg`, `litre`…) বাংলায় (`প্রতি কেজি`, `প্রতি লিটার`…) রূপান্তর
- Server-side route protection (client-এ flash ছাড়া redirect)
- Hero CTA smooth scroll anchor (`#সব-পণ্য`), route change ছাড়াই

---

## 🧰 Tech Stack

| Purpose | Technology |
|---|---|
| Framework | **Next.js** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** (custom components) |
| Authentication | **Better Auth** (Email/Password, Google, GitHub) |
| Database | **MongoDB Atlas** |
| Notifications | **react-hot-toast** |
| Font | **Hind Siliguri** |
| Deployment | **Vercel** |

---

## 🗺️ Routes

| Route | Description | Access |
|---|---|---|
| `/` | Hero, দাম বেড়েছে/কমেছে, সব পণ্য | Public |
| `/category/[slug]` | ক্যাটাগরি অনুযায়ী পণ্য + sort | Public |
| `/product/[slug]` | পণ্যের বিস্তারিত ও বাজারভিত্তিক দাম | 🔒 Login required |
| `/signin` | লগইন | Public |
| `/signup` | নিবন্ধন | Public |
| `/profile` | আমার প্রোফাইল | 🔒 Login required |
| `/profile/update` | নাম আপডেট | 🔒 Login required |
| `*` | 404 পেজ | Public |

---

## 🔌 API

Base URL: `https://api.api-store.workers.dev/api/bazardor`
(Fallback: `https://api.abcz.workers.dev/api/bazardor`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | সব ক্যাটাগরি |
| GET | `/categories/:id` | একটি ক্যাটাগরি |
| GET | `/products` | সব পণ্য |
| GET | `/products?category=chal` | ক্যাটাগরি অনুযায়ী পণ্য |
| GET | `/products/:id` | একটি পণ্য |

---

## 📁 Project Structure

```
├── app/
│   ├── api/auth/[...all]/   # Better Auth handler
│   ├── category/[slug]/     # Category page + loading skeleton
│   ├── product/[slug]/      # Protected product details
│   ├── profile/             # Profile + update route
│   ├── signin/  signup/     # Auth pages
│   ├── layout.tsx           # Navbar, ticker, footer, toaster
│   ├── not-found.tsx        # 404 page
│   └── page.tsx             # Home
├── components/              # Navbar, Ticker, ProductCard, forms, skeletons…
├── lib/
│   ├── auth.ts              # Better Auth server config
│   ├── auth-client.ts       # Better Auth client
│   ├── data.ts              # API client + data normalization
│   ├── format.ts            # Bengali numerals / date helpers
│   └── session.ts           # Protected route helper
└── public/                  # Logo & hero image
```

---

## 🚀 Getting Started

### 1. Clone & install
```bash
git clone https://github.com/Sagordev1/BazarDor-Assignment-07.git
cd BazarDor-Assignment-07
npm install
```

### 2. Environment variables
`.env.example` কপি করে `.env.local` নামে ফাইল বানাও:

```dotenv
# MongoDB
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=bazardor

# Better Auth
BETTER_AUTH_SECRET=a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Social login (optional but needed for Google/GitHub buttons)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

OAuth callback URL:
- Google: `{BETTER_AUTH_URL}/api/auth/callback/google`
- GitHub: `{BETTER_AUTH_URL}/api/auth/callback/github`

### 3. Run
```bash
npm run dev
```
http://localhost:3000 এ ওপেন করো।

### 4. Production build
```bash
npm run build
npm start
```

---

## ☁️ Deployment (Vercel)

1. GitHub repo Vercel এ import করো
2. উপরের সব environment variable যোগ করো (`BETTER_AUTH_URL` ও `NEXT_PUBLIC_APP_URL` = live domain, শেষে `/` ছাড়া)
3. MongoDB Atlas এ **Network Access → `0.0.0.0/0`** allow করো
4. Google / GitHub OAuth app এ live domain এর callback URL যোগ করো
5. Deploy / Redeploy

Dynamic route (`/category/[slug]`, `/product/[slug]`) রিলোড করলেও 404 বা error হয় না।

---

## ✅ Requirements Checklist

- [x] Navbar (লোগো + বাংলা তারিখ, ক্যাটাগরি লিংক, active highlight, auth বাটন / প্রোফাইল মেনু)
- [x] Price ticker (infinite marquee)
- [x] Hero section + `#সব-পণ্য` anchor scroll
- [x] Top 6 risers / fallers + সব পণ্য গ্রিড (responsive)
- [x] Product card (emoji, নাম, একক, বাংলা সংখ্যায় দাম, change badge)
- [x] Protected Product Details (min / max / avg + বাজারভিত্তিক টেবিল)
- [x] Category page (skeleton, sort, empty state)
- [x] Better Auth: Email/Password + Google + GitHub
- [x] Toast: login / signup / logout / validation / protected redirect
- [x] Footer (Figma অনুযায়ী)
- [x] Fully responsive (mobile / tablet / desktop)
- [x] 404 page + skeleton loaders
- [x] **C1** Sort dropdown (বাংলা সংখ্যা সহ numeric sort)
- [x] **C2** README
- [x] **C3** Update Information (`/profile/update`)
- [x] ৮+ meaningful Git commits

---

## 👨‍💻 Author

**Sagor Dev** — [@Sagordev1](https://github.com/Sagordev1)

---

<div align="center">

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

</div>
