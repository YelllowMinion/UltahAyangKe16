// Typed.js Animation for Hero Title
const typed = new Typed('#typed-title', {
    strings: ['Azzahra Nurmala', 'Cinta Pertamaku', 'Cantikku Sayang'],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
        }
    });
});

// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
}

mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
});

// Music Player Functionality
const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const musicItems = document.querySelectorAll('.music-item');
const togglePlayer = document.getElementById('togglePlayer');
const playerContent = document.getElementById('playerContent');

let isPlaying = false;
let currentMusicIndex = 0;
let isPlayerOpen = true;

// Toggle Music Player Visibility
if (togglePlayer && playerContent) {
    togglePlayer.addEventListener('click', function() {
        if (isPlayerOpen) {
            playerContent.style.display = 'none';
            togglePlayer.innerHTML = '<i class="fas fa-chevron-up"></i>';
            document.getElementById('musicPlayer').style.width = '200px';
        } else {
            playerContent.style.display = 'block';
            togglePlayer.innerHTML = '<i class="fas fa-chevron-down"></i>';
            document.getElementById('musicPlayer').style.width = '300px';
        }
        isPlayerOpen = !isPlayerOpen;
    });
}

// Format time from seconds to MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress bar and time
function updateProgress() {
    if (backgroundMusic.duration) {
        const progress = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
        progressBar.style.width = `${progress}%`;
        currentTimeEl.textContent = formatTime(backgroundMusic.currentTime);
        durationEl.textContent = formatTime(backgroundMusic.duration);
    }
}

// Play selected music
function playMusic(index) {
    const musicItem = musicItems[index];
    const src = musicItem.getAttribute('data-src');
    const songTitle = musicItem.querySelector('.font-medium').textContent;
    
    // Update active music item
    musicItems.forEach(item => item.classList.remove('active'));
    musicItem.classList.add('active');
    
    // Change music source
    backgroundMusic.src = src;
    backgroundMusic.play();
    isPlaying = true;
    playPauseBtn.textContent = 'Pause';
    
    // Update current music index
    currentMusicIndex = index;
    
    // Show notification
    showNotification('Now Playing', songTitle);
}

// Play/Pause toggle
if (playPauseBtn) {
    playPauseBtn.addEventListener('click', function() {
        if (!isPlaying) {
            if (backgroundMusic.src) {
                backgroundMusic.play();
            } else {
                // If no music is selected, play the first one
                playMusic(0);
            }
        } else {
            backgroundMusic.pause();
        }
    });
}

// Music item click event
musicItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        playMusic(index);
    });
});

// Audio event listeners
backgroundMusic.addEventListener('play', function() {
    isPlaying = true;
    if (playPauseBtn) playPauseBtn.textContent = 'Pause';
});

backgroundMusic.addEventListener('pause', function() {
    isPlaying = false;
    if (playPauseBtn) playPauseBtn.textContent = 'Play';
});

backgroundMusic.addEventListener('timeupdate', updateProgress);

backgroundMusic.addEventListener('ended', function() {
    // Play next music when current ends
    const nextIndex = (currentMusicIndex + 1) % musicItems.length;
    playMusic(nextIndex);
});

// Progress bar click to seek
if (progressBar && progressBar.parentElement) {
    progressBar.parentElement.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        backgroundMusic.currentTime = percent * backgroundMusic.duration;
    });
}

// Notification System
function showNotification(title, message) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-music"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Scroll animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .fade-swipe-left, .fade-swipe-right').forEach(el => {
    observer.observe(el);
});

// Welcome message
setTimeout(() => {
    showNotification('Welcome', 'Selamat datang di website ulang tahun spesial Azzahra!');
}, 1000);

// Handle video background error
const videoBackground = document.querySelector('.video-background');
if (videoBackground) {
    videoBackground.addEventListener('error', function() {
        console.log('Video background failed to load, using fallback background');
        // You can add a fallback background color or image here
        document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)';
    });
}

