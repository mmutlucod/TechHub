(() => {
    if (window.location.pathname !== '/') {
        console.log('wrong page');
        return;
    }

    let currentScroll = 0;
    const cardWidth = 265;

    const init = () => {
        buildHTML();
        buildCSS();
        loadData();
        setEvents();
    };

    const buildHTML = () => {
        const existing = document.querySelector('.main-carousel-wrapper');
        if (existing) existing.remove();

        const html = `
            <div class="main-carousel-wrapper">
                <div class="carousel-header-area">
                    <h2 class="carousel-header-title">Beğenebileceğinizi Düşündüklerimiz</h2>
                </div>
                <div class="carousel-body-area">
                    <div class="carousel-container">
                        <div class="carousel-track" id="carouselTrack"></div>
                    </div>
                </div>
                <button class="carousel-control-btn carousel-prev-btn"</button>
                <button class="carousel-control-btn carousel-next-btn" </button>
            </div>
        `;
        
        const heroSection = document.querySelector('.hero.banner');
        if (heroSection) heroSection.insertAdjacentHTML('afterend', html);
    };

    const buildCSS = () => {
        const css = `
            .main-carousel-wrapper {
                width: 100%;
                max-width: 1350px;
                margin: 20px auto;
                position: relative;
                font-family: system-ui, -apple-system, sans-serif;
            }
            
            .carousel-header-area {
                background: #fef6eb;
                padding: 20px;
                border-radius: 20px 20px 0 0;
            }
            
            .carousel-header-title {
                color: #f28e00;
                font-size: 24px;
                font-weight: 600;
                margin: 0;
            }
            
            .carousel-body-area {
                background: #fff;
                border-radius: 0 0 20px 20px;
                padding: 25px 20px;
                position: relative;
                overflow: hidden;
            }
            
            .carousel-container {
                overflow: hidden;
            }
            
            .carousel-track {
                display: flex;
                gap: 15px;
                transition: transform 0.3s ease;
                padding: 10px 0;
            }
            
            .product-card {
                min-width: 250px;
                width: 250px;
                min-height: 520px;
                background: #fff;
                border: 1px solid #f0f0f0;
                border-radius: 12px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                flex: 0 0 auto;
            }
            
            .product-card::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 12px;
                border: 0 solid #f28e00;
                transition: border-width 0.2s ease;
                pointer-events: none;
                z-index: 1;
            }
            
            .product-card:hover::after {
                border-width: 3px;
            }
            
            .product-link {
                text-decoration: none;
                color: inherit;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            
            .product-image-container {
                height: 220px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 15px;
            }
            
            .product-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            
            .favorite-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 45px;
                height: 45px;
                background: white;
                border: 1px solid transparent;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                z-index: 10;
                transition: border 0.2s;
            }
            
            .favorite-button:hover {
                border-color: #f28e00;
            }
            
            .favorite-button svg {
                width: 25px;
                height: 25px;
                fill: transparent;
                stroke: #f28e00;
                stroke-width: 2px;
            }
            
            .favorite-button.favorited svg {
                fill: #f28e00;
            }
            
            .product-info {
                padding: 18px;
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 300px;
            }
            
            .product-brand-name {
                margin-bottom: 15px;
                min-height: 65px;
                max-height: 65px;
                line-height: 1.4;
                padding-bottom: 8px;
                overflow: hidden;
            }
            
            .product-brand {
                color: #333;
                font-size: 15px;
                font-weight: 600;
            }
            
            .product-name {
                color: #555;
                font-size: 14px;
            }
            
            .product-rating {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 18px;
                height: 25px;
            }
            
            .rating-stars {
                display: flex;
                gap: 8px;
            }
            
            .rating-star {
                width: 16px;
                height: 16px;
                color: #fed100;
                font-size: 16px;
            }
            
            .rating-star.empty {
                color: #e0e0e0;
            }
            
            .rating-count {
                color: #777;
                font-size: 13px;
                margin: 0;
            }
            
            .product-price-container {
                margin-top: auto;
                padding-top: 10px;
                min-height: 100px;
            }
            
            .product-price {
                margin-bottom: 35px;
            }
            
            .price-discount {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 6px;
                height: 22px;
            }
            
            .price-old {
                color: #999;
                font-size: 15px;
                text-decoration: line-through;
            }
            
            .price-discount-percent {
                color: #00a365;
                font-size: 15px;
                font-weight: 700;
            }
            
            .price-current {
                color: #7d7d7d;
                font-size: 20px;
                font-weight: 600;
                display: block;
                margin-bottom: 12px;
                height: 26px;
            }
            
            .price-current.with-discount {
                color: #00a365;
            }
            
            .add-to-cart {
                width: 100%;
                background: #fef6eb;
                color: #f28e00;
                border: none;
                padding: 14px;
                border-radius: 30px;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .add-to-cart:hover {
                background: #f28e00;
                color: white;
            }
            
            .carousel-control-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background: #fef6eb;
                border: 1px solid transparent;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 18px;
                color: #f28e00;
                z-index: 10;
                transition: all 0.3s;
                outline: none;
            }
            
            .carousel-control-btn:hover {
                background: #fff;
                border-color: #f28e00;
            }
            
            .carousel-prev-btn {
                left: -65px;
            }
            
            .carousel-next-btn {
                right: -65px;
            }
            
            @media (max-width: 1450px) {
                .carousel-prev-btn {
                    left: -60px;
                }
                
                .carousel-next-btn {
                    right: -60px;
                }
            }
            
            @media (max-width: 1300px) {
                .product-card {
                    min-width: 235px;
                    width: 235px;
                }
            }
            
            @media (max-width: 1200px) {
                .product-card {
                    min-width: 220px;
                    width: 220px;
                }
                
                .product-image-container {
                    height: 200px;
                }
            }
            
            @media (max-width: 992px) {
                .product-card {
                    min-width: 200px;
                    width: 200px;
                }
                
                .product-image-container {
                    height: 180px;
                }
            }
            
            @media (max-width: 768px) {
                .carousel-header-area {
                    padding: 15px;
                }
                
                .carousel-header-title {
                    font-size: 20px;
                }
                
                .carousel-body-area {
                    padding: 15px;
                }
                
                .product-card {
                    min-width: 180px;
                    width: 180px;
                }
                
                .product-image-container {
                    height: 170px;
                }
                
                .product-info {
                    padding: 15px;
                    height: 280px;
                }
                
                .product-brand, .product-name {
                    font-size: 13px;
                }
                
                .carousel-control-btn {
                    width: 40px;
                    height: 40px;
                    font-size: 16px;
                }
                
                .carousel-prev-btn {
                    left: -45px;
                }
                
                .carousel-next-btn {
                    right: -45px;
                }
            }
            
            @media (max-width: 480px) {
                .carousel-prev-btn,
                .carousel-next-btn {
                    display: none;
                }
                
                .product-card {
                    min-width: 160px;
                    width: 160px;
                }
                
                .product-image-container {
                    height: 150px;
                }
                
                .product-info {
                    padding: 12px;
                    height: 260px;
                }
                
                .product-brand, .product-name {
                    font-size: 12px;
                }
                
                .price-current {
                    font-size: 18px;
                }
            }
        `;

        document.head.appendChild(Object.assign(document.createElement('style'), { textContent: css }));
    };

    const loadData = () => {
        const favorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
        const cached = localStorage.getItem('productData');
        
        if (cached) {
            renderProducts(JSON.parse(cached), favorites);
        } else {
            fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json')
                .then(r => r.json())
                .then(products => {
                    localStorage.setItem('productData', JSON.stringify(products));
                    renderProducts(products, favorites);
                })
                .catch(e => console.error('Ürün yüklenemedi:', e));
        }
    };

    const renderProducts = (products, favorites) => {
        const track = document.getElementById('carouselTrack');
        
        products.forEach(product => {
            const isFavorite = favorites.includes(product.id);
            const hasDiscount = product.price < product.original_price;
            const discountPercent = hasDiscount ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;
            const rating = Math.floor(Math.random() * 3) + 3;
            const reviewCount = Math.floor(Math.random() * 500) + 10;
            
            track.insertAdjacentHTML('beforeend', `
                <div class="product-card" data-id="${product.id}" data-url="${product.url}">
                    <a class="product-link" href="${product.url}" target="_blank">
                        <div class="product-image-container">
                            <img class="product-image" src="${product.img}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <div class="product-brand-name">
                                <span class="product-brand">${product.brand}</span> - <span class="product-name">${product.name}</span>
                            </div>
                            <div class="product-rating">
                                <div class="rating-stars">
                                    ${Array.from({length: 5}, (_, i) => `<i class="rating-star ${i < rating ? 'fas fa-star' : 'far fa-star empty'}"></i>`).join('')}
                                </div>
                                <span class="rating-count">(${reviewCount})</span>
                            </div>
                            <div class="product-price-container">
                                <div class="product-price">
                                    <div class="price-discount">
                                        ${hasDiscount ? `<span class="price-old">${product.original_price.toFixed(2).replace('.', ',')} TL</span><span class="price-discount-percent">%${discountPercent}</span>` : ''}
                                    </div>
                                    <span class="price-current ${hasDiscount ? 'with-discount' : ''}">${product.price.toFixed(2).replace('.', ',')} TL</span>
                                </div>
                                <button class="add-to-cart" data-id="${product.id}">Sepete Ekle</button>
                            </div>
                        </div>
                    </a>
                    <button class="favorite-button ${isFavorite ? 'favorited' : ''}" data-id="${product.id}">
                        <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                </div>
            `);
        });
    };

    const setEvents = () => {
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.querySelector('.carousel-prev-btn');
        const nextBtn = document.querySelector('.carousel-next-btn');
        
        track.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            
            if (e.target.closest('.favorite-button')) {
                e.stopPropagation();
                const btn = e.target.closest('.favorite-button');
                const id = parseInt(btn.dataset.id);
                let favs = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
                
                if (favs.includes(id)) {
                    favs = favs.filter(f => f !== id);
                    btn.classList.remove('favorited');
                } else {
                    favs.push(id);
                    btn.classList.add('favorited');
                }
                
                localStorage.setItem('favoriteProducts', JSON.stringify(favs));
            } else if (e.target.closest('.add-to-cart')) {
                e.stopPropagation();
            } else if (card) {
                window.open(card.dataset.url, '_blank');
            }
        });
        
        prevBtn.addEventListener('click', () => {
            currentScroll = Math.max(0, currentScroll - cardWidth);
            track.style.transform = `translateX(-${currentScroll}px)`;
        });
        
        nextBtn.addEventListener('click', () => {
            const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
            currentScroll = Math.min(maxScroll, currentScroll + cardWidth);
            track.style.transform = `translateX(-${currentScroll}px)`;
        });
        
        let startX = 0, isDragging = false;
        
        track.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        track.addEventListener('touchmove', e => {
            if (isDragging) e.preventDefault();
        });
        
        track.addEventListener('touchend', e => {
            if (!isDragging) return;
            
            const diffX = startX - e.changedTouches[0].clientX;
            if (Math.abs(diffX) > 50) {
                (diffX > 0 ? nextBtn : prevBtn).click();
            }
            isDragging = false;
        });
    };

    init();
})();