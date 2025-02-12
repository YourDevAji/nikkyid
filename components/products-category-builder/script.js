import productsCategoryState from '/states/products-category-state.js';

// Add stylesheet dynamically
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/components/products-category-builder/styles.css";
link.type = "text/css";
document.head.appendChild(link);


// Initialize HtmlWidget
const id = "products-category-builder-id";
const container = document.getElementById(id);
const productsCategoryWidget = new HtmlWidget();
let productsCategoryDOM = null;

// Function to render and append product showcase
async function onCreate(state) {
    try {
        if (!container) {
            console.error(`Element with ID "${id}" not found.`);
            return;
        }
        productsCategoryDOM = await productsCategoryWidget.renderFromFile('/components/products-category-builder/index.html', state);
        container.appendChild(productsCategoryDOM.element);
    } catch (error) {
        console.error("Error creating products categories:", error);
    }
}


// Subscribe to store category state
productsCategoryState.subscribe((state) => {
    if(productsCategoryDOM){
        productsCategoryDOM.update(state);
    }
});

await onCreate(productsCategoryState.value);

const productContainer = document.querySelector(".product-container");
let scrollPosition = 0;

setInterval(() => {
    const items = document.querySelectorAll(".product-item");
    const itemWidth = items[0].offsetWidth + 16; // Including gap
    scrollPosition += itemWidth;

    if (scrollPosition >= productContainer.scrollWidth) {
        scrollPosition = 0;
    }

    productContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
    });
}, 3000);









