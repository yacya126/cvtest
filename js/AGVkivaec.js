const TABLE_ID = 'data-table';
const rowHtmlContent = `
<td class="data-cell td-label-centered td-row-number"></td>
<td class="data-cell td-input" contenteditable="true"></td>
<td class="data-cell td-input" contenteditable="true"></td>
<td class="data-cell td-input" contenteditable="true"></td>
<td class="data-cell td-label-centered"></td>
<td class="data-cell td-input" contenteditable="true"></td>
<td class="data-cell td-label-centered"></td>
<td class="data-cell td-label-centered"></td>
<td class="data-cell td-input" contenteditable="true"></td>
<td class="data-cell td-label-centered"></td>
<td class="data-cell td-input" contenteditable="true"></td>
<td class="data-cell td-input" contenteditable="true"></td>
<td class="data-cell td-label-centered"></td>
<td class="data-cell td-label-centered"></td>
<td class="data-cell td-label-centered"></td>
<td class="data-cell td-label-centered"></td>
<td class="data-cell td-label-centered"></td>
`;
const dataTableManager = new DataTableManager(TABLE_ID, rowHtmlContent);

//获取所有元素
const hiddenshowbutton = document.getElementById("hiddenshowbutton");
const basicinformationtable = document.getElementById("basicinformationtable");
// 为按钮添加点击事件监听器
hiddenshowbutton.addEventListener("click", function () {
	basicinformationtable.classList.toggle("hidden");
});

// 全局常量：浏览器缓存键值
const USER_MODEL_STORAGE_KEY = "userSelectedModel";
// 全局变量：存储当前激活的模型（T800 或 T800CE），初始值可以设为 null 或一个默认值
let currentSelectedModel = null;

function clearHighlight() {
	// ... 清除所有高亮和状态的逻辑 (与您之前的代码相同) ...
	const table = document.getElementById("basicinformationtable_show");
	if (!table) return;
	const allDataCells = table.querySelectorAll(".data-col-1, .data-col-2");
	allDataCells.forEach((cell) => {
		cell.style.backgroundColor = "";
	});
	try {
		document.getElementById("col_A42").style.backgroundColor = "";
	} catch (e) {}
	try {
		document.getElementById("col_A42T").style.backgroundColor = "";
	} catch (e) {}
	document.getElementById("button-T800").classList.remove("active-highlight");
	document.getElementById("button-T800CE").classList.remove("active-highlight");
}

function highlightColumn(columnKey) {
	const table = document.getElementById("basicinformationtable_show");
	const btnT800 = document.getElementById("button-T800");
	const btnT800CE = document.getElementById("button-T800CE");
	const btnT1000 = document.getElementById("button-T1000");
	const btnT1500 = document.getElementById("button-T1500");
	if (!table || !btnT800 || !btnT800CE || !btnT1000 || !btnT1500) return;

	// 1. 显示表格
	table.style.display = "hidden";
	// 2. 清除高亮
	clearHighlight();
	// 3. 确定目标
	let targetClass = "";
	let headerId = "";
	let activeButton = null;

	if (columnKey === "T800") {
		//targetClass = ".data-col-1";
		headerId = "col_A42";
		activeButton = btnT800;
	} else if (columnKey === "T800CE") {
		//targetClass = ".data-col-2";
		headerId = "col_A42T";
		activeButton = btnT800CE;
	} else if (columnKey === "T1000") {
		//targetClass = ".data-col-1";
		activeButton = btnT1000;
	} else if (columnKey === "T1500") {
		activeButton = btnT1500;
	} else {
		localStorage.removeItem(USER_MODEL_STORAGE_KEY);
		currentSelectedModel = null;
		return;
	}
	// 5. 存储和更新全局变量 🌟
	localStorage.setItem(USER_MODEL_STORAGE_KEY, columnKey);
	currentSelectedModel = columnKey;
	// 6. 激活按钮样式
	activeButton.classList.add("active-highlight");
	const currentChoicedmodel = document.getElementById("currentchoicedmodel");
	currentChoicedmodel.textContent = currentSelectedModel;
}

