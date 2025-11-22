<?php
session_start();
if (!isset($_SESSION['demo_login'])) {
    header("Location: ../index.php");
    exit;
}

$pageTitle = "Clientes";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Clientes - Mini CRM</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>

<!-- Aplicar Tema y Color -->
<script>
    const theme = localStorage.getItem("themeMode") || "light";
    document.body.setAttribute("data-theme", theme);
    const primary = localStorage.getItem("primaryColor");
    if (primary) document.documentElement.style.setProperty('--primary', primary);
</script>

<?php include "../components/sidebar.php"; ?>

<div class="main">

    <?php include "../components/header.php"; ?>

    <div class="content">

        <h2>Clientes</h2>

        <button class="btn-blue" onclick="openClientModal()">+ Nuevo Cliente</button>

        <table class="tabla" style="margin-top:15px;">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Fuente</th>
                    <th>Estado</th>
                    <th>Último contacto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaClientes"></tbody>
        </table>

    </div>
</div>

<!-- Modal Cliente -->
<div id="clientModal" class="modal">
    <div class="modal-content">
        <h3 id="clientModalTitle">Nuevo Cliente</h3>

        <label>Nombre</label>
        <input type="text" id="clientName">

        <label>Email</label>
        <input type="email" id="clientEmail">

        <label>Teléfono</label>
        <input type="text" id="clientPhone">

        <label>Fuente</label>
        <input type="text" id="clientSource" placeholder="Facebook, Instagram, Referido...">

        <label>Estado</label>
        <select id="clientStatus">
            <option value="Nuevo">Nuevo</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
        </select>

        <label>Nota rápida</label>
        <textarea id="clientNote" rows="3" placeholder="Ej: Llamar el lunes, le interesa paquete X"></textarea>

        <button class="btn-blue" onclick="saveClient()">Guardar</button>
        <button class="btn-black" onclick="closeClientModal()">Cancelar</button>
    </div>
</div>

<script src="../assets/js/crm-data.js"></script>
<script src="../assets/js/crm-clients.js"></script>
<script src="../assets/js/config.js"></script>
<script src="../assets/js/app.js"></script>

</body>
</html>
