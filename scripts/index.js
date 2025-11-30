const main = document.getElementsByTagName("main")[0];
const addBookDialog = document.getElementsByClassName("add-book")[0];
const addBookForm = addBookDialog.querySelector("form");
const themeToggle = document.getElementsByClassName("toggle-track theme")[0];
const switchStyleButton = document.getElementsByClassName("switch-style-button")[0];

let renderStyle = "cards";
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


function openAddBookDialog() {
  addBookDialog.showModal();
}


function closeAddBookDialog() {
  addBookDialog.close();
}

function addBookToLib(title, author, numOfPages, haveRead) {
  let book = new Book(title, author, numOfPages, haveRead);
  myLib.push(book);
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
  if (main.querySelector(".book-container")) {
    main.querySelector(".book-container").remove();
  } if (main.querySelector("table")) {
    main.querySelector("table").remove();
  }
  if (renderStyle == "cards") {
    renderBooksAsCards();
  } else if (renderStyle == "table") {
    renderBooksAsTable();
  }
}


function renderBooksAsCards() {
  let bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  myLib.forEach(function (bookData) {
    let book = document.createElement("div");
    book.classList.add("book-card");
    let title = document.createElement("h2");
    title.textContent = bookData.title;
    let author = document.createElement("p");
    author.textContent = bookData.author;
    let pages = document.createElement("p");
    pages.textContent = bookData.numOfPages;
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("danger-button");
    removeButton.addEventListener("click", () => {
      let index = myLib.findIndex((book) => book.id == bookData.id);
      myLib.splice(index, 1);
      bookContainer.removeChild(book);
    });
    let toggleStatusButton = document.createElement("button");
    toggleStatusButton.textContent = bookData.haveRead ? "Already read" : "Haven't read yet";
    toggleStatusButton.addEventListener("click", function () {
      bookData.toggleHaveRead();
      toggleStatusButton.textContent = bookData.haveRead ? "Already read" : "Haven't read yet";
    });
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(toggleStatusButton);
    book.appendChild(removeButton);
    bookContainer.appendChild(book);
  });
  main.appendChild(bookContainer);
}


function renderBooksAsTable() {
  let bookTable = document.createElement("table");
  let bookThead = document.createElement("thead");
  let bookTheadRow = document.createElement("tr");
  let bookTbody = document.createElement("tbody");
  ["Name", "Author", "Number of pages", "Status", "Remove"].forEach(header => {
    let bookTh = document.createElement("th");
    bookTh.textContent = header;
    bookTheadRow.appendChild(bookTh);
  });
  bookThead.appendChild(bookTheadRow);
  bookTable.appendChild(bookThead);

  myLib.forEach(function (bookData) {
    let book = document.createElement("tr");
    let title = document.createElement("th");
    title.textContent = bookData.title;
    let author = document.createElement("td");
    author.textContent = bookData.author;
    let pages = document.createElement("td");
    pages.textContent = bookData.numOfPages;
    let status = document.createElement("td");
    let toggleStatusButton = document.createElement("button");
    toggleStatusButton.textContent = bookData.haveRead ? "Already read" : "Haven't read yet";
    toggleStatusButton.addEventListener("click", function () {
      bookData.toggleHaveRead();
      toggleStatusButton.textContent = bookData.haveRead ? "Already read" : "Haven't read yet";
    });
    status.appendChild(toggleStatusButton);
    let remove = document.createElement("td");
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("danger-button");
    removeButton.addEventListener("click", () => {
      let index = myLib.findIndex((book) => book.id == bookData.id);
      myLib.splice(index, 1);
      bookTbody.removeChild(book);
    });
    remove.appendChild(removeButton);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(status);
    book.appendChild(remove);
    bookTbody.appendChild(book);
  });
  bookTable.appendChild(bookTbody);
  main.appendChild(bookTable);
}


themeToggle.addEventListener("click", () => {
  themeToggle.classList.toggle("toggle-on");
  document.documentElement.classList.toggle("light-theme");
});


switchStyleButton.addEventListener("click", () => {
  if (renderStyle == "cards") {
    renderStyle = "table";
    switchStyleButton.textContent = "Cards display";
  } else if (renderStyle == "table") {
    renderStyle = "cards";
    switchStyleButton.textContent = "Table display";
  }
  renderBooks();
});


[['The fellowship of the ring', 'J.R.R. Tolkien', 432, false], ['The name of the wind', 'Patrick Rothfuss', 662, true], ['Eragon', 'Christopher Paolini', 503, true], ['Harry Potter and the Philosopher\'s stone', 'J.K. Rowling', 223, false]].forEach((el) => {
  addBookToLib(el[0], el[1], el[2], el[3]);
});

renderBooks()
