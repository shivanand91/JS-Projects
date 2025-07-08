document.addEventListener("DOMContentLoaded", () => {

    const products = [
        {
            id: 1,
            name: "Product 1",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 2,
            name: "Product 2",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 3,
            name: "Product 3",
            price: 19.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 4,
            name: "Product 4",
            price: 39.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 5,
            name: "Product 5",
            price: 24.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 6,
            name: "Product 6",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 7,
            name: "Product 7",
            price: 34.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 8,
            name: "Product 8",
            price: 44.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 9,
            name: "Product 9",
            price: 14.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        },
        {
            id: 10,
            name: "Product 10",
            price: 54.99,
            image: "https://images.unsplash.com/photo-1709884735017-114f4a31f944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        }
    ];

    const cart = [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList = "product-item";
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });


    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId)
            addToCart(product)
        }
    });


    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    // Add event listener for removing items (outside addToCart)
    cartItems.addEventListener("click", function handleRemove(e) {
        if (e.target.classList.contains("remove-item")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            cart.splice(index, 1);
            renderCart();
        }
    });

    function renderCart() {
        cartItems.innerText = "";
        let totalPrice = 0; 

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <p>${item.name} - $${item.price.toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>`;
                cartItems.appendChild(cartItem);
            });
            totalPriceDisplay.innerText = ` $${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
            totalPriceDisplay.innerText = " $0.00";
        }

    }


});