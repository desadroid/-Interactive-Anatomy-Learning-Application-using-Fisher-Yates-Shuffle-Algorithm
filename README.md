# AnatoMediaApp 🩺

AnatoMediaApp adalah aplikasi *mobile* pembelajaran anatomi interaktif berbasis **React Native** & **Expo**, dirancang khusus untuk calon dokter dan mahasiswa kedokteran. Aplikasi ini menyediakan pengalaman belajar yang mendalam melalui visual interaktif, kamus medis, kartu flash pintar, serta sistem evaluasi kuis dinamis yang menantang.

## ✨ Fitur Utama

1. **🗺️ Atlas Visual Interaktif (Hotspot Map)**
   Ketuk langsung bagian spesifik dari organ tubuh pada gambar! Aplikasi akan langsung bereaksi dengan memperbesar titik (*hotspot*), menampilkan nama Latin, fungsi medis di *Dashboard HUD*, dan melafalkan terminologinya secara otomatis menggunakan teknologi *Text-to-Speech*.

2. **📚 Kamus Medis & Kartu Flash Pintar**
   Akses ratusan istilah anatomi luring (*offline*). Ketuk salah satu istilah medis di daftar kamus untuk langsung berteleportasi ke dalam modul **Kartu Flash**, yang menampilkan dua sisi (Nama Umum & Nama Medis Latin).

3. **🏆 Kuis Anatomi (3 Level Kesulitan)**
   Uji kemampuan hafalan Anda dengan 50 bank soal interaktif berbatas waktu:
   - **Mudah**: 30 Detik per soal
   - **Sedang**: 20 Detik per soal
   - **Sulit**: 10 Detik per soal

4. **🔊 Pelafalan Otomatis (*Expo Speech*)**
   Mendukung pelafalan bahasa Latin kedokteran untuk meminimalisir kesalahan penyebutan anatomi tubuh.

5. **📱 UI/UX Premium & Responsif**
   Antarmuka elegan bernuansa klinis (putih, toska, biru tua) yang aman dari *notch* layar HP (*SafeArea*), dan terskala (*responsive grid*) dengan cantik baik di layar *smartphone* maupun Tablet/iPad.

## 💻 Teknologi yang Digunakan

- **Framework**: React Native
- **Toolchain**: Expo
- **Arsitektur**: Custom MVC (Model-View-Controller) untuk isolasi *state* & memori.
- **Library Tambahan**: `@expo/vector-icons`, `expo-speech`

## 📂 Struktur Direktori Proyek

Proyek ini menggunakan pola MVC (*Model-View-Controller*) untuk menjaga kode agar tetap rapi, mudah dirawat, dan terukur:

```text
AnatoMediaApp/
├── App.js                   # Entry point aplikasi
├── assets/                  # Kumpulan gambar organ & aset luring
├── data/                    # JSON Models (Bank Soal & Istilah Kamus)
└── src/
    ├── controllers/         # Logic & State (useAnatoMedia.js)
    ├── styles/              # Token desain UI CSS (styles.js)
    └── views/               # Komponen antarmuka (UI screens)
```

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

1. Pastikan Anda telah menginstal **Node.js** di komputer Anda.
2. Buka terminal atau Command Prompt pada direktori `AnatoMediaApp`.
3. Instal seluruh dependensi paket:
   ```bash
   npm install
   ```
4. Jalankan *development server* Expo:
   ```bash
   npx expo start
   ```
5. *Scan* kode QR yang muncul menggunakan aplikasi **Expo Go** di HP Android/iOS Anda, atau tekan `a` di terminal untuk menjalankannya di Android Emulator.

---
*Dibuat untuk kemudahan pembelajaran interaktif anatomi & klinis.*
