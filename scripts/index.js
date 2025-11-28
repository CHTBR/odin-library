const bookContainer = document.getElementsByClassName("book-container")[0];

const myLib = [];

function Book(title, author, numOfPages, haveRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

function addBookToLib(title, author, numOfPages, haveRead) {
  let book = new Book(title, author, numOfPages, haveRead);
  myLib.push(book);
}

function renderBooks() {
  myLib.forEach(function (bookData) {
    let book = document.createElement("div");
    book.classList.add("book-card");

    let title = document.createElement("h2");
    title.textContent = bookData.title;
    let author = document.createElement("p");
    author.textContent = bookData.author;
    let pages = document.createElement("p");
    pages.textContent = bookData.numOfPages;
    let status = document.createElement("p");
    status.textContent = bookData.haveRead ? "Already read" : "Haven\'t read yet";

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(status);

    bookContainer.appendChild(book);

    console.log("Added book!");
  });
}

renderBooks();
