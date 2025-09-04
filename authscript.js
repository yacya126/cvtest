// 初始化 LeanCloud SDK
        AV.init({
            appId: "L5SNq7BVJ9m4jOr50MCp1iAd-gzGzoHsz",
            appKey: "6CDNvUG0zD9i7EI40nH9zNRv",
            serverURL: "https://l5snq7bv.lc-cn-n1-shared.com"
        });

        // 获取 DOM 元素
        const authBtn = document.getElementById("btn-auth");
        const authorizedEmailInput = document.getElementById("authorized_email");
        const feedbackMessage = document.getElementById("feedback-message");
        const queryBtn = document.getElementById("btn-query");
        const emailList = document.getElementById("email-list");
        const queryUsersBtn = document.getElementById("btn-query-users");
        const userTableBody = document.querySelector("#user-table tbody");

        // 新增的删除用户相关的 DOM 元素
        const deleteEmailInput = document.getElementById("delete-email-input");
        const deleteUserBtn = document.getElementById("btn-delete-user");
        const deleteFeedbackMessage = document.getElementById("delete-feedback-message");

        // 绑定授权按钮点击事件
        authBtn.addEventListener('click', function () {
            feedbackMessage.textContent = '';
            const emailValue = authorizedEmailInput.value;
            if (!emailValue) {
                feedbackMessage.textContent = "邮箱地址不能为空！";
                feedbackMessage.style.color = "red";
                return;
            }

            const AuthUsers = AV.Object.extend("AuthUsers");
            const authUser = new AuthUsers();
            authUser.set("email", emailValue);

            authUser.save().then(() => {
                feedbackMessage.textContent = "✅ 用户邮箱已保存到 AuthUsers 表。";
                feedbackMessage.style.color = "green";
            }).catch((error) => {
                feedbackMessage.textContent = `❌ 保存失败：${error.message}`;
                feedbackMessage.style.color = "red";
                console.error("保存失败:", error);
            });
        });

        // 绑定已授权邮箱查询按钮点击事件
        queryBtn.addEventListener('click', function () {
            emailList.innerHTML = '';
            const query = new AV.Query("AuthUsers");
            query.find().then((results) => {
                if (results.length === 0) {
                    const li = document.createElement('li');
                    li.textContent = "暂无已授权邮箱。";
                    emailList.appendChild(li);
                } else {
                    results.forEach((user) => {
                        const email = user.get('email');
                        const li = document.createElement('li');
                        li.textContent = email;
                        emailList.appendChild(li);
                    });
                }
            }).catch((error) => {
                const li = document.createElement('li');
                li.textContent = `查询失败：${error.message}`;
                li.style.color = "red";
                emailList.appendChild(li);
                console.error("查询失败:", error);
            });
        });

        // 绑定用户列表查询按钮点击事件
        queryUsersBtn.addEventListener('click', function () {
            userTableBody.innerHTML = '';

            const query = new AV.Query('_User');
            query.find().then((users) => {
                if (users.length === 0) {
                    const tr = document.createElement('tr');
                    const td = document.createElement('td');
                    td.textContent = "暂无注册用户。";
                    td.setAttribute('colspan', '4');
                    tr.appendChild(td);
                    userTableBody.appendChild(tr);
                } else {
                    users.forEach((user) => {
                        const tr = document.createElement('tr');
                        const username = user.get('username') || '';
                        const email = user.get('email') || '';
                        const mobilePhoneNumber = user.get('mobilePhoneNumber') || '';
                        const createdAt = user.get('createdAt') ? new Date(user.get('createdAt')).toLocaleString() : '';

                        tr.innerHTML = `
                                    <td>${username}</td>
                                    <td>${email}</td>
                                    <td>${mobilePhoneNumber}</td>
                                    <td>${createdAt}</td>
                                `;
                        userTableBody.appendChild(tr);
                    });
                }
            }).catch((error) => {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.textContent = `查询失败：${error.message}`;
                td.setAttribute('colspan', '4');
                td.style.color = "red";
                tr.appendChild(td);
                userTableBody.appendChild(tr);
                console.error("用户列表查询失败:", error);
            });
        });

        // 新增：绑定删除用户按钮点击事件，现在改为调用云函数
        deleteUserBtn.addEventListener('click', async function () {
            deleteFeedbackMessage.textContent = '';
            const emailToDelete = deleteEmailInput.value.trim();

            if (!emailToDelete) {
                deleteFeedbackMessage.textContent = "请输入要删除的邮箱地址。";
                deleteFeedbackMessage.style.color = "red";
                return;
            }

            deleteFeedbackMessage.textContent = "正在调用云函数删除用户...";
            deleteFeedbackMessage.style.color = "gray";

            try {
                // 调用云函数，并传入要删除的邮箱
                const result = await AV.Cloud.run('deleteUser', { email: emailToDelete });
                deleteFeedbackMessage.textContent = `✅ ${result}`;
                deleteFeedbackMessage.style.color = "green";
                // 刷新用户列表以显示最新状态
                queryUsersBtn.click();
                queryBtn.click();
            } catch (error) {
                console.error(error);
                deleteFeedbackMessage.textContent = `❌ 删除失败: ${error.message}`;
                deleteFeedbackMessage.style.color = "red";
            }
        });