function restoreUserSelection() {
	const storedModel = localStorage.getItem(USER_MODEL_STORAGE_KEY);
	// 如果有缓存，调用核心函数恢复状态
	if (storedModel) {
		highlightColumn(storedModel);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 获取dom元素
const calculateTableBody = document.getElementById("calculateTableBody");
const calculateTableFoot = document.getElementById("calculateTableFoot");
const buttonaddline = document.getElementById("button-addline");
const buttondeleteline = document.getElementById("button-deleteline");
const buttontest = document.getElementById("button-test");

// 行号处理
function updateRowNumbers() {
	const rows = calculateTableBody.children;
	// console.log(rows[2]);
	// 遍历每一行，i 是从 0 开始的索引
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		if (row.children.length > 0) {
			const firstCell = row.children[0];
			firstCell.textContent = i + 1;
		}
	}
	//每次处理完行号必须进行行内计算和全局计算
	calculateAllRowSubtotals();
	//行内计算已包含全局计算calculateTableTotal();
}
// 增行函数
function createNewLine() {
	console.log(calculateTableBody);
	const newLine = document.createElement("tr");
	const numberCell = document.createElement("td");
	numberCell.className = "td-label-centered td-row-number";
	numberCell.textContent = "...";
	const rowContent = `
			<td class="td-label-centered td-row-number"></td>
			<td class="td-input" contenteditable="true"></td>
			<td class="td-input" contenteditable="true"></td>
			<td class="td-input" contenteditable="true"></td>
			<td class="td-label-centered"></td>
			<td class="td-input" contenteditable="true"></td>
			<td class="td-label-centered"></td>
			<td class="td-label-centered"></td>
			<td class="td-input" contenteditable="true"></td>
			<td class="td-label-centered"></td>
			<td class="td-input" contenteditable="true"></td>
			<td class="td-input" contenteditable="true"></td>
			<td class="td-label-centered"></td>
			<td class="td-label-centered"></td>
			<td class="td-label-centered"></td>
			<td class="td-label-centered"></td>
			<td class="td-label-centered"></td>
							
        `;
	newLine.innerHTML = rowContent;
	calculateTableBody.appendChild(newLine);
	updateRowNumbers();
}
// 删行函数
function deleteLastLine() {
	const rowCount = calculateTableBody.children.length;
	if (rowCount > 2) {
		calculateTableBody.removeChild(calculateTableBody.lastElementChild);
	} else {
		console.log("error");
	}
}

// 行内计算函数
function calculateAllRowSubtotals() {
	const allRows = calculateTableBody.children;
	for (const row of allRows) {
		calculateRowSubtotal(row);
	}
	// 行内计算完毕后必须全局计算
	calculateTableTotal();
}

//定义第14行数据
const D14 = [1.30,1.30,1.00,1.00];
const E14 = [0.60,0.60,0.60,0.60];
const F14 = [0.60,0.60,0.60,0.60];
const G14 = [2.177777,2.177777,1.677777,1.677777];
const H14 = [2.177777,2.177777,1.677777,1.677777];
const I14 = [1.408333,1.408333,0.833333,0.833333];
const J14 = [1.408333,1.408333,0.833333,0.833333];
const K14 = [2.50,3.00,3.00,3.50];
const L14 = [4.00,5.00,5.00,5.50];
const M14 = [2.50,4.00,4.00,4.50];
const N14 = [2.50,3.00,4.00,5.00];
const O14 = [0.85,0.85,0.85,0.85];
const P14 = [0.17,0.17,0.17,0.17];
const Q14 = [0.80,0.80,0.80,0.80];

//映射
const arrayMap = {
    "D14": D14,
    "E14": E14,
    "F14": F14,
    "G14": G14,
    "H14": H14,
    "I14": I14,
    "J14": J14,
    "K14": K14,
    "L14": L14,
    "M14": M14,
    "N14": N14,
    "O14": O14,
    "P14": P14,
    "Q14": Q14,
};

function getValueFromArrays(arrayName, type) {
    const array = arrayMap[arrayName];
    // 检查数组是否存在
    if (!array) {
        console.error(`Error: Array with name "${arrayName}" not found.`);
        return undefined; 
    }
    // 检查索引是否有效 (0, 1, 2, 3)
    if (type < 0 || type >= array.length) {
        console.error(`Error: Invalid type index ${type} for array "${arrayName}".`);
        return undefined;
    }
    // 返回对应索引的值
    return array[type];
};

// 行内计算的业务逻辑
function calculateRowSubtotal(row) {
	const cells = row.children;
	const models = localStorage.getItem("userSelectedModel");
	let models_type;
	switch(models){
		case "T800":
			models_type=0;
			break;
		case "T800CE":
			models_type=1;
			break;
		case "T1000":
			models_type=2;
			break;
		case "T1500":
			models_type=3;
			break;
		default:
			console.log("NO MODEL");
			break;
	};
	const D = cells[2];
	const E = cells[3];
	const F = cells[4];
	const G = cells[5];
	const H = cells[6];
	const I = cells[7];
	const J = cells[8];
	const K = cells[9];
	const L = cells[10];
	const M = cells[11];
	const N = cells[12];
	const O = cells[13];
	const P = cells[14];
	const Q = cells[15];
	const R = cells[16];
	const D14 = getValueFromArrays("D14", models_type);
	const E14 = getValueFromArrays("E14", models_type);
	const F14 = getValueFromArrays("F14", models_type);
	const G14 = getValueFromArrays("G14", models_type);
	const H14 = getValueFromArrays("H14", models_type);
	const I14 = getValueFromArrays("I14", models_type);
	const J14 = getValueFromArrays("J14", models_type);
	const K14 = getValueFromArrays("K14", models_type);
	const L14 = getValueFromArrays("L14", models_type);
	const M14 = getValueFromArrays("M14", models_type);
	const N14 = getValueFromArrays("N14", models_type);
	const O14 = getValueFromArrays("O14", models_type);
	const P14 = getValueFromArrays("P14", models_type);
	const Q14 = getValueFromArrays("Q14", models_type);
	//计算F值
	Fjieguo = D14/E14+D14/F14+(parseFloat(E.textContent)-(D14/E14+D14/F14)*D14/2)/D14;
	F.textContent = Fjieguo.toFixed(1);
	//计算H值
	Hjieguo = parseFloat(G.textContent)*(G14+H14+K14);
	H.textContent = Hjieguo.toFixed(1);
	//计算I值
	Ijieguo = Fjieguo+Hjieguo;
	I.textContent = Ijieguo.toFixed(2);
	//计算K值
	Kjieguo = (M14+G14+H14+N14) * parseFloat(J.textContent);
	K.textContent = Kjieguo.toFixed(1);
	//计算N值
	Njieguo = Ijieguo+Kjieguo+parseFloat(L.textContent)+parseFloat(M.textContent);
	N.textContent = Njieguo.toFixed(1);
	//计算O值
	Ojieguo = 3600 / Njieguo * 0.8;
	O.textContent = Ojieguo.toFixed(1);
    //计算P值
	Pjieguo = Ojieguo * 0.85;
	P.textContent = Pjieguo.toFixed(1);
	//计算Q值
	Qjieguo = parseFloat(D.textContent) / Pjieguo;
	Q.textContent = Qjieguo.toFixed(1);
	//计算R值
	Rjieguo = Qjieguo * 0.177777;
	R.textContent = Rjieguo.toFixed(1);
};

function calculateColumn16Sum() {
	const tableBody = document.getElementById("calculateTableBody");
	if (!tableBody) {
		console.error("错误：未找到 id='calculateTableBody' 的元素。");
		return null;
	}
	let sum_1 = 0;
	const targetColumnIndex = 15;
	const rows = tableBody.rows;
	const numberRegex = /^\s*(-?\d+(\.\d+)?)\s*$/;
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		if (row.cells.length <= targetColumnIndex) {
			console.error(
				`错误：第 ${i + 1} 行的单元格数量不足 ${targetColumnIndex + 1} 个。`
			);
			return null;
		}
		// 获取目标单元格
		const D = row.cells[2];
		const P = row.cells[14];
		console.log("aaa" + D.textContent);
		console.log("aaa" + P.textContent);
		const numberValue = parseFloat(D.textContent) / parseFloat(P.textContent);
		sum_1 += numberValue;
	}
	console.log(`第16列的总和 SUM_1 为: ${sum_1}`);
	return sum_1;
}

