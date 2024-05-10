const divDetailsPlayer = document.querySelector('.div-detail-player')
const JUGADOR = document.getElementById('nombreJugador');
const posicionJugador = document.getElementById('posicionJugador');
const dorsalJugador = document.getElementById('dorsalJugador');


document.querySelector('#addPlayer').addEventListener('click', (e) => {
    divDetailsPlayer.insertAdjacentHTML('beforeend', crearItemHTML());
});


//plantillas de equipos y jugadores
const modelTeam = {
    nombreEquipo : '',
    logoEquipo : '',
    ciudadEquipo : '',
    nombreTecnico : '',
    player : []
}

const modelPlayer = {
    nombreJugador : '',
    posicionJugador : '',
    dorsalJugador : ''
}



let betplay = [];
let charactermp = modelPlayer
let characterp = modelTeam;

//agregar equipos dentro de la lista y jugador dentro de equipos


document.querySelector('#addPlantilla').addEventListener('click', (e) => {

    e.preventDefault()
    const formularioPlayers = document.querySelector('#frmteam')
    const datos = Object.fromEntries(new FormData(formularioPlayers).entries());

    characterp.nombreEquipo = datos.nombreEquipo;
    characterp.logoEquipo = datos.logoEquipo;
    characterp.ciudadEquipo = datos.ciudadEquipo;
    characterp.nombreTecnico = datos.nombreTecnico;

    Object.keys(datos).forEach(key => {
        if (key.startsWith("nombreJugador")) {
            const id = key.substring("nombreJugador".length);
            const nuevoJugador = {
                nombreJugador: datos[`nombreJugador${id}`],
                posicionJugador: datos[`posicionJugador${id}`],
                dorsalJugador: datos[`dorsalJugador${id}`]
            };
            characterp.player.push(nuevoJugador);
        }
    });

    console.log(characterp);

    betplay.unshift(characterp);
    console.log(betplay);
})
//insertar html

const crearItemHTML = () => {
    
    let id = Date.now().toString(16);
    let suiteHTML = /* html */ `
    <div class="row justify-content-md-center" id="team${id}">
        <div class="col-md-4">
            <label for="nombreJugador" class="form-label">Nombre del Jugador</label>
            <input type="text" class="form-control" name="nombreJugador${id}" id="nombreJugador${id}" >
        </div>
        <div class="col-md-4">
            <label for="posicionJugador" class="form-label">Posicion</label>
            <select name="posicionJugador${id}" id="posicionJugador${id}" class="form-select">
                <option selected>Selecciona una ciudad</option>
            </select>
        </div>
        <div class="col-md-2">
            <label for="dorsalJugador" class="form-label">Dorsal</label>
            <input type="number" class="form-control" name="dorsalJugador${id}" id="dorsalJugador${id}">
        </div>
        <div class="col-md-1 position-relative">
            <button type="button" class="btn btn-danger position-absolute bottom-0 start-0" data-id="${id}" id="removePlayer" >-</button>
        </div>
  </div>`;
    return suiteHTML;
}




// funcion para eliminar 
divDetailsPlayer.addEventListener('click', (e) => {
    if (e.target.id == 'removePlayer') {
        eliminar(e.target.dataset.id)
    }
})
const eliminar = (idxd) => {
    let player = document.querySelector(`#team${idxd}`)
    player.remove()
}
