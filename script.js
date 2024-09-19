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


function Book(title, author, numOfPages, read) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
}

Book.prototype.switchReadStatus = function () {
    this.read = (this.read === 'read' ? 'not read' : 'read');
};

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function getCard(book, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Number of pages: ${book.numOfPages}</p>
        <p>Read status: ${book.read}</p>
        <button class='card-rm-btn' id='${index}'>Remove</button>
        <button class='card-read-btn' id='${index}'>Change read status</button>
    `;
    return card;
}

function renderBooks() {
    booksContainer.innerHTML = '';
    myLibrary.forEach((book, index) => {
        booksContainer.prepend(getCard(book, index));
    });

    attachCardBtnListeners();
}

function attachCardBtnListeners() {
    document
        .querySelectorAll('.card-rm-btn')
        .forEach(btn => {
            btn.addEventListener('click', () => {
                myLibrary.splice(Number.parseInt(btn.getAttribute('id')), 1);
                renderBooks();
            });
        });

    document
        .querySelectorAll('.card-read-btn')
        .forEach(btn => {
            btn.addEventListener('click', () => {
                let bookIndex = Number.parseInt(btn.getAttribute('id'));
                myLibrary[bookIndex].switchReadStatus();
                renderBooks();
            });
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
    let newBook = new Book(title.value, author.value, numOfPages.value, status);
    addBookToLibrary(newBook);
    renderBooks();
});

renderBooks();