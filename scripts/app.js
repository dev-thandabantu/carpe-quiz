const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");
let selectedProductType = null;
const selectedBrandDisplay = document.getElementById("selected-brand-display");
const selectedBrandName = document.getElementById("selected-brand-name");
const screens = document.querySelectorAll("section");
const progressSteps = document.querySelectorAll(".progress-step");
const nextButtons = document.querySelectorAll("#next-button");
const backButtons = document.querySelectorAll("#back-button");
const continueButton = document.getElementById("continue-button");
const brandLogos = document.querySelectorAll("[data-brand]");
let currentScreen = 1;
let selectedBrand = null;

const brands = {
    "Dove": {
        logo: "./assets/images/dove.png",
        products: [
            { name: "Invisible Solid Stick", image: "./assets/images/products/invisible-solid.png" },
            { name: "Invisible Cream", image: "./assets/images/products/invisible-solid.png", description: "(Whole Body)" },
            { name: "Dry Spray", image: "./assets/images/products/invisible-solid.png" }
        ]
    },
    "Old Spice": {
        logo: "./assets/images/old-spice.png",
        products: [
            { name: "Classic Stick", image: "./assets/images/products/invisible-solid.png" },
            { name: "Spray", image: "./assets/images/products/invisible-solid.png" }
        ]
    },
    "Secret": {
        logo: "./assets/images/secret.png",
        products: [
            { name: "Invisible Solid", image: "./assets/images/products/invisible-solid.png" }
        ]
    },
    "Degree": {
        logo: "./assets/images/degree.png",
        products: [
            { name: "Dry Spray", image: "./assets/images/products/invisible-solid.png" }
        ]
    },
    "Native": {
        logo: "./assets/images/native.webp",
        products: [
            { name: "Coconut & Vanilla", image: "./assets/images/products/invisible-solid.png" },
            { name: "Lavender & Rose", image: "./assets/images/products/invisible-solid.png" }
        ]
    },
    "Axe": {
        logo: "./assets/images/axe.jpeg",
        products: [
            { name: "Phoenix", image: "./assets/images/products/invisible-solid.png" },
            { name: "Apollo", image: "./assets/images/products/invisible-solid.png" }
        ]
    },
    "Lume": {
        logo: "./assets/images/lume.png",
        products: [
            { name: "Unscented", image: "./assets/images/products/unscented.png" },
            { name: "Coconut Crush", image: "./assets/images/products/invisible-solid.png" }
        ]
    },
    "Other": {
        logo: "./assets/images/other.png",
        products: [
            { name: "Other", image: "./assets/images/products/invisible-solid.png" }
        ]
    }
};

// Function to show the correct screen
function showScreen(screenNumber) {
    screens.forEach((screen, index) => {
        screen.classList.toggle("active", index + 1 === screenNumber);
        screen.classList.toggle("hidden", index + 1 !== screenNumber);
    });

    progressSteps.forEach((step, index) => {
        if (index + 1 < screenNumber) {
            step.classList.add("bg-orange-500", "text-white");
            step.classList.remove("bg-white", "text-orange-500");
        } else if (index + 1 === screenNumber) {
            step.classList.add("bg-orange-500", "text-white");
            step.classList.remove("bg-white", "text-orange-500");
        } else {
            step.classList.add("bg-white", "text-orange-500");
            step.classList.remove("bg-orange-500", "text-white");
        }
    });

    const header = document.getElementById('main-header');
    if (header) {
        if (screenNumber === 7) {
            header.style.display = 'none';
        } else {
            header.style.display = '';
        }
    }

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        if (screenNumber === 7) {
            progressBar.style.display = 'none';
        } else {
            progressBar.style.display = '';
        }
    }

    currentScreen = screenNumber;
}

// Render brands on screen 1
function renderBrandGrid() {
    const grid = document.getElementById('brand-grid');
    grid.innerHTML = '';
    Object.entries(brands).forEach(([brand, data]) => {
        const div = document.createElement('div');
        div.className = "text-center cursor-pointer border-2 border-transparent hover:border-orange-500 bg-white rounded-md";
        div.setAttribute('data-brand', brand);
        div.innerHTML = `<img src="${data.logo}" alt="${brand}" class="w-[100px] h-[50px] mx-auto my-3" />`;
        div.addEventListener('click', () => {
            document.querySelectorAll('#brand-grid [data-brand]').forEach(el => el.classList.remove('border-orange-500'));
            div.classList.add('border-orange-500');
            selectedBrand = brand;
            document.getElementById('continue-button').disabled = false;
        });
        grid.appendChild(div);
    });
}

// Render products for selected brand on screen 2
function renderProductList(brand) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    if (!brands[brand]) return;
    brands[brand].products.forEach(product => {
        const div = document.createElement('div');
        div.className = "flex items-center gap-4 border-2 border-gray-200 rounded-lg p-4 bg-white";
        div.innerHTML = `
            <input type="radio" name="product-type" value="${product.name}" class="accent-blue-600" />
            <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-contain" />
            <div>
                <div class="font-bold">${product.name}</div>
                ${product.description ? `<div class="italic text-gray-500 text-sm">${product.description}</div>` : ''}
            </div>
        `;
        productList.appendChild(div);
    });
    productList.querySelectorAll("input[name='product-type']").forEach(input => {
        input.addEventListener("change", (e) => {
            selectedProductType = e.target.value;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderBrandGrid();

    document.getElementById('continue-button').addEventListener('click', () => {
        if (!selectedBrand) return;
        renderProductList(selectedBrand);
        showScreen(2);
    });
});

nextButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentScreen < screens.length) {
            showScreen(currentScreen + 1);
        }
    });
});

backButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentScreen > 1) {
            showScreen(currentScreen - 1);
        }
    });
});

progressSteps.forEach(step => {
    step.addEventListener("click", () => {
        const screenNumber = parseInt(step.getAttribute("data-screen"));
        showScreen(screenNumber);
    });
});

document.querySelector("[alt='Gift Icon']").addEventListener("click", () => {
    showScreen(7); 
});

document.getElementById('back-to-start-button').addEventListener('click', function () {

    document.getElementById('screen-7').classList.add('hidden');

    document.getElementById('screen-1').classList.remove('hidden');
});