  // DOM REFS
        const startBtn = document.getElementById('start-btn');
        const resetBtn = document.getElementById('reset-btn');
        const inputField = document.getElementById('word-input');
        const wordDisplay = document.getElementById('current-word');

        // UI INTERACTIONS

        // Start Button - Just shows a message (no game logic yet)
        startBtn.addEventListener('click', function() {
            startBtn.textContent = '⏳ Starting...';
            startBtn.disabled = true;
            wordDisplay.textContent = 'Get Ready!';
            inputField.disabled = false;
            inputField.focus();

            // Reset button text after 2 seconds
            setTimeout(function() {
                startBtn.textContent = '⏳ Playing...';
            }, 1000);
        });

        // Reset Button - Resets UI to initial state
        resetBtn.addEventListener('click', function() {
            // Reset start button
            startBtn.textContent = '🚀 Start';
            startBtn.disabled = false;

            // Reset input field
            inputField.value = '';
            inputField.disabled = true;

            // Reset word display
            wordDisplay.textContent = 'ready';

            // Reset progress text
            document.getElementById('progress-text').textContent = 'Ready to start!';

            // Reset progress bar
            document.getElementById('progress-fill').style.width = '0%';

            // Reset stats (just visual)
            document.getElementById('timer-display').textContent = '30';
            document.getElementById('wpm-display').textContent = '0';
            document.getElementById('accuracy-display').textContent = '100%';
            document.getElementById('score-display').textContent = '0';

            console.log('🔄 Game reset!');
        });

        // Input field - Enter key shows message (no game logic yet)
        inputField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && inputField.value.trim() !== '') {
                const typed = inputField.value.trim();
                wordDisplay.textContent = typed;
                wordDisplay.style.color = '#2ed573';
                inputField.value = '';

                setTimeout(function() {
                    wordDisplay.textContent = '✅ Nice! Next word...';
                    setTimeout(function() {
                        wordDisplay.textContent = 'ready';
                        wordDisplay.style.color = '#fff';
                    }, 800);
                }, 500);
            }
        });

   