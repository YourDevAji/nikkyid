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


await onCreate(productShowcaseState.value);

let autoScrolling = productShowcaseState.value.canAutoScrollInterval;
let autoScrollInterval = productShowcaseState.value.autoScrollInterval; // Auto-scroll interval in milliseconds

// Subscribe to product showcase state
productShowcaseState.subscribe((state) => {
    if(productShowcaseDOM){
        productShowcaseDOM.update(state);
    }

    //  Settings
    //  Auto Scroll Interval
    if(state.autoScrollInterval  != autoScrollInterval){
        stopAutoScroll();
        autoScrollInterval = state.autoScrollInterval;
        startAutoScroll();
    }
    //    Auto Scroll Enabled
    if(state.canAutoScrollInterval != autoScrolling){
        autoScrolling = state.canAutoScrollInterval;
        startAutoScroll();
    }

});


let autoScrollTimer;

// Draggable Gestures
let isDragging = false, verticalDetected = false, startX = 0, startY = 0, deltaX = 0, deltaY = 0, isHorizontal = null;
let isTouch = false; // To differentiate between touch and mouse events
const threshold = Math.min(150, window.innerWidth * 0.2); // 20% of screen width, max 150px

const swipeContainer = document.querySelector(".swiper-container");
const wrapper = document.querySelector(".swiper-wrapper");
const slides = document.querySelectorAll(".swiper-slide");

const nextButton = document.querySelector(".swiper-button-next");
const prevButton = document.querySelector(".swiper-button-prev");

if (!swipeContainer || !wrapper || !slides.length) {
    console.error("Swiper elements not found.");
} else {
    // Attach event listeners if elements exist
    swipeContainer.addEventListener("touchstart", handleTouchStart);
    swipeContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
    swipeContainer.addEventListener("touchend", handleTouchEnd);
    wrapper.addEventListener("mousedown", handleTouchStart);
    wrapper.addEventListener("mousemove", handleTouchMove);
    wrapper.addEventListener("mouseup", handleTouchEnd);

    nextButton?.addEventListener("click", () => navigateSlide(1));
    prevButton?.addEventListener("click", () => navigateSlide(-1));

    startAutoScroll(); // Start auto-scroll on load
}

// Start Auto-Scroll
function startAutoScroll() {
    if(!autoScrolling)return;
    stopAutoScroll();
    autoScrollTimer = setInterval(() => navigateSlide(1), autoScrollInterval);
}

// Stop Auto-Scroll
function stopAutoScroll() {
    clearInterval(autoScrollTimer);
}

// User interaction handlers (pause & resume auto-scroll)
function handleUserInteraction() {
    stopAutoScroll();
}
function handleUserInteractionEnd() {
    startAutoScroll();
}

// Attach user interaction listeners
[nextButton, prevButton, swipeContainer].forEach((el) => {
    el?.addEventListener("touchstart", handleUserInteraction);
    el?.addEventListener("pointerdown", handleUserInteraction);
    el?.addEventListener("touchend", handleUserInteractionEnd);
    el?.addEventListener("pointerup", handleUserInteractionEnd);
});

// Handle Drag Start
function handleTouchStart(e) {
    stopAutoScroll();
    swipeContainer.classList.add("dragging"); // Disable scrolling

    if (e.type === "touchstart") {
        isTouch = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    } else if (e.type === "mousedown" && e.button === 0) {
        isTouch = false;
        startX = e.clientX;
        startY = e.clientY;
    } else {
        return;
    }

    isDragging = true;
    isHorizontal = null;
    verticalDetected = false;
    deltaX = 0;
    deltaY = 0;
    wrapper.style.transition = "none";
}

// Handle Drag Move
function handleTouchMove(e) {

    if (!isDragging && e.type === "mousemove") return;

    let activeIndex = productShowcaseState.value.products.findIndex(p => p.active);

    let currentX, currentY;
    if (isTouch) {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
    } else {
        currentX = e.clientX;
        currentY = e.clientY;
    }

    deltaX = currentX - startX;
    deltaY = currentY - startY;


    // Lock swipe direction after slight movement (threshold of 10px)
    if (isHorizontal === null) {
        if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
            isHorizontal = Math.abs(deltaX) > Math.abs(deltaY); // Lock direction
        }
    }

    if (isHorizontal === false) {
        // If locked as vertical, allow normal scrolling
        isDragging = false;
        swipeContainer.classList.remove("dragging");
        if(!verticalDetected)wrapper.style.transform = `translateX(calc(${-activeIndex * 100}%))`;
        verticalDetected = true;
        return;
    }

    if (isHorizontal && e.cancelable) {
        e.preventDefault(); // Prevent vertical scroll while swiping horizontally
    }

    // Slow down overscroll at edges
    if ((activeIndex === 0 && deltaX > 0) || (activeIndex === slides.length - 1 && deltaX < 0)) {
        deltaX *= 0.3; // Reduce movement
    }

    wrapper.style.transform = `translateX(calc(${-activeIndex * 100}% + ${deltaX}px))`;
}

// Handle Drag End
function handleTouchEnd(e) {
    swipeContainer.classList.remove("dragging"); // Re-enable scrolling
    if (!isDragging || isHorizontal === false) return;
    isDragging = false;
    isHorizontal = false;
    verticalDetected = false;

    wrapper.style.transition = "transform 0.3s ease-out";


    let activeIndex = productShowcaseState.value.products.findIndex(p => p.active);
    if((activeIndex === 0 && deltaX > 0) || (activeIndex == (slides.length - 1) && deltaX < 0) ){
        wrapper.style.transform = `translateX(calc(${-activeIndex * 100}%))`;
        return;
    }

    if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0 && activeIndex < slides.length - 1) {
            navigateSlide(1);
        } else if (deltaX > 0 && activeIndex > 0) {
            navigateSlide(-1);
        }
    } else {
        updateSlidePosition();
    }

    startAutoScroll();
}

// Update Slide Position
function updateSlidePosition() {
    const activeIndex = productShowcaseState.value.products.findIndex(p => p.active) || 0;
    document.querySelectorAll(".swiper-dot").forEach((dot, index) => {
        dot.setAttribute("data-swiper-dot-active", index === activeIndex ? "true" : "false");
    });
    wrapper.style.transform = `translateX(-${activeIndex * 100}%)`;
}

// Navigate Slides
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


// Start auto-scrolling when the page loads
startAutoScroll();









