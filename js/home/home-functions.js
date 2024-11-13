const postForm = document.querySelector('.postForm');
const apiClass = new API();
const functions = new HomeFunctions();


document.addEventListener("DOMContentLoaded", async () => {
    const posts = await apiClass.PostFind();
    functions.postsGenerator(posts).next();
    const likesInput = document.querySelectorAll('.checkbox');
 
    setTimeout(() => {
        likesInput.forEach(input => {
            input.addEventListener('change', (e) => {
                const postElement = e.target.closest('.post'); // Encontra o elemento pai com a classe 'post'
                const title = postElement.querySelector('.title').textContent; // Recupera o título do post
                const postContentContainer = postElement.querySelector('.post-content');
                let content;
                if (postContentContainer.querySelector('a')) {
                    content = postContentContainer.querySelector('a').href; // Recupera o href se for um link
                }
                else if (postContentContainer.querySelector('img')) {
                    content = postContentContainer.querySelector('img').src; // Recupera o src se for uma imagem
                }
                else {
                    content = postContentContainer.querySelector('p:last-child').textContent; // Recupera o texto se for um parágrafo
                }
                const userNickname = postElement.querySelector('.post-profile-infos p:last-child').textContent.slice(1); // Recupera o nickname do usuário
                const metadata = postElement.getAttribute('metadata'); // Obtém o valor do atributo 'metadata'
                const metadataObj = JSON.parse(metadata); // Converte a string JSON em um objeto JavaScript
                const id = metadataObj.id; // Obtém o ID da metadata
                
                const postLikesDiv = e.target.closest('.post-likes');
                const likesMetadata = postLikesDiv.getAttribute('metadata');
                const likesMetadataObj = JSON.parse(likesMetadata); // Converte a string JSON em um objeto JavaScript
                console.log("metadata: " + likesMetadataObj)
                //Dar um jeito do mesmo usuario não poder dar like duas vezes
                const data = {
                    id,
                    title,
                    content,
                    userNickname
                }

                const likedTable = {
                    author: userNickname,
                    postId: id
                }

                if (e.target.checked) {
                    apiClass.PostLike(data, likedTable); // Envia os dados para a função PostLike
                } else {
                    const postLikedId = likesMetadataObj.likedID; // Obtém o ID da metadata
                    const unlikedTable = {
                        id: postLikedId,
                        author: userNickname,
                        postId: id
                    }

                    apiClass.PostUnlike(data, unlikedTable); // Envia os dados para a função PostUnlike
                }
            });
        });
    }, 1000)


    const includer = new Include();
    const postOptionsHeader = document.querySelectorAll(".post-options-header");
    postOptionsHeader.forEach(header => {
        const include = document.createElement("include");
        include.setAttribute("src", "./components/post-headers-options.html");
        include.setAttribute("type", "import")
        header.appendChild(include)
    })
    includer.ReadHTML("import");

})


postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.querySelector('#file-input');
    const file = fileInput.files[0];

    const data = {
        title: document.querySelector('#title').value,
        content: file ? file : document.querySelector('#input-modal-post-content').value,
        userNickname: sessionStorage.getItem("userNickname")
    };

    await apiClass.Post(data);

    location.reload()
});

const posts = document.querySelectorAll(".posts");
const postsComments = document.querySelectorAll(".commentsOfPost");

setTimeout(() => {
    const CommentFuncs = new CommentsFunctions();

    document.querySelectorAll(".commentsOfPost").forEach(post => {
        const DivPost = post.closest('.post'); // Aqui você encontra o post pai de forma eficiente
        console.log(post)
        // Adiciona um listener para o evento de clique no container de comentários
        post.addEventListener("click", async (e) => {
            // Verifica se o clique ocorreu dentro de um comentário
                document.querySelector(".comment-modal-container").id = "comment-modal-container";
                document.querySelector(".post-focus").prepend(DivPost);
                document.querySelector(".post-focus").id = "post-focus";
                DivPost.classList.remove("post");
                DivPost.classList.add("post-focused");
                window.scrollTo(0, 500);
                document.querySelector(".posts").style.display = "none";
    
                // Obtém o ID do post de dentro da metadata do post
                const { id } = JSON.parse(DivPost.getAttribute('metadata'));
                const comments = await CommentFuncs.getComments(id); // Chama a função uma única vez

        });
    });
    

    document.querySelectorAll(".commentLikeInput").forEach(input => {
        input.addEventListener("change", () => {
            apiClass.PostUnlike(data, unlikedTable);
        })
    })

    document.querySelectorAll(".likeCheckbox").forEach(input => {
        input.addEventListener('change', (e) => {
            const postElement = e.target.closest('.post-focused'); // Encontra o elemento pai com a classe 'post'
            const title = postElement.querySelector('.title').textContent; // Recupera o título do post
            const postContentContainer = postElement.querySelector('.post-content');
            let content;
            if (postContentContainer.querySelector('a')) {
                content = postContentContainer.querySelector('a').href; // Recupera o href se for um link
            }
            else if (postContentContainer.querySelector('img')) {
                content = postContentContainer.querySelector('img').src; // Recupera o src se for uma imagem
            }
            else {
                content = postContentContainer.querySelector('p:last-child').textContent; // Recupera o texto se for um parágrafo
            }
            const userNickname = postElement.querySelector('.post-profile-infos p:last-child').textContent.slice(1); // Recupera o nickname do usuário
            const metadata = postElement.getAttribute('metadata'); // Obtém o valor do atributo 'metadata'
            const metadataObj = JSON.parse(metadata); // Converte a string JSON em um objeto JavaScript
            const id = metadataObj.id; // Obtém o ID da metadata

            const postLikesDiv = e.target.closest('.post-likes');
            const likesMetadata = postLikesDiv.getAttribute('metadata');
            const likesMetadataObj = JSON.parse(likesMetadata); // Converte a string JSON em um objeto JavaScript
            console.log("metadata: " + likesMetadataObj)
            //Dar um jeito do mesmo usuario não poder dar like duas vezes
            const data = {
                id,
                title,
                content,
                userNickname
            }

            const likedTable = {
                author: userNickname,
                postId: id
            }

            if (e.target.checked) {
                apiClass.PostLike(data, likedTable); // Envia os dados para a função PostLike
            } else {
                const postLikedId = likesMetadataObj.likedID; // Obtém o ID da metadata
                const unlikedTable = {
                    id: postLikedId,
                    author: userNickname,
                    postId: id
                }

                apiClass.PostUnlike(data, unlikedTable); // Envia os dados para a função PostUnlike
            }
        });
    });
}, 1000)