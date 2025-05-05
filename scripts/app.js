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

brandLogos.forEach(logo => {
    logo.addEventListener("click", () => {
        brandLogos.forEach(logo => logo.classList.remove("border-orange-500"));
        logo.classList.add("border-orange-500");
        selectedBrand = logo.getAttribute("data-brand");
        console.log("Selected Brand:", selectedBrand);
        continueButton.disabled = false; 
    });
});

continueButton.addEventListener("click", () => {
    if (!selectedBrand) {
        alert("Please select a brand before continuing.");
        return;
    }

    console.log("Proceeding with brand:", selectedBrand);
    showScreen(2);
});

document.querySelectorAll("input[name='product-type']").forEach(input => {
    input.addEventListener("change", (e) => {
        selectedProductType = e.target.value;
        console.log("Selected Product Type:", selectedProductType);
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