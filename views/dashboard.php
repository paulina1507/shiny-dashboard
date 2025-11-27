<?php
session_start();
if (!isset($_SESSION['demo_login'])) {
    header("Location: ../index.php");
    exit;
}

$pageTitle = "Panel General";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Mini CRM</title>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>

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

        <h2>Dashboard General</h2>

        <!-- KPIs -->
        <div class="cards">
            <div class="card">
                <h3>Total Clientes</h3>
                <p id="kpiClientes">0</p>
            </div>
            <div class="card">
                <h3>Oportunidades</h3>
                <p id="kpiOportunidades">0</p>
            </div>
            <div class="card">
                <h3>Valor Potencial (MXN)</h3>
                <p id="kpiValor">0</p>
            </div>
            <div class="card">
                <h3>Actividades Hoy</h3>
                <p id="kpiActividad">0</p>
            </div>
        </div>

        <!-- Actividad reciente -->
        <h3 style="margin-top:30px;">Actividad Reciente</h3>
        <ul class="notificaciones" id="actividadReciente"></ul>

    </div>
</div>

<script src="../assets/js/crm-data.js"></script>
<script src="../assets/js/config.js"></script>
<script src="../assets/js/app.js"></script>

<script>
    // KPIs desde LocalStorage
    const clients = JSON.parse(localStorage.getItem("crm_clients")) || [];
    const opps = JSON.parse(localStorage.getItem("crm_opportunities")) || [];
    const activity = JSON.parse(localStorage.getItem("crm_activity")) || [];

    // KPI: total clientes
    document.getElementById("kpiClientes").textContent = clients.length;

    // KPI: total oportunidades
    document.getElementById("kpiOportunidades").textContent = opps.length;

    // KPI: valor potencial
    const valor = opps.reduce((sum, o) => sum + (o.amount || 0), 0);
    document.getElementById("kpiValor").textContent = "$" + valor.toLocaleString();

    // KPI: actividad hoy
    const today = new Date().toISOString().slice(0, 10);
    const actividadHoy = activity.filter(a => a.date.startsWith(today)).length;
    document.getElementById("kpiActividad").textContent = actividadHoy;

    // Lista actividad reciente
    const lista = document.getElementById("actividadReciente");
    lista.innerHTML = "";

    activity.slice(0, 5).forEach(a => {
        lista.innerHTML += `<li>${a.text} <small>(${a.date})</small></li>`;
    });
</script>

</body>
</html>
