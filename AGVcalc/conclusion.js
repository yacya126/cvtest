// 获取所有元素
{
    const g4 = document.getElementById("g4");
    const g5 = document.getElementById("g5");
    const g6 = document.getElementById("g6");
    const g7 = document.getElementById("g7");
    const g8 = document.getElementById("g8");
    const g9 = document.getElementById("g9");
    const g10 = document.getElementById("g10");
    const g11 = document.getElementById("g11");
    const g12 = document.getElementById("g12");
    const g13 = document.getElementById("g13");
    const g14 = document.getElementById("g14");
    const g15 = document.getElementById("g15");
    const g16 = document.getElementById("g16");
    const g17 = document.getElementById("g17");
    const g18 = document.getElementById("g18");
    const g19 = document.getElementById("g19");
    const g20 = document.getElementById("g20");
    const g21 = document.getElementById("g21");
    const g22 = document.getElementById("g22");
    const g26 = document.getElementById("g26");
    const g27 = document.getElementById("g27");
    const g28 = document.getElementById("g28");
    const calculatebutton1 = document.getElementById("calculatebutton1");
}

// 获取所有数据单元格的DOM对象，保存在数组中
const cells = [
    g4, g5, g6, g7, g8, g9, g10, g11, g12, g13,
    g14, g15, g16, g17, g18, g19, g20, g21, g22,
    g26, g27, g28
];

// 定义上述数据单元格的键值索引
const cellMap = {
    g4: 0,
    g5: 1,
    g6: 2,
    g7: 3,
    g8: 4,
    g9: 5,   // g9对应数组第5个元素
    g10: 6,
    g11: 7,
    g12: 8,
    g13: 9,
    g14: 10,
    g15: 11,
    g16: 12,
    g17: 13,
    g18: 14,  // g18对应数组第14个元素
    g19: 15,
    g20: 16,
    g21: 17,
    g22: 18,
    g26: 19,
    g27: 20,
    g28: 21
};

//#region 浏览器缓存处理逻辑
    // 获取所有标记为“data_cell”的单元格
    const dataCells = document.querySelectorAll('.data-cell');
    // 获取所有标记为“data_cell”的可编辑单元格
    const editableCells = document.querySelectorAll('[contenteditable="true"].data-cell');
    // 定义一个唯一的localStorage键
    const localStorageKey = 'conclusion_data_cells';

    // 保存所有数据单元格到localStorage
    function saveDataToLocalStorage() {
        const dataToSave = {};
        dataCells.forEach(cell => {
            if (cell.id) {
                dataToSave[cell.id] = cell.textContent;
            }
        });
        console.log('保存的数据:', dataToSave); // 保存时
        localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    }

    // 从localStorage加载数据并填充可编辑单元格
    function loadDataFromLocalStorage() {
        const savedData = localStorage.getItem(localStorageKey);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            console.log('获取了加载的数据:', parsedData); // 加载时
            editableCells.forEach(cell => {
                if (parsedData[cell.id] !== undefined) {
                    cell.textContent = parsedData[cell.id];
                }
            });
            return true;
        }
        return false;
}
//#endregion

