

// Variables
let nombreUsuario = localStorage.getItem('nombreUsuario');
let correoUsuario = localStorage.getItem('correoUsuario');
let edadUsuario = localStorage.getItem('edadUsuario');




// Variables DOM
const saludoInicial = document.querySelector('#saludoUsuario');
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const edad = document.querySelector('#edad');
const contFormulario = document.querySelector('#contFormulario');
const contTienda = document.querySelector("#contenido"); //este quiero ocultar
const contenid = document.querySelector('#contenid');
const logout = document.querySelector('#logout');

saludoInicial.innerHTML = "<h3>Bienvenido a nuestro paraiso skater!!, por favor ingresa los siguientes datos para continuar!</h3>";

//Funciones


const ocultarTienda = () => {
    contTienda.style.display = "none";
      }

ocultarTienda()  // Oculto la tienda antes de que llene el formulario

const ocultarFormulario = () => {
    contFormulario.style.display = 'none';
    contTienda.style.display = "block"; // muestro la tienda cuando llena el formulario
    contenid.innerHTML = `Hola "${nombreUsuario}" tu mail es: "${correoUsuario}". Tienes ${edadUsuario} años.`;
  }


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    nombreUsuario = nombre.value;
    correoUsuario = correo.value;
    edadUsuario = edad.value;


    if(nombreUsuario === "") {   // acá valido que ponga nombre en el form
      alert('No has escrito nada en el usuario');
      return;
    }
    else if(edadUsuario === "") {    // acá valido que ponga edad en el form
     alert('No has escrito una edad');
     return;
    }
    else if(correoUsuario === "") {    // acá valido que ponga su correo en el form
      alert('No has ingresado tu correo');
      return;
    }

    localStorage.setItem('nombreUsuario', nombre.value);   //escribo en el local storage
    localStorage.setItem('edadUsuario', edad.value);
    localStorage.setItem('correoUsuario', correo.value);
    
    ocultarFormulario();   //disparo esta función
  })

  if (nombreUsuario && correoUsuario && edadUsuario) {    //operador Lógico AND (&&)
    ocultarFormulario();
  }

  logout.onclick = () => {  // función para el boton de logout
    // localStorage.clear();
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('correoUsuario');
    localStorage.removeItem('edadUsuario');
    location.reload() // esto recarga la página
  }

//  STRINGIFY + SUBIR AL LOCAL STORAGE
  
localStorage.setItem("productosDisponibles", JSON.stringify(baseDeDatos)); //acá guardo todos los productos disponibles en el local storage
//localStorage.setItem("productosCarrito", JSON.stringify(carrito));

//  TRAER DEL LOCAL STORAGE +  PARSE

const nuevoArrayDeSkates = JSON.parse(localStorage.getItem("productosDisponibles"));
console.log(nuevoArrayDeSkates);

const CarritoRecuperado = JSON.parse(localStorage.getItem("carritoLocalStorage"));
console.log(CarritoRecuperado);
 
let carritoLocalStorage = JSON.parse( localStorage.getItem('productosCarrito'))
  console.log(carritoLocalStorage);
  