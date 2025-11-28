/* ==========================================================
      ROUTER SPA PARA SHINY DASHBOARD (VERSIÓN MEJORADA)
   ========================================================== */

function initRouter() {

    // Detectar clicks en el menú
    document.addEventListener("click", (e) => {
        const link = e.target.closest("[data-view]");
        if (!link) return;

        e.preventDefault();
        const view = link.getAttribute("data-view");
        loadView(view);
    });

    // Vista inicial
    const urlParams = new URLSearchParams(window.location.search);
    const urlView = urlParams.get("view");

    const startView =
        urlView ||
        localStorage.getItem("currentView") ||
        "dashboard";

    loadView(startView);
}

/* ==========================================================
      Cargar una vista desde /views/VISTA.html
   ========================================================== */

async function loadView(viewName) {
    const container = document.getElementById("view-container");
    if (!container) return;

    localStorage.setItem("currentView", viewName);

    try {
        const res = await fetch(`views/${viewName}.html`);

        if (!res.ok) {
            container.innerHTML = `<p>Error: la vista <strong>${viewName}</strong> no existe.</p>`;
            return;
        }

        const html = await res.text();
        container.innerHTML = html;

        activateMenuItem(viewName);
        updateHeaderTitle(viewName);
        updateDocumentTitle(viewName);

        // Ejecutar scripts dentro del HTML
        executeInlineScripts(container);

        // ⭐ EJECUTAR SCRIPT DE LA VISTA
        runViewInit(viewName);

    } catch (error) {
        container.innerHTML = `<p>Error cargando vista: ${viewName}</p>`;
        console.error(error);
    }
}

/* ==========================================================
      Marcar el menú activo
   ========================================================== */

function activateMenuItem(view) {
    const items = document.querySelectorAll(".menu-item");

    items.forEach(i => {
        const v = i.dataset.view;
        if (v === view) i.classList.add("active");
        else i.classList.remove("active");
    });
}

/* ==========================================================
      Actualizar título del header
   ========================================================== */

function updateHeaderTitle(view) {
    const titles = {
        dashboard: "Panel General",
        clientes: "Clientes",
        oportunidades: "Oportunidades",
        actividad: "Actividad del Sistema",
        config: "Configuración del Sistema",
        kanban: "Tablero Kanban"          // ⭐ NUEVO
    };

    const h1 = document.querySelector("#system-title");
    if (h1) h1.textContent = titles[view] || "Shiny Admin";
}

/* ==========================================================
      Título de la pestaña del navegador
   ========================================================== */

function updateDocumentTitle(view) {
    const brand = localStorage.getItem("systemName") || "Shiny Admin";

    const titles = {
        dashboard: "Panel General",
        clientes: "Clientes",
        oportunidades: "Oportunidades",
        actividad: "Actividad",
        config: "Configuración",
        kanban: "Tablero Kanban"          // ⭐ NUEVO
    };

    document.title = `${brand} - ${titles[view] || "Dashboard"}`;
}

/* ==========================================================
      Ejecutar scripts internos de cada vista
   ========================================================== */

function executeInlineScripts(container) {
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        if (oldScript.innerText) newScript.innerText = oldScript.innerText;
        if (oldScript.src) newScript.src = oldScript.src;
        document.body.appendChild(newScript);
        oldScript.remove();
    });
}

/* ==========================================================
      Inicializadores por vista
   ========================================================== */
function runViewInit(view) {
    switch (view) {
        case "kanban":
            if (typeof initKanban === "function") 
                initKanban();
            break;

        case "clientes":
            if (typeof initClientes === "function") initClientes();
            break;

        case "oportunidades":
            if (typeof initOportunidades === "function") initOportunidades();
            break;

        case "actividad":
            if (typeof initActividad === "function") initActividad();
            break;

        case "config":
            if (typeof initConfig === "function") initConfig();
            break;
    }
}

