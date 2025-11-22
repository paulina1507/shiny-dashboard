<?php
session_start();
if (!isset($_SESSION['demo_login'])) {
    header("Location: ../index.php");
    exit;
}

$pageTitle = "Actividad del Sistema";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Actividad - Mini CRM</title>
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

        <h2>Actividad del Sistema</h2>

        <p style="color:var(--text-light); margin-bottom:15px;">
            Se muestran las acciones recientes en el CRM (clientes, oportunidades, notas, modificaciones, etc.)
        </p>

        <ul class="notificaciones" id="timelineActividad"></ul>

    </div>
</div>

<script src="../assets/js/crm-data.js"></script>
<script src="../assets/js/crm-activity.js"></script>
<script src="../assets/js/config.js"></script>
<script src="../assets/js/app.js"></script>

</body>
</html>
