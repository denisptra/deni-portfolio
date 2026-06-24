@echo off
echo ===================================================
echo   Copying CV PDF and pushing changes to GitHub...
echo ===================================================
echo.

:: 1. Copy the PDF file
echo Copying "Deni Trio Saputra-resume (10) (1).pdf" to "public\Deni Trio Saputra - UI UX.pdf" and "public\Deni-Trio-Saputra-UI-UX.pdf"...
copy /Y "Deni Trio Saputra-resume (10) (1).pdf" "public\Deni Trio Saputra - UI UX.pdf"
copy /Y "Deni Trio Saputra-resume (10) (1).pdf" "public\Deni-Trio-Saputra-UI-UX.pdf"

if errorlevel 1 (
    echo [ERROR] Failed to copy the CV PDF. Please make sure the file exists in the root folder.
    pause
    exit /b 1
)

echo [SUCCESS] CV copied successfully.
echo.

:: 2. Run Git commands
echo [GIT] Staging modified and new files...
git add "Deni Trio Saputra-resume (10) (1).pdf" "public/Deni Trio Saputra - UI UX.pdf" "public/Deni-Trio-Saputra-UI-UX.pdf" next.config.ts copy_and_push.bat

echo [GIT] Committing changes...
git commit -m "Update CV PDF for download option"

echo [GIT] Pushing to main branch on GitHub...
git push origin main

if errorlevel 1 (
    echo [ERROR] Git push failed. Please verify your connection and GitHub authentication.
    pause
    exit /b 1
)

echo.
echo ===================================================
echo   Successfully completed! Your CV has been updated.
echo ===================================================
pause
