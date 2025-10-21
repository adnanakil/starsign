# StarSign - Astrology Birth Chart App

A beautiful mobile-first web application for generating personalized astrology birth chart interpretations. Built with React, TypeScript, Firebase, and Tailwind CSS.

## Features

- Mobile-responsive design with cosmic-themed UI
- Birth chart generation based on date, time, and place of birth
- Calculates Sun, Moon, and Rising signs
- Displays planetary positions and house placements
- Generates personalized astrological interpretations
- Firebase Firestore integration for storing charts
- Optimized for deployment on Vercel

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase Firestore
- **Forms**: React Hook Form
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Firebase project (for database functionality)
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Starsign
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Get your Firebase configuration from Project Settings
   - Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   - Fill in your Firebase credentials in `.env`

4. Run the development server:
```bash
npm run dev
```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Click on "Web" to add a web app
4. Copy the configuration values
5. Go to "Firestore Database" in the left menu
6. Click "Create database" and choose "Start in test mode" (for development)
7. Add your configuration to `.env` file

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all `VITE_FIREBASE_*` variables from your `.env` file

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables in the project settings
6. Deploy

## Environment Variables

Required environment variables for Firebase:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Project Structure

```
src/
├── components/
│   ├── BirthChartForm.tsx    # Input form for birth details
│   └── ChartResult.tsx        # Display chart interpretation
├── services/
│   └── chartService.ts        # Firebase Firestore operations
├── utils/
│   └── astrology.ts           # Birth chart calculations
├── types.ts                   # TypeScript type definitions
├── firebase.ts                # Firebase configuration
├── App.tsx                    # Main app component
└── index.css                  # Tailwind styles
```

## Features Roadmap

- [ ] User authentication
- [ ] Save and view past charts
- [ ] Share charts via social media
- [ ] Advanced astrological aspects
- [ ] Integration with real ephemeris data
- [ ] PDF export functionality
- [ ] Multiple language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Astrological calculations are simplified for educational purposes
- For production use, consider integrating with professional astrology APIs like Swiss Ephemeris
