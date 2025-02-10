import authState from '/states/authentication-state.js';

// Add stylesheet dynamically
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/components/header-builder/styles.css";
link.type = "text/css";
document.head.appendChild(link);

// Initialize HtmlWidget
const id = "header-builder-id";
const container = document.getElementById(id);
const headerWidget = new HtmlWidget();
let headerDOM = null;

// Function to render and append header
async function onCreate(state) {
    try {
        if (!container) {
            console.error(`Element with ID "${id}" not found.`);
            return;
        }
        headerDOM = await headerWidget.renderFromFile('/components/header-builder/index.html', state);
        container.appendChild(headerDOM.element);
    } catch (error) {
        console.error("Error creating header:", error);
    }
}

// Subscribe to auth state
authState.subscribe((state) => {
    if(headerDOM){
        headerDOM.update(state);
        updateCartCount(state.cart.length);
    }
});


await onCreate(authState.value);


const searchInput = document.getElementById("wide-view-search");
const clearIcon = document.getElementById("clear-icon");
const searchContainer = document.querySelector(".wide-view-search-container");

searchInput.addEventListener("input", function () {
    if (searchInput.value.length > 0) {
        clearIcon.classList.remove("clear-icon");
    } else {
        clearIcon.classList.add("clear-icon");
    }
});

clearIcon.addEventListener("click", function () {
    searchInput.value = "";
    clearIcon.classList.add("clear-icon");
    searchInput.blur();
});

const cartBubble = document.getElementById("cart-bubble");
const cartContainer = document.querySelector(".cart-container");

function updateCartCount(count) {
    cartBubble.textContent = count;

    if (count > 0) {
        cartContainer.classList.add("has-items");
    } else {
        cartContainer.classList.remove("has-items");
    }
}
updateCartCount(authState.value.cart.length);











