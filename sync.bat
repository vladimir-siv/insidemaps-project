@echo off
title MAPS APP
cd "%~dp0src\frontend\maps-ui\"
call npm install
cd "%~dp0src\backend\maps-api\"
call npm install
echo Press any key to exit . . .
pause >nul
