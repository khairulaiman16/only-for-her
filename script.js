// Configuration - Set the two allowed names here
const ALLOWED_NAMES = ['nurul afifah bt mahadi', 'Nurul Afifah binti Mahadi', 'baby sayang princess'];
// Daily messages
const DAILY_MESSAGES_ORIGINAL = [
    "Daily reminder that I love you so muuuuch baby sayang, more than you could ever imagine. I hope you tak pernah lupa how special you are to me and how deeply you're loved every single day kay. Just in case you needed to hear it again today, I love you so much baby sayang saya",
    "To Nurul Afifah bt Mahadi, I know you're tired, I know life hasn't been easy lately kan but I also know how strong you are. Even if you tak rasa macamtu but that's how I see baby saya. Just know this I'm always here for you kay, you tak sorang tau.",
    "Daily reminder, I looooooooooooooooooooove yoooouuuuuuuuuuuuu soooooo muuuuuuuucccchhhhhhhh",
    "even when the world doesn't clap for you, i will. and even without a trophy, i'll always come running to you just to tell you how proud i am, even of the simplest little things you achieve",
    "to my favourite person, please take care of yourself and be safe everyday, ihyktilysm 🤍",
    "i wish you knew how much i love you, like idk how to put it into words but i sayang you sangat. Nama you memang dah permanently ada dalam doa i. I nak you now and forever🤍",
];

// Shuffle function (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let DAILY_MESSAGES = shuffleArray(DAILY_MESSAGES_ORIGINAL);
let currentMessageIndex = 0;

// Emotion-based content with multiple quotes
const EMOTION_CONTENT = {
    sad: {
        quotes: [
            " babyyy sayang  are you okay? it's okay to feel sad tau, just know that im here kay. Your bf will always be here!! Baby now boleh click je button bawah ni, hee tu terus ke sayaa🫡🤍",
            // "It’s okay to not be okay right now. Let the tears fall if they need to. You don't have to be strong all the time. This sadness is just a heavy cloud passing through, and the sun is still behind it.",
            // "The weight of today might feel heavy, but your heart is resilient. Be gentle with yourself, sayang. You're doing the best you can, and that is more than enough.",
            // "Sadness is like the tide; it comes and goes. But you are the ocean—vast, beautiful, and deeper than any single wave of sorrow."
        ],
        tag: "Siapa buat baby saya sad ni!😤 Come baby sayang"
    },
    overthinking: {
        quotes: [
            "baby overthinking ya? come come, pok po baby saya sorang ni. If related dengan bf baby ni, i nak cakap dekat baby yangg I love you so much, i really want you as my future tau. So baby if baby nak talk or nak cakap apa apa baby boleh talk to me. I kan bf baby, your partner, your supporter..so i akan ada dengan baby kay! If not about me, then still sama je...luah and cerita kat i kay. Even sikit but i know for sure it's much better daripada baby simpan sorang...saya team baby kan🤍",
            // "Stop, take a breath. The scenarios your mind is creating haven't happened yet. You're trying to solve problems that don't even exist. Let's just focus on this moment, right here.",
            // "The 'what-ifs' are just ghosts. They have no power unless you give it to them. Your thoughts are like clouds; watch them pass, but don't try to catch them.",
            // "You are not your thoughts. You are the observer of your thoughts. Take a step back and see how much energy you're spending on things that won't matter soon."
        ],
        tag: "Come hugging, kita fikir sama sama kay. Im here"
    },
    anxious: {
        quotes: [
            "If you ever feel anxious or rasa tak best dengan keadaan sekeliling or apa yang orang pernah buat, just remember that you're not alone. I'm always here for you kay. You can always talk to me about anything, even if it's just a small thing. I'll always be here to listen and support you. I love you so much baby sayang saya 🤍",
            // "Anxiety is just a physical sensation, like a fast heartbeat or a tight chest. It's uncomfortable, but it's not dangerous. You are stronger than this feeling. Breathe in slowly...",
            // "Try to find five things you can see, four things you can touch, three things you can hear. Ground yourself here. The future hasn't arrived yet, and you are safe in the present.",
            // "Peace isn't the absence of anxiety; it's the ability to find your center even when it's there. I'm right here with you."
        ],
        tag: "Rely on me kay baby sayang, insha allah"
    },
    lost: {
        quotes: [
            "It's okay if u dont know what to do, or if u tak tahu apa yang u buat betul ke tak...it's totally okay tau sayang. Dont be too hard on yourself, i'm here for you kay. Baby ingat tau, semua yang berlaku ada hikmah, so if you rasa lost or tak tahu, talk to me...i never judge or rasa it's your fault. Never. I just nak ada dengan baby i time dia perlukan.",
            // "It's okay to not have a plan. Life isn't a race, and you aren't falling behind. You're just in a chapter of growth that feels a bit messy. Keep walking, one step at a time.",
            // "Even when you can't see the destination, you're still moving. Trust the timing of your life. You are exactly where you need to be to learn what you need to know next.",
            // "Lost is just another word for 'searching.' You haven't failed; you're just exploring the map. The right door will open when you're ready to walk through it."
        ],
        tag: "Whatever it is, i sayang you so much 🤍"
    }
};

