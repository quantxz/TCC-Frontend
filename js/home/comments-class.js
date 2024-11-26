class CommentsFunctions extends ENV {
    apiClass = new API();
    identifier = new Identifier();
    constructor() {
        super()
    }

    renderComments(comments, postID) {
        const ul = document.querySelector(".postCommentsUnorderList");
        // Limpa a lista antes de adicionar novos comentários, se necessário
        ul.innerHTML = '';
        const commentsId = []
        comments.comentarios.forEach(async comment => {
            const commentAlreadyLiked = await this.apiClass.findLikedComment(comment)
            const listItem = document.createElement("li");
            console.log(comment)
            // Cria a estrutura HTML para o comentário
            if (comment.postId !== postID) {
                return;
            }

            if (commentsId.includes(comment.id)) {
                return;
            }
            commentsId.push(comment.id)


            listItem.innerHTML = `
                <div class="comment-header">
                    <div class="comment-profile-pic">
                        <img src="${comment.user.profilePic}" alt="">
                    </div>
                    <div class="comment-profile-infos">
                        <p>${comment.user.name}</p>
                        <p>@${comment.authorNick}</p>
                    </div>
                </div>
                <div class="comment-content">
                    ${this.identifier.Identifier(comment.image).image == "yes" ? '<img src=' + comment.image + ' alt="PostContentImage">' : "<br>"}
                    <p>${comment.content}</p>
                </div>
                <div class="comment-footer">
                </div>
            `;

            // Adiciona o item à lista
            ul.appendChild(listItem);
        });
    }

    renderComment(data) {
        const ul = document.querySelector(".postCommentsUnorderList");
        const listItem = document.createElement("li");
        console.log(data[1])
        listItem.innerHTML = `
                <div class="comment-header">
                    <div class="comment-profile-pic">
                        <img src="${data[1].profilePic}" alt="">
                    </div>
                    <div class="comment-profile-infos">
                        <p>${data[1].name}</p>
                        <p>@${data[1].authorNick}</p>
                    </div>
                </div>
                <div class="comment-content">
                    ${this.identifier.Identifier(data[0].image).image == "yes" ? '<img src=' + data[0].image + ' alt="PostContentImage">' : "<br>"}
                    <p>${data[0].content}</p>
                </div>
                <div class="comment-footer">
                </div>
            `;

        // Adiciona o item à lista
        ul.appendChild(listItem);
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
    if (response.ok) {
        this.renderComment(await response.json())
    }
    return response;
}

    /** 
     * @param {string} postId 
     */
    async getComments(postId) {
    const response = await fetch(`${this.url}/posts/comments`, {
        method: "PATCH",
        body: postId
    });

    const comments = await response.json();

    this.renderComments(comments, postId);
    return comments;
}
}