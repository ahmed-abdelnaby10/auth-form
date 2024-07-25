// Selectors
const mainButtons = Array.from(document.querySelectorAll(".container .auth .message button"))
const forms = Array.from(document.forms)
const passwords = Array.from(document.querySelectorAll(".password"))
const showPassword = Array.from(document.querySelectorAll(".show-password"))
const container = document.querySelector(".container")
const subContainer = document.querySelector(".container .auth")
const signupContainer = document.querySelector(".container .sign-up")
const loginContainer = document.querySelector(".container .login")
const errorMessages = Array.from(document.querySelectorAll(".container .error-message"))
const emailInputs = Array.from(document.querySelectorAll("input[type='email']"))
const allInputs = Array.from(document.querySelectorAll("input"))
const forgetPasswordButton = document.querySelector("a")
const forgetPasswordDiv = document.querySelector(".forget-password-div")
const loginDiv = document.querySelector(".login-form > div")
const loginForm = document.querySelector('form.login-form')
const sendCodeBtn = document.querySelector('.send-code')
const otpForm = document.querySelector('.otp')
const otpInputs = document.querySelectorAll("input[name='otp']")
const otpButton = document.querySelector('.otp button')
const retriveEmailInput = document.getElementById('retrive-email') 
const paletteSwitcher1 = document.querySelector('.palette-switcher-1');
const paletteSwitcher2 = document.querySelector('.palette-switcher-2');
const emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
const palettes = ['palette-1', 'palette-2', 'palette-3', 'palette-4', 'palette-5'];

// Logic to prevent default behaviour of invalid inputs
allInputs.forEach((input)=> {
    input.addEventListener('invalid', preventDefault)
})

// Logic to show error message
emailInputs.forEach((input)=> {
    input.addEventListener("invalid", preventDefault)
    input.addEventListener("change", showErrorMessage)
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
    form.addEventListener("submit", preventDefault)
})

// Logic to change between sign-up and login forms
mainButtons.forEach((mainButton) => {
    mainButton.addEventListener("click", toggleForms);
});

// Logic to move to forget password form
forgetPasswordButton.addEventListener('click', ()=> {
    render(forgetPasswordDiv)
})

// Logic to move to OTP form
sendCodeBtn.addEventListener('click', renderOTPForm)

// Logic to verify OTP and return to login form
let otpValues = []
otpButton.addEventListener('click', verifyOTP)

// Logic to Switch color palette
let currentPaletteIndex = 0;
paletteSwitcher1.addEventListener('click', switchPalette);
paletteSwitcher2.addEventListener('click', switchPalette);

function showErrorMessage(e) {
    if (e.target.value.match(emailRegex)) {
        errorMessages.forEach((msg)=> {
            msg.style.display = 'none'
        })
    }else {
        errorMessages.forEach((msg)=> {
            msg.style.display = 'block'
        })
    }
}

function preventDefault(e) {
    e.preventDefault()
}

function toggleForms() {
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
}

function renderOTPForm() {
    if (!retriveEmailInput.value.match(emailRegex)) {
        console.log("retrive-email isnot valid");
    }else {
        render(otpForm)
        otpInputs[0].focus()
    }
}

function verifyOTP() {
    otpValues = []
    otpInputs.forEach((input)=> {
        otpValues.push(input.value)
    })
    if (!otpValues[0] || !otpValues[1] || !otpValues[2] || !otpValues[3]) {
        otpValues = []
        return false
    }else {
        render(loginDiv)
    }
}

// Logic to check that OTP fields are only numbers
function isNumberKey(e) {
    let charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// Logic to auto focus next field in OTP form
function moveFocus(currentInput, nextInputId) {
    if (currentInput.value.length === 1) {
        if (nextInputId !== null) {
            document.getElementById(nextInputId).focus();
        } else {
            currentInput.blur();
        }
    }
}

// Function to switch palette
function switchPalette() {
    document.body.classList.remove(palettes[currentPaletteIndex]);
    currentPaletteIndex = (currentPaletteIndex + 1) % palettes.length;
    document.body.classList.add(palettes[currentPaletteIndex]);
}

// Render function to render the desired HTML elements
function render(node) {
    loginForm.innerHTML = ''
    node.style.display = 'flex'
    loginForm.append(node)
    reset()
}

// Reset function to reset values to default
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
    retriveEmailInput.value = ''
    otpInputs.forEach((input)=> {
        input.value = ''
    })
}