let lastQuoteIndices = {
    sad: -1,
    overthinking: -1,
    anxious: -1,
    lost: -1
};

// Initialize particles
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Set current date
function setDate() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    document.getElementById('currentDate').textContent = date.toLocaleDateString('en-US', options);
}

// Set daily message (sequential from shuffled array)
function setDailyMessage() {
    // If we've shown all messages, reshuffle for next cycle
    if (currentMessageIndex >= DAILY_MESSAGES.length) {
        DAILY_MESSAGES = shuffleArray(DAILY_MESSAGES_ORIGINAL);
        currentMessageIndex = 0;
    }
    const message = DAILY_MESSAGES[currentMessageIndex];
    currentMessageIndex++;
    document.getElementById('messageText').textContent = `"${message}"`;
}

// Entry validation
function validateEntry() {
    const input = document.getElementById('nameInput');
    const message = document.getElementById('entryMessage');
    const enteredName = input.value.trim();

    if (!enteredName) {
        message.textContent = "Please, tell me who you are...";
        message.style.opacity = '1';
        return;
    }

    const normalizedInput = enteredName.toLowerCase();
    const isAllowed = ALLOWED_NAMES.some(name => name.toLowerCase() === normalizedInput);

    if (isAllowed) {
        // Success - transition to main experience
        message.textContent = "Welcome home...";
        message.style.color = 'rgba(200, 160, 160, 0.8)';
        message.style.opacity = '1';

        setTimeout(() => {
            enterMainExperience(enteredName);
        }, 800);
    } else {
        // Gentle rejection
        const softRejections = [
            "This space wasn't made for you... but I hope you find yours somewhere.",
            "I'm sorry, this is a private place for someone special.",
            "Not every door is meant for everyone. Be well, stranger.",
            "This corner of the internet belongs to someone else. I wish you peace on your journey."
        ];
        message.textContent = softRejections[Math.floor(Math.random() * softRejections.length)];
        message.style.opacity = '1';
        input.value = '';
    }
}

// Enter main experience
function enterMainExperience(name) {
    const entryScreen = document.getElementById('entryScreen');
    const mainExperience = document.getElementById('mainExperience');

    // Fade out entry
    entryScreen.classList.add('fade-exit-active');

    setTimeout(() => {
        entryScreen.style.display = 'none';
        mainExperience.style.opacity = '1';
        mainExperience.style.pointerEvents = 'auto';

        // Set personalized welcome
        document.getElementById('welcomeName').textContent = name;

        // Trigger entrance animations
        document.querySelectorAll('.fade-enter').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-enter-active');
            }, index * 150);
        });

        // Auto-play audio after interaction
        setTimeout(() => {
            toggleAudio();
        }, 1500);

    }, 800);
}

// Audio toggle
let audioPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('ambientAudio');
    const iconOff = document.getElementById('audioIconOff');
    const iconOn = document.getElementById('audioIconOn');

    if (audioPlaying) {
        audio.pause();
        iconOff.classList.remove('hidden');
        iconOn.classList.add('hidden');
    } else {
        audio.play().catch(e => console.log('Audio play failed:', e));
        iconOff.classList.add('hidden');
        iconOn.classList.remove('hidden');
    }
    audioPlaying = !audioPlaying;
}

