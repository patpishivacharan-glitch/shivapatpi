# QUICK REFERENCE: Adding GitHub Secret

## 🎯 TL;DR - Super Quick Version

### You need TWO things:

#### 1. From Azure Portal:
- Web App → Overview → [Get publish profile] 
- Open downloaded XML file
- Copy entire content (Ctrl+A, Ctrl+C)

#### 2. Go to GitHub:
- Repository Settings → Secrets and variables → Actions
- [New repository secret]
- Name: `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND`
- Secret: Paste the XML (Ctrl+V)
- [Add secret]

✅ **Done!**

---

## 🔗 Direct Links

| Task | Link |
|------|------|
| Azure Web App | https://portal.azure.com/#@keerthismi1gmail.onmicrosoft.com/resource/subscriptions/e602e3fe-d68f-4dca-89eb-48c5d7a71131/resourceGroups/shivapatpi/providers/Microsoft.Web/sites/shivapatpi/appServices |
| GitHub Secrets | https://github.com/shpatpi_microsoft/shivapatpi/settings/secrets/actions |
| GitHub Actions | https://github.com/shpatpi_microsoft/shivapatpi/actions |

---

## 📋 What is the XML Publish Profile?

It's a file that contains:
- Web App URL
- Deployment credentials
- Authentication info

Used by GitHub Actions to automatically deploy your code to Azure.

**Contains sensitive info - keep it private!**

---

## ✅ Checklist

- [ ] Downloaded publish profile from Azure
- [ ] Opened and copied the XML file content
- [ ] Went to GitHub Repository Settings
- [ ] Clicked: Secrets and variables → Actions
- [ ] Clicked: [New repository secret]
- [ ] Entered Name: `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND`
- [ ] Pasted XML content in Secret field
- [ ] Clicked: [Add secret]
- [ ] Secret appears in the list
- [ ] GitHub Actions automatically deploys ✅

---

## 🎉 What Happens Next?

Once the secret is added:
1. GitHub Actions detects the secret
2. Automatically triggers deployment workflow
3. Builds your .NET backend
4. Deploys to Azure Web App
5. Your API is live! 🚀

Monitor at: https://github.com/shpatpi_microsoft/shivapatpi/actions

Test at: https://shivapatpi.azurewebsites.net/swagger
