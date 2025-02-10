import storeCategoryState from '/states/store-category-state.js';

// Add stylesheet dynamically
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/components/store-category-builder/styles.css";
link.type = "text/css";
document.head.appendChild(link);


// Initialize HtmlWidget
const id = "store-category-builder-id";
const container = document.getElementById(id);
const storeCategoryWidget = new HtmlWidget();
let storeCategoryDOM = null;

// Function to render and append product showcase
async function onCreate(state) {
    try {
        if (!container) {
            console.error(`Element with ID "${id}" not found.`);
            return;
        }
        storeCategoryDOM = await storeCategoryWidget.renderFromFile('/components/store-category-builder/index.html', state);
        container.appendChild(storeCategoryDOM.element);
    } catch (error) {
        console.error("Error creating store categories:", error);
    }
}




// Subscribe to store category state
storeCategoryState.subscribe((state) => {
    if(storeCategoryDOM){
        storeCategoryDOM.update(state);
    }
});


await onCreate(storeCategoryState.value);











