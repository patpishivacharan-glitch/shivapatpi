# Manual Azure Web App Configuration Guide

Since the Azure CLI automation encountered subscription issues, here's how to manually configure your existing Web App:

## Your Web App Details (from URL)
- **Resource Group**: shivapatpi
- **Web App Name**: shivapatpi
- **API Endpoint**: Will be `https://shivapatpi.azurewebsites.net/api`

## STEP 1: Configure Connection String

1. **Go to**: https://portal.azure.com/#@keerthismi1gmail.onmicrosoft.com/resource/subscriptions/e602e3fe-d68f-4dca-89eb-48c5d7a71131/resourceGroups/shivapatpi/providers/Microsoft.Web/sites/shivapatpi/appServices

2. **In left sidebar**, click: **Settings → Configuration**

3. **Under "Connection strings"**, click **+ New connection string**

4. **Add these values**:
   - **Name**: `DefaultConnection`
   - **Value**: 
   ```
   Server=tcp:shpatpi.database.windows.net,1433;Initial Catalog=shivapatpi;Persist Security Info=False;User ID=shpatpi;Password=Microsoft143$;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
   ```
   - **Type**: `SQLAzure`

5. **Click OK**

6. **Click Save** at the top

7. **Confirm restart** when prompted

---

## STEP 2: Configure App Settings (OPTIONAL but recommended)

1. Still in **Settings → Configuration**

2. **Under "Application settings"**, click **+ New application setting**

3. **Add**:
   - **Name**: `ASPNETCORE_ENVIRONMENT`
   - **Value**: `Production`

4. **Click OK** and **Save**

---

## STEP 3: Allow Azure Services in SQL Firewall

1. **Go to**: https://portal.azure.com

2. **Search for**: `SQL servers`

3. **Find**: `shpatpi` SQL server

4. **Click** on it

5. **In left sidebar**, click: **Security → Networking**

6. **Turn ON** the toggle for:
   - "Allow Azure services and resources to access this server"

7. **Click Save**

---

## STEP 4: Download Publish Profile

1. **Back to Web App**: https://portal.azure.com/#@keerthismi1gmail.onmicrosoft.com/resource/subscriptions/e602e3fe-d68f-4dca-89eb-48c5d7a71131/resourceGroups/shivapatpi/providers/Microsoft.Web/sites/shivapatpi/appServices

2. **Click**: **Overview** (if not already there)

3. **Top right**, click: **Get publish profile**

4. **A file downloads** (e.g., `shivapatpi.PublishSettings`)

5. **Open the file** with Notepad

6. **Select all** (Ctrl+A) and **copy** to clipboard

---

## STEP 5: Add GitHub Secret

1. **Go to GitHub**: https://github.com/patpishivacharan-glitch/shivapatpi

2. **Click**: Settings

3. **Left sidebar**: Secrets and variables → Actions

4. **Click**: New repository secret

5. **Add**:
   - **Name**: `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND`
   - **Value**: Paste the entire XML content from Step 4.6

6. **Click**: Add secret

---

## STEP 6: Restart Web App (Final step)

1. **Back to Web App Overview**

2. **Top button bar**, click: **Restart**

3. **Confirm** the restart

---

## STEP 7: Wait for Deployment

1. **Go to GitHub Actions**:
   https://github.com/patpishivacharan-glitch/shivapatpi/actions

2. **You should see** a workflow running

3. **Wait 5-10 minutes** for it to complete

4. **Green checkmark** = Success ✅

---

## STEP 8: Test the API

1. **Go to**: 
   ```
   https://shivapatpi.azurewebsites.net/swagger
   ```

2. **Try the endpoint**:
   - Click on `/api/students`
   - Click `Try it out`
   - Click `Execute`
   - Should return 25 students ✅

---

## STEP 9: Verify Frontend Connection

The frontend is already configured to use the Azure API URL.

1. **Deploy frontend to Azure App Service** (or use your current environment)

2. **Navigate to Students page** (`/students`)

3. **Should load all 25 students** ✅

---

## ✅ Configuration Summary

| Setting | Value |
|---------|-------|
| **Web App** | shivapatpi |
| **Resource Group** | shivapatpi |
| **API URL** | https://shivapatpi.azurewebsites.net/api |
| **Database** | shpatpi.database.windows.net |
| **Database Name** | shivapatpi |
| **Students** | 25 pre-loaded |

---

## 🆘 Troubleshooting

### API returns 500 error
- Check App Service logs: Configuration → Log stream
- Verify connection string is correct
- Ensure SQL firewall allows Azure services

### "Failed to fetch" in frontend
- Clear browser cache
- Verify CORS is not blocking (shouldn't be)
- Check browser console for exact error
- Verify API URL in frontend is correct

### Can't download publish profile
- Use PowerShell/CLI command:
  ```powershell
  az webapp deployment list-publishing-profiles `
    --resource-group shivapatpi `
    --name shivapatpi `
    --xml
  ```

### Still having issues?
Run diagnostic in Azure Portal:
- Web App → Diagnose and solve problems
- Click "Application Insights" tile
- View recent errors and logs
