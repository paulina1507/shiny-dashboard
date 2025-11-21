// Cargar valores existentes
document.getElementById("systemName").value = localStorage.getItem("systemName") || "Shiny Admin Panel";
document.getElementById("themeMode").value = localStorage.getItem("themeMode") || "light";
document.getElementById("primaryColor").value = localStorage.getItem("primaryColor") || "#1E90FF";
document.getElementById("logoPath").value = localStorage.getItem("logoPath") || "assets/img/logo.png";

// Guardar nombre del sistema
function saveName() {
    localStorage.setItem("systemName", document.getElementById("systemName").value);
    alert("Nombre actualizado");
}

// === MODO OSCURO REAL ===
function saveTheme() {
    const mode = document.getElementById("themeMode").value;
    localStorage.setItem("themeMode", mode);
    applyTheme(mode);
    alert("Tema aplicado");
}

function applyTheme(mode) {
    document.body.setAttribute("data-theme", mode);
}

// Al cargar la página
const initialTheme = localStorage.getItem("themeMode") || "light";
document.body.setAttribute("data-theme", initialTheme);
document.getElementById("themeMode").value = initialTheme;


// Guardar color primario
function savePrimary() {
    localStorage.setItem("primaryColor", document.getElementById("primaryColor").value);
    alert("Color primario actualizado (DEMO)");
}

// Guardar ruta de logo (simulado)
function saveLogo() {
    localStorage.setItem("logoPath", document.getElementById("logoPath").value);
    alert("Logo actualizado (DEMO)");
}
