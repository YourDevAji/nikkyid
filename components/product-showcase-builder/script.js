import productShowcaseState from '/states/product-showcase-state.js';

// Add stylesheet dynamically
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/components/product-showcase-builder/styles.css";
link.type = "text/css";
document.head.appendChild(link);


// Initialize HtmlWidget
const id = "product-showcase-id";
const container = document.getElementById(id);
const productShowcaseWidget = new HtmlWidget();
let productShowcaseDOM = null;

// Function to render and append product showcase
async function onCreate(state) {
    try {
        if (!container) {
            console.error(`Element with ID "${id}" not found.`);
            return;
        }
        productShowcaseDOM = await productShowcaseWidget.renderFromFile('/components/product-showcase-builder/index.html', state);
        container.appendChild(productShowcaseDOM.element);
    } catch (error) {
        console.error("Error creating product showcase:", error);
    }
}

// Subscribe to product showcase state
productShowcaseState.subscribe((state) => {
    if(productShowcaseDOM){
        productShowcaseDOM.update(state);
    }
});




await onCreate(productShowcaseState.value);


let autoScrollTimer;
const autoScrollInterval = 5000; // Time interval for auto-scroll (in milliseconds)

// Draggable Gestures
let touchStartX = 0, touchMoveX = 0, touchEndX = 0, isDragging = false;
const threshold = window.innerWidth * 0.4; // 40% screen width
const swipeContainer = document.querySelector(".swiper-container");
const wrapper = document.querySelector(".swiper-wrapper");
const slides = document.querySelectorAll(".swiper-slide");

// Event listener for touch and pointer events
swipeContainer.addEventListener("touchstart", handleTouchStart);
swipeContainer.addEventListener("touchmove", handleTouchMove);
swipeContainer.addEventListener("touchend", handleTouchEnd);
swipeContainer.addEventListener("pointerdown", handleTouchStart);
swipeContainer.addEventListener("pointermove", handleTouchMove);
swipeContainer.addEventListener("pointerup", handleTouchEnd);


// Event Listeners for Buttons
document.querySelector(".swiper-button-next").addEventListener("click", () => navigateSlide(1));
document.querySelector(".swiper-button-prev").addEventListener("click", () => navigateSlide(-1));

// Start auto-scrolling
function startAutoScroll() {
    stopAutoScroll();
    autoScrollTimer = setInterval(() => {
        navigateSlide(1); // Move to next slide automatically
    }, autoScrollInterval);
}

// Stop auto-scrolling
function stopAutoScroll() {
    if(autoScrollTimer){clearInterval(autoScrollTimer);}
}

// Handle touch/drag interaction (pause auto-scroll)
function handleUserInteraction() {
    stopAutoScroll();
}

// Handle interaction end (resume auto-scroll)
function handleUserInteractionEnd() {
    startAutoScroll();
}

// Event listener for user interactions (to pause auto-scroll)
swipeContainer.addEventListener("touchstart", handleUserInteraction);
swipeContainer.addEventListener("pointerdown", handleUserInteraction);
document.querySelector(".swiper-button-next").addEventListener("click", handleUserInteraction);
document.querySelector(".swiper-button-prev").addEventListener("click", handleUserInteraction);

// Event listener to resume auto-scroll after user interaction ends
swipeContainer.addEventListener("touchend", handleUserInteractionEnd);
swipeContainer.addEventListener("pointerup", handleUserInteractionEnd);
document.querySelector(".swiper-button-next").addEventListener("click", handleUserInteractionEnd);
document.querySelector(".swiper-button-prev").addEventListener("click", handleUserInteractionEnd);




productShowcaseDOM.handleDotClick = function (event) {
    stopAutoScroll(); // Pause auto-scroll
    const index = parseInt(event.target.getAttribute("data-index"), 10);
    let prevState = productShowcaseState.value.products;
    let activeIndex = prevState.findIndex(p => p.active);

    if (index === activeIndex) return; // No need to update if already active

    let updatedProducts = prevState.map((p, i) => ({
        ...p,
        active: i === index
    }));

    productShowcaseState.update({ products: updatedProducts }, false);
    updateSlidePosition();
    startAutoScroll(); // Resume auto-scroll after the click
};



document.body.addEventListener("click", (event) => {
    const target = event.target.closest("[data-event]");
    if (target) {
        const eventName = target.getAttribute("data-event");
        if (productShowcaseDOM[eventName]) {
            productShowcaseDOM[eventName](event);
        }
    }
});


function updateSlidePosition() {
    const slides = document.querySelectorAll(".swiper-slide");
    const dots = document.querySelectorAll(".swiper-dot");

    const activeIndex = productShowcaseState.value.products.findIndex(p => p.active);


    dots.forEach((dot, index) => {
        dot.setAttribute("data-swiper-dot-active", index === activeIndex ? "true" : "false");
    });

    const wrapper = document.querySelector(".swiper-wrapper");
    wrapper.style.transform = `translateX(-${activeIndex * 100}%)`;
}


function navigateSlide(direction) {
    let prevState = productShowcaseState.value;
    let activeIndex = prevState.products.findIndex(p => p.active);
    let nextIndex = (activeIndex + direction + prevState.products.length) % prevState.products.length;

    let updatedProducts = prevState.products.map((p, i) => ({
        ...p,
        active: i === nextIndex
    }));

    productShowcaseState.update({ products: updatedProducts }, false);
    updateSlidePosition();

}




// Handle touch start or pointer down
function handleTouchStart(e) {
    touchStartX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    wrapper.style.transition = "none"; // Disable smooth transition while dragging
    stopAutoScroll(); // Pause auto-scroll during drag
}

// Handle touch move or pointer move
function handleTouchMove(e) {
    if (!isDragging) return;

    touchMoveX = e.touches ? e.touches[0].clientX : e.clientX;
    let deltaX = touchMoveX - touchStartX;
    const activeIndex = productShowcaseState?.value?.products?.findIndex(p => p.active) ?? 0;

    // Prevent overscrolling: slow down at the ends
    if ((activeIndex === 0 && deltaX > 0) || (activeIndex === slides.length - 1 && deltaX < 0)) {
        deltaX *= 0.3; // Slow down the overscroll effect
    }

    // Move slides while dragging
    wrapper.style.transform = `translateX(calc(${-activeIndex * 100}% + ${deltaX}px))`;
}

// Handle touch end or pointer up
function handleTouchEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    touchEndX = e.changedTouches?.[0]?.clientX || e.clientX;
    const deltaX = touchEndX - touchStartX;
    const activeIndex = productShowcaseState?.value?.products?.findIndex(p => p.active) ?? 0;

    wrapper.style.transition = "transform 0.3s ease-out"; // Smooth transition back to position

    // Check if the drag exceeds the threshold
    if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0 && activeIndex < slides.length - 1) {
            navigateSlide(1); // Move to next slide
        } else if (deltaX > 0 && activeIndex > 0) {
            navigateSlide(-1); // Move to previous slide
        }
    } else {
        updateSlidePosition(); // Reset if not enough drag
    }

    // Prevent being stuck if overscrolled: Reset position if still at the end
    if (activeIndex === 0 || activeIndex === slides.length - 1) {
        updateSlidePosition(); // Reset to current active slide
    }
    startAutoScroll(); // Resume auto-scroll after drag ends

}




// Initialize slides
//updateSlidePosition();

// Start auto-scrolling when the page loads
startAutoScroll();








