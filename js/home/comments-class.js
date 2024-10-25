class CommentsFunctions extends ENV{
    apiClass = new API();
    identifier = new Identifier();
    constructor() {
        super()
    }

    async doComment(data) {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("authorNick", data.author);
        formData.append("postId", data.postId);
        
        // Adiciona a imagem se existir
        if (data.file) {
            formData.append("file", data.file);
        }

        const response = await fetch(`${this.url}/posts/comments`, {
            method: "POST",
            body: formData, // Envia como FormData
        });

        console.log(response);
        return response;
    }
}