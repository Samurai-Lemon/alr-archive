@echo off
setlocal

cd /d "C:\Users\lamou\Documents\alr-archive" || (
  echo Failed to enter repo directory.
  pause
  exit /b 1
)

set "COMMIT_MSG=%~1"

if "%COMMIT_MSG%"=="" (
  set /p COMMIT_MSG=Enter commit message: 
)

if "%COMMIT_MSG%"=="" (
  echo Commit message cannot be empty.
  pause
  exit /b 1
)

echo.
echo Syncing Obsidian vault into Quartz content...
if exist content rmdir /S /Q content
xcopy "C:\Users\lamou\iCloudDrive\iCloud~md~obsidian\The Unwritten" content /E /I /H /Y >nul
if errorlevel 1 (
  echo Failed to copy vault into content.
  pause
  exit /b 1
)

echo.
echo Staging changes...
git add .
if errorlevel 1 (
  echo git add failed.
  pause
  exit /b 1
)

echo.
echo Committing...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
  echo Commit failed. This can happen if there are no changes.
  pause
  exit /b 1
)

echo.
echo Pushing...
git push
if errorlevel 1 (
  echo git push failed.
  pause
  exit /b 1
)

echo.
echo Deployment complete.
pause
endlocal