function calculateColumn17Sum() {
	const tableBody = document.getElementById("calculateTableBody");
	if (!tableBody) {
		console.error("错误：未找到 id='calculateTableBody' 的元素。");
		return null;
	}
	let sum_1 = 0;
	const targetColumnIndex = 16;
	const rows = tableBody.rows;
	const numberRegex = /^\s*(-?\d+(\.\d+)?)\s*$/;
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		if (row.cells.length <= targetColumnIndex) {
			console.error(
				`错误：第 ${i + 1} 行的单元格数量不足 ${targetColumnIndex + 1} 个。`
			);
			return null;
		}
		// 获取目标单元格
		const Q = row.cells[15];
		console.log("aaa" + Q.textContent);
		const numberValue = parseFloat(Q.textContent) * 0.17;
		sum_1 += numberValue;
	}
	console.log(`第17列的总和 SUM_1 为: ${sum_1}`);
	return sum_1;
}

// 跨行计算的业务逻辑
function calculateTableTotal() {
	if (calculateTableFoot && calculateTableFoot.rows.length > 0) {
		const footrow = calculateTableFoot.rows[0];
		const allCells = footrow.getElementsByTagName("td");
		if (allCells.length === 17) {
			const Q = allCells[15];
			const R = allCells[16];
			Q.textContent = Math.ceil(calculateColumn16Sum());
			R.textContent = Math.ceil(calculateColumn17Sum());
			// 假设这是你在页面中计算出的最终结果
			const finalResultValue = Math.ceil(calculateColumn16Sum());
			const dataKey = "calculated_result3";
			localStorage.setItem(dataKey, finalResultValue.toString());
			// 可选：添加一条确认信息，确认数据已存储
			console.log(
				`数据已存储到 localStorage，键名: ${dataKey}，值: ${finalResultValue}`
			);
			dataTableManager.saveData();
		} else {
			console.error("单元格不是18列");
		}
	} else {
		console.error("没找到单元格或者行末");
	}
}

