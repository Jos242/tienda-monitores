let products = [];

        // Function to load the JSON file
        async function loadCatalog() {
            const response = await fetch('catalog.json');
            products = await response.json();
            displayProducts(products);
        }

        // Function to display the products
        function displayProducts(products) {
            const catalog = document.getElementById('catalog');
            catalog.innerHTML = '';
            products.forEach((product, index) => {
                const productElement = document.createElement('div');
                productElement.className = 'col-md-4';
                const firstImage = product.imgsPath && product.imgsPath.length > 0 ? product.imgsPath[0] : 'images/placeholder.jpg';
                productElement.innerHTML = `
                    <div class="card" style="width: 24rem;">
                        <div class="divImg">
                            <img src="${firstImage}" class="card-img-top img-fluid" alt="${product.Modelo}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${product.Marca} ${product.Modelo}</h5>
                            <p class="card-text">
                                <h6>Precio: ₡${product.Precio}</h6>
                                <h6>Tamaño: ${product.Pulgadas}</h6>
                                <h6>Puertos de Video: ${product.Puertos}</h6>
                                <h6>Cantidad Disponible: ${product.Cantidad}</h6>
                            </p>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" onclick="openProductModal(${index})">Ver Información</button>
                        </div>
                    </div>
                `;
                catalog.appendChild(productElement);
            });
        }

        // Function to open product details modal
        function openProductModal(index) {
            const product = products[index];
            const modalTitle = document.getElementById('productModalLabel');
            const carouselInner = document.getElementById('carouselInner');
            const productDetails = document.getElementById('productDetails');

            // Update modal title
            modalTitle.textContent = product.Modelo;

            // Update carousel items
            carouselInner.innerHTML = '';
            product.imgsPath.forEach((imgPath, idx) => {
                const carouselItemClass = idx === 0 ? 'carousel-item active' : 'carousel-item';
                carouselInner.innerHTML += `
                    <div class="${carouselItemClass} car">
                        <img src="${imgPath}" class="d-block w-100" alt="${imgPath}">
                    </div>
                `;
            });

            // Update product details
            productDetails.innerHTML = `
                <h6>Marca: ${product.Marca}</h6>
                <h6>Precio: $${product.Precio}</h6>
                <h6>Puertos de Video: ${product.Puertos}</h6>
                <h6>Tamaño: ${product.Pulgadas}</h6>
                <h6>Cantidad Disponible: ${product.Cantidad}</h6>
                <br>
                
            `;
        }

        // Function to sort the products by price
        function sortCatalog(order) {
            products.sort((a, b) => {
                if (order === 'asc') {
                    return a.Precio - b.Precio;
                } else {
                    return b.Precio - a.Precio;
                }
            });
            displayProducts(products);
        }

        // Load the catalog when the page loads
        window.onload = loadCatalog;