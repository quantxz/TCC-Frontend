// const contacts = document.querySelectorAll(".contact");



// contacts.forEach(item => {
//     item.id = ""
//     item.addEventListener("click", async (e) => {
        
//         if (item.id == "") {
//             const room = item.getAttribute("room");
//             item.id = "chatSelected";
//             removeSelectedFromOthers(item);

//             // Obtém o URL base sem os parâmetros de consulta
//             const baseUrl = window.location.origin + window.location.pathname;

//             // Cria um objeto URLSearchParams apenas com os novos parâmetros
//             let params = new URLSearchParams();
//             params.append("room", room);

//             // Atualiza a URL sem parâmetros de consulta e adiciona os novos parâmetros
//             window.history.replaceState({}, '', baseUrl + '?' + params.toString());
//         }

//     })
// })

// function removeSelectedFromOthers(selectedItem) {
//     contacts.forEach(item => {
//         if (item !== selectedItem && item.id === "chatSelected") {
//             item.id = "";
//         }
//     });
// }