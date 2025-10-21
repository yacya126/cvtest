// 格式化时间函数
function formatTime(date) {
  // 获取年、月、日
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  // 获取时、分、秒
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  // 获取UTC偏移
  const utcOffset = date.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(utcOffset / 60));
  const offsetSign = utcOffset <= 0 ? "+" : "-";
  const utcOffsetStr = `UTC${offsetSign}${String(offsetHours).padStart(
    2,
    "0"
  )}`;
  // 组合日期时间字符串
  return `${year}/${month}/${day} ${utcOffsetStr} ${hours}:${minutes}:${seconds}`;
}

// 更新时间显示
function updateTimeDisplay() {
  const currentTime = new Date();
  const formattedTime = formatTime(currentTime);

  // 更新DOM元素内容
  const timeElement = document.getElementById("current-time");
  if (timeElement) {
    timeElement.textContent = `${formattedTime}`;
  }
}

// 初始显示时间
updateTimeDisplay();

// 每秒更新一次时间
setInterval(updateTimeDisplay, 1000);
