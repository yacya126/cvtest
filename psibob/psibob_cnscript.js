// 获取所有标记为“data_cell”的单元格
const dataCells = document.querySelectorAll('.data-cell');

// 定义一个唯一的localStorage键
const localStorageKey = 'psibob_data_cells';

// 获取所有可编辑单元格，并为它们添加事件监听器
const editableCells = document.querySelectorAll('[contenteditable="true"].data-cell');

// 定义各型号PS的参数数据（保持不变）
const 参数数据 = {
    "PS1500A": {
        "Max. speed with load": 1.2,
        "Max. acce speed with load": 0.3,
        "Max. speed without load": 1.5,
        "Max. acce speed without load": 2,
        "PS turning time within loading": 3.5,
        "PS turning time without loading": 2.5,
        "PS lifting time": 2.5
    },
    "PS1500B": {
        // 与PS1500A相同
        "Max. speed with load": 1.2,
        "Max. acce speed with load": 0.3,
        "Max. speed without load": 1.5,
        "Max. acce speed without load": 2,
        "PS turning time within loading": 3.5,
        "PS turning time without loading": 2.5,
        "PS lifting time": 2.5
    },
    "PS1500C": {
        // 与PS1500A相同
        "Max. speed with load": 1.2,
        "Max. acce speed with load": 0.3,
        "Max. speed without load": 1.5,
        "Max. acce speed without load": 2,
        "PS turning time within loading": 3.5,
        "PS turning time without loading": 2.5,
        "PS lifting time": 2.5
    },
    "PS1500AC": {
        // 与PS1500A类似，但无负载最大加速度不同
        "Max. speed with load": 1.2,
        "Max. acce speed with load": 0.3,
        "Max. speed without load": 1.5,
        "Max. acce speed without load": 1,
        "PS turning time within loading": 3.5,
        "PS turning time without loading": 2.5,
        "PS lifting time": 2.5
    },
    "PS1500BC": {
        // 与PS1500AC相同
        "Max. speed with load": 1.2,
        "Max. acce speed with load": 0.3,
        "Max. speed without load": 1.5,
        "Max. acce speed without load": 1,
        "PS turning time within loading": 3.5,
        "PS turning time without loading": 2.5,
        "PS lifting time": 2.5
    },
    "PS1200DC": {
        // 与PS1500AC相同
        "Max. speed with load": 1.2,
        "Max. acce speed with load": 0.3,
        "Max. speed without load": 1.5,
        "Max. acce speed without load": 1,
        "PS turning time within loading": 3.5,
        "PS turning time without loading": 2.5,
        "PS lifting time": 2.5
    }
};

// 获取各单元格元素（保持不变），集中管理
{
    const c4 = document.getElementById('c4');
    const c5 = document.getElementById('c5');
    const c6 = document.getElementById('c6');
    const c7 = document.getElementById('c7');
    const c8 = document.getElementById('c8');
    const c9 = document.getElementById('c9');
    const c10 = document.getElementById('c10');
    const c11 = document.getElementById('c11');
    const c14 = document.getElementById('c14');
    const c15 = document.getElementById('c15');
    const c16 = document.getElementById("c16");
    const c17 = document.getElementById("c17");
    const c18 = document.getElementById("c18");
    const c19 = document.getElementById("c19");
    const c20 = document.getElementById("c20");
    const c21 = document.getElementById("c21");
    const c22 = document.getElementById("c22");
    const j4 = document.getElementById("j4");
    const j5 = document.getElementById("j5");
    const j6 = document.getElementById("j6");
    const j7 = document.getElementById("j7");
    const j8 = document.getElementById("j8");
    const j9 = document.getElementById("j9");
    const j10 = document.getElementById("j10");
    const j11 = document.getElementById("j11");
    const j12 = document.getElementById("j12");
    const j13 = document.getElementById("j13");
    const j14 = document.getElementById("j14");
    const j15 = document.getElementById("j15");
    const j16 = document.getElementById("j16");
    const j17 = document.getElementById("j17");
    const j18 = document.getElementById("j18");
    const j19 = document.getElementById("j19");
    const j21 = document.getElementById("j21");
    const j22 = document.getElementById("j22");
    const j23 = document.getElementById("j23");
    const j24 = document.getElementById("j24");
    const j26 = document.getElementById("j26");
    const q4 = document.getElementById("q4");
    const q5 = document.getElementById("q5");
    const q6 = document.getElementById("q6");
    const q7 = document.getElementById("q7");
    const q8 = document.getElementById("q8");
    const q9 = document.getElementById("q9");
    const q10 = document.getElementById("q10");
    const q11 = document.getElementById("q11");
    const q12 = document.getElementById("q12");
    const q13 = document.getElementById("q13");
    const q14 = document.getElementById("q14");
    const q15 = document.getElementById("q15");
    const q16 = document.getElementById("q16");
}

