//VARIABLES
const formulario = document.getElementById('filmsForm');
const selectGenero = document.getElementById('generoPelicula');
const filtrar = document.getElementById('filtrar');
const tabla = document.querySelector('.tablaContenido');
const fragmento = document.createDocumentFragment();
const arrayGeneros = ['terror', 'acción', 'romántica', 'comedia'];
let arrayMostrar = [];
// let obj = {};
const regEx = {
    titulo: /^[a-zA-Z0-9\s.,'!?-ñÑ]+$/,
    director:  /^[a-zA-Z\s.-ñÑ]+$/,
    year: /^[\d]{4}$/  //new Date().getFullYear()
}
const objValidar = {
    titulo: false,
    director: false,
    year: false,
    genero: false
}

//EVENTOS
formulario.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    validarForm();
    pintarTabla(arrayMostrar);
    formulario.reset();
});

filtrar.addEventListener('change', (ev) => {
    filtrarPorGenero();
});

//FUNCIONES
//->VALIDACIONES
const validarForm = () => {
    const titulo = formulario.tituloPelicula.value;
    const director = formulario.directorPelicula.value;
    const year = formulario.yearPelicula.value;
    const generoSelect = formulario.generoPelicula.value;
    const fechaActual = new Date().getFullYear();
    let obj = {};

    if (titulo !== '') {
        if (regEx.titulo.test(titulo)) {
            objValidar.titulo = true;
        } else objValidar.titulo = false;
    } else objValidar.titulo = false;

    if (director !== '') {
        if (regEx.director.test(director)) {
            objValidar.director = true;
        } else objValidar.director = false;
    } else objValidar.director = false;
    
    if (year !== '') {
        if ((year >= 1800 && year <= fechaActual) && regEx.year.test(year)) {
            objValidar.year = true;
        } else objValidar.year = false;
    } else objValidar.year = false;

    if (generoSelect !== '--selecciona un género--') {
        objValidar.genero = true;
    } else objValidar.genero = false;

    const arrayObjValidar = Object.values(objValidar);
    const correcto = arrayObjValidar.some((value) => value === false);
    if (!correcto) {
        obj.titulo = titulo;
        obj.director = director;
        obj.year = year;
        obj.generoSelect = generoSelect;
        arrayMostrar.push(obj);
        filtrar.disabled = false;
        // obj = {}; //reset de obj cada push
    } else {
        alert('Campos no válidos');
    }
}


//->MODIFICAR ELEMENTOS DEL DOM
const limpiar = (componente) => {
    return componente.innerHTML = '';
}

const pintarFalloFiltro = () => {
    const fila = document.createElement('tr');
    const celda1 = document.createElement('td');
    celda1.textContent = 'No hay películas con ese género';
    fila.append(celda1);
    fragmento.append(fila);
    tabla.append(fragmento);
}

const pintarOpcionesFiltro = (...array) => {
    array.forEach((elemento) => {
        const genero = document.createElement('option');
        genero.textContent = elemento;
        genero.value = elemento;
        fragmento.append(genero);
    });
    return fragmento;
}

const pintarTabla = (data) => {
    limpiar(tabla);
    data.forEach(({titulo, director, year, generoSelect}) => {
        const fila = document.createElement('tr');
        const celda1 = document.createElement('td');
        const celda2 = document.createElement('td');
        const celda3 = document.createElement('td');
        const celda4 = document.createElement('td');
        celda1.textContent = titulo;
        celda2.textContent = director;
        celda3.textContent = year;
        celda4.textContent = generoSelect;
        fila.append(celda1, celda2, celda3, celda4);
        fragmento.append(fila);
    });
    tabla.append(fragmento);
}

const filtrarPorGenero = () => {
        const generoFiltrar = filtrar.value;
        let filtered = arrayMostrar.filter((peli) => peli.generoSelect === generoFiltrar);

        if (filtered.length > 0) {
            pintarTabla(filtered);
        }
        if (filtered.length === 0) {
            limpiar(tabla);
            pintarFalloFiltro();
        }
        if (filtrar.value === 'Todos') {
            pintarTabla(arrayMostrar);
        }
}

//INVOCACIONES
selectGenero.append(pintarOpcionesFiltro('--selecciona un género--', ...arrayGeneros));
filtrar.append(pintarOpcionesFiltro('Todos', ...arrayGeneros));

