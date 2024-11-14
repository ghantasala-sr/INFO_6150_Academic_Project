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
const loginButton = loginForm.querySelector('button[type="submit"]');
const signupButton = signupForm.querySelector('button[type="submit"]');

function checkFields() {
    const isLoginFilled = emailInput.value.trim() !== '' && passwordInput.value.trim() !== '';
    const isSignupFilled = signupEmailInput.value.trim() !== '' &&
                           signupPasswordInput.value.trim() !== '' &&
                           confirmPasswordInput.value.trim() !== '';
    loginButton.disabled = !isLoginFilled || document.getElementById('emailError').style.display === 'block' || document.getElementById('passwordError').style.display === 'block';
    signupButton.disabled = !isSignupFilled || document.getElementById('signupEmailError').style.display === 'block' || document.getElementById('signupPasswordError').style.display === 'block' || document.getElementById('confirmPasswordError').style.display === 'block';
}


emailInput.addEventListener('input', function() {
    const email = emailInput.value;
    const emailError = document.getElementById('emailError');
    
    emailError.style.display = 'none';

    const emailRegex = /^[a-z0-9]+@gmail\.com$/;
    if (!emailRegex.test(email) && email.trim() !== '') {
        emailError.textContent = 'Invalid email address. Please enter a valid Gmail address.';
        emailError.style.display = 'block';
    }
    checkFields();
});

signupEmailInput.addEventListener('input', function() {
    const signupEmail = signupEmailInput.value;
    const signupEmailError = document.getElementById('signupEmailError');

    signupEmailError.style.display = 'none';

    const emailRegex = /^[a-z0-9]+@gmail\.com$/;
    if (!emailRegex.test(signupEmail) && signupEmail.trim() !== '') {
        signupEmailError.textContent = 'Invalid email address. Please enter a valid Gmail address.';
        signupEmailError.style.display = 'block';
    }
    checkFields();
});

passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const passwordError = document.getElementById('passwordError');

    passwordError.style.display = 'none';

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (!passwordRegex.test(password) && password.trim() !== '') {
        passwordError.textContent = 'Invalid password. The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        passwordError.style.display = 'block';
    }
    checkFields();
});

signupPasswordInput.addEventListener('input', function() {
    const signupPassword = signupPasswordInput.value;
    const signupPasswordError = document.getElementById('signupPasswordError');

    signupPasswordError.style.display = 'none';

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

    if (!passwordRegex.test(signupPassword) && signupPassword.trim() !== '') {
        signupPasswordError.textContent = 'Invalid password. The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.';
        signupPasswordError.style.display = 'block';
    }
    checkFields();
});

confirmPasswordInput.addEventListener('input', function() {
    const confirmPassword = confirmPasswordInput.value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    confirmPasswordError.style.display = 'none';

    if (confirmPassword !== signupPasswordInput.value && confirmPassword.trim() !== '') {
        confirmPasswordError.textContent = 'The passwords didn\'t match.';
        confirmPasswordError.style.display = 'block';
    }
    checkFields();
});


loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    const emailRegex = /^[a-z0-9]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email address. Please enter a valid Gmail address.';
        document.getElementById('emailError').style.display = 'block';
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]*$/;

    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').textContent = 'Invalid password. The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        document.getElementById('passwordError').style.display = 'block';
        return;
    }

    window.location.href = 'index.html';
})

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

    document.getElementById('signupEmailError').style.display = 'none';
    document.getElementById('signupPasswordError').style.display = 'none';
    document.getElementById('confirmPasswordError').style.display = 'none';

    const emailRegex = /^[a-z0-9]+@gmail\.com$/;
    if (!emailRegex.test(signupEmail)) {
        document.getElementById('signupEmailError').textContent = 'Invalid email address. Please enter a valid Gmail address.';
        document.getElementById('signupEmailError').style.display = 'block';
        return;
    }

    if (signupPassword !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'The passwords didn\'t match.';
        document.getElementById('confirmPasswordError').style.display = 'block';
        return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    if (!passwordRegex.test(signupPassword)) {
        document.getElementById('signupPasswordError').textContent = 'Invalid password. The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.';
        document.getElementById('signupPasswordError').style.display = 'block';
        return;
    }

    alert('Sign up successful!');

    signupForm.reset();
    checkFields();

    signupForm.parentElement.style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
    loginPrompt.style.display = 'block';
});

checkFields();