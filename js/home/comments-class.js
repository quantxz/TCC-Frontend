class CommentsFunctions extends ENV{
    apiClass = new API();
    identifier = new Identifier();
    constructor() {
        super()
    }

    renderComments(comments, postID) {
        const ul = document.querySelector(".postCommentsUnorderList");
        // Limpa a lista antes de adicionar novos comentários, se necessário
        ul.innerHTML = '';

        comments.comentarios.forEach(comment => {
            const listItem = document.createElement("li");
            // Cria a estrutura HTML para o comentário
            if(comment.postId !== postID) {
                return;
            }

            listItem.innerHTML = `
                <div class="comment-header">
                    <div class="comment-profile-pic">
                        <img src="${comment.profilePic}" alt="">
                    </div>
                    <div class="comment-profile-infos">
                        <p>${comment.user.name}</p>
                        <p>@${comment.authorNick}</p>
                    </div>
                </div>
                <div class="comment-content">
                    ${this.identifier.Identifier(comment.image).image == "yes" ? '<img src=' + comment.image +' alt="PostContentImage">' : "<br>"}
                    <p>${comment.content}</p>
                </div>
                <div class="comment-footer">
                    <div class="comment-likes">
                        <div class="heart-container" title="Like">
                            <input type="checkbox" class="checkbox commentLikeInput" id="Give-It-An-Id">
                            <div class="svg-container">
                                <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                </svg>
                                <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                </svg>
                            </div>
                        </div>
                        <p>${comment.likes} Curtidas</p>
                    </div>
                </div>
            `;
    
            // Adiciona o item à lista
            ul.appendChild(listItem);
        });
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