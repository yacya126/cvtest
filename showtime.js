function updateTime() {
const timeElement = document.getElementById('current-time');
if (!timeElement) return;

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const timezoneOffset = -now.getTimezoneOffset() / 60;
const sign = timezoneOffset >= 0 ? '+' : '';
const utcOffset = `UTC${sign}${timezoneOffset}`;

const formattedString = `${year}/${month}/${day} ${utcOffset} ${hours}:${minutes}:${seconds}`;

timeElement.textContent = `当前时间：${formattedString}`;

}

// 在页面加载后开始更新时间
window.addEventListener('load', () => {
updateTime();
setInterval(updateTime, 1000);
});
