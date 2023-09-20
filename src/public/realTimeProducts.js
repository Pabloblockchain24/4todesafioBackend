
const socket = io();

document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('productTitle');
    const title = titleInput.value;
    titleInput.value = '';

    const descriptionInput = document.getElementById('productDescription');
    const description = descriptionInput.value;
    descriptionInput.value = '';

    const priceInput = document.getElementById('productPrice');
    const price = priceInput.value;
    priceInput.value = '';
    socket.emit('productList', {title:title, description:description, price:price});    
});

socket.on('product', (data) => {
    const showProducts = document.getElementById('showProducts');
    const productElement = document.createElement('div');
    productElement.innerHTML = ` <strong>${data.title} </strong> ${data.description}  ${data.price}`;
    productElement.style.marginTop = '10px';
    showProducts.appendChild(productElement);
});
