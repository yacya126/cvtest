/**
 * DataTableManager 类用于管理具有特定ID的HTML表格的数据，
 * 并将数据存储在浏览器的 localStorage 中。
 */
class DataTableManager {
    /**
     * @param {string} tableId - 要管理的HTML表格的ID（例如："data-table"）。
     * @param {string} rowInnerHtml - 定义表格行结构的HTML字符串。
     * 在填充数据时，你需要确保能够正确地定位和修改单元格。
     * **注意：** 这里的示例使用了 data-col-index 属性来标识列。
     * 示例格式：
     * '<tr data-row-index="">' +
     * '  <td><input type="text" class="data-cell" data-col-index="0" value=""></td>' +
     * '  <td><span class="data-cell" data-col-index="1"></span></td>' +
     * '  <td><button onclick="someFunction(this)">操作</button></td>' +
     * '</tr>'
     */
    constructor(tableId, rowInnerHtml) {
        this.tableId = tableId;
        this.localStorageKey = `dataTableData_${tableId}`;
        this.rowInnerHtml = rowInnerHtml;
        this.tableElement = document.getElementById(tableId);

        if (!this.tableElement) {
            console.error(`无法找到ID为 "${tableId}" 的表格元素.`);
        }
    }

    /**
     * 辅助函数：从表格中提取数据矩阵。
     * @returns {Array<Array<string>>} 包含表格所有单元格数据的二维数组。
     */
    _extractDataMatrix() {
        if (!this.tableElement) return [];

        const matrix = [];
        const rows = this.tableElement.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const rowData = [];
            // 查找所有带有特定类名（例如：data-cell）或属性（如果你的rowInnerHtml定义了）的单元格元素
            // 这里我们假设数据单元格是直接的子元素，或者是表单元素（如input/textarea）
            // 为了更通用，建议在需要存取数据的元素上添加一个特定的类名或属性。
            // 示例中我们查找类名为 'data-cell' 的元素
            const dataCells = row.querySelectorAll('.data-cell');

            dataCells.forEach(cell => {
                let cellValue = '';
                // 检查是否是表单元素（例如：input, textarea, select）
                if (cell.tagName === 'INPUT' || cell.tagName === 'TEXTAREA' || cell.tagName === 'SELECT') {
                    cellValue = cell.value;
                } else {
                    // 否则，获取其文本内容
                    cellValue = cell.textContent.trim();
                }
                rowData.push(cellValue);
            });
            matrix.push(rowData);
        });

        return matrix;
    }

    /**
     * 3. 将整个表格的数据全部按矩阵写入 localstorage。
     * @returns {boolean} 保存成功返回 true，否则返回 false。
     */
    saveData() {
        if (!this.tableElement) return false;

        const dataMatrix = this._extractDataMatrix();

        try {
            const dataString = JSON.stringify(dataMatrix);
            localStorage.setItem(this.localStorageKey, dataString);
            console.log(`数据成功保存到 localStorage，键: ${this.localStorageKey}`);
            return true;
        } catch (e) {
            console.error('保存数据到 localStorage 失败:', e);
            return false;
        }
    }

    /**
     * 提取 localstorage 中的数据矩阵。
     * @returns {Array<Array<string>> | null} 存储的二维数组，如果不存在则返回 null。
     */
    _getStoredDataMatrix() {
        const dataString = localStorage.getItem(this.localStorageKey);
        if (!dataString) return null;

        try {
            return JSON.parse(dataString);
        } catch (e) {
            console.error('解析 localStorage 数据失败:', e);
            return null;
        }
    }

    /**
     * 4. 提取数据，根据矩阵的行数调整表格行数，并填充数据。
     * @returns {boolean} 成功填充返回 true，否则返回 false。
     */
    loadData() {
        console.log("开始加载表格。");
        if (!this.tableElement) return false;

        const dataMatrix = this._getStoredDataMatrix();
        if (!dataMatrix) {
            console.log('localStorage 中没有找到要加载的数据。');
            return false;
        }

        // 1. 获取或创建 tbody 元素
        let tbody = this.tableElement.querySelector('tbody');
        if (!tbody) {
            tbody = document.createElement('tbody');
            this.tableElement.appendChild(tbody);
        }

        // 2. 清空现有行
        tbody.innerHTML = '';

        // 3. 根据矩阵行数重建并填充行
        dataMatrix.forEach(rowData => {
            // 创建新行
            const newRow = document.createElement('tr');
            newRow.innerHTML = this.rowInnerHtml; // 使用定义的 innerhtml
            
            // 查找新行中的数据单元格元素
            const dataCells = newRow.querySelectorAll('.data-cell');

            // 填充数据
            rowData.forEach((cellValue, colIndex) => {
                // 使用列索引来匹配数据和单元格
                const targetCell = dataCells[colIndex]; 

                if (targetCell) {
                    // 检查是否是表单元素
                    if (targetCell.tagName === 'INPUT' || targetCell.tagName === 'TEXTAREA' || targetCell.tagName === 'SELECT') {
                        targetCell.value = cellValue;
                    } else {
                        // 否则，设置其文本内容
                        targetCell.textContent = cellValue;
                    }
                } else {
                    console.warn(`第 ${colIndex} 列的数据没有找到匹配的 .data-cell 元素。`);
                }
            });

            tbody.appendChild(newRow);
        });

        console.log(`数据成功加载到表格: ${this.tableId}，总共 ${dataMatrix.length} 行.`);
        return true;
    }
}