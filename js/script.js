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