// Game Variables
let gameScore = 0;
let gameTime = 60;
let gameLives = 3;
let gameActive = false;
let gameTimer;
let cakeInterval;
let specialCakeInterval;

// Game Elements
const gameStart = document.getElementById('gameStart');
const gameArea = document.getElementById('gameArea');
const gameEnd = document.getElementById('gameEnd');
const instructions = document.getElementById('instructions');
const startGameBtn = document.getElementById('startGame');
const howToPlayBtn = document.getElementById('howToPlay');
const pauseGameBtn = document.getElementById('pauseGame');
const restartGameBtn = document.getElementById('restartGame');
const backToMenuBtn = document.getElementById('backToMenu');
const backFromInstructionsBtn = document.getElementById('backFromInstructions');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const livesDisplay = document.getElementById('lives');
const finalScoreDisplay = document.getElementById('finalScore');
const gameResultIcon = document.getElementById('gameResultIcon');
const gameResultText = document.getElementById('gameResultText');
const gameContainer = document.getElementById('gameContainer');

// Game Event Listeners
if (startGameBtn) {
    startGameBtn.addEventListener('click', startGame);
}

if (howToPlayBtn) {
    howToPlayBtn.addEventListener('click', showInstructions);
}

if (pauseGameBtn) {
    pauseGameBtn.addEventListener('click', togglePauseGame);
}

if (restartGameBtn) {
    restartGameBtn.addEventListener('click', startGame);
}

if (backToMenuBtn) {
    backToMenuBtn.addEventListener('click', backToMenu);
}

if (backFromInstructionsBtn) {
    backFromInstructionsBtn.addEventListener('click', backToMenuFromInstructions);
}

// Game Functions
function startGame() {
    gameScore = 0;
    gameTime = 60;
    gameLives = 3;
    gameActive = true;
    
    // Reset displays
    scoreDisplay.textContent = gameScore;
    timerDisplay.textContent = gameTime;
    livesDisplay.textContent = gameLives;
    
    // Show game area, hide other screens
    gameStart.classList.add('hidden');
    gameArea.classList.remove('hidden');
    gameEnd.classList.add('hidden');
    instructions.classList.add('hidden');
    
    // Clear game container
    gameContainer.innerHTML = '';
    
    // Start game loops
    startGameTimer();
    startCakeSpawning();
    startSpecialCakeSpawning();
    
    // Update pause button text
    pauseGameBtn.textContent = 'Jeda';
}

function showInstructions() {
    gameStart.classList.add('hidden');
    instructions.classList.remove('hidden');
}

function backToMenu() {
    gameEnd.classList.add('hidden');
    gameStart.classList.remove('hidden');
    stopGame();
}

function backToMenuFromInstructions() {
    instructions.classList.add('hidden');
    gameStart.classList.remove('hidden');
}

function togglePauseGame() {
    if (!gameActive) {
        // Resume game
        gameActive = true;
        pauseGameBtn.textContent = 'Jeda';
        startGameTimer();
        startCakeSpawning();
        startSpecialCakeSpawning();
    } else {
        // Pause game
        gameActive = false;
        pauseGameBtn.textContent = 'Lanjut';
        clearInterval(gameTimer);
        clearInterval(cakeInterval);
        clearInterval(specialCakeInterval);
    }
}

function startGameTimer() {
    clearInterval(gameTimer);
    gameTimer = setInterval(() => {
        if (gameActive) {
            gameTime--;
            timerDisplay.textContent = gameTime;
            
            if (gameTime <= 0) {
                endGame(true);
            }
        }
    }, 1000);
}

function startCakeSpawning() {
    clearInterval(cakeInterval);
    cakeInterval = setInterval(() => {
        if (gameActive) {
            spawnCake();
        }
    }, 1000); // Spawn cake every second
}

function startSpecialCakeSpawning() {
    clearInterval(specialCakeInterval);
    specialCakeInterval = setInterval(() => {
        if (gameActive && Math.random() < 0.3) { // 30% chance every 5 seconds
            spawnSpecialCake();
        }
    }, 5000);
}

