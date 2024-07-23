document.addEventListener('DOMContentLoaded', () => {
    const cars = [
        { id: 1, name: 'RS6', price: 126895, brand: 'Audi' },
        { id: 2, name: 'RS7', price: 126895, brand: 'Audi' },
        { id: 3, name: 'R8', price: 158600, brand: 'Audi' },
        { id: 4, name: 'M3', price: 74600, brand: 'BMW' },
        { id: 5, name: 'M5 Competition', price: 108900, brand: 'BMW' },
        { id: 6, name: 'M8', price: 134100, brand: 'BMW' },
        { id: 7, name: 'Chiron', price: 3000000, brand: 'Bugatti' },
        { id: 8, name: '812 Competizione', price: 601570, brand: 'Ferrari' },
        { id: 9, name: 'SF90 Stradale', price: 625000, brand: 'Ferrari' },
        { id: 10, name: 'F8 Tributo', price: 276550, brand: 'Ferrari' },
        { id: 11, name: 'LaFerrari', price: 1400000, brand: 'Ferrari' }
    ];


    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        if (cartItemsElement && totalPriceElement) {
            cartItemsElement.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price}$`;

                const removeButton = document.createElement('button');
                removeButton.textContent = '❌';
                removeButton.style.marginLeft = '10px';
                removeButton.addEventListener('click', () => {
                    cart.splice(index, 1); // Supprime l'élément du panier
                    updateCart(); // Met à jour l'affichage et le localStorage
                });

                li.appendChild(removeButton);
                cartItemsElement.appendChild(li);

                total += item.price;
            });
            totalPriceElement.textContent = `${total}$`;
        }
        if (cartCountElement) {
            cartCountElement.textContent = cart.length; // Met à jour le nombre d'articles dans le panier
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Appel immédiat pour mettre à jour le compteur de panier au chargement de la page
    updateCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const carId = parseInt(event.target.parentElement.dataset.id);
            const car = cars.find(c => c.id === carId);
            cart.push(car);
            updateCart(); // Met à jour le panier après avoir ajouté un article
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        document.getElementById('paymentForm').style.display = 'block';
    });

    document.getElementById('paymentForm').addEventListener('submit', (event) => {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let cardNumber = document.getElementById('cardNumber').value;
        let expiryDate = document.getElementById('expiryDate').value;
        let cvv = document.getElementById('cvv').value;

        if (name && email && cardNumber && expiryDate && cvv) {
            alert('Paiement réussi ! Merci ' + name + '!');
            cart = [];
            updateCart(); // Met à jour le panier après le paiement
            document.getElementById('paymentForm').style.display = 'none';
        } else {
            alert('Veuillez remplir tous les champs correctement.');
        }
    });
});


window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.cookieblock .toggle-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cookieBlock = this.parentElement;
            const content = cookieBlock.querySelectorAll('p, ul');

            let isHidden = Array.from(content).every(el => el.style.display === 'none' || getComputedStyle(el).display === 'none');

            content.forEach(el => {
                el.style.display = isHidden ? 'block' : 'none';
            });

            this.classList.toggle('active', isHidden);
            this.textContent = isHidden ? '×' : '+';
        });
    });
});
//index

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('index-background-video');

    video.addEventListener('loadeddata', function() {
        video.style.opacity = 1;
    });

    video.addEventListener('timeupdate', function() {
        if (video.currentTime >= video.duration - 1) {
            fadeOut(video, function() {
                video.currentTime = 0;
                fadeIn(video);
            });
        }
    });

    function fadeOut(element, callback) {
        element.style.transition = 'opacity 1s';
        element.style.opacity = 0;
        setTimeout(callback, 1000); // Durée de la transition
    }

    function fadeIn(element) {
        element.style.transition = 'opacity 1s';
        element.style.opacity = 1;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.redeem-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('redeemModal').style.display = 'flex';
        });
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('redeemModal').style.display = 'none';
    });

    const hiddenButton = document.getElementById('hiddenButton');
    const modalContent = document.querySelector('.modal-content');

    const positions = [
        { left: '50%', top: '50%' },
        { left: 'calc(50% - 50px)', top: 'calc(50% - 50px)' },
        { left: 'calc(50% + 50px)', top: 'calc(50% - 50px)' },
        { left: 'calc(50% + 50px)', top: 'calc(50% + 50px)' },
        { left: 'calc(50% - 50px)', top: 'calc(50% + 50px)' }
    ];

    let currentPos = 0;

    hiddenButton.style.left = positions[currentPos].left;
    hiddenButton.style.top = positions[currentPos].top;
    hiddenButton.style.transform = 'translate(-50%, -50%)';

    modalContent.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX - modalContent.offsetLeft;
        const mouseY = event.clientY - modalContent.offsetTop;
        const buttonX = hiddenButton.offsetLeft + hiddenButton.offsetWidth / 2;
        const buttonY = hiddenButton.offsetTop + hiddenButton.offsetHeight / 2;
        const distanceX = mouseX - buttonX;
        const distanceY = mouseY - buttonY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 100) {
            currentPos = (currentPos + 1) % positions.length;
            hiddenButton.style.left = positions[currentPos].left;
            hiddenButton.style.top = positions[currentPos].top;
        }
    });

    hiddenButton.addEventListener('click', () => {
        alert('Erreure réseaux veuillez réessayer');
    });
});

//filtre

document.addEventListener('DOMContentLoaded', () => {
    // Cibler l'icône de filtre et le menu de filtres
    const filterIcon = document.getElementById('filter-icon');
    const filtersMenu = document.getElementById('filters');

    // Cacher le menu de filtres au chargement de la page
    filtersMenu.style.display = 'none';

    // Ajouter un gestionnaire d'événements pour le clic sur l'icône de filtre
    filterIcon.addEventListener('click', () => {
        // Toggle pour afficher ou masquer le menu de filtres
        if (filtersMenu.style.display === 'none') {
            filtersMenu.style.display = 'block';
        } else {
            filtersMenu.style.display = 'none';
        }
    });

    // Ajouter un gestionnaire d'événements pour le bouton "Appliquer les filtres"
    document.getElementById('apply-filters').addEventListener('click', () => {
        const brandFilter = document.getElementById('brand-filter').value;

        // Parcourir chaque section de marque
        document.querySelectorAll('.marque').forEach(brandSection => {
            let hasVisibleCars = false; // Pour suivre si une voiture est visible dans cette section

            // Parcourir chaque voiture dans la section de la marque
            brandSection.querySelectorAll('.voiture').forEach(carElement => {
                const carBrand = carElement.closest('.marque').getAttribute('id');

                let brandMatch = brandFilter === '' || carBrand === brandFilter;

                if (brandMatch) {
                    carElement.style.display = ''; // Afficher la voiture
                    hasVisibleCars = true; // Une voiture correspondante a été trouvée
                } else {
                    carElement.style.display = 'none'; // Masquer la voiture
                }
            });

            // Afficher ou masquer la section de marque en fonction de la visibilité des voitures
            if (hasVisibleCars) {
                brandSection.style.display = ''; // Afficher la section de marque
            } else {
                brandSection.style.display = 'none'; // Masquer la section de marque
            }
        });

        // Masquer le menu de filtres après avoir appliqué les filtres
        filtersMenu.style.display = 'none';
    });
});
