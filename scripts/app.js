const screens = document.querySelectorAll("section");
const progressSteps = document.querySelectorAll(".progress-step");
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");
let currentScreen = 1;
let selectedProductType = null;
const brandLogos = document.querySelectorAll("[data-brand]");
const continueButton = document.getElementById("continue-button");
const selectedBrandDisplay = document.getElementById("selected-brand-display");
const selectedBrandName = document.getElementById("selected-brand-name");
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

    currentScreen = screenNumber;

    // Update button visibility
    if (currentScreen === 1) {
        continueButton.classList.remove("hidden");
    } else {
        continueButton.classList.add("hidden");
    }
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

// Next button click event
nextButton?.addEventListener("click", () => {
    if (currentScreen < screens.length) {
        showScreen(currentScreen + 1);
    }
});

// Back button click event
backButton?.addEventListener("click", () => {
    if (currentScreen > 1) {
        showScreen(currentScreen - 1);
    }
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

    currentScreen = screenNumber;
}