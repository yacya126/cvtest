// 语言处理核心类
class I18n {
  constructor() {
    // 默认语言（优先级：localStorage保存的用户偏好 > 浏览器语言 > 英语）
    this.defaultLang = "en";
    this.currentLang =
      this.getSavedLang() || this.detectBrowserLang() || this.defaultLang;
    this.translations = {}; // 存储加载的翻译内容
    this.init();
  }

  // 初始化：加载默认语言
  async init() {
    await this.loadLang(this.currentLang);
    this.applyTranslations(); // 初始渲染翻译
  }

  // 从localStorage获取用户保存的语言
  getSavedLang() {
    return localStorage.getItem("preferredLang");
  }

  // 检测浏览器默认语言
  detectBrowserLang() {
    const browserLang = navigator.language.split("-")[0]; // 取前两位（如zh-CN → zh）
    const supportedLangs = ["en", "zh", "ja"]; // 支持的语言列表
    return supportedLangs.includes(browserLang) ? browserLang : null;
  }

  // 加载指定语言的JSON文件
  async loadLang(lang) {
    try {
      // 加载对应语言的JSON（路径根据实际结构调整）
      const response = await fetch(`../languages/${lang}.json`);
      if (!response.ok) throw new Error(`语言文件${lang}.json加载失败`);

      this.translations = await response.json();
      this.currentLang = lang;
      localStorage.setItem("preferredLang", lang); // 保存用户选择
      return true;
    } catch (error) {
      console.error("语言加载错误：", error);
      return false;
    }
  }

  /*
  // 应用翻译到页面（核心方法：自动匹配所有带data-i18n属性的元素）
  applyTranslations() {
    // 匹配所有带data-i18n属性的元素
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      // 替换文本内容（如果是输入框，替换placeholder）
      if (element.tagName === "INPUT" && element.getAttribute("placeholder")) {
        element.setAttribute("placeholder", this.translations[key] || key);
      } else {
        element.textContent = this.translations[key] || key; // 找不到翻译时显示key
      }
    });
  }
*/

  applyTranslations() {
    // 匹配所有带data-i18n属性的元素
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translatedText = this.translations[key] || key; // ------------------ 关键修改 ------------------

      if (element.tagName === "INPUT" && element.getAttribute("placeholder")) {
        element.setAttribute("placeholder", translatedText);
      } else {
        // 对于绝大多数 i18n 文本，默认使用 textContent 确保安全

        // 🚨 安全提醒：只有在您确定翻译内容是安全、由自己控制时才使用 innerHTML
        // 这里添加一个简单的标记来控制是否使用 innerHTML
        if (element.hasAttribute("data-i18n-html")) {
          element.innerHTML = translatedText; // 使用 innerHTML 才能解析 <br>
        } else {
          element.textContent = translatedText; // 默认使用纯文本（安全）
        }
      }
    });
  }

  // 应用翻译到页面（核心t方法：自动匹配所有带data-i18n属性的元素）
  t() {
    // 匹配所有带data-i18n属性的元素
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      // 替换文本内容（如果是输入框，替换placeholder）
      if (element.tagName === "INPUT" && element.getAttribute("placeholder")) {
        element.setAttribute("placeholder", this.translations[key] || key);
      } else {
        element.textContent = this.translations[key] || key; // 找不到翻译时显示key
      }
    });
  }

  // 获取指定key的翻译文本
  get(key) {
    // 确保返回翻译后的文本，找不到时返回key本身
    return this.translations[key] || key;
  }

  // 切换语言（供外部调用，如语言选择按钮）
  async changeLanguage(lang) {
    if (lang === this.currentLang) return; // 避免重复切换
    const success = await this.loadLang(lang);
    if (success) {
      this.applyTranslations();
      // 可选：触发全局事件，通知其他组件语言已切换
      window.dispatchEvent(new Event("languageChanged"));
    }
  }
}

// 实例化并暴露全局对象，供所有页面使用
window.i18n = new I18n();
