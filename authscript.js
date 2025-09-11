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
const deleteFeedbackMessage2 = document.getElementById("delete-feedback-message-new");
const bannedusers = document.getElementById("banned-users");

// 新增用户权限相关的DOM元素
const queryPermissionsBtn = document.getElementById("btn-query-permissions");
const permissionsTableBody = document.getElementById("permissions-table-body");
const userSelect = document.getElementById("user-select");
const editUserEmail = document.getElementById("edit-user-email");

const banliftcv = document.getElementById("ban-liftcv");
const banliftrail = document.getElementById("ban-liftrail");
const banpsibob = document.getElementById("ban-psibob");
const banallpass = document.getElementById("ban-allpass");
const openliftcv = document.getElementById("open-liftcv");
const openliftrail = document.getElementById("open-liftrail");
const openpsibob = document.getElementById("open-psibob");
const openallpass = document.getElementById("open-allpass");

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

// 存储所有用户数据，供编辑功能使用
let allUsers = [];

queryPermissionsBtn.addEventListener('click', function () {
    permissionsTableBody.innerHTML = '';
    const query = new AV.Query('_User');
    query.find().then((users) => {
        if (users.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.textContent = "暂无注册用户。";
            td.setAttribute('colspan', '4');
            tr.appendChild(td);
            permissionsTableBody.appendChild(tr);
        } else {
            users.forEach((user) => {
                const tr = document.createElement('tr');
                const username = user.get('username') || '';
                const email = user.get('email') || '';
                const LIFTCV = user.get('LIFTCV') || '';
                const LIFTRAIL = user.get('LIFTRAIL') || '';
                const PSIBOB = user.get('PSIBOB') || '';
                const ALLPASS = user.get('ALLPASS') || '';

                tr.innerHTML = `
                                    <td>${username}</td>
                                    <td>${email}</td>
                                    <td>${LIFTCV}</td>
                                    <td>${LIFTRAIL}</td>
                                    <td>${PSIBOB}</td>
                                    <td>${ALLPASS}</td>
                                `;
                permissionsTableBody.appendChild(tr);
            });
        }
    }).catch((error) => {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = `查询失败：${error.message}`;
        td.setAttribute('colspan', '4');
        td.style.color = "red";
        tr.appendChild(td);
        permissionsTableBody.appendChild(tr);
        console.error("用户列表查询失败:", error);
    });
});

//监听所有的权限处理按钮

banliftcv.addEventListener('click', async function () {
    console.log("要操作的元素：", deleteFeedbackMessage2); // 看控制台是否输出 null
    deleteFeedbackMessage2.textContent = '';
    const targetEmail = bannedusers.value.trim();

    if (!targetEmail) {
        deleteFeedbackMessage2.textContent = "请输入要调整用户权限的邮箱地址。";
        deleteFeedbackMessage2.style.color = "red";
        return;
    }

    deleteFeedbackMessage2.textContent = "正在调用云函数调整用户权限...";
    deleteFeedbackMessage2.style.color = "gray";

    try {
        // 调用云函数，并传入要删除的邮箱
        const result = await AV.Cloud.run('banUserLiftCV', { email: targetEmail });
        deleteFeedbackMessage2.textContent = `✅ ${result}`;
        deleteFeedbackMessage2.style.color = "green";
        // 刷新用户列表以显示最新状态
        queryUsersBtn.click();
        queryBtn.click();
    } catch (error) {
        console.error(error);
        deleteFeedbackMessage2.textContent = `❌ 删除失败: ${error.message}`;
        deleteFeedbackMessage2.style.color = "red";
    }
});


