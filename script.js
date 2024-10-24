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
    static #instance = null;
    #libraryContainer;

    constructor(books) {
        if (Library.#instance) {
            throw new Error("Library instance already exists! Use Library.getInstance().");
        }
        this.#libraryContainer = books;
        Library.#instance = this;
    }

    static getInstance() {
        if (!Library.#instance) {
            Library.#instance = new Library([new Book('Harry Potter', 'Joanne Rowling', 242, 'read'),
            new Book('1984', 'George Orwell', 203, 'not read'),
            new Book('It', 'Stephen King', 896, 'read')]);
        }
        return Library.#instance;
    }

    addBook(newBook) {
        this.#libraryContainer.push(newBook);
    }
    deleteBook(id) {
        this.#libraryContainer.splice(Number.parseInt(id), 1);
    }
    switchBookStatus(bookIndex){
        this.#libraryContainer[bookIndex].switchReadStatus();
    }
    get libraryContainer() {
        return Object.freeze([...this.#libraryContainer]);
    }
}

class LibraryView {
    static #instance = null;

    constructor(library) {
        if (LibraryView.#instance) {
            throw new Error("LibraryView instance already exists! Use LibraryView.getInstance().");
        }
        LibraryView.#instance = this;
        this.library = library;
        this.divBooksContainer = document.querySelector('.books-container');
        this.addBookBtn = document.querySelector('.add-book-btn');
        this.closeAddFormBtn = document.querySelector('.close-add-form');
        this.dialog = document.querySelector("dialog");
        this.submitBtn = document.querySelector("button[type='submit']");
        this.author = document.querySelector("#author");
        this.title = document.querySelector("#title");
        this.numOfPages = document.querySelector("#numofpages");
        this.readStatus = document.querySelector("#readstatus");
        this.addBookForm = document.querySelector('.add-book-form');

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
        this.addBookForm.addEventListener('submit', () => {
            let status = 'not read';
            if (this.readStatus.checked) {
                status = 'read';
            }
            let newBook = new Book(title.value, author.value, this.numOfPages.value, status);
            this.library.addBook(newBook);
            this.#renderBooks();
        });
        this.#renderBooks();
    }
    static getInstance(library) {
        if (!LibraryView.#instance) {
            LibraryView.#instance = new LibraryView(library);
        }
        return LibraryView.#instance;
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
                    this.library.deleteBook(btn.getAttribute('id'));
                    this.#renderBooks();
                });
            });
        document
            .querySelectorAll('.card-read-btn')
            .forEach(btn => {
                btn.addEventListener('click', () => {
                    const bookIndex = Number.parseInt(btn.getAttribute('id'));
                    this.library.switchBookStatus(bookIndex);
                    this.#renderBooks();
                });
            });
    }
    #renderBooks() {
        this.divBooksContainer.innerHTML = '';
        this.library.libraryContainer.forEach((book, index) => {
            this.divBooksContainer.prepend(this.#getCard(book, index));
        });
        this.#attachCardBtnListeners();
    }
}

const newLibrary =  Library.getInstance();

const libraryView =  LibraryView.getInstance(newLibrary);