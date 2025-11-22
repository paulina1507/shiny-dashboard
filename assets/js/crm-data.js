// ===============================
// CRM DATA CORE (Seeds + Helpers)
// ===============================

const CRM_KEYS = {
    clients: "crm_clients",
    opportunities: "crm_opportunities",
    activity: "crm_activity",
    settings: "crm_settings",
};

// Leer LocalStorage de forma segura
function loadLS(key, defaultValue) {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    try {
        return JSON.parse(raw);
    } catch {
        return defaultValue;
    }
}

// Guardar LocalStorage de forma segura
function saveLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// ===============================
// SEED DEL SISTEMA DEMO
// ===============================
function initCrmDemoData() {

    // --- Ajustes del CRM ---
    let settings = loadLS(CRM_KEYS.settings, null);
    if (!settings) {
        settings = {
            systemName: "Mini CRM Shiny",
            primaryColor: "#1E90FF",
            themeMode: localStorage.getItem("themeMode") || "light",
            stages: [
                "Nuevo",
                "Contactado",
                "Interesado",
                "Propuesta enviada",
                "Negociación",
                "Cerrado Ganado",
                "Cerrado Perdido"
            ]
        };
        saveLS(CRM_KEYS.settings, settings);
    }

    // --- CLIENTES DEMO ---
    let clients = loadLS(CRM_KEYS.clients, null);
    if (!clients) {
        clients = [
            {
                id: 1,
                name: "Juan Pérez",
                email: "juan@example.com",
                phone: "222-111-2233",
                source: "Facebook",
                status: "Activo",
                lastContact: "2025-01-10",
                notes: [
                    { text: "Interesado en sitio web premium.", date: "2025-01-09" }
                ]
            },
            {
                id: 2,
                name: "Ana López",
                email: "ana@example.com",
                phone: "222-444-5566",
                source: "Instagram",
                status: "Nuevo",
                lastContact: "2025-01-12",
                notes: []
            },
            {
                id: 3,
                name: "Carlos Ruiz",
                email: "carlos@example.com",
                phone: "222-777-8899",
                source: "Referido",
                status: "Inactivo",
                lastContact: "2024-12-20",
                notes: [
                    { text: "Posible proyecto para febrero.", date: "2024-12-20" }
                ]
            }
        ];
        saveLS(CRM_KEYS.clients, clients);
    }

    // --- OPORTUNIDADES DEMO ---
    let opps = loadLS(CRM_KEYS.opportunities, null);
    if (!opps) {
        opps = [
            {
                id: 101,
                clientId: 1,
                title: "Sitio Web Corporativo",
                amount: 15000,
                probability: 0.6,
                stage: "Propuesta enviada",
                expectedCloseDate: "2025-01-25",
                createdAt: "2025-01-10"
            },
            {
                id: 102,
                clientId: 2,
                title: "Tienda Online",
                amount: 12000,
                probability: 0.4,
                stage: "Interesado",
                expectedCloseDate: "2025-02-05",
                createdAt: "2025-01-12"
            },
            {
                id: 103,
                clientId: 3,
                title: "Landing de Servicios",
                amount: 8000,
                probability: 0.2,
                stage: "Contactado",
                expectedCloseDate: "2025-02-10",
                createdAt: "2025-01-15"
            }
        ];
        saveLS(CRM_KEYS.opportunities, opps);
    }

    // --- ACTIVIDAD DEMO ---
    let activity = loadLS(CRM_KEYS.activity, null);
    if (!activity) {
        activity = [
            {
                id: Date.now(),
                type: "opportunity_created",
                text: "Se creó la oportunidad 'Sitio Web Corporativo' para Juan Pérez.",
                date: "2025-01-10 10:15"
            },
            {
                id: Date.now() + 1,
                type: "client_updated",
                text: "Se actualizó el estado de Ana López a 'Nuevo'.",
                date: "2025-01-12 11:00"
            }
        ];
        saveLS(CRM_KEYS.activity, activity);
    }
}

// Ejecutar seeds
initCrmDemoData();
