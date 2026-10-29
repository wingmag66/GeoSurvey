document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Бургер‑меню ---------- */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        nav.classList.toggle('nav-open');
    });

    // Закрыть меню после клика на пункт (моб.)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                burger.classList.remove('open');
            }
        });
    });

    /* ---------- Кнопка «Наверх» ---------- */
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- Плавное появление секций ---------- */
    const observerOptions = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(sec => observer.observe(sec));

    /* ---------- Валидация формы ---------- */
    const form = document.getElementById('lead-form');
    const formMessage = form.querySelector('.form-message');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const nameInput = form.querySelector('#name');
        const phoneInput = form.querySelector('#phone');
        const nameError = nameInput.nextElementSibling;
        const phoneError = phoneInput.nextElementSibling;

        // Очистка ошибок
        nameError.textContent = '';
        phoneError.textContent = '';
        formMessage.textContent = '';

        let valid = true;
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Введите имя';
            valid = false;
        }
        if (!phoneInput.value.trim()) {
            phoneError.textContent = 'Введите телефон';
            valid = false;
        }

        if (valid) {
            formMessage.textContent = 'Отправляем...';
            // Имитируем отправку
            setTimeout(() => {
                formMessage.textContent = 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.';
                form.reset();
            }, 1500);
        }
    });

    /* ---------- Прокрутка к форме по кнопкам ---------- */
    const scrollTriggers = document.querySelectorAll('.scroll-to-contact');
    scrollTriggers.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById('contact');
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
