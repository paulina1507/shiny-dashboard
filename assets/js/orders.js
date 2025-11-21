let orders = JSON.parse(localStorage.getItem("orders")) || [
    { id: 1, client: "Juan Pérez", total: 250, status: "Pendiente", date: "2025-01-15" },
    { id: 2, client: "Ana López", total: 480, status: "Enviado", date: "2025-01-16" },
    { id: 3, client: "Carlos Ruiz", total: 110, status: "Pagado", date: "2025-01-17" }
];

localStorage.setItem("orders", JSON.stringify(orders));

let selectedOrderId = null;

function renderOrders() {
    const tbody = document.getElementById("tablaPedidos");
    tbody.innerHTML = "";

    orders.forEach(o => {
        tbody.innerHTML += `
            <tr>
                <td>${o.id}</td>
                <td>${o.client}</td>
                <td>$${o.total}</td>
                <td><span class="badge badge-${o.status.toLowerCase()}">${o.status}</span></td>
                <td>${o.date}</td>
                <td>
                    <button onclick="openOrderModal(${o.id})">🔍 Ver</button>
                </td>
            </tr>
        `;
    });
}

renderOrders();

function openOrderModal(id) {
    const o = orders.find(x => x.id === id);

    selectedOrderId = id;

    document.getElementById("orderId").textContent = o.id;
    document.getElementById("orderClient").textContent = o.client;
    document.getElementById("orderTotal").textContent = o.total;
    document.getElementById("orderDate").textContent = o.date;
    document.getElementById("orderStatus").value = o.status;

    document.getElementById("orderModal").style.display = "flex";
}

function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
}

function saveOrderStatus() {
    const newStatus = document.getElementById("orderStatus").value;

    const index = orders.findIndex(o => o.id === selectedOrderId);
    orders[index].status = newStatus;

    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
    closeOrderModal();
}
