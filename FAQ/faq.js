
let scrollTimeout;

// Function to replace text with random numbers
function replaceWithRandomNumbers() {
    clearTimeout(scrollTimeout); // Clear previous timeout
    const faqSection = document.querySelector('.faq');
    const faqTitle = document.querySelector('.faq-title');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqPosition = faqSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    // Check if the FAQ section is in view
    if (faqPosition < screenHeight * 0.75) {
        // Replace the FAQ title with random numbers
        const titleWords = faqTitle.dataset.originalText.split(' ');
        const randomTitle = titleWords.map(word => {
            // If the word contains punctuation, keep it as is
            if (/[.,!?]/.test(word)) return word;
            // Generate a random number between 0 and 9999
            return Math.floor(Math.random() * 10000);
        });
        faqTitle.textContent = randomTitle.join(' ');

        // Iterate through each FAQ item
        faqItems.forEach(faqItem => {
            const question = faqItem.querySelector('.faq-question');
            const answer = faqItem.querySelector('.faq-answer');

            const questionWords = question.dataset.originalText.split(' ');
            const answerWords = answer.dataset.originalText.split(' ');

            // Generate random numbers for each word in the question
            const randomQuestion = questionWords.map(word => {
                // If the word contains punctuation, keep it as is
                if (/[.,!?]/.test(word)) return word;
                // Generate a random number between 0 and 9999
                return Math.floor(Math.random() * 10000);
            });

            // Generate random numbers for each word in the answer
            const randomAnswer = answerWords.map(word => {
                // If the word contains punctuation, keep it as is
                if (/[.,!?]/.test(word)) return word;
                // Generate a random number between 0 and 9999
                return Math.floor(Math.random() * 10000);
            });

            // Replace the question text content with the random numbers
            question.textContent = randomQuestion.join(' ');
            // Replace the answer text content with the random numbers
            answer.textContent = randomAnswer.join(' ');
        });
    }
}

// Function to revert text back to original content
function revertToOriginalText() {
    const faqTitle = document.querySelector('.faq-title');
    const faqItems = document.querySelectorAll('.faq-item');
    // Revert the FAQ title text content
    faqTitle.textContent = faqTitle.dataset.originalText;

    // Iterate through each FAQ item and revert the text content
    faqItems.forEach(faqItem => {
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        question.textContent = question.dataset.originalText;
        answer.textContent = answer.dataset.originalText;
    });
}

// Listen for scroll events and replace text with random numbers
window.addEventListener('scroll', function() {
    replaceWithRandomNumbers();
    clearTimeout(scrollTimeout); // Clear previous timeout
    scrollTimeout = setTimeout(revertToOriginalText, 200); // Revert text back after 200ms of inactivity
});

// Replace the text with random numbers initially if it's already in view on page load
window.addEventListener('load', function() {
    const faqTitle = document.querySelector('.faq-title');
    const faqItems = document.querySelectorAll('.faq-item');
    // Store original text for FAQ title
    faqTitle.dataset.originalText = faqTitle.textContent.trim();

    // Iterate through each FAQ item and store original text
    faqItems.forEach(faqItem => {
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        question.dataset.originalText = question.textContent.trim();
        answer.dataset.originalText = answer.textContent.trim();
    });
});
