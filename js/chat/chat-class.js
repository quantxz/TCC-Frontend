class chatFunctions {
    findMessages(room) {
        socket.emit("find_messages", room)

        const messages = socket.on("all_messages", (data) => { return data })

        return messages
    }

    saveMessages(data) {
        console.log(data)
        data.forEach(message => {
            console.log(message)
            socket.emit("save messages queue", {
                author: message.author,
                content: message.content,
                hour: message.hour,
                room: message.room
            })
        });
    }
}