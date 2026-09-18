# Azure Deployment Guide for ShivaPatpi Backend API

## Prerequisites

1. Azure subscription with active billing
2. GitHub repository with write access
3. Azure SQL Server database already created
4. .NET 8.0 SDK installed locally for testing
5. Azure CLI installed (optional but recommended)

## Step 1: Create Azure Web App for Backend API

### Using Azure Portal:

1. Navigate to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Web App"** and click Create
4. Configure the Web App:
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new or use existing (e.g., "shivapatpi-resources")
   - **Name**: `shivapatpi-api` (must be globally unique)
   - **Publish**: Code
   - **Runtime stack**: .NET 8 (LTS)
   - **Operating System**: Linux (recommended for cost) or Windows
   - **Region**: Choose closest to your users (e.g., East US)
   - **App Service Plan**: 
     - Create new or select existing
     - Pricing tier: Standard (S1) or higher for production
5. Click **"Review + Create"** → **"Create"**

Wait for deployment to complete.

## Step 2: Configure Application Settings

### In Azure Portal:

1. Go to your Web App → **Settings** → **Configuration**
2. Add Application Settings (Environment Variables):

   | Name | Value |
   |------|-------|
   | `ASPNETCORE_ENVIRONMENT` | Production |
   | `ConnectionStrings__DefaultConnection` | `Server=tcp:shpatpi.database.windows.net,1433;Initial Catalog=shivapatpi;Persist Security Info=False;User ID=shpatpi;Password=YOUR_PASSWORD;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;` |

3. ⚠️ **For security, store the password in Azure Key Vault instead**:
   
   a. Create an Azure Key Vault:
   - Resource Group: Same as Web App
   - Name: `shivapatpi-keyvault`
   
   b. Add secret:
   - Name: `DbPassword`
   - Value: `Microsoft143$`
   
   c. Connect Web App to Key Vault:
   - Go to Web App → **Identity** → Enable **System assigned** managed identity
   - Go to Key Vault → **Access policies** → Add your Web App as a secret reader
   
   d. Update Connection String to use Key Vault reference:
   ```
   Server=tcp:shpatpi.database.windows.net,1433;Initial Catalog=shivapatpi;Persist Security Info=False;User ID=shpatpi;Password=@Microsoft.KeyVault(SecretUri=https://shivapatpi-keyvault.vault.azure.net/secrets/DbPassword/);MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
   ```

4. Click **Save** after making changes

## Step 3: Get Publish Profile

1. In Web App dashboard, click **"Get publish profile"** (top right)
2. Save the downloaded XML file
3. The file contains sensitive credentials - treat it securely

## Step 4: Add GitHub Secrets

1. Go to your GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add:
   - **Name**: `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND`
   - **Value**: Paste the entire contents of the downloaded publish profile XML file
5. Click **Add secret**

⚠️ Keep the publish profile secure and never commit it to the repository.

## Step 5: Verify GitHub Actions Workflow

The workflow file should already exist at `.github/workflows/backend-deploy.yml`

**Key points:**
- Workflow triggers on `push` to `master` branch with changes in `/backend` folder
- Builds, tests, and publishes the .NET solution
- Deploys to Azure using the publish profile from secrets
- Uses artifact upload/download for efficiency

If you need to manually trigger deployment:
1. Go to **Actions** tab
2. Select **"Build and deploy .NET backend API to Azure"**
3. Click **"Run workflow"** → **"Run workflow"**

## Step 6: Configure CORS (if needed)

The API is already configured with CORS in `Program.cs`, but if you need to restrict it:

1. Update `Program.cs` CORS policy for production
2. Redeploy the application

For production with specific frontend URL:
```csharp
options.AddPolicy("AllowFrontend", policy =>
{
    policy.WithOrigins("https://shivapatpi.azurewebsites.net")
        .AllowAnyMethod()
        .AllowAnyHeader();
});
```

## Step 7: Test the Deployment

After successful deployment:

1. Get your API URL:
   - Azure Portal → Web App → **Overview** → Copy the URL
   - Example: `https://shivapatpi-api.azurewebsites.net`

