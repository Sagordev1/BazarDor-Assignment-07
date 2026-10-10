<div align="center">

# 🛒 বাজার দর (BazarDor)

### প্রয়োজনীয় পণ্যের দাম এক নজরে

[![Live Demo](https://img.shields.io/badge/Live-Demo-05893e?style=for-the-badge&logo=vercel&logoColor=white)](https://bazar-dor-assignment-07.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-1d271f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sagordev1/BazarDor-Assignment-07)

</div>

---

## 📖 Description

**বাজার দর (BazarDor)** একটি বাংলা বাজারদর ট্র্যাকার ওয়েব অ্যাপ। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, দামের ওঠানামা এবং বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এক জায়গায় দেখা যায়। পুরো অ্যাপ বাংলা সংখ্যা ও ফন্টে তৈরি এবং মোবাইল, ট্যাবলেট ও ডেস্কটপে সমানভাবে কাজ করে।

---

## 🧰 Technologies Used

| | Technology |
|---|---|
| ⚛️ **Framework** | Next.js (App Router) |
| 🟦 **Language** | TypeScript |
| 🎨 **Styling** | Tailwind CSS |
| 🔐 **Authentication** | Better Auth (Email/Password, Google, GitHub) |
| 🍃 **Database** | MongoDB Atlas |
| 🔔 **Notifications** | react-hot-toast |
| ☁️ **Deployment** | Vercel |

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


### 3. Run
```bash
npm run dev
```
http://localhost:3000 

### 4. Production build
```bash
npm run build
npm start
```

## ✨ Key Features

| # | Feature | Details |
|---|---|---|
| 1 | 📈 **Live Price Ticker** | অসীম স্ক্রলিং দামের স্ট্রিপ, সাথে বাংলা তারিখসহ নেভিগেশন ও active ক্যাটাগরি হাইলাইট |
| 2 | 🔺🔻 **দাম বেড়েছে / কমেছে** | সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য, বাংলা সংখ্যায় দাম ও পরিবর্তনের badge |
| 3 | 🗂️ **Category Page + Sort** | দাম অনুযায়ী সাজানো (কম→বেশি, বেশি→কম), বাংলা সংখ্যা সঠিকভাবে numeric sort হয় |
| 4 | 🔒 **Protected Product Details** | লগইন করলে বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দামের বিস্তারিত দেখা যায় |
| 5 | 👤 **Auth & Profile Update** | Email/Password, Google ও GitHub login এবং প্রোফাইল থেকে নাম আপডেট |

---
---

## 👨‍💻 Author

**Sagor Dev** — [@Sagordev1](https://github.com/Sagordev1)

---



<div align="center">

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

</div>
