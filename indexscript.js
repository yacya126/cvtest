 const AV = window.AV;
    AV.init({
        appId: "L5SNq7BVJ9m4jOr50MCp1iAd-gzGzoHsz",
        appKey: "6CDNvUG0zD9i7EI40nH9zNRv",
        serverURL: "https://l5snq7bv.lc-cn-n1-shared.com"
    });

    const usernameInput = document.getElementById("input-username");
    const passwordInput = document.getElementById("input-password");
    const loginBtn = document.getElementById("btn-login");
    const statusMessage = document.getElementById("status-message");

    // 检查是否已登录，如果已登录则直接跳转到仪表盘
    const currentUser = AV.User.current();
    if (currentUser) {
        window.location.href = './dashboard.html';
    }

    // 登录处理函数
    loginBtn.addEventListener('click', function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // 更新状态信息
        statusMessage.textContent = "Logging in, please wait...";

        // 调用登录 API，并使用 Promise 的 then/catch 方式处理结果
        AV.User.logIn(username, password)
            .then(function(user) {
                // 成功登录
                statusMessage.textContent = "Logging in succeed！";
                window.location.href = './dashboard.html';
            })
            .catch(function(error) {
                // 登录失败
                console.error(error);
                statusMessage.textContent = "Logging in failed: " + error.code + " - " + error.message;
            });
    });