//#region 计算工具函数
function getCellValue(cellName) {
    console.log(`开始获取单元格${cellName}的值`);

    // 检查依赖是否存在
    if (typeof cellMap === 'undefined') {
        console.error('cellMap未定义');
        return 0;
    }
    if (!Array.isArray(cells)) {
        console.error('cells不是有效的数组');
        return 0;
    }

    // 检查映射是否存在
    if (!cellMap.hasOwnProperty(cellName)) {
        console.warn(`不存在的单元格：${cellName}`);
        return 0;
    }
    console.log(`单元格${cellName}在cellMap中的索引为：${cellMap[cellName]}`);

    // 获取数组中对应的单元格
    const index = cellMap[cellName];

    // 检查索引是否有效
    if (index < 0 || index >= cells.length) {
        console.warn(`单元格${cellName}的索引${index}超出有效范围`);
        return 0;
    }

    const cell = cells[index];
    // 检查单元格是否有效
    if (!cell) {
        console.warn(`单元格${cellName}未找到`);
        return 0;
    }

    // 获取并清理单元格内容
    const cellContent = cell.textContent.trim();
    console.log(`单元格${cellName}的原始内容："${cellContent}"`);

    // 转换为数字（处理空值或非数字）
    const value = parseFloat(cellContent);

    // 检查转换结果
    if (isNaN(value)) {
        console.warn(`单元格${cellName}的内容"${cellContent}"无法转换为数字`);
        return 0;
    }
    if (!isFinite(value)) {
        console.warn(`单元格${cellName}的值为无穷大`);
        return 0;
    }

    console.log(`单元格${cellName}转换后的值：${value}`);
    return value;
}
function roundUp(value, decimals = 0) {
    console.log(`开始对值${value}进行向上取整，保留${decimals}位小数`);

    // 验证输入值是否为有效数字
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
        console.error(`无效的数值：${value}`);
        return 0;
    }

    // 处理小数位数
    const decimalNum = Math.floor(decimals); // 确保是整数
    if (decimalNum < 0) {
        console.error(`小数位数不能为负数，输入值：${decimals}`);
        throw new Error("小数位数不能为负数");
    }
    if (decimalNum !== decimals) {
        console.warn(`小数位数${decimals}不是整数，已自动转换为${decimalNum}`);
    }

    const multiplier = Math.pow(10, decimalNum);
    console.log(`计算乘数：10^${decimalNum} = ${multiplier}`);

    const intermediateValue = value * multiplier;
    console.log(`计算中间值：${value} * ${multiplier} = ${intermediateValue}`);

    const roundedValue = Math.ceil(intermediateValue);
    console.log(`向上取整后：${roundedValue}`);

    const result = roundedValue / multiplier;
    console.log(`最终结果：${roundedValue} / ${multiplier} = ${result}`);

    return result;
}
function cellsMathround(arrayName, ...args) {
    // 验证数组是否存在
    if (typeof window[arrayName] === 'undefined') {
        console.error(`错误：数组${arrayName}不存在，请检查数组名称是否正确`);
        return [];
    }

    const cells = window[arrayName];

    // 验证是否为数组
    if (!Array.isArray(cells)) {
        console.error(`错误：${arrayName}不是一个数组`);
        return [];
    }

    // 验证cellMap是否存在
    if (typeof cellMap === 'undefined') {
        console.error('错误：键值映射索引cellMap未定义');
        return cells;
    }

    // 验证cellMap是否为对象
    if (typeof cellMap !== 'object' || cellMap === null || Array.isArray(cellMap)) {
        console.error('错误：cellMap必须是一个非空对象');
        return cells;
    }

    // 解析参数对
    const targetElements = new Map();

    // 如果没有提供可选参数，默认对所有元素保留0位小数
    if (args.length === 0) {
        cells.forEach((_, index) => {
            targetElements.set(index, 0);
        });
        console.log(`未提供具体参数，将对数组${arrayName}中所有${cells.length}个元素四舍五入到0位小数`);
    } else {
        // 验证参数对数量是否为偶数
        if (args.length % 2 !== 0) {
            console.error(`错误：参数对数量不正确，期望偶数个参数，实际收到${args.length}个`);
            return cells;
        }

        // 处理参数对
        for (let i = 0; i < args.length; i += 2) {
            const elementKey = args[i];
            const decimalPlaces = args[i + 1];

            // 验证小数位数是否为非负整数
            if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0) {
                console.error(`错误：小数位数必须是非负整数，参数对(${elementKey}, ${decimalPlaces})无效`);
                continue;
            }

            // 确定元素索引
            let index;
            if (Number.isInteger(elementKey)) {
                // 直接使用数字作为索引
                index = elementKey;
            } else if (typeof elementKey === 'string') {
                // 尝试从cellMap中获取索引
                if (cellMap.hasOwnProperty(elementKey)) {
                    index = cellMap[elementKey];
                    if (!Number.isInteger(index) || index < 0) {
                        console.error(`错误：cellMap中${elementKey}对应的索引${index}无效`);
                        continue;
                    }
                } else {
                    console.error(`错误：cellMap中不存在${elementKey}的映射`);
                    continue;
                }
            } else {
                console.error(`错误：元素标识${elementKey}类型无效，必须是整数索引或字符串映射键`);
                continue;
            }

            // 验证索引是否在有效范围内
            if (index < 0 || index >= cells.length) {
                console.error(`错误：元素索引${index}超出数组范围[0, ${cells.length - 1}]`);
                continue;
            }

            // 验证数组元素是否为DOM对象
            if (!(cells[index] instanceof HTMLElement)) {
                console.error(`错误：数组索引${index}处的元素不是有效的DOM对象`);
                continue;
            }

            // 存储目标元素及其要保留的小数位数
            targetElements.set(index, decimalPlaces);
            console.log(`将处理数组索引${index}处的元素，保留${decimalPlaces}位小数`);
        }
    }

    // 对目标元素进行四舍五入处理
    targetElements.forEach((decimalPlaces, index) => {
        try {
            // 假设DOM元素有一个存储数值的自定义属性data-value
            const valueStr = cells[index].getAttribute('data-value');

            if (valueStr === null) {
                console.warn(`警告：索引${index}处的DOM元素没有data-value属性，无法进行四舍五入处理`);
                return;
            }

            const value = parseFloat(valueStr);

            if (isNaN(value)) {
                console.error(`错误：索引${index}处的data-value值"${valueStr}"无法转换为有效数字`);
                return;
            }

            // 执行四舍五入操作
            const roundedValue = Math.round(value * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

            // 更新DOM元素的data-value属性（不修改textContent或value）
            cells[index].setAttribute('data-value', roundedValue.toString());
            console.log(`成功：索引${index}处的数值${value}已四舍五入为${roundedValue}（保留${decimalPlaces}位小数）`);
        } catch (error) {
            console.error(`处理索引${index}处的元素时发生错误：${error.message}`);
        }
    });

    // 返回更新后的数组
    return cells;
}
//#endregion 计算工具函数



