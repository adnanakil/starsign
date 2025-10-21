# Gemini API Setup Guide

The app now uses Google's Gemini AI to generate personalized birth chart interpretations!

## Get Your Free Gemini API Key

1. **Go to Google AI Studio:**
   - Visit: https://makersuite.google.com/app/apikey
   - Or: https://aistudio.google.com/app/apikey

2. **Sign in with your Google Account**

3. **Create API Key:**
   - Click "Get API Key" or "Create API Key"
   - Click "Create API key in new project" (or select existing project)
   - Copy the API key that appears

4. **Add to your .env file:**
   ```bash
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

5. **Restart your dev server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

## Add to Vercel

To enable AI interpretations in production:

```bash
vercel env add VITE_GEMINI_API_KEY production
# Paste your Gemini API key when prompted
```

Or via Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add new variable:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: Your Gemini API key
   - Environment: Production

Then redeploy:
```bash
vercel --prod
```

## API Limits

**Free Tier (as of 2024):**
- 60 requests per minute
- 1,500 requests per day
- Perfect for testing and moderate usage

**Upgrade Options:**
- If you need more requests, you can upgrade to Gemini API Pro
- Visit: https://ai.google.dev/pricing

## How It Works

The app sends your birth chart data to Gemini with a detailed prompt asking it to generate a personalized astrological interpretation. This includes:
- Sun, Moon, and Rising signs
- All planetary positions
- House cusps
- Birth location

Gemini analyzes this and creates a unique 300-400 word interpretation that reads like it was written by a professional astrologer!

## Fallback Behavior

If the API key is missing or the request fails, the app will automatically fall back to a basic template-based interpretation so your users still get a result.

## Security Note

Never commit your `.env` file to git. The `.gitignore` file is already configured to exclude it.
