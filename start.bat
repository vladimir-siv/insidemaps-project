@echo off
title MAPS APP
cd "%~dp0src\frontend\maps-ui\"
call build.bat
cd "%~dp0src\backend\maps-api\"
call start.bat
echo Press any key to exit . . .
pause >nul
