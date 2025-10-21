// 多语言核心处理模块
const LanguageHandler = (function() {
    // 默认语言设置
    const DEFAULT_LANG = 'en';
    // 存储所有页面的翻译文本
    let translations = {};
    
    // 初始化函数
    function init(translationsData) {
        // 合并传入的翻译数据
        translations = { ...translations, ...translationsData };
        
        // 从localStorage获取保存的语言，没有则使用默认语言
        const savedLang = localStorage.getItem('appLanguage') || DEFAULT_LANG;
        
        // 应用语言设置
        applyLanguage(savedLang);
        
        // 设置语言选择器事件监听
        setupLanguageSelectors();
    }
    
    // 应用指定语言
    function applyLanguage(lang) {
        // 验证语言是否存在
        if (!translations[lang]) {
            console.warn(`Language ${lang} not found, falling back to default`);
            lang = DEFAULT_LANG;
        }
        
        // 保存语言偏好
        localStorage.setItem('appLanguage', lang);
        
        // 更新页面元素文本
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        // 更新占位符文本
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        
        // 更新语言选择器状态
        document.querySelectorAll('[data-lang]').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 更新下拉选择器
        const selectElement = document.getElementById('language-select');
        if (selectElement) {
            selectElement.value = lang;
        }
        
        // 触发自定义事件，供其他脚本使用
        const event = new CustomEvent('languagechanged', { detail: { lang: lang } });
        document.dispatchEvent(event);
    }
    
    // 设置语言选择器事件
    function setupLanguageSelectors() {
        // 按钮式语言选择器
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                applyLanguage(lang);
            });
        });
        
        // 下拉式语言选择器
        const selectElement = document.getElementById('language-select');
        if (selectElement) {
            selectElement.addEventListener('change', () => {
                applyLanguage(selectElement.value);
            });
        }
    }
    
    // 获取当前语言
    function getCurrentLanguage() {
        return localStorage.getItem('appLanguage') || DEFAULT_LANG;
    }
    
    // 获取翻译文本
    function getTranslation(key, lang = null) {
        const currentLang = lang || getCurrentLanguage();
        return translations[currentLang] && translations[currentLang][key] 
            ? translations[currentLang][key] 
            : key; // 如果没有找到翻译，返回键名作为 fallback
    }
    
    // 公开的方法
    return {
        init: init,
        applyLanguage: applyLanguage,
        getCurrentLanguage: getCurrentLanguage,
        getTranslation: getTranslation
    };
})();