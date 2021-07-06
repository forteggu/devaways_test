import cssAV from "./AutomaticView.module.css";

import GeneralRanking from "../GeneralRanking/GeneralRanking";
import RacesTimesPositions from "../RacesTimesPositions/RacesTimesPositions";
import * as DataApi from "../../Api/DataApi";
import { orderRacePositionsByTime, sleep } from "../../Api/Utils";
import { useState, useEffect } from "react";
import Constants from "../../Api/Constants";

function AutomaticView() {
  const [whatIsBeingShown, setWhatIsBeingShown] = useState({
    view: Constants.genRank,
    fade: true,
  });
  const mapaCarrerasTiempos = DataApi.getTiemposPorCarreras();
  const mapaUsuarios = DataApi.getDatosPilotos();
  const mapaCarrerasPosiciones = mapaCarrerasTiempos.map((carrera) => {
    return {
      raceName: carrera.raceName,
      raceRanking: orderRacePositionsByTime(carrera.raceRanking),
    };
  });
  function getNextView() {
    let nextView;
    if (whatIsBeingShown.view === Constants.genRank) {
      nextView = Constants.timeMode;
    } else if (whatIsBeingShown.view === Constants.timeMode) {
      nextView = Constants.posMode;
    } else {
      nextView = Constants.genRank;
    }
    return nextView;
  }

  useEffect(() => {
    //Definimos el funcionamiento del interval
    let IntervalTimer = setInterval(() => {
      //Cambiamos el estado fadeState para disparar el fadeout
      setWhatIsBeingShown({ view: whatIsBeingShown.view, fade: false });
      //Esperamos que termine la transición
      sleep(1000).then(() => {
        //Cambiamos de estado para el fadeIn y Cambiamos de estado para la clasificación
        //Se cambia primero a false porque el fadeIn solo funciona si la opacidad ya es 0;
        setWhatIsBeingShown({ view: getNextView(), fade: false });
        sleep(0).then(() => {
          setWhatIsBeingShown({ view: getNextView(), fade: true });
        });
      });
    }, 100000);
    return () => {
      // cleaning up interval intervalWhatIsBeingShown;
      clearInterval(IntervalTimer);
    };
  });
  return (
    <div>
      {whatIsBeingShown.view === Constants.genRank ? (
        <div
          className={
            whatIsBeingShown.fade
              ? cssAV.fadeInAnimation
              : cssAV.fadeOutAnimation
          }
        >
          <GeneralRanking></GeneralRanking>
        </div>
      ) : null}
      {whatIsBeingShown.view === Constants.timeMode ? (
        <div
          className={
            whatIsBeingShown.fade
              ? cssAV.fadeInAnimation
              : cssAV.fadeOutAnimation
          }
        >
          <RacesTimesPositions
            listadoCarreras={mapaCarrerasTiempos}
            pilotos={mapaUsuarios}
            mode={Constants.timeMode}
          ></RacesTimesPositions>
        </div>
      ) : null}
      {whatIsBeingShown.view === Constants.posMode ? (
        <div
          className={
            whatIsBeingShown.fade
              ? cssAV.fadeInAnimation
              : cssAV.fadeOutAnimation
          }
        >
          <RacesTimesPositions
            listadoCarreras={mapaCarrerasPosiciones}
            pilotos={mapaUsuarios}
            mode={Constants.posMode}
          ></RacesTimesPositions>
        </div>
      ) : null}
      <div className="scrollToHere">[1] ...</div>
    </div>
  );
}
export default AutomaticView;
