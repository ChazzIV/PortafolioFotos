var app = function () {
  var body = undefined;
  var menu = undefined;
  var menuItems = undefined;
  var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-icon');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
  };
  var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
          return toggleClass(body, 'nav-active');
      });
  };
  var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
  };
  init();
}();


const grid = new Muuri('.grid', {
    layout: {
      rounding: false,
    },
  });

  window.addEventListener('load', () => {
      grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas'); //agrega una clase al elemento <div style=""></div>

    //enlaces de filtrado
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach( (e) => {
        //console.log(e);
        e.addEventListener('click', (event) => {
            event.preventDefault();
            //console.log(event.target);
            enlaces.forEach((enlace) => enlace.classList.remove('activo') )
            event.target.classList.add('activo') //al elemento que se le click se le agrega el activo
            //event.target.classList.remove('activo') 

            //Filtrado por enlaces
            const categoria = event.target.innerHTML.toLowerCase();
             console.log(categoria);
             categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter( `[data-categoria="${categoria}"]`);
       });
    });

    //barra de busqueda 
    document.querySelector('#barra-busqueda').addEventListener('input', (eve) => {
      const busqueda = eve.target.value;
      // console.log(busqueda);
      grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) )
    });

    //popup
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach( (e) => {
      // console.log(ruta);
      // console.log(descripcion);
      e.addEventListener('click', () => {
        const ruta = e.getAttribute('src');
        const descripcion = e.parentNode.parentNode.dataset.descripcion;

        overlay.classList.add('activo');
        document.querySelector('#overlay img').src = ruta;
        document.querySelector('#overlay .descripcion').innerHTML = descripcion;
      });
    });
    //events del boton de cerrar

    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
      overlay.classList.remove('activo')
    });
    //  fuera del overlay

    overlay.addEventListener('click', (e) => {
      // overlay.classList.remove('activo');
      e.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    })
  });