const contenedor = document.getElementById('carrito-items');
const total = document.getElementById('total-carrito');
const btnFinalizar = document.getElementById('finalizar-compra');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderCarrito() {
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
        total.textContent = '';
        actualizarCarritoUI();
        return;
    }

    carrito.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('carrito-item');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div>
                <h4>${item.title}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button data-id="${item.id}" class="eliminar-btn">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });

    const totalPrecio = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);
    total.textContent = `Total: $${totalPrecio}`;

    actualizarCarritoUI();
}

contenedor.addEventListener('click', e => {
    if (e.target.classList.contains('eliminar-btn')) {
        const id = e.target.dataset.id;
        carrito = carrito.filter(item => item.id !== id);

        Toastify({
            text: `¡Producto eliminado!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#efd1c3",
                color: "#024244",
                fontFamily: "Dela Gothic One",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "14px"
            }
        }).showToast();

        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
    }
});

btnFinalizar.addEventListener('click', () => {
    if (carrito.length > 0) {
        /*   alert('¡Gracias por tu compra!'); */

        carrito = [];

        Toastify({
            text: `¡Gracias por tu compra!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#efd1c3",
                color: "#024244",
                fontFamily: "Dela Gothic One",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "14px"
            }
        }).showToast();


        localStorage.removeItem('carrito');
        renderCarrito();
    }
});

// Actualiza el número del carrito en el ícono
function actualizarCarritoUI() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((acc, item) => acc + item.quantity, 0);
    const span = document.querySelector('.cart span');
    if (span) span.textContent = totalCantidad;
}

renderCarrito();
