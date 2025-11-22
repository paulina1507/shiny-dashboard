<header class="header">

    <div class="header-left">
        <button class="toggle-btn" onclick="toggleSidebar()">☰</button>

        <!-- Título dinámico recibido de cada vista -->
        <h1 id="system-title"><?php echo $pageTitle; ?></h1>
    </div>

    <div class="header-actions">
        <input type="text" placeholder="Buscar...">
        <div class="notif">🔔</div>
        <div class="avatar">👤</div>
    </div>

</header>

<script>
// Reflejar nombre del sistema en header si aplica
const systemNameHeader = localStorage.getItem("systemName");
if (systemNameHeader) {
    // NO sobreescribimos el título de la página, solo damos branding
    document.title = systemNameHeader + " - " + "<?php echo $pageTitle; ?>";
}
</script>
