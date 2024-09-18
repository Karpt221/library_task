const myLibrary = [];
const booksContainer = document.querySelector('.books-container');
const addBookBtn = document.querySelector('.add-book-btn');
const closeAddFormBtn = document.querySelector('.close-add-form');
const dialog = document.querySelector("dialog");
const submitBtn = document.querySelector("button[type='submit']");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const numOfPages = document.querySelector("#numofpages");
const readStatus = document.querySelector("#readstatus");

myLibrary.push(new Book('Harry Potter', 'Joanne Rowling', 242, 'read'),
    new Book('1984', 'George Orwell', 203, 'not read'),
    new Book('It', 'Stephen King', 896, 'read'));


function Book(Title, Author, NumOfPages, ReadStatus) {
    this.Title = Title;
    this.Author = Author;
    this.NumOfPages = NumOfPages;
    this.ReadStatus = ReadStatus;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBooks() {
    booksContainer.innerHTML = '';
    myLibrary.forEach(book => {
        let card =
            `<div class='card'>
            <p>Title: ${book.Title}</p>
            <p>Author: ${book.Author}</p>
            <p>Number of pages: ${book.NumOfPages}</p>
            <p>Read status: ${book.ReadStatus}</p>
        </div>`;
        booksContainer.innerHTML += card;
    });
}

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeAddFormBtn.addEventListener('click', () => {
    dialog.close();
});

dialog.addEventListener("close", () => {
    author.value = "";
    title.value = "";
});

document.addEventListener('submit', () => {
    let status = 'not read';
    if (readStatus.checked) {
        status = 'read';
    }
    addBookToLibrary(new Book(title.value, author.value, numOfPages.value, status));
    displayBooks();
});

displayBooks();