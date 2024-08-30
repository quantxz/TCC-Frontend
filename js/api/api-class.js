class API extends ENV {

    constructor() {
        super()
    }

    //https://tcc-u2qf.onrender.com
    async loginRequest(username, password, email) {
        try {
            const response = await fetch(`${this.url}/users/login`, {
                method: "POST",
                body: JSON.stringify({
                    nickname: username,
                    password: password,
                    email: email
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ENV.authToken
                }
            });

            if (response.ok) {
                window.location.href = "../../html/home/home.html";
            } else {
                const data = await response.json();
                switch (true) {
                    case data.message === "Erro de validação":
                    case data.status === 400 && data.message === "dados do usuario incorretos":
                        if (
                            data.errors[0].constraints.matches &&
                            data.errors[0].constraints.matches.includes("a senha deve conter uma letra maiuscula, uma letra minuscula e um caractere especial")
                        ) {
                            window.location.href = "../../html/login/login.html?error&errorID=153032";
                        } else if (data.errors[0].constraints.isEmail && data.errors[0].constraints.isEmail.includes("Formato de email Invalido")) {
                            window.location.href = "../../html/login/login.html?error&errorID=153031";
                        } else if (
                            data.errors[0].constraints.matches &&
                            data.errors[0].constraints.matches.includes("Formato de email Invalido") &&
                            data.errors[0].constraints.matches.includes("a senha deve conter uma letra maiuscula, uma letra minuscula e um caractere especial")
                        ) {
                            window.location.href = "../../html/login/login.html?error&errorID=153030";
                        }
                        break;

                    case (data.status === 400 && data.message === "Internal Server Error"):
                        window.location.href = "../../html/errors/404-page.html";
                        break;

                    // na proxima vez que o docker for atualizado tem que mudar a data.message aqui de "Internal server error" para "Usuario não encontrado email ou nickname incorretos"
                    case (data.status === 500 && data.message === "Internal Server Error"):
                        window.location.href = "../../html/login/login.html?error&errorID=153034"
                        break;

                    default:
                        window.location.href = "../../html/login/login.html";
                        break;
                }
            }
        } catch (error) {
            return error
        }
    }

    async registerUser(name, surname, nickname, email, password, confirmPassword) {
        if (name !== "" && password !== "" && email !== "" && surname !== "" && nickname !== "" && password === confirmPassword) {

            try {
                const response = await fetch(`${this.url}/users/register`, {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        surname,
                        email,
                        password,
                        nickname
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": ENV.authToken
                    }
                });

                const data = await response.json();

                window.location.href = "../../html/home/home.html";
            } catch (error) {
                console.error("Erro na requisição:", error);
                // Lidar com erro na requisição
            }
        }
    }

    async findUser(username) {
        const url = `${this.url}/users/` + username
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": ENV.authToken
            }
        });
        const data = response.json()
        return data
    }

    async Post(data) {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append(data.content instanceof File ? 'file' : 'content', data.content);
            formData.append('userNickname', data.userNickname);

            const response = await fetch(`http://localhost:3000/posts/create`, {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();


            if (response.ok) {
                window.alert('Post feito com sucesso')
                console.log('Post criado com sucesso');
            } else {
                window.alert('Ops! parece que estamos com um erro em nossos servidores.\nTente novamente em alguns minutos');
                console.error('Erro:', responseData);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    async PostFind() {
        try {
            const response = await fetch(`http://localhost:3000/posts/get-all`);
            if (!response.ok) {
                throw new Error('Erro ao buscar posts');
            }
            const posts = await response.json();
            
            return posts;
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    async findUniquePost(id) {
        try {
            const response = await fetch(`http://localhost:3000/posts/post/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar post');
            }
            const post = await response.json();


            return post;
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    async PostLike(data, likedPostsData) {

        try {

            const response = await fetch(`http://localhost:3000/posts/likes?type=Post&reqType=like`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
          

            /* Atualiza se o post foi marcado com like ou não no backend*/
            const postLikedTable = await fetch(`http://localhost:3000/posts/likedPosts?type=like`, {
                method: "PATCH",
                body: JSON.stringify(likedPostsData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            functions.updatePost(data.id)

            if (!response.ok) {
                throw new Error('Erro ao buscar posts');
            }
            const postLiked = await response.json();
            return postLiked;
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    async PostUnlike(data, likedPostsData) {
        try {
            console.log(likedPostsData)
            const response = await fetch(`http://localhost:3000/posts/likes?type=Post&reqType=unlike`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const postUnlikedTable = await fetch(`http://localhost:3000/posts/likedPosts?type=unlike`, {
                method: "PATCH",
                body: JSON.stringify(likedPostsData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            functions.updatePost(data.id)

            if (!response.ok) {
                console.log("a\n")
                throw new Error('Erro ao buscar posts\n');
            }
            const postUnliked = await response.json();
            return postUnliked;
        } catch (error) {
            console.error('Erro na requisição:', error, "\n");
        }
    }

    async findLikedPost(data) {
        try {
            const response = await fetch(`${this.url}/posts/likedPosts`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseData = await response.json();
            console.log(responseData)
            if (responseData.postInfo.booleanValue == true) {

                return true
            } else {

                return false
            }

        } catch (error) {
            console.error('Error in findLikedPost:', error);
        }
    }
}