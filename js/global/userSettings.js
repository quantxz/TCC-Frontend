document.addEventListener("DOMContentLoaded", () => {

    const readUserSettings = async (pathToJson) => {
        const response = await fetch(pathToJson);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    const aplyUserSettings = async () => {
        const a = await readUserSettings("/js/global/user.settings.json");
        if(a.userColors.bgColor) {
            document.body.style.backgroundColor = a.userColors.bgColor; 
        }
         
        console.log(a)
    }

    aplyUserSettings()

})