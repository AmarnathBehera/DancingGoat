# Copy built client bundle into Kentico Admin ClientModules folder
# Run from solution root (PowerShell)

$src = Join-Path -Path $PSScriptRoot -ChildPath "..\Client\dist\*"
$dest = Join-Path -Path $PSScriptRoot -ChildPath "..\App_Data\Admin\ClientModules\@dancing-goat\reporting"

# Resolve full paths
$src = Resolve-Path -Path $src
$dest = Resolve-Path -Path $dest -ErrorAction SilentlyContinue
if (-not $dest) {
	New-Item -ItemType Directory -Path (Join-Path -Path $PSScriptRoot -ChildPath "..\App_Data\Admin\ClientModules\@dancing-goat\reporting") -Force | Out-Null
	$dest = Resolve-Path -Path (Join-Path -Path $PSScriptRoot -ChildPath "..\App_Data\Admin\ClientModules\@dancing-goat\reporting")
}

Write-Host "Copying files from $src to $dest"
Copy-Item -Path $src -Destination $dest -Recurse -Force

Write-Host "Copy complete. You may need to restart the web app and clear browser cache."