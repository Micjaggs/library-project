const bookTitle = document.getElementById('title')
const bookAuthor = document.getElementById('author')
const bookPages = document.getElementById('pages')
const isRead = document.getElementById('read')
const submit = document.getElementById('submit')
const bookList = document.getElementById('library-list')
const form = document.getElementById('book-input')

// Constructor function to create books

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.isRead = Boolean(isRead);
}

// Array for holding books

const myLibrary = []

// Function to add books to array

function addBook(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    return book;
}

// Function to clear Library before re-rendering

function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

// Function to render a book card

function renderBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    const titleEl = document.createElement('h3');
    titleEl.textContent = book.title;
    card.appendChild(titleEl);

    const authorEl = document.createElement('p');
    authorEl.textContent = `Author: ${book.author}`;
    card.appendChild(authorEl);

    const pagesEl = document.createElement('p');
    pagesEl.textContent = `Pages: ${book.pages}`;
    card.appendChild(pagesEl);

    const isReadEl = document.createElement('p');
    isReadEl.textContent = `Read: ${book.isRead}`;
    card.appendChild(isReadEl);

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.classList.add('toggle-btn');
    card.appendChild(toggleBtn);

    const rmvBtn = document.createElement('button');
    rmvBtn.textContent = 'Remove Book';
    rmvBtn.classList.add('rmv-btn');
    card.appendChild(rmvBtn);

    return card;
}

// Function to render the Library

function renderLibrary() {
    clearElement(bookList);
    myLibrary.forEach((book) => {
        const card = renderBookCard(book);
        bookList.appendChild(card)
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); //don't reload the page

    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();
    const pages = Number(bookPages.value)
    const read = isRead.checked;

    addBook(title, author, pages, read);
    renderLibrary();
    form.reset();
    bookTitle.focus();
})

bookList.addEventListener('click', (e) => {
    const isToggle = e.target.classList.contains('toggle-btn');
    const isRemove = e.target.classList.contains('rmv-btn');

    if (!isToggle && !isRemove) return; //Guard clause to prevent running code on random clicks

    const card = e.target.closest('.book-card');
    if (!card) return;
    const id = card.dataset.id;

    const book = myLibrary.find(b => b.id === id);
    if (!book) return;


// This is where if Toggle is clicked, flip the boolean, else (rmv-btn) remove the book

    if (isToggle) {
        book.isRead = !book.isRead;
    } else {
        const idx = myLibrary.findIndex(b => b.id === id);
        if (idx !== -1) myLibrary.splice(idx, 1);
    }

    renderLibrary()
})