<?php
session_start();
if (!isset($_SESSION['demo_login'])) {
    header("Location: ../index.php");
    exit;
}

$pageTitle = "Gestión de Usuarios";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Usuarios - Shiny Admin</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>

<?php include "../components/sidebar.php"; ?>

<div class="main">
    <?php include "../components/header.php"; ?>

    <div class="content">

        <h2>Usuarios</h2>

        <button class="btn-blue" onclick="openUserModal()">+ Nuevo Usuario</button>

        <table class="tabla">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaUsuarios"></tbody>
        </table>

    </div>
</div>

<!-- Modal -->
<div id="userModal" class="modal">
    <div class="modal-content">
        <h3 id="modalTitle">Nuevo Usuario</h3>

        <input type="text" id="userName" placeholder="Nombre">
        <input type="email" id="userEmail" placeholder="Correo">
        <input type="text" id="userRole" placeholder="Rol">

        <button class="btn-blue" onclick="saveUser()">Guardar</button>
        <button class="btn-black" onclick="closeUserModal()">Cancelar</button>
    </div>
</div>

<script src="../assets/js/users.js"></script>
<script src="/shiny-admin-demo/assets/js/config.js"></script>
<script src="/shiny-admin-demo/assets/js/app.js"></script>

</body>
</html>
