<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['demo_login'] = true;
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login - Shiny Admin</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body class="login-body">
    <div class="login-container">

        <div class="login-left">
            <h1>Shiny Admin Panel</h1>
            <p>Dashboard administrativo demo</p>
        </div>

        <form class="login-right" method="POST">
            <h2>Iniciar sesión</h2>

            <input type="email" name="email" placeholder="Correo" required>
            <input type="password" name="password" placeholder="Contraseña" required>

            <button type="submit" class="btn-blue">Entrar</button>
        </form>

    </div>
<script src="assets/js/app.js"></script>
<script src="assets/js/config.js"></script>
</body>
</html>
