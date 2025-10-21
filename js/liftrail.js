// 获取所有标记为“data_cell”的单元格
const dataCells = document.querySelectorAll(".data-cell");

// 定义一个唯一的localStorage键
const localStorageKey = "liftrail_data_cells";

// 获取所有可编辑单元格，并为它们添加事件监听器
const editableCells = document.querySelectorAll(
  '[contenteditable="true"].data-cell'
);

//获取单元格
const d4 = document.getElementById("d4");
const d6 = document.getElementById("d6");
const d7 = document.getElementById("d7");
const d9 = document.getElementById("d9");
const h2 = document.getElementById("h2");
const h3 = document.getElementById("h3");
const l4 = document.getElementById("l4");
const l6 = document.getElementById("l6");
const l7 = document.getElementById("l7");
const l8 = document.getElementById("l8");
const l9 = document.getElementById("l9");
const h6 = document.getElementById("h6");
const h7 = document.getElementById("h7");
const h8 = document.getElementById("h8");
const h9 = document.getElementById("h9");
const 平均距离单元格 = document.getElementById("avgDistance");
const 带载进出时间单元格 = document.getElementById("timeLoad");
const 不带载进出时间单元格 = document.getElementById("timeNoLoad");
const 提升时间表格体 = document.getElementById("liftingTimeTableBody");
const 提升时间表格行 = document.getElementsByClassName("lifting-time-row");
const 提升层级单元格 = document.getElementById("liftingLevels");
const 提升时间效率单元格 = document.getElementById("liftingTimeEff");
const 带载时间效率单元格 = document.getElementById("timeLoadEff");
const 不带载时间效率单元格 = document.getElementById("timeNoLoadEff");
const 抓取放置时间单元格 = document.getElementById("pickDropTime");
const 下降时间单元格 = document.getElementById("descendingTime");
const 电气延迟单元格 = document.getElementById("elecDelay");
const 位置锁定单元格 = document.getElementById("posLock");
const 等待时间单元格 = document.getElementById("waitingTime");
const 效率比率单元格 = document.getElementById("efficiencyRate");
const 循环时间单元格 = document.getElementById("cycleTime");
const 托盘提升性能单元格 = document.getElementById("palletLiftingPerformance");
const 吞吐量需求单元格 = document.getElementById("throughputRequirement");
const 升降机数量单元格 = document.getElementById("qtyOfLift");

// 保存所有数据单元格到localStorage
function saveDataToLocalStorage() {
  const dataToSave = {};
  // 遍历所有数据单元格，包括可编辑和不可编辑的
  dataCells.forEach((cell) => {
    if (cell.id) {
      dataToSave[cell.id] = cell.textContent;
    }
  });

  // 专门处理下拉框l4的值
  if (l4) {
    dataToSave[l4.id] = l4.value;
  }

  localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
}

// 从localStorage加载数据并填充可编辑单元格
function loadDataFromLocalStorage() {
  const savedData = localStorage.getItem(localStorageKey);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    editableCells.forEach((cell) => {
      if (parsedData[cell.id] !== undefined) {
        cell.textContent = parsedData[cell.id];
      }
    });

    // 专门处理下拉框l4的加载
    if (l4 && parsedData[l4.id] !== undefined) {
      l4.value = parsedData[l4.id];
    }

    return true;
  }
  return false;
}

//计算并更新第一组数据的值。由于提升时间表格、第二组和第三组数据依赖于第一组数据，因此在更新第一组数据后，需要调用更新提升时间表格、第二组和第三组数据的函数。
function 更新计算1() {
  // 从可编辑单元格中获取值，如果不是数字则默认为0
  const 提升速度 = parseFloat(d6.textContent) || 0;
  const 提升加速度 = parseFloat(d7.textContent) || 0;

  // 计算从加速到最大速度的距离（mm）
  const 升降机速度总和 = ((提升速度 * 提升速度) / (2 * 提升加速度)) * 1000;
  h2.textContent = 升降机速度总和.toFixed(2);

  // 计算从最大速度加速到停止的距离（mm），与上面计算相同
  const 升降机功率总和 = ((提升速度 * 提升速度) / (2 * 提升加速度)) * 1000;
  h3.textContent = 升降机功率总和.toFixed(2);

  // 更新完第一个表格后，调用动态表格和第三个表格的更新函数
  更新提升时间表格();
  更新计算2();
  更新计算3();
}

