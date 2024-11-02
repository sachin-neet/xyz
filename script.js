const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('subject');
const chapter = urlParams.get('chapter');

fetch(`data/${subject}.json`)
    .then(response => response.json())
    .then(data => {
        const questions = data[chapter];
        displayQuestions(questions);
    });

function displayQuestions(questions) {
    const container = document.getElementById('mcq-container');
    container.innerHTML = '';

    questions.forEach((q, index) => {
        const questionEl = document.createElement('div');
        questionEl.innerHTML = `
            <h3>Q${index + 1}. ${q.question}</h3>
            ${q.options.map((opt, i) => `
                <div>
                    <input type="radio" name="q${index}" value="${i}">
                    <label>${opt}</label>
                </div>
            `).join('')}
            <button onclick="checkAnswer(${index}, ${q.correct})">Submit</button>
            <p id="explanation-${index}" style="display: none;">${q.explanation}</p>
        `;
        container.appendChild(questionEl);
    });
}

function checkAnswer(index, correct) {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const explanation = document.getElementById(`explanation-${index}`);

    if (selected && parseInt(selected.value) === correct) {
        alert('Correct Answer!');
    } else {
        alert('Wrong Answer!');
    }
    explanation.style.display = 'block';
}
