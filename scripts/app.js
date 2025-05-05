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

    // Hide header only on screen 7
    const header = document.getElementById('main-header');
    if (header) {
        if (screenNumber === 7) {
            header.style.display = 'none';
        } else {
            header.style.display = '';
        }
    }

    // Hide progress bar only on screen 7
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

// Handle brand selection
brandLogos.forEach(logo => {
    logo.addEventListener("click", () => {
        brandLogos.forEach(logo => logo.classList.remove("border-orange-500"));
        logo.classList.add("border-orange-500");
        selectedBrand = logo.getAttribute("data-brand");
        console.log("Selected Brand:", selectedBrand);
        continueButton.disabled = false; 
    });
});

// Handle "Continue" button click
continueButton.addEventListener("click", () => {
    if (!selectedBrand) {
        alert("Please select a brand before continuing."); // Show alert if no brand is selected
        return;
    }

    console.log("Proceeding with brand:", selectedBrand);
    showScreen(2); // Navigate to Screen 2
});

// Handle product type selection
document.querySelectorAll("input[name='product-type']").forEach(input => {
    input.addEventListener("change", (e) => {
        selectedProductType = e.target.value;
        console.log("Selected Product Type:", selectedProductType);
    });
});

// Handle "Next" button click for all screens
nextButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentScreen < screens.length) {
            showScreen(currentScreen + 1);
        }
    });
});

// Handle "Back" button click for all screens
backButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentScreen > 1) {
            showScreen(currentScreen - 1);
        }
    });
});

// Progress bar click event
progressSteps.forEach(step => {
    step.addEventListener("click", () => {
        const screenNumber = parseInt(step.getAttribute("data-screen"));
        showScreen(screenNumber);
    });
});

// Handle gift icon click
document.querySelector("[alt='Gift Icon']").addEventListener("click", () => {
    showScreen(7); // Navigate to Screen 7
});

// Handle "Continue" button click on screen 7
document.getElementById('back-to-start-button').addEventListener('click', function () {
    // Hide screen 7
    document.getElementById('screen-7').classList.add('hidden');

    // Show screen 1
    document.getElementById('screen-1').classList.remove('hidden');
});