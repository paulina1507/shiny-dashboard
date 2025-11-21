let users = JSON.parse(localStorage.getItem("users")) || [];
let editingId = null;

function renderUsers() {
    const tbody = document.getElementById("tablaUsuarios");
    tbody.innerHTML = "";

    users.forEach(u => {
        tbody.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>
                    <button onclick="editUser(${u.id})">✏️</button>
                    <button onclick="deleteUser(${u.id})">🗑</button>
                </td>
            </tr>
        `;
    });
}

renderUsers();

function openUserModal() {
    document.getElementById("userModal").style.display = "block";
    editingId = null;
}

function closeUserModal() {
    document.getElementById("userModal").style.display = "none";
}

function saveUser() {
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const role = document.getElementById("userRole").value;

    if (!name || !email || !role) {
        alert("Completa todos los campos");
        return;
    }

    if (editingId) {
        const index = users.findIndex(u => u.id === editingId);
        users[index] = { id: editingId, name, email, role };
    } else {
        const id = Date.now();
        users.push({ id, name, email, role });
    }

    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
    closeUserModal();
}

function editUser(id) {
    const u = users.find(x => x.id === id);

    editingId = id;
    document.getElementById("userName").value = u.name;
    document.getElementById("userEmail").value = u.email;
    document.getElementById("userRole").value = u.role;

    document.getElementById("modalTitle").innerText = "Editar Usuario";
    document.getElementById("userModal").style.display = "block";
}

function deleteUser(id) {
    if (!confirm("¿Eliminar usuario?")) return;

    users = users.filter(u => u.id !== id);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
}
