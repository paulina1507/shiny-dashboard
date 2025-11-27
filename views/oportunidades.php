<?php
session_start();
if (!isset($_SESSION['demo_login'])) {
    header("Location: ../index.php");
    exit;
}

$pageTitle = "Oportunidades";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Oportunidades - Mini CRM</title>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" rel="stylesheet">
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

<div class="main-content">

    <?php include "../components/header.php"; ?>

    <div class="content">

        <h2>Oportunidades</h2>

        <button class="btn-blue" onclick="openOppModal()">+ Nueva Oportunidad</button>

        <table class="tabla" style="margin-top:15px;">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Cliente</th>
                    <th>Monto</th>
                    <th>Probabilidad</th>
                    <th>Etapa</th>
                    <th>Cierre Estimado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaOportunidades"></tbody>
        </table>

    </div>
</div>


<!-- Modal Oportunidad -->
<div id="oppModal" class="modal">
    <div class="modal-content">
        <h3 id="oppModalTitle">Nueva Oportunidad</h3>

        <label>Título</label>
        <input type="text" id="oppTitle">

        <label>Cliente</label>
        <select id="oppClient"></select>

        <label>Monto (MXN)</label>
        <input type="number" id="oppAmount">

        <label>Probabilidad (0 a 1)</label>
        <input type="number" step="0.1" min="0" max="1" id="oppProb">

        <label>Etapa</label>
        <select id="oppStage"></select>

        <label>Cierre Estimado</label>
        <input type="date" id="oppClose">

        <button class="btn-blue" onclick="saveOpp()">Guardar</button>
        <button class="btn-black" onclick="closeOppModal()">Cancelar</button>
    </div>
</div>


<script src="../assets/js/crm-data.js"></script>
<script src="../assets/js/crm-opps.js"></script>
<script src="../assets/js/config.js"></script>
<script src="../assets/js/app.js"></script>

</body>
</html>
