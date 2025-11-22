function renderActivityTimeline() {
    const list = document.getElementById("timelineActividad");
    if (!list) return;

    let activity = loadLS(CRM_KEYS.activity, []);
    list.innerHTML = "";

    if (activity.length === 0) {
        list.innerHTML = "<li>No hay actividad registrada aún.</li>";
        return;
    }

    activity.forEach(a => {
        list.innerHTML += `
            <li>
                <strong>${a.text}</strong><br>
                <small style="color:var(--text-light);">${a.date}</small>
            </li>
        `;
    });
}

document.addEventListener("DOMContentLoaded", renderActivityTimeline);
