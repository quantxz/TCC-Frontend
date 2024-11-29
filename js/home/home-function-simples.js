const Button = document.querySelector('.button-trade');
const SideBarLeft = document.querySelector('.sidebar-left');
const Comunidades = document.getElementById('Comunidades');

const MenuOfLeft = () => {

    if (SideBarLeft.style.display == "none") {
        SideBarLeft.style.display = "block";
        Comunidades.style.display = "none";
    } else {
        SideBarLeft.style.display = "none"
        SideBarLeft.style.display = "none";
        Comunidades.style.display = "block";
    }
};


Button.addEventListener("click", MenuOfLeft);
