/* ==========================
   CONFIGURACIÓN DEFAULT
===========================*/
const DEFAULT_STAGES = [
    "Prospecto",
    "Contactado",
    "Cotizando",
    "Negociación",
    "Cerrado"
];

/* ==========================
   CARGAR KANBAN
===========================*/
function loadKanban() {

    // Cargar settings con fallback
    const settings = loadLS(CRM_KEYS.settings, { stages: DEFAULT_STAGES });
    const stages = settings.stages;

    const opps = loadLS(CRM_KEYS.opportunities, []);
    const board = document.getElementById("kanbanBoard");

    board.innerHTML = "";

    /* ----- Crear columnas ----- */
    stages.forEach(stage => {

        const col = document.createElement("div");
        col.classList.add("kanban-column");
        col.setAttribute("data-stage", stage);

        col.innerHTML = `
            <h3>${stage}</h3>
            <div class="kanban-items" data-stage="${stage}"></div>
        `;

        board.appendChild(col);
    });

    /* ----- Insertar cards ----- */
    opps.forEach(op => {

        const item = document.createElement("div");
        item.classList.add("kanban-item");
        item.setAttribute("draggable", "true");
        item.setAttribute("data-id", op.id);

        item.innerHTML = `<strong>${op.title}</strong>`;

        const col = board.querySelector(`[data-stage="${op.stage}"] .kanban-items`);
        if (col) col.appendChild(item);

        addDragEvents(item);
    });

    addColumnDropEvents();
}

/* ==========================
   OBTENER NOMBRE CLIENTE
===========================*/
function getClientName(id) {
    const clients = loadLS(CRM_KEYS.clients, []);
    const c = clients.find(x => x.id === id);
    return c ? c.name : "Sin cliente";
}

/* ==========================
       DRAG & DROP CARDS
===========================*/
function addDragEvents(item) {

    item.addEventListener("dragstart", e => {
        e.dataTransfer.setData("opportunityId", item.dataset.id);
        item.style.opacity = "0.5";
    });

    item.addEventListener("dragend", () => {
        item.style.opacity = "1";
    });
}


/* ==========================
    DRAG & DROP COLUMNAS
===========================*/
function addColumnDropEvents() {

    document.querySelectorAll(".kanban-items").forEach(col => {

        col.addEventListener("dragover", e => {
            e.preventDefault();
            col.style.background = "#eef6ff";
        });

        col.addEventListener("dragleave", () => {
            col.style.background = "transparent";
        });

        col.addEventListener("drop", e => {
            e.preventDefault();

            col.style.background = "transparent";

            const id = Number(e.dataTransfer.getData("opportunityId"));
            const opps = loadLS(CRM_KEYS.opportunities, []);
            const idx = opps.findIndex(o => o.id === id);
            const newStage = col.dataset.stage;

            if (idx >= 0) {
                opps[idx].stage = newStage;
                saveLS(CRM_KEYS.opportunities, opps);
            }

            loadKanban(); // recargar vista
        });
    });
}

/* ==========================
      INICIALIZACIÓN REAL
===========================*/
function initKanban() {
    const board = document.getElementById("kanbanBoard");

    // Si la vista aún no tiene el contenedor, esperar y reintentar
    if (!board) {
        console.warn("⏳ Kanban aún no está listo. Reintentando...");
        setTimeout(initKanban, 50);
        return;
    }

    loadKanban();
}