// Emotion selection
function selectEmotion(emotion) {
    // Update button states
    document.querySelectorAll('.emotion-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-emotion="${emotion}"]`).classList.add('active');

    // Pick a random quote that isn't the same as the last one
    const emotionData = EMOTION_CONTENT[emotion];
    const quotes = emotionData.quotes;
    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === lastQuoteIndices[emotion] && quotes.length > 1);

    lastQuoteIndices[emotion] = newIndex;
    const selectedQuote = quotes[newIndex];

    // Show content with animation
    const contentDiv = document.getElementById('emotionContent');
    const textEl = document.getElementById('emotionText');
    const tagEl = document.getElementById('emotionTag');
    const supportEl = document.getElementById('emotionSupport');
    const supportMsgEl = document.getElementById('supportMessage');

    // Reset states for fresh animation
    contentDiv.classList.remove('hidden');
    contentDiv.style.opacity = '0';
    contentDiv.style.transform = 'translateY(10px)';
    supportEl.style.opacity = '0';
    supportEl.style.transform = 'translateY(10px)';

    // Update support message based on emotion
    const supportMessages = {
        sad: "im here sayang, come",
        overthinking: "sokey baby I dekat sini kay",
        anxious: "come baby sayang",
        lost: "kita talk together kay baby"
    };
    supportMsgEl.textContent = supportMessages[emotion] || "I'm right here";

    setTimeout(() => {
        textEl.textContent = selectedQuote;
        tagEl.textContent = emotionData.tag;

        contentDiv.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        contentDiv.style.opacity = '1';
        contentDiv.style.transform = 'translateY(0)';

        // Fade in support button with extra delay
        setTimeout(() => {
            supportEl.style.opacity = '1';
            supportEl.style.transform = 'translateY(0)';
        }, 800);

    }, 150);

    // Smooth scroll to content on mobile
    if (window.innerWidth < 768) {
        setTimeout(() => {
            contentDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// Hidden message reveal
let heartClicks = 0;
let isBursting = false;

function revealHiddenMessage() {
    heartClicks++;
    const heartButton = document.getElementById('heartButton');
    const hiddenMessage = document.getElementById('hiddenMessage');

    // Scale animation on click
    heartButton.style.transform = 'scale(0.85)';
    setTimeout(() => {
        heartButton.style.transform = 'scale(1.2)';
        setTimeout(() => {
            heartButton.style.transform = 'scale(1)';
        }, 150);
    }, 100);

    // ALWAYS trigger the "Love Burst" for entertainment
    triggerLoveBurst();

    // Reveal message after 3 clicks
    if (heartClicks >= 3 && !hiddenMessage.classList.contains('revealed')) {
        hiddenMessage.classList.add('revealed');
        heartButton.classList.remove('heartbeat');
    }
}

function triggerLoveBurst() {
    if (isBursting) return; // Prevent overlapping heavy animations
    isBursting = true;

    const body = document.body;
    body.classList.add('screen-pulse');
    setTimeout(() => body.classList.remove('screen-pulse'), 5000);

    const emojis = ['💖', '✨', '🌸', '💝', '💗', '🎀', '♥️'];
    const container = document.body;

    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'serif love-burst-item';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            // Random starting position near the bottom
            const startX = Math.random() * 100;
            el.style.left = startX + 'vw';
            el.style.bottom = '-50px';

            // Random size and blur for depth
            const size = 15 + Math.random() * 25;
            el.style.fontSize = size + 'px';
            if (size < 20) el.style.filter = 'blur(1px)';

            // Random duration and delay
            el.style.animationDuration = (4 + Math.random() * 3) + 's';

            container.appendChild(el);

            setTimeout(() => el.remove(), 7000);
        }, i * 100);
    }

    setTimeout(() => {
        isBursting = false;
    }, 5000);
}

// Enter key support
document.getElementById('nameInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        validateEntry();
    }
});

// Games logic goes here

// Tic Tac Toe Game State
let tttBoard = ['', '', '', '', '', '', '', '', ''];
let tttIsActive = false;
let tttIsUserTurn = false;

