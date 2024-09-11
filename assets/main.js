document.addEventListener('DOMContentLoaded', function() {
    const catalog = document.querySelector('.catalog');
    const cards = document.querySelectorAll('.card');
    const cardWidth = document.querySelector('.card').offsetWidth + 30; // Largeur d'une carte + gap

    const cloneFirst = [...cards].slice(0, 3).map(card => card.cloneNode(true));
    const cloneLast = [...cards].slice(-3).map(card => card.cloneNode(true));

    cloneFirst.forEach(card => catalog.appendChild(card));
    cloneLast.reverse().forEach(card => catalog.insertBefore(card, catalog.firstChild));

    catalog.scrollLeft = cardWidth * 3;

    function scrollRight() {
        catalog.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });

        setTimeout(() => {
            if (catalog.scrollLeft >= catalog.scrollWidth - catalog.clientWidth) {
                catalog.scrollLeft = cardWidth * 3;
            }
        }, 300);
    }

    function scrollLeft() {
        catalog.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });

        setTimeout(() => {
            if (catalog.scrollLeft <= 0) {
                catalog.scrollLeft = catalog.scrollWidth - catalog.clientWidth - cardWidth * 3;
            }
        }, 300);
    }

    document.querySelector('.scroll-right').addEventListener('click', scrollRight);
    document.querySelector('.scroll-left').addEventListener('click', scrollLeft);

    // Détection swipe sur mobile

    let touchStartX = 0;
    let touchEndX = 0;

    const threshold = 50;

    function handleGesture() {
        if (touchEndX < touchStartX - threshold) {
            console.log('Swiped left');
            scrollRight()
        }

        if (touchEndX > touchStartX + threshold) {
            console.log('Swiped right');
            scrollLeft();
        }
    }

    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    document.addEventListener('touchmove', function(event) {
        touchEndX = event.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(event) {
        handleGesture();
    });
});
