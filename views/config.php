<?php
session_start();
if (!isset($_SESSION['demo_login'])) {
    header("Location: ../index.php");
    exit;
}

$pageTitle = "Configuración del Sistema";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Configuración - Mini CRM</title>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>

<!-- Aplicar Tema y Color ANTES de pintar -->
<script>
    const theme = localStorage.getItem("themeMode") || "light";
    document.body.setAttribute("data-theme", theme);
    const primary = localStorage.getItem("primaryColor");
    if (primary) document.documentElement.style.setProperty('--primary', primary);
</script>

<?php include "../components/sidebar.php"; ?>

<div class="main-content">

    <?php include "../components/header.php"; ?>

    <div class="content">

        <h2>Configuración del Sistema</h2>

        <div class="settings-grid">

            <!-- Nombre del sistema -->
            <div class="setting-card">
                <h3>Nombre del Sistema</h3>
                <input type="text" id="systemName">
                <button class="btn-blue" onclick="saveName()">Guardar</button>
            </div>

            <!-- Tema -->
            <div class="setting-card">
                <h3>Tema del Panel</h3>
                <select id="themeMode">
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                </select>
                <button class="btn-blue" onclick="saveTheme()">Aplicar</button>
            </div>

            <!-- Color primario -->
            <div class="setting-card">
                <h3>Color Primario</h3>
                <select id="primaryColor">
                    <option value="#1E90FF">Azul vivo</option>
                    <option value="#0B5FBD">Azul oscuro</option>
                    <option value="#005EFF">Azul eléctrico</option>
                    <option value="#8A2BE2">Morado</option>
                    <option value="#FF33A8">Rosa fuerte</option>
                </select>
                <button class="btn-blue" onclick="savePrimary()">Guardar</button>
            </div>

            <!-- Logo del negocio -->
            <div class="setting-card">
                <h3>Logo (URL o ruta)</h3>
                <input type="text" id="logoPath" placeholder="assets/img/logo.png">
                <button class="btn-blue" onclick="saveLogo()">Guardar</button>
            </div>

            <!-- Etapas del embudo -->
            <div class="setting-card">
                <h3>Etapas del Embudo (CRM)</h3>

                <ul id="stageList" style="margin-bottom:10px;"></ul>

                <input type="text" id="newStage" placeholder="Nueva etapa...">
                <button class="btn-blue" onclick="addStage()">Agregar</button>
            </div>

            <!-- Reset demo -->
            <div class="setting-card">
                <h3>Restablecer Sistema Demo</h3>
                <p style="margin-top:0; color:var(--text-light); font-size:14px;">
                    Elimina todos los datos (clientes, oportunidades, actividad y configuración).
                </p>
                <button class="btn-black" onclick="resetDemo()">Restablecer</button>
            </div>

        </div>

    </div>

</div>

<script src="../assets/js/crm-data.js"></script>

<script>
// ===============================
// ETAPAS DEL EMBUDO
// ===============================
let crmSettings = loadLS("crm_settings", null);

function renderStages() {
    const ul = document.getElementById("stageList");
    if (!ul) return;

    crmSettings = loadLS("crm_settings", crmSettings);
    ul.innerHTML = "";

    crmSettings.stages.forEach((s, i) => {
        ul.innerHTML += `
            <li style="margin-bottom:6px;">
                ${s}
                <button style="margin-left:10px;" onclick="removeStage(${i})">🗑</button>
            </li>
        `;
    });
}

function addStage() {
    const input = document.getElementById("newStage");
    const value = input.value.trim();
    if (!value) return alert("Ingresa una etapa");

    crmSettings.stages.push(value);
    saveLS("crm_settings", crmSettings);

    input.value = "";
    renderStages();
}

function removeStage(index) {
    if (!confirm("¿Eliminar etapa del embudo?")) return;

    crmSettings.stages.splice(index, 1);
    saveLS("crm_settings", crmSettings);
    renderStages();
}

// ===============================
// RESET DEMO
// ===============================
function resetDemo() {
    if (!confirm("¿Restablecer el sistema demo completo?")) return;

    localStorage.removeItem("crm_clients");
    localStorage.removeItem("crm_opportunities");
    localStorage.removeItem("crm_activity");
    localStorage.removeItem("crm_settings");

    alert("Sistema demo restablecido. Recarga la página.");
    location.reload();
}

// ===============================
// INICIALIZAR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    renderStages();
});
</script>

<script src="../assets/js/config.js"></script>
<script src="../assets/js/app.js"></script>

</body>
</html>
