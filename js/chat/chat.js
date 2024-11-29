const url = new URLSearchParams(window.location.search);
const contacts = document.querySelectorAll(".contact");

let room = url.get("room");

const user = localStorage.getItem("userNickname");
const messagesDiv = document.querySelector(".messages");
const { nickname } = JSON.parse(sessionStorage.getItem("userInfo"));
const nick = nickname;
const check = document.querySelector(".checkBoxMenuMobile");
const groups = document.querySelector(".groups");
const searchBar = document.querySelector(".searchBar");
const menu = document.querySelector(".menuOptions");
const chatFuncs = new chatFunctions();
const api = new API();

api.findUser(nickname)
document.addEventListener("DOMContentLoaded", async () => {
    const response = await api.findUser(nickname)
    console.log(response.returnedData)
    document.querySelector(".profilePic").style = `background-image: url(${response.returnedData.profilePic !== "" ? response.returnedData.profilePic : "/assets/6326055-removebg-preview.png"});`
})
let lastMessage = null;
let currentMessages = [];
let messagesLoade = false;
let selectedChat = false;

// Função para inicializar o socket
function initSocket(room) {
    const socket = io("http://localhost:3000", {
        query: { roomName: room }
    });

    socket.on("message", (data) => {
        render(data);
        messagesDiv.scrollBy({
            behavior: "smooth",
            top: messagesDiv.scrollHeight
        });
    });

    return socket;
}

let socket = initSocket(room);

async function render(data) {
    console.trace('Render function called from:'); 
    const response = await api.findUser(data.author)
    const message = document.createElement("div");
    message.className = "message";

    const infos = document.createElement("div");
    infos.className = "userInChatInfos";

    const content = document.createElement("div");
    content.className = "content";

    const contentText = document.createElement("p");
    contentText.textContent = data.content;
    content.appendChild(contentText);

    const profileInChatPic = document.createElement("div");
    profileInChatPic.className = "profileInChatPic";
    profileInChatPic.style = `background-image: url(${response.returnedData.profilePic});`;


    const nicknameElement = document.createElement("p");
    nicknameElement.className = "userInChatName";
    nicknameElement.innerText = data.author;

    if (JSON.stringify(data.author) === JSON.stringify(nick)) {
        message.id = "myMessage";
    }

    if (data.hasOwnProperty('id')) {
        message.setAttribute('metadata', JSON.stringify(data));
    }

    infos.appendChild(profileInChatPic);
    infos.appendChild(nicknameElement);
    message.appendChild(infos);
    message.appendChild(content);

    messagesDiv.appendChild(message);
}

const form = document.querySelector(".chatForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const messageInput = document.querySelector("#messageInput");
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    socket.emit("message", {
        author: nickname,
        room: room,
        content: messageInput.value,
        hour: `${hours}:${minutes}:${seconds}`
    });

    const messageToArray = {
        author: nickname,
        room: room,
        content: messageInput.value,
        hour: `${hours}:${minutes}:${seconds}`
    };

    currentMessages.push(messageToArray)
});

contacts.forEach(contact => {
    console.log(room);
    contact.addEventListener("click", async (e) => {
        // Garantir que o novo "room" seja obtido
        const newRoom = contact.getAttribute("room");

        // Verifica se o contato já está selecionado
        if (contact.id === "chatSelected") {
            contact.removeAttribute("id");
            socket.emit("leaveRoom", { room });

            socket.disconnect();
        } else {
            contact.id = "chatSelected";
            messagesLoade = false; // Garantir que a flag seja resetada
        }

        // Atualiza a variável "room" para a nova sala
        room = newRoom;

        // Inicializa um novo socket com a nova sala
        socket = initSocket(room);

        // Atualiza a URL com a nova sala
        const baseUrl = window.location.origin + window.location.pathname;
        let params = new URLSearchParams();
        params.append("room", room);
        window.history.replaceState({}, '', baseUrl + '?' + params.toString());

        // Limpa as mensagens anteriores
        messagesDiv.innerHTML = '';

        // Solicita as mensagens anteriores para a nova sala
        socket.emit("find_messages", room);

        // Carrega as mensagens assim que estiverem disponíveis
        socket.on('all_messages', (messages) => {
            for (const message of messages) {
                if (!messagesLoade) {
                    render(message);
                }
            }
            for (const message of currentMessages) {
                if (!messagesLoade) {
                    render(message);
                }
            }
            messagesLoade = true;
        });


    });
});




check.addEventListener("change", () => {
    if (check.checked) {
        groups.style = "display: flex;"
        groups.id = "groupsById"

        searchBar.id = "groupsById"

        menu.id = "groupsById"
    } else {
        groups.id = "groupsUnselect"
        searchBar.id = "groupsUnselect"
        menu.id = "groupsUnselect"
    }
})

function removeSelectedFromOthers(selectedItem) {
    contacts.forEach(item => {
        if (item !== selectedItem && item.id === "chatSelected") {
            item.id = "";
        }
    });
}