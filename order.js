let cart = [];

function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" style="width: 50px; text-align: center;">
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartItems.appendChild(row);
        total += item.price * item.quantity;
    });

    document.getElementById('total-price').innerText = `Total: $${total}`;
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1; // quantity will not go below 1
    }
    updateCart();
}

function updateQuantity(index, value) {
    const quantity = parseInt(value);
    if (quantity > 0) {
        cart[index].quantity = quantity;
    } else {
        cart[index].quantity = 1;
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


function buyNow() {
    localStorage.setItem('favorites', JSON.stringify(cart)); //stores in local storage
    window.location.href = 'payment.html'; //navigate to payment page
}


function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(cart));
    alert('Order saved as favorite!');
}

function applyFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
        cart = favorites;
        updateCart();
        alert('Favorites applied.');
    } else {
        alert('No favorites found.');
    }
}