//计算并更新第二组数据的值。由于第三组数据依赖于第二组数据，因此在更新第二组数据后，需要调用更新第三组数据的函数。
function 更新计算2() {
  if (
    l4.value === "PS1500A" ||
    l4.value === "PS1500B" ||
    l4.value === "PS1500C" ||
    l4.value === "PS1500BD"
  ) {
    l9.textContent = "2";
  } else {
    l9.textContent = "1";
  }

  // 从可编辑单元格中获取值，如果不是数字则默认为0
  const 带载时PS速度 = parseFloat(l6.textContent) || 0;
  const 带载时PS加速度 = parseFloat(l7.textContent) || 0;
  const 不带载时PS速度 = parseFloat(l8.textContent) || 0;
  const 不带载时PS加速度 = parseFloat(l9.textContent) || 0;

  // 计算带载情况下的加速距离和停止距离
  const 带载加速距离计算值 =
    ((带载时PS速度 * 带载时PS速度) / (2 * 带载时PS加速度)) * 1000;
  h6.textContent = 带载加速距离计算值.toFixed(0);
  h7.textContent = 带载加速距离计算值.toFixed(0);

  // 假设不带载时的速度和加速度与带载时相同
  const 不带载加速距离计算值 =
    ((不带载时PS速度 * 不带载时PS速度) / (2 * 不带载时PS加速度)) * 1000;
  h8.textContent = 不带载加速距离计算值.toFixed(0);
  h9.textContent = 不带载加速距离计算值.toFixed(0);

  // 获取新的输入值用于时间计算
  const 带载加速距离 = parseFloat(h6.textContent) || 0;
  const 不带载加速距离 = parseFloat(h8.textContent) || 0;
  const 平均距离 = parseFloat(平均距离单元格.textContent) || 0;

  // 计算“带载进出升降机的时间”
  let 带载时间值 = 0;
  const 带载加速距离米 = 带载加速距离 / 1000; // 将毫米转换为米
  // 判断是否能达到最大速度
  if (平均距离 > 带载加速距离米 * 2) {
    // 如果能达到最大速度，时间 = 匀速运动时间 + 加速和减速时间
    带载时间值 =
      (平均距离 - 带载加速距离米 * 2) / 带载时PS速度 +
      (带载时PS速度 / 带载时PS加速度) * 2;
  } else {
    // 如果不能达到最大速度，时间 = 2 * sqrt(距离 / 加速度)
    带载时间值 = Math.sqrt(平均距离 / 带载时PS加速度) * 2;
  }
  带载进出时间单元格.textContent = 带载时间值.toFixed(3);

  // 计算“不带载进出升降机的时间”
  let 不带载时间值 = 0;
  const 不带载加速距离米 = 不带载加速距离 / 1000; // 将毫米转换为米

  // 判断是否能达到最大速度
  if (平均距离 > 不带载加速距离米 * 2) {
    // 如果能达到最大速度，时间 = 匀速运动时间 + 加速和减速时间
    不带载时间值 =
      (平均距离 - 不带载加速距离米 * 2) / 不带载时PS速度 +
      (不带载时PS速度 / 不带载时PS加速度) * 2;
  } else {
    // 如果不能达到最大速度，时间 = 2 * sqrt(距离 / 加速度)
    不带载时间值 = Math.sqrt(平均距离 / 不带载时PS加速度) * 2;
  }
  不带载进出时间单元格.textContent = 不带载时间值.toFixed(3);

  // 更新完第二个表格后，调用第三个表格的更新函数
  更新计算3();
}

//计算并更新提升时间表格。
function 更新提升时间表格() {
  // 清除现有的表格内容
  提升时间表格体.innerHTML = "";

  // 获取计算所需的参数
  const 货架层间距 = parseFloat(d9.textContent) || 0;
  const 升降机功率结果 = parseFloat(h3.textContent) || 0;
  const 提升速度 = parseFloat(d6.textContent) || 0;
  const 提升加速度 = parseFloat(d7.textContent) || 0;

  // 循环生成24行数据，从第2层到第25层
  for (let a = 2; a <= 25; a++) {
    const tr = document.createElement("tr");
    tr.classList.add("lifting-time-row");

    // 第1列: 起始层级
    let td1 = document.createElement("td");
    td1.classList.add("td-label-centered");
    td1.textContent = "1";

    // 第2列: 目标层级
    let td2 = document.createElement("td");
    td2.classList.add("td-label-centered");
    td2.textContent = a;

    // 第3列: 提升高度(m)
    let td3 = document.createElement("td");
    td3.classList.add("td-label-centered");
    const 提升高度 = ((a - 1) * 货架层间距) / 1000; // 将毫米转换为米
    td3.textContent = 提升高度.toFixed(3);

    // 第4列: 提升时间(s)
    let td4 = document.createElement("td");
    td4.classList.add("td-label-centered");
    td4.id = `liftingTime-${a}`; // 添加ID以便于查找
    let 提升时间;

    // 计算提升时间，与更新计算2的逻辑类似
    const 升降机距离米 = 升降机功率结果 / 1000; // 将毫米转换为米
    // 判断是否能达到最大速度
    if (提升高度 > 升降机距离米 * 2) {
      // 如果能达到最大速度，时间 = 匀速运动时间 + 加速和减速时间
      提升时间 =
        (提升高度 - 升降机距离米 * 2) / 提升速度 + (提升速度 / 提升加速度) * 2;
    } else {
      // 如果不能达到最大速度，时间 = 2 * sqrt(距离 / 加速度)
      提升时间 = Math.sqrt(提升高度 / 2 / (提升加速度 / 2)) * 2;
    }

    td4.textContent = 提升时间.toFixed(3);

    // 将所有单元格添加到行中
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    // 将行添加到表格体中
    提升时间表格体.appendChild(tr);
  }
}

