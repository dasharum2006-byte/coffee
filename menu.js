document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const scrollTopButton = document.getElementById('scrollTop');

    // Создаем оверлей для меню
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    // Функция открытия/закрытия меню
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        // Переключаем состояния
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        navOverlay.classList.toggle('active');

        // Блокируем скролл при открытом меню
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    }

    // Обработчики событий для меню
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.header__nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
            });
        });

        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Закрытие меню при изменении размера окна
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Кнопка "Наверх"
        // Кнопка "Наверх"
    if (scrollTopButton) {
        // Показываем кнопку после скролла
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });

        // Прокрутка к началу страницы
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    
    }

    // Дополнительный feedback при нажатии на кнопки покупки
    const buyButtons = document.querySelectorAll('.product__button, .combo-item__button, .gift__button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Визуальный feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            // Можно добавить уведомление о добавлении в корзину
            const productName = this.closest('.product, .combo-item, .gift')
                ?.querySelector('.product__name, .combo-item__name, .gift__name')
                ?.textContent || 'товар';
            
            console.log(`Добавлен в корзину: ${productName}`);
        });
    });

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами
    const animatedElements = document.querySelectorAll('.feature, .product, .combo-item, .gift');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});
