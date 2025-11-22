// SAFE GETTERS
function safe(id) {
    return document.getElementById(id) || null;
}

// APLICAR TEMA (solo BODY porque tu CSS usa body[data-theme])
function applyTheme(mode) {
    document.body.setAttribute("data-theme", mode);
    localStorage.setItem("themeMode", mode);
}

// APLICAR COLOR PRIMARIO
function applyPrimary(color) {
    localStorage.setItem("primaryColor", color);
    document.documentElement.style.setProperty('--primary', color);
}

// RECUPERAR CONFIGURACIÓN AL CARGAR
document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("themeMode") || "light";
    applyTheme(theme);

    const primary = localStorage.getItem("primaryColor") || "#1E90FF";
    applyPrimary(primary);

    // Solo si existen los inputs (en config.php)
    if (safe("themeMode")) safe("themeMode").value = theme;
    if (safe("primaryColor")) safe("primaryColor").value = primary;

    if (safe("systemName")) {
        safe("systemName").value = localStorage.getItem("systemName") || "Shiny Admin";
    }

    if (safe("logoPath")) {
        safe("logoPath").value = localStorage.getItem("logoPath") || "assets/img/logo.png";
    }

    // Reflejar nombre en header
    const systemTitle = document.querySelector("#system-title");
    if (systemTitle) systemTitle.textContent = localStorage.getItem("systemName") || "Shiny Admin";
});

// GUARDAR NOMBRE DEL SISTEMA
function saveName() {
    const value = safe("systemName").value;
    localStorage.setItem("systemName", value);
    alert("Nombre actualizado");
}

// GUARDAR TEMA
function saveTheme() {
    applyTheme(safe("themeMode").value);
    alert("Tema aplicado");
}

// GUARDAR COLOR
function savePrimary() {
    applyPrimary(safe("primaryColor").value);
    alert("Color actualizado");
}

// GUARDAR LOGO
function saveLogo() {
    localStorage.setItem("logoPath", safe("logoPath").value);
    alert("Logo actualizado");
}
