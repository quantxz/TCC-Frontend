class UserAutenticator {
    private url: string = "http://localhost:3000"

    private async findUser(username: string): Promise<any> {
        const url = `${this.url}/users/${username}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": ENV.authToken
            }
        });

        if (response.status == 500) {
            throw new Error("Ocorreu um erro no servidor")
        }

        const data = await response.json();
        return data; 
    }
    
    public async userExpulser(user: any): Promise<any> {
        try {
            const data = await this.findUser(user.user);

            if (!data) {
                window.location.href = "../../html/login/login.html?error&errorID=1510100"
            } else if (data.status == 404) {
                window.location.href = "../../html/login/login.html?error&errorID=1510100"
            }
        } catch (error) {
            console.log("O seguinte erro ocorreu: " + error)
        }
    }
    
    public loginAutenticator() {
        const user = JSON.parse(JSON.stringify(sessionStorage.getItem("user")));
        if(!user) {
            this.userExpulser({user: "error"});
        } else if(user.user === "" || user.password === "" || user.email === "") {
            this.userExpulser(user);
        }
    }
}
