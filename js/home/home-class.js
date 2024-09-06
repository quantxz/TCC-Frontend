class HomeFunctions {
    apiClass = new API();
    identifier = new Identifier();
    
    *postsGenerator(postsArray) {
        let count = 0;
        let postsBatch = [];

        for (let post of postsArray) {
            this.renderPost(post);
            postsBatch.push(post);
            count++;
            if (count % 35 === 0) {
                yield postsBatch;
                postsBatch = [];
            }
        }
        if (postsBatch.length > 0) {
            yield postsBatch;
        }
    }

    async updatePost(id) {
        const post = await this.apiClass.findUniquePost(id);
        const postLikes = JSON.parse(JSON.stringify(post))
        document.querySelector(`.postLikeId${id}`).innerHTML = `${postLikes.likes} Curtidas`
    }

    async renderPost(data) {
        const postElement = document.createElement('div');
        postElement.classList.add("post");
        postElement.setAttribute('metadata', JSON.stringify({ id: data.id, createdAt: data.createdAt, type: data.type }));
        postElement.setAttribute('data-likes', data.likes || 0);
        const response = this.identifier.Identifier(data.content);
        let content = ''; // Inicialize content como uma string vazia

        if (response.type == "link" && response.image == "no") {
            content = `<a href="${data.content}">${data.content}</a>`;
        } else if (response.type == "link" && response.image == "yes") {
            content = `<img src="${data.content}" alt="post ${data.title} image as content">`;
        } else {
            content = `<p>${data.content}</p>`;
        }

        const dataa = {
            author: data.author,
            postId: data.id
        };  


        // Renderiza o post sem aguardar a verificação de "like"
        postElement.innerHTML = `
            <div class="post-header">
                <div class="post-profile-pic">
                    <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="">
                </div>
                <div class="post-profile-infos">
                    <p>@${data.authorName}</p>
                    <p>@${data.author}</p>
                </div>
                <div class="post-options-header">
                </div>
            </div>
            <div class="post-content">
                <p class="title">${data.title}</p>
            </div>
            <div class="post-footer">
                <div class="post-likes" id="UniqueValueIdentifier${data.id}">
                    <div class="heart-container" title="Like">
                        <input type="checkbox" class="checkbox likeCheckbox" id="postInputCheckId${data.id}">
                        <div class="svg-container">
                            <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                            </svg>
                            <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                            </svg>
                            <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="10,10 20,20"></polygon>
                                <polygon points="10,50 20,50"></polygon>
                                <polygon points="20,80 30,70"></polygon>
                                <polygon points="90,10 80,20"></polygon>
                                <polygon points="90,50 80,50"></polygon>
                                <polygon points="80,80 70,70"></polygon>
                            </svg>
                        </div>
                    </div><!--fechamento da heart-container-->
                    <p class='postLikes postLikeId${data.id} likes${data.likes}' value=${data.likes < 0 ? 0 : data.likes}>${data.likes < 0 ? 0 : data.likes} Curtidas</p>
                </div>
                <div class="post-comments">
                    <ion-icon name="chatbubble-ellipses"></ion-icon>
                    <p>Comentar</p>
                </div>
            </div>`;
        const postsContainer = document.querySelector('.posts');
        postsContainer.appendChild(postElement);
        
        const postContentContainer = postElement.querySelector(".post-content");

        if (postContentContainer) {
            postContentContainer.innerHTML += content;
        }

        const allPosts = Array.from(postsContainer.querySelectorAll('.post'));
        const postLikesDiv = document.querySelectorAll('.post-likes');
        /*invertigar se nã9o tem a ver com o momento ou a hierarquia em que renderizo o metadata do item*/
        postLikesDiv.forEach(item => {
            const likedId = data.attributes.likedPostMetadata ? data.attributes.likedPostMetadata.id : null;
            if (likedId) {
                item.setAttribute("metadata", JSON.stringify({ likedID: likedId }));
            } else {
            }
        });

        // Remove todos os posts e adiciona na ordem correta
        postsContainer.innerHTML = '';
        allPosts.forEach(post => postsContainer.appendChild(post));
        allPosts.forEach(async (item) => {
            // Verifica se o post já foi curtido e atualiza o estado do checkbox
            const postAlreadyLiked = await this.apiClass.findLikedPost(dataa);
            const checkbox = document.querySelector(`#postInputCheckId${data.id}`);
            
            checkbox.checked = postAlreadyLiked == true ? true : false

            checkbox.addEventListener('change', (event) => {
                if (this.apiClass.buttonIsPressed === true) {
                    event.preventDefault();
                    checkbox.checked = false; // Impede que o checkbox seja marcado
                    alert('Você não pode curtir este post.');
                }
            });

        })

    }

}