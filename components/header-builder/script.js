import authState from '/states/authentication-state.js';

// Add stylesheet dynamically
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/components/header-builder/styles.css";
link.type = "text/css";
document.head.appendChild(link);

// Initialize HtmlWidget
const id = "header-id";
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
    }
});

onCreate(authState.value);





