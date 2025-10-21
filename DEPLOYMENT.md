# Deployment Guide

## Prerequisites
- Git repository (already initialized ✓)
- Vercel account (create at [vercel.com](https://vercel.com))
- Firebase project configured (already done ✓)

## Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Create a GitHub repository:**
   - Go to [github.com](https://github.com) and create a new repository
   - Name it `starsign` or any name you prefer
   - Don't initialize with README (we already have one)

2. **Push your code to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/starsign.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Add environment variables:
     - `VITE_FIREBASE_API_KEY`: AIzaSyDYV7mathE4_0HGjJeX7UKfd0C4JZF3OlI
     - `VITE_FIREBASE_AUTH_DOMAIN`: starsign-30f7d.firebaseapp.com
     - `VITE_FIREBASE_PROJECT_ID`: starsign-30f7d
     - `VITE_FIREBASE_STORAGE_BUCKET`: starsign-30f7d.firebasestorage.app
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`: 47654292033
     - `VITE_FIREBASE_APP_ID`: 1:47654292033:web:b648ead81840b7b03314c0
     - `VITE_FIREBASE_MEASUREMENT_ID`: G-7ZLSF4NVR9
   - Click "Deploy"

4. **Your app will be live!**
   - Vercel will give you a URL like `https://starsign.vercel.app`
   - Every push to main branch will auto-deploy

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Add environment variables when prompted

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Update Firestore Security Rules

After deploying, update your Firestore rules:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Firestore Database > Rules
4. Copy the rules from `firestore.rules` file in this project
5. Click "Publish"

## Post-Deployment

### Custom Domain (Optional)
1. In Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Enable HTTPS
Vercel automatically provides HTTPS for all deployments.

### Monitor Analytics
Firebase Analytics is already configured and will track user interactions.

## Troubleshooting

### Build fails on Vercel
- Check that all environment variables are set correctly
- Ensure Node.js version is 18+ (set in Vercel project settings)

### Firestore permission denied
- Check that Firestore rules are published
- Verify Firebase project ID in environment variables

### App loads but charts don't save
- Verify all Firebase environment variables are set in Vercel
- Check browser console for Firebase errors
- Ensure Firestore is enabled in Firebase Console

## Environment Variables Checklist

Make sure these are set in Vercel:
- [ ] VITE_FIREBASE_API_KEY
- [ ] VITE_FIREBASE_AUTH_DOMAIN
- [ ] VITE_FIREBASE_PROJECT_ID
- [ ] VITE_FIREBASE_STORAGE_BUCKET
- [ ] VITE_FIREBASE_MESSAGING_SENDER_ID
- [ ] VITE_FIREBASE_APP_ID
- [ ] VITE_FIREBASE_MEASUREMENT_ID

## Next Steps

After deployment, consider:
- Adding user authentication (Firebase Auth)
- Implementing user-specific chart history
- Adding social sharing features
- Setting up production Firestore security rules
- Enabling Firebase App Check for security
- Adding a custom domain
