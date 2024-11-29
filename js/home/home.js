let api;
let homeFuncs;
document.addEventListener("DOMContentLoaded", async () => {
    const nick = JSON.stringify(sessionStorage.getItem("userNickname"))
    const includer = new Include;
    includer.ReadHTML("import");

    const nickname = JSON.parse(nick)
    api = new API(ENV.authToken)
    homeFuncs = new HomeFunctions()
    const result = await api.findUser(nickname)
    document.querySelector("#imagem-Info").style = `background-image: url(${result.returnedData.profilePic});`
    document.querySelector(".userNickInCube").innerHTML = `@${nickname}`
    const userInfo = JSON.stringify(result.returnedData)
    sessionStorage.setItem("userInfo", userInfo)
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

const feedSection = document.querySelector(".feed-section-link");

/*posts*/
const clearButton = document.querySelector(".clear-button");
const contentInput = document.querySelector("#input-modal-post-content");
const postMenu = document.querySelector(".post-menu");
const fileInput = document.getElementById('file-input');


document.getElementById('file-input').addEventListener('change', function (event) {
    const file = event.target.files[0];


    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
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

document.querySelector(".closeCommentModal").addEventListener("click", () => {
    document.querySelector(".comment-modal-container").id = ""
})

let selectedFile = null; // Variável para armazenar o arquivo selecionado

document.getElementById('fileInput').addEventListener('change', function (event) {
    selectedFile = event.target.files[0]; // Armazena o arquivo na variável
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Cria uma nova imagem
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%'; // Ajusta a largura da imagem

            // Encontra o input de texto e substitui pelo elemento de imagem
            const textInput = document.getElementById('textInput');
            textInput.parentNode.insertBefore(img, textInput.nextSibling); // Adiciona a imagem após o input
            img.classList.add("CommentImageContent");
        };
        reader.readAsDataURL(selectedFile); // Lê o arquivo como URL
    }
});

document.querySelector(".commentSubmitInput").addEventListener("click", async () => {
    const CommentFuncs = new CommentsFunctions();
    const postFocused = document.querySelector(".post-focused");
    const postFocusedHeader = postFocused.firstElementChild;
    const UserNick = postFocusedHeader.children[1].children[1].textContent.split("@")[1];

    const metadata = postFocused.getAttribute("metadata");
    const postId = JSON.parse(metadata).id;

    const content = document.querySelector(".CommentContentInput").value;

    const data = {
        content,
        postId,
        author: UserNick,
        file: selectedFile, // Adiciona o arquivo selecionado ao objeto data
    };
    document.querySelector(".comment-modal-container").id = ""
    await CommentFuncs.doComment(data);
});
