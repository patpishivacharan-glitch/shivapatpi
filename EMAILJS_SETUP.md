# EmailJS Setup Instructions

## Current Status
Your contact form is currently working with a **fallback mechanism** that opens the user's default email client. To enable direct email sending through the web form, follow these setup steps:

## Quick Start (Current Functionality)
- ✅ Contact form works immediately
- ✅ Opens default email client with pre-filled message  
- ✅ No setup required
- ❌ Requires user to manually send email

## Advanced Setup (Direct Email Sending)
To enable email functionality in your contact form, you need to set up EmailJS service. Follow these steps:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service" 
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account (`patpi.shivacharan@gmail.com`)
5. Note down the **Service ID** (e.g., `service_abc123`)

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Set up your template with these variables:
   ```
   Subject: New Contact Form Message - {{subject}}
   
   From: {{from_name}} <{{from_email}}>
   
   Message:
   {{message}}
   
   ---
   Reply to: {{reply_to}}
   ```
4. Note down the **Template ID** (e.g., `template_xyz789`)

## 4. Get Public Key
1. Go to "Account" > "General" 
2. Find your **Public Key** (e.g., `user_abc123xyz`)

## 5. Configure Environment Variables
1. Create a `.env` file in your project root:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here  
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
   REACT_APP_TO_EMAIL=patpi.shivacharan@gmail.com
   ```

2. Replace the placeholder values with your actual EmailJS credentials

## 6. Restart Development Server
```bash
npm start
```

## Template Variables Used
- `{{from_name}}` - Sender's name from form
- `{{from_email}}` - Sender's email from form  
- `{{to_email}}` - Your email (patpi.shivacharan@gmail.com)
- `{{subject}}` - Subject from form dropdown
- `{{message}}` - Message content from form
- `{{reply_to}}` - Sender's email for replies

## Test the Contact Form
1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the message
4. Verify all form data is properly formatted

## Troubleshooting
- Make sure all environment variables are set correctly
- Check EmailJS dashboard for any service issues
- Verify your email service is properly connected
- Check browser console for any error messages

## Security Notes
- Your EmailJS public key is safe to expose in frontend code
- Never put private keys in frontend applications
- EmailJS handles the secure email sending process