banliftrail.addEventListener('click', async function () {
    console.log("要操作的元素：", deleteFeedbackMessage2); // 看控制台是否输出 null
    deleteFeedbackMessage2.textContent = '';
    const targetEmail = bannedusers.value.trim();

    if (!targetEmail) {
        deleteFeedbackMessage2.textContent = "请输入要调整用户权限的邮箱地址。";
        deleteFeedbackMessage2.style.color = "red";
        return;
    }

    deleteFeedbackMessage2.textContent = "正在调用云函数调整用户权限...";
    deleteFeedbackMessage2.style.color = "gray";

    try {
        // 调用云函数，并传入要删除的邮箱
        const result = await AV.Cloud.run('banUserLiftRAIL', { email: targetEmail });
        deleteFeedbackMessage2.textContent = `✅ ${result}`;
        deleteFeedbackMessage2.style.color = "green";
        // 刷新用户列表以显示最新状态
        queryUsersBtn.click();
        queryBtn.click();
    } catch (error) {
        console.error(error);
        deleteFeedbackMessage2.textContent = `❌ 删除失败: ${error.message}`;
        deleteFeedbackMessage2.style.color = "red";
    }
});

banpsibob.addEventListener('click', async function () {
    console.log("要操作的元素：", deleteFeedbackMessage2); // 看控制台是否输出 null
    deleteFeedbackMessage2.textContent = '';
    const targetEmail = bannedusers.value.trim();

    if (!targetEmail) {
        deleteFeedbackMessage2.textContent = "请输入要调整用户权限的邮箱地址。";
        deleteFeedbackMessage2.style.color = "red";
        return;
    }

    deleteFeedbackMessage2.textContent = "正在调用云函数调整用户权限...";
    deleteFeedbackMessage2.style.color = "gray";

    try {
        // 调用云函数，并传入要删除的邮箱
        const result = await AV.Cloud.run('banUserPSIBOB', { email: targetEmail });
        deleteFeedbackMessage2.textContent = `✅ ${result}`;
        deleteFeedbackMessage2.style.color = "green";
        // 刷新用户列表以显示最新状态
        queryUsersBtn.click();
        queryBtn.click();
    } catch (error) {
        console.error(error);
        deleteFeedbackMessage2.textContent = `❌ 删除失败: ${error.message}`;
        deleteFeedbackMessage2.style.color = "red";
    }
});

banallpass.addEventListener('click', async function () {
    console.log("要操作的元素：", deleteFeedbackMessage2); // 看控制台是否输出 null
    deleteFeedbackMessage2.textContent = '';
    const targetEmail = bannedusers.value.trim();

    if (!targetEmail) {
        deleteFeedbackMessage2.textContent = "请输入要调整用户权限的邮箱地址。";
        deleteFeedbackMessage2.style.color = "red";
        return;
    }

    deleteFeedbackMessage2.textContent = "正在调用云函数调整用户权限...";
    deleteFeedbackMessage2.style.color = "gray";

    try {
        // 调用云函数，并传入要删除的邮箱
        const result = await AV.Cloud.run('banUserALLPASS', { email: targetEmail });
        deleteFeedbackMessage2.textContent = `✅ ${result}`;
        deleteFeedbackMessage2.style.color = "green";
        // 刷新用户列表以显示最新状态
        queryUsersBtn.click();
        queryBtn.click();
    } catch (error) {
        console.error(error);
        deleteFeedbackMessage2.textContent = `❌ 删除失败: ${error.message}`;
        deleteFeedbackMessage2.style.color = "red";
    }
});

openallpass.addEventListener('click', async function () {
    console.log("要操作的元素：", deleteFeedbackMessage2); // 看控制台是否输出 null
    deleteFeedbackMessage2.textContent = '';
    const targetEmail = bannedusers.value.trim();

    if (!targetEmail) {
        deleteFeedbackMessage2.textContent = "请输入要调整用户权限的邮箱地址。";
        deleteFeedbackMessage2.style.color = "red";
        return;
    }

    deleteFeedbackMessage2.textContent = "正在调用云函数调整用户权限...";
    deleteFeedbackMessage2.style.color = "gray";

    try {
        // 调用云函数，并传入要删除的邮箱
        const result = await AV.Cloud.run('openUserALLPASS', { email: targetEmail });
        deleteFeedbackMessage2.textContent = `✅ ${result}`;
        deleteFeedbackMessage2.style.color = "green";
        // 刷新用户列表以显示最新状态
        queryUsersBtn.click();
        queryBtn.click();
    } catch (error) {
        console.error(error);
        deleteFeedbackMessage2.textContent = `❌ 删除失败: ${error.message}`;
        deleteFeedbackMessage2.style.color = "red";
    }
});

