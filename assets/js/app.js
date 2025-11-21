// DEMO DATA --------------------
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const main = document.querySelector(".main");

    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {
        main.style.marginLeft = "70px";
        localStorage.setItem("sidebarCollapsed", "true");
    } else {
        main.style.marginLeft = "240px";
        localStorage.setItem("sidebarCollapsed", "false");
    }
}

// Guardar estado entre páginas
window.onload = () => {
    const collapsed = localStorage.getItem("sidebarCollapsed") === "true";
    const sidebar = document.getElementById("sidebar");
    const main = document.querySelector(".main");

    if (collapsed) {
        sidebar.classList.add("collapsed");
        main.style.marginLeft = "70px";
    }
};


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
