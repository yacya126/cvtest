const AV = window.AV;
// LeanCloud 配置
AV.init({
  appId: "L5SNq7BVJ9m4jOr50MCp1iAd-gzGzoHsz",
  appKey: "6CDNvUG0zD9i7EI40nH9zNRv",
  serverURL: "https://l5snq7bv.lc-cn-n1-shared.com",
});

const userInfoElement = document.getElementById("user-info");
const logoutBtn = document.getElementById("logout-btn");
const liftcvlink = document.getElementById("liftcvlink");
const liftraillink = document.getElementById("liftraillink");
const psiboblink = document.getElementById("psiboblink");
const changepasswordBtn = document.getElementById("changepassword-btn");
const currentusername = document.getElementById("current-username");

//登出按钮事件
logoutBtn.addEventListener("click", () => {
  AV.User.logOut().then(() => {
    window.location.href = "../index.html";
  });
});

/* 修改密码按钮事件
changepasswordBtn.addEventListener("click", () => {
  window.location.href = "../pages/changepassword.html";
});
*/

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 获取要控制显示/隐藏的内容框架
  const contentFrame = document.getElementById("auth");
  // 获取当前登录用户
  const currentUser = AV.User.current();
  // 检查用户是否存在且用户名为"admin"
  if (currentUser && currentUser.get('username') === 'admin') {
    // 如果是admin用户，显示内容
    contentFrame.style.display = 'block';
  } else {
    // 否则隐藏内容
    contentFrame.style.display = 'none';
  }
});

// 页面加载逻辑
window.onload = () => {
  // 检查用户登录状态
  const currentUser = AV.User.current();
  if (!currentUser) {
    window.location.href = "../index.html";
    console.log("用户没登陆");
  } else {
    currentusername.textContent = currentUser.get('username');
    console.log("当前用户名" + currentusername.textContent);
  }
};
