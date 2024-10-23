class Book {
    constructor(title, author, numOfPages, read) {
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.read = read;
    }
    switchReadStatus() {
        this.read = (this.read === 'read' ? 'not read' : 'read');
    }
}

class Library {
    static #libraryContainer = [];
    static{
        this.#libraryContainer.push(new Book('Harry Potter', 'Joanne Rowling', 242, 'read'),
        new Book('1984', 'George Orwell', 203, 'not read'),
        new Book('It', 'Stephen King', 896, 'read'));
    }
    static addBook(newBook) {
        this.#libraryContainer.push(newBook);
    }
    static deleteBook(id){
        this.#libraryContainer.splice(Number.parseInt(id), 1);
    }

    static get libraryContainer(){
        return Library.#libraryContainer;
    }
}

class LibraryView {
    
    constructor() {
        this.booksContainer = document.querySelector('.books-container');
        this.addBookBtn = document.querySelector('.add-book-btn');
        this.closeAddFormBtn = document.querySelector('.close-add-form');
        this.dialog = document.querySelector("dialog");
        this.submitBtn = document.querySelector("button[type='submit']");
        this.author = document.querySelector("#author");
        this.title = document.querySelector("#title");
        this.numOfPages = document.querySelector("#numofpages");
        this.readStatus = document.querySelector("#readstatus");

        this.addBookBtn.addEventListener('click', () => {
            this.dialog.showModal();
        });
        
        this.closeAddFormBtn.addEventListener('click', () => {
            this.dialog.close();
        })
        
        this.dialog.addEventListener("close", () => {
            this.author.value = "";
            this.title.value = "";
        });
        
        document.addEventListener('submit', () => {
            let status = 'not read';
            if (this.readStatus.checked) {
                status = 'read';
            }
            let newBook = new Book(title.value, author.value, this.numOfPages.value, status);
            Library.addBook(newBook);
            this.#renderBooks();
        });

        this.#renderBooks();
    }

    #getCard(book, index) {
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

    #attachCardBtnListeners() {
        document
            .querySelectorAll('.card-rm-btn')
            .forEach(btn => {
                btn.addEventListener('click', () => {
                    Library.deleteBook(btn.getAttribute('id'));
                    this.#renderBooks();
                });
            });
    
        document
            .querySelectorAll('.card-read-btn')
            .forEach(btn => {
                btn.addEventListener('click', () => {
                    const bookIndex = Number.parseInt(btn.getAttribute('id'));
                    Library.libraryContainer[bookIndex].switchReadStatus();
                    this.#renderBooks();
                });
            });
    }

    #renderBooks() {
        this.booksContainer.innerHTML = '';
        Library.libraryContainer.forEach((book, index) => {
            this.booksContainer.prepend(this.#getCard(book, index));
        });
    
        this.#attachCardBtnListeners();
    }
    
}

const newLibrary = new Library([new Book('Harry Potter', 'Joanne Rowling', 242, 'read'),
new Book('1984', 'George Orwell', 203, 'not read'),
new Book('It', 'Stephen King', 896, 'read')]);

const libraryView = new LibraryView();

// const myLibrary = [];

// const booksContainer = document.querySelector('.books-container');
// const addBookBtn = document.querySelector('.add-book-btn');
// const closeAddFormBtn = document.querySelector('.close-add-form');
// const dialog = document.querySelector("dialog");
// const submitBtn = document.querySelector("button[type='submit']");
// const author = document.querySelector("#author");
// const title = document.querySelector("#title");
// const numOfPages = document.querySelector("#numofpages");
// const readStatus = document.querySelector("#readstatus");


// myLibrary.push(new Book('Harry Potter', 'Joanne Rowling', 242, 'read'),
//     new Book('1984', 'George Orwell', 203, 'not read'),
//     new Book('It', 'Stephen King', 896, 'read'));


// function Book(title, author, numOfPages, read) {
//     this.title = title;
//     this.author = author;
//     this.numOfPages = numOfPages;
//     this.read = read;
// }

// Book.prototype.switchReadStatus = function () {
//     this.read = (this.read === 'read' ? 'not read' : 'read');
// };

// function addBookToLibrary(newBook) {
//     myLibrary.push(newBook);
// }

// function getCard(book, index) {
//     const card = document.createElement('div');
//     card.classList.add('card');
//     card.innerHTML = `
//         <p>Title: ${book.title}</p>
//         <p>Author: ${book.author}</p>
//         <p>Number of pages: ${book.numOfPages}</p>
//         <p>Read status: ${book.read}</p>
//         <button class='card-rm-btn' id='${index}'>Remove</button>
//         <button class='card-read-btn' id='${index}'>Change read status</button>
//     `;
//     return card;
// }

// function #renderBooks() {
//     booksContainer.innerHTML = '';
//     myLibrary.forEach((book, index) => {
//         booksContainer.prepend(getCard(book, index));
//     });

//     attachCardBtnListeners();
// }

// function attachCardBtnListeners() {
//     document
//         .querySelectorAll('.card-rm-btn')
//         .forEach(btn => {
//             btn.addEventListener('click', () => {
//                 myLibrary.splice(Number.parseInt(btn.getAttribute('id')), 1);
//                 #renderBooks();
//             });
//         });

//     document
//         .querySelectorAll('.card-read-btn')
//         .forEach(btn => {
//             btn.addEventListener('click', () => {
//                 let bookIndex = Number.parseInt(btn.getAttribute('id'));
//                 myLibrary[bookIndex].switchReadStatus();
//                 #renderBooks();
//             });
//         });
// }

// addBookBtn.addEventListener('click', () => {
//     dialog.showModal();
// });

// closeAddFormBtn.addEventListener('click', () => {
//     dialog.close();
// })

// dialog.addEventListener("close", () => {
//     author.value = "";
//     title.value = "";
// });

// document.addEventListener('submit', () => {
//     let status = 'not read';
//     if (readStatus.checked) {
//         status = 'read';
//     }
//     let newBook = new Book(title.value, author.value, numOfPages.value, status);
//     addBookToLibrary(newBook);
//     #renderBooks();
// });

// #renderBooks();