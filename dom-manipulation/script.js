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

// Event listeners for buttons
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuote').addEventListener('click', addQuote);

//Initial call to display a random quote on page load
showRandomQuote();