// 监听表格任何单元格的动作
function observeEditableCells(tableId, editableClass) {
	const table = document.getElementById(tableId);

	if (!table) {
		console.error(`错误：未找到 ID 为 '${tableId}' 的表格。`);
		return;
	}

	// 配置 MutationObserver
	const observerConfig = {
		characterData: true, // 监听文本内容的改变
		subtree: true, // 监听目标元素的子元素树
		childList: true, // 监听子元素的添加或移除 (虽然不是主要目的，但包含更保险)
	};

	// 观察器的回调函数
	const callback = function (mutationsList, observer) {
		for (const mutation of mutationsList) {
			// 1. 检查变化是否是文本内容的改变
			if (mutation.type === "characterData" && mutation.target.parentNode) {
				// mutation.target 是文本节点，我们需要检查它的父元素
				const parentElement = mutation.target.parentNode;
				// 2. 检查父元素是否是我们关注的可编辑单元格
				if (parentElement.classList.contains(editableClass)) {
					console.log("可编辑单元格内容改变！");
					calculateAllRowSubtotals();
				}
			}
		}
	};

	// 创建观察器实例
	const observer = new MutationObserver(callback);

	// 开始观察整个表格
	// 注意: 初始时只观察表格，因为表格本身是动态的。
	// 如果表格中的行和单元格也是动态添加的，MutationObserver 会自动捕获这些变化下的文本节点变化。
	observer.observe(table, observerConfig);

	console.log(
		`MutationObserver 已启动，正在监听表格 #${tableId} 中类名为 .${editableClass} 的单元格变化。`
	);
}

document.addEventListener("DOMContentLoaded", () => {
	const btnT800 = document.getElementById("button-T800");
	const btnT800CE = document.getElementById("button-T800CE");
	const btnT1000 = document.getElementById("button-T1000");
	const btnT1500 = document.getElementById("button-T1500");
	if (!btnT800 || !btnT800CE || !btnT1000 || !btnT1500) {
		console.error("按钮元素未找到。");
		return;
	}
	// 1. 页面加载时，首先尝试恢复用户的选择
	restoreUserSelection();
	dataTableManager.loadData();
	// 行号处理并刷新计算
	updateRowNumbers();
	// 1. 开始进行监听
	observeEditableCells("calculateTableBody", "td-input");
	// 2. 绑定按钮点击事件
	btnT800.addEventListener("click", () => {
		highlightColumn("T800");
		calculateAllRowSubtotals();
	});
	btnT800CE.addEventListener("click", () => {
		highlightColumn("T800CE");
		calculateAllRowSubtotals();
	});
	btnT1000.addEventListener("click", () => {
		highlightColumn("T1000");
		calculateAllRowSubtotals();
	});
	btnT1500.addEventListener("click", () => {
		highlightColumn("T1500");
		calculateAllRowSubtotals();
	});
	buttonaddline.addEventListener("click", function () {
		createNewLine();
		calculateAllRowSubtotals();
	});
	buttondeleteline.addEventListener("click", function () {
		deleteLastLine();
		calculateAllRowSubtotals();
	});
	buttontest.addEventListener("click", function () {
		calculateRowSubtotal();
	});
});
