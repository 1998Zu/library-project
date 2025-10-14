let myLibrary = [];
const newBookBtn = document.getElementById("newBookBtn");
const closeDialog = document.getElementById("cancelBtn");
const dialog = document.getElementById("myDialog");
const myForm = document.querySelector("form");


function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();

    return newBook;
}



function displayBooks() {
    const libraryDisplay = document.getElementById("libraryDisplay")
    libraryDisplay.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("bookCard");
        card.setAttribute("data-id", book.id);

        card.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong>${book.author}</p>
        <p><strong>Pages:</strong>${book.pages}</p>
        <p><strong>Read:</strong>${book.read ? "Yes": "No"}</p>`;  
        
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = book.read ? "Mark as Unread" : "Mark as Read";
        toggleBtn.classList.add("toggleBtn");

        toggleBtn.addEventListener("click", () => {
            book.toggleRead();

            displayBooks();
        })

        card.appendChild(toggleBtn);

       
        
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("removeBtn");

        removeBtn.addEventListener("click", () => {
            removeBook(book.id);
        });

        card.appendChild(removeBtn);
        
       libraryDisplay.appendChild(card); 

    });
}

newBookBtn.addEventListener("click", () => {
    dialog.show();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
});


myForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const pages = document.getElementById("pagesInput").value;
    const read = document.getElementById("readInput").checked;

    addBookToLibrary(title, author, pages, read);

    dialog.close();
    myForm.reset();
});

function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id);

    displayBooks();
}






//addBookToLibrary("1984", "George Orwell", 328, true);
//addBookToLibrary("Dune", "Frank Herbert", 412, false);
//addBookToLibrary("The Hobbit", "J.R.R Tolkien", 310, true);