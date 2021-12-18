let myLibrary = [];
//let content = document.querySelector('.content');
const width = 400; 
const bookWidth = 50;

//This is the place where all the books are going to be displayed
let content = document.getElementById("display");

//Create a book object constructor
function Book (title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, 
        ${read ? 'already read':'have not read'}`;
    }
    this.changeRead = function () { 
        this.read = !(this.read);
    }
}


/**
 * this is for testing purposes 
 */
createBook(new Book('The Anthropocene Reviewed', 'John Green', 325, true));
createBook(new Book('The Fault in Our Stars', 'John Green', 345, true));


/**
 * This will allow the buttonn when pressed to create an entire book. 
 * 
 */
document.getElementById("submit").onclick = function() {
    let title = document.getElementById("BookName").value;
    let author = document.getElementById("AuthorName").value;
    let pages = document.getElementById("PageNumber").value;
    let read = document.getElementById("Read").checked;
    //verify that all the elements fit criteria: 

    //TODO: MAKE SURE THAT EACH VALUE WORKS (CAPITALIE FIRST LETTER,etc)
    //reset all the values to nothing
    document.getElementById("BookName").value = '';
    document.getElementById("AuthorName").value = '';
    document.getElementById("PageNumber").value = 0;
    document.getElementById("Read").checked = false;

    if (title.length > 0 && author.length > 0 && pages > 0) {
        title = cleanString(title);
        author = cleanString(author);
        pages = parseInt(pages);
        let newBook = new Book(title, author, pages, read); 
        createBook(newBook);
    }
}

// funciton in order to create a book 
function createBook(newBook) {
    console.log(newBook.info());
    content.appendChild(displayBook(newBook));
    myLibrary.push(newBook);
    update();
}


/**
 * This function is to take a string & it will return 
 * the string such that it is Capitalized, Truncated, and 
 * in lower cases! 
 */

function cleanString(textInput) { 
    const words = textInput.toLowerCase().split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    let sentence = words.join(" ");
    return sentence;
}

/**
 * This function will take a book from the library, and 
 * create an object that allows the book to be displayed in 
 * book format. 
 */

function displayBook(book) {
    let endBook = document.createElement('div');
    endBook.setAttribute("class", "container");

    let display = document.createElement('div');
    display.setAttribute("class", "book");
    endBook.appendChild(display);
    
    //make the book look "like a book"
    let backCover = document.createElement('div');
    backCover.setAttribute("class", "book cover");
    endBook.appendChild(backCover);

    //make the book have bindings 
    let binding = document.createElement('div');
    binding.setAttribute("class", "binding one");
    endBook.appendChild(binding);

    //make the book have bindings 
    let binding2 = document.createElement('div');
    binding2.setAttribute("class", "binding two");
    endBook.appendChild(binding2);

    //make the book have bindings 
    let binding3 = document.createElement('div');
    binding3.setAttribute("class", "binding three");
    endBook.appendChild(binding3);
    
    //set format 
    let title = document.createElement('div');
    title.textContent = book.title;
    title.setAttribute("class", "bookclass");

    let content = document.createElement('div');
    content.setAttribute("class", "bookcontent")
    content.textContent = `By ${book.author}. This book is ${book.pages} 
    pages long.`
    let status = document.createElement('div');
    status.textContent = (book.read) ? `I have read it` : `I have not read it`;
    let hidden = document.createElement('div');

    //button functions to change whether or not it has been read
    let changeRead = document.createElement('button');
    changeRead.textContent = `Change Read Status`
    changeRead.onclick = function() {
        book.changeRead(); 
        status.textContent = (book.read) ? `I have read it` : `I have not read it`;
        update ();
    }
    hidden.appendChild(changeRead);

    //button to allow user to delete the book when needed
    let deleteBook = document.createElement('button');
    deleteBook.textContent = `Delete Book.`
    deleteBook.onclick = function () { 
        endBook.parentNode.removeChild(endBook);
        const index = myLibrary.indexOf(book);
        if (index > -1) {
            myLibrary.splice(index, 1);
        }
        update();
    }
    hidden.appendChild(deleteBook);

    display.appendChild(title);
    display.appendChild(content);
    display.appendChild(status);
    display.appendChild(hidden);
    return endBook;
}

/**
 * This updates the bottom footer bar to the number of pages, 
 * books, etc that has been read. 
 */
function update () { 
    let allBooksDiv = document.getElementById('totalbooks');
    let pagesReadDiv = document.getElementById('totalpages');
    let booksReadDiv = document.getElementById('booksread');
    let allBooks = 0, pagesRead = 0, booksRead = 0; 
    myLibrary.forEach((item, index) => {
        allBooks ++;
        pagesRead += item.pages;
        if (item.read) {
            booksRead ++;
        }
    })
    allBooksDiv.textContent = '' + allBooks;
    pagesReadDiv.textContent = '' + pagesRead;
    booksReadDiv.textContent = '' + booksRead;
}
//Place Books on The Page 





/*
newBook();
//this is the overall box that has each of the items in it 
function displayBooks() { 
    let book = document.createElement('div');
    myLibrary.forEach((book) => {
        displayBook(book.info());
    });
}

function displayBook(info) {
    let showbook = document.createElement('div');
    showbook.setAttribute("class", "book");
    showbook.style.cssText = `display: flex; flex: 0 1 0; flex-direction: column; justify-items: center;
    width: ${bookWidth}px; gap: 50px;`
    let btitle = document.createElement('div');
    let bpage = document.createElement('div'); 
    let bread = document.createElement('div');
    showbook.appendChild(btitle);
    showbook.appendChild(bpage); 
    showbook.appendChild(bread); 
    btitle.textContent = `${info}`;
    btitle.style.cssText = 'display: flex; justify-content: center; font-size: 30px';
    content.appendChild(showbook);
}

function newBook() {
    let inputBox = document.createElement('div');
    content.appendChild(inputBox);
    inputBox.style.cssText = `display: flex; flex-direction: column; justify-items: center;
    width: ${width}px; gap: 5px;`

    userInput("title", inputBox);
    userInput("author", inputBox);
    userInput("page", inputBox);
    userInput("read", inputBox);

    let enterButton = document.createElement('button');
    enterButton.textContent = "Enter";
    enterButton.addEventListener("mousedown", enter);
    inputBox.appendChild(enterButton);
}

function enter() {
    let title = document.getElementById("title").value; 
    let author = document.getElementById("author").value; 
    let page = document.getElementById("page").value;
    let read = document.getElementById("read").value;
    let book = new Book(title, author, page, read); 
    addBookToLibrary(book);
    console.log(book.info());
    displayBook();
}

function Book (title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, 
        ${read ? 'already read':'have not read'}`;
    }
}

*/

/*
function userInput(title, inputBox) {
    let inputter = document.createElement('input');
    inputBox.appendChild(inputter);
    inputter.setAttribute("id", `${title}`);
    inputter.setAttribute("placeholder", `Enter the book's ${title}`);
}*/

/*
function displayLoop(array) {
    array.forEach((book) => console.log(book.info));
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}
*/