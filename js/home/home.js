document.addEventListener("DOMContentLoaded", async () => {
    const nick = JSON.stringify(localStorage.getItem("userNickname"))

    const includer = new Include;
    includer.ReadHTML("import");

    const auth = new UserAutenticator();
    auth.loginAutenticator();

    const nickname = JSON.parse(nick)
    const api = new API(ENV.authToken)
    const result = await api.findUser(nickname)
    const userInfo = JSON.stringify(result.returnedData)
    localStorage.setItem("userInfo", userInfo)
})

const notifies = document.querySelector(".notifications");
const doPosts = document.querySelector(".do-a-post");
const closeModal = document.querySelectorAll("#close-modal");

notifies.addEventListener("click", () => {
    document.querySelector(".modals").style.display = "flex"
    document.querySelector(".notifications-modal").id = "modal-active"
})

doPosts.addEventListener("click", () => {
    document.querySelector(".modals").style.display = "flex"
    document.querySelector(".post-modal").id = "post-modal-active"
})

closeModal.forEach(item => {       
    item.addEventListener("click", () => {
        document.querySelector(".modals").style.display = "none"
        document.querySelectorAll(".modal").forEach(item => {
            item.id = ""
        })
    })
})

/*sections*/
const exploreSection = document.querySelector(".explore-section-link");
const feedSection = document.querySelector(".feed-section-link");

exploreSection.addEventListener("click", () => {
    document.querySelector(".explore-section").style.display = "block"
    document.querySelector(".feed-section").style.display = "none"
    document.querySelector(".sidebar-right").id = "sidebar-right-active"
})

feedSection.addEventListener("click", () => {
    document.querySelector(".feed-section").style.display = "block"
    document.querySelector(".explore-section").style.display = "none"
    document.querySelector(".sidebar-right").id = ""
})

/*posts*/
const clearButton = document.querySelector(".clear-button");
const contentInput = document.querySelector("#input-modal-post-content");
const postMenu = document.querySelector(".post-menu");
const fileInput = document.getElementById('file-input');
document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];


    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            contentInput.style.backgroundImage = `url(${e.target.result})`;
            contentInput.style.backgroundSize = 'cover'; // Ajusta o tamanho da imagem para cobrir o input
            contentInput.style.backgroundPosition = 'center'; // Centraliza a imagem
            contentInput.style.height = "15rem";
            contentInput.setAttribute('readonly', true);
            document.querySelector("#post-modal-active").style.height = "90rem"
            postMenu.id = "post-modal-menu-image-active"
            clearButton.style.display = "flex"
        };

        reader.readAsDataURL(file);

        console.log('File name:', file.name);
        console.log('File size:', file.size);
        console.log('File type:', file.type);
    }
});

clearButton.addEventListener("click", () => {
    contentInput.setAttribute('readonly', false);
    contentInput.setAttribute('disabled', false);
    fileInput.value = ""
    contentInput.style.backgroundImage = ``;
    contentInput.style.height = `10%`;
    document.querySelector("#post-modal-active").style.height = "70%"
    postMenu.id = ""
    clearButton.style.display = "none"
})

