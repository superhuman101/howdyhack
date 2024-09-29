// Wheel variables
let wheelCanvas = document.getElementById('wheelCanvas');
let ctx = wheelCanvas.getContext('2d');
let spinButton = document.getElementById('spinButton');
let categoryText = document.getElementById('category');
let questionText = document.getElementById('question');
let feedbackText = document.getElementById('feedback');
let answerInput = document.getElementById('answerInput');
let submitButton = document.getElementById('submitAnswer'); // Reference the submit button
let scoreText = document.getElementById('score');
let startAngle = 0;
let arcSize = Math.PI / 4; // 8 sections
let spinAngle = 0;
let spinTime = 0;
let spinTimeTotal = 0;
let score = 0;
let gameOver = false; // Flag to indicate when the game is over

// Categories and questions about Texas A&M and Reveille
const categories = {
    "Reveille History": [
        { question: "Who was the first Reveille?", answer: "Reveille I" },
        { question: "When did Reveille first arrive at Texas A&M?", answer: "1931" },
        { question: "What year was A&M founded?", answer: "1876" }
    ],
    "Texas A&M Traditions": [
        { question: "What is the Aggie War Hymn?", answer: "Aggie War Hymn" },
        { question: "What is the name of the Aggie yell leaders' gathering?", answer: "Midnight Yell" },
        { question: "Who is A&M’s rival?", answer: "TU" },
        { question: "Who is highest ranking member in the Corps of Cadets?", answer: "Reveille" }
    ],
    "Reveille Fun Facts": [
        { question: "What breed is Reveille?", answer: "Rough Collie" },
        { question: "How many Reveilles have there been?", answer: "10" },
        { question: "What is Reveille's nickname?", answer: "Miss Rev" }

    ],
    "Aggie Athletics": [
        { question: "What sport does the 12th Man tradition refer to?", answer: "Football" },
        { question: "Which stadium do the Aggies play at?", answer: "Kyle Field" },
        { question: "Where do the basketball teams play?", answer: "Reed Arena" }
    ]
};

// Wheel sections (repeat each category twice)
const sections = [
    "Reveille History", "Texas A&M Traditions", "Reveille Fun Facts", "Aggie Athletics",
    "Reveille History", "Texas A&M Traditions", "Reveille Fun Facts", "Aggie Athletics"
];

// Colors for the wheel sections (repeat for each category)
const sectionColors = ['#C3976A', '#AC714A', '#924A36', '#3A160E', '#C3976A', '#AC714A', '#924A36', '#3A160E'];

// Draw the wheel
function drawWheel() {
    let centerX = wheelCanvas.width / 2;
    let centerY = wheelCanvas.height / 2;
    let outerRadius = 250;

    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height); // Clear canvas before drawing each frame

    for (let i = 0; i < sections.length; i++) {
        let angle = startAngle + i * arcSize;
        ctx.fillStyle = sectionColors[i];
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, angle, angle + arcSize, false);
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        // Add slanted text for each category
        drawSlantedText(sections[i], angle, arcSize, centerX, centerY, outerRadius);
    }
}

// Function to draw slanted text with white color, positioned further from the center
function drawSlantedText(text, angle, arcSize, centerX, centerY, outerRadius) {
    ctx.save();
    ctx.fillStyle = '#ffffff'; // Set text color to white
    ctx.font = "bold 16px Arial";

    // Set position of the text (move it further from the center by decreasing the division value)
    let textAngle = angle + arcSize / 2;
    let textX = centerX + Math.cos(textAngle) * (outerRadius / 1.8); // Adjusted from 2.5 to 1.8 to push text further out
    let textY = centerY + Math.sin(textAngle) * (outerRadius / 1.8); // Adjusted from 2.5 to 1.8

    // Translate and rotate the context to align with the section's angle
    ctx.translate(textX, textY);
    ctx.rotate(textAngle); // Rotate the text according to the section's angle
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);

    ctx.restore();
}


// Start spinning the wheel
function spin() {
    if (gameOver) return; // Prevent spinning if the game is over

    spinButton.disabled = true; // Disable the spin button while spinning
    spinAngle = Math.random() * 2000 + 2000; // Random spin angle
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000; // Spin time between 4-7 seconds
    rotateWheel();
}

// Rotate the wheel
function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    let spinAngleIncrement = spinAngle - easeOut(spinTime, 0, spinAngle, spinTimeTotal);
    startAngle += (spinAngleIncrement * Math.PI / 180);
    drawWheel(); // Redraw the wheel each frame with updated startAngle
    requestAnimationFrame(rotateWheel);
}

// Stop the wheel and select a question
function stopRotateWheel() {
    let degrees = startAngle * 180 / Math.PI + 90;
    let sectionIndex = Math.floor((360 - degrees % 360) / (360 / sections.length));
    let category = sections[sectionIndex];
    selectQuestion(category);
    spinButton.disabled = false; // Re-enable the spin button
}

// Select a random question from the category
function selectQuestion(category) {
    let questions = categories[category];
    let randomIndex = Math.floor(Math.random() * questions.length);
    let selectedQuestion = questions[randomIndex];

    // Display the category and question
    categoryText.innerHTML = `Category: ${category}`;
    questionText.innerHTML = selectedQuestion.question;
    answerInput.value = '';
    feedbackText.innerHTML = '';

    // Store the correct answer
    questionText.setAttribute('data-answer', selectedQuestion.answer);
}

// Check the answer
function submitAnswer() {
    let correctAnswer = questionText.getAttribute('data-answer');
    let userAnswer = answerInput.value.trim();

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        feedbackText.innerHTML = "Correct! 🎉";
        score += 1;
        updateScore();
    } else {
        feedbackText.innerHTML = `Incorrect. The correct answer was: ${correctAnswer}`;
        endGame(); // End the game if the answer is incorrect
    }
}

// End the game when the answer is incorrect
function endGame() {
    gameOver = true;
    alert("You got whooped :("); // Display the "You got whooped" message
    resetGame(); // Reset the game after the user closes the alert
}

// Reset the game
function resetGame() {
    gameOver = false; // Reset the gameOver flag
    score = 0; // Reset the score
    updateScore(); // Update the score display
    spinButton.disabled = false; // Re-enable the spin button
    categoryText.innerHTML = ''; // Clear category and question
    questionText.innerHTML = '';
    feedbackText.innerHTML = ''; // Clear feedback
    answerInput.disabled = false; // Re-enable the answer input box (instead of hiding it)
    submitButton.disabled = false; // Re-enable the submit button (instead of hiding it)
}

// Update score display
function updateScore() {
    scoreText.innerHTML = score;
}

// Ease-out animation for smoother spin
function easeOut(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
}

// Initialize the wheel on page load
drawWheel();
