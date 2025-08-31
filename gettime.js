    function updateTime() {
        const now = new Date();

        // 获取并格式化日期和时间
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // 获取时区偏移量，格式为 UTC+X
        const timezoneOffset = -now.getTimezoneOffset() / 60;
        const sign = timezoneOffset >= 0 ? '+' : '';
        const utcOffset = `UTC${sign}${timezoneOffset}`;

        // 构建格式化后的字符串
        const formattedString = `Now Time：${year}/${month}/${day} ${utcOffset} ${hours}:${minutes}:${seconds}`;

        // 更新 h1 标签的内容
        document.getElementById('current-time').textContent = formattedString;
    }

    // 页面加载后立即调用，并每秒更新一次
    window.onload = function() {
        updateTime();
        setInterval(updateTime, 1000);
    };