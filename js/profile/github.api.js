// 
const apiReq = async (nickname) => {
    const nick = nickname
    const res = await fetch(`https://api.github.com/users/quantxz/repos`);
    return res
}

const render = async () => {
    const res = await apiReq("quantxz");
    const data = await res.json()
    const items = document.querySelectorAll(".project-item");
    const linguas = document.querySelectorAll(".principalLinguagem")
    for (let i = 0; i < 3; i++) {

        switch (i) {
            case 0:
                items[i].children[i].textContent = data[i].full_name
                items[i + 1].children[i].textContent = data[i + 1].full_name
                items[i + 2].children[i].textContent = data[i + 2].full_name
                // deve ter uma forma mais eficiente de fazer isso aqui, mas fds, se ta funcionando ta certo 👍
                linguas[i].textContent = data[i].language != null ? data[i].language : "sem descrição"
                linguas[i + 1].textContent = data[i + 1].language != null ? data[i + 1].language : "sem descrição"
                linguas[i + 2].textContent = data[i + 2].language != null ? data[i + 2].language : "0 linguagens"
                
                break;
            case 1:
                items[i - 1].children[i].textContent = data[i - 1].description != null ? data[i - 1].description : "sem descrição"
                items[i].children[i].textContent = data[i].description != null ? data[i].description : "sem descrição"
                items[i + 1].children[i].textContent = data[i + 1].description != null ? data[i].description : "sem descrição"
                break;
            case 2:
                items[i - 2].children[i].href = data[i - 2].html_url
                items[i - 1].children[i].href = data[i - 1].html_url
                items[i].children[i].href = data[i].html_url
                break;
        }
        console.log(data[i])
    }
}

render()