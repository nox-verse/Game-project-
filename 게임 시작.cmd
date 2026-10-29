@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "FOREST_NODE=node"
if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "FOREST_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
echo FOREST LOG - 포레스트 로그
echo 게임을 하는 동안 이 창을 열어두세요. 종료하려면 창을 닫으세요.
echo 브라우저가 열리지 않으면 http://127.0.0.1:8782/ 로 접속하세요.
"%FOREST_NODE%" "%~dp0serve.cjs" --open
pause
