// Function to show login screen
function showLoginScreen() {
    hideAllScreens();
    document.getElementById('login-screen').classList.add('active');
}

// Function to show sign up screen
function showSignUpScreen() {
    hideAllScreens();
    document.getElementById('signup-screen').classList.add('active');
}

// Function to show admin view screen
function showAdminViewScreen() {
    hideAllScreens();
    document.getElementById('admin-view-screen').classList.add('active');
    displayBooks('admin');
    displayUsers();
}

// Function to show add book screen
function showAddBookScreen() {
    hideAllScreens();
    document.getElementById('add-book-screen').classList.add('active');
}

// Function to show teacher/student view screen
function showTeacherStudentViewScreen() {
    hideAllScreens();
    document.getElementById('teacher-student-view-screen').classList.add('active');
    displayBooks('user');
}

// Function to hide all screens
function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
}

// Function to handle login
function login() {
    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;
    const users = getUsersFromStorage();
    const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (user) {
        alert("You Login Successfully");
        if (user.role === "admin") {
            showAdminViewScreen();
        } else if (user.role === "teacher" || user.role === "student") {
            showTeacherStudentViewScreen();
        }
    } else {
        alert("Invalid username or password");
    }
}
// Function to handle sign up
function signUp() {
    const signUpUsername = document.getElementById("signup-username").value;
    const signUpPassword = document.getElementById("signup-password").value;
    const signUpRole = document.getElementById("signup-role").value;
    const users = getUsersFromStorage();
    // const adminExists = users.some(user => user.role === "admin");

    // if (signUpRole === "admin" && adminExists) {
    //     alert("Admin exists");
    //     return;
    // }

    if (signUpUsername && signUpPassword) {
        users.push({ username: signUpUsername, password: signUpPassword, role: signUpRole });
        localStorage.setItem('users', JSON.stringify(users));
        showLoginScreen();
        displayUsers();
    }
}
// const adminAccounts=JSON.parse(localStorage.getItem('adminAccounts'))||[];
// //function to add new admin account
// function addAdminAccount(username,password){
//     const newAdmin={username,password};
//     adminAccounts.push(newAdmin);
//     localStorage.setitem('adminAccounts',JSON.stringify(adminAccounts));
// }

// Function to remove a user
function removeUser(username) {
    let users = getUsersFromStorage();
    users = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

// Function to display users on the page
function displayUsers() {
    const users = getUsersFromStorage();
    const usersList = document.getElementById("users-list");
    usersList.innerHTML = '';

    users.forEach(user => {
        const usersLi = document.createElement("li");
        usersLi.innerHTML = `username: ${user.username}<br>password: ${user.password}<br>role: ${user.role}`;
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "Remove";
        
        removeBtn.onclick = () => removeUser(user.username);
        usersLi.appendChild(removeBtn);
       
        usersList.appendChild(usersLi);
    });
}

// Function to add a book
function addBook() {
    const bookTitle = document.getElementById('book-title').value;
    const bookPages = document.getElementById('book-pages').value;
    const bookPublisher = document.getElementById('book-publisher').value;
    const bookAuthor = document.getElementById('book-author').value;
    const bookEdition = document.getElementById('book-edition').value;

    if (bookTitle && bookPages && bookPublisher && bookAuthor && bookEdition) {
        let books = getBooksFromStorage();
        books.push({ title: bookTitle, pages: bookPages, publisher: bookPublisher, author: bookAuthor, edition: bookEdition });
        localStorage.setItem('books', JSON.stringify(books));
        document.getElementById('book-title').value = '';
        document.getElementById('book-pages').value = '';
        document.getElementById('book-publisher').value = '';
        document.getElementById('book-author').value = '';
        document.getElementById('book-edition').value = '';
        showAdminViewScreen();
    }
}

// Function to retrieve books from localStorage
function getBooksFromStorage() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

// Function to retrieve users from localStorage
function getUsersFromStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Function to display books on the page
function displayBooks(role) {
    const books = getBooksFromStorage();
    const bookListUl = document.querySelector(role === 'admin' ? '#admin-book-list' : '#user-book-list');
    bookListUl.innerHTML = '';

    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            Title: ${book.title}<br>
            Pages: ${book.pages}<br>
            Publisher: ${book.publisher}<br>
            Author: ${book.author}<br>
            Edition: ${book.edition}<br>
            ${role === 'admin' ? `<button onclick="removeBook(${index})">Remove</button>` : ''}
        `;
        bookListUl.appendChild(li);
    });
}

// Function to remove a book from the list and update localStorage
function removeBook(index) {
    let books = getBooksFromStorage();
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks('admin');
}

// Function to search books
function searchBooks(role) {
    const searchBar = document.querySelector(role === 'admin' ? '#admin-search-bar' : '#user-search-bar');
    const query = searchBar.value.toLowerCase();
    const books = getBooksFromStorage();
    const found = books.some(book => book.title.toLowerCase() === query);

    if (found) {
        alert(`Book available`);
    } else {
        alert("Book not available");
    }
}

// Function to manage users (admin only)
function manageUsers() {
    const userManagement = document.getElementById('user-management');
    userManagement.classList.toggle('hidden');
    displayUsers();
}

// Function to view books
function viewBooks(role) {
    const bookListDiv = document.querySelector(role === 'admin' ? "#admin-book-list-container" : "#user-book-list-container");
    bookListDiv.classList.toggle('hidden');
    displayBooks(role);
}

// Initialize the app by showing the login screen
showLoginScreen();