const form = document.getElementById('flashcard-form');
const topicInput = document.getElementById('topic-input');
const flashcardsContainer = document.getElementById('flashcards-container');
const loadingIndicator = document.getElementById('loading');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const topic = topicInput.value.trim();
  if (!topic) return;

  flashcardsContainer.innerHTML = '';
  loadingIndicator.classList.remove('hidden');

  try {
    // Construct the AI prompt
    const prompt = `Generate flashcards to study the topic: '${topic}' with questions and concise answers. Provide the output as a JSON array of objects with "question" and "answer" fields.`;

    // Call AI API (mocked here, replace with real API call)
    const flashcards = await generateFlashcardsFromAI(prompt);

    // Render flashcards
    renderFlashcards(flashcards);
  } catch (error) {
    flashcardsContainer.innerHTML = `<p style="color:red;">Error generating flashcards: ${error.message}</p>`;
  } finally {
    loadingIndicator.classList.add('hidden');
  }
});

async function generateFlashcardsFromAI(prompt) {
  // This is a mock function to simulate AI response.
  // Replace this with actual API call to OpenAI or other AI service.
  // For demonstration, returning a fixed set of flashcards for "Photosynthesis in plants".
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          question: "What is photosynthesis?",
          answer: "The process by which green plants use sunlight to synthesize foods from carbon dioxide and water."
        },
        {
          question: "Where does photosynthesis occur in plants?",
          answer: "In the chloroplasts of plant cells."
        },
        {
          question: "What are the main products of photosynthesis?",
          answer: "Glucose and oxygen."
        },
        {
          question: "What pigment is essential for photosynthesis?",
          answer: "Chlorophyll."
        }
      ]);
    }, 1500);
  });
}

function renderFlashcards(flashcards) {
  flashcardsContainer.innerHTML = '';
  flashcards.forEach(({ question, answer }) => {
    const card = document.createElement('div');
    card.className = 'flashcard';

    const cardInner = document.createElement('div');
    cardInner.className = 'flashcard-inner';

    const cardFront = document.createElement('div');
    cardFront.className = 'flashcard-front';
    cardFront.textContent = question;

    const cardBack = document.createElement('div');
    cardBack.className = 'flashcard-back';
    cardBack.textContent = answer;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    flashcardsContainer.appendChild(card);
  });
}