function openTicTacToe() {
    const mainExperience = document.getElementById('mainExperience');
    const tttPage = document.getElementById('ticTacToePage');
    const selection = document.getElementById('tttSelection');
    const game = document.getElementById('tttGame');

    // Fade out main experience
    mainExperience.style.opacity = '0';
    mainExperience.style.pointerEvents = 'none';

    setTimeout(() => {
        tttPage.style.opacity = '1';
        tttPage.style.pointerEvents = 'auto';

        selection.style.opacity = '1';
        selection.style.pointerEvents = 'auto';

        game.style.opacity = '0';
        game.style.pointerEvents = 'none';

        resetTicTacToeBoard();
    }, 800);
}

function closeTicTacToe() {
    const mainExperience = document.getElementById('mainExperience');
    const tttPage = document.getElementById('ticTacToePage');
    const selection = document.getElementById('tttSelection');
    const game = document.getElementById('tttGame');

    tttPage.style.opacity = '0';
    tttPage.style.pointerEvents = 'none';

    // Prevent children from overriding the parent's pointer-events: none
    selection.style.pointerEvents = 'none';
    game.style.pointerEvents = 'none';

    // Completely reset the inner elements to avoid child styles floating around
    resetTicTacToeBoard();

    setTimeout(() => {
        mainExperience.style.opacity = '1';
        mainExperience.style.pointerEvents = 'auto';
        tttIsActive = false;
    }, 800);
}

function startTicTacToe(whoStarts) {
    const selection = document.getElementById('tttSelection');
    const game = document.getElementById('tttGame');
    const turnIndicator = document.getElementById('tttTurnIndicator');

    selection.style.opacity = '0';
    selection.style.pointerEvents = 'none';

    setTimeout(() => {
        game.style.opacity = '1';
        game.style.pointerEvents = 'auto';

        resetTicTacToeBoard();
        tttIsActive = true;

        if (whoStarts === 'user') {
            tttIsUserTurn = true;
            turnIndicator.textContent = "Your Turn";
            turnIndicator.style.opacity = '1';
        } else {
            tttIsUserTurn = false;
            turnIndicator.textContent = "My Turn...";
            turnIndicator.style.opacity = '1';
            setTimeout(aiMove, 800);
        }
    }, 600);
}

function makeMove(index) {
    if (!tttIsActive || !tttIsUserTurn || tttBoard[index] !== '') return;

    placeMark(index, 'user');

    if (checkWin('user', tttBoard)) {
        endGame('user');
        return;
    }

    if (checkDraw(tttBoard)) {
        endGame('draw');
        return;
    }

    tttIsUserTurn = false;
    document.getElementById('tttTurnIndicator').textContent = "My Turn...";

    // Natural delay before AI moves
    const delay = Math.floor(Math.random() * 500) + 600; // 600 - 1100ms
    setTimeout(aiMove, delay);
}

function placeMark(index, player) {
    tttBoard[index] = player;
    const cell = document.querySelectorAll('.ttt-cell')[index];

    // Smooth insertion
    cell.style.opacity = '0';
    cell.style.transform = 'scale(0.8)';

    if (player === 'user') {
        cell.textContent = 'O';
        cell.classList.add('text-rose-300', 'drop-shadow-[0_0_15px_rgba(250,169,181,0.6)]');
    } else {
        cell.textContent = 'X';
        cell.classList.add('text-purple-300', 'drop-shadow-[0_0_15px_rgba(216,180,226,0.6)]');
    }

    // Simple transition logic
    setTimeout(() => {
        cell.style.opacity = '1';
        cell.style.transform = 'scale(1)';
    }, 50);
}

