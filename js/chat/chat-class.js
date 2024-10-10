class chatFunctions {
    findMessages(room) {
        socket.emit("find_messages", room)

        const messages = socket.on("all_messages", (data) => { return data })

        return messages
    }

    saveMessages(data) {
        console.log(data)
        socket.emit("save messages queue", {
            author: data.author,
            content: data.content,
            hour: data.hour,
            room: data.room
        })
    }
}