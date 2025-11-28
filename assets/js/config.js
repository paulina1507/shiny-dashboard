// ---------------------------------------------
// SAFE GETTER
// ---------------------------------------------
function safe(id) {
    return document.getElementById(id) || null;
}

// ---------------------------------------------
// APLICAR TEMA
// ---------------------------------------------
function applyTheme(mode) {
    document.body.setAttribute("data-theme", mode);
    let settings = loadLS(CRM_KEYS.settings, {});
    settings.themeMode = mode;
    saveLS(CRM_KEYS.settings, settings);
}

// ---------------------------------------------
// APLICAR COLOR PRIMARIO
// ---------------------------------------------
function applyPrimary(color) {
    document.documentElement.style.setProperty("--primary", color);
    let settings = loadLS(CRM_KEYS.settings, {});
    settings.primaryColor = color;
    saveLS(CRM_KEYS.settings, settings);
}

// ---------------------------------------------
// PRECARGAR CONFIGURACIÓN EN LA VISTA
// (Esta función SÍ se ejecuta dentro de config.html)
// ---------------------------------------------
// Cargar pantalla de configuración
function loadConfigScreen() {
    const settings = loadLS(CRM_KEYS.settings, { stages: [] });

    // --- Cargar nombre del sistema ---
    document.getElementById("systemName").value = settings.systemName || "Shiny Admin";

    // --- Cargar tema ---
    document.getElementById("themeMode").value = settings.theme || "light";

    // --- Cargar color primario ---
    document.getElementById("primaryColor").value = settings.primaryColor || "#1E90FF";

    // --- Cargar logo ---
    document.getElementById("logoPath").value = settings.logoPath || "assets/img/logo.png";

    // --- Pintar lista de etapas ---
    renderStages();
}


/* ==========================
        ETAPAS CRM
==========================*/

function renderStages() {
    const settings = loadLS(CRM_KEYS.settings, { stages: [] });
    const list = document.getElementById("stageList");

    list.innerHTML = "";

    if (!settings.stages.length) {
        list.innerHTML = "<li style='color:gray;'>No hay etapas registradas</li>";
        return;
    }

    settings.stages.forEach((stage, index) => {
        const li = document.createElement("li");
        li.style.marginBottom = "8px";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        li.innerHTML = `
            <span>${stage}</span>
            <button onclick="removeStage(${index})" 
                    style="background:#ff4d4d;color:white;border:none;padding:3px 5px;border-radius:4px;cursor:pointer;">
                X
            </button>
        `;

        list.appendChild(li);
    });
}

function addStage() {
    const input = document.getElementById("newStage");
    const newStage = input.value.trim();

    if (!newStage) return;

    const settings = loadLS(CRM_KEYS.settings, { stages: [] });
    settings.stages.push(newStage);

    saveLS(CRM_KEYS.settings, settings);
    input.value = "";

    renderStages();  // refrescar lista
}

function removeStage(index) {
    const settings = loadLS(CRM_KEYS.settings, { stages: [] });
    settings.stages.splice(index, 1);

    saveLS(CRM_KEYS.settings, settings);
    renderStages();
}


// ---------------------------------------------
// GUARDAR NOMBRE
// ---------------------------------------------
function saveName() {
    let settings = loadLS(CRM_KEYS.settings, {});
    settings.systemName = safe("systemName").value;
    saveLS(CRM_KEYS.settings, settings);

    // 🔥 actualizar nombre en vivo
    const brand = document.querySelector(".brand-text");
    if (brand) brand.textContent = settings.systemName;

    alert("Nombre actualizado");
}


// ---------------------------------------------
// GUARDAR TEMA
// ---------------------------------------------
function saveTheme() {
    applyTheme(safe("themeMode").value);
    alert("Tema aplicado");
}

// ---------------------------------------------
// GUARDAR COLOR PRIMARIO
// ---------------------------------------------
function savePrimary() {
    applyPrimary(safe("primaryColor").value);
    alert("Color actualizado");
}

// ---------------------------------------------
// GUARDAR LOGO
// ---------------------------------------------
function saveLogo() {
    let settings = loadLS(CRM_KEYS.settings, {});
    settings.logoPath = safe("logoPath").value; // ✔
    saveLS(CRM_KEYS.settings, settings);
    updateLogoLive(settings.logoPath); // 🔥 (lo agregamos abajo)
    alert("Logo actualizado");
}

function updateLogoLive(path) {
    const logoImg = document.querySelector(".brand-icon");
    if (logoImg) {
        logoImg.src = path;
    }
}

function resetDemo() {
    if (!confirm("¿Seguro que quieres restablecer todo el sistema?")) return;

    // Borrar datos
    localStorage.removeItem(CRM_KEYS.clients);
    localStorage.removeItem(CRM_KEYS.opportunities);
    localStorage.removeItem(CRM_KEYS.activity);

    // Restablecer configuración visual + etapas
    saveLS(CRM_KEYS.settings, {
        systemName: "Shiny Admin",
        themeMode: "light",
        primaryColor: "#1E90FF",
        logoPath: "assets/img/logo.png",
        stages: [
            "Nuevo",
            "Contactado",
            "Interesado",
            "Propuesta enviada",
            "Negociación",
            "Cerrado Ganado",
            "Cerrado Perdido"
        ]
    });

    alert("Sistema restablecido a valores iniciales.");
    location.reload();
}
