# 🦕 Dino Jump - Farcaster Mini App

A simple and addictive Dino game built as a Farcaster Mini App. Tap to jump over obstacles and see how far you can go!

## 🎮 Game Features

- **Simple Controls**: Just tap or click to jump
- **Progressive Difficulty**: Game speed increases as you score higher
- **Score Tracking**: Keep track of your best scores
- **Mobile Optimized**: Works perfectly on mobile devices
- **Responsive Design**: Adapts to different screen sizes

## 🚀 How to Play

1. Click "Start Game" to begin
2. Tap anywhere on the screen (or press spacebar) to make the dino jump
3. Jump over the brown obstacles to score points
4. Don't hit any obstacles or the game ends!
5. Try to beat your high score

## 🛠️ Development Setup

### Prerequisites

- Node.js (version 14 or higher)
- A web server (Python's built-in server works fine)

### Local Development

1. Clone or download this repository
2. Start a local web server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js
   npx serve .
   ```

3. Open your browser and go to `http://localhost:8000`

### Testing on Mobile

1. Find your computer's IP address
2. Access the game from your mobile device at `http://YOUR_IP:8000`
3. Test touch controls and responsiveness

## 📱 Farcaster Mini App Deployment

### 1. Host Your App

Deploy your app to a hosting service like:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

### 2. Update the Manifest

Edit `public/.well-known/farcaster.json` with your actual domain:

- Replace `https://your-domain.com` with your actual domain
- Add your app icon URL
- Update screenshots if you have them

### 3. Enable Developer Mode in Farcaster

1. Log in to your Farcaster account
2. Go to [Developer Tools Settings](https://farcaster.xyz/~/settings/developer-tools)
3. Toggle on "Developer Mode"

### 4. Register Your Mini App

1. Use the Farcaster developer tools to register your app
2. Point to your `farcaster.json` manifest file
3. Once registered, your app will be discoverable in the Farcaster ecosystem

## 🎯 Game Mechanics

- **Dino Physics**: Realistic jumping with gravity
- **Obstacle Generation**: Randomly spawned obstacles
- **Collision Detection**: Precise collision detection
- **Score System**: Points for each obstacle cleared
- **Speed Progression**: Game gets faster as score increases

## 🎨 Customization

Feel free to customize:

- Colors and styling in `style.css`
- Game mechanics in `game.js`
- Obstacle appearance and behavior
- Sound effects (add audio files and implement)

## 📄 Files Structure

```
├── index.html          # Main HTML file
├── style.css           # Game styling
├── game.js            # Game logic and mechanics
├── package.json       # Project configuration
├── public/
│   └── .well-known/
│       └── farcaster.json  # Farcaster Mini App manifest
└── README.md          # This file
```

## 🤝 Contributing

Feel free to fork this project and make improvements:

- Add sound effects
- Implement power-ups
- Add different dino skins
- Create different obstacle types
- Add multiplayer features

## 📜 License

MIT License - feel free to use this code for your own projects!

## 🐛 Issues

If you encounter any issues:

1. Check that your manifest file is accessible at `https://your-domain.com/.well-known/farcaster.json`
2. Ensure your app is mobile-responsive
3. Test the game in different browsers and devices

---

**Have fun playing Dino Jump! 🦕**
