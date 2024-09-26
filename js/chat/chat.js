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

let messages = [];

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

function render(data) {
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
    profileInChatPic.style = "background-image: url(https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg);";

    const nicknameElement = document.createElement("p");
    nicknameElement.className = "userInChatName";
    nicknameElement.textContent = data.author;

    if (JSON.stringify(data.author) === JSON.stringify(nick)) {
        message.id = "myMessage";
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
    messages.push(messageToArray);
});

contacts.forEach(item => {
    removeSelectedFromOthers(item);
    item.addEventListener("click", async (e) => {

        const newRoom = item.getAttribute("room");
        item.id = "chatSelected";
        removeSelectedFromOthers(item);

        if (newRoom && newRoom !== room) {
            // Atualiza a room
            room = newRoom;

            // Emite evento para o servidor informando a mudança de sala
            socket.emit("leaveRoom", { room }); // Emissão para o servidor, se necessário

            // Fecha a conexão do socket atual
            socket.disconnect();

            // Inicializa um novo socket com a nova sala
            socket = initSocket(room);

            // Atualiza a URL
            const baseUrl = window.location.origin + window.location.pathname;
            let params = new URLSearchParams();
            params.append("room", room);
            window.history.replaceState({}, '', baseUrl + '?' + params.toString());

            // Limpa as mensagens anteriores
            messagesDiv.innerHTML = '';
        }
    });
});

check.addEventListener("change", () => {
    if(check.checked) {
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