function aiMove() {
    if (!tttIsActive) return;

    let moveIndex = -1;

    // 15% chance to make a random suboptimal move (human error)
    const makeMistake = Math.random() < 0.15;

    if (makeMistake) {
        moveIndex = getRandomAvailableMove(tttBoard);
    } else {
        // 1. Try to win
        moveIndex = findWinningMove('ai', tttBoard);

        // 2. Try to block user
        if (moveIndex === -1) {
            moveIndex = findWinningMove('user', tttBoard);
        }

        // 3. Take center if available
        if (moveIndex === -1 && tttBoard[4] === '') {
            moveIndex = 4;
        }

        // 4. Random available move
        if (moveIndex === -1) {
            moveIndex = getRandomAvailableMove(tttBoard);
        }
    }

    if (moveIndex !== -1) {
        placeMark(moveIndex, 'ai');

        if (checkWin('ai', tttBoard)) {
            endGame('ai');
            return;
        }

        if (checkDraw(tttBoard)) {
            endGame('draw');
            return;
        }

        tttIsUserTurn = true;
        document.getElementById('tttTurnIndicator').textContent = "Your Turn";
    }
}

function findWinningMove(player, board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] === player && board[b] === player && board[c] === '') return c;
        if (board[a] === player && board[c] === player && board[b] === '') return b;
        if (board[b] === player && board[c] === player && board[a] === '') return a;
    }
    return -1;
}

function getRandomAvailableMove(board) {
    const available = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') available.push(i);
    }
    if (available.length === 0) return -1;
    return available[Math.floor(Math.random() * available.length)];
}

function checkWin(player, board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function checkDraw(board) {
    return board.every(cell => cell !== '');
}

function endGame(result) {
    tttIsActive = false;
    document.getElementById('tttTurnIndicator').style.opacity = '0';

    const resultSection = document.getElementById('tttResult');
    const resultMessage = document.getElementById('tttResultMessage');

    if (result === 'user') {
        resultMessage.innerHTML = "yeayyy babyyy menangg, baby saya ni memang power laa ❤️";
    } else if (result === 'ai') {
        resultMessage.innerHTML = "hehe sorry baby i menanggg, tapi i prefer menang baby lagi😳 ";
    } else {
        resultMessage.innerHTML = "seriii, naissss kena osom la ni babyy";
    }

    setTimeout(() => {
        resultSection.classList.remove('opacity-0', 'pointer-events-none');
        resultSection.classList.add('opacity-100', 'pointer-events-auto');
    }, 500);
}

function resetTicTacToe() {
    const selection = document.getElementById('tttSelection');
    const game = document.getElementById('tttGame');

    game.style.opacity = '0';
    game.style.pointerEvents = 'none';

    setTimeout(() => {
        selection.style.opacity = '1';
        selection.style.pointerEvents = 'auto';
        resetTicTacToeBoard();
    }, 600);
}

function resetTicTacToeBoard() {
    tttBoard = ['', '', '', '', '', '', '', '', ''];
    tttIsActive = false;
    const turnIndicator = document.getElementById('tttTurnIndicator');
    turnIndicator.textContent = "Your Turn";

    document.querySelectorAll('.ttt-cell').forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('text-rose-300', 'text-purple-300', 'drop-shadow-[0_0_15px_rgba(250,169,181,0.6)]', 'drop-shadow-[0_0_15px_rgba(216,180,226,0.6)]');
    });

    const resultSection = document.getElementById('tttResult');
    resultSection.classList.add('opacity-0', 'pointer-events-none');
    resultSection.classList.remove('opacity-100', 'pointer-events-auto');
}

// Love Game Logic
let loveGameActive = false;
let loveNoMessages = [
    "baby silap button tu😅 ",
    "ooppss tak dapat hee, takmo tekan button ni kay",
    "babyy chill, cuba tekan button satu lagi",
    "babyy mesti tertekan kan, sokey i alihkan",
    "tekan apetu hehe, try tekan satu lagi",
    "huwaaa babyy tkmo tekan button ni kay",
    "baby jgn buat keputusan terburu buru kay",
    "eh kenapa baby nak tekan yg ni baby, silap la 😅"
];
let loveMessageIndex = 0;
let loveTx = 0;
let loveTy = 0;

