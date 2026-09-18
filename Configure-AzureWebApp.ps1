#!/usr/bin/env pwsh
<#
.SYNOPSIS
Automates Azure Web App configuration for ShivaPatpi backend deployment
.DESCRIPTION
Configures connection string, downloads publish profile, and sets up GitHub secrets
.PARAMETER resourceGroup
Resource group name (default: shivapatpi)
.PARAMETER webAppName
Web App name (default: shivapatpi)
#>

param(
    [string]$resourceGroup = "shivapatpi",
    [string]$webAppName = "shivapatpi",
    [string]$sqlServer = "shpatpi",
    [string]$sqlDatabase = "shivapatpi",
    [string]$sqlUser = "shpatpi",
    [string]$sqlPassword = "Microsoft143$"
)

Write-Host @"
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║     🚀 CONFIGURING AZURE WEB APP FOR SHIVAPATPI BACKEND 🚀              ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Green

Write-Host ""
Write-Host "📋 CONFIGURATION PLAN:" -ForegroundColor Cyan
Write-Host "   ✓ Resource Group: $resourceGroup"
Write-Host "   ✓ Web App: $webAppName"
Write-Host "   ✓ SQL Server: $sqlServer.database.windows.net"
Write-Host "   ✓ Database: $sqlDatabase"
Write-Host ""

# Step 1: Check if Azure CLI is installed
Write-Host "Step 1️⃣: Checking Azure CLI..." -ForegroundColor Yellow
try {
    $azVersion = az --version 2>&1 | Select-Object -First 1
    Write-Host "   ✅ Azure CLI found: $azVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Azure CLI not found. Install from: https://docs.microsoft.com/cli/azure/install-azure-cli" -ForegroundColor Red
    exit 1
}

# Step 2: Login to Azure (if needed)
Write-Host ""
Write-Host "Step 2️⃣: Checking Azure login..." -ForegroundColor Yellow
$account = az account show 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "   📍 Need to login to Azure..." -ForegroundColor Yellow
    az login
} else {
    $accountInfo = $account | ConvertFrom-Json
    Write-Host "   ✅ Already logged in as: $($accountInfo.user.name)" -ForegroundColor Green
}

# Step 3: Configure Connection String
Write-Host ""
Write-Host "Step 3️⃣: Configuring connection string..." -ForegroundColor Yellow
$connectionString = "Server=tcp:$sqlServer.database.windows.net,1433;Initial Catalog=$sqlDatabase;Persist Security Info=False;User ID=$sqlUser;Password=$sqlPassword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

Write-Host "   📝 Connection String:" -ForegroundColor Cyan
Write-Host "      Server=tcp:$sqlServer.database.windows.net,1433;" -ForegroundColor Gray
Write-Host "      Database=$sqlDatabase;" -ForegroundColor Gray
Write-Host "      User=$sqlUser" -ForegroundColor Gray

try {
    Write-Host "   ⏳ Adding connection string to Web App settings..." -ForegroundColor Cyan
    az webapp config appsettings set `
        --resource-group $resourceGroup `
        --name $webAppName `
        --settings "ConnectionStrings__DefaultConnection=$connectionString" | Out-Null
    Write-Host "   ✅ Connection string configured" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
    exit 1
}

# Step 4: Allow Azure Services in SQL Firewall
Write-Host ""
Write-Host "Step 4️⃣: Configuring SQL firewall..." -ForegroundColor Yellow
try {
    Write-Host "   ⏳ Enabling Azure services in SQL firewall..." -ForegroundColor Cyan
    az sql server firewall-rule create `
        --resource-group $resourceGroup `
        --server $sqlServer `
        --name "AllowAllAzureIps" `
        --start-ip-address "0.0.0.0" `
        --end-ip-address "0.0.0.0" 2>&1 | Out-Null
    Write-Host "   ✅ SQL firewall configured" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  Firewall rule may already exist (this is OK)" -ForegroundColor Yellow
}

# Step 5: Restart Web App
Write-Host ""
Write-Host "Step 5️⃣: Restarting Web App..." -ForegroundColor Yellow
try {
    Write-Host "   ⏳ Restarting $webAppName..." -ForegroundColor Cyan
    az webapp restart --resource-group $resourceGroup --name $webAppName
    Write-Host "   ✅ Web App restarted" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}

# Step 6: Download Publish Profile
Write-Host ""
Write-Host "Step 6️⃣: Downloading publish profile..." -ForegroundColor Yellow
$publishProfilePath = "./publishProfile.xml"
try {
    Write-Host "   ⏳ Downloading publish profile..." -ForegroundColor Cyan
    az webapp deployment publish-profile --resource-group $resourceGroup --name $webAppName --xml > $publishProfilePath
    Write-Host "   ✅ Saved to: $publishProfilePath" -ForegroundColor Green
    Write-Host "   📝 Size: $(Get-Item $publishProfilePath).Length bytes" -ForegroundColor Cyan
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}

# Step 7: Display Publish Profile Content
Write-Host ""
Write-Host "Step 7️⃣: Publish Profile Content (for GitHub Secret)" -ForegroundColor Yellow
Write-Host "   📋 Copy the content below:" -ForegroundColor Cyan
Write-Host "   ────────────────────────────────────────────────────────────" -ForegroundColor Gray
$profileContent = Get-Content $publishProfilePath -Raw
Write-Host $profileContent -ForegroundColor White
Write-Host "   ────────────────────────────────────────────────────────────" -ForegroundColor Gray

# Step 8: Save to clipboard (Windows only)
if ($PSVersionTable.Platform -eq "Win32NT") {
    Write-Host ""
    Write-Host "Step 8️⃣: Copying to clipboard..." -ForegroundColor Yellow
    try {
        $profileContent | Set-Clipboard
        Write-Host "   ✅ Publish profile copied to clipboard" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️  Could not copy to clipboard: $_" -ForegroundColor Yellow
    }
}

# Step 9: Get Web App URL
Write-Host ""
Write-Host "Step 9️⃣: Getting Web App information..." -ForegroundColor Yellow
try {
    $webAppInfo = az webapp show --resource-group $resourceGroup --name $webAppName | ConvertFrom-Json
    $webAppUrl = $webAppInfo.defaultHostName
    Write-Host "   ✅ Web App URL: https://$webAppUrl" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  Could not retrieve Web App info: $_" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "✅ AZURE CONFIGURATION COMPLETE!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 NEXT STEP - Add GitHub Secret:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   1. Go to GitHub: https://github.com/patpishivacharan-glitch/shivapatpi"
Write-Host "   2. Settings → Secrets and variables → Actions"
Write-Host "   3. Click 'New repository secret'"
Write-Host "   4. Name: AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND"
Write-Host "   5. Value: Paste the publish profile content (copied to clipboard)"
Write-Host "   6. Click 'Add secret'"
Write-Host ""

Write-Host "🔗 THEN:" -ForegroundColor Cyan
Write-Host "   • GitHub Actions will auto-deploy"
Write-Host "   • Monitor: https://github.com/patpishivacharan-glitch/shivapatpi/actions"
Write-Host "   • Wait 5-10 minutes for deployment"
Write-Host "   • Test: https://$webAppUrl/swagger"
Write-Host ""

Write-Host "════════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

Write-Host "📁 Publish profile saved to: $publishProfilePath" -ForegroundColor Cyan
Write-Host "   (You can copy it manually if clipboard copy failed)"
Write-Host ""
