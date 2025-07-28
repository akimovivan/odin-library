"use strict";

const storedBooks = JSON.parse(localStorage.getItem("library")) || [];
const myLibrary = storedBooks.map(bookData => {
    const book = new Book(
        bookData.author,
        bookData.title,
        bookData.info,
        bookData.pages,
        bookData.read
    );
    book.id = bookData.id; // Preserve the ID
    return book;
});

let libEl;


function Book(author, title, info, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.info = info;
    this.pages = pages;
    this.read = read;
    this.toggleReadStatus = function () {
        this.read = !this.read;
    };
}

function addBookToLibrary(author, title, info, pages, read) {
    const newBook = new Book(author, title, info, pages, read);

    myLibrary.push(newBook);
    updateState();
}

function removeBookFromLibrary(id) {
    const index = myLibrary.findIndex(item => item.id === id);
    if (index === -1) {
        throw new Error("not existing index");
    }

    myLibrary.splice(index, 1);

    updateState();
}

function renderLibrary() {
    libEl.innerHTML = "";
    for (const book of myLibrary) {
        // const el = document.createElement("div");
        // el.setAttribute('data-id', book.id);
        //
        // el.innerText = book.title;

        const el = document.createElement("div");
        el.setAttribute("data-id", book.id);
        el.classList.add("book-card");

        el.innerHTML = `
            <div class="book-header">
                <button onclick="removeBookFromLibrary('${book.id}')" class="trash-bin" aria-label="Delete Book">
                    <svg class="trash-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                    </svg>
                </button>
                <h2 class="book-title">${book.title}</h2>
                <p class="book-author">${book.author}</p>
            </div>
            <div class="book-body">
                <p class="book-description">
                    ${book.info}
                </p>
                <div class="book-meta">
                    <span class="pages">${book.pages} pages</span>
                    <span class="read-status ${book.read ? '' : 'not-read'}">${book.read ? 'read' : 'not read'}</span>
                </div>
            </div>
        `


        libEl.appendChild(el);

        el.querySelector(".read-status").addEventListener("click", () => {
            book.toggleReadStatus();
            updateState();
        });
    }
}

function updateState() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderLibrary();
}

// open modal by id
function openModal() {
    document.getElementById('modal').classList.add('open');
    document.body.classList.add('jw-modal-open');
}

// close currently open modal
function closeModal() {
    document.querySelector('.jw-modal.open').classList.remove('open');
    document.body.classList.remove('jw-modal-open');
}

window.addEventListener('load', function () {
});
document.addEventListener("DOMContentLoaded", () => {
    libEl = document.getElementById("libraryList");
    const form = document.getElementById("addNewBookForm");

    renderLibrary();

    document.addEventListener('click', event => {
        if (event.target.classList.contains('jw-modal')) {
            closeModal();
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        addBookToLibrary(
            form.elements.author.value,
            form.elements.title.value,
            form.elements.info.value,
            form.elements.pages.value,
            false,
        )
        form.reset();
        closeModal();
    })
});


