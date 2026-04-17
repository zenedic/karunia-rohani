
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// 1) Ganti dengan project Supabase Anda
const SUPABASE_URL = "https://gpznwozgemdycswibgyo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Csx1klgelgJn5ZlAZuWy1A_9fAW35iX";

console.log("window.supabase =", window.supabase);

if (!window.supabase) {
  throw new Error("Library Supabase tidak termuat. Cek tag <script> di index.html");
}

const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2) Daftar karunia berdasarkan lembar evaluasi
const GIFT_NAMES = [
  "Administrasi",
  "Membedakan Roh",
  "Berkhotbah",
  "Menasehati",
  "Iman",
  "Memberi",
  "Menyembuhkan",
  "Menolong",
  "Keramahan",
  "Pendoa Syafaat",
  "Pengetahuan",
  "Kepemimpinan",
  "Kemurahan Hati",
  "Penginjilan",
  "Gembala",
  "Melayani",
  "Guru",
  "Kata-kata Hikmat"
];

// 3) 90 pertanyaan dari dokumen
const QUESTIONS = [
  "Mudah mewakilkan tanggung jawab penting",
  "Dengan jelas melihat perbedaan antara kebenaran dan kesalahan.",
  "Menuntun orang lain mengambil keputusan untuk selamat melalui iman dalam Kristus.",
  "Secara lisan memberi dorongan kepada yang ragu-ragu, susah dan kecewa.",
  "Percaya Allah akan menepati janjiNya, tak peduli apapun keadaan lingkungan.",
  "Mengatur uang dengan baik agar supaya lebih banyak memberikan kepada pekerjaan Tuhan.",
  "Dalam nama Tuhan menyembuhkan penyakit.",
  "Membantu pemimpin utama untuk meringankan tugas penting mereka.",
  "Dengan senang hati menyediakan makanan/penginapan bagi mereka yang membutuhkan.",
  "Bila berdoa bagi orang lain, saya sering lupa waktu.",
  "Mempunyai kemampuan menemukan kebenaran baru bagi diri saya.",
  "Membujuk orang lain untuk bergerak maju untuk mencapai tujuan Alkitabiah.",
  "Dengan senang hati bekerja dengan orang-orang yang tidak diperdulikan orang banyak.",
  "Mudah menyesuaikan dengan satu budaya yang berbeda dengan saya.",
  "Menyenangi tanggung jawab untuk membina kerohanian sekelompok orang Kristen.",
  "Senang dipanggil untuk melakukan suatu tugas tertentu di sekitar gereja.",
  "Menyanggupkan orang-orang belajar Alkitab secara rinci.",
  "Menerapkan kebenaran secara berhasil dalam kehidupan saya.",
  "Sanggup mengorganisasi pendapat, orang-orang, barang-barang dan waktu untuk pelayanan yang lebih berhasil guna.",
  "Menimbang dengan baik antara yang tidak baik dan baik atau yang jahat dan tidak jahat.",
  "Dengan penuh kesukaan menceritakan bagaimana Kristus telah membawa saya kepada-Nya.",
  "Menjadi alat untuk mengungkapkan rasa puas diri dan mengarahkan kembali yang sesat untuk menghadapi kenyataan rohani.",
  "Pada umumnya lebih senang masa depan daripada masa lalu.",
  "Memberikan lebih banyak barang, atau uang bagi pekerjaan Tuhan.",
  "Dalam nama Tuhan menyembuhkan orang yang emosinya terganggu.",
  "Membantu atau membersihkan alat/perlengkapan gereja.",
  "Dengan sukarela menyediakan tempat menginap bagi tamu.",
  "Memperhatikan dengan lebih sungguh-sungguh permohonan untuk didoakan melebihi orang Kristen lain.",
  "Mempunyai pengetahuan akan kebenaran yang meyakinkan orang Kristen lain.",
  "Tahu kemana saya pergi dan melihat orang Kristen lain mengikutiNya.",
  "Menolong orang yang tidak semestinya demikian.",
  "Belajar bahasa orang lain dengan baik untuk melayani orang lain.",
  "Secara sukarela mengorbankan diri saya untuk kepentingan orang Kristen yang masih baru atau sesat.",
  "Menyenangi pekerjaan rutin di gereja yang membosankan orang lain.",
  "Bila saya mengajar Alkitab, semua orang mengerti dengan jelas.",
  "Saya mencari penyelesaian atas berbagai persoalan yang rumit.",
  "Sanggup menyusun tujuan dan membuat rencana yang berhasil guna untuk mencapainya.",
  "Cenderung melihat di bawah permukaan dan meragukan motif orang lain.",
  "Menjelaskan dengan gamblang kebenaran-kebenaran Alkitab yang membawa orang kepada Yesus.",
  "Secara lisan menantang mereka yang agaknya acuh tak acuh.",
  "Berharap pada kehadiran dan kuasa Allah menghadapi hal yang tidak mungkin.",
  "Perasaan tergerak bila dihadapkan dengan kebutuhan keuangan yang mendesak di dalam pekerjaan Allah.",
  "Dalam nama Tuhan melayani dengan berhasil/baik mereka yang sakit rohani.",
  "Mengetik, menyimpan dan mencatat gambar-gambar atau keputusan bagi pekerjaan Tuhan.",
  "Memiliki kepandaian khusus untuk membuat orang lain seperti di rumah sendiri.",
  "Doa adalah salah satu dari latihan rohani yang paling saya gemari.",
  "Mencari dan menguasai bukti-bukti baru dan prinsip-prinsip kebenaran Alkitab.",
  "Mempengaruhi orang lain untuk mencapai tujuan-tujuan yang berkaitan dengan Alkitab.",
  "Melawat ke rumah sakit atau rumah jompo agar menjadi berkat bagi mereka.",
  "Mampu berhubungan baik dengan orang Kristen yang berlainan bangsa, bahasa dan budaya.",
  "Mengenal dengan akrab dan dikenal oleh mereka yang saya layani dan pimpin.",
  "Merasa puas melakukan pekerjaan kasar demi kemuliaan Allah.",
  "Membuat kebenaran Alkitab yang sulit itu dapat dimengerti oleh orang lain.",
  "Memilih salah satu pilihan yang Alkitabiah agar berhasil.",
  "Mampu memimpin satu kelompok untuk mengambil keputusan bersama.",
  "Secara tepat mengetahui karunia rohani mana yang dimiliki orang Kristen lain dan mana yang tidak dimiliki.",
  "Menitikberatkan pekabaran yang mengutamakan Injil Keselamatan.",
  "Mampu memberikan penyuluhan secara berhasil kepada mereka yang kebingungan, bersalah dan kecanduan.",
  "Merasa pasti bahwa saya tahu kehendak Allah yang istimewa bagi perkembangan pekerjaan-Nya di masa depan sekalipun orang lain tidak mengetahuinya.",
  "Sanggup mendapat banyak uang untuk diberikan kepada pekerjaan Tuhan.",
  "Berdoa untuk orang lain sehingga terjadi penyembuhan.",
  "Menyebarkan bahan cetakan dan risalah Injil di masyarakat sekitar saya.",
  "Memiliki keramahtamahan yang tulus dan penghargaan kepada setiap tamu.",
  "Allah selalu menjawab doa saya dalam cara yang nyata.",
  "Saya banyak menyelidiki dan membaca untuk belajar kebenaran Alkitab.",
  "Mengarahkan orang lain melewati berbagai kesulitan dalam pekerjaan Tuhan.",
  "Membawa orang kesepian berjalan-jalan sebentar dan menolong mereka secara praktis.",
  "Menikmati hidup di negara asing.",
  "Menolong orang Kristen yang membutuhkan oleh menuntun mereka kepada ayat-ayat Alkitab yang tepat dan berdoa dengan mereka.",
  "Mau membantu orang lain daripada memberi perintah kepada mereka.",
  "Menyampaikan kebenaran Alkitab kepada orang lain yang menghasilkan perubahan dalam pengetahuan, sikap, nilai dan perangai.",
  "Pilihan saya akan orang-orang untuk suatu kedudukan terbukti adalah pilihan yang terbaik.",
  "Sanggup mempekerjakan orang-orang Kristen dan menempatkan mereka untuk bekerja mempraktekkan karunia rohani mereka.",
  "Dapat melihat sesuatu yang palsu sebelum kepalsuannya itu terbukti benar.",
  "Terus mencari orang-orang yang tidak percaya untuk memenangkan mereka.",
  "Menghibur orang Kristen yang dalam kesusahan dan penderitaan.",
  "Percaya kepada kebenaran Allah pada waktu semua tampaknya suram.",
  "Mau bertahan hidup sederhana demi berhasilnya pekerjaan Allah.",
  "Menolong secara berhasil guna mereka yang lemah pikiran.",
  "Senang menjadi pembantu guru dalam kelas Alkitab.",
  "Senang orang-orang asing berada di rumah.",
  "Seringkali berdoa di saat saya barangkali harus melakukan hal yang lain.",
  "Sanggup membedakan bukti-bukti utama dan penting mengenai Kitab Suci.",
  "Orang lain mengikuti saya karena saya memiliki pengetahuan yang membantu pembangunan gereja saya.",
  "Berbicara dengan gembira kepada mereka di lembaga pemasyarakatan atau orang-orang yang hidup sendiri dan kesepian.",
  "Mempunyai kesanggupan belajar bahasa asing.",
  "Sanggup memulihkan orang yang telah jauh tersesat dari masyarakat Kristen mereka.",
  "Senang bila orang lain menyampaikan kebutuhannya akan pertolongan.",
  "Melatih orang Kristen untuk menjadi murid Kristus yang lebih penurut.",
  "Merasakan kehadiran Allah yang lain dari biasanya ketika keputusan penting harus diambil."
];