// 表格计算函数
function calculateAll() {
        // 1. 获取所有需要的单元格数值（带容错处理）
        const g8 = getCellValue("g8");
        const g9 = getCellValue("g9");
        const g10 = getCellValue("g10");
        const g11 = getCellValue("g11");
        const g17 = getCellValue("g17");
        const g18 = getCellValue("g18");

        // 2. 计算G14: ROUNDUP(G17/G8*G10/3600,0)
        let g14Result = 0;
        if (g8 !== 0) { // 避免除数为0
            g14Result = roundUp((g17 / g8) * g10 / 3600, 0);
        } else {
            console.warn("计算G14时，G8的值为0，无法进行除法运算");
        }

        // 3. 计算G15: ROUNDUP(G18/G9*G11/3600,0)
        let g15Result = 0;
        if (g9 !== 0) { // 避免除数为0
            g15Result = roundUp((g18 / g9) * g11 / 3600, 0);
        } else {
            console.warn("计算G15时，G9的值为0，无法进行除法运算");
        }

        // 4. 计算G16: ROUNDUP(G14+G15,0)
        const g16Result = roundUp(g14Result + g15Result, 0);

        // 5. 计算G19: G17/G8*1.5
        let g19Result = 0;
        if (g8 !== 0) {
            g19Result = (g17 / g8) * 1.5;
        } else {
            console.warn("计算G19时，G8的值为0，无法进行除法运算");
        }

        // 6. 计算G20: G18/G9*1.5
        let g20Result = 0;
        if (g9 !== 0) {
            g20Result = (g18 / g9) * 1.5;
        } else {
            console.warn("计算G20时，G9的值为0，无法进行除法运算");
        }

        // 7. 计算G21: G17/G8
        let g21Result = 0;
        if (g8 !== 0) {
            g21Result = g17 / g8;
        } else {
            console.warn("计算G21时，G8的值为0，无法进行除法运算");
        }

        // 8. 计算G22: G18/G9
        let g22Result = 0;
        if (g9 !== 0) {
            g22Result = g18 / g9;
        } else {
            console.warn("计算G22时，G9的值为0，无法进行除法运算");
        }

        // 9. （可选）将计算结果写回DOM元素
        const setResult = (cellId, value) => {
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.textContent = value;
            }
        };

        setResult("g14", g14Result);
        setResult("g15", g15Result);
        setResult("g16", g16Result);
        setResult("g19", g19Result);
        setResult("g20", g20Result);
        setResult("g21", g21Result);
        setResult("g22", g22Result);

        // 返回所有计算结果（便于调试或后续使用）
        return {
            g14: g14Result,
            g15: g15Result,
            g16: g16Result,
            g19: g19Result,
            g20: g20Result,
            g21: g21Result,
            g22: g22Result
        };
    }
    // 执行计算
    calculateAll();


// 监视按钮点击时
calculatebutton1.addEventListener('click' , () => {
    calculateAll();
    saveDataToLocalStorage();
});

// 统一为所有可编辑单元格和下拉框添加事件监听器
editableCells.forEach(cell => {
    cell.addEventListener('input', () => {
        更新计算1();
        // 任何可编辑单元格输入变化后，将所有数据单元格保存到localStorage
        saveDataToLocalStorage();
    });
});


// 页面加载时执行的初始化逻辑
window.addEventListener('load', () => {
    // 尝试从localStorage加载数据
    const hasLoaded = loadDataFromLocalStorage();
    // 页面加载完成后，将当前所有数据单元格保存到localStorage
    saveDataToLocalStorage();
});
