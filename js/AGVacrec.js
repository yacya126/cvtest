const TABLE_ID = 'data-table';
const rowHtmlContent = `
<td class="data-cell td-label-centered td-row-number"></td>
<td class="data-cell td-input" contenteditable="true"></td>
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
<td class="data-cell td-label-centered"></td>
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
// 全局变量：存储当前激活的模型（A42 或 A42T），初始值可以设为 null 或一个默认值
let currentSelectedModel = "A42";

function highlightColumn(columnKey) {
	const table = document.getElementById("basicinformationtable_show");
	const btnA42 = document.getElementById("button-A42");
	const btnA42T = document.getElementById("button-A42T");
	if (!table || !btnA42 || !btnA42T) return;

	// 1. 显示表格
	table.style.display = "hidden";
	// 2. 清除高亮
	//clearHighlight();
	// 3. 确定目标
	let targetClass = "";
	let headerId = "";
	let activeButton = null;

	if (columnKey === "A42") {
		targetClass = ".data-col-1";
		headerId = "col_A42";
		activeButton = btnA42;
	} else if (columnKey === "A42T") {
		targetClass = ".data-col-2";
		headerId = "col_A42T";
		activeButton = btnA42T;
	} else {
		localStorage.removeItem(USER_MODEL_STORAGE_KEY);
		currentSelectedModel = null;
		return;
	}
	// 4. 执列高亮
	try {
		document.getElementById(headerId).style.backgroundColor = "#aaffaa";
	} catch (e) {}
	const targetDataCells = table.querySelectorAll(targetClass);
	targetDataCells.forEach((cell) => {
		cell.style.backgroundColor = "#e6ffe6";
	});
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
	//console.log(calculateTableBody);
	const newLine = document.createElement("tr");
	const numberCell = document.createElement("td");
	numberCell.className = "td-label-centered td-row-number";
	numberCell.textContent = "...";
	const rowContent = `
						<td class="data-cell td-label-centered td-row-number"></td>
						<td class="data-cell td-input" contenteditable="true">A->B</td>
						<td class="data-cell td-input" contenteditable="true">0.0</td>
						<td class="data-cell td-input" contenteditable="true">6</td>
						<td class="data-cell td-input" contenteditable="true">0</td>
						<td class="data-cell td-label-centered">2.3</td>
						<td class="data-cell td-input" contenteditable="true">2</td>
						<td class="data-cell td-label-centered">34.67</td>
						<td class="data-cell td-label-centered">37.0</td>
						<td class="data-cell td-input" contenteditable="true">2</td>
						<td class="data-cell td-label-centered">37.3</td>
						<td class="data-cell td-input" contenteditable="true">0.0</td>
						<td class="data-cell td-label-centered">74.3</td>
						<td class="data-cell td-label-centered">232.5</td>
						<td class="data-cell td-label-centered">197.6</td>
						<td class="data-cell td-label-centered">0.0</td>
						<td class="data-cell td-label-centered">0.0</td>
						<td class="data-cell td-label-centered"></td>
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
		console.error("error");
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

