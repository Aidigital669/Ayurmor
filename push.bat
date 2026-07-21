@echo off
echo =======================================================
echo         Ayurmor Git Large File Fix and Push            
echo =======================================================
echo.

:: 1. Remove tracked node_modules and .next from git index (keeps them on disk)
echo [1/3] Removing node_modules and .next build files from Git tracking...
git rm -r --cached node_modules 2>nul
git rm -r --cached .next 2>nul

echo.
:: 2. Re-commit clean files
echo [2/3] Re-committing changes without the large folder files...
git commit --amend -m "feat: dynamic product specs tabs, custom image uploader, and admin panel CMS capabilities"

echo.
:: 3. Force push the clean history to GitHub
echo [3/3] Pushing clean repository to GitHub...
git push -u origin main --force

echo.
echo =======================================================
if %errorlevel% equ 0 (
    echo [SUCCESS] Code successfully pushed to GitHub!
) else (
    echo [FAILED] Push failed. 
)
echo =======================================================
echo.
pause
