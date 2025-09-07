// 文件名: data_storage.js
// 这个脚本负责处理页面上可编辑单元格的数据持久化。
// 它可以将用户输入的数据保存在浏览器的本地存储（localStorage）中，
// 并在用户下次访问时自动加载，确保数据的持续性。

// 定义当前页面的数据存储键名，确保数据在不同页面间不会混淆
// 请根据当前页面修改此键名
const STORAGE_KEY = 'liftcvData';

/**
 * 将所有需要保存的单元格的数据保存到 localStorage。
 * 这个函数会遍历所有带有 'data-cell' 类的 HTML 元素，
 * 无论它们是否可编辑，只要有 id，就将其数据保存下来。
 */
function saveDataToLocalStorage() {
  // 获取所有带有 'data-cell' 类的单元格元素
  const dataCells = document.querySelectorAll('.data-cell');
  // 创建一个空对象来存储所有单元格的数据
  const data = {};
  
  // 遍历每个数据单元格
  dataCells.forEach(cell => {
    // 检查单元格是否具有唯一的 ID
    if (cell.id) {
      // 使用 ID 作为键，将其文本内容作为值存入 data 对象
      data[cell.id] = cell.textContent;
    }
  });

  // 将 data 对象转换为 JSON 字符串并保存到 localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  // 在控制台输出一条确认信息
  console.log('数据已成功保存到 localStorage。');
}

/**
 * 从 localStorage 加载数据并更新页面上的单元格。
 * 这个函数会在页面加载时被调用，它会尝试从 localStorage 中获取对应键名的数据。
 * 如果数据存在，它会解析 JSON 字符串，然后遍历页面上的数据单元格，
 * 用 localStorage 中保存的值来更新它们的内容，从而恢复上次的输入和计算结果。
 */
function loadDataFromLocalStorage() {
  // 从 localStorage 获取数据
  const savedData = localStorage.getItem(STORAGE_KEY);
  
  // 检查是否找到了数据
  if (savedData) {
    try {
      // 尝试将 JSON 字符串解析为 JavaScript 对象
      const data = JSON.parse(savedData);
      // 获取所有带有 'data-cell' 类的单元格元素
      const dataCells = document.querySelectorAll('.data-cell');
      
      // 遍历每个数据单元格
      dataCells.forEach(cell => {
        // 检查单元格是否有 ID，并且在加载的数据中存在对应的值
        if (cell.id && data[cell.id] !== undefined) {
          // 更新单元格的文本内容为加载的数据
          cell.textContent = data[cell.id];
        }
      });
      // 在控制台输出加载成功的确认信息
      console.log('数据已从 localStorage 加载。');
    } catch (e) {
      // 如果解析 JSON 失败，则在控制台输出错误信息
      console.error('解析本地存储数据失败:', e);
    }
  } else {
    // 如果没有找到本地存储数据，则在控制台输出提示信息
    console.log('未找到本地存储数据，使用 HTML 中填写的默认值。');
  }
}

// 使用 DOMContentLoaded 事件监听器
document.addEventListener('DOMContentLoaded', () => {
  // 在 DOM 加载完成后立即调用加载函数，恢复数据
  loadDataFromLocalStorage();

  // 获取所有可编辑单元格
  const editableCells = document.querySelectorAll('[contenteditable="true"]');
  
  // 为每个可编辑单元格添加事件监听器
  editableCells.forEach(cell => {
    // 监听 'input' 事件，这个事件在元素的值因用户输入而改变时触发
    cell.addEventListener('input', () => {
      // 每次用户输入时，都调用保存函数，将数据实时保存到 localStorage
      saveDataToLocalStorage();
    });
  });
});
