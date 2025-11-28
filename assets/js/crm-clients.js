// ===============================
// CRM CLIENTES (CRUD + Notas)
// ===============================

let crmClients = loadLS(CRM_KEYS.clients, []);
let editingClientId = null;

// Renderizar tabla
function renderClients() {
    const tbody = document.getElementById("tablaClientes");
    if (!tbody) return;

    tbody.innerHTML = "";

    crmClients.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>${c.phone || "-"}</td>
                <td>${c.source || "-"}</td>
                <td>${c.status || "-"}</td>
                <td>${c.lastContact || "-"}</td>
                <td>
                    <button onclick="editClient(${c.id})">✏️</button>
                    <button onclick="deleteClient(${c.id})">🗑</button>
                </td>
            </tr>
        `;
    });
}

// Abrir modal
function openClientModal() {
    editingClientId = null;

    document.getElementById("clientModalTitle").innerText = "Nuevo Cliente";
    document.getElementById("clientName").value = "";
    document.getElementById("clientEmail").value = "";
    document.getElementById("clientPhone").value = "";
    document.getElementById("clientSource").value = "";
    document.getElementById("clientStatus").value = "Nuevo";
    document.getElementById("clientNote").value = "";

    document.getElementById("clientModal").classList.add("show");
}

function closeClientModal() {
    document.getElementById("clientModal").classList.remove("show");
}

// Guardar cliente
function saveClient() {
    const name = document.getElementById("clientName").value.trim();
    const email = document.getElementById("clientEmail").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const source = document.getElementById("clientSource").value.trim();
    const status = document.getElementById("clientStatus").value;
    const noteText = document.getElementById("clientNote").value.trim();

    if (!name || !email) {
        alert("Nombre y correo son obligatorios");
        return;
    }

    const today = new Date().toISOString().slice(0, 10);

    // EDITAR
    if (editingClientId) {
        const idx = crmClients.findIndex(c => c.id === editingClientId);
        if (idx === -1) return;

        crmClients[idx] = {
            ...crmClients[idx],
            name,
            email,
            phone,
            source,
            status,
            lastContact: today
        };

        if (noteText) {
            crmClients[idx].notes.push({ text: noteText, date: today });
            addActivity(`Se agregó una nota al cliente ${name}.`);
        } else {
            addActivity(`Se actualizó el cliente ${name}.`);
        }
    } else {
        // NUEVO
        const newId = Date.now();
        crmClients.push({
            id: newId,
            name,
            email,
            phone,
            source,
            status,
            lastContact: today,
            notes: noteText ? [{ text: noteText, date: today }] : []
        });

        addActivity(`Se creó el cliente ${name}.`);
    }

    saveLS(CRM_KEYS.clients, crmClients);
    renderClients();
    closeClientModal();
}

// Editar cliente
function editClient(id) {
    const c = crmClients.find(x => x.id === id);
    if (!c) return;

    editingClientId = id;

    document.getElementById("clientModalTitle").innerText = "Editar Cliente";
    document.getElementById("clientName").value = c.name;
    document.getElementById("clientEmail").value = c.email;
    document.getElementById("clientPhone").value = c.phone || "";
    document.getElementById("clientSource").value = c.source || "";
    document.getElementById("clientStatus").value = c.status || "Nuevo";
    document.getElementById("clientNote").value = "";

    document.getElementById("clientModal").style.display = "flex";
}

// Eliminar cliente
function deleteClient(id) {
    const c = crmClients.find(x => x.id === id);
    if (!c) return;

    if (!confirm("¿Eliminar cliente?")) return;

    crmClients = crmClients.filter(x => x.id !== id);
    saveLS(CRM_KEYS.clients, crmClients);

    addActivity(`Se eliminó el cliente ${c.name}.`);

    renderClients();
}

// Registrar actividad
function addActivity(text) {
    let activity = loadLS(CRM_KEYS.activity, []);
    activity.unshift({
        id: Date.now(),
        type: "manual",
        text,
        date: new Date().toLocaleString()
    });

    saveLS(CRM_KEYS.activity, activity);
}

document.addEventListener("DOMContentLoaded", renderClients);
