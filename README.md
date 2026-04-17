# Self-Assessment Karunia Rohani + Supabase

## Isi folder
- `index.html` → halaman assessment
- `styles.css` → styling
- `app.js` → logika pertanyaan, hitung skor, dan simpan ke Supabase
- `supabase-schema.sql` → tabel database dan policy insert

## Langkah pakai

### 1. Buat project Supabase
- Login ke Supabase
- Buat project baru
- Ambil:
  - Project URL
  - anon public key

### 2. Buat tabel database
- Buka SQL Editor di dashboard Supabase
- Jalankan isi file `supabase-schema.sql`

### 3. Hubungkan web app ke Supabase
- Buka file `app.js`
- Ganti:
```js
const SUPABASE_URL = "PASTE_SUPABASE_URL";
const SUPABASE_ANON_KEY = "PASTE_SUPABASE_ANON_KEY";
```

### 4. Jalankan web app
Cara termudah:
- upload file ke Vercel / Netlify / GitHub Pages
- atau jalankan local server sederhana

Contoh local:
- VS Code + extension Live Server
- lalu buka `index.html`

## Struktur skor
App ini mengikuti lembar evaluasi:
- 18 karunia
- masing-masing 5 pertanyaan
- pemetaan nomor otomatis:
  - Administrasi = 1, 19, 37, 55, 73
  - Membedakan Roh = 2, 20, 38, 56, 74
  - ...
  - Kata-kata Hikmat = 18, 36, 54, 72, 90

## Catatan keamanan
Versi awal ini mengizinkan insert dari browser memakai anon key.
Itu normal untuk form publik, selama:
- policy hanya mengizinkan INSERT
- SELECT tidak dibuka ke publik

Kalau nanti Anda ingin:
- dashboard admin
- login admin
- export data
- edit / hapus data
maka tahap berikutnya sebaiknya dibuat:
- halaman admin terpisah
- Supabase Auth
- RLS policy khusus admin
