const url = new URLSearchParams(window.location.search);
const room = url.get("room");

const user = localStorage.getItem("userNickname");
const messagesDiv = document.querySelector(".messages");
const { nickname } = JSON.parse(localStorage.getItem("userInfo"));
const nick = nickname
let messages = []

/*em produção https://tcc-u2qf.onrender.com */
const socket = io("http://localhost:3000", {
    query: { roomName: room }
});

function render(data) {
    const message = document.createElement("div");
    message.className = "message";

    const infos = document.createElement("div");
    infos.className = "userInChatInfos"

    const content = document.createElement("div");
    content.className = "content"

    const contentText = document.createElement("p");
    contentText.textContent = data.content
    content.appendChild(contentText)

    const profileInChatPic = document.createElement("div");
    profileInChatPic.className = "profileInChatPic"
    profileInChatPic.style = "background-image: url(https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg);"

    const nickname = document.createElement("p")
    nickname.className = "userInChatName"
    nickname.textContent = data.author

    if (JSON.stringify(data.author) == JSON.stringify(nick)) {
        message.id = "myMessage"
    }

    // Adicione os elementos filhos um por um
    infos.appendChild(profileInChatPic);
    infos.appendChild(nickname);
    message.appendChild(infos);
    message.appendChild(content);

    // Adicione a mensagem ao seu contêiner, como "messages"
    const messagesContainer = document.querySelector(".messages");
    messagesContainer.appendChild(message);
}

const form = document.querySelector(".chatForm");

//ta funcionando é só arrumar o backend pra chamarretornar o author tambemm
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const message = document.querySelector("#messageInput");
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    socket.emit("message", {
        author: nickname,
        room: room,
        content: message.value,
        hour: `${hours}:${minutes}:${seconds}`
    })

    const messageToArray = {
        author: nickname,
        room: room,
        content: message.value,
        hour: `${hours}:${minutes}:${seconds}`
    }
    messages.push(messageToArray)
})


// const clear = () => {
//     messagesDiv.textContent = ""
// }

// Receptor de mensagem do servidor
socket.on("message", (data) => {
    render(data);
    messagesDiv.scrollBy({
        behavior: "smooth",
        top: messagesDiv.scrollHeight
    })

});

// por algum motivo sempre que o save messages dispara, a pagina recarrega mas foda-se tem outras coisas pra arrumar
// let delay = 30 * 60 * 1000 // 30 minutos
// function sendMessageAfterDelay() {
//     try {
//         socket.emit("save messages", messages);
//         messages = []
//     } catch (error) {
//         console.log(error)
//     }
// }

// setInterval(sendMessageAfterDelay(), delay)
