// crm-opps.js
function getOpps() {
    return loadLS(CRM_KEYS.opportunities, []);
}
function getClients() {
    return loadLS(CRM_KEYS.clients, []);
}
function getSettings() {
    return loadLS(CRM_KEYS.settings, []);
}

let editingOppId = null;

// Render tabla
function renderOpps() {
    const tbody = document.getElementById("tablaOportunidades");
    if (!tbody) return;

    tbody.innerHTML = "";

    const crmOpps = getOpps();
    const crmClients = getClients();
    const crmSettings = getSettings();

    crmOpps.forEach(o => {
        const client = crmClients.find(c => c.id === o.clientId);
        const clientName = client ? client.name : "Sin cliente";

        tbody.innerHTML += `
        <tr>
            <td>${o.title}</td>
            <td>${clientName}</td>
            <td>$${o.amount.toLocaleString()}</td>
            <td>${(o.probability * 100).toFixed(0)}%</td>
            <td><span class="badge badge-pendiente">${o.stage}</span></td>
            <td>${o.expectedCloseDate}</td>
            <td>
                <button onclick="editOpp(${o.id})">✏️</button>
                <button onclick="deleteOpp(${o.id})">🗑</button>
            </td>
        </tr>`;
    });
}

// Abrir modal
function openOppModal() {
    editingOppId = null;

    document.getElementById("oppModalTitle").innerText = "Nueva Oportunidad";
    document.getElementById("oppTitle").value = "";
    document.getElementById("oppAmount").value = "";
    document.getElementById("oppProb").value = "0.5";
    document.getElementById("oppClose").value = "";

    // Llenar select de clientes
    const clientSelect = document.getElementById("oppClient");
    clientSelect.innerHTML = "";
    crmClients.forEach(c => {
        clientSelect.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    });

    // Llenar etapas
    const stageSelect = document.getElementById("oppStage");
    stageSelect.innerHTML = "";
    crmSettings.stages.forEach(s => {
        stageSelect.innerHTML += `<option value="${s}">${s}</option>`;
    });

    document.getElementById("oppModal").style.display = "flex";
}

function closeOppModal() {
    document.getElementById("oppModal").style.display = "none";
}

// Guardar
function saveOpp() {
    const title = document.getElementById("oppTitle").value.trim();
    const clientId = Number(document.getElementById("oppClient").value);
    const amount = Number(document.getElementById("oppAmount").value);
    const probability = Number(document.getElementById("oppProb").value);
    const stage = document.getElementById("oppStage").value;
    const closeDate = document.getElementById("oppClose").value;

    if (!title || !clientId || !amount) {
        alert("Completa todos los campos obligatorios");
        return;
    }

    const now = new Date();

    if (editingOppId) {
        const idx = crmOpps.findIndex(o => o.id === editingOppId);
        crmOpps[idx] = {
            ...crmOpps[idx],
            title,
            clientId,
            amount,
            probability,
            stage,
            expectedCloseDate: closeDate
        };
        addActivity(`Se actualizó la oportunidad "${title}".`);
    } else {
        const newOpp = {
            id: Date.now(),
            title,
            clientId,
            amount,
            probability,
            stage,
            expectedCloseDate: closeDate,
            createdAt: now.toISOString().slice(0, 10)
        };
        crmOpps.push(newOpp);
        addActivity(`Se agregó la oportunidad "${title}".`);
    }

    saveLS(CRM_KEYS.opportunities, crmOpps);
    renderOpps();
    closeOppModal();
}

// Editar
function editOpp(id) {
    const o = crmOpps.find(x => x.id === id);
    if (!o) return;

    editingOppId = id;

    const modal = document.getElementById("oppModal");
    document.getElementById("oppModalTitle").innerText = "Editar Oportunidad";

    document.getElementById("oppTitle").value = o.title;
    document.getElementById("oppAmount").value = o.amount;
    document.getElementById("oppProb").value = o.probability;
    document.getElementById("oppClose").value = o.expectedCloseDate;

    // Clientes
    const clientSelect = document.getElementById("oppClient");
    clientSelect.innerHTML = "";
    crmClients.forEach(c => {
        clientSelect.innerHTML += `<option value="${c.id}" ${c.id === o.clientId ? "selected" : ""}>${c.name}</option>`;
    });

    // Etapas
    const stageSelect = document.getElementById("oppStage");
    stageSelect.innerHTML = "";
    crmSettings.stages.forEach(s => {
        stageSelect.innerHTML += `<option ${s === o.stage ? "selected" : ""}>${s}</option>`;
    });

    modal.style.display = "flex";
}

// Eliminar
function deleteOpp(id) {
    const o = crmOpps.find(x => x.id === id);
    if (!o) return;
    if (!confirm("¿Eliminar oportunidad?")) return;

    crmOpps = crmOpps.filter(x => x.id !== id);
    saveLS(CRM_KEYS.opportunities, crmOpps);

    addActivity(`Se eliminó oportunidad "${o.title}".`);

    renderOpps();
}

// Registrar actividad global
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

document.addEventListener("DOMContentLoaded", renderOpps);
