"use strict";

const myLibrary = JSON.parse(localStorage.getItem("library")) || [];

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
    }
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
        const el = document.createElement("li");
        el.setAttribute('data-id', book.id);
        el.innerText = book.title;
        libEl.appendChild(el);

        el.addEventListener("click", () => {
            return removeBookFromLibrary(book.id);
        });
    }
}

function updateState() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderLibrary();
}

document.addEventListener("DOMContentLoaded", () => {
    libEl = document.getElementById("libraryList");
    addBookToLibrary("sas", "velik", "", 13, false);
    addBookToLibrary("sas", "velik", "", 13, false);
    addBookToLibrary("sas", "velik", "", 13, false);

    renderLibrary();
});
