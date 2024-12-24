/* Library managment */
let myLibrary = [];

function Book(name, author, numOfPages, haveRead) {
  this.name = name;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${(this.haveRead ? 'already read' : 'not read yet')}`;
  }
}

function addBook(name, author, numOfPages, haveRead) {
  myLibrary.push(new Book(name, author, numOfPages, haveRead));
}


/* Book display managment */
const body = document.body;

function displayAllBooks() {
  myLibrary.forEach(displayBook);
}

function displayBook(book) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  let bookName = document.createElement("h2");
  bookName.textContent = book.name;

  let bookAuthor = document.createElement("p");
  bookAuthor.textContent = "Author: " + book.author;

  let bookNumOfPages = document.createElement("p");
  bookNumOfPages.textContent = "Number of pages: " + book.numOfPages;

  let bookHaveRead = document.createElement("p");
  bookHaveRead.textContent = "Status: " + (book.haveRead ? "haven't read yet" : "already read");

  bookCard.appendChild(bookName);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookNumOfPages);
  bookCard.appendChild(bookHaveRead);

  body.appendChild(bookCard);
}


/* Book adding form managment */
const dialog = document.getElementsByTagName("dialog")[0];
const form = document.getElementsByTagName("form")[0];
const nameInput = document.getElementById("bookName");
const authorInput = document.getElementById("bookAuthor");
const pagesInput = document.getElementById("bookNumOfPages");
const haveReadInput = document.getElementById("bookHaveRead")
const openDialogBtn = document.getElementsByClassName("new-book-button")[0];
const closeDialogBtn = document.getElementsByClassName("dialog-close-button")[0];

openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBook(nameInput.value, authorInput.value, pagesInput.value, haveReadInput.value);
  displayBook(myLibrary[myLibrary.length - 1]);
  dialog.close();
});
