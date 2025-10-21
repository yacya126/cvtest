document.addEventListener('DOMContentLoaded', () => {
  // 1. 配置区：集中管理常量（便于修改）
  const CONFIG = {
    LEAN_CLOUD: {
        appId: "L5SNq7BVJ9m4jOr50MCp1iAd-gzGzoHsz",
         appKey: "6CDNvUG0zD9i7EI40nH9zNRv",
        serverURL: "https://l5snq7bv.lc-cn-n1-shared.com"
    },
    REDIRECT_URL: '../pages/dashboard.html',
    LOGIN_DELAY: 100 // 登录成功后延迟跳转时间（ms）
  };

  // 2. 初始化区：LeanCloud 初始化 + DOM 校验
  let AV;
  const init = () => {
    try {
      // 初始化 LeanCloud SDK
      AV = window.AV;
      if (!AV) throw new Error("LeanCloud SDK 未加载");
      AV.init(CONFIG.LEAN_CLOUD);

      // 校验 DOM 元素
      const elements = getDOMElements();
      if (!elements) throw new Error("关键 DOM 元素缺失");

      // 检查登录状态
      checkLoginStatus();

      // 绑定事件
      bindEvents(elements);

    } catch (error) {
      console.error("初始化失败：", error);
      alert(window.i18n?.t("init-failed") || "系统初始化失败，请刷新页面重试");
    }
  };

  // 3. DOM 工具函数：获取并校验元素
  const getDOMElements = () => {
    const elements = {
      usernameInput: document.getElementById("input-username"),
      passwordInput: document.getElementById("input-password"),
      loginBtn: document.getElementById("btn-login"),
      statusMessage: document.getElementById("status-message")
    };
    return Object.values(elements).every(el => el) ? elements : null;
  };

  // 4. 登录状态检查函数
  const checkLoginStatus = () => {
    const currentUser = AV.User.current();
    if (currentUser) {
      console.log("已登录，跳转至仪表盘");
      window.location.href = CONFIG.REDIRECT_URL;
    }
  };

  // 5. 输入校验函数
  const validateInput = (usernameEl, passwordEl, statusEl) => {
    const username = usernameEl.value.trim();
    const password = passwordEl.value.trim();

    if (!username) {
      statusEl.textContent = window.i18n?.t("login-empty-username") || "请输入用户名";
      return false;
    }
    if (!password) {
      statusEl.textContent = window.i18n?.t("login-empty-password") || "请输入密码";
      return false;
    }
    return { username, password };
  };

  // 6. 登录核心函数
  const handleLogin = async (elements) => {
    const { usernameInput, passwordInput, loginBtn, statusMessage } = elements;

    // 防重复点击
    loginBtn.disabled = true;
    loginBtn.textContent = window.i18n?.t("login-loading") || "登录中...";

    // 输入校验
    const inputData = validateInput(usernameInput, passwordInput, statusMessage);
    if (!inputData) {
      loginBtn.disabled = false;
      loginBtn.textContent = window.i18n?.t("login-btn") || "登录";
      return;
    }

    try {
      // 发送登录请求
      statusMessage.textContent = window.i18n?.t("login-wait") || "登录中，请稍候...";
      await AV.User.logIn(inputData.username, inputData.password);

      // 登录成功
      statusMessage.textContent = window.i18n?.t("login-success") || "登录成功，即将跳转...";
      passwordInput.value = ""; // 清空密码
      setTimeout(() => window.location.href = CONFIG.REDIRECT_URL, CONFIG.LOGIN_DELAY);

    } catch (error) {
      // 错误处理
      const errorMap = {
        210: "login-error-210",
        200: "login-error-200",
        101: "login-error-101"
      };
      const errorKey = errorMap[error.code] || "login-error-default";
      const errorMsg = window.i18n?.t(errorKey) || `登录失败：${error.code} - ${error.message}`;
      statusMessage.textContent = errorMsg;

    } finally {
      // 恢复按钮状态
      loginBtn.disabled = false;
      loginBtn.textContent = window.i18n?.t("login-btn") || "登录";
    }
  };

  // 7. 事件绑定函数
  const bindEvents = (elements) => {
    // 登录按钮点击事件
    elements.loginBtn.addEventListener('click', () => handleLogin(elements));
    // 回车键登录事件
    elements.passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleLogin(elements);
    });
  };

  // 启动初始化
  init();
});