// config.js
const SUPABASE_URL = 'https://zarxvhlvbgrtriafqfjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphcnh2aGx2YmdydHJpYWZxZmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzOTE5NDYsImV4cCI6MjEwNTk2Nzk0Nn0.VieGkLDW1JH4ezimYxPo1rVjEJp9WpIRiV2idfzLql4';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------- 认证工具 ----------
function phoneToEmail(phone) { return phone + '@yak.music'; }
function isValidPhone(phone) { return /^1[3-9]\d{9}$/.test(phone); }
function isValidPassword(pwd) { return pwd.length >= 6 && /[0-9]/.test(pwd) && /[a-z]/.test(pwd); }
function getPasswordError(pwd) {
  if (pwd.length < 6) return '密码至少 6 位';
  if (!/[0-9]/.test(pwd)) return '密码必须包含数字';
  if (!/[a-z]/.test(pwd)) return '密码必须包含小写字母';
  return null;
}
async function signUp(phone, password, nickname) {
  if (!isValidPhone(phone)) throw new Error('手机号格式不正确');
  const err = getPasswordError(password);
  if (err) throw new Error(err);
  const { data, error } = await supabaseClient.auth.signUp({
    email: phoneToEmail(phone), password,
    options: { data: { phone, nickname: nickname || phone } }
  });
  if (error) throw new Error(error.message);
  return data;
}
async function signIn(phone, password) {
  if (!isValidPhone(phone)) throw new Error('手机号格式不正确');
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: phoneToEmail(phone), password
  });
  if (error) throw new Error('手机号或密码错误');
  return data;
}
async function signOut() { await supabaseClient.auth.signOut(); }
async function getSession() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  return session;
}