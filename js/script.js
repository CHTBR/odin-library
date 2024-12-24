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
