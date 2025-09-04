        // ============== 主要计算逻辑 ==============
        
        // 获取第一个表格的输入和输出单元格
        const 提升速度单元格1 = document.getElementById('liftingSpeed-1');
        const 提升加速度单元格1 = document.getElementById('liftingAcce-1');
        const 货架层间距单元格1 = document.getElementById('rackingLayerSpacing-1');
        const 升降机速度结果单元格1 = document.getElementById('lifterSpeedResult-1');
        const 升降机功率结果单元格1 = document.getElementById('lifterPowerResult-1');

        // 获取第二个表格及其扩展部分的输入和输出单元格
        const 提升速度单元格2 = document.getElementById('liftingSpeed-2');
        const 提升加速度单元格2 = document.getElementById('liftingAcce-2');
        const 速度结果单元格2 = document.getElementById('speedResult-2');
        const 加速度结果单元格2 = document.getElementById('acceResult-2');
        const 带载加速距离单元格 = document.getElementById('distAccelLoad');
        const 带载停止距离单元格 = document.getElementById('distStopLoad');
        const 不带载加速距离单元格 = document.getElementById('distAccelNoLoad');
        const 不带载停止距离单元格 = document.getElementById('distStopNoLoad');
        const 平均距离单元格 = document.getElementById('avgDistance');
        const 带载进出时间单元格 = document.getElementById('timeLoad');
        const 不带载进出时间单元格 = document.getElementById('timeNoLoad');
        const 轨道式输送机类型选择框 = document.getElementById('ps-selector');


        // 获取动态表格的表格体
        const 提升时间表格体 = document.getElementById('liftingTimeTableBody');
        const 提升时间表格行 = document.getElementsByClassName('lifting-time-row');

        // 获取第三个表格（升降机效率）的输入和输出单元格
        const 提升层级单元格 = document.getElementById('liftingLevels');
        const 提升时间效率单元格 = document.getElementById('liftingTimeEff');
        const 带载时间效率单元格 = document.getElementById('timeLoadEff');
        const 不带载时间效率单元格 = document.getElementById('timeNoLoadEff');
        const 抓取放置时间单元格 = document.getElementById('pickDropTime');
        const 下降时间单元格 = document.getElementById('descendingTime');
        const 电气延迟单元格 = document.getElementById('elecDelay');
        const 位置锁定单元格 = document.getElementById('posLock');
        const 等待时间单元格 = document.getElementById('waitingTime');
        const 效率比率单元格 = document.getElementById('efficiencyRate');
        const 循环时间单元格 = document.getElementById('cycleTime');
        const 托盘提升性能单元格 = document.getElementById('palletLiftingPerformance');
        const 吞吐量需求单元格 = document.getElementById('throughputRequirement');
        const 升降机数量单元格 = document.getElementById('qtyOfLift');


        /**
         * 计算并更新第一组表格的值。
         * 基于基本的物理公式：v^2 = 2 * a * d，推导出 d = v^2 / (2 * a)。
         * 这里的速度和加速度都是升降机的提升速度和加速度。
         */
        function 更新计算1() {
            // 从可编辑单元格中获取值，如果不是数字则默认为0
            const 提升速度 = parseFloat(提升速度单元格1.textContent) || 0;
            const 提升加速度 = parseFloat(提升加速度单元格1.textContent) || 0;

            // 计算从加速到最大速度的距离（mm）
            const 升降机速度总和 = (提升速度 * 提升速度) / (2 * 提升加速度) * 1000;
            升降机速度结果单元格1.textContent = 升降机速度总和.toFixed(2);

            // 计算从最大速度加速到停止的距离（mm），与上面计算相同
            const 升降机功率总和 = (提升速度 * 提升速度) / (2 * 提升加速度) * 1000;
            升降机功率结果单元格1.textContent = 升降机功率总和.toFixed(2);

            // 更新完第一个表格后，调用动态表格和第三个表格的更新函数
            更新提升时间表格();
            更新计算2();
            更新计算3();
        }

        /**
         * 计算并更新PS BASE INFORMATION和PS的值。
         */
        function 更新计算2() {
            // 从可编辑单元格中获取值，如果不是数字则默认为0
            const 带载时PS速度 = parseFloat(提升速度单元格2.textContent) || 0;
            const 带载时PS加速度 = parseFloat(提升加速度单元格2.textContent) || 0;
            const 不带载时PS速度 = parseFloat(速度结果单元格2.textContent) || 0;
            const 不带载时PS加速度 = parseFloat(加速度结果单元格2.textContent) || 0;

            //对加速度结果单元格2进行Vlookup处理

            //获取输送机类型表的数据
            const 输送机类型表 = document.getElementById('PSinformation');
            //const 输送机类型表主体部分 = dataTable.querySelector('tbody');
            //加速度结果单元格被清空
            加速度结果单元格2.textContent = '';
            // 获取当前选中的值，并移除任何可能存在的空格，以便与数据表中的值匹配
            const 下拉框选择值 = 轨道式输送机类型选择框.value.replace(/\s/g, '');
            // 遍历数据表的每一行
            const rows = 输送机类型表.querySelectorAll('tr');
            rows.forEach(row => {
                // 获取当前行的第一个<th>元素，即 Type 列
                const 第一列Type单元格 = row.querySelector('th:first-child');
                const 第一列单元格文本 = 第一列Type单元格.textContent.trim().replace(/\s/g, '');
                if (第一列Type单元格) {
                    // 检查类型是否匹配
                    if (第一列单元格文本 === 下拉框选择值) {
                        // 如果匹配，获取第二列（Qty.）的值
                        const 第二列QTY单元格 = row.querySelector('th:nth-child(2)');
                        if (第二列QTY单元格) {
                            加速度结果单元格2.textContent = 第二列QTY单元格.textContent.trim();
                        }
                    }
                }
            });

            // 计算带载情况下的加速距离和停止距离
            const 带载加速距离计算值 = (带载时PS速度 * 带载时PS速度) / (2 * 带载时PS加速度) * 1000;
            带载加速距离单元格.textContent = 带载加速距离计算值.toFixed(0);
            带载停止距离单元格.textContent = 带载加速距离计算值.toFixed(0);

            // 假设不带载时的速度和加速度与带载时相同
            const 不带载加速距离计算值 = (不带载时PS速度 * 不带载时PS速度) / (2 * 不带载时PS加速度) * 1000;
            不带载加速距离单元格.textContent = 不带载加速距离计算值.toFixed(0);
            不带载停止距离单元格.textContent = 不带载加速距离计算值.toFixed(0);

            // 获取新的输入值用于时间计算
            const 带载加速距离 = parseFloat(带载加速距离单元格.textContent) || 0;
            const 不带载加速距离 = parseFloat(不带载加速距离单元格.textContent) || 0;
            const 平均距离 = parseFloat(平均距离单元格.textContent) || 0;

            // 计算“带载进出升降机的时间”
            let 带载时间值 = 0;
            const 带载加速距离米 = 带载加速距离 / 1000; // 将毫米转换为米
            // 判断是否能达到最大速度
            if (平均距离 > (带载加速距离米 * 2)) {
                // 如果能达到最大速度，时间 = 匀速运动时间 + 加速和减速时间
                带载时间值 = (平均距离 - 带载加速距离米 * 2) / 带载时PS速度 + (带载时PS速度 / 带载时PS加速度) * 2;
            } else {
                // 如果不能达到最大速度，时间 = 2 * sqrt(距离 / 加速度)
                带载时间值 = Math.sqrt(平均距离 / 带载时PS加速度) * 2;
            }
            带载进出时间单元格.textContent = 带载时间值.toFixed(3);

            // 计算“不带载进出升降机的时间”
            let 不带载时间值 = 0;
            const 不带载加速距离米 = 不带载加速距离 / 1000; // 将毫米转换为米

            // 判断是否能达到最大速度
            if (平均距离 > (不带载加速距离米 * 2)) {
                // 如果能达到最大速度，时间 = 匀速运动时间 + 加速和减速时间
                不带载时间值 = (平均距离 - 不带载加速距离米 * 2) / 不带载时PS速度 + (不带载时PS速度 / 不带载时PS加速度) * 2;
            } else {
                // 如果不能达到最大速度，时间 = 2 * sqrt(距离 / 加速度)
                不带载时间值 = Math.sqrt(平均距离 / 不带载时PS加速度) * 2;
            }
            不带载进出时间单元格.textContent = 不带载时间值.toFixed(3);

            // 更新完第二个表格后，调用第三个表格的更新函数
            更新计算3();
        }

        /**
         * 计算并更新“提升高度和时间”表格。
         * 这是一个动态生成的表格，根据货架层级数来计算每个层级的高度和提升时间。
         */
        function 更新提升时间表格() {
            // 清除现有的表格内容
            提升时间表格体.innerHTML = '';

            // 获取计算所需的参数
            const 货架层间距 = parseFloat(货架层间距单元格1.textContent) || 0;
            const 升降机功率结果 = parseFloat(升降机功率结果单元格1.textContent) || 0;
            const 提升速度 = parseFloat(提升速度单元格1.textContent) || 0;
            const 提升加速度 = parseFloat(提升加速度单元格1.textContent) || 0;

            // 循环生成24行数据，从第2层到第25层
            for (let a = 2; a <= 25; a++) {
                const tr = document.createElement('tr');
                tr.classList.add('lifting-time-row');

                // 第1列: 起始层级
                let td1 = document.createElement('td');
                td1.classList.add('td-label-centered');
                td1.textContent = '1';

                // 第2列: 目标层级
                let td2 = document.createElement('td');
                td2.classList.add('td-label-centered');
                td2.textContent = a;

                // 第3列: 提升高度(m)
                let td3 = document.createElement('td');
                td3.classList.add('td-label-centered');
                const 提升高度 = (a - 1) * 货架层间距 / 1000; // 将毫米转换为米
                td3.textContent = 提升高度.toFixed(3);

                // 第4列: 提升时间(s)
                let td4 = document.createElement('td');
                td4.classList.add('td-label-centered');
                td4.id = `liftingTime-${a}`; // 添加ID以便于查找
                let 提升时间;
                
                // 计算提升时间，与更新计算2的逻辑类似
                const 升降机距离米 = 升降机功率结果 / 1000; // 将毫米转换为米
                // 判断是否能达到最大速度
                if (提升高度 > (升降机距离米 * 2)) {
                    // 如果能达到最大速度，时间 = 匀速运动时间 + 加速和减速时间
                    提升时间 = (提升高度 - 升降机距离米 * 2) / 提升速度 + (提升速度 / 提升加速度) * 2;
                } else {
                    // 如果不能达到最大速度，时间 = 2 * sqrt(距离 / 加速度)
                    提升时间 = Math.sqrt((提升高度 / 2) / (提升加速度 / 2)) * 2;
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

        /**
         * 计算并更新第三个表格（升降机效率）。
         */
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
                提升时间效率单元格.textContent = 'N/A';
                下降时间单元格.textContent = 'N/A';
            }

            // 3. 带载进出升降机时间
            const 带载时间值 = parseFloat(带载进出时间单元格.textContent) || 0;
            带载时间效率单元格.textContent = 带载时间值.toFixed(3);
            
            // 4. 不带载进出升降机时间
            const 不带载时间值 = parseFloat(不带载进出时间单元格.textContent) || 0;
            不带载时间效率单元格.textContent = 不带载时间值.toFixed(3);

            // 5. 抓取和放置时间
            // 固定值为 0
            抓取放置时间单元格.textContent = '0';
            
            // 6. 下降时间 - 同提升时间
            const 提升时间效率值 = parseFloat(提升时间效率单元格.textContent) || 0;
            下降时间单元格.textContent = 提升时间效率值.toFixed(3);

            // 7. 电气延迟时间*3
            // 固定值为 3s
            电气延迟单元格.textContent = '3';

            // 8. 位置锁定*3
            // 固定值为 9s
            位置锁定单元格.textContent = '9';
            
            // 9. 等待时间
            // 固定值为 15s
            等待时间单元格.textContent = '15';

            // 10. 效率比率
            const 效率比率 = parseFloat(效率比率单元格.textContent) || 0;

            // 11. 循环时间
            // 计算公式为：所有时间之和除以效率比率
            const 循环时间值 = (提升时间效率值 + 带载时间值 + 不带载时间值 + 0 + 提升时间效率值 + 3 + 9 + 15) / 效率比率 * 100;
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

        // 为所有可编辑单元格添加事件监听器，当内容改变时触发重新计算
        提升速度单元格1.addEventListener('input', 更新计算1);
        提升加速度单元格1.addEventListener('input', 更新计算1);
        货架层间距单元格1.addEventListener('input', 更新计算1);
        提升速度单元格2.addEventListener('input', 更新计算2);
        提升加速度单元格2.addEventListener('input', 更新计算2);
        平均距离单元格.addEventListener('input', 更新计算2);
        提升层级单元格.addEventListener('input', 更新计算3);
        效率比率单元格.addEventListener('input', 更新计算3);
        吞吐量需求单元格.addEventListener('input', 更新计算3);
        轨道式输送机类型选择框.addEventListener('change', 更新计算2);

        // 页面加载时，自动运行所有计算以显示初始值
        window.addEventListener('load', () => {
            更新计算1();
            更新计算2();
            更新计算3();
        });
