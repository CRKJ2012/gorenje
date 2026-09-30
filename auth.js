// auth.js
// 牦牛音乐 · 认证逻辑

// 手机号转假邮箱（Supabase 只支持邮箱登录，我们用手机号@yak.music 作为邮箱）
function phoneToEmail(phone) {
  return phone + '@yak.music';
}

// 校验手机号（中国大陆 11 位）
function isValidPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}

// 校验密码：至少 6 位，必须包含数字和小写字母
function isValidPassword(password) {
  if (password.length < 6) return false;
  const hasDigit = /[0-9]/.test(password);
  const hasLower = /[a-z]/.test(password);
  return hasDigit && hasLower;
}

// 校验密码并返回错误提示
function getPasswordError(password) {
  if (password.length < 6) return '密码至少 6 位';
  if (!/[0-9]/.test(password)) return '密码必须包含数字';
  if (!/[a-z]/.test(password)) return '密码必须包含小写字母';
  return null;
}

// 注册
async function signUp(phone, password, nickname) {
  if (!isValidPhone(phone)) throw new Error('手机号格式不正确');
  const pwdErr = getPasswordError(password);
  if (pwdErr) throw new Error(pwdErr);

  const email = phoneToEmail(phone);
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { phone: phone, nickname: nickname || phone }
    }
  });

  if (error) throw new Error(error.message);
  return data;
}

// 登录
async function signIn(phone, password) {
  if (!isValidPhone(phone)) throw new Error('手机号格式不正确');
  const email = phoneToEmail(phone);
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error('手机号或密码错误');
  return data;
}

// 登出
async function signOut() {
  await supabaseClient.auth.signOut();
}

// 获取当前用户
async function getUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  return user;
}

// 获取当前会话（不发网络请求，快）
async function getSession() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  return session;
}