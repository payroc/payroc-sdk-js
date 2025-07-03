Write-Host ""
Write-Host "---------------------------------" -ForegroundColor Cyan
Write-Host "PAPI SDK Local Spec Update Script" -ForegroundColor Cyan
Write-Host "---------------------------------" -ForegroundColor Cyan
Write-Host ""

$path = "fern\read-only"
$generatorsPath = "fern\"

if (Test-Path $path) {
    Get-ChildItem -Path $path -Recurse | Remove-Item -Recurse -Force
    if (!(Test-Path -path $path\openapi)) {New-Item $path\openapi -Type Directory}
    Write-Host "Contents of $path have been deleted." -ForegroundColor Green
} else {
    Write-Host "Path $path does not exist." -ForegroundColor Red
}

Write-Host "Copying generators file from $generatorsPath to $generatorsPath" -ForegroundColor Yellow
Copy-Item -Path "..\arch-specs-apis\$generatorsPath\generators.yml" -Destination "$generatorsPath\generators.yml" 

Write-Host "Copying override file to $path\openapi" -ForegroundColor Yellow
Copy-Item -Path "..\arch-specs-apis\fern\openapi-overrides.yml" -Destination "$path\openapi\openapi-overrides.yml" 

Write-Host "Copying files to $path\openapi\common..." -ForegroundColor Yellow
Copy-Item -Path "..\arch-specs-apis\common" -Destination "$path\openapi\common" -Recurse

Write-Host "Copying files to $path\openapi\external..." -ForegroundColor Yellow
Copy-Item -Path "..\arch-specs-apis\external" -Destination "$path\openapi\external" -Recurse

Write-Host "Files copied successfully." -ForegroundColor Green
