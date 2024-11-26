document.addEventListener("DOMContentLoaded", () => {

    const readUserSettings = async (pathToJson) => {
        const response = await fetch(pathToJson);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    const aplyUserSettings = async () => {

        const userStyleSettings = await readUserSettings("/js/global/user.settings.json");

        for (const [key, value] of Object.entries(userStyleSettings)) {
            
            // Se o valor for um objeto, iterar sobre ele também
            if (typeof value === 'object' && value !== null) {

                for (const [subKey, subValue] of Object.entries(value)) {

                    
                    // Se o sub-valor também for um objeto, iterar sobre ele
                    if (typeof subValue === 'object' && subValue !== null) {
                        for (const [subSubKey, subSubValue] of Object.entries(subValue)) {

                            switch (subSubKey) {
                                case "homePage":
                                    for (const [subSubSubKey, subSubSubValue] of Object.entries(subSubValue)) {
                                        switch (subSubSubKey) {
                                            case "bgColor":
                                                document.querySelector('.feed').style.backgroundColor = subSubSubValue
                                                break;

                                            case "subColor":
                                                if(subSubSubKey === "standart") {
                                                    return
                                                } else {
                                                    document.documentElement.style.setProperty('--dynamic-hover-bg-color', subValue);
                                                };
                                                
                                                break;

                                            case "txtColor":
                                                const containerChildren = document.querySelector('.sidebar-left').children;

                                                for (const child of containerChildren) {
                                               
                                                    child.style.color = subSubSubValue;
                                                }
                                                break;

                                        }
                                    }
                                    break ;
                            }
                        }
                    }
                }
            }
        }
    }

    aplyUserSettings()

})