2. Test the API:
```bash
# Get all students
curl -X GET "https://shivapatpi-api.azurewebsites.net/api/students"

# Get Swagger documentation
curl -X GET "https://shivapatpi-api.azurewebsites.net/swagger/index.html"
```

3. Verify in browser:
   - Open `https://shivapatpi-api.azurewebsites.net/swagger` to see interactive API docs
   - Try endpoints: **Try it out** → **Execute**

## Step 8: Monitor Deployment

### Azure Portal Monitoring:

1. Web App → **Monitoring** → **Log stream**: View real-time logs
2. Web App → **Monitoring** → **Diagnostic settings**: Configure detailed logging
3. Application Insights (optional):
   - Enable Application Insights for better monitoring
   - Track performance, errors, and user activity

### GitHub Actions Logs:

1. Go to **Actions** tab
2. Click on the workflow run
3. Expand job steps to see build logs, deployment logs, etc.

## Step 9: Database Migrations

The API automatically applies database migrations on startup:

```csharp
// In Program.cs
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ShivaPatpiContext>();
    await dbContext.Database.MigrateAsync();
    await DataSeeder.SeedStudentsAsync(dbContext);
}
```

If you need to run migrations manually:
```bash
cd backend
dotnet ef database update -p ShivaPatpi.Data/ShivaPatpi.Data.csproj
```

## Step 10: Update Frontend Configuration

In your frontend (React) application:

1. Create/update `.env.production`:
```env
REACT_APP_API_URL=https://shivapatpi-api.azurewebsites.net
```

2. Ensure your API client uses this URL:
```typescript
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## Troubleshooting

### Common Issues:

**503 Service Unavailable**
- Wait a few minutes after deployment for app to start
- Check log stream for errors
- Verify Azure SQL connection string

**500 Internal Server Error**
- Check log stream in Azure Portal
- Verify database connection string is correct
- Ensure database exists and is accessible

**401/403 Unauthorized**
- Verify SQL Server IP whitelist includes Azure Web App
- Check database credentials in configuration

**CORS Errors**
- Frontend URL must be in allowed origins
- Update CORS policy in `Program.cs` if needed

**Database Migration Failures**
- Ensure SQL Server credentials are correct
- Check that database `shivapatpi` exists
- Verify network connectivity to Azure SQL

### Enable Detailed Logging:

In `appsettings.json`:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information"
    }
  }
}
```

## Scaling & Performance

### For Production:

1. **App Service Plan**: Upgrade to Standard (S1) or Premium tier
2. **Autoscale**: Setup auto-scaling rules based on CPU/memory
3. **CDN**: Add Azure CDN for static content (if applicable)
4. **Database**: Consider Azure SQL Database Performance tier upgrade
5. **Monitoring**: Setup Application Insights alerts

## Security Best Practices

1. ✅ Use Azure Key Vault for secrets (password, connection strings)
2. ✅ Enable HTTPS only (default in Azure)
3. ✅ Implement authentication/authorization (future enhancement)
4. ✅ Use Managed Identities instead of credentials when possible
5. ✅ Regularly update .NET runtime and NuGet packages
6. ✅ Enable diagnostic logging and review logs regularly

## Costs Estimate

- **Web App** (Standard S1): ~$75/month
- **Azure SQL Database** (Standard): ~$15-50/month
- **Key Vault**: ~$0.60/month
- **Application Insights**: ~$0.50/month (if enabled)

**Total estimated cost**: $90-125/month for development/small production setup

## Next Steps

1. ✅ Deploy backend API to Azure
2. ✅ Update frontend `.env.production` with API URL
3. ✅ Deploy frontend to Azure Web App
4. ✅ Test full integration
5. ✅ Setup monitoring and alerting
6. ✅ Plan for API versioning and backward compatibility
7. ✅ Consider adding authentication (JWT, Azure AD)
8. ✅ Setup database backup strategy

## Support & Documentation

- [Azure Web App Documentation](https://docs.microsoft.com/azure/app-service/)
- [Entity Framework Core & SQL Server](https://docs.microsoft.com/ef/core/)
- [GitHub Actions for Azure](https://github.com/Azure/actions)
