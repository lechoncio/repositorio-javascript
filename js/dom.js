

//Acá modifico el titulo h1 (le cambio el texto original)
const titulo = document.getElementById('main'); 
console.log(titulo.innerText);
titulo.innerHTML = '<h1>Ketel Old School Skateboard Shop</h1>';
console.log(titulo.innerText);
titulo.hidden = true; //escondo título
titulo.hidden = false; //vuelvo a mostrar título

//Acá modifico el subtitulo de H3 a H4 y le cambio el texto original
const subTitulo = document.getElementById('descripcion'); 
console.log(subTitulo.innerText);
subTitulo.innerHTML = '<h4>A continuación Ud. podrá ver los productos disponibles en nuestra tienda</h4>';
console.log(subTitulo.innerText);

  let baseDeDatos = [];

  let carrito = [];  //clase 10 JSON y LOCAL STORAGE este voy a usar para mandar el carrito al local storage
  const divisa = '$';   //aca creo el signo pesos para agregar a los precios de los skates
  const DOMitems = document.querySelector('#items'); //constante DOMitems es el contenido dentro del id #items
  const DOMcarrito = document.querySelector('#carrito'); //constante DOMcarrito es el contenido dentro del id #carrito
  const DOMtotal = document.querySelector('#total'); //constante DOMtotal es el contenido dentro del id #total
  const DOMbotonVaciar = document.querySelector('#boton-vaciar'); //constante DOMbotonVaciar es el contenido dentro del id #boton-vaciar

  //AJAX Y FETCH clase 15 
  
  fetch("./json/skates.json")  //hago un fetch desde el archivo json
  .then(resp => resp.json())    //le digo el formato 
  .then(objetos => {   
  objetos.forEach(objeto => baseDeDatos.push(objeto))  //le doy un push de los objetos importados a la baseDeDatos

    baseDeDatos.forEach((info) => {    // para cada objeto todo lo de abajo 

        // Tarjeta principal
        const miNodo = document.createElement('div');  // creo miNodo con elemento div que va a ser el contenedor miNodo
        miNodo.classList.add('cards');   // con add le agrego la clase cards

        // Body de la tarjeta
        const miNodoCardBody = document.createElement('div'); // creo miNodoCardBody con elemento div que va a ser un contenedor interno de miNodo
        miNodoCardBody.classList.add('card-body'); // con add le agrego la clase card-body 

        // Nombres De los Skates
        const miNodoNombreSkate = document.createElement('h5'); // creo miNodoNombreSkate con elemento h5 que va a ser un contenedor interno de miNodo
        miNodoNombreSkate.classList.add('card-titulo'); // con add le creo la clase card-titulo 
        miNodoNombreSkate.textContent = info.nombre; // dentro de cada objeto del array traigo "nombre" para mostrar

        // Imagenes de los skates
        const miNodoImagen = document.createElement('img'); // creo miNodoImagen con etiqueta img donde se va a agregar el link a la imagen
        miNodoImagen.classList.add('img-sk');  // le agrego la clase img-fluid que voy a usar en css
        miNodoImagen.setAttribute('src', info.imagen);  //agrego un atributo src para el link a la imagen y traigo del objeto el array "imagen"

        // Descripcion de los skates
        const miNodoDescripcion = document.createElement('p'); // creo miNodoDescripcion le agrego un parrafo P (porque sera texto mas largo)
        miNodoDescripcion.classList.add('descripcion'); // le agrego la clase "descripcion" que voy a usar en css
        miNodoDescripcion.textContent = info.descripcion; //agrego textcontent que traigo del objeto en el array la "descripcion"
        
        // Precio
        const miNodoPrecio = document.createElement('p');// creo miNodoPrecio en parrafo P (allí meteré el precio)
        miNodoPrecio.classList.add('precio-text'); // le agrego la clase "precio-text" que voy a usar en css
        miNodoPrecio.textContent = `${divisa}${info.precio}`; //agrego divisa (creada mas arriba) y traigo del objeto en el array el "precio"

        // Botones para agregar item al carrito
        const miNodoBoton = document.createElement('button'); // creo miNodoBoton y agrego etiqueta "button"
        miNodoBoton.classList.add('btn', 'btn-secondary', 'Agregar'); // le agrego clases también de bootstrap para que levante estilos
        miNodoBoton.textContent = 'Agregar a Carrito';// le pongo texto al boton
        miNodoBoton.setAttribute('marcaID', info.id);// le agrego atributo "marcaID" y traigo del objeto en el array el "id"
        
        
        miNodoBoton.addEventListener('click', agregarSkateAlCarrito); // le agrego un event listener click asociado a la funcion "agregarSkateAlCarrito"
  
        miNodoCardBody.append(miNodoImagen); //dentro de "miNodoCardBody" hago el append de la imagen
        miNodoCardBody.append(miNodoNombreSkate); //dentro de "miNodoCardBody" hago el append del nombre del skate
        miNodoCardBody.append(miNodoDescripcion); //dentro de "miNodoCardBody" hago el append de la descripción
        miNodoCardBody.append(miNodoPrecio); //dentro de "miNodoCardBody" hago el append del precio
        miNodoCardBody.append(miNodoBoton); //dentro de "miNodoCardBody" hago el append del boton
        miNodo.append(miNodoCardBody); //dentro de "miNodo" hago el append de todo el "miNodoCardBody" con todos sus componentes (los 5 de arriba)
        DOMitems.append(miNodo); // acá hago el append de "miNodo" con todos sus componentes (miNodoCardBody y sus 5 componentes)
    });
  
  })
  
    // Abajo genero evento para añadir un producto al carrito de la compra
 
  function agregarSkateAlCarrito(evento) {   //la funcion de "agregarSkateAlCarrito" se ejecuta a partir 
                                                //del click en el boton "agregar a carrito" y va a hacer push al array "carrito" del 
                                                //item seleccionado a patir del atributo 'marcaID', que creamos cuando renderizamos los obj del ecommerce
   carrito.push(evento.target.getAttribute('marcaID'))
    

    Swal.fire({            //  uso de librerías pop up confirmación de agregado al carrito
      width: "350px",    
      heightAuto: true,
      title: 'Item agregado!',   
      imageUrl: './images/logo2.png',
      imageWidth: 250,
      imageHeight: 125,
      padding: '1%',
      color: '#ded7e6',
      background: '#48464b',
      showConfirmButton: false,
      timer: 1500
    
  })

    
   renderizarCarrito();  

   
   localStorage.setItem("productosCarrito", JSON.stringify(carrito));
     
  }

        
  //la función "renderizarCarrito" se ejecuta luego de agregar o quitar items del carrito (la podría haber llamado actualizar carrito)
  function renderizarCarrito() {     
    DOMcarrito.innerHTML = '<h2>Carrito de Compras</h2>'; //creo el h2 con el título 

    //creo array carritoSinDuplicados con un "spread" (...) que imprime una lista de argumentos
    const carritoSinDuplicados = [...new Set(carrito)];  //set es unique (no repite)  // USO DE SPREAD "CLASE 12. Operadores Avanzados"
    
    carritoSinDuplicados.forEach((item) => {       
        
        const miItem = baseDeDatos.filter((itemBaseDatos) => {   //generamos const "miItem" que filtra el objeto del array..
          // ¿Coincide las id? Solo puede existir un caso           
            return itemBaseDatos.id === parseInt(item); //y trae el ID que lo parseamos (parseInt) nos devuelve el numero entero.
            
        });
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => { // Cuenta el número de veces que se repite el producto
            
            return itemId === item ? total += 1 : total;  // ¿si itemid es igual a item entonces sumo 1(incremento el contador),
        }, 0);  //el contador arranca desde cero
      

        
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');  // creamos minodo con un tag li (lista)
        
        miNodo.classList.add('group-item-secondary', 'text-right', 'mx-auto');  // creamos clases a ese li (lista)
        // le ponemos lo que queremos mostrar en el carrito
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} ${divisa} ${miItem[0].precio}  `; 

      ////////////acá va la creación del boton Pagar y su función////////////
       //////////////////////////
       //////////////////////////
       




        // Creo boton de borrar (dentro del nodo) con Tag "button"
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-secondary', 'mx-5'); //agrego las clases para bootstrap
        miBoton.textContent = 'Quitar';  //agrego el texto del boton
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.append(miBoton); //imprimo el boton dentro del nodo
        DOMcarrito.append(miNodo); // imprimo miNodo con boton incluido
       
    });
    
    DOMtotal.textContent = calcularTotal(); //ejecuto la función calcularTotal que se imprime en #total
    

  }
  
  //Evento para borrar un elemento del carrito
  function borrarItemCarrito(evento) { 
    
    const id = evento.target.dataset.item;  // Obtenemos el producto ID
    
    carrito = carrito.filter((carritoId) => {  // Borramos
        return carritoId !== id;
    });
    
    renderizarCarrito();// volvemos a renderizar
  }
  
  function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {  
         // De cada elemento obtengo su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumo al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
  }
  
  function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizo los cambios
    renderizarCarrito();
  }
  // Este es event listener de vaciar el carrito completo (vaciarCarrito)
  DOMbotonVaciar.addEventListener('click', vaciarCarrito);
  
 
  renderizarCarrito();