// 保存所有数据单元格到localStorage
function saveDataToLocalStorage() {
    const dataToSave = {};
    // 遍历所有数据单元格，包括可编辑和不可编辑的
    dataCells.forEach(cell => {
        if (cell.id) {
            dataToSave[cell.id] = cell.textContent;
        }
    });

    // 专门处理下拉框的值
    if (c4) {
        dataToSave[c4.id] = c4.value;
    }

    localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
}

// 从localStorage加载数据并填充可编辑单元格
function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        editableCells.forEach(cell => {
            if (parsedData[cell.id] !== undefined) {
                cell.textContent = parsedData[cell.id];
            }
        });

        // 专门处理下拉框的加载
        if (c4 && parsedData[c4.id] !== undefined) {
            c4.value = parsedData[c4.id];
        }

        return true;
    }
    return false;
}


// 从localStorage获取LiftRail页面的数据
function getLiftRailData() {
    const savedData = localStorage.getItem('liftrail_data_cells');
    if (savedData) {
        try {
            // 将JSON字符串解析为JavaScript对象
            return JSON.parse(savedData);
        } catch (e) {
            console.error("无法解析来自localStorage的数据:", e);
            return null;
        }
    }
    return null; // 如果没有数据，返回null
}

// 从localStorage获取LiftCV页面的数据
function getLiftCVData() {
    const savedData = localStorage.getItem('liftcv_data_cells');
    if (savedData) {
        try {
            // 将JSON字符串解析为JavaScript对象
            return JSON.parse(savedData);
        } catch (e) {
            console.error("无法解析来自localStorage的数据:", e);
            return null;
        }
    }
    return null; // 如果没有数据，返回null
}

// 定义更新表格数据的函数（保持不变）
function 更新表格数据(){
    const 当前c4数据 = c4.value;
    if (当前c4数据 === "PS1500A" || 当前c4数据 === "PS1500B" || 当前c4数据 === "PS1500C") {
        c8.textContent = 2;
    }
    else {
        c8.textContent = 1;
    }
    更新最大荷载_无荷载距离(); // 更新距离计算,包括提升机进出时间和ReshufflingEfficiency参数和PS性能参数
}
function 更新最大荷载_无荷载距离() {
    // 直接从数据源获取当前型号的最新参数
    const c5value = parseFloat(c5.textContent);
    const c6value = parseFloat(c6.textContent);
    const c7value = parseFloat(c7.textContent);
    const c8value = parseFloat(c8.textContent);
    // 计算距离（公式不变）
    let c14value = (c5value * c5value) / (2 * c6value) * 1000;
    let c15value = (c7value * c7value) / (2 * c8value) * 1000;
    // 更新DOM显示
    c14.textContent = c14value;
    c15.textContent = c15value;
    更新提升机进出时间(); // 更新提升机进出时间计算
    更新ReshufflingEfficiency参数(); // 更新ReshufflingEfficiency参数计算
    更新PS性能参数(); // 更新PS性能参数计算
}

function 更新提升机进出时间() {
    const c5value = parseFloat(c5.textContent);
    const c6value = parseFloat(c6.textContent);
    const c7value = parseFloat(c7.textContent);
    const c8value = parseFloat(c8.textContent);
    const c14value = parseFloat(c14.textContent);
    const c15value = parseFloat(c15.textContent);
    const c16value = parseFloat(c16.textContent);
    const c17value = parseFloat(c17.textContent);
    const c18value = parseFloat(c18.textContent);

    let c21value = (
        (c16value > c14value / 1000 * 2)
            ? (c16value - c14value * 2 / 1000) / c5value + c5value / c6value * 2  // IF条件为真时的结果
            : Math.sqrt(c16value / 2 * 2 / c6value) * 2            // IF条件为假时的结果
    ) + c17value;  // 明确C17是额外添加的项

    // 计算c22：IF条件结果 + 额外的c18
    let c22value = (
        (c16value > c15value / 1000 * 2)
            ? (c16value - c15value * 2 / 1000) / c7value + c7value / c8value * 2  // IF条件为真时的结果
            : Math.sqrt(c16value / 2 * 2 / c8value) * 2            // IF条件为假时的结果
    ) + c18value;  // 明确C18是额外添加的项
    c21.textContent = c21value.toFixed(3);
    c22.textContent = c22value.toFixed(3);
}

