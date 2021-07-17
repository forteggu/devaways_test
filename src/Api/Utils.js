import Constants from "./Constants";
import * as DataApi from "./DataApi";
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

export function orderRacePositionsByTime(race) {
  return race.sort((a, b) => fixTimeStamp(a.tiempo) > fixTimeStamp(b.tiempo));
}
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
