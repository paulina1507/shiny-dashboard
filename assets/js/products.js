let products = JSON.parse(localStorage.getItem("products")) || [];
let editingProductId = null;

function renderProducts() {
    const tbody = document.getElementById("tablaProductos");
    tbody.innerHTML = "";

    products.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>$${p.price}</td>
                <td>${p.stock}</td>
                <td>
                    <button onclick="editProduct(${p.id})">✏️</button>
                    <button onclick="deleteProduct(${p.id})">🗑</button>
                </td>
            </tr>
        `;
    });
}

renderProducts();

function openProductModal() {
    editingProductId = null;
    document.getElementById("productModalTitle").innerText = "Nuevo Producto";

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productStock").value = "";

    document.getElementById("productModal").style.display = "flex";
}

function closeProductModal() {
    document.getElementById("productModal").style.display = "none";
}

function saveProduct() {
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const stock = parseInt(document.getElementById("productStock").value);

    if (!name || !price || !stock) {
        alert("Completa todos los campos");
        return;
    }

    if (editingProductId) {
        const idx = products.findIndex(p => p.id === editingProductId);
        products[idx] = { id: editingProductId, name, price, stock };
    } else {
        const id = Date.now();
        products.push({ id, name, price, stock });
    }

    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    closeProductModal();
}

function editProduct(id) {
    const p = products.find(prod => prod.id === id);

    editingProductId = id;

    document.getElementById("productName").value = p.name;
    document.getElementById("productPrice").value = p.price;
    document.getElementById("productStock").value = p.stock;

    document.getElementById("productModalTitle").innerText = "Editar Producto";
    document.getElementById("productModal").style.display = "flex";
}

function deleteProduct(id) {
    if (!confirm("¿Eliminar producto?")) return;

    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
}
