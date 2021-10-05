//Declaro mis variables

let bebidasSeleccionadas = [];
const contenido = document.querySelector('#contenido');
const contenedorBebidas = document.querySelector(".contenedor-bebidas");
const form = document.querySelector('#formulario');

//ruta a mi json
const url = '../assets/data/productos.json';  



//declaro mis eventos
document.addEventListener('DOMContentLoaded' , () => {
    getProducts();
 }
 )

//fetch

function getProducts() {
    
    fetch(url)
        .then( resp => {
            return resp.json();
        })
        .then( products => {
            mostrarBebidas(products);
        })
};

function setProductById(id) {
    fetch(url)
        .then( resp => {
            return resp.json();
        })
        .then( products => {

            bebidasSeleccionadas.push(products[ id - 1 ]);
            hacerTabla(bebidasSeleccionadas);

        })
};

//funcion para motrar las bebidas en el HTML
function mostrarBebidas( products ) {
    products.forEach( product => {
        contenedorBebidas.innerHTML += ` 
            <div class = "card">
                <img src = "${product.img}" class = "imagen-bebidas" />
                <h2> ${product.name} </h2>
                <h3> $${product.precio} </h3>
                <button onClick="setProductById(${ product.id })" class="btn-agregar"> Agregar bebida </button>
            </div>`
    })
 }
 
//funcion para hacer la tabla
function hacerTabla(){
   // limpiarHTML()
    contenido.innerHTML = '';
    for(let product of bebidasSeleccionadas){
       contenido.innerHTML += `
       <tr>
       <th scope="row">${product.id}</th>
       <td>${product.name}</td>
       <td class="price">$${product.precio}</td>
       <td><input type="number" min="1" value="" class="input-elemento"></td> 
       <td><button value="Eliminar" title="Eliminar" class="btn btn-danger ">x</button></td>
        </tr>
        ` ;
    }
    carritoTotal ();
}

//funcion para carrito total
function carritoTotal(){
    let Total = 0;
    const itemTotal = document.querySelector('.precioTotal')
    bebidasSeleccionadas.forEach((bebidaSeleccionada) =>{
      const precio = Number(bebidaSeleccionada.precio.replace("$", ''))
      Total = Total + precio;
    })
    itemTotal.innerHTML = `$${Total}`
}

//boton para eliminar fila
$(document).on('click', '.btn-danger', function eliminarProducto(i) {
    const removed = bebidasSeleccionadas.splice(i, 1) 
    contenido.innerHTML =""       
    hacerTabla()                 
    localStorage.setItem("carritoCargado", JSON.stringify(bebidasSeleccionadas))

  $(this).parents('tr').remove(); //elimina la fila
})

//funcion para realizar pedido
function formulario(){
     form.innerHTML = '';
     form.innerHTML += `
     <form>
  <div class="form-row">
    <div class="col-md-4 mb-3 ">
      <label for="validationServer01" class="light">Nombre</label>
      <input type="text" class="form-control is-valid" id="validationServer01" placeholder="Nombre" required>
      <div class="invalid-feedback" id="nombre">
      Ingrese su nombre
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationServer02">Apellido</label>
      <input type="text" class="form-control" placeholder="Apellido" required>
      <div class="invalid-feedback">
        Ingrese su apellido
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationServer03">Dirección</label>
      <input type="text" class="form-control is-invalid" id="validationServer03" placeholder="Direccion" name="direccion" id="direccion" required>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationServer04">Telefono</label>
      <input type="number" class="form-control is-invalid" id="validationServer04" placeholder="Telefono" required>
    </div>
  </div>
  <button class="btn btn-secondary m-3" type="submit" onClick="confirmar()">Realizar compra</button>
</form>
     `
} 

//funcion de finalizar
function confirmar(){
    alert = (`Muchas gracias por su compra ${nombre} le estaremos enviando su pedido a ${direccion}`)
}

//funcion para aumentar cantidad 


//funcion para vaciar carrito
const btnVaciarCarrito = document.querySelector ('#miBoton')
btnVaciarCarrito.addEventListener('click', () => {
    bebidasSeleccionadas = [];
    carritoTotal();
    form.innerHTML = ''
    vaciarCarrito();
});

function vaciarCarrito() {
   contenido.innerHTML = '';
 
}

//sweet alert de vaciar carrito
$("#miBoton").click (function () {
    swal ( "Deseas eliminar tu lista de productos? " , { 
        miBoton : [ " No " , " Si " ] ,  
      } ) ;
});

//volver arriba
jQuery('document').ready(function($){
    let subir = $('.volver-arriba');

    subir.click(function(e){
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 500);
    });

});


var btnBoton = document.getElementById('boton');
