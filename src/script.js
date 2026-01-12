// Mobile Menu Toggle Function
function handleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.querySelector('#mobile-menu-btn i');
    
    // Check if menu is hidden
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
        // Show menu
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.display = 'block';
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-xmark');
        // Add click outside listener
        setTimeout(() => {
            document.addEventListener('click', closeMenuOnClickOutside);
        }, 100);
    } else {
        // Hide menu
        mobileMenu.classList.add('hidden');
        mobileMenu.style.display = 'none';
        hamburgerIcon.classList.remove('fa-xmark');
        hamburgerIcon.classList.add('fa-bars');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Close menu when clicking outside
function closeMenuOnClickOutside(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    // If click is outside the menu and button, close the menu
    if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        if (!mobileMenu.classList.contains('hidden')) {
            handleMenu();
        }
    }
}

// Show/hide menu button based on screen size
function showHideMenuButton() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (window.innerWidth < 768) { // md breakpoint is 768px
        mobileMenuBtn.style.display = 'block';
    } else {
        mobileMenuBtn.style.display = 'none';
        // Hide menu if open on desktop
        if (!mobileMenu.classList.contains('hidden')) {
            handleMenu();
        }
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', showHideMenuButton);

// Add resize listener
window.addEventListener('resize', showHideMenuButton);

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});