function addTocart(userId, bookId, quantity) {
    fetch('/cart/add', {
        method: 'post',
        body: JSON.stringify({userId, bookId, quantity}),
        headers: {'Content-Type' : 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
        console.log('Item added to cart', data);
    })
    .catch(error => console.error('Error', error));
}

function removeFromCart(userId, bookId) {
    fetch('/cart/remove/${userId}/${bookId}', {method: 'DELETE'})
    .then(response => response.json())
    .then(data => {
        console.log('Item removed from cart', data);
    })
    .catch(error => console.error('Error', error));
}