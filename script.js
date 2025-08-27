const bookTitle = document.getElementById('title')
const bookAuthor = document.getElementById('author')
const bookPages = document.getElementById('pages')
const isRead = document.getElementById('read')
const submit = document.getElementById('submit')
const bookList = document.getElementById('library-list')

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

function clearLibrary(el) {
    while (el.fistChild) {
        el.removeChild(el.firstChild)
    }
}

