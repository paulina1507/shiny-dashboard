<?php
session_start();
if (!isset($_SESSION['demo_login'])) {
    header("Location: index.php");
    exit;
}

$pageTitle = "Dashboard General";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Shiny Admin</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>

    <?php include "components/sidebar.php"; ?>

    <div class="main">
        <?php include "components/header.php"; ?>

        <div class="content">

            <div class="cards">
                <div class="card">
                    <h3>Usuarios</h3>
                    <p id="countUsers">0</p>
                </div>

                <div class="card">
                    <h3>Pedidos</h3>
                    <p id="countOrders">0</p>
                </div>

                <div class="card">
                    <h3>Productos</h3>
                    <p id="countProducts">0</p>
                </div>
            </div>

            <h2 class="section-title">Actividad reciente</h2>
            <ul class="notificaciones" id="notifications"></ul>

        </div>
    </div>

<script src="/shiny-admin-demo/assets/js/config.js"></script>
<script src="/shiny-admin-demo/assets/js/app.js"></script>

</body>
</html>