function 更新ReshufflingEfficiency参数() {
    //定义各单元格元素值的变量
    const c5value = parseFloat(c5.textContent);
    const c6value = parseFloat(c6.textContent);
    const c7value = parseFloat(c7.textContent);
    const c8value = parseFloat(c8.textContent);
    const c11value = parseFloat(c11.textContent);
    const q4value = parseFloat(q4.textContent);
    const q5value = parseFloat(q5.textContent);
    const q6value = parseFloat(q6.textContent);
    const q7value = parseFloat(q7.textContent);
    const q8value = parseFloat(q8.textContent);
    const q9value = parseFloat(q9.textContent);
    const q10value = parseFloat(q10.textContent);
    let q11value = parseFloat(q11.textContent);
    let q12value = parseFloat(q12.textContent);
    let q13value = parseFloat(q13.textContent);
    const q14value = parseFloat(q14.textContent);
    const q15value = parseFloat(q15.textContent);
    let q16value = parseFloat(q16.textContent);

    let liftrail_h6value;
    let liftrail_h8value;

    //定义来自liftrail页面的数据常量
    const liftrailData = getLiftRailData();

    if (liftrailData?.h6 !== undefined) {
        // 如果liftrailData不是null，则安全地获取h6和h8的值
        liftrail_h6value = parseFloat(liftrailData.h6) || 0;
    } else {
        // 如果liftrailData是null（没有缓存），可以为变量提供默认值
        console.warn("无法从 localStorage 中找到 liftrail 数据，使用默认值。");
        liftrail_h6value = 2400;
    }
    if (liftrailData?.h8 !== undefined) {
        // 如果liftrailData不是null，则安全地获取h6和h8的值
        liftrail_h8value = parseFloat(liftrailData.h8) || 0;
    } else {
        // 如果liftrailData是null（没有缓存），可以为变量提供默认值
        console.warn("无法从 localStorage 中找到 liftrail 数据，使用默认值。");
        liftrail_h8value = 2400;
    }

    //计算q11的值
    q11value = (q6value - liftrail_h6value / 1000 * 2 * q8value) / c5value + (q8value * c5value / c6value * 2);
    //计算q12的值
    q12value = (q7value - liftrail_h8value * 2 / 1000) / c7value + (q9value * c7value / c8value * 2);
    //计算q13的值
    q13value = q10value * c11value;
    //计算q16的值
    q16value = (q11value + q12value + q13value) / (q14value/100) / (q15value/100) * q4value * (q5value/100);
    //呈现
    q11.textContent = q11value.toFixed(0);
    q12.textContent = q12value.toFixed(0);
    q13.textContent = q13value.toFixed(0);
    q16.textContent = q16value.toFixed(1);
    //修改了q16，是PS性能参数的依赖，所以更新PS性能参数
    更新PS性能参数();
}