openpsibob.addEventListener('click', async function () {
    console.log("要操作的元素：", deleteFeedbackMessage2); // 看控制台是否输出 null
    deleteFeedbackMessage2.textContent = '';
    const targetEmail = bannedusers.value.trim();

    if (!targetEmail) {
        deleteFeedbackMessage2.textContent = "请输入要调整用户权限的邮箱地址。";
        deleteFeedbackMessage2.style.color = "red";
        return;
    }

    deleteFeedbackMessage2.textContent = "正在调用云函数调整用户权限...";
    deleteFeedbackMessage2.style.color = "gray";

    try {
        // 调用云函数，并传入要删除的邮箱
        const result = await AV.Cloud.run('openUserPSIBOB', { email: targetEmail });
        deleteFeedbackMessage2.textContent = `✅ ${result}`;
        deleteFeedbackMessage2.style.color = "green";
        // 刷新用户列表以显示最新状态
        queryUsersBtn.click();
        queryBtn.click();
    } catch (error) {
        console.error(error);
        deleteFeedbackMessage2.textContent = `❌ 删除失败: ${error.message}`;
        deleteFeedbackMessage2.style.color = "red";
    }
});

openliftcv.addEventListener('click', async function () {
    console.log("要操作的元素：", deleteFeedbackMessage2); // 看控制台是否输出 null
    deleteFeedbackMessage2.textContent = '';
    const targetEmail = bannedusers.value.trim();

    if (!targetEmail) {
        deleteFeedbackMessage2.textContent = "请输入要调整用户权限的邮箱地址。";
        deleteFeedbackMessage2.style.color = "red";
        return;
    }

    deleteFeedbackMessage2.textContent = "正在调用云函数调整用户权限...";
    deleteFeedbackMessage2.style.color = "gray";

    try {
        // 调用云函数，并传入要删除的邮箱
        const result = await AV.Cloud.run('openUserLiftCV', { email: targetEmail });
        deleteFeedbackMessage2.textContent = `✅ ${result}`;
        deleteFeedbackMessage2.style.color = "green";
        // 刷新用户列表以显示最新状态
        queryUsersBtn.click();
        queryBtn.click();
    } catch (error) {
        console.error(error);
        deleteFeedbackMessage2.textContent = `❌ 删除失败: ${error.message}`;
        deleteFeedbackMessage2.style.color = "red";
    }
});

openliftrail.addEventListener('click', async function () {
    console.log("要操作的元素：", deleteFeedbackMessage2); // 看控制台是否输出 null
    deleteFeedbackMessage2.textContent = '';
    const targetEmail = bannedusers.value.trim();

    if (!targetEmail) {
        deleteFeedbackMessage2.textContent = "请输入要调整用户权限的邮箱地址。";
        deleteFeedbackMessage2.style.color = "red";
        return;
    }

    deleteFeedbackMessage2.textContent = "正在调用云函数调整用户权限...";
    deleteFeedbackMessage2.style.color = "gray";

    try {
        // 调用云函数，并传入要删除的邮箱
        const result = await AV.Cloud.run('openUserLiftRAIL', { email: targetEmail });
        deleteFeedbackMessage2.textContent = `✅ ${result}`;
        deleteFeedbackMessage2.style.color = "green";
        // 刷新用户列表以显示最新状态
        queryUsersBtn.click();
        queryBtn.click();
    } catch (error) {
        console.error(error);
        deleteFeedbackMessage2.textContent = `❌ 删除失败: ${error.message}`;
        deleteFeedbackMessage2.style.color = "red";
    }
});