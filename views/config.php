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
    <title>Configuración - Shiny Admin</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>

<?php include "../components/sidebar.php"; ?>

<div class="main">
    <?php include "../components/header.php"; ?>

    <div class="content">

        <h2>Configuración del Sistema</h2>

        <div class="settings-grid">

            <!-- Nombre -->
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
                </select>
                <button class="btn-blue" onclick="savePrimary()">Guardar</button>
            </div>

            <!-- Logo -->
            <div class="setting-card">
                <h3>Logo (simulado)</h3>
                <input type="text" id="logoPath" placeholder="Ruta o URL del logo">
                <button class="btn-blue" onclick="saveLogo()">Guardar</button>
            </div>

        </div>

    </div>
</div>


<script src="/shiny-admin-demo/assets/js/config.js"></script>
<script src="/shiny-admin-demo/assets/js/app.js"></script>

</body>
</html>
