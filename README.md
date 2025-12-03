# 🌱 REBOT.IN - Recycle Botol Indonesia

<div align="center">

![REBOT.IN Logo](src/assets/Logo%20Rebot.in.png)

**Platform Daur Ulang Botol Plastik Menjadi GreenCoin**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646cff.svg)](https://vitejs.dev/)
</div>

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Instalasi & Setup](#-instalasi--setup)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Project](#-struktur-project)
- [Database Schema](#-database-schema)
- [Kontribusi](#-kontribusi)
- [License](#-license)

---

## 🎯 Tentang Project

**REBOT.IN** adalah platform web inovatif yang memfasilitasi daur ulang botol plastik menjadi GreenCoin yang dapat ditukarkan dengan uang. Platform ini menghubungkan dua jenis pengguna:

- **👥 Teman Rebot.in**: Individu yang ingin menukar botol plastik menjadi GreenCoin
- **🏢 Mitra Rebot.in**: Pengelola mesin RVM (Reverse Vending Machine) yang mendapatkan komisi

### Tujuan Project
- ♻️ Meningkatkan kesadaran masyarakat tentang pentingnya daur ulang
- 🌍 Mengurangi sampah plastik di Indonesia
- 💰 Memberikan insentif ekonomi untuk kegiatan daur ulang
- 📊 Melacak jejak hijau dan dampak lingkungan setiap pengguna

---

## ✨ Fitur Utama

### Untuk Teman Rebot.in
- 📱 **Dashboard Interaktif** - Pantau GreenCoin dan jejak hijau Anda
- 🔍 **Scan Botol** - Tukar botol melalui mesin RVM dengan QR code
- 💵 **Cairkan GreenCoin** - Tukar GreenCoin menjadi uang di T-Mart
- 📈 **Statistik Hijau** - Lihat kontribusi Anda dalam mengurangi CO₂
- 🗺️ **Peta RVM** - Temukan lokasi mesin RVM terdekat
- 🔗 **Koneksi Mitra** - Hubungkan dengan mitra menggunakan kode mitra

### Untuk Mitra Rebot.in
- 🏭 **Kelola Mesin RVM** - Monitor status, kapasitas, dan lokasi mesin
- 💰 **Komisi GreenCoin** - Dapatkan komisi dari setiap transaksi
- 📊 **Dashboard Mitra** - Statistik detail botol dan berat yang terkumpul
- 👥 **Manajemen Teman** - Lihat teman yang terhubung dengan mesin Anda

### Fitur Umum
- 🔐 **Autentikasi Aman** - Login/Register dengan verifikasi OTP email
- 👁️ **Toggle Password** - Fitur show/hide password
- 🌐 **Responsive Design** - Optimal di semua perangkat
- 🎨 **Modern UI/UX** - Interface yang clean dan user-friendly
- 🔔 **Notifikasi Real-time** - Toast notifications untuk setiap aksi

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Library |
| **TypeScript** | 5.6.2 | Type Safety |
| **Vite** | 5.4.2 | Build Tool & Dev Server |
| **Tailwind CSS** | 3.4.1 | Styling Framework |
| **shadcn/ui** | Latest | UI Components |
| **React Router** | 6.28.0 | Routing |
| **Lucide React** | Latest | Icon Library |

### Backend & Database
| Technology | Purpose |
|------------|---------|
| **Supabase** | Backend as a Service (BaaS) |
| **PostgreSQL** | Database (via Supabase) |
| **Supabase Auth** | Authentication & Authorization |
| **Supabase Storage** | File Storage |

### State Management & Utils
- **React Query** (TanStack Query) - Data fetching & caching
- **Zod** - Schema validation
- **date-fns** - Date manipulation
- **Sonner** - Toast notifications

### Typography
- **Poppins** - Headings & Brand text
- **Inter** - Body text & UI elements

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript linting

---

## 💻 Persyaratan Sistem

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** (versi 18.x atau lebih tinggi) - [Download](https://nodejs.org/)
- **npm** (versi 9.x atau lebih tinggi) atau **bun** (versi 1.x atau lebih tinggi)
- **Git** - [Download](https://git-scm.com/)
- **Browser Modern** (Chrome, Firefox, Safari, atau Edge versi terbaru)
- **Code Editor** (Recommended: VS Code)

### Cek Versi yang Terinstall
```bash
node --version   # Harus v18.x atau lebih tinggi
npm --version    # Harus v9.x atau lebih tinggi
git --version    # Versi terbaru
```

---

## 📦 Instalasi & Setup

### 1. Clone Repository

```bash
# Clone repository dari GitHub
git clone https://github.com/FazarArya/recycle-bottle-rebot-in.git

# Masuk ke direktori project
cd recycle-bottle-rebot-in
```

### 2. Install Dependencies

Pilih salah satu package manager:

**Menggunakan npm:**
```bash
npm install
```

**Menggunakan bun (lebih cepat):**
```bash
bun install
```

### 3. Setup Environment Variables

Buat file `.env` di root directory dan tambahkan konfigurasi Supabase:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Development Settings
VITE_API_URL=http://localhost:5173
```

> **📝 Catatan**: Dapatkan `SUPABASE_URL` dan `SUPABASE_ANON_KEY` dari [Supabase Dashboard](https://supabase.com/dashboard)

### 4. Setup Database

#### A. Setup Supabase Project
1. Buat akun di [Supabase](https://supabase.com/)
2. Buat project baru
3. Copy URL dan Anon Key ke file `.env`

#### B. Jalankan Database Migrations
```bash
# Navigasi ke folder supabase
cd supabase

# Jalankan semua migration files secara berurutan
# Migration files ada di folder supabase/migrations/
```

#### C. Setup Database Tables
Database akan otomatis tersetup dengan struktur berikut:
- `users` - Data pengguna (Teman & Mitra)
- `user_roles` - Role management
- `transactions` - Riwayat transaksi
- `rvm_machines` - Data mesin RVM
- `greencoin_balance` - Saldo GreenCoin

---

## 🚀 Cara Menjalankan

### Development Mode

**Menggunakan npm:**
```bash
npm run dev
```

**Menggunakan bun:**
```bash
bun run dev
```

Aplikasi akan berjalan di: **http://localhost:5173**

### Build untuk Production

```bash
# Build aplikasi
npm run build
# atau
bun run build

# Preview build production
npm run preview
# atau
bun run preview
```

### Linting & Type Checking

```bash
# Jalankan ESLint
npm run lint

# Type check dengan TypeScript
npm run type-check
```

---

## 📁 Struktur Project

```
recycle-bottle-rebot-in/
├── public/                      # Static assets
│   └── robots.txt
├── src/
│   ├── assets/                  # Images, logos, icons
│   │   ├── Logo Rebot.in.png
│   │   ├── Logo Botol Auth.png
│   │   └── ...
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── teman/               # Teman-specific components
│   │   │   ├── ScanBottleModal.tsx
│   │   │   └── BottleScannedNotification.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Navbar.tsx
│   │   └── UserTypes.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.tsx          # Authentication hook
│   │   ├── useUserData.tsx      # User data fetching
│   │   ├── useBottleScanner.tsx # Bottle scanning logic
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/            # External integrations
│   │   └── supabase/            # Supabase client & types
│   ├── lib/                     # Utility functions
│   │   └── utils.ts
│   ├── pages/                   # Page components
│   │   ├── auth/                # Authentication pages
│   │   │   ├── TemanAuth.tsx
│   │   │   └── MitraAuth.tsx
│   │   ├── teman/               # Teman dashboard pages
│   │   │   └── Dashboard.tsx
│   │   ├── mitra/               # Mitra dashboard pages
│   │   │   └── Dashboard.tsx
│   │   ├── Index.tsx            # Landing page
│   │   └── NotFound.tsx         # 404 page
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Global styles
│   └── vite-env.d.ts            # Vite type definitions
├── supabase/                    # Supabase configuration
│   ├── config.toml
│   └── migrations/              # Database migrations
├── .env                         # Environment variables (create this)
├── components.json              # shadcn/ui config
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── postcss.config.js            # PostCSS config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
└── vite.config.ts               # Vite config
```

---

## 🗄️ Database Schema

### Tabel Utama

#### `users`
```sql
- id (uuid, primary key)
- email (text, unique)
- nama (text)
- no_hp (text)
- created_at (timestamp)
```

#### `user_roles`
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key)
- role (text) -- 'teman' atau 'mitra'
- kode_mitra (text, nullable) -- Untuk mitra
```

#### `transactions`
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key)
- jumlah_botol (integer)
- greencoin_earned (integer)
- rvm_machine_id (uuid, foreign key)
- created_at (timestamp)
```

#### `rvm_machines`
```sql
- id (uuid, primary key)
- kode_mesin (text, unique)
- lokasi (text)
- status (text) -- 'online', 'offline', 'penuh'
- kapasitas_current (integer)
- kapasitas_max (integer)
- mitra_id (uuid, foreign key)
```

---

## 🤝 Kontribusi

Kontribusi sangat kami apresiasi! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Clone** fork Anda
```bash
git clone https://github.com/YOUR_USERNAME/recycle-bottle-rebot-in.git
```
3. **Buat branch** untuk fitur baru
```bash
git checkout -b feature/AmazingFeature
```
4. **Commit** perubahan Anda
```bash
git commit -m 'Add some AmazingFeature'
```
5. **Push** ke branch
```bash
git push origin feature/AmazingFeature
```
6. **Buat Pull Request**

### Guidelines
- Gunakan TypeScript untuk semua kode baru
- Ikuti struktur folder yang ada
- Tambahkan comments untuk logika kompleks
- Test fitur sebelum push
- Update dokumentasi jika perlu

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)
- [Lucide Icons](https://lucide.dev/)
- [Lovable](https://lovable.dev/)

---

<div align="center">

**Dibuat dengan ❤️ untuk Indonesia yang lebih hijau 🌱**

[⬆ Kembali ke atas](#-rebotin---recycle-botol-indonesia)

</div>
