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

// 按钮显示和隐藏
const basicinformationtable = document.getElementById("basicinformationtable");
hiddenshowbutton.addEventListener("click", function () {
	basicinformationtable.classList.toggle("hidden");
});

// 全局常量：浏览器缓存键值
const USER_MODEL_STORAGE_KEY = "userSelectedModel";
// 全局变量：存储当前激活的模型（A42 或 A42T），初始值可以设为 null 或一个默认值
let currentSelectedModel = null;

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
	newLine.innerHTML = rowContent;
	calculateTableBody.appendChild(newLine);
	updateRowNumbers();
	// 增行后必须计算
	calculateAllRowSubtotals();
}
// 删行函数
function deleteLastLine() {
	const rowCount = calculateTableBody.children.length;
	if (rowCount > 2) {
		calculateTableBody.removeChild(calculateTableBody.lastElementChild);
		calculateAllRowSubtotals();
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
	console.log(D.textContent);
	//计算F列
	F.textContent = (parseFloat(E.textContent)/3+2).toFixed(3);
	//计算H列
	H.textContent = (6 * parseFloat(G.textContent)).toFixed(3);
	//计算I列
	I.textContent = ((parseFloat(E.textContent)/3+2)+(6 * parseFloat(G.textContent))).toFixed(3);
	//计算K列
	K.textContent = (8 * parseFloat(J.textContent)).toFixed(3);
	//计算N列
	N.textContent = (parseFloat(I.textContent)+parseFloat(K.textContent)+parseFloat(L.textContent)+parseFloat(M.textContent)).toFixed(3);
	//计算O列
	O.textContent = (3600 / parseFloat(N.textContent) * 0.8).toFixed(3);
	//计算P列
	P.textContent = (3600 / parseFloat(N.textContent) * 0.8 * 0.85).toFixed(3);
	//计算Q列
	Q.textContent = (parseFloat(D.textContent)/(3600 / parseFloat(N.textContent) * 0.8 * 0.85)).toFixed(1);
	//计算R列
	R.textContent = ((parseFloat(D.textContent)/(3600 / parseFloat(N.textContent) * 0.8 * 0.85))* 0.17).toFixed(1);
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
			const dataKey = "calculated_result2";
			localStorage.setItem(dataKey, finalResultValue.toString());
			// 添加一条确认信息，确认数据已存储
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

	const observer = new MutationObserver(callback);
	observer.observe(table, observerConfig);

	console.log(
		`MutationObserver 已启动，正在监听表格 #${tableId} 中类名为 .${editableClass} 的单元格变化。`
	);
}

document.addEventListener("DOMContentLoaded", () => {
	dataTableManager.loadData();
	// 刷新计算函数
	calculateAllRowSubtotals();
	// 1. 开始进行监听
	observeEditableCells("calculateTableBody", "td-input");

	buttonaddline.addEventListener("click", function () {
		createNewLine();
		console.log(localStorage.getItem("userSelectedModel"));
	});
	buttondeleteline.addEventListener("click", function () {
		deleteLastLine();
	});
	buttontest.addEventListener("click", function () {
		calculateTableTotal();
	});
});
