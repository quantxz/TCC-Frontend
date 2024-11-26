class chatFunctions {
    findMessages(room) {
        socket.emit("find_messages", room)

        const messages = socket.on("all_messages", (data) => { return data })

        return messages
    }
}