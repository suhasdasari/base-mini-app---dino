# 🚀 Deployment Guide for Dino Jump Mini App

## Quick Start

Your Dino game is now ready! Here's how to deploy it as a Farcaster Mini App:

## 1. 🏠 Choose a Hosting Platform

### Option A: Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Create a new project and upload your files
4. Your app will be live at `https://your-project.vercel.app`

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your app will be live at `https://random-name.netlify.app`

### Option C: GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Enable GitHub Pages from main branch
4. Your app will be live at `https://username.github.io/repository-name`

## 2. 📝 Update Your Manifest

Once you have your domain, update `public/.well-known/farcaster.json`:

```json
{
  "name": "Dino Jump",
  "iconUrl": "https://YOUR-DOMAIN.com/icon.png",
  "homeUrl": "https://YOUR-DOMAIN.com",
  "description": "A simple and addictive Dino game where you tap to jump over obstacles!",
  "categories": ["game", "entertainment"],
  "tags": ["dino", "jump", "game", "arcade", "casual"]
}
```

## 3. 🔧 Enable Farcaster Developer Mode

1. Log in to your Farcaster account
2. Go to [farcaster.xyz/~/settings/developer-tools](https://farcaster.xyz/~/settings/developer-tools)
3. Toggle on "Developer Mode"

## 4. 📱 Register Your Mini App

1. In Farcaster, go to Developer Tools
2. Use the "Register Mini App" tool
3. Enter your manifest URL: `https://YOUR-DOMAIN.com/.well-known/farcaster.json`
4. Follow the prompts to register your app

## 5. ✅ Test Your Mini App

1. Open Farcaster on mobile
2. Look for your Mini App in the discovery section
3. Test the game functionality
4. Make sure touch controls work properly

## 🎯 Current Features

✅ **Working Game Mechanics:**

- Tap/click to jump
- Obstacle generation and collision detection
- Score tracking with localStorage
- Progressive difficulty
- Game over screen with restart

✅ **Farcaster Integration:**

- Mini App SDK integration
- Proper manifest structure
- Mobile-optimized design

✅ **User Experience:**

- Responsive design for all devices
- Touch-friendly controls
- Visual feedback and animations
- High score persistence

## 🔧 Testing Locally

Your game is already running locally at `http://localhost:8000`

Test these features:

- [ ] Tap to jump works
- [ ] Obstacles spawn correctly
- [ ] Collision detection works
- [ ] Score increases properly
- [ ] Game over and restart functions
- [ ] Mobile responsiveness
- [ ] High score persistence

## 🎨 Customization Ideas

Want to enhance your game? Try adding:

- **Sound Effects**: Add jump and game over sounds
- **Power-ups**: Speed boosts, invincibility, etc.
- **Different Obstacles**: Flying birds, multiple cacti
- **Dino Skins**: Different colors and animations
- **Background Scrolling**: Moving background elements
- **Achievements**: Unlock different milestones

## 📱 Mobile Testing

Test on your phone:

1. Find your computer's IP address
2. Visit `http://YOUR_IP:8000` on your mobile device
3. Test touch controls and responsiveness

## 🚨 Common Issues

**Manifest not found?**

- Ensure your `.well-known/farcaster.json` is accessible
- Check that your hosting platform serves static files correctly

**Game not responsive?**

- Test on different screen sizes
- Check mobile viewport settings

**Farcaster SDK errors?**

- The game will work without the SDK (standalone mode)
- SDK integration is optional for basic functionality

## 🎉 You're Done!

Your Dino Jump Mini App is ready to be discovered by Farcaster users! The game features:

- Simple, addictive gameplay
- Mobile-optimized controls
- Score tracking and progression
- Beautiful, responsive design
- Full Farcaster Mini App integration

Share your Mini App with friends and watch them compete for high scores! 🦕
