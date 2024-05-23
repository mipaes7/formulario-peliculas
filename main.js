//VARIABLES
const formulario = document.getElementById('filmsForm');
    const titulo = formulario.tituloPelicula.value;
    const director = formulario.directorPelicula.value;
    const year = formulario.yearPelicula.value;
    const generoSelect = formulario.generoPelicula.value;
const selectGenero = document.getElementById('generoPelicula');
const filtrar = document.getElementById('filtrar');
console.log(filtrar);
const tabla = document.querySelector('.tablaContenido');
const fragmento = document.createDocumentFragment();
const arrayGeneros = ['terror', 'acción', 'romántica', 'comedia'];
let arrayMostrar = [];
let obj = {};
const regEx = {
    titulo: /^[a-zA-Z0-9\s.,'!?-ñÑ]+$/,
    director:  /^[a-zA-Z\s.-ñÑ]+$/,
    year: /^(18[0-9]{2}|19[0-9]{2}|20[0-9]{2}|2100)$/  //new Date().getFullYear()
}
const objValidar = {
    titulo: false,
    director: false,
    year: false
}

//EVENTOS
formulario.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    validarForm();
    pintarTabla(arrayMostrar);
    filtrar.disable = false;
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
        if (regEx.year.test(year)) {
            objValidar.year = true;
        } else objValidar.year = false;
    } else objValidar.year = false;

    const arrayObjValidar = Object.values(objValidar);
    const correcto = arrayObjValidar.every((value) => value === true);
    if (correcto) {
        obj.titulo = titulo;
        obj.director = director;
        obj.year = year;
        obj.generoSelect = generoSelect;
        arrayMostrar.push(obj);
        obj = {}; //reset de obj cada push
        // pintarTabla();
    } else {
        alert('Campos no válidos');
    }
}

//->MODIFICAR ELEMENTOS DEL DOM
const limpiar = (componente) => {
    return componente.innerHTML = '';
}

const pintarOpcionesFiltro = (componente) => {
    arrayGeneros.forEach((elemento) => {
        const genero = document.createElement('option');
        genero.textContent = elemento;
        genero.value = elemento;
        fragmento.append(genero);
    });
    componente.append(fragmento);
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
    // filtrar.disable = false;
}

const filtrarPorGenero = () => {
    const generoFiltrar = filtrar.value;
    const filtered = generoFiltrar === 'all'
        ? arrayMostrar
        : arrayMostrar.filter((peli) => peli.generoSelect === generoFiltrar);

    pintarTabla(filtered);
}

//INVOCACIONES
pintarOpcionesFiltro(selectGenero);
pintarOpcionesFiltro(filtrar);

