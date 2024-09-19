const startBtn = document.querySelector('.start-btn');
const popupinfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
    popupinfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupinfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupinfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

// Initialize next button to be inactive until an option is selected
nextBtn.classList.remove('active');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active'); // Disable "Next" until a new option is selected
    } else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

// Function to display the questions and options
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    if (index < questions.length) {
        questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

        let optionsTag = `
            <div class="option"><span>${questions[index].options[0]}</span></div>
            <div class="option"><span>${questions[index].options[1]}</span></div>
            <div class="option"><span>${questions[index].options[2]}</span></div>
            <div class="option"><span>${questions[index].options[3]}</span></div>
        `;
        
        optionList.innerHTML = optionsTag;    

        const options = document.querySelectorAll('.option');
        for (let i = 0; i < options.length; i++) {
            options[i].setAttribute('onclick', 'optionSelected(this)');
        }
    }
}

// Function to handle option selection
function optionSelected(answer) {
    let userAnswer = answer.textContent.trim();
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        
        // Auto highlight the correct answer if the user selects the wrong one
        for (let i = 0; i < allOptions.length; i++) {
            if (allOptions[i].textContent.trim() === correctAnswer) {
                allOptions[i].classList.add('correct');
            }
        }
    }

    // Disable all options after selection
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add('disabled');
    }

    nextBtn.classList.add('active'); // Enable "Next" button after selection
}

// Function to update the question counter
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

// Function to show the final score when quiz is completed
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        if (progressStartValue < progressEndValue) {
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.backgroundImage = `conic-gradient(violet ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        } else {
            clearInterval(progress);
        }
    }, speed);
}
