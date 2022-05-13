const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciaCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //cuando agregar un curso presionando "Agregar carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });

  //vaciar carrito
  vaciaCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //reseteamos el arreglo
    limpiarHTML();
  });
}

//Funciones

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    console.log(articulosCarrito);

    carritoHTML(); //interamos sobre el carrito y mostramos su html
  }
}

//leer el contenido del HTML al que le dimos click y extrae la informaicion

function leerDatosCurso(curso) {
  //console.log(curso);
  //crear un objeto con el contenido del curso actual.
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; //retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agregar elemtos al carrito del arreglo
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

//muestra el carrito de compras en el HTML
function carritoHTML() {
  //limpiar el HTML

  limpiarHTML();

  //recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
<td> <img src="${curso.imagen}" width="100">
</td>
<td>${titulo}</td> 
<td>${precio}</td>
<td>${cantidad}</td>
<td> <href="#" class="borrar-curso" data-id="${id}" > X </a> </td>

`;

    //agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });

  //agregar sincronizar al carrito
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//elimina los cirsos del tbody
function limpiarHTML() {
  //forma lenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