// 行内计算的业务逻辑
function calculateRowSubtotal(row) {
	const cells = row.children;
	const models = localStorage.getItem("userSelectedModel");
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
	const S = cells[17];
	//console.log(D.textContent);
	//计算G列
	if (models === "A42") {
		Gvalue = ((5 / 7) * parseFloat(F.textContent) + 7 / 3);
		G.textContent = Gvalue.toFixed(3);
	} else if (models === "A42T") {
		Gvalue = ((5 / 7) * parseFloat(F.textContent) + 2.8);
		G.textContent = Gvalue.toFixed(3);
	} else {
		console.error("no models");
	}
	//计算I列
	if (models === "A42") {
		Ivalue = (8.67 * parseFloat(H.textContent));
		I.textContent = Ivalue.toFixed(3);
	} else if (models === "A42T") {
		Ivalue = (10 * parseFloat(H.textContent));
		I.textContent = Ivalue.toFixed(3);
	} else {
		console.error("no models");
	}
	//计算J列
	Jvalue = Gvalue + Ivalue;
	J.textContent = Jvalue.toFixed(3);
	//计算L列
	if (models === "A42") {
		Lvalue = (18.67 * parseFloat(K.textContent));
		L.textContent = Lvalue.toFixed(3);
	} else if (models === "A42T") {
		Lvalue = (27.0 * parseFloat(K.textContent));
		L.textContent = Lvalue.toFixed(3);
	} else {
		console.error("no models");
	}
	//计算N列
	Nvalue = Jvalue + Lvalue + parseFloat(M.textContent);
	N.textContent = Nvalue.toFixed(3);
	//计算O列
	Ovalue = ((3600 / Nvalue) * parseFloat(E.textContent) * 0.8);
	O.textContent = Ovalue.toFixed(3);
	//计算P列
	Pvalue = Ovalue * 0.85;
	P.textContent = Pvalue.toFixed(3);
	//计算Q列
	Qvalue = (parseFloat(D.textContent) / Pvalue);
	Q.textContent = Qvalue.toFixed(1);
	//计算R列
	Rvalue = Qvalue *0.17;
	R.textContent = Rvalue.toFixed(1);
	//计算S列
	Svalue = 3600 / Ovalue;
	S.textContent = Svalue.toFixed(5);
}

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
		//console.log("aaa" + D.textContent);
		//console.log("aaa" + P.textContent);
		const numberValue = parseFloat(D.textContent) / parseFloat(P.textContent);
		sum_1 += numberValue;
	}
	//console.log(`第16列的总和 SUM_1 为: ${sum_1}`);
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
		//console.log("aaa" + Q.textContent);
		const numberValue = parseFloat(Q.textContent) * 0.17;
		sum_1 += numberValue;
	}
	//console.log(`第17列的总和 SUM_1 为: ${sum_1}`);
	return sum_1;
}

// 跨行计算的业务逻辑
function calculateTableTotal() {
	if (calculateTableFoot && calculateTableFoot.rows.length > 0) {
		const footrow = calculateTableFoot.rows[0];
		const allCells = footrow.getElementsByTagName("td");
		if (allCells.length === 18) {
			const Q = allCells[15];
			const R = allCells[16];
			Q.textContent = Math.ceil(calculateColumn16Sum());
			R.textContent = Math.ceil(calculateColumn17Sum());
			// 假设这是你在页面中计算出的最终结果
			const finalResultValue = Math.ceil(calculateColumn16Sum());
			const dataKey = "calculated_result";
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

// 计算补足数据表
function calculateAdddata() {
	console.log("AV run——tablog");
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
					//console.log("可编辑单元格内容改变！");
					calculateAllRowSubtotals();
				}
			}
		}
	};

	// 创建观察器实例
	const observer = new MutationObserver(callback);
	observer.observe(table, observerConfig);
	//console.log(
	//	`MutationObserver 已启动，正在监听表格 #${tableId} 中类名为 .${editableClass} 的单元格变化。`
	//);
}

document.addEventListener("DOMContentLoaded", () => {
	const btnA42 = document.getElementById("button-A42");
	const btnA42T = document.getElementById("button-A42T");
	if (!btnA42 || !btnA42T) {
		console.error("按钮元素未找到。");
		return;
	};
	// 1. 页面加载时，首先尝试恢复用户的选择
	restoreUserSelection();
	dataTableManager.loadData();
	// 计算增补函数和行列函数
	calculateAdddata();
	calculateAllRowSubtotals();
	// 1. 开始进行监听
	observeEditableCells("calculateTableBody", "td-input");
	// 2. 绑定按钮点击事件
	btnA42.addEventListener("click", () => {
		highlightColumn("A42");
		calculateAllRowSubtotals();
		calculateAdddata();
	});
	btnA42T.addEventListener("click", () => {
		highlightColumn("A42T");
		calculateAllRowSubtotals();
		calculateAdddata();
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
		calculateAdddata();
		calculateAllRowSubtotals();
	});
});
