// Initial array of quotes, loaded from local storage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
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

//Function to save quote to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

//Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>- ${quote.category}</em></p>`;

    sessionStorage.setItem('lastQuote', JSON.stringify(quote)); //Save the last viewed quote to session storage
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

//Function to export quotes as JSON
function exportQuotesToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

//Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listeners for buttons
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuote').addEventListener('click', createAddQuoteForm);

document.getElementById('exportQuotes').addEventListener('change', importFromJsonFile);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

//Initial call to display a random quote on page load
showRandomQuote();

//Load the last viewed quote from session storage if available
const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));

if (lastQuote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${lastQuote.text}</p><p><em>- ${lastQuote.category}</em></p>`;
}