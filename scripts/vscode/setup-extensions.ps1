# Setup VS Code Extensions for Payroc SDK JavaScript Development (Windows PowerShell)
# This script installs the recommended extensions for developing the Payroc JavaScript SDK

Write-Host "Installing VS Code extensions for Payroc SDK JavaScript development..." -ForegroundColor Green

# Check if code command is available
$codeExists = Get-Command code -ErrorAction SilentlyContinue
if (-not $codeExists) {
    Write-Host "Error: VS Code command code not found in PATH." -ForegroundColor Red
    Write-Host "Please ensure VS Code is installed and the code command is available." -ForegroundColor Yellow
    Write-Host "You can add it to PATH by opening VS Code and running Shell Command: Install code command in PATH from the command palette." -ForegroundColor Yellow
    exit 1
}

# Install Vitest extension
Write-Host "Installing Vitest..." -ForegroundColor Cyan
code --install-extension vitest.explorer --force
if ($LASTEXITCODE -eq 0) {
    Write-Host "Vitest installed" -ForegroundColor Green
} else {
    Write-Host "Failed to install Vitest" -ForegroundColor Red
}

Write-Host ""
Write-Host " Extensions installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Reload VS Code (Ctrl+Shift+P > Reload Window)" -ForegroundColor White
Write-Host "2. Run tests using the Test Explorer in the sidebar" -ForegroundColor White
Write-Host ""
Write-Host 'For more information, see CONTRIBUTORS.md' -ForegroundColor White