//计算并更新第三组数据的值。
function 更新计算3() {
  // 获取用户输入的提升层级
  const 提升层级 = parseFloat(提升层级单元格.textContent) || 0;

  // 2. 提升时间
  // 根据输入的层级查找“提升高度和时间”表格中对应的提升时间
  const 提升时间来自表格 = document.getElementById(`liftingTime-${提升层级}`);
  if (提升时间来自表格) {
    const 提升时间效率 = parseFloat(提升时间来自表格.textContent) || 0;
    提升时间效率单元格.textContent = 提升时间效率.toFixed(3);
    下降时间单元格.textContent = 提升时间效率.toFixed(3); // 下降时间通常与提升时间相同
  } else {
    提升时间效率单元格.textContent = "N/A";
    下降时间单元格.textContent = "N/A";
  }

  // 3. 带载进出升降机时间
  const 带载时间值 = parseFloat(带载进出时间单元格.textContent) || 0;
  带载时间效率单元格.textContent = 带载时间值.toFixed(3);

  // 4. 不带载进出升降机时间
  const 不带载时间值 = parseFloat(不带载进出时间单元格.textContent) || 0;
  不带载时间效率单元格.textContent = 不带载时间值.toFixed(3);

  // 5. 抓取和放置时间
  // 固定值为 0
  抓取放置时间单元格.textContent = "0";

  // 6. 下降时间 - 同提升时间
  const 提升时间效率值 = parseFloat(提升时间效率单元格.textContent) || 0;
  下降时间单元格.textContent = 提升时间效率值.toFixed(3);

  // 7. 电气延迟时间*3
  // 固定值为 3s
  电气延迟单元格.textContent = "3";

  // 8. 位置锁定*3
  // 固定值为 9s
  位置锁定单元格.textContent = "9";

  // 9. 等待时间
  // 固定值为 15s
  等待时间单元格.textContent = "15";

  // 10. 效率比率
  const 效率比率 = parseFloat(效率比率单元格.textContent) || 0;

  // 11. 循环时间
  // 计算公式为：所有时间之和除以效率比率
  const 循环时间值 =
    ((提升时间效率值 +
      带载时间值 +
      不带载时间值 +
      0 +
      提升时间效率值 +
      3 +
      9 +
      15) /
      效率比率) *
    100;
  循环时间单元格.textContent = 循环时间值.toFixed(2);

  // 12. 托盘提升性能 (pph - pallets per hour)
  // 公式: 3600秒 / 循环时间
  const 托盘提升性能值 = Math.floor(3600 / 循环时间值);
  托盘提升性能单元格.textContent = 托盘提升性能值;

  // 13. 吞吐量需求
  const 吞吐量需求 = parseFloat(吞吐量需求单元格.textContent) || 0;

  // 14. 升降机数量
  // 公式: 吞吐量需求 / 托盘提升性能
  const 升降机数量值 = Math.ceil(吞吐量需求 / 托盘提升性能值);
  升降机数量单元格.textContent = 升降机数量值;
}

// 统一为所有可编辑单元格和下拉框添加事件监听器
editableCells.forEach((cell) => {
  cell.addEventListener("input", () => {
    // 根据id判断调用哪个计算函数
    if (["d6", "d7", "d9"].includes(cell.id)) {
      更新计算1();
    } else if (["l6", "l7", "avgDistance"].includes(cell.id)) {
      更新计算2();
    } else if (
      ["liftingLevels", "efficiencyRate", "throughputRequirement"].includes(
        cell.id
      )
    ) {
      更新计算3();
    }
    // 任何可编辑单元格输入变化后，将所有数据单元格保存到localStorage
    saveDataToLocalStorage();
  });
});

// 为下拉框单元格l4添加事件监听器
l4.addEventListener("change", () => {
  更新计算2();
  saveDataToLocalStorage();
});

// 为按钮1添加事件监听器
document.getElementById("calculatebutton1").addEventListener("click", () => {
  更新计算1();
  saveDataToLocalStorage();
});

//为按钮2添加事件监听器
document.getElementById("calculatebutton1").addEventListener("click", () => {
  更新计算3();
  saveDataToLocalStorage();
});

// 页面加载时执行的初始化逻辑
window.addEventListener("load", () => {
  // 尝试从localStorage加载数据
  loadDataFromLocalStorage();

  // 重新计算所有值以确保显示正确
  更新计算1();
  更新计算2();
  更新计算3();

  // 页面加载完成后，将当前所有数据单元格保存到localStorage
  saveDataToLocalStorage();
});
