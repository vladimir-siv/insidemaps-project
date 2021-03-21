@echo off
title MAPS APP
cd %~dp0
call src\frontend\maps-ui\build.bat
cd %~dp0
call src\backend\maps-api\start.bat
echo Press any key to exit . . .
pause >nul
