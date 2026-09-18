# Azure Deployment Guide - ShivaPatpi Backend API

This guide will walk you through deploying the backend API to Azure.

## Prerequisites

- Azure Subscription ([Free account](https://azure.microsoft.com/free))
- Azure CLI ([Download](https://docs.microsoft.com/cli/azure/install-azure-cli))
- GitHub account with write access to the repository

## Step 1: Create Azure Web App

### Option A: Using Azure Portal (Recommended for first-time setup)

1. **Go to Azure Portal**: https://portal.azure.com

2. **Create Web App**:
   - Click `+ Create a resource`
   - Search for "Web App"
   - Click `Create`

3. **Configure Web App**:
   ```
   Project Details:
   - Resource Group: Create new or use existing
   - Name: shivapatpi-api
   
   Instance Details:
   - Publish: Code
   - Runtime stack: .NET 8
   - Operating System: Linux
   - Region: (Choose closest to you)
   
   App Service Plan:
   - Create new or use existing
   - SKU and size: Standard S1 or higher (B1 won't work for Entity Framework)
   ```

4. **Click Review + Create** → **Create**

5. **Wait** for deployment (2-3 minutes)

### Option B: Using Azure CLI

```bash
az group create --name shivapatpi-rg --location eastus

az appservice plan create \
  --name shivapatpi-plan \
  --resource-group shivapatpi-rg \
  --sku S1 \
  --is-linux

az webapp create \
  --resource-group shivapatpi-rg \
  --plan shivapatpi-plan \
  --name shivapatpi-api \
  --runtime "DOTNET|8.0"
```

## Step 2: Configure Connection String

### In Azure Portal:

1. **Go to Web App**: Search for "shivapatpi-api"

2. **Configuration → Application settings**

3. **Add Connection String**:
   - Name: `ConnectionStrings__DefaultConnection`
   - Value: 
   ```
   Server=tcp:shpatpi.database.windows.net,1433;Initial Catalog=shivapatpi;Persist Security Info=False;User ID=shpatpi;Password=Microsoft143$;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
   ```
   - Type: `SQLAzure`

4. **Click Save** and confirm restart

## Step 3: Download Publish Profile

### In Azure Portal:

1. **Go to Web App**: shivapatpi-api

2. **Overview** section (top right)

3. **Get publish profile** button

4. **Save** the downloaded `.PublishSettings` file locally

5. **Copy the entire XML content**

## Step 4: Add GitHub Secret

### In GitHub:

1. **Go to Repository**: https://github.com/patpishivacharan-glitch/shivapatpi

2. **Settings** → **Secrets and variables** → **Actions**

3. **New repository secret**:
   - Name: `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND`
   - Value: Paste the entire XML content from Step 3.4

4. **Add secret**

## Step 5: Allow Azure SQL Access

### In Azure Portal:

1. **Go to SQL Server**: Search for "shpatpi" or find in resource group

2. **Networking** → **Firewall and virtual networks**

3. **Add current client IP** (your IP will be shown)

4. **Add rule for Azure services**:
   - Allow Azure services and resources to access this server: **ON**

5. **Save**

### Alternative: Allow specific Web App IP

```bash
# Get Web App outbound IP
az webapp show --resource-group shivapatpi-rg --name shivapatpi-api --query outboundIpAddresses

# Add to SQL Server firewall
```

## Step 6: Deploy Backend

### Option A: Automatic Deployment (Recommended)

1. **Commit changes**:
   ```bash
   cd C:\shivapatpi\shivapatpi
   git add backend/
   git commit -m "Configure backend for Azure deployment"
   git push origin master
   ```

2. **GitHub Actions will trigger automatically**
   - Monitor: https://github.com/patpishivacharan-glitch/shivapatpi/actions
   - Workflow: "Build and deploy .NET backend API to Azure"

3. **Wait for deployment** (5-10 minutes):
   - ✅ Build succeeds
   - ✅ Deploy succeeds
   - ✅ App starts

### Option B: Manual Deployment

```bash
# Using Azure CLI
az webapp deployment source config-zip \
  --resource-group shivapatpi-rg \
  --name shivapatpi-api \
  --src path/to/published/app.zip
```

## Step 7: Verify Deployment

### Test API Endpoints:

1. **Students endpoint**:
   ```
   GET https://shivapatpi-api.azurewebsites.net/api/students
   ```

2. **Swagger Documentation**:
   ```
   https://shivapatpi-api.azurewebsites.net/swagger
   ```

3. **Using curl**:
   ```bash
   curl -X GET "https://shivapatpi-api.azurewebsites.net/api/students?pageNumber=1&pageSize=10"
   ```

### Check Logs:

1. **Log Analytics**:
   - Azure Portal → Web App → Log stream
   - Should show startup logs

2. **Application Insights** (optional):
   - Provides performance monitoring and error tracking

## Step 8: Update Frontend Production URL

The `.env` file already has the correct production URL:

```
REACT_APP_API_URL=https://shivapatpi-api.azurewebsites.net/api
```

**Note**: This URL is used when deploying the frontend. For local development, you can override it:

```bash
REACT_APP_API_URL=http://localhost:5049/api npm start
```

## Step 9: Configure CORS (If Needed)

If frontend is on a different domain, update `Program.cs`:

```csharp
var corsPolicy = environment.IsProduction() 
    ? "ProductionPolicy" 
    : "DevelopmentPolicy";

app.UseCors(corsPolicy);
```

## Troubleshooting

### Issue: "Failed to connect to database"

**Solutions**:
1. Verify SQL Server firewall allows Azure (Step 5)
2. Check connection string in Application settings
3. Verify credentials (user: `shpatpi`, password: `Microsoft143$`)

### Issue: "502 Bad Gateway"

**Solutions**:
1. Check if app crashed: Azure Portal → Log stream
2. Verify .NET 8 runtime is installed
3. Check for startup errors in logs

### Issue: "CORS error in browser"

**Solutions**:
1. Verify frontend URL is allowed in CORS policy
2. Check browser console for exact error
3. Add frontend domain to CORS settings

### Issue: "Publish Profile not working"

**Solutions**:
1. Download fresh publish profile
2. Verify XML is complete (not truncated)
3. Ensure secret name matches workflow file: `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND`

## Monitoring & Maintenance

### Enable Application Insights

1. Azure Portal → Web App → Application Insights
2. Click "Enable Application Insights"
3. View metrics: Requests, Failures, Response time

### View Logs

```bash
# Stream logs in real-time
az webapp log tail --resource-group shivapatpi-rg --name shivapatpi-api

# Download logs
az webapp log download --resource-group shivapatpi-rg --name shivapatpi-api
```

### Restart App

```bash
az webapp restart --resource-group shivapatpi-rg --name shivapatpi-api
```

## Security Best Practices

1. ✅ **Connection String**: Stored in Application Settings (not in code)
2. ✅ **Credentials**: Use Azure Key Vault for secrets
3. ✅ **HTTPS**: Automatically enforced on azurewebsites.net
4. ✅ **Firewall**: Restrict SQL Server access to Azure services only
5. ✅ **Secrets**: Never commit appsettings.Development.json with credentials

### Migrate to Azure Key Vault

```bash
# Create Key Vault
az keyvault create --resource-group shivapatpi-rg --name shivapatpi-kv

# Add secrets
az keyvault secret set --vault-name shivapatpi-kv --name DbPassword --value "Microsoft143$"

# Grant Web App access
az keyvault set-policy --name shivapatpi-kv \
  --object-id $(az webapp identity assign --resource-group shivapatpi-rg --name shivapatpi-api --query principalId -o tsv) \
  --secret-permissions get
```

## Cost Estimation

- **Web App (Standard S1)**: ~$50-75/month
- **SQL Database**: ~$15/month (single database, included tier)
- **Total**: ~$65-90/month

**Note**: Use B1 tier ($10/month) if performance is acceptable

## Next Steps

1. ✅ Complete all 9 steps above
2. ✅ Verify API is responding
3. ✅ Test frontend integration
4. ✅ Set up monitoring
5. ✅ Configure auto-scaling (optional)

## Helpful Links

- [Azure Web App Documentation](https://docs.microsoft.com/azure/app-service/app-service-web-overview)
- [Azure SQL Database Documentation](https://docs.microsoft.com/azure/sql-database/)
- [Entity Framework Core SQL Azure](https://docs.microsoft.com/ef/core/providers/sql-server/)
- [GitHub Actions for Azure](https://github.com/Azure/actions)
