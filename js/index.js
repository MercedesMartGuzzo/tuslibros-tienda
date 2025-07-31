
/* CIRCULOS PRODUCTOS */
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector('.productos-title');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        title.classList.add('animate');
      } else {
        title.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(title);
});


/* FADE-IN */

document.addEventListener('DOMContentLoaded', function () {

  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.5
  });

  elements.forEach(element => {
    observer.observe(element);
  });
});

/* Productos  */

const contenedorProductos = document.getElementById('productos-container');

fetch('https://dummyjson.com/products?limit=8')
  .then(res => res.json())
  .then(data => {
    const productos = data.products;

    productos.forEach(producto => {
      const card = document.createElement('div');
      card.classList.add('card-libro');

      card.innerHTML = `
        <img class="card-img fade-in" src="${producto.thumbnail}" alt="${producto.title}">
        <div class="detalles">
          <h3 class="card-title">${producto.title}</h3>
          <p class="card-description">${producto.description}</p>
          <p class="card-price">$${producto.price}</p>
          <button class="card-button" data-id="${producto.id}" data-title="${producto.title}" data-price="${producto.price}" data-img="${producto.thumbnail}">AGREGAR AL CARRITO</button>
        </div>
      `;

      contenedorProductos.appendChild(card);
    });

    // Agregar eventos a botones
    document.querySelectorAll('.card-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const producto = {
          id: btn.dataset.id,
          title: btn.dataset.title,
          price: Number(btn.dataset.price),
          img: btn.dataset.img,
          quantity: 1
        };

        agregarAlCarrito(producto);
      });
    });
  });

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const index = carrito.findIndex(item => item.id === producto.id);

  if (index !== -1) {
    carrito[index].quantity += 1;
  } else {
    carrito.push(producto);
  }
  
  Toastify({
  text: `¡Prodcucto agregado al carrito!`,
  duration: 3000,
  gravity: "top",
  position: "right",
  style: {
    background:"#efd1c3",
    color:"#024244",
    fontFamily:"Dela Gothic One",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "14px"
  }
}).showToast();



  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalCantidad = carrito.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelector('.cart span').textContent = totalCantidad;
}

actualizarCarritoUI();


/* FORMULARIO */


const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const datos = new FormData(formulario);

  fetch("https://formspree.io/f/xanogved", {
    method: "POST",
    body: datos,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        window.location.href = "https://mercedesmartguzzo.github.io/tuslibros-tienda/pages/gracias.html";
      } else {
        alert("Hubo un error al enviar. Intentá más tarde.");
      }
    })
    .catch(error => {
      alert("Error de conexión. Intentalo de nuevo.");
    });
});

