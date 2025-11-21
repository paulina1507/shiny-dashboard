<?php
session_start();
if (!isset($_SESSION['demo_login'])) {
    header("Location: ../index.php");
    exit;
}

$pageTitle = "Gestión de Pedidos";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Pedidos - Shiny Admin</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>

<?php include "../components/sidebar.php"; ?>

<div class="main">
    <?php include "../components/header.php"; ?>

    <div class="content">

        <h2>Pedidos</h2>

        <table class="tabla">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaPedidos"></tbody>
        </table>

    </div>
</div>

<!-- Modal -->
<div id="orderModal" class="modal">
    <div class="modal-content">
        <h3>Detalle del Pedido</h3>

        <p><strong>ID:</strong> <span id="orderId"></span></p>
        <p><strong>Cliente:</strong> <span id="orderClient"></span></p>
        <p><strong>Total:</strong> $<span id="orderTotal"></span></p>
        <p><strong>Fecha:</strong> <span id="orderDate"></span></p>

        <label><strong>Estado:</strong></label>
        <select id="orderStatus">
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
            <option value="Enviado">Enviado</option>
            <option value="Cancelado">Cancelado</option>
        </select>

        <button class="btn-blue" onclick="saveOrderStatus()">Guardar cambios</button>
        <button class="btn-black" onclick="closeOrderModal()">Cerrar</button>
    </div>
</div>

<script src="../assets/js/orders.js"></script>
<script src="/shiny-admin-demo/assets/js/config.js"></script>
<script src="/shiny-admin-demo/assets/js/app.js"></script>

</body>
</html>
