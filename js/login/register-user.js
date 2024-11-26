const registerForm = document.querySelector(".formRegister")

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = document.querySelector("#nome").value;
    const surname = document.querySelector("#sobrenome").value;
    const nickname = document.querySelector("#nickname").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmarSenha").value;
    
    const api = new API();
    api.registerUser(name, surname, nickname, email, password, confirmPassword);
})





