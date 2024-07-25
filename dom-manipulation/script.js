const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; //Mock API endpoint for demonstration

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

//Function to populate categories dynamically
function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All categories</option>'; //Reset options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    //Set the filter to the last selected value from local storage
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    filterQuotes();
}

//Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>- ${quote.category}</em></p>`;

    sessionStorage.setItem('lastQuote', JSON.stringify(quote)); //Save the last viewed quote to session storage
}

//Function to get filtered quotes based on selected category
function getFilteredQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    if (selectedCategory === 'all') {
        return quotes;
    } else {
        return quotes.filter(quote => quote.category === selectedCategory);
    }
}

//Function to filter quotes based on selected category
function filterQuotes() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const filteredQuotes = getFilteredQuotes();

    if(filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>- ${quote.category}</em></p>`;
    } else {
        quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
    }

    //Save the selected category to local storage
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory);
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

//Function to fetch quotes from server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        const serverQuotes = await response.json();
        return serverQuotes;
    } catch (error) {
        console.error("Error fetching quotes from server", error);
        return [];
    }
}

//Function to post quotes to server
async function postQuotesToServer(quote) {
    try {
        await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });
    } catch (error) {
        console.error("Error posting quote to server:", error);
    }
}

//Function to sync quotes with server
async function syncQuotes() {
        const serverQuotes = await fetchQuotesFromServer();

        //Simple conflict resolution: server data takes precedence
        serverQuotes.forEach(serverQuote => {
            const existingQuoteIndex = quotes.findIndex(quote => quote.text === serverQuote.text);

            if (existingQuoteIndex !== -1) {
                quotes[existingQuoteIndex] = serverQuote;
            } else {
                quotes.push(serverQuote);
            }
        });

        saveQuotes();
        populateCategories();
        alert('Quotes synced with server!');
}

//Periodically sync with server
setInterval(syncQuotesWithServer, 60000); // Every 60 seconds

// Event listeners for buttons
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuote').addEventListener('click', createAddQuoteForm);

document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

//Initial call to display a random quote on page load
showRandomQuote();

//Load the last viewed quote from session storage if available
const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));

if (lastQuote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${lastQuote.text}</p><p><em>- ${lastQuote.category}</em></p>`;
}

//Populate categories dynamically on page load
populateCategories();