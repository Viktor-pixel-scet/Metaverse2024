let orders = [];

const navBtn = document.querySelector('.nav-btn');
const navMenu = document.querySelector('.nav-menu');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const confirmModal = document.getElementById('confirmModal');
const confirmMessage = document.getElementById('confirmMessage');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

let currentItemName = '';
let currentItemPrice = 0;

navBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navBtn.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navBtn.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navBtn.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

let cart = [];
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.querySelector('.cart-items');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `${item.name} - $${item.price} 
        <button class="remove-btn" onclick="removeFromCart(${index})">Скасувати</button>`;
        cartItemsContainer.appendChild(itemDiv);

        total += item.price;
    });

    document.getElementById('cartTotal').innerText = total.toFixed(2);
    document.querySelector('.cart-count').innerText = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function handleOrderSubmission(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    processOrder(formData);
    resetForm(e.target);
}

function getFormData(form) {
    return {
        name: form.elements['name'].value,
        phone: form.elements['phone'].value,
        address: form.elements['address'].value,
    };
}

function processOrder(formData) {
    const order = {
        ...formData,
        items: cart.map(item => item.name).join(', ')
    };

    orders.push(order);
    alert(`Дякуємо, ${formData.name}! Ваше замовлення підтверджене.`);
    checkoutModal.style.display = 'none';
    cart = [];
    updateCart();
    displayOrders();
}

function resetForm(form) {
    form.reset();
}

cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    renderCartItems();
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Ваш кошик порожній. Будь ласка, додайте товари перед оформленням замовлення.');
        return;
    }

    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
});

closeCheckout.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modals = ['cartModal', 'checkoutModal', 'ordersModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

document.getElementById('orderForm').onsubmit = handleOrderSubmission;

document.getElementById('viewOrdersBtn').addEventListener('click', () => {
    displayOrders();
    document.getElementById('ordersModal').style.display = 'block';
});

function displayOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';

    orders.forEach(order => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div><span>Ім'я:</span> ${order.name}</div>
            <div><span>Телефон:</span> ${order.phone}</div>
            <div><span>Адреса:</span> ${order.address}</div>
            <div><span>Товари:</span> ${order.items}</div>
        `;

        ordersList.appendChild(listItem);
    });
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ваш кошик порожній.</p>';
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(itemDiv);
    });
}

const numbers = document.querySelectorAll('.stat-number');
numbers.forEach(number => {
    const target = parseInt(number.textContent);
    let current = 0;
    const increment = target / 3223;
    const updateNumber = () => {
        if (current < target) {
            current += increment;
            number.textContent = Math.round(current);
            requestAnimationFrame(updateNumber);
        } else {
            number.textContent = target;
        }
    };
    updateNumber();
});

const shopItems = [
    {
        name: "VR Окуляри Pro",
        description: "Занурьтеся у віртуальну реальність з неймовірною чіткістю",
        price: 599,
        image: "https://content2.rozetka.com.ua/goods/images/big/309800047.png",
        category: "Vr"
    },
    // Інші товари...
];

function displayShopItems(items) {
    const shopGrid = document.getElementById('shopGrid');
    shopGrid.innerHTML = '';

    if (items.length === 0) {
        shopGrid.innerHTML = '<p>Товари не знайдено.</p>';
        return;
    }

    items.forEach(item => {
        shopGrid.appendChild(createShopItem(item));
    });
}

displayShopItems(shopItems);

document.getElementById('applyFilters').addEventListener('click', () => {
    const category = document.getElementById('categoryFilter').value;
    const maxPrice = parseFloat(document.getElementById('priceFilter').value) || Infinity;

    const filteredItems = shopItems.filter(item => {
        const matchesCategory = (category === 'all' || item.category === category);
        const matchesPrice = item.price <= maxPrice;
        return matchesCategory && matchesPrice;
    });

    displayShopItems(filteredItems);
});

function createShopItem(item) {
    const shopItem = document.createElement('div');
    shopItem.classList.add('shop-item');
    shopItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name} <span class="item-category">(${item.category})</span></h3>
        <p>${item.description}</p>
        <p class="price">$${item.price}</p>
        <button class="buy-btn">Купити</button>
    `;
    return shopItem;
}

document.getElementById('shopGrid').addEventListener('click', (e) => {
    if (e.target.classList.contains('buy-btn')) {
        currentItemName = e.target.parentElement.querySelector('h3').textContent;
        currentItemPrice = parseFloat(e.target.parentElement.querySelector('.price').textContent.replace('$', ''));

        confirmMessage.textContent = `Ви підтверджуєте додавання "${currentItemName}" до кошика?`;

        confirmModal.style.display = 'flex';
    }
});

confirmYes.addEventListener('click', () => {
    const existingItem = cart.find(item => item.name === currentItemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: currentItemName, price: currentItemPrice, quantity: 1 });
    }

    confirmModal.style.display = 'none';

    updateCart();
});

confirmNo.addEventListener('click', () => {
    confirmModal.style.display = 'none';
});
