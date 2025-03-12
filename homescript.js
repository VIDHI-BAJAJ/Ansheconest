document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const wrapper = document.querySelector('.testimonial-wrapper');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    const totalSlides = slides.length;
    
    // Initialize
    function initialize() {
        setupDots();
        updateSlider();
        
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    }
    
    // Get number of slides to show based on screen width
    function getSlidesPerView() {
        if (window.innerWidth >= 992) return 3; // Desktop
        if (window.innerWidth >= 768) return 2; // Tablet
        return 1; // Mobile
    }
    
    // Handle window resize
    function handleResize() {
        const newSlidesPerView = getSlidesPerView();
        
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            setupDots();
            
            // Ensure current index is valid
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            
            updateSlider();
        }
    }
    
    // Setup navigation dots
    function setupDots() {
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // Calculate number of dots needed
        const dotsCount = Math.max(1, totalSlides - slidesPerView + 1);
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update slider position
    function updateSlider() {
        // Calculate percentage to offset
        const offset = (currentIndex * 100) / slidesPerView;
        wrapper.style.transform = `translateX(-${offset}%)`;
        
        // Update dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    // Set click events for navigation
    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    // Initialize touch events
    let touchStartX = 0;
    let touchEndX = 0;
    
    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    
    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        setTimeout(startAutoSlide, 3000);
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        
        if (touchEndX < touchStartX - swipeThreshold && currentIndex < maxIndex) {
            // Swipe left - next slide
            currentIndex++;
            updateSlider();
        } else if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {
            // Swipe right - previous slide
            currentIndex--;
            updateSlider();
        }
    }
    
    // Auto-slide functionality
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-slide and handle hover events
    startAutoSlide();
    
    const slider = document.querySelector('.testimonial-slider');
    
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize slider
    initialize();
});