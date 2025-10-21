// 加载语言选择框的通用函数
async function loadLanguageSelector(containerSelector = 'body') {
  try {
    // 请求语言选择框HTML
    const response = await fetch('../pages/language-selector.html');
    if (!response.ok) throw new Error('加载语言选择框失败');
    
    const html = await response.text();
    const container = document.querySelector(containerSelector);
    
    if (container) {
      // 创建临时容器解析HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // 提取语言选择框元素（假设语言选择框的根元素是.lang-card）
      const langSelector = tempDiv.querySelector('.lang-card');
      if (langSelector) {
        // 插入到目标容器的顶部
        container.insertBefore(langSelector, container.firstChild);
        
        // 重新初始化滚动监听和语言切换逻辑（关键！动态加载的内容需要重新绑定事件）
        initLangSelectorEvents();
      }
    }
  } catch (error) {
    console.error('加载语言选择框出错：', error);
  }
}

// 初始化语言选择框的事件（从language-selector.html中迁移核心逻辑）
function initLangSelectorEvents() {
  const langSelector = document.querySelector('.lang-card');
  if (!langSelector) return;

  // 1. 滚动渐隐效果（复用原逻辑）
  const config = {
    startFadeDistance: 50,
    completeFadeDistance: 200
  };

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY < config.startFadeDistance) {
      langSelector.style.opacity = '1';
      langSelector.style.filter = 'blur(0px)';
      langSelector.style.visibility = 'visible';
    } else if (scrollY < config.completeFadeDistance) {
      const progress = (scrollY - config.startFadeDistance) / (config.completeFadeDistance - config.startFadeDistance);
      langSelector.style.opacity = (1 - progress).toString();
      langSelector.style.filter = `blur(${progress * 5}px)`;
      langSelector.style.visibility = 'visible';
    } else {
      langSelector.style.opacity = '0';
      langSelector.style.filter = 'blur(5px)';
      langSelector.style.visibility = 'hidden';
    }
  }

  // 2. 语言切换逻辑（调用i18n模块）
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      window.i18n.changeLanguage(lang); // 调用全局i18n对象切换语言
      console.log(lang);
      localStorage.setItem('preferredLang', lang);
      console.log(localStorage.getItem('preferredLang'));
    });
  });

  // 初始化并监听滚动
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// 页面加载完成后自动加载语言选择框
document.addEventListener('DOMContentLoaded', () => {
  // 默认插入到body顶部，可自定义容器（如#header）
  loadLanguageSelector();
});