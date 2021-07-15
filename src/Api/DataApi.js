import RJson from "../Resources/drivers_karts_Front.json";
import * as Utils from "./Utils";
export function getRJson() {
  return RJson;
}
/**
 * Para esta función partimos del supuesto de que si el sistema se escala:
 * Todos los pilotos siguen teniendo el mismo número de carreras
 * Las carreras estan ordenadas tal y como lo están actualmente en el JSON
 */
export function getGeneralRanking() {
  let globalRanking = [];
  let numCarreras = RJson[0].races.length; //Obtenemos el número de carreras
  for (let n = 0; n < numCarreras; n++) {
    //Recorremos las carreras
    let datosN = RJson.map((racePilot) => {
      return {
        datosPiloto: {
          _id: racePilot._id,
          name: racePilot.name,
          picture: racePilot.picture,
          age: racePilot.age,
          team: racePilot.team,
        },
        tiempo: racePilot.races[n].time,
      }; //obtenemos los tiempos de cada piloto para cada carrera, creando así un mapa más sencillo de trabajar
    });
    datosN.sort(
      (a, b) => Utils.fixTimeStamp(a.tiempo) > Utils.fixTimeStamp(b.tiempo)
    ); //ordenamos los resultados por tiempo
    //Recorremos los resultados y empezamos a generar el ranking final
    let vp = datosN.length; //los victory points iniciales es el numero de corredores
    for (let u of datosN) {
      let existsRacePilot = globalRanking.filter(
        (item) => item && item.datosPiloto.name === u.datosPiloto.name
      );
      if (existsRacePilot.length > 0) {
        //Después ya existe el usuario y actualiza su registro

        let index = globalRanking.findIndex(
          (item) => item.datosPiloto.name === u.datosPiloto.name
        );
        if (index > -1) {
          globalRanking[index].puntuacion += vp;
        }
      } else {
        //En primera iteración entrará aqui y establece el primer valor
        globalRanking.push({ datosPiloto: u.datosPiloto, puntuacion: vp });
      }
      vp--;
    }
  }

  globalRanking.sort((a, b) => a.puntuacion < b.puntuacion);

  return Utils.setPole(globalRanking);
}

/**
 * Devuelve un mapa de las carreras y sus tiempos de forma ordenada
 *
 * Para esta función partimos del supuesto de que si el sistema se escala:
 * Todos los pilotos siguen teniendo el mismo número de carreras
 * Las carreras estan ordenadas tal y como lo están actualmente en el JSON
 */
export function getClasificacionPorCarreras() {
  let numCarreras = RJson[0].races.length;
  let mapaCarreasTiempos = [];
  for (let n = 0; n < numCarreras; n++) {
    let datosN = RJson.map((racePilot) => {
      return { pilotId: racePilot._id, tiempo: racePilot.races[n].time };
    });
    datosN.sort(
      (a, b) => Utils.fixTimeStamp(a.tiempo) > Utils.fixTimeStamp(b.tiempo)
    );
    mapaCarreasTiempos = [
      ...mapaCarreasTiempos,
      { raceName: RJson[0].races[n].name, raceRanking: datosN },
    ];
  }
  return mapaCarreasTiempos;
}

/**
 * Esta función devuelve los tiempos por carreras sin ordenar
 *
 * Para esta función partimos del supuesto de que si el sistema se escala:
 * Todos los pilotos siguen teniendo el mismo número de carreras
 * Las carreras estan ordenadas tal y como lo están actualmente en el JSON
 */
export function getTiemposPorCarreras() {
  let numCarreras = RJson[0].races.length;
  let mapaCarreasTiempos = [];
  for (let n = 0; n < numCarreras; n++) {
    let datosN = RJson.map((racePilot) => {
      return { pilotId: racePilot._id, tiempo: racePilot.races[n].time };
    });
    mapaCarreasTiempos = [
      ...mapaCarreasTiempos,
      { raceName: RJson[0].races[n].name, raceRanking: datosN },
    ];
  }
  return mapaCarreasTiempos;
}

//Se crea una biblioteca de acceso rápido a los pilotos - acceso por _id
export function getDatosPilotos() {
  let pilotos = {};
  for (let p of RJson) {
    pilotos[p._id] = {
      name: p.name,
      picture: p.picture,
      age: p.age,
      team: p.team,
      _id: p._id,
    };
  }
  return pilotos;
}

export function getPilotos() {
  return RJson.map((piloto) => {
    return {
      name: piloto.name,
      picture: piloto.picture,
      age: piloto.age,
      team: piloto.team,
      _id: piloto._id,
    };
  });
}
//Devueve los datos de la carrera ordenados por tiempo
export function getDatosCarrera(nombreCarrera, carreras) {
  return Utils.orderRacePositionsByTime(
    carreras.filter((c) => c.raceName === nombreCarrera)
  );
}

//Devuelve la posición del piloto en cada carrera
export function getDatosCarrerasPosicionPiloto(idPiloto) {
  let carrerasOrdenadas = getClasificacionPorCarreras();
  return carrerasOrdenadas.map((carrera) => {
    let indexRes = carrera.raceRanking.findIndex(
      (rp) => idPiloto === rp.pilotId
    );
    return {
      raceName: carrera.raceName,
      raceTime: carrera.raceRanking[indexRes].tiempo,
      posInRace: indexRes + 1,
    };
  });
}

export function getTeams() {
  let arrayEquiposMiembros = [];
  for (let v of RJson) {
    let tIndex = arrayEquiposMiembros.findIndex((t) => (t.teamName = v.team));
    let tMember = { name: v.name, picture: v.picture, _id: v._id };
    if (tIndex > -1) {
      arrayEquiposMiembros[tIndex].teamMembers = [
        ...arrayEquiposMiembros[tIndex].teamMembers,
        tMember,
      ];
    } else {
      arrayEquiposMiembros.push({ teamName: v.team, teamMembers: [tMember] });
    }
  }
}

export function getMembersByTeam(teamName) {
  return RJson.filter((piloto) => piloto.team === teamName);
}
