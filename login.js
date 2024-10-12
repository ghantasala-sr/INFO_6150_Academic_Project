const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupForm = document.getElementById('signup');
const signupEmailInput = document.getElementById('signupEmail');
const signupPasswordInput = document.getElementById('signupPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const signupErrorMessage = document.getElementById('signupErrorMessage');
const loginPrompt = document.getElementById('loginPrompt');

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

showSignup.addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginFormContainer').style.display = 'none';
    signupForm.parentElement.style.display = 'block';
    loginPrompt.style.display = 'none';
});

showLogin.addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginFormContainer').style.display = 'block';
    signupForm.parentElement.style.display = 'none';
    signupErrorMessage.textContent = '';
    loginPrompt.style.display = 'block';
});

signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const signupEmail = signupEmailInput.value;
    const signupPassword = signupPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const emailRegex = /^[a-z0-9]+@gmail\.com$/;
    if (!emailRegex.test(signupEmail)) {
        alert('Invalid email id. Please enter a valid Gmail address.');
        return;
    }

    if (signupPassword !== confirmPassword) {
        alert('The passwords didn\'t match.');
        return;
    }

    const passwordRegex = /^[A-Z][a-z0-9!@#\$%\^&\\(\)_\+\-=\[\]{};':"\\|,.<>\/?]{7,}$/;
    if (!passwordRegex.test(signupPassword)) {
        alert('Invalid password. The password must start with an uppercase letter and be at least 8 characters long.');
        return;
    }

    alert('Sign up successful!');

    signupForm.reset();

    signupForm.parentElement.style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
    loginPrompt.style.display = 'block';
});
