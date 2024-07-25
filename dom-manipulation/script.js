// Initial array of quotes
let quotes = [
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        category: "Motivation"
    },
    {
        text: "Do not watch the clock. Do what it does. Keep going.",
        category: "Motivation"
    },
    {
        text: "Life is 10% what happens to us and 90% how we react to it.",
        category: "Life"
    }
];

//Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>- ${quote.category}</em></p>`;
}

//Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({
            text: newQuoteText,
            category: newQuoteCategory
        });

        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";

        alert("New quote added!");
    } else {
        alert('Please enter both quote and category.');
    }
}

//Function to create the form for adding a new quote
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteButton">Add Quote</button>
    `;

    document.body.appendChild(formContainer);

    document.getElementById('addQuoteButton').addEventListener('click', addQuote);
}

// Event listeners for buttons
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuote').addEventListener('click', createAddQuoteForm);

//Initial call to display a random quote on page load
showRandomQuote();