const questionsContainer = document.getElementById("questionsContainer");
const form = document.getElementById("assessmentForm");
const resultCard = document.getElementById("resultCard");
const topGiftsList = document.getElementById("topGiftsList");
const allTotals = document.getElementById("allTotals");
const submitBtn = document.getElementById("submitBtn");

// Render 90 questions
QUESTIONS.forEach((text, index) => {
  const number = index + 1;
  const questionEl = document.createElement("div");
  questionEl.className = "question";

  questionEl.innerHTML = `
    <div class="question-title">${number}. ${text}</div>
    <div class="scale">
      ${[1, 2, 3, 4, 5].map((value) => `
        <label>
          <input type="radio" name="q_${number}" value="${value}" required />
          ${value}
        </label>
      `).join("")}
    </div>
  `;

  questionsContainer.appendChild(questionEl);
});

function calculateTotals(answers) {
  const totals = Object.fromEntries(GIFT_NAMES.map((gift) => [gift, 0]));

  for (let i = 1; i <= 90; i++) {
    const giftIndex = (i - 1) % 18;
    const giftName = GIFT_NAMES[giftIndex];
    totals[giftName] += Number(answers[`q_${i}`] || 0);
  }

  return totals;
}

function getTopThree(totals) {
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([gift, score]) => ({ gift, score }));
}

