# Azure Web App Deployment Guide

## Prerequisites
1. Azure subscription
2. GitHub repository (already created: https://github.com/patpishivacharan-glitch/shivapatpi)

## Steps to Deploy to Azure Web App

### 1. Create Azure Web App
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → "Web App"
3. Configure:
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `shivapatpi-webapp` (or your preferred name)
   - **Publish**: Code
   - **Runtime stack**: Node 18 LTS
   - **Operating System**: Linux
   - **Region**: Choose closest to your users
   - **Plan**: Select appropriate pricing tier

### 2. Configure Deployment
1. In your Web App → **Deployment** → **Deployment Center**
2. Select **GitHub** as source
3. Authorize GitHub and select:
   - **Organization**: patpishivacharan-glitch
   - **Repository**: shivapatpi
   - **Branch**: master
4. Azure will automatically detect the workflow file and create deployment

### 3. Alternative: Manual Publish Profile Setup
If you prefer manual setup:
1. Go to your Web App → **Get publish profile** (download)
2. In GitHub repository → **Settings** → **Secrets and variables** → **Actions**
3. Add new repository secret:
   - **Name**: `AZUREAPPSERVICE_PUBLISHPROFILE`
   - **Value**: Paste the entire content of the downloaded publish profile

### 4. Update Workflow (if needed)
In `.github/workflows/azure-deploy.yml`, update the `app-name` if different:
```yaml
app-name: 'your-actual-webapp-name'
```

### 5. Trigger Deployment
- Push any changes to master branch
- Or manually trigger from GitHub Actions tab

## Expected Deployment URL
After successful deployment, your app will be available at:
`https://shivapatpi-webapp.azurewebsites.net`

## Troubleshooting
- Check GitHub Actions for build/deployment logs
- Verify Web App logs in Azure Portal → **Monitoring** → **Log stream**
- Ensure Node.js version compatibility