function openLoveGame() {
    const mainExperience = document.getElementById('mainExperience');
    const lovePage = document.getElementById('loveGamePage');
    const noBtn = document.getElementById('loveBtnNo');
    const msg = document.getElementById('loveMessage');
    const question = document.getElementById('loveQuestion');
    const buttons = document.getElementById('loveButtons');
    const hearts = document.getElementById('loveHeartsContainer');

    // Reset positions and text
    loveTx = 0;
    loveTy = 0;
    noBtn.style.transform = `translate(0px, 0px)`;

    msg.style.opacity = '0';
    msg.textContent = '';

    question.innerHTML = "Do you love me? ❤️";
    question.classList.remove('scale-110');

    buttons.style.opacity = '1';
    buttons.style.pointerEvents = 'auto';

    hearts.innerHTML = '';

    // Fade out main experience
    mainExperience.style.opacity = '0';
    mainExperience.style.pointerEvents = 'none';

    setTimeout(() => {
        lovePage.style.opacity = '1';
        lovePage.style.pointerEvents = 'auto';
        loveGameActive = true;
    }, 800);
}

function closeLoveGame() {
    const mainExperience = document.getElementById('mainExperience');
    const lovePage = document.getElementById('loveGamePage');
    const buttons = document.getElementById('loveButtons');

    lovePage.style.opacity = '0';
    lovePage.style.pointerEvents = 'none';

    // Prevent nested clicks from firing after closed
    buttons.style.pointerEvents = 'none';

    setTimeout(() => {
        mainExperience.style.opacity = '1';
        mainExperience.style.pointerEvents = 'auto';
        loveGameActive = false;
    }, 800);
}

function moveNoButton() {
    if (!loveGameActive) return;

    const noBtn = document.getElementById('loveBtnNo');
    const msg = document.getElementById('loveMessage');

    const btnRect = noBtn.getBoundingClientRect();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const padding = 20;

    // Calculate a safe random position for the button on the screen
    // width constraint
    const targetX = padding + Math.random() * Math.max(0, winWidth - btnRect.width - padding * 2);
    // height constraint: keep it away from the start of the page (top bar constraints) and the messages below
    const targetY = padding + 80 + Math.random() * Math.max(0, winHeight - btnRect.height - 200);

    // Calculate how much we need to move it from its CURRENT position to the TARGET position
    const dx = targetX - btnRect.left;
    const dy = targetY - btnRect.top;

    // Add that difference to the ongoing CSS transform property
    loveTx += dx;
    loveTy += dy;

    noBtn.style.transform = `translate(${loveTx}px, ${loveTy}px)`;

    // Update playful message
    msg.textContent = loveNoMessages[loveMessageIndex];
    msg.style.opacity = '1';
    msg.style.transform = 'scale(1.05)';
    setTimeout(() => msg.style.transform = 'scale(1)', 200);

    loveMessageIndex = (loveMessageIndex + 1) % loveNoMessages.length;
}

