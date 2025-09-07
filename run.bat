@echo off
echo 正在启动本地网页服务器...
echo 服务器地址: http://localhost:8000
echo 请不要关闭此窗口，关闭窗口将停止服务器
echo.

:: 启动PowerShell并执行Python服务器命令
start powershell -NoExit -Command "python -m http.server 8000"