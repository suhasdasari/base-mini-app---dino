// Game state
let gameRunning = false;
let gameSpeed = 8;
let score = 0;
let highScore = localStorage.getItem("dinoHighScore") || 0;

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const finalScoreElement = document.getElementById("finalScore");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameOverDiv = document.getElementById("gameOver");

// Game objects
const dino = {
  x: 25,
  y: 150,
  width: 22,
  height: 24,
  velocityY: 0,
  grounded: true,
  jumpPower: -8,
  gravity: 0.4,
  color: "#535353",
  animationFrame: 0,
  isRunning: true,
};

const obstacles = [];
let obstacleSpawnTimer = 0;
const obstacleSpawnInterval = 90; // frames - faster spawning for more action

// Game loop
let gameLoop;

// Initialize Farcaster SDK
async function initFarcasterSDK() {
  console.log("Initializing Farcaster SDK...");

  // Wait a bit for SDK to load
  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    if (typeof sdk !== "undefined" && sdk.actions) {
      console.log("Calling sdk.actions.ready()...");
      await sdk.actions.ready();
      console.log("✅ Farcaster SDK ready!");
    } else {
      console.log("⚠️ SDK not available, running standalone");
    }
  } catch (error) {
    console.log("❌ SDK error:", error);
  }
}

// Initialize game
function initGame() {
  obstacles.length = 0;
  score = 0;
  gameSpeed = 8;
  obstacleSpawnTimer = 0;

  // Reset dino position
  dino.y = 150;
  dino.velocityY = 0;
  dino.grounded = true;
  dino.isRunning = true;
  dino.animationFrame = 0;

  // Reset UI
  scoreElement.textContent = String(score).padStart(5, "0");
  highScoreElement.textContent = String(highScore).padStart(5, "0");
  gameOverDiv.style.display = "none";
  startBtn.style.display = "none";
  restartBtn.style.display = "none";

  draw();
}

// Draw functions
function drawDino() {
  ctx.fillStyle = dino.color;

  // Draw dino body (main rectangle) - scaled down
  ctx.fillRect(dino.x + 8, dino.y + 4, 10, 10);

  // Draw dino head
  ctx.fillRect(dino.x + 18, dino.y + 4, 4, 6);

  // Draw dino eye
  ctx.fillStyle = "#f7f7f7";
  ctx.fillRect(dino.x + 20, dino.y + 5, 1, 1);
  ctx.fillStyle = dino.color;

  // Draw dino tail
  ctx.fillRect(dino.x + 2, dino.y + 6, 6, 2);

  // Draw dino legs (running animation) - scaled down
  if (dino.isRunning) {
    dino.animationFrame++;
    if (dino.animationFrame > 20) {
      dino.animationFrame = 0;
    }

    if (dino.animationFrame < 10) {
      // First leg position
      ctx.fillRect(dino.x + 9, dino.y + 14, 3, 9);
      ctx.fillRect(dino.x + 13, dino.y + 16, 3, 7);
    } else {
      // Second leg position
      ctx.fillRect(dino.x + 9, dino.y + 16, 3, 7);
      ctx.fillRect(dino.x + 13, dino.y + 14, 3, 9);
    }
  } else {
    // Standing position
    ctx.fillRect(dino.x + 9, dino.y + 14, 3, 9);
    ctx.fillRect(dino.x + 13, dino.y + 14, 3, 9);
  }
}

function drawObstacles() {
  ctx.fillStyle = "#535353";
  obstacles.forEach((obstacle) => {
    // Draw cactus main body
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Draw cactus arms - scaled down
    if (obstacle.hasArms) {
      ctx.fillRect(obstacle.x - 3, obstacle.y + 5, 3, 6);
      ctx.fillRect(obstacle.x + obstacle.width, obstacle.y + 5, 3, 6);
    }
  });
}

function drawGround() {
  ctx.fillStyle = "#f7f7f7";
  ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

  // Draw ground line
  ctx.fillStyle = "#535353";
  ctx.fillRect(0, canvas.height - 10, canvas.width, 1);
}

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  drawGround();

  // Draw game objects
  drawDino();
  drawObstacles();

  // Draw instructions when game is not running
  if (!gameRunning) {
    ctx.fillStyle = "#535353";
    ctx.font = "20px Courier New";
    ctx.textAlign = "center";
    ctx.fillText(
      "Press SPACE to start",
      canvas.width / 2,
      canvas.height / 2 - 20
    );
  }
}

