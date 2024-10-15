
// ------------------------------------ Login Page ----------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.login-submitBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const emailError = document.getElementById('email-error');
            const passwordError = document.getElementById('password-error');

            let isValid = true;

            if (email.value === '') {
                email.classList.add('shake');
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none'; 
            }

            if (password.value === '') {
                password.classList.add('shake');
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.style.display = 'none'; 
            }

            setTimeout(() => {
                email.classList.remove('shake');
                password.classList.remove('shake');
            }, 500);

            if (isValid) {
                document.querySelector('.login-info').classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            }
        });
    }
});



// ------------------------------------ Register Page ----------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const registerBtn = document.querySelector('.register-submitBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const passwordError = document.getElementById('password-error');

            let isValid = true;

            if (name.value === '') {
                name.classList.add('shake');
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }

            if (email.value === '') {
                email.classList.add('shake');
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }

            if (password.value === '') {
                password.classList.add('shake');
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.style.display = 'none';
            }

            setTimeout(() => {
                name.classList.remove('shake');
                email.classList.remove('shake');
                password.classList.remove('shake');
            }, 500);

            if (isValid) {
                document.querySelector('.register-info').classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 500);
            }
        });
    }
});
