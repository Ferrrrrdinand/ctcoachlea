# ⏱️ Aesthetic Countdown Timer

Countdown Timer modern dengan background grid biru, tipografi elegan (*Bebas Neue*, *Playfair Display Italic*, *Dancing Script*), logo AOG Church, dan **gelembung kaca 3D dengan animasi mengapung naik ke atas seperti di bawah laut**.

---

## 📁 Struktur Berkas (Modular & Ringan)

Proyek ini telah dipisahkan secara modular agar bersih, ringan, dan mudah dikelola:
- 📄 **[index.html](file:///f:/Pelayanan/COUNTDOWN/index.html)** : Struktur HTML bersih dan semantik.
- 🎨 **[style.css](file:///f:/Pelayanan/COUNTDOWN/style.css)** : Seluruh tata letak, efek 3D, bayangan, tipografi, dan animasi gelembung.
- ⚙️ **[script.js](file:///f:/Pelayanan/COUNTDOWN/script.js)** : Logika penghitung waktu mundur (*timer*), suara lonceng bel audio, generator animasi gelembung bawah laut, upload galeri banyak foto, aturan unik 1 foto 1 gelembung, dan pintasan *keyboard*.
- 🖼️ **`background.jpg`** : Gambar latar grid biru.
- 🏷️ **`logo.png`** : Logo transparan AOG Church.
- 🫧 **`bubble1.jpg` s/d `bubble11.jpg`** : Kumpulan 11 foto kebersamaan unik yang bergiliran mengapung di dalam gelembung.

---

## 🌊 Fitur Animasi Gelembung Naik (Bawah Laut)
Gelembung dapat **melayang naik ke atas secara perlahan dari bawah ke atas layar (*underwater bubbles effect*)** dengan goyangan halus, kilauan kaca 3D, dan bintang berkilau:
1. **Dapat Memuat Banyak Foto Sekaligus (10, 20, 50+ Foto)**:
   - Setiap gelembung yang muncul dari bawah akan menampilkan foto-foto kenangan secara bergiliran (*slide carousel dinamis*).
   - Terapung di sisi kiri dan kanan layar secara proporsional sehingga **tidak menutupi teks Countdown** di tengah.
2. **Pilihan Mode Animasi (Di Panel Kontrol Bawah)**:
   - 🌊 **Gelembung Naik (Bawah Laut)** *(Default)*
   - ✨ **Gelembung Mengambang (Diam)**: Mode statis posisi tetap.

---

## 📸 Cara Memasukkan Banyak Foto Sekaligus

1. Buka `index.html` di browser.
2. Klik tombol **`✏️ EDIT TEKS`** di panel kontrol bawah.
3. Pada kotak biru **"Unggah Banyak Foto Sekaligus (Galeri Gelembung Naik)"**, klik tombol pilih berkas dan pilih puluhan foto dari komputer Anda sekaligus (gunakan `Ctrl + A` atau tahan `Ctrl`).
4. Semua foto tersebut akan otomatis bergiliran naik mengapung di dalam gelembung bawah laut!

---

## 🔒 Aturan: 1 Foto = 1 Gelembung
Setiap gelembung yang sedang mengapung membawa foto unik dan bergantian secara estetik tanpa duplikasi foto yang sama dalam satu tampilan gelembung.

---

## 🎛️ Fitur & Pengaturan (Di Bagian Bawah)

- **Mulai / Jeda / Reset**: Tombol hijau `MULAI`, amber `JEDA`, dan `RESET`.
- **Atur Waktu**: Masukkan Menit & Detik secara manual, lalu klik `TERAPKAN`.
- **Preset Cepat**: Tombol `1M`, `3M`, `5M`, `10M`, `15M`, `+1M`, `+30S`, `-30S`.
- **Pilihan Animasi**: Beralih antara *Gelembung Naik* atau *Gelembung Diam*.
- **Pilihan Background**:
  - 🖼️ **Background Grid Gambar (Default)**: Menggunakan gambar `background.jpg`.
  - 🟩 **Green Screen (#00FF00)**: Untuk Chroma Keying di OBS.
  - ⬛ **Transparent**: Khusus OBS Browser Source (tembus pandang).
  - 🟪 **Magenta Screen**: Alternatif chroma key.
- **Sembunyikan Panel Kontrol**: Tekan tombol **`H`** atau klik tab panel bawah untuk menyembunyikan kontrol.

---

## ⌨️ Shortcut Keyboard

| Tombol | Aksi |
| :--- | :--- |
| **Spasi (Space)** | Mulai / Jeda (Start / Pause) |
| **R** | Reset Waktu |
| **H** | Sembunyikan / Tampilkan Panel Kontrol |
| **F** | Masuk / Keluar Fullscreen (Layar Penuh) |