// Game mechanics
function updateDino() {
  // Apply gravity
  dino.velocityY += dino.gravity;
  dino.y += dino.velocityY;

  // Ground collision
  const groundY = canvas.height - 10 - dino.height;
  if (dino.y >= groundY) {
    dino.y = groundY;
    dino.velocityY = 0;
    dino.grounded = true;
    dino.isRunning = true;
  }
}

function updateObstacles() {
  // Spawn new obstacles
  obstacleSpawnTimer++;
  if (obstacleSpawnTimer >= obstacleSpawnInterval) {
    spawnObstacle();
    obstacleSpawnTimer = 0;
  }

  // Move and remove obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= gameSpeed;

    // Remove obstacles that are off screen
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score += 10;
      scoreElement.textContent = String(score).padStart(5, "0");

      // Increase game speed more aggressively
      if (score % 50 === 0) {
        gameSpeed += 0.5;
      }
    }
  }
}

function spawnObstacle() {
  const obstacle = {
    x: canvas.width,
    y: canvas.height - 10 - 24,
    width: 8,
    height: 24,
    color: "#535353",
    hasArms: Math.random() > 0.5, // Randomly add cactus arms
  };
  obstacles.push(obstacle);
}

function checkCollisions() {
  obstacles.forEach((obstacle) => {
    if (
      dino.x < obstacle.x + obstacle.width &&
      dino.x + dino.width > obstacle.x &&
      dino.y < obstacle.y + obstacle.height &&
      dino.y + dino.height > obstacle.y
    ) {
      gameOver();
    }
  });
}

function jump() {
  if (dino.grounded && gameRunning) {
    dino.velocityY = dino.jumpPower;
    dino.grounded = false;
    dino.isRunning = false;
  }
}

function gameOver() {
  gameRunning = false;
  clearInterval(gameLoop);

  // Update high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("dinoHighScore", highScore);
    highScoreElement.textContent = String(highScore).padStart(5, "0");
  }

  // Show game over screen
  finalScoreElement.textContent = String(score).padStart(5, "0");
  gameOverDiv.style.display = "block";
  startBtn.style.display = "none";
  restartBtn.style.display = "inline-block";

  // Haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }
}

function startGame() {
  gameRunning = true;
  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  gameOverDiv.style.display = "none";

  gameLoop = setInterval(() => {
    updateDino();
    updateObstacles();
    checkCollisions();
    draw();
  }, 1000 / 60); // 60 FPS
}

// Event listeners
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => {
  initGame();
  startGame();
});

// Touch and click events for jumping
canvas.addEventListener("click", jump);
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  jump();
});

// Start game on first interaction
let gameStarted = false;
function startGameOnFirstInput() {
  if (!gameStarted && !gameRunning) {
    gameStarted = true;
    startGame();
  }
}

canvas.addEventListener("click", startGameOnFirstInput);
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startGameOnFirstInput();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();
    if (!gameStarted && !gameRunning) {
      gameStarted = true;
      startGame();
    } else {
      jump();
    }
  }
});

// Initialize everything when page loads
window.addEventListener("load", async () => {
  console.log("Window loaded, initializing game...");

  // Initialize Farcaster SDK
  await initFarcasterSDK();

  // Initialize the game
  initGame();

  // High score is now displayed in the header
  highScoreElement.textContent = String(highScore).padStart(5, "0");
});

// Also try to initialize immediately
setTimeout(async () => {
  console.log("Attempting immediate SDK initialization...");
  await initFarcasterSDK();
}, 200);

// Handle window resize
window.addEventListener("resize", () => {
  // Adjust canvas size for mobile
  const container = canvas.parentElement;
  const containerWidth = container.clientWidth - 60; // Account for padding
  if (containerWidth < 800) {
    canvas.width = containerWidth;
    canvas.height = containerWidth * 0.5; // Maintain aspect ratio
  }
  draw();
});
