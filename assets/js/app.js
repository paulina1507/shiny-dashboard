function toggleSidebar() {
    const app = document.getElementById("app-container");

    // Alternar estado global
    app.classList.toggle("sidebar-collapsed");

    // Guardar preferencia solo en desktop
    if (window.innerWidth > 768) {
        const isCollapsed = app.classList.contains("sidebar-collapsed");
        localStorage.setItem("sidebarCollapsed", isCollapsed);
    }
}

function restoreSidebarState() {
    const app = document.getElementById("app-container");
    const saved = localStorage.getItem("sidebarCollapsed") === "true";

    if (window.innerWidth > 768) {
        // Desktop: restaurar estado guardado
        if (saved) {
            app.classList.add("sidebar-collapsed");
        } else {
            app.classList.remove("sidebar-collapsed");
        }
    } else {
        // Móvil: siempre colapsado
        app.classList.add("sidebar-collapsed");
    }
}


(function applyLogo() {
    const settings = loadLS(CRM_KEYS.settings, {});
    if (settings.logoPath) {
        const logoImg = document.querySelector(".brand-icon");
        if (logoImg) logoImg.src = settings.logoPath;
    }
})();


const users = [
    {id: 1, name: "Juan"},
    {id: 2, name: "Ana"},
    {id: 3, name: "Pedro"}
];

localStorage.setItem("users", JSON.stringify(users));

localStorage.setItem("products", JSON.stringify([
    {id: 1}, {id: 2}, {id: 3}, {id: 4}
]));

localStorage.setItem("orders", JSON.stringify([
    {id: 1}, {id: 2}
]));

// SHOW COUNTS --------------------
document.getElementById("countUsers").innerText = JSON.parse(localStorage.getItem("users")).length;
document.getElementById("countProducts").innerText = JSON.parse(localStorage.getItem("products")).length;
document.getElementById("countOrders").innerText = JSON.parse(localStorage.getItem("orders")).length;

// Notifications
document.getElementById("notifications").innerHTML = `
    <li>Nuevo usuario registrado</li>
    <li>Pedido #2 actualizado</li>
    <li>Ticket urgente abierto</li>
`;
