import Constants from "./Constants";
import * as DataApi from "./DataApi";
import cssGR from "../Components/GeneralRanking/GeneralRanking.module.css";

/**
 * Este método corrige los tiempos para evitar la trampa de que los .sort den resultados erróneos
 * @param {*} time
 * @returns
 */
export function fixTimeStamp(time) {
  let splitdTimeHM = time.split(":"); //Obtiene hh:mm: + ss:mmss
  let splitdTimeSMs = splitdTimeHM[2].split("."); //Obtiene ss:mmss
  splitdTimeHM.pop(); //Elimina los ss:mmss
  let newTimeHM = splitdTimeHM.map((time) => {
    return time.length === 1 ? "0" + time : time;
  });
  let newTimeSMs = splitdTimeSMs.map((time) => {
    return time.length === 1 ? "0" + time : time;
  });
  return newTimeHM.join(":") + ":" + newTimeSMs.join(".");
}

/**
 * Este método se utiliza para asignar una posición según el número de puntos que se haya determinado que tienen los pilotos
 */
export function setPole(ranking) {
  let posNumber = 1;
  return ranking.map((pos, index, elements) => {
    let nextPos = elements[index + 1];
    //Se tiene en cuenta si dos o más pilotos tienen los mismos puntos. Eso puede llevar a errores en los rankings.
    //En caso de empate se les da a ambos el mismo puesto
    if (nextPos && nextPos.puntuacion === pos.puntuacion) {
      pos.posicion = posNumber;
    } else {
      pos.posicion = posNumber;
      posNumber++;
    }
    return pos;
  });
}
/**
 * Ordena la carrera pasada por parametro por tiempo
 * @param {*} race 
 * @returns 
 */
export function orderRacePositionsByTime(race) {
  return race.sort((a, b) => fixTimeStamp(a.tiempo) > fixTimeStamp(b.tiempo));
}
/**
 * Obtiene el tiempo de transicion en funcion de la vista
 * @param {*} stateView 
 * @returns 
 */
export const getTransitionTime = (stateView) => {
  let ret;
  switch (stateView) {
    case Constants.raceView:
      ret = Constants.transitionTimeRaces;
      break;
    case Constants.genRank:
      ret = Constants.transitionTimeViews;
      break;
    case Constants.racePilotsDetails:
      ret = Constants.transitionTimerPilots;
      break;
    default:
      ret = Constants.transitionTimeViews;
  }
  return ret;
};

/**
 * Obtiene la estructura de datos en funcion de la vista
 * @param {*} view 
 * @returns 
 */
export const getStructureForView = (view) => {
  let retStructure;
  switch (view) {
    case Constants.raceView:
      retStructure = DataApi.getClasificacionPorCarreras();
      break;
    case Constants.racePilotsDetails:
      retStructure = DataApi.getPilotos();
      break;
    default:
      retStructure = [];
  }
  return retStructure;
  
};

/**
 * Obtiene la clase CSS en funcion de la posición del ranking
 * @param {*} item 
 * @returns 
 */
export const getRankingClass = (item) => {
  let rankPosClas;
  if (item.posicion === 1) {
    rankPosClas = `${cssGR.firstPlace} ${cssGR.rankPosition}`;
  } else if (item.posicion === 2) {
    rankPosClas = `${cssGR.secondPlace} ${cssGR.rankPosition}`;
  } else if (item.posicion === 3) {
    rankPosClas = `${cssGR.thirdPlace} ${cssGR.rankPosition}`;
  } else {
    rankPosClas = `${cssGR.rankPosition}`;
  }
  return rankPosClas;
};

