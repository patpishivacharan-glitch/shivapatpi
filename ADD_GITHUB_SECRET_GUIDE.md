# How to Add GitHub Secret - Complete Step-by-Step Guide

## PART 1: Download Publish Profile from Azure

### Step 1: Open Your Web App

Go to your Web App URL (already open in Azure Portal):
```
https://portal.azure.com/#@keerthismi1gmail.onmicrosoft.com/resource/subscriptions/e602e3fe-d68f-4dca-89eb-48c5d7a71131/resourceGroups/shivapatpi/providers/Microsoft.Web/sites/shivapatpi/appServices
```

### Step 2: Click "Overview"

In the left navigation menu, make sure you're on the **Overview** page.

### Step 3: Get Publish Profile

**Top right corner** of the page, you'll see a button bar. Click:

```
[Get publish profile]
```

It looks like this:
```
┌─────────────────────────────────────────┐
│  [Start]  [Stop]  [Restart]  [Get publ │
│                                         │
│  Get publish profile ← CLICK HERE      │
└─────────────────────────────────────────┘
```

### Step 4: A File Downloads

Your browser will automatically download a file named:
```
shivapatpi.PublishSettings
```

**Save this file somewhere** (Downloads folder is fine).

### Step 5: Open the File

**Right-click** the downloaded file → **Open with** → **Notepad** (or any text editor)

The file contains XML that looks like:
```xml
<?xml version="1.0" encoding="utf-8"?>
<publishData>
  <publishProfile profileName="shivapatpi - Web Deploy" 
                  publishMethod="MSDeploy"
                  publishUrl="shivapatpi.scm.azurewebsites.net:443"
                  ...
                  password="..." />
</publishData>
```

### Step 6: Copy All Content

**Select all** (Ctrl+A) and **Copy** (Ctrl+C).

---

## PART 2: Add GitHub Secret

### Step 1: Go to GitHub Repository

Open this URL:
```
https://github.com/patpishivacharan-glitch/shivapatpi
```

### Step 2: Open Settings

**Top navigation bar**, click:
```
[Settings]
```

### Step 3: Go to Secrets

**Left sidebar**, click:
```
Secrets and variables → Actions
```

The path looks like:
```
Left Menu:
├── General
├── Collaborators and teams
├── Moderation
├── Code and automation
│   ├── Branches
│   ├── Environments
│   ├── Rulesets
│   ├── Webhooks
│   └── → Secrets and variables  ← CLICK HERE
│       └── → Actions            ← THEN CLICK HERE
│
```

### Step 4: Create New Secret

Click the green button:
```
[New repository secret]
```

### Step 5: Enter Secret Details

You'll see a form like this:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Actions secrets                                       │
│                                                         │
│  Name *                                                │
│  ┌─────────────────────────────────────────────────┐  │
│  │ AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND          │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  Secret *                                              │
│  ┌─────────────────────────────────────────────────┐  │
│  │ [Paste the XML content here]                    │  │
│  │ [The entire contents from Step 1.6]             │  │
│  │                                                  │  │
│  │ <?xml version="1.0" encoding="utf-8"?>          │  │
│  │ <publishData>                                    │  │
│  │   ... (all the XML) ...                          │  │
│  │ </publishData>                                   │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│                          [Add secret]  [Cancel]        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**In the "Name" field**, type exactly:
```
AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND
```

**In the "Secret" field**, paste the XML content you copied from Step 1.6:
- **Right-click** → **Paste** (Ctrl+V)
- Or use middle-mouse button to paste

### Step 6: Click "Add secret"

Click the green button:
```
[Add secret]
```

### Step 7: Confirmation

You'll see it appear in the list:
```
Actions secrets

Name                                          Last used
──────────────────────────────────────────────────────
AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND        Never
```

✅ **Done!**

---

## PART 3: GitHub Actions Will Auto-Deploy

### Step 1: Check GitHub Actions

Go to the Actions tab:
```
https://github.com/patpishivacharan-glitch/shivapatpi/actions
```

### Step 2: You Should See Workflow Running

The workflow "Build and deploy .NET backend API to Azure" should start automatically within a minute.

You'll see:
```
Build and deploy .NET backend API to Azure #5
├─ Branch: master
├─ Status: ⏳ In Progress (or ✅ Completed)
├─ build job
│  ├─ Set up .NET Core ✅
│  ├─ Restore ✅
│  ├─ Build ✅
│  ├─ Publish ✅
│  └─ Upload artifacts ✅
└─ deploy job
   ├─ Download artifact ✅
   └─ Deploy to Azure Web App ⏳
```

### Step 3: Wait for Deployment

- **First time**: 5-10 minutes
- **Status page**: https://github.com/patpishivacharan-glitch/shivapatpi/actions
- **Green checkmark** = Success! ✅
- **Red X** = Check logs to see error

### Step 4: Test the API

Once deployment completes, test it:

```
https://shivapatpi.azurewebsites.net/swagger
```

You should see the Swagger documentation with all endpoints.

Click on `/api/students` → Try it out → Execute

Should return 25 students ✅

---

## 🎯 Quick Reference

| What | Where | Value |
|------|-------|-------|
| Secret Name | GitHub Settings → Secrets | `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND` |
| Secret Value | Paste here | Entire XML from publish profile |
| Where to get XML | Azure Web App → Get publish profile | Click button → Save file → Copy content |
| Watch Deployment | GitHub Actions tab | https://github.com/patpishivacharan-glitch/shivapatpi/actions |
| Test API | Browser | https://shivapatpi.azurewebsites.net/swagger |

---

## ✅ Troubleshooting

### "Secret shows but deployment didn't start"
- Push a commit to master branch to trigger workflow
- Or manually trigger from Actions tab → "Run workflow"

### "Deployment failed with authentication error"
- Secret name might be wrong
- Double-check it's exactly: `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND`
- Secret might be truncated - paste the entire XML file
- Try downloading publish profile again

### "API returns 500 error"
- Connection string might not be configured yet
- Go back and add connection string to Web App (Settings → Configuration)
- Restart Web App
- Re-trigger deployment

### "Can't find 'Get publish profile' button"
- Make sure you're on the Web App Overview page (not a different resource)
- Look for button bar at the top right
- It might be in a dropdown menu (three dots: ⋯)

---

## ✅ Verification Checklist

After following all steps:

- [ ] Publish profile downloaded from Azure
- [ ] XML content copied to clipboard
- [ ] GitHub secret created with correct name: `AZUREAPPSERVICE_PUBLISHPROFILE_BACKEND`
- [ ] XML pasted as secret value
- [ ] Secret appears in GitHub Secrets list
- [ ] GitHub Actions workflow triggered
- [ ] Workflow shows "completed" status (green checkmark)
- [ ] API endpoint responds: https://shivapatpi.azurewebsites.net/api/students
- [ ] Frontend loads Students page with 25 students

Once all checked, you're done! 🎉
