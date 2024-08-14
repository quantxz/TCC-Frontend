const contactsDivs = document.querySelectorAll(".contact");

contactsDivs.forEach((contact) => {
    contact.addEventListener("click" , socket.emit("find_messages", room));
});

socket.on("find_messages", (data) => {
    data.forEach(message => {
        render(message)
    })
})