function spawnCake() {
    const cake = document.createElement('div');
    cake.className = 'cake';
    cake.innerHTML = '🎂';
    cake.style.fontSize = '40px';
    cake.style.left = Math.random() * (gameContainer.offsetWidth - 40) + 'px';
    cake.style.top = '-50px';
    
    cake.addEventListener('click', () => {
        if (gameActive) {
            handleCakeClick(cake, 10);
        }
    });
    
    gameContainer.appendChild(cake);
    
    // Animate cake falling
    const fallSpeed = 2 + Math.random() * 3; // Random speed between 2-5
    animateCakeFall(cake, fallSpeed);
}

function spawnSpecialCake() {
    const cake = document.createElement('div');
    cake.className = 'cake special';
    cake.innerHTML = '🍰';
    cake.style.fontSize = '45px';
    cake.style.left = Math.random() * (gameContainer.offsetWidth - 45) + 'px';
    cake.style.top = '-50px';
    
    cake.addEventListener('click', () => {
        if (gameActive) {
            handleCakeClick(cake, 50);
        }
    });
    
    gameContainer.appendChild(cake);
    
    // Animate special cake falling (slower)
    const fallSpeed = 1 + Math.random() * 2; // Random speed between 1-3
    animateCakeFall(cake, fallSpeed);
}

function animateCakeFall(cake, speed) {
    let position = -50;
    const fallInterval = setInterval(() => {
        if (!gameActive || !cake.parentNode) {
            clearInterval(fallInterval);
            return;
        }
        
        position += speed;
        cake.style.top = position + 'px';
        
        // Check if cake reached bottom
        if (position > gameContainer.offsetHeight) {
            clearInterval(fallInterval);
            cake.remove();
            if (gameActive) {
                loseLife();
            }
        }
    }, 16); // ~60fps
}

function handleCakeClick(cake, points) {
    if (!gameActive) return;
    
    // Add score
    gameScore += points;
    scoreDisplay.textContent = gameScore;
    
    // Create particle effect
    createParticles(cake, points);
    
    // Animate cake pop
    cake.classList.add('popped');
    
    // Remove cake after animation
    setTimeout(() => {
        if (cake.parentNode) {
            cake.remove();
        }
    }, 300);
}

function createParticles(cake, points) {
    const rect = cake.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();
    
    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = `+${points}`;
    particle.style.color = points >= 50 ? 'gold' : 'var(--primary-color)';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    gameContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 1000);
}

function loseLife() {
    gameLives--;
    livesDisplay.textContent = gameLives;
    
    if (gameLives <= 0) {
        endGame(false);
    }
}

function endGame(isTimeUp) {
    gameActive = false;
    clearInterval(gameTimer);
    clearInterval(cakeInterval);
    clearInterval(specialCakeInterval);
    
    // Clear all cakes
    gameContainer.innerHTML = '';
    
    // Show appropriate end message
    if (isTimeUp) {
        gameResultIcon.textContent = '🎉';
        gameResultText.textContent = 'Waktu Habis!';
    } else {
        gameResultIcon.textContent = '😢';
        gameResultText.textContent = 'Game Over!';
    }
    
    finalScoreDisplay.textContent = gameScore;
    
    // Show end screen
    gameArea.classList.add('hidden');
    gameEnd.classList.remove('hidden');
    
    // Show notification based on score
    let message = '';
    if (gameScore >= 500) message = 'Luar biasa! Skor fantastis!';
    else if (gameScore >= 300) message = 'Hebat! Permainan yang bagus!';
    else if (gameScore >= 150) message = 'Bagus! Terus berlatih!';
    else message = 'Semangat! Coba lagi!';
    
    showNotification('Game Selesai', `${message} Skor: ${gameScore}`);
}

function stopGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearInterval(cakeInterval);
    clearInterval(specialCakeInterval);
    gameContainer.innerHTML = '';
}
