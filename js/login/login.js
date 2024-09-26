const submitInput = document.querySelector("#submit");
const formLogin = document.querySelector(".formLogin");
const emailErrorElement = document.querySelector("#emailError");
const passwordErrorElement = document.querySelector("#passwordError");
const usernameErrorElement = document.querySelector("#usernameError");
const rememberMe = document.querySelector(".lembrarDeMimInput");

//criar uma classe para ler os erros
const url = new URLSearchParams(window.location.search);
const errorId = url.get("errorID");

window.addEventListener("DOMContentLoaded", async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const LoginOnWindowLoad = JSON.parse(localStorage.getItem("LoginOnWindowLoad"));

    if (LoginOnWindowLoad == true && userData && userData.username && userData.email && userData.password && !window.location.href.includes("errorID")) {
        // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU2MjM0ODQsImV4cCI6MTcxODMwMTg4NH0.uEQXC_vAF2tMh3hOlyQZ5yxXe5YFLd_0BRSRVlhyiYE"

        // const api = new API(authToken);

        // const resposne = await api.loginRequest(userInput, passwordInput, emailInput);
    }
});

rememberMe.addEventListener("change", () => {
    const userInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const emailInput = document.querySelector("#email");
    if (rememberMe.checked) {
        const userData = {
            username: userInput.value,
            password: passwordInput.value,
            email: emailInput.value
        };
        const userLoginOnWindowLoad = true;
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("LoginOnWindowLoad", userLoginOnWindowLoad);
    }
});

switch (true) {
    case errorId === "153032":
        passwordErrorElement.textContent = "Senha invalida";
        passwordErrorElement.style.display = "block"
        break;
    case errorId === "153031":
        emailErrorElement.textContent = "Email Invalido";
        emailErrorElement.style.display = "block";
        break;
    case errorId === "153030":
        passwordErrorElement.textContent = "Senha e email invalidos";
        passwordErrorElement.style.display = "block"
        emailErrorElement.textContent = "Senha e email invalidos";
        emailErrorElement.style.display = "block";
        break;
    case errorId === "153034":
        usernameErrorElement.textContent = "Usuario ou email invalidos";
        usernameErrorElement.style.display = "block"
        emailErrorElement.textContent = "Usuario ou email invalidos";
        emailErrorElement.style.display = "block";
        break;
    default:
        break;
}

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault()
    const userInput = document.querySelector("#login-username").value;
    const passwordInput = document.querySelector("#login-password").value;
    const emailInput = document.querySelector("#login-email").value;

    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU2MjM0ODQsImV4cCI6MTcxODMwMTg4NH0.uEQXC_vAF2tMh3hOlyQZ5yxXe5YFLd_0BRSRVlhyiYE"
    
    const user = JSON.stringify({
        user: userInput,
        password: passwordInput,
        email: emailInput
    })
    const api = new API(authToken);

    sessionStorage.setItem("userNickname", userInput)
    sessionStorage.setItem("user", user)
    await api.loginRequest(userInput, passwordInput, emailInput);

});

