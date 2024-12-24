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
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary.forEach(displayBook, i);
  }
}

function displayBook(book, index) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-bookindex", index);

  let bookName = document.createElement("h2");
  bookName.textContent = book.name;

  let bookAuthor = document.createElement("p");
  bookAuthor.textContent = "Author: " + book.author;

  let bookNumOfPages = document.createElement("p");
  bookNumOfPages.textContent = "Number of pages: " + book.numOfPages;

  let bookHaveRead = document.createElement("p");
  bookHaveRead.textContent = "Status: " + (book.haveRead ? "haven't read yet" : "already read");

  /* Book removal managment */
  let removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-book-button");
  removeBtn.textContent = "Remove from library";

  /* Read status managment */
  let readStatusButton = document.createElement("button");
  readStatusButton.classList.add("read-status-button");
  readStatusButton.textContent = "Change read status";

  bookCard.appendChild(bookName);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookNumOfPages);
  bookCard.appendChild(bookHaveRead);
  bookCard.appendChild(removeBtn);
  bookCard.appendChild(readStatusButton);

  body.appendChild(bookCard);

  bookCard.addEventListener("click", function(e) {
    console.log(this);
    switch(e.target.classList[0]) {
      case "remove-book-button":
        myLibrary.splice(this.dataset.bookindex, 1);
        body.removeChild(this);
        break;
      case "read-status-button": 
        myLibrary[parseInt(this.dataset.bookindex)].haveRead = !myLibrary[parseInt(this.dataset.bookindex)].haveRead;
        let readStatus = this.children[3];
        readStatus.textContent = "Status: " + (myLibrary[parseInt(this.dataset.bookindex)].haveRead ? "haven't read yet" : "already read");
    }
  });
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
  displayBook(myLibrary[myLibrary.length - 1], myLibrary.length - 1);
  dialog.close();
});
