//Declaro mis variables

let bebidasSeleccionadas = [];
const contenido = document.querySelector('#contenido');
let total = document.querySelector('#precioTotal');

const contenedorBebidas = document.querySelector(".contenedor-bebidas");
//const contenedorSeleccion = document.querySelector(".bebida-seleccionada");

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
    limpiarHTML()
  //  console.log(bebidasSeleccionadas);
    contenido.innerHTML = '';
    for(let product of bebidasSeleccionadas){
       contenido.innerHTML += `
       <tr>
       <th scope="row">${product.id}</th>
       <td>${product.name}</td>
       <td class="price">$${product.precio}</td>
       <td><input type="number" min="1" value=${product.cantidad} class="input-elemento">
       </td>
       <td><button value="Eliminar" title="Eliminar" class="btn btn-danger ">x</button></td>
        </tr>
       ` 
    }

}

//funcion para carrito total
function calculoTotal(){
    let Total = 0;
}

//funcion para aumentar la cantidad del producto


//boton para eliminar fila
$(document).on('click', '.btn-danger', function(e){
    
    $(this).parents('tr').remove();
})

//funcion para vaciar carrito
const btnVaciarCarrito = document.querySelector ('#miBoton')
btnVaciarCarrito.addEventListener('click', limpiarHTML);

function limpiarHTML() {
    contenido.innerHTML = '';

}

$("#miBoton").click (function () {
    swal ( "Deseas eliminar tu lista de productos? " , { 
        miBoton : [ " No " , " Si " ] ,  
      } ) ;
});


jQuery('document').ready(function($){
    let subir = $('.volver-arriba');

    subir.click(function(e){
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 500);
    });

});


var btnBoton = document.getElementById('boton');


