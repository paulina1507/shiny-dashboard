<div class="sidebar" id="sidebar">

    <div class="sidebar-logo">
        <img id="sidebarLogo" src="" style="width:40px; height:40px; object-fit:contain; display:none;">
        <span class="sidebar-title" id="sidebarTitle">Shiny Admin</span>
    </div>

    <ul>
        <li><a href="/shiny-dashboard/views/dashboard.php">🏠 <span>Dashboard</span></a></li>
        <li><a href="/shiny-dashboard/views/clientes.php">👥 <span>Clientes</span></a></li>
        <li><a href="/shiny-dashboard/views/oportunidades.php">📊 <span>Oportunidades</span></a></li>
        <li><a href="/shiny-dashboard/views/actividad.php">📝 <span>Actividad</span></a></li>
        <li><a href="/shiny-dashboard/views/config.php">⚙ <span>Configuración</span></a></li>
        <li><a href="/shiny-dashboard/index.php">🚪 <span>Salir</span></a></li>
    </ul>

</div>

<script>
// Cargar nombre y logo del sistema
const sysName = localStorage.getItem("systemName") || "Shiny Admin";
const logoPath = localStorage.getItem("logoPath");

document.getElementById("sidebarTitle").textContent = sysName;

if (logoPath) {
    const logo = document.getElementById("sidebarLogo");
    logo.src = "/" + logoPath.replace(/^\//, "");
    logo.style.display = "block";
}
</script>
