/* =====================================================================
   VIDEOS.JS — Daftar video "VIDEO DURASI PANJANG"
   =====================================================================

   CARA MENAMBAHKAN VIDEO BARU (PENTING):
   1. Salin link Google Drive video (klik kanan file di Drive > "Bagikan"
      > pastikan akses "Siapa saja yang memiliki link" bisa melihat).
   2. Tempel link itu di field "drive" di bawah.
   3. Tambahkan objek video BARU di PALING ATAS array (tepat di bawah
      baris "const VIDEOS = [") — BUKAN di bawah. Karena website selalu
      menampilkan video sesuai urutan array ini dari atas ke bawah,
      video yang kamu taruh paling atas otomatis jadi video PERTAMA/
      TERBARU yang tampil di website.
   4. Pastikan setiap objek diberi tanda koma "," di akhir kecuali
      objek terakhir dalam array.
   5. "episode" boleh diisi bebas (contoh: "Eps. 24") atau dikosongkan.
   6. "durasi" cukup teks bebas, contoh "18:42" atau "1:02:15".

   CONTOH MENAMBAHKAN VIDEO BARU:

   const VIDEOS = [
     {
       id: "v-2026-08-01-baru",
       judul: "Judul Video Terbaru Kamu",
       episode: "Eps. 25",
       durasi: "22:10",
       drive: "https://drive.google.com/file/d/GANTI_DENGAN_ID_FILE/view"
     },
     ...video-video lama tetap di bawahnya seperti biasa...
   ];

   ===================================================================== */

const VIDEOS = [
  {
    id: "v-2026-08-01-jalan-3",
    judul: "Jalan episode 3",
    episode: "Eps. 3",
    durasi: "",
    drive: "https://drive.google.com/file/d/1_OwDIA3cO-5KMJnkD2JCSXiNYoxiegOG/view?usp=drivesdk"
  },
  {
    id: "v-2026-08-01-mandi-laut",
    judul: "Mandi di laut",
    episode: "Eps. 2",
    durasi: "",
    drive: "https://drive.google.com/file/d/1bLxWP5EroJYHyYPP7LcPuh1jt8JnRZKD/view?usp=drivesdk"
  },
  {
    id: "v-2026-08-01-pantai",
    judul: "Vlog jalan-jalan ke pantai",
    episode: "",
    durasi: "",
    drive: "https://drive.google.com/file/d/1kDy2T4p87Rqu7jwnpMTsbiNvTWsKjhRR/view?usp=drivesdk"
  },
  {
    id: "v-demo-003",
    judul: "Contoh Video — Ganti dengan judul aslimu",
    episode: "Eps. 03",
    durasi: "24:15",
    drive: "https://drive.google.com/file/d/REPLACE_FILE_ID_3/view"
  },
  {
    id: "v-demo-002",
    judul: "Contoh Video — Ganti dengan judul aslimu",
    episode: "Eps. 02",
    durasi: "31:47",
    drive: "https://drive.google.com/file/d/REPLACE_FILE_ID_2/view"
  },
  {
    id: "v-demo-001",
    judul: "Contoh Video — Ganti dengan judul aslimu",
    episode: "Eps. 01",
    durasi: "19:03",
    drive: "https://drive.google.com/file/d/REPLACE_FILE_ID_1/view"
  }
];
