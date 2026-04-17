const SUPABASE_URL = "https://gpznwozgemdycswibgyo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Csx1klgelgJn5ZlAZuWy1A_9fAW35iX";

if (!window.supabase) {
  throw new Error("Library Supabase belum termuat. Cek script di index.html");
}

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase client OK:", supabase);

document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  if (status) {
    status.textContent = "Supabase berhasil dimuat.";
  }
});
