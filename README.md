# My E-Commerce App

![Platform](https://img.shields.io/badge/platform-Android-green.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.79.4-blue.svg)
![Expo](https://img.shields.io/badge/Expo-53.0.12-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)

Aplikasi e-commerce mobile yang dibangun menggunakan React Native dengan Expo untuk platform Android. Aplikasi ini menyediakan fitur untuk pengelolaan produk dan sistem autentikasi pengguna dengan SQLite.

## 📱 Fitur Utama

- **Sistem Autentikasi**: Login dan registrasi pengguna
- **Halaman Beranda**: Dashboard utama dengan overview aplikasi
- **Eksplorasi Produk**: Jelajahi produk secara acak dan keseluruhan
- **Manajemen Produk**:
  - Tambah produk baru
  - Edit produk yang sudah ada
  - Hapus produk
  - Lihat detail produk
- **Profil Pengguna**: Kelola informasi profil dan produk milik pengguna
- **Database Lokal**: Menggunakan SQLite untuk penyimpanan data offline

## 🛠 Teknologi yang Digunakan

- **React Native** (0.79.4) - Framework untuk pengembangan aplikasi mobile
- **Expo** (53.0.12) - Platform untuk pengembangan dan deployment
- **TypeScript** - Bahasa pemrograman dengan type safety
- **Expo Router** - Navigasi berbasis file system
- **Expo SQLite** - Database lokal
- **AsyncStorage** - Penyimpanan data persistent
- **Expo Image Picker** - Untuk upload gambar produk
- **React Navigation** - Navigasi antar halaman

## 📁 Struktur Proyek

```
MyEcommerceApp/
├── app/                    # Halaman aplikasi (Expo Router)
│   ├── _layout.tsx        # Layout utama
│   ├── login.tsx          # Halaman login
│   ├── register.tsx       # Halaman registrasi
│   ├── (tabs)/           # Tab navigasi
│   │   ├── index.tsx     # Halaman beranda
│   │   ├── explore.tsx   # Eksplorasi produk
│   │   ├── add-product.tsx # Tambah produk
│   │   └── profile.tsx   # Profil pengguna
│   └── product/          # Halaman produk
│       ├── my-product.tsx # Produk saya
│       ├── edit/[id].tsx # Edit produk
│       └── show/[id].tsx # Detail produk
├── components/           # Komponen reusable
├── services/            # Service layer (database, API)
├── contexts/           # React contexts (AuthContext)
├── utils/             # Utility functions
└── constants/         # Konstanta aplikasi
```

## 🚀 Instalasi dan Menjalankan Aplikasi

### Prasyarat

- Node.js (v18 atau lebih baru)
- npm atau yarn
- Expo CLI
- Android Studio (untuk emulator) atau perangkat Android

### Langkah Instalasi

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd MyEcommerceApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Jalankan aplikasi**

   ```bash
   # Untuk development
   npm start

   # Untuk Android
   npm run android

   # Untuk web (preview)
   npm run web
   ```

## 📦 Build APK

Untuk membuat APK yang dapat diinstall di perangkat Android:

```bash
# Build untuk preview
eas build --platform android --profile preview

# Build untuk production
eas build --platform android --profile production
```

> **Catatan**: File APK yang sudah jadi tersedia di direktori root proyek untuk instalasi langsung.

## 🔧 Konfigurasi

### Database

Aplikasi menggunakan SQLite dengan skema yang sudah didefinisikan di `services/database.ts`. Database akan otomatis dibuat saat aplikasi pertama kali dijalankan.

### Autentikasi

Sistem autentikasi menggunakan hash password dengan crypto dan menyimpan session di AsyncStorage.

## 📱 Panduan Penggunaan

### 1. Registrasi/Login

- Buka aplikasi
- Pilih "Register" untuk membuat akun baru atau "Login" untuk masuk
- Isi data yang diperlukan

### 2. Eksplorasi Produk

- Buka tab "Explore" untuk melihat produk secara acak
- Tap pada produk untuk melihat detail

### 3. Menambah Produk

- Buka tab "Add Product"
- Isi informasi produk (nama, harga, deskripsi, gambar)
- Simpan produk

### 4. Mengelola Produk

- Buka tab "Profile" > "My Products"
- Edit atau hapus produk yang sudah dibuat

## 🎨 Tampilan Aplikasi

Aplikasi menggunakan desain modern dengan:

- Dark/Light theme support
- Material Design components
- Smooth animations
- Responsive layout

## 🔒 Keamanan

- Password di-hash menggunakan crypto
- Session management dengan AsyncStorage
- Input validation untuk semua form
- SQL injection protection

## 🐛 Troubleshooting

### Masalah Umum

1. **Metro bundler error**

   ```bash
   npx expo start --clear
   ```

2. **Android build gagal**

   ```bash
   npx expo install --fix
   ```

3. **Database error**
   - Hapus data aplikasi di perangkat
   - Restart aplikasi

## 📝 Scripts Tersedia

- `npm start` - Menjalankan Expo development server
- `npm run android` - Menjalankan di Android emulator/device
- `npm run ios` - Menjalankan di iOS simulator (jika tersedia)
- `npm run web` - Menjalankan di web browser
- `npm run lint` - Menjalankan ESLint

## 🤝 Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

## 👨‍💻 Developer

Dikembangkan dengan ❤️ menggunakan React Native dan Expo

---

**Happy Coding! 🚀**
