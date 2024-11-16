const books = [
    { title: "Ružno pače", author: "Hans Christian Andersen", copies: 5, price: 10.15 },
    { title: "Zlatokosa", author: "Gebrüder Grimm", copies: 5, price: 12.12 },
    { title: "Crvenkapica", author: "Gebrüder Grimm", copies: 7, price: 8.15 },
    { title: "Trnoružica", author: "Gebrüder Grimm", copies: 5, price: 11.35 },
    { title: "Pepeljuga", author: "Charles Perrault", copies: 6, price: 9.25 },
    { title: "Mačak u čizmama", author: "Charles Perrault", copies: 5, price: 7.63 },
    { title: "Pinokio", author: "Carlo Collodi", copies: 8, price: 14.05 },
    { title: "Aladin i čarobna lampa", author: "Arabian Nights", copies: 5, price: 10.67 },
    { title: "Palčica", author: "Hans Christian Andersen", copies: 5, price: 8.47 },
    { title: "Mačak Džingiskan", author: "Charles Perrault", copies: 6, price: 9.78 },
    { title: "Zvončica i njezine priče", author: "J.M. Barrie", copies: 5, price: 7.68 },
    { title: "Alisa u zemlji čudesa", author: "Lewis Carroll", copies: 7, price: 11.99 },
    { title: "Hobit", author: "J.R.R. Tolkien", copies: 5, price: 13.58 },
    { title: "Kraljević i prosjak", author: "Mark Twain", copies: 5, price: 10.38 },
    { title: "Gulliverova putovanja", author: "Jonathan Swift", copies: 6, price: 12.48 },
    { title: "Vuk i sedam kozlića", author: "Gebrüder Grimm", copies: 5, price: 11.28 },
    { title: "Hansel i Gretel", author: "Gebrüder Grimm", copies: 5, price: 8.26 },
    { title: "Vilinska kraljica", author: "Carlo Gozzi", copies: 5, price: 9.25 },
    { title: "Crvena kapica", author: "Charles Perrault", copies: 5, price: 11.14 },
    { title: "Petar Pan", author: "J.M. Barrie", copies: 5, price: 10.26 },
    { title: "Uspavana ljepotica", author: "Charles Perrault", copies: 6, price: 12.37 },
    { title: "Divlji labudovi", author: "Hans Christian Andersen", copies: 5, price: 9.48 },
    { title: "Grimmove bajke", author: "Gebrüder Grimm", copies: 7, price: 13.99 },
    { title: "Kralj lavova", author: "Hans Christian Andersen", copies: 5, price: 12.59 },
    { title: "Mala vještica", author: "Otfried Preußler", copies: 5, price: 11.70 },
    { title: "Pustolovine Toma Sawyera", author: "Mark Twain", copies: 5, price: 10.60 },
    { title: "Gospodin Noćna mora", author: "Michael Ende", copies: 5, price: 13.80 },
    { title: "Snjeguljica i sedam patuljaka", author: "Walt Disney", copies: 5, price: 8.90 },
    { title: "Zvončica", author: "J.M. Barrie", copies: 5, price: 9.50 },
    { title: "Ali Baba i četrdeset razbojnika", author: "Arabian Nights", copies: 5, price: 12.97 },
    { title: "Robin Hood", author: "Howard Pyle", copies: 5, price: 11.57 },
    { title: "Otok s blagom", author: "Robert Louis Stevenson", copies: 6, price: 13.35 },
    { title: "Mala sirena", author: "Hans Christian Andersen", copies: 8, price: 15.36 }
];

const cartItems = [];

function addToCart(title) {
    const book = books.find(book => book.title === title);
    if (book && book.copies > 0) {
        cartItems.push(book);
        updateCart();
        book.copies--;
        displayBooks(books);
    } else {
        alert("Nema dostupnih primjeraka za kupnju!");
    }
}

function removeFromCart(title) {
    const index = cartItems.findIndex(book => book.title === title);
    if (index !== -1) {
        cartItems.splice(index, 1);
        updateCart();
        const book = books.find(book => book.title === title);
        if (book) {
            book.copies++;
            displayBooks(books);
        }
    }
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    
    const cartCounts = {};
    cartItems.forEach(book => {
        if (!cartCounts[book.title]) {
            cartCounts[book.title] = 0;
        }
        cartCounts[book.title]++;
    });

    for (const title in cartCounts) {
        const li = document.createElement('li');
        li.textContent = `${title} (${cartCounts[title]} copies)`;
        cartList.appendChild(li);
    }

    let totalCopies = cartItems.length;
    document.getElementById('total-copies').textContent = `Ukupno primjeraka: ${totalCopies}`;

    let totalPrice = cartItems.reduce((acc, book) => acc + book.price, 0).toFixed(2);
    document.getElementById('total-price').textContent = `Ukupna cijena: ${totalPrice} $`;
}

function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Kopije na stanju:</strong> <span id="copies-${book.title}">${book.copies}</span></p>
            <p><strong>Cijena:</strong> ${book.price.toFixed(2)} $</p>
            <button class="borrow-btn" data-title="${book.title}">Kupi</button>
            <button class="return-btn" data-title="${book.title}">Vrati</button>
            <span class="book-icon">📖</span>
        `;
        bookList.appendChild(bookDiv);
    });
    
    document.querySelectorAll('.borrow-btn').forEach(button => {
        button.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            alert( title + " vam je dodana u košaricu!")
            addToCart(title);
        });
    });

    document.querySelectorAll('.return-btn').forEach(button => {
        button.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            removeFromCart(title);
        });
    });
}

function handleSearch() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const filteredBooks = searchInput === '' ? books : books.filter(book => 
        book.title.toLowerCase().includes(searchInput) || book.author.toLowerCase().includes(searchInput)
    );
    displayBooks(filteredBooks);
}

document.getElementById('search-btn').addEventListener('click', handleSearch);

displayBooks(books);
