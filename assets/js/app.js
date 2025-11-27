function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");

    if (window.innerWidth > 768) {
        localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const saved = localStorage.getItem("sidebarCollapsed");

    if (window.innerWidth <= 768) {
        sidebar.classList.add("collapsed");
    } else {
        if (saved === "true") {
            sidebar.classList.add("collapsed");
        } else {
            sidebar.classList.remove("collapsed");
        }
    }
});


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
