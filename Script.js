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

    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `${item.name} - $${item.price} x${item.quantity} 
    <button class="remove-btn" onclick="removeFromCart(${index})">Скасувати</button>`;
        cartItemsContainer.appendChild(itemDiv);
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
    if (!formData) return;

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

document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Ваш кошик порожній. Будь ласка, додайте товари перед оформленням замовлення.');
        return;
    }

    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
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

    {
        name: "Нейроінтерфейс Nexus",
        description: "Керуйте віртуальним світом силою думки",
        price: 1299,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoRMiFT92oDKfFJjmk_U1o4UP9LAWdOMpN8IoMt5jPLZ_vx0DJ1b_Nx13C-Jum6ObUDdE&usqp=CAU",
        category: "Vr"
    },
    {
        name: "Голографічний проектор",
        description: "Створюйте 3D-зображення прямо у повітрі",
        price: 799,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSfrYz_rswCe1cHNVFbD2Fue_-sooHarrO2cA2eHQCVbvr6GE9EPEpWYd93IBUYm12c9DEs3GgbyKkfbi-tFfZfVbm6cyveAMxrV3-hpX0S&usqp=CAc",
        category: "Гаджети"
    },
    {
        name: "Квантовий комп'ютер Mini",
        description: "Потужність квантових обчислень у вашому домі",
        price: 9999,
        image: "https://mors.in.ua/uploads/posts/2021-09/1631560603_chin601.jpg",
        category: "Комп'ютери"
    },
    {
        name: "Набір для створення NFT",
        description: "Створюйте та продавайте унікальні цифрові активи",
        price: 299,
        image: "https://vapehub.shop/image/cache/catalog/premix/octobar%20nft%2010/blue-rasp-va-600x600.jpg",
        category: "Nft"
    },
    {
        name: "Костюм повного занурення",
        description: "Відчуйте віртуальний світ усім тілом",
        price: 1999,
        image: "https://ms.detector.media/doc/images/news/18467/i75_ArticleImage_18467.png",
        category: "Vr"
    },
    {
        name: "Розумний годинник Quantum Watch",
        description: "Слідкуйте за своїм здоров'ям і продуктивністю з неймовірною точністю",
        price: 499,
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS2a9-TVNrZJC_-by1Qyxbc82ZPu47O50qpotoiuxIcbJl4m9MugTyq6ABCTXeAiR15MUEI3q26jDL-JZ-9rOn8_cdomQGJ7Cfj5EN6auflp6DMEij06yaI2SjZSXsH4Dxw8UXszQBX31w&usqp=CAc",
        category: "гаджети"
    },
    {
        name: "Цифровий фотоапарат ProLens",
        description: "Зробіть приголомшливі знімки з високою деталізацією",
        price: 999,
        image: "https://st3.depositphotos.com/1004061/36046/i/1600/depositphotos_360462638-stock-photo-professional-digital-camera-pro-lens.jpg",
        category: "гаджети"
    },
    {
        name: "3D Принтер Creator",
        description: "Створюйте об'єкти з цифрових моделей у реальному часі",
        price: 1499,
        image: "https://3д-печать.укр/wp-content/uploads/2018/04/FlashForge-Creator-Pro-3D-%D0%BF%D1%80%D0%B8%D0%BD%D1%82%D0%B5%D1%80-%D0%BA%D1%83%D0%BF%D0%B8%D1%82%D1%8C-%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0-1.jpg",
        category: "гаджети"
    },
    {
        name: "Криптовалютний гаманець SafeVault",
        description: "Захищайте свої цифрові активи з максимальним рівнем безпеки",
        price: 199,
        image: "https://content1.rozetka.com.ua/goods/images/big/323077967.png",
        category: "Nft"
    },
    {
        name: "Дрони для зйомок SkyView",
        description: "Захоплюйте приголомшливі кадри з висоти",
        price: 2999,
        image: "https://i.ytimg.com/vi/aRZxaHOCSRQ/hqdefault.jpg",
        category: "гаджети"
    },
    {
        name: "Розумний холодильник FreshKeeper",
        description: "Зберігайте продукти свіжими довше з AI-контролем",
        price: 2499,
        image: "https://img.tsn.ua/cached/914/tsn-65e5f602e5840498ead47d2707d23e52/thumbs/1200x630/1d/e1/75275f72661d5b3a689e29d911ebe11d.jpg",
        category: "Техніка"
    },
    {
        name: "Квантовий шолом безпеки",
        description: "Захистіть свій розум від кібератак",
        price: 799,
        image: "https://shopmtn.de/cdn/shop/files/img_3776.jpg?v=1707944351",
        category: "Безпека"
    },
    {
        name: "AI Асистент-робот",
        description: "Ваш особистий помічник з штучним інтелектом",
        price: 3999,
        image: "https://imgcdn.stablediffusionweb.com/2024/5/28/d4964ee1-91a0-4ac0-b5c1-e9499081c5a1.jpg",
        category: "Роботи"
    },
    {
        name: "Нейропроцесор для підвищення IQ",
        description: "Збільште свої когнітивні здібності",
        price: 5999,
        image: "https://futuro.in.ua/images/intel-is-releasing-a-processor-that-s-built-for-neural-networks-750x300.jpg",
        category: "Здоров'я"
    },
    {
        name: "Квантовий генератор енергії",
        description: "Невичерпне джерело чистої енергії для вашого дому",
        price: 7999,
        image: "https://focus.ua/static/storage/thumbs/920x465/2/b5/1331f841-58a09123df347090dfd322619e035b52.jpg?v=1060_1",
        category: "Енергія"
    },
    {
        name: "Гіперзвуковий дрон-кур'єр",
        description: "Доставка посилок зі швидкістю звуку",
        price: 1799,
        image: "https://investory.news/wp-content/uploads/2024/01/Dron_Kyrer-1024x576.jpg",
        category: "Транспорт"
    },
    {
        name: "Біонічний екзоскелет",
        description: "Підвищіть свою фізичну силу та витривалість",
        price: 3499,
        image: "https://kor.ill.in.ua/m/1260x900/1753429.jpg",
        category: "Здоров'я"
    },
    {
        name: "Нанороботи для імунітету",
        description: "Зміцніть свій імунітет на клітинному рівні",
        price: 999,
        image: "https://images-on-off.com/images/158/chtotakoenanorobotidlyachegooninuzhni-d62f638d.jpg",
        category: "Здоров'я"
    },
    {
        name: "Голографічний смартфон",
        description: "Спілкуйтеся з 3D-проекціями своїх друзів",
        price: 1299,
        image: "https://static.espreso.tv/uploads/article/2505321/images/im-35858.jpg",
        category: "Гаджети"
    },
    {
        name: "Квантовий шифратор даних",
        description: "Найвищий рівень захисту для ваших даних",
        price: 899,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CywWJQtLef1M--XayQW0K42z-zLIPO6O59e52o3WhNZFvEDljhatBC5CNwSkktqkyZw&usqp=CAU",
        category: "Безпека"
    },
    {
        name: "AI Художник",
        description: "Створюйте шедеври за допомогою штучного інтелекту",
        price: 599,
        image: "https://static.tildacdn.com/tild6336-3165-4630-b862-303636643232/IMG_4301.JPG",
        category: "Мистецтво"
    },
    {
        name: "Розумне дзеркало StyleMirror",
        description: "Віртуальна примірочна у вашій спальні",
        price: 799,
        image: "https://images.prom.ua/2409796579_w600_h600_2409796579.jpg",
        category: "Техніка"
    },
    {
        name: "Портативний очищувач повітря NanoClean",
        description: "Чисте повітря де б ви не були",
        price: 299,
        image: "https://novodom.ua/storage/resize/pd/products/4d600562-bfc4-40bf-9a70-b3ba6609e83b/0.jpeg",
        category: "Здоров'я"
    },
    {
        name: "Нейросимулятор снів",
        description: "Програмуйте та контролюйте свої сни",
        price: 899,
        image: "https://img.medicalexpo.ru/images_me/photo-g/81288-17820057.webp",
        category: "Здоров'я"
    },
    {
        name: "Квантовий перекладач мов",
        description: "Миттєвий переклад на будь-яку мову світу",
        price: 399,
        image: "https://images.prom.ua/3387450847_w640_h640_elektronnyj-perevodchik-translator.jpg",
        category: "Гаджети"
    },
    {
        name: "Смарт-планшет XPad",
        description: "Смарт-планшет з AI для підвищення продуктивності",
        price: 799,
        image: "https://mobile-review.com/all/wp-content/uploads/2024/08/screenshot-9-7.png",
        category: "Гаджети"
    },
    {
        name: "Автоматизований дрон-агроном",
        description: "Оптимізуйте процеси сільського господарства",
        price: 2499,
        image: "https://reactivedrone.eu/wp-content/uploads/2021/04/reactive_drone_rgd_06_1.jpg",
        category: "Сільське господарство"
    },
    {
        name: "Розумний термостат HeatMaster",
        description: "Керуйте температурою вашого дому з AI",
        price: 399,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTVTcZQa2At4VMjZYwhzwjjtAOvzdCn1fO7acfr5TlZstf7dKppW9UOpuHVmTgrd-uhZT_n7v58B1J2HnuN2EBl5F3huIM-oHwmznSOCEE4Er4FnLLP69y9BAP1Ib4Je5qMv9tEoZ4&usqp=CAc",
        category: "Техніка"
    },
    {
        name: "Електронна книга Kindle Reader",
        description: "Читання улюблених книг з комфортом",
        price: 199,
        image: "https://img.mta.ua/image/cache/data/foto/z742/742348/photos/Amazon-Kindle-Paperwhite-11th-Gen-16GB-46-Black-01-600x600.jpg",
        category: "Гаджети"
    },
    {
        name: "Віртуальний фітнес-тренер",
        description: "Отримайте індивідуальні тренування вдома",
        price: 499,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4Ajmt9AMXV_EVCF1co-f4hcO3_igitEfKAP0GASOQqJwF_SunnqsHVsJb70zkiUWuqg&usqp=CAU",
        category: "Здоров'я"
    },
    {
        name: "Електронний ключ безпеки",
        description: "Ваша особиста безпека на кінчику пальця",
        price: 199,
        image: "https://content1.rozetka.com.ua/goods/images/big_tile/246587317.jpg",
        category: "Безпека"
    },
    {
        name: "Набір для створення 3D-моделей",
        description: "Створюйте 3D-моделі з легкістю",
        price: 299,
        image: "https://images.prom.ua/4386217440_w640_h320_practice-set-plakati.jpg",
        category: "Art"
    },
    {
        name: "Освітлена стеля CeilingBot",
        description: "Оптимізуйте освітлення вашого дому",
        price: 1499,
        image: "https://www.art-house.org.ua/wp-content/uploads/2018/12/viber-image-149.jpg",
        category: "Техніка"
    },
    {
        name: "Голографічна лазерна клавіатура",
        description: "Введення тексту в новій вимірі",
        price: 399,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJzImIM1eggQKwRdGvlaxvWv_LiuAWuuQN9Q&s",
        category: "Гаджети"
    },
    {
        name: "Смарт-камери для домашньої безпеки",
        description: "Контроль за безпекою вашого дому у режимі реального часу",
        price: 499,
        image: "https://images.prom.ua/5320148997_w600_h600_5320148997.jpg",
        category: "Безпека"
    },
    {
        name: "Портативний геймерський комп'ютер",
        description: "Грайте у свої улюблені ігри з будь-якого місця",
        price: 2499,
        image: "https://content.rozetka.com.ua/goods/images/big/427041101.jpg",
        category: "Комп'ютери"
    },
    {
        name: "Система розумного дому SmartHome",
        description: "Контролюйте всі прилади з одного додатку",
        price: 999,
        image: "https://kolecs.lviv.ua/wp-content/uploads/2020/07/systema-rozumnyi-dim.jpg",
        category: "Техніка"
    },
    {
        name: "Підводний дрон AquaExplorer",
        description: "Досліджуйте підводний світ з новим дроном",
        price: 2499,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRMsx8ZsDEIAB5yUNwfsBYbW2AGnDDtqGHw&s",
        category: "Гаджети"
    },
    {
        name: "Розумний садівник RoboGarden",
        description: "Автоматизована система догляду за рослинами",
        price: 899,
        image: "https://agroportal.ua/storage/media/uploads/articles/1d126ba-robot.jpg",
        category: "Сільське господарство"
    },
    {
        name: "Квантовий метеоролог",
        description: "Точні прогнози погоди на основі квантових обчислень",
        price: 1599,
        image: "https://24tv.ua/resources/photos/news/202402/2495122.jpg?v=1707993040000",
        category: "Наука"
    },
    {
        name: "Біонічні окуляри NightVision",
        description: "Бачте в темряві як вдень",
        price: 799,
        image: "https://opticstore.com.ua/public/cache/images/8/6/0/0/dc2964df897bb3d2140b94e6a8dc6a6b_350_350.jpg",
        category: "Оптика"
    },
    {
        name: "Телепортаційна капсула",
        description: "Миттєве переміщення на короткі відстані",
        price: 9999,
        image: "https://st4.depositphotos.com/2673929/21384/i/1600/depositphotos_213843324-stock-photo-holographic-chamber-teleportation-room-terraforming.jpg",
        category: "Транспорт"
    },
    {
        name: "Цифровий кухар CulinaryAI",
        description: "Готує ідеальні страви за вашими рецептами",
        price: 1299,
        image: "https://lux.fm/uploads/media_news/2024/02/65beba3499831349988380.jpg",
        category: "Кухня"
    },
    {
        name: "Квантовий музичний синтезатор",
        description: "Створюйте музику майбутнього",
        price: 899,
        image: "https://img.muzline.ua/image/cache/catalog/product_pictures/2021/11/Yamaha-PSR-F52-5-800x800_wm.jpg",
        category: "Музика"
    },
    {
        name: "Нейромережевий психолог",
        description: "AI-консультант з ментального здоров'я",
        price: 599,
        image: "https://ua.kursoviks.com.ua/thumb/2/rlAnoqxPplUec8frkt49Ag/r/d/kurs-neyromerezhevi-sistemi-v-upravlinni.jpg",
        category: "Здоров'я"
    },
    {
        name: "Космічний телескоп Mini",
        description: "Досліджуйте космос з вашого подвір'я",
        price: 3999,
        image: "https://vixen.com.ua/img/telescopes.jpg",
        category: "Наука"
    },
    {
        name: "Атомний годинник",
        description: "Точність до атомної секунди",
        price: 1999,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/ChipScaleClock2_HR.jpg/1200px-ChipScaleClock2_HR.jpg",
        category: "Гаджети"
    },
    {
        name: "Голографічний pet-companion",
        description: "Віртуальний домашній улюбленець",
        price: 299,
        image: "https://kopeyka-toys.com.ua/_files/goods/interaktivnye-igrushki/kope3135/img1959.jpg",
        category: "Розваги"
    },
    {
        name: "Квантовий очищувач води",
        description: "Миттєве очищення води на молекулярному рівні",
        price: 699,
        image: "https://aquapolis.ua/media/catalog/product/cache/15eb2d87c6a21ed32747b669de11b569/1/3/130_.jpg",
        category: "Здоров'я"
    },
    {
        name: "Нейроінтерфейс для сну",
        description: "Керуйте своїми снами",
        price: 1499,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHskeUr5jLswyTeLGriWtcrx9u0x4nyGYDA&s",
        category: "Здоров'я"
    },
    {
        name: "Голографічний дисплей",
        description: "3D-проекції в повітрі",
        price: 2999,
        image: "https://ua.chariotdisplay-ar.com/Content/uploads/2020486125/202012171430528fb49526e27347a09a98087453f2ecb4.jpg",
        category: "Техніка"
    },
    {
        name: "Біометричний замок",
        description: "Максимальний захист з використанням ДНК",
        price: 599,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTgtgxUmDEUUbAIl7CaCRs81eljkrr8knGm5OEihwzjlTiVXA_lstpK1HxkUCCUAyFpmDy6EUytBHzGqELeaXHRNE2K3Gs5vvjpETwNJosrtjPskzOtgZoJ-Eith_z_2FsUua7g8Lo&usqp=CAc",
        category: "Безпека"
    },
    {
        name: "Розумний одяг",
        description: "Одяг з вбудованим AI та кліматконтролем",
        price: 799,
        image: "https://bizmag.com.ua/wp-content/uploads/2023/12/smart-epants-bizmag-com-ua-%E2%80%93-kopiya.jpg",
        category: "Мода"
    },
    {
        name: "Квантовий детектор брехні",
        description: "99.9% точність визначення правди",
        price: 1999,
        image: "https://images.prom.ua/3947477115_w1280_h640_portativnyj-detektor-lzhi.jpg",
        category: "Безпека"
    },
    {
        name: "Біонічний імунізатор",
        description: "Підсилювач імунної системи",
        price: 1499,
        image: "https://dezmed.com.ua/images/dezcenter/foto0/bt10-indikator.png",
        category: "Здоров'я"
    },
    {
        name: "Нейрофітнес тренажер",
        description: "Тренування мозку та тіла",
        price: 1299,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt4SThybKxWgYPSZDScRwtypS3uIaDmOO6kw&s",
        category: "Спорт"
    },
    {
        name: "Голографічний архітектор",
        description: "Створюйте 3D-моделі будівель у повітрі",
        price: 3999,
        image: "https://ua.chariotdisplay-ar.com/Content/uploads/2023486125/20230106160959c87c29692b42457ca124e9292552175f.png",
        category: "Дизайн"
    },
    {
        name: "Квантовий аналізатор ДНК",
        description: "Миттєвий аналіз генетичного коду",
        price: 4999,
        image: "https://a.allegroimg.com/original/116ebf/f0a7a6314c5c944434895f49fc28/BIOREZONANS-MAGNETYCZNY-KWANTOWY-Analizator-Quantum-PL-Marka-bez-marki",
        category: "Наука"

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
        const shopItem = e.target.closest('.shop-item');
        const itemName = shopItem.querySelector('h3').textContent;
        const itemPrice = parseFloat(shopItem.querySelector('.price').textContent.replace('$', ''));

        confirmMessage.textContent = `Ви підтверджуєте додавання "${itemName}" до кошика?`;
        confirmYes.dataset.name = itemName;
        confirmYes.dataset.price = itemPrice;

        confirmModal.style.display = 'flex';
    }
});

confirmYes.addEventListener('click', () => {
    const name = confirmYes.dataset.name;
    const price = parseFloat(confirmYes.dataset.price);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    confirmModal.style.display = 'none';
    renderCart();
});

confirmNo.addEventListener('click', () => {
    confirmModal.style.display = 'none';
});

function getFormData(form) {
    const name = form.elements['name'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const address = form.elements['address'].value.trim();

    if (!name || !phone || !address) {
        alert('Будь ласка, заповніть всі поля.');
        return null;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert('Будь ласка, введіть коректний номер телефону (10 цифр).');
        return null;
    }

    return { name, phone, address };
}