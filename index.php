<?php 
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['demo_login'] = true;
    header('Location: views/dashboard.php');
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

<body class="premium-login">

    <!-- Fondo ilustrado -->
    <div class="login-illustration"
         style="background-image: url('assets/img/bg-login.jpg');">
    </div>

    <div class="login-card">

        <h2 id="loginSystemName">Shiny Admin Panel</h2>
        <p>Dashboard administrativo demo</p>

        <form method="POST">

            <div class="input-group">
                <span class="icon">📧</span>
                <input type="email" name="email" placeholder="Correo" required>
            </div>

            <div class="input-group">
                <span class="icon">🔒</span>
                <input type="password" name="password" placeholder="Contraseña" required>
            </div>

            <button type="submit" class="btn-login">Entrar</button>

            <div class="options">
                <a href="#">¿Olvidaste tu contraseña?</a>
                <a href="#">Crear cuenta</a>
            </div>

        </form>

    </div>

<script>
// Mostrar nombre del sistema configurado
const systemName = localStorage.getItem("systemName") || "Shiny Admin Panel";
document.getElementById("loginSystemName").textContent = systemName;
</script>

</body>
</html>
