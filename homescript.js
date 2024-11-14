const carousel = document.querySelector('.testimonial-carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let scrollAmount = 0;

// Function to scroll to the next testimonial
nextBtn.addEventListener('click', () => {
    const containerWidth = carousel.offsetWidth;
    scrollAmount += containerWidth;
    if (scrollAmount >= carousel.scrollWidth - containerWidth) {
        scrollAmount = 0; // Reset to the first item when reaching the end
    }
    carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// Function to scroll to the previous testimonial
prevBtn.addEventListener('click', () => {
    const containerWidth = carousel.offsetWidth;
    scrollAmount -= containerWidth;
    if (scrollAmount < 0) {
        scrollAmount = carousel.scrollWidth - containerWidth; // Move to the last item when reaching the beginning
    }
    carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

const scrollContent = document.querySelector('.scroll-content');

// Pause animation on hover
scrollContent.addEventListener('mouseover', () => {
    scrollContent.style.animationPlayState = 'paused';
});

// Resume animation on mouse out
scrollContent.addEventListener('mouseout', () => {
    scrollContent.style.animationPlayState = 'running';
});
