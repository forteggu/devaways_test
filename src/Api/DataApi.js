import RJson from "../Resources/drivers_karts_Front.json";

export function getRJson() {
  return RJson;
}

export function getDatosPorCarreras() {
    let mapaCarreras = [];
    //Recorremos el json.
  for (let corredor of RJson) {
    //para cada corredor recorremos sus carreras.
    for (let carrera of corredor.races) {
      //Si la carrera no existe, la creamos
      //Utilizamos el campo raceName como index para saber en que objeto meter los datos que vayamos recorriendo.
      let nIndexCarrera = mapaCarreras.findIndex(
        (elemento) => elemento.raceName === carrera.name
      );
      if (nIndexCarrera === -1) {
        mapaCarreras.push({
          raceName: carrera.name,
          datos: [
            {
              corredor: corredor.name,
              tiempo: carrera.time,
            },
          ],
        });
      } else {
        mapaCarreras[nIndexCarrera].datos.push({
          corredor: corredor.name,
          tiempo: carrera.time,
        });
      }
    }
  }
  return mapaCarreras;
}
export function getDatosCarrera(carrera) {}
export function getGeneralRanking() {
  let mapaCarreras = getDatosPorCarreras();
  let rankingOrdenado = [];    
  /**
   * Una vez tenemos el mapa de todas las carreras con sus resultados,
   * ordenamos cada carrera por sus tiempos y sumamos puntos para saber el resultado de la clasificacion global
   */
  let rankingTemporal = [];
  for (let carrera of mapaCarreras) {
    carrera.datos.sort((a,b) => a.tiempo > b.tiempo);
    //Una vez ordenada cada carrera ...
    
  }
  console.log(mapaCarreras);

  //races.sort((a,b) => a.time > b.time);
}
