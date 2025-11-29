const bookContainer = document.getElementsByClassName("book-container")[0];
const addBookDialog = document.getElementsByClassName("add-book")[0];
const addBookForm = addBookDialog.querySelector("form");

const myLib = [];

function Book(title, author, numOfPages, haveRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

Book.prototype.toggleHaveRead = function () {
  this.haveRead = !this.haveRead;
}

function addBookToLib(title, author, numOfPages, haveRead) {
  let book = new Book(title, author, numOfPages, haveRead);
  myLib.push(book);
}

function openAddBookDialog() {
  addBookDialog.showModal();
}

function closeAddBookDialog() {
  addBookDialog.close();
}

function processAddBookForm() {
  let inputChildren = addBookForm.querySelectorAll("input");
  let title = inputChildren[0].value;
  let author = inputChildren[1].value;
  let pages = inputChildren[2].value;
  let status = inputChildren[3].checked;
  closeAddBookDialog();
  addBookToLib(title, author, pages, status);
  renderBooks();
}

function renderBooks() {
  while (bookContainer.hasChildNodes()) {
    bookContainer.removeChild(bookContainer.childNodes[0]);
  }

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

    let controls = document.createElement("div");
    controls.classList.add("controls");
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("danger-button");
    removeButton.addEventListener("click", () => {
      let index = myLib.findIndex((book) => book.id == bookData.id);
      myLib.splice(index, 1);
      renderBooks();
    });
    let toggleStatusButton = document.createElement("button");
    toggleStatusButton.textContent = "Toggle status";
    toggleStatusButton.addEventListener("click", function () {
      bookData.toggleHaveRead();
      renderBooks();
    });

    controls.appendChild(toggleStatusButton);
    controls.appendChild(removeButton);

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(status);
    book.appendChild(controls);

    bookContainer.appendChild(book);
  });
}

[['The fellowship of the ring', 'J.R.R. Tolkien', 432, false], ['The name of the wind', 'Patrick Rothfuss', 662, true], ['Eragon', 'Christopher Paolini', 503, true], ['Harry Potter and the Philosopher\'s stone', 'J.K. Rowling', 223, false]].forEach((el) => {
  addBookToLib(el[0], el[1], el[2], el[3]);
});

renderBooks();
