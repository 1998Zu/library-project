const newBookBtn = document.getElementById("newBookBtn");
const dialog = document.getElementById("myDialog");
const closeDialog = document.getElementById("cancelBtn")
const myForm = document.querySelector("form");


newBookBtn.addEventListener("click", () => {
    dialog.show();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
});





let myLibrary = [];

class Book {

    constructor(){
        this.books = [];
    }

    addBooks(title, author, pages, isRead){
        const newBook = {
            id: crypto.randomUUID(),
            title,
            author,
            pages,
            isRead
        };
        this.books.push(newBook)
        this.displayBook();
    }

    toggleRead(bookId){
        const book = this.books.find(book => book.id === bookId);
        if(book){
            book.isRead = !book.isRead;
            this.displayBook();
        }
    }

    removeBook(bookId){
        this.books = this.books.filter(book => book.id !== bookId);
        this.displayBook();
    }

    displayBook(){
        const libraryDisplay = document.getElementById("libraryDisplay");
        libraryDisplay.innerHTML = "";

        this.books.forEach(book => {
            const card = document.createElement("div");
            card.classList.add("bookCard");
            card.setAttribute("data-id", book.id);

            card.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong>${book.author}</p>
            <p><strong>Pages:</strong>${book.pages}</p>
            <p><strong>Read:</strong>${book.isRead ? "Yes": "No"}</p>`;  

            const toggleBtn = document.createElement("button");
            toggleBtn.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
            toggleBtn.classList.add("toggleBtn");

            toggleBtn.addEventListener("click", () => {
                this.toggleRead(book.id);
            })

            card.appendChild(toggleBtn);


            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("removeBtn");

            removeBtn.addEventListener("click", () => {
                this.removeBook(book.id);
            });

            card.appendChild(removeBtn);            

           libraryDisplay.appendChild(card); 
    
        }) 
    }
}

let library = new Book();

myForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const pages = document.getElementById("pagesInput").value;
    const isRead = document.getElementById("readInput").checked;

    library.addBooks(title, author, pages, isRead);
   
    dialog.close();
    myForm.reset();
});






//addBookToLibrary("1984", "George Orwell", 328, true);
//addBookToLibrary("Dune", "Frank Herbert", 412, false);
//addBookToLibrary("The Hobbit", "J.R.R Tolkien", 310, true);