//更新PS性能参数的函数
function 更新PS性能参数() {
    const c5value = parseFloat(c5.textContent);
    const c6value = parseFloat(c6.textContent);
    const c7value = parseFloat(c7.textContent);
    const c8value = parseFloat(c8.textContent);
    const c9value = parseFloat(c9.textContent);
    const c10value = parseFloat(c10.textContent);
    const c11value = parseFloat(c11.textContent);
    const c14value = parseFloat(c14.textContent);
    const c15value = parseFloat(c15.textContent);
    const j4value = parseFloat(j4.textContent);
    const j5value = parseFloat(j5.textContent);
    const j6value = parseFloat(j6.textContent);
    const j7value = parseFloat(j7.textContent);
    const j8value = parseFloat(j8.textContent);
    let j9value = parseFloat(j9.textContent);
    let j10value = parseFloat(j10.textContent);
    let j11value = parseFloat(j11.textContent);
    let j12value = parseFloat(j12.textContent);
    let j13value = parseFloat(j13.textContent);
    const j14value = parseFloat(j14.textContent);
    const j15value = parseFloat(j15.textContent);
    let j16value = parseFloat(j16.textContent);
    let j17value = parseFloat(j17.textContent);
    let j18value = parseFloat(j18.textContent);
    let j19value = parseFloat(j19.textContent);
    const j21value = parseFloat(j21.textContent);
    const j22value = parseFloat(j22.textContent);
    let j23value = parseFloat(j23.textContent);
    let j24value = parseFloat(j24.textContent);
    let j26value = parseFloat(j26.textContent);
    const q16value = parseFloat(q16.textContent);
    //定义来自liftcv页面的数据变量
    const liftcvData = getLiftCVData();
    //定义liftcv页面的d51单元格的值
    let liftcv_d51value;

    if (liftcvData?.cycleTime !== undefined) {
        liftcv_d51value = parseFloat(liftcvData.cycleTime) || 0;
    } else {
        liftcv_d51value = 134.68;
    }
    // 这里可以添加对这些值的进一步处理或计算
    j9value = (j4value - c14value / 1000 * 2 * j6value) / c5value + j6value * c5value / c6value * 2;
    j10value = (j5value - c15value / 1000 * 2 * j7value) / c7value + j7value * c7value / c8value * 2;
    j11value = j6value * c9value;
    j12value = j7value * c10value;
    j13value = j8value * c11value;
    j16value = liftcv_d51value;
    j17value = (j9value + j10value + j11value + j12value + j13value) / (j14value/100) / (j15value/100) + j16value;
    j18value = (3600 / j17value).toFixed(1);
    j19value = (3600 / (j17value + q16value)).toFixed(1);
    j23value = j21value / j18value;
    j24value = j22value / j19value;
    j26value = Math.ceil(1.1 * (j23value + j24value));
    //呈现
    j9.textContent = j9value.toFixed(0);
    j10.textContent = j10value.toFixed(0);
    j11.textContent = j11value;
    j12.textContent = j12value;
    j13.textContent = j13value;
    j16.textContent = j16value.toFixed(2);
    j17.textContent = j17value.toFixed(0);
    j18.textContent = j18value;
    j19.textContent = j19value;
    j23.textContent = j23value.toFixed(1);
    j24.textContent = j24value.toFixed(1);
    j26.textContent = j26value;
}

//监视所有可编辑单元格的变化
editableCells.forEach(cell => {
    cell.addEventListener('input', () => {
        // 根据单元格ID的首字母，自动调用相应的函数
        const idPrefix = cell.id.charAt(0);
        switch (idPrefix) {
            case 'c':
                // 其他c系列单元格
                更新提升机进出时间();
                break;
            case 'j':
                更新PS性能参数();
                break;
            case 'q':
                更新ReshufflingEfficiency参数();
                break;
        }
        // 任何变化后都保存数据到localStorage
        saveDataToLocalStorage();
    });
});

// 针对特殊的下拉框c4，单独添加change事件监听
c4.addEventListener('change', () => {
    更新表格数据();
    saveDataToLocalStorage();
});

//针对第一个按钮执行强制事件监听
document.getElementById('calculatebutton1').addEventListener('click', () => {
    更新表格数据();
    saveDataToLocalStorage();
});
//针对第二个按钮执行强制事件监听
document.getElementById('calculatebutton2').addEventListener('click', () => {
    更新ReshufflingEfficiency参数();
    saveDataToLocalStorage();
});
//针对第三个按钮执行强制事件监听
document.getElementById('calculatebutton3').addEventListener('click', () => {
    更新PS性能参数();
    saveDataToLocalStorage();
});
// 页面加载时执行的初始化逻辑
window.addEventListener('load', () => {
    // 尝试从localStorage加载数据
    loadDataFromLocalStorage();

    // 重新计算所有值以确保显示正确
    更新表格数据();
    更新最大荷载_无荷载距离(); //包含提升机进出时间和ReshufflingEfficiency参数和PS性能参数

    // 页面加载完成后，将当前所有数据单元格保存到localStorage
    saveDataToLocalStorage();
});