function renderResults(totals, topThree) {
  topGiftsList.innerHTML = "";
  allTotals.innerHTML = "";

  topThree.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.gift} — ${item.score}`;
    topGiftsList.appendChild(li);
  });

  const grid = document.createElement("div");
  grid.className = "result-grid";

  Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .forEach(([gift, score]) => {
      const box = document.createElement("div");
      box.className = "result-item";
      box.innerHTML = `<strong>${gift}</strong><br>Skor: ${score}`;
      grid.appendChild(box);
    });

  allTotals.appendChild(grid);
  resultCard.classList.remove("hidden");
  resultCard.scrollIntoView({ behavior: "smooth" });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (SUPABASE_URL === "PASTE_SUPABASE_URL" || SUPABASE_ANON_KEY === "PASTE_SUPABASE_ANON_KEY") {
    alert("Silakan isi SUPABASE_URL dan SUPABASE_ANON_KEY di file app.js terlebih dahulu.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Menyimpan...";

  const formData = new FormData(form);

  const respondent = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    church_name: formData.get("church_name"),
    age_group: formData.get("age_group"),
    notes: formData.get("notes")
  };

  const answers = {};
  for (let i = 1; i <= 90; i++) {
    answers[`q_${i}`] = Number(formData.get(`q_${i}`));
  }

  const totals = calculateTotals(answers);
  const topThree = getTopThree(totals);

  const payload = {
    ...respondent,
    answers,
    totals,
    top_gifts: topThree
  };

  const { error } = await supabase.from("assessment_responses").insert(payload);

  submitBtn.disabled = false;
  submitBtn.textContent = "Simpan Hasil";

  if (error) {
    console.error(error);
    alert("Gagal menyimpan data ke Supabase. Cek console browser dan konfigurasi database.");
    return;
  }

  renderResults(totals, topThree);
  alert("Hasil berhasil disimpan.");
});
