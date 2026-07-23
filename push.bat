@echo off
echo =======================================================
echo          Ayurmor - GitHub Code Commit & Push           
echo =======================================================
echo.

:: 1. Stage changes
echo [1/3] Adding updated files to Git stage...
git add .

echo.
:: 2. Commit changes
echo [2/3] Committing changes...
git commit -m "feat: enhance backend APIs, AI chatbot knowledge base, and admin panel with Corporate & Compliance tracking"

echo.
:: 3. Push to GitHub main branch
echo [3/3] Pushing code to GitHub (https://github.com/Prem-sharma1/Ayurmor.git)...
git push origin main

echo.
echo =======================================================
if %errorlevel% equ 0 (
    echo [SUCCESS] All code updates successfully pushed to GitHub!
) else (
    echo [NOTICE] If push requires set-upstream, running: git push -u origin main
    git push -u origin main
)
echo =======================================================
echo.
pause
