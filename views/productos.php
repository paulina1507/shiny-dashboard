<?php
session_start();
if (!isset($_SESSION['demo_login'])) {
    header("Location: ../index.php");
    exit;
}

$pageTitle = "Gestión de Productos";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Productos - Shiny Admin</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>

<?php include "../components/sidebar.php"; ?>

<div class="main">
    <?php include "../components/header.php"; ?>

    <div class="content">

        <h2>Productos</h2>

        <button class="btn-blue" onclick="openProductModal()">+ Nuevo Producto</button>

        <table class="tabla">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaProductos"></tbody>
        </table>

    </div>
</div>

<!-- Modal -->
<div id="productModal" class="modal">
    <div class="modal-content">
        <h3 id="productModalTitle">Nuevo Producto</h3>

        <input type="text" id="productName" placeholder="Nombre del producto">
        <input type="number" id="productPrice" placeholder="Precio">
        <input type="number" id="productStock" placeholder="Stock">

        <button class="btn-blue" onclick="saveProduct()">Guardar</button>
        <button class="btn-black" onclick="closeProductModal()">Cancelar</button>
    </div>
</div>

<script src="../assets/js/products.js"></script>
<script src="/shiny-admin-demo/assets/js/config.js"></script>
<script src="/shiny-admin-demo/assets/js/app.js"></script>

</body>
</html>
