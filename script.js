const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = emailInput.value;
    const password = passwordInput.value;

    const emailRegex = /^[a-z0-9]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email id. Please enter a valid email id.');
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (!passwordRegex.test(password)) {
        alert('Invalid password. The password must contain atleast one uppercase letter, one lowercase letter, one number, one special character.');
        return;
    }

    window.location.href = 'index.html';
});