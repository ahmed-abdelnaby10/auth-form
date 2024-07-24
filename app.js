let mainButtons = Array.from(document.querySelectorAll(".container .auth .message button"))
let forms = Array.from(document.forms)
let passwords = Array.from(document.querySelectorAll(".password"))
let showPassword = Array.from(document.querySelectorAll(".show-password"))
let container = document.querySelector(".container")
let subContainer = document.querySelector(".container .auth")
let signupContainer = document.querySelector(".container .sign-up")
let loginContainer = document.querySelector(".container .login")
let errorMessages = Array.from(document.querySelectorAll(".container .error-message"))
let emailInputs = Array.from(document.querySelectorAll("input[type='email']"))
let allInputs = Array.from(document.querySelectorAll("input"))
let forgetPasswordButton = document.querySelector("a")
let forgetPasswordDiv = document.querySelector(".forget-password-div")
let loginDiv = document.querySelector(".login-form > div")
let loginForm = document.querySelector('form.login-form')
let sendCodeBtn = document.querySelector('.send-code')

const emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

allInputs.forEach((input)=> {
    input.addEventListener('invalid', (e)=>{
        e.preventDefault()
    })
})


emailInputs.forEach((input)=> {
    input.addEventListener("invalid", (e)=>{
        e.preventDefault()
    })
    input.addEventListener("change", (e)=> {
        if (e.target.value.match(emailRegex)) {
            errorMessages.forEach((msg)=> {
                msg.style.display = 'none'
            })
        }else {
            errorMessages.forEach((msg)=> {
                msg.style.display = 'block'
            })
        }
    })
})

// Logic to toggle showing password
showPassword.forEach((btn)=> {
    btn.addEventListener("click", ()=> {
        passwords.forEach((password)=> {
            if (password.type === 'password') {
                password.type = 'text'
                btn.classList.remove("bi-eye-fill")
                btn.classList.add("bi-eye-slash-fill")
            }else {
                password.type = 'password'
                btn.classList.remove("bi-eye-slash-fill")
                btn.classList.add("bi-eye-fill")
            }
        })
    })
})

// Logic to submit forms
forms.forEach((form)=> {
    form.addEventListener("submit", (e)=> {
        e.preventDefault()
    })
})

mainButtons.forEach((mainButton) => {
    mainButton.addEventListener("click", (e) => {
        if (container.classList.contains("login")) {
            loginContainer.classList.remove('active');
            setTimeout(() => {
                container.classList.remove('login');
                container.classList.add('register');
                loginContainer.style.display = 'none';
                signupContainer.style.display = 'flex';
                signupContainer.classList.add('active');
                reset()
            }, 300);
        } else {
            signupContainer.classList.remove('active');
            setTimeout(() => {
                container.classList.remove('register');
                container.classList.add('login');
                signupContainer.style.display = 'none';
                loginContainer.style.display = 'flex';
                loginContainer.classList.add('active');
                reset()
            }, 300);
        }
    });
});

forgetPasswordButton.addEventListener('click', ()=> {
    loginForm.innerHTML = ''
    forgetPasswordDiv.style.display = "flex"
    loginForm.append(forgetPasswordDiv)
})
sendCodeBtn.addEventListener('click', ()=> {
    loginForm.innerHTML = ''
    forgetPasswordDiv.style.display = "none"
    loginForm.append(loginDiv)
})

function reset () {
    passwords.forEach((password)=> {
        password.type = 'password'
    })
    showPassword.forEach((btn)=> {
        btn.classList.remove("bi-eye-slash-fill")
        btn.classList.add("bi-eye-fill")
    })
    errorMessages.forEach((msg)=> {
        msg.style.display = 'none'
    })
    allInputs.forEach((input)=> {
        input.value = ''
    })
}