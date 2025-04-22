document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('favorites')) || [];
    const orderItems = document.getElementById('order-items');

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>$${item.price}</td><td>${item.quantity}</td>`;
        orderItems.appendChild(row);
    });
});

function processPayment() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    if (name && address && payment) {
        alert(`Thank you for your purchase, ${name}! Your order will be delivered to ${address} on 7-14 working days.`);
        // Clear cart and favorites after purchase
        localStorage.removeItem('favorites');
    } else {
        alert('Please fill in all fields.');
    }
}