// ---------- WORD BANK ----------
        const WORDS = [
            'html', 'css', 'javascript', 'python', 'java', 'react',
            'vue', 'angular', 'node', 'express', 'mongodb', 'sql',
            'git', 'github', 'api', 'rest', 'json', 'ajax',
            'async', 'promise', 'callback', 'closure', 'hoisting',
            'dom', 'bom', 'event', 'loop', 'function', 'variable',
            'array', 'object', 'string', 'number', 'boolean', 'null',
            'undefined', 'class', 'constructor', 'prototype', 'module',
            'export', 'import', 'default', 'spread', 'rest', 'destructure',
            'ternary', 'arrow', 'template', 'literal', 'regex', 'map',
            'filter', 'reduce', 'forEach', 'find', 'some', 'every',
            'coding', 'programming', 'developer', 'software', 'web',
            'application', 'design', 'responsive', 'flexbox', 'grid',
            'animation', 'transition', 'transform', 'gradient', 'shadow',
            'mobile', 'tablet', 'desktop', 'browser', 'chrome',
            'firefox', 'safari', 'edge', 'opera', 'linux',
            'windows', 'macos', 'terminal', 'command', 'docker', 'cloud',
            'server', 'client', 'framework', 'library', 'component'
        ];

        // ---------- GAME STATE ----------
        const state = {
            currentWord: '',
            score: 0,
            correctCount: 0,
            totalAttempts: 0,
            wpm: 0,
            accuracy: 100,
            timeLeft: 30,
            maxTime: 30,
            isRunning: false,
            isFinished: false,
            timerInterval: null,
            highScore: parseInt(localStorage.getItem('typingHighScore')) || 0,
        };

        // ---------- DOM REFS ----------
        const $ = (id) => document.getElementById(id);
        const wordDisplay = $('current-word');
        const inputField = $('word-input');
        const timerDisplay = $('timer-display');
        const timerRing = $('timer-ring');
        const wpmDisplay = $('wpm-display');
        const accuracyDisplay = $('accuracy-display');
        const accuracyRing = $('accuracy-ring');
        const scoreDisplay = $('score-display');
        const startBtn = $('start-btn');
        const resetBtn = $('reset-btn');
        const progressFill = $('progress-fill');
        const progressText = $('progress-text');
        const highScoreDisplay = $('high-score-display');

        // ---------- INIT ----------
        function init() {
            state.highScore = parseInt(localStorage.getItem('typingHighScore')) || 0;
            highScoreDisplay.textContent = state.highScore;
            resetGame();
            showWord('ready');
        }

        // ---------- SHOW WORD ----------
        function showWord(word) {
            wordDisplay.textContent = word;
            wordDisplay.className = 'current-word';
        }

        // ---------- GET RANDOM WORD ----------
        function getRandomWord() {
            return WORDS[Math.floor(Math.random() * WORDS.length)];
        }

        // ---------- NEW WORD ----------
        function newWord() {
            state.currentWord = getRandomWord();
            showWord(state.currentWord);
            inputField.value = '';
            inputField.disabled = false;
            inputField.focus();
            inputField.className = '';
        }

        // ---------- UPDATE TIMER RING ----------
        function updateTimerRing() {
            if (!timerRing) return;

            // Progress = elapsed time percentage (fills up as time passes)
            const elapsed = state.maxTime - state.timeLeft;
            const percent = (elapsed / state.maxTime) * 100;
            timerRing.style.setProperty('--progress', percent + '%');

            // Toggle danger class when 5 seconds or less remain
            if (state.timeLeft <= 5 && state.timeLeft > 0) {
                timerRing.classList.add('danger');
            } else if (state.timeLeft > 5) {
                timerRing.classList.remove('danger');
            }
            // When timeLeft is 0, keep whatever state (danger) for visual
        }

        // ---------- UPDATE UI ----------
        function updateUI() {
            timerDisplay.textContent = state.timeLeft;
            wpmDisplay.textContent = state.wpm;
            accuracyDisplay.textContent = state.accuracy + '%';
            if (accuracyRing) {
                accuracyRing.style.setProperty('--percent', state.accuracy + '%');
                accuracyRing.textContent = state.accuracy + '%';
            }
            scoreDisplay.textContent = state.score;

            // Update timer ring
            updateTimerRing();

            // Progress bar
            const progress = ((state.maxTime - state.timeLeft) / state.maxTime) * 100;
            progressFill.style.width = progress + '%';

            // High score
            if (state.wpm > state.highScore && state.isFinished) {
                state.highScore = state.wpm;
                localStorage.setItem('typingHighScore', state.highScore);
                highScoreDisplay.textContent = state.highScore;
            }
        }

        // ---------- CALCULATE STATS ----------
        function calculateStats() {
            const timeElapsed = state.maxTime - state.timeLeft;
            if (timeElapsed > 0) {
                const minutes = timeElapsed / 60;
                state.wpm = Math.round(state.correctCount / minutes);
            } else {
                state.wpm = 0;
            }

            if (state.totalAttempts > 0) {
                state.accuracy = Math.round((state.correctCount / state.totalAttempts) * 100);
            } else {
                state.accuracy = 100;
            }

            updateUI();
        }

        // ---------- CHECK WORD (on Enter) ----------
        function checkWord() {
            if (!state.isRunning || state.isFinished) return;

            const typed = inputField.value.trim();

            if (typed === '') return;

            if (typed === state.currentWord) {
                state.correctCount++;
                state.score += 10 + Math.floor(state.timeLeft / 5);
                state.totalAttempts++;

                wordDisplay.className = 'current-word correct';
                inputField.className = 'correct-input';

                calculateStats();

                setTimeout(() => {
                    if (state.isRunning && !state.isFinished) {
                        newWord();
                    }
                }, 200);

            } else {
                wordDisplay.className = 'current-word wrong';
                inputField.className = 'wrong-input';
                state.totalAttempts++;
                calculateStats();

                setTimeout(() => {
                    if (state.isRunning && !state.isFinished) {
                        inputField.value = '';
                        wordDisplay.className = 'current-word';
                        inputField.className = '';
                        inputField.focus();
                    }
                }, 500);
            }
        }

        // ---------- TIMER ----------
        function startTimer() {
            state.timerInterval = setInterval(() => {
                state.timeLeft--;

                if (state.timeLeft <= 0) {
                    state.timeLeft = 0;
                    endGame();
                }

                updateUI();

                if (state.timeLeft > 0) {
                    progressText.textContent = `${state.timeLeft}s remaining`;
                } else {
                    progressText.textContent = 'Time\'s up!';
                }

            }, 1000);
        }

        // ---------- START GAME ----------
        function startGame() {
            if (state.isRunning) return;

            state.score = 0;
            state.correctCount = 0;
            state.totalAttempts = 0;
            state.wpm = 0;
            state.accuracy = 100;
            state.timeLeft = state.maxTime;
            state.isRunning = true;
            state.isFinished = false;

            startBtn.disabled = true;
            startBtn.textContent = 'Playing...';
            inputField.disabled = false;
            inputField.focus();
            progressText.textContent = 'Type and press Enter!';

            state.currentWord = getRandomWord();
            showWord(state.currentWord);
            inputField.value = '';
            inputField.className = '';

            // Reset timer ring to 0% (empty, will fill as time passes)
            if (timerRing) {
                timerRing.classList.remove('danger');
                timerRing.style.setProperty('--progress', '0%');
            }

            updateUI();

            startTimer();
        }

        // ---------- END GAME ----------
        function endGame() {
            state.isRunning = false;
            state.isFinished = true;
            inputField.disabled = true;

            if (state.timerInterval) {
                clearInterval(state.timerInterval);
                state.timerInterval = null;
            }

            calculateStats();

            if (state.wpm > state.highScore) {
                state.highScore = state.wpm;
                localStorage.setItem('typingHighScore', state.highScore);
                highScoreDisplay.textContent = state.highScore;
            }

            startBtn.disabled = false;
            startBtn.textContent = 'Play Again';

            let message = '';
            if (state.wpm >= 40) {
                message = 'Amazing speed! You\'re a typing pro!';
            } else if (state.wpm >= 25) {
                message = 'Great job! Keep practicing!';
            } else if (state.wpm >= 15) {
                message = 'Good start! Practice makes perfect!';
            } else {
                message = 'Keep learning! Speed will come with practice!';
            }

            progressText.textContent = `Game Over! ${message}`;
            wordDisplay.className = 'current-word';

            // Timer ring will be full (100% elapsed) and red because timeLeft = 0
            if (timerRing) {
                timerRing.classList.add('danger');
                timerRing.style.setProperty('--progress', '100%');
            }

            if (state.wpm >= 30) {
                document.querySelector('.container').style.boxShadow =
                    '0 30px 80px rgba(255, 215, 0, 0.3)';
                setTimeout(() => {
                    document.querySelector('.container').style.boxShadow =
                        '0 30px 80px rgba(0,0,0,0.6)';
                }, 1500);
            }
        }

        // ---------- RESET GAME ----------
        function resetGame() {
            if (state.timerInterval) {
                clearInterval(state.timerInterval);
                state.timerInterval = null;
            }

            state.isRunning = false;
            state.isFinished = false;
            state.timeLeft = state.maxTime;
            state.score = 0;
            state.correctCount = 0;
            state.totalAttempts = 0;
            state.wpm = 0;
            state.accuracy = 100;

            inputField.disabled = true;
            inputField.value = '';
            inputField.className = '';
            startBtn.disabled = false;
            startBtn.textContent = 'Start';

            showWord('ready');
            updateUI();
            progressFill.style.width = '0%';
            progressText.textContent = 'Ready to start!';
            highScoreDisplay.textContent = state.highScore;

            // Reset timer ring to empty, remove danger
            if (timerRing) {
                timerRing.classList.remove('danger');
                timerRing.style.setProperty('--progress', '0%');
            }
        }

        // ---------- EVENT LISTENERS ----------
        startBtn.addEventListener('click', startGame);
        resetBtn.addEventListener('click', resetGame);

        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkWord();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !state.isRunning && !state.isFinished) {
                e.preventDefault();
                startGame();
            }
            if (e.key === 'Escape' && state.isRunning) {
                e.preventDefault();
                endGame();
            }
        });

        // ---------- START ----------
        init();

        console.log('Speed Typing Game loaded! Click Start or press Enter to begin.');
   