function loveSayYes() {
    if (!loveGameActive) return;

    const question = document.getElementById('loveQuestion');
    const buttons = document.getElementById('loveButtons');
    const msg = document.getElementById('loveMessage');
    const hearts = document.getElementById('loveHeartsContainer');

    // Hide buttons
    buttons.style.opacity = '0';
    buttons.style.pointerEvents = 'none';

    msg.style.opacity = '0';

    setTimeout(() => {
        question.innerHTML = "heee dah agak, thankyou baby i love you much more ❤️";
        question.classList.add('scale-110');

        // Heart explosion effect
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'absolute';
            heart.innerHTML = `<svg class="w-8 h-8 md:w-12 md:h-12 text-rose-400 drop-shadow-[0_0_15px_rgba(250,169,181,0.6)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

            // Random start position near center
            heart.style.left = 50 + (Math.random() - 0.5) * 10 + '%';
            heart.style.top = 50 + (Math.random() - 0.5) * 10 + '%';

            // Custom travel distance
            const tx = (Math.random() - 0.5) * 80 + 'vw';
            const ty = (Math.random() - 0.5) * 80 - 20 + 'vh'; // more upwards tendency

            heart.animate([
                { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 0 },
                { transform: `translate(${parseFloat(tx) / 2}vw, ${parseFloat(ty) / 2}vh) scale(${Math.random() * 1.5 + 0.8}) rotate(${(Math.random() - 0.5) * 45}deg)`, opacity: 1, offset: 0.2 },
                { transform: `translate(${tx}, ${ty}) scale(${Math.random() + 0.5}) rotate(${(Math.random() - 0.5) * 90}deg)`, opacity: 0 }
            ], {
                duration: 2500 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                fill: 'forwards'
            });

            hearts.appendChild(heart);
        }
    }, 400);
}

// Special Page Logic
function enterSpecialPage() {
    const mainExperience = document.getElementById('mainExperience');
    const specialPage = document.getElementById('specialPage');
    const specialMessage = document.getElementById('specialMessage');
    const giftButton = document.getElementById('giftButton');

    // Fade out main experience
    mainExperience.style.opacity = '0';
    mainExperience.style.pointerEvents = 'none';

    setTimeout(() => {
        // Fade in special page
        specialPage.style.opacity = '1';
        specialPage.style.pointerEvents = 'auto';

        // Entrance animations for message and button
        setTimeout(() => {
            specialMessage.classList.remove('opacity-0', 'translate-y-8');
            specialMessage.classList.add('opacity-1', 'translate-y-0');
        }, 500);

        setTimeout(() => {
            giftButton.classList.remove('opacity-0', 'translate-y-8');
            giftButton.classList.add('opacity-1', 'translate-y-0');
        }, 1200);
    }, 800);
}

let flowerRevealed = false;

function revealFlower(event) {
    if (event) event.stopPropagation();
    const flowerContainer = document.getElementById('flowerAnimation');
    const giftButton = document.getElementById('giftButton');
    const heartContainer = document.getElementById('flowerHearts');

    const specialMessage = document.getElementById('specialMessage');
    const loveHeadline = document.getElementById('specialLoveHeadline');

    // Hide gift button and specialMessage smoothly
    giftButton.style.opacity = '0';
    giftButton.style.pointerEvents = 'none';

    specialMessage.classList.remove('opacity-1', 'translate-y-0');
    specialMessage.classList.add('opacity-0', '-translate-y-8');

    // Show flower and start animation
    flowerContainer.classList.add('active');
    setTimeout(() => {
        flowerContainer.classList.remove('not-loaded');
    }, 100);

    // Reveal the new headline seamlessly as the flower blooms
    setTimeout(() => {
        loveHeadline.classList.remove('opacity-0', '-translate-y-4');
        loveHeadline.classList.add('opacity-1', 'translate-y-0');
    }, 1500);

    // Generate floating hearts around flower
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = `<svg class="w-6 h-6 text-rose-300/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        heartContainer.appendChild(heart);
    }

    flowerRevealed = true;
}

function handleSpecialPageClick(event) {
    if (flowerRevealed) {
        exitSpecialPage();
    }
}

function exitSpecialPage() {
    const mainExperience = document.getElementById('mainExperience');
    const specialPage = document.getElementById('specialPage');
    const flowerContainer = document.getElementById('flowerAnimation');
    const giftButton = document.getElementById('giftButton');
    const specialMessage = document.getElementById('specialMessage');

    specialPage.style.opacity = '0';
    specialPage.style.pointerEvents = 'none';

    setTimeout(() => {
        mainExperience.style.opacity = '1';
        mainExperience.style.pointerEvents = 'auto';

        // Reset special page state
        flowerContainer.classList.remove('active');
        flowerContainer.classList.add('not-loaded');
        giftButton.style.opacity = '1';
        giftButton.style.pointerEvents = 'auto';

        // Ensure classes are perfectly restored for next entry
        specialMessage.classList.remove('opacity-0', '-translate-y-8', 'opacity-1', 'translate-y-0');
        specialMessage.classList.add('opacity-0', 'translate-y-8');

        const loveHeadline = document.getElementById('specialLoveHeadline');
        loveHeadline.classList.remove('opacity-1', 'translate-y-0');
        loveHeadline.classList.add('opacity-0', '-translate-y-4'); // float back up

        giftButton.classList.remove('opacity-1', 'translate-y-0');
        giftButton.classList.add('opacity-0', 'translate-y-8');

        document.getElementById('flowerHearts').innerHTML = '';
        flowerRevealed = false;
    }, 1000);
}

// Initialize
createParticles();
setDate();
setDailyMessage();

// Add subtle parallax on mouse move (desktop only)
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        document.querySelectorAll('.glass').forEach(el => {
            el.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        });
    });
}
