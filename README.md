# Speed Typing Practice – Code Edition

An interactive typing game where users practice typing programming terms with real-time WPM tracking, accuracy percentage, scoring with speed bonuses, and persistent high scores.

---

## Project Overview

This is a beginner-friendly frontend project built with pure HTML, CSS, and JavaScript. The game challenges users to type programming-related words as fast and accurately as possible within a 30-second time limit. It features a modern glass-morphism UI, responsive design, and persistent high scores using localStorage.

---

## Technologies Used

| Category | Technologies |
|----------|--------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Styling | CSS Gradients, Flexbox, Grid, Animations, Glass-morphism |
| Storage | localStorage (for high score persistence) |
| Fonts | Segoe UI, Courier New |
| Version Control | Git & GitHub |
| IDE | VS Code |
| Browser | Chrome, Firefox, Edge |

---

## Features

### Module 1: UI Foundation
- Complete glass-morphism dark theme interface
- 4 stat boxes (Time, WPM, Accuracy, Score)
- Word display area with responsive typography
- Input field with focus effects
- Start and Reset buttons with hover effects
- Progress bar
- High score section
- Fully responsive design (Mobile, Tablet, Desktop)

### Module 2: Game Logic & Word Management
- Word bank of 50+ programming terms
- Random word generator
- Enter key handling for word submission
- Word comparison logic (correct/incorrect detection)
- Visual feedback (green for correct, red for wrong)
- Auto-generation of new words
- Score tracking
- Complete reset functionality

### Module 3: Timer, Scoring & Statistics
- 30-second countdown timer
- Real-time timer display
- Progress bar filling as time decreases
- Live WPM (Words Per Minute) calculation
- Accuracy percentage tracking
- Scoring system with speed bonuses
- Game over handling
- Complete start → play → end game flow

### Module 4: Advanced Features & Polish
- High score persistence using localStorage
- Keyboard shortcuts (Enter to start, Esc to end)
- Confetti celebration animations on high scores
- Game over summary with final stats
- Code optimization and comments
- Cross-browser testing
- Final UI polish

---

## Modules Breakdown

| Module | Focus | Status | Deadline |
|--------|-------|--------|----------|
| Module 1 | UI Foundation | Complete | Aug 30 |
| Module 2 | Game Logic & Word Management | Complete | Sep 06 |
| Module 3 | Timer, Scoring & Statistics | Complete | Sep 13 |
| Module 4 | Advanced Features & Polish | Complete | Sep 20 |

---


3. Open `index.html` in your browser

4. Click Start and begin typing

---

## How to Play

1. Click the "Start" button
2. A random programming term appears on screen
3. Type the word in the input field
4. Press Enter to submit
5. Correct answers turn green and increase your score
6. Wrong answers turn red and you can try again
7. Type as many words as possible within 30 seconds
8. Try to beat your high score

---


---

## Key Features Explained

### Word Bank
Contains 50+ programming terms including HTML tags, CSS properties, JavaScript concepts, and framework names.

### Timer
30-second countdown that starts when the game begins and ends the game when it reaches zero.

### WPM Calculation
Words Per Minute is calculated using the formula:
WPM = Correct Words / (Time Elapsed in Minutes)


### Accuracy
Accuracy percentage is calculated using the formula:
Accuracy = (Correct Answers / Total Attempts) × 100


### Scoring System
- Base points: 10 per correct word
- Speed bonus: Extra points based on time remaining
- Streak bonus: Bonus points for consecutive correct answers

### High Score Persistence
The highest WPM achieved is saved in localStorage and displayed on the UI.

### Keyboard Shortcuts
- Enter: Start game (when not running)
- Enter: Submit word (when typing)
- Escape: End game early

### Confetti Animation
When a new high score is achieved, a confetti animation plays to celebrate.

---

## Challenges Faced

- Fixing CORS security error when running HTML from local file system
- Managing state synchronization between timer, stats, and UI
- Ensuring smooth animations without performance lag
- Making the game fully responsive across all screen sizes
- Implementing accurate WPM calculation with real-time updates

---

## Solutions Implemented

- Embedded all JavaScript directly in HTML to avoid CORS issues
- Used setInterval with proper state management for timer
- Implemented efficient DOM updates to prevent re-rendering issues
- Applied mobile-first responsive design approach
- Used proper formulas for WPM and accuracy calculations

---

## Future Enhancements

- Add difficulty levels (Easy, Medium, Hard)
- Add word categories dropdown (HTML, CSS, JavaScript, Python)
- Add leaderboard for top 5 scores
- Add progress history with charts
- Add custom word lists
- Add achievements and badges

---

## Author

Ayesha Ikram
Internship ID: ZYNVEX-CERT-1079

---

## License

This project is created for educational purposes as part of an internship program.

---

## Acknowledgments

- Inspired by typing practice tools like Monkeytype and 10FastFingers
- Built with pure HTML, CSS, and JavaScript – no external libraries

---

## Contact

For any queries, please reach out via GitHub issues.




