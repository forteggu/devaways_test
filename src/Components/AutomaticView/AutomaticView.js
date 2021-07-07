import cssAV from "./AutomaticView.module.css";

import GeneralRanking from "../GeneralRanking/GeneralRanking";
import * as DataApi from "../../Api/DataApi";
import { sleep } from "../../Api/Utils";
import { useState, useEffect } from "react";
import Constants from "../../Api/Constants";
import RaceView from "../RaceView/RaceView";

function AutomaticView() {
  const [whatIsBeingShown, setWhatIsBeingShown] = useState({
    view: Constants.raceView,
    fade: true,
  });
  const mapaCarrerasTiempos = DataApi.getTiemposPorCarreras();
  const [raceState, setRaceState] = useState(0);
  const mapaUsuarios = DataApi.getDatosPilotos();

  function getNextView() {
    return whatIsBeingShown.view === Constants.genRank
      ? Constants.raceView
      : Constants.genRank;
  }
  function transitionToNext() {
    let nextView = getNextView();
    //Cambiamos el estado fadeState para disparar el fadeout
    setWhatIsBeingShown({ view: whatIsBeingShown.view, fade: false });
    //Esperamos que termine la transición
    sleep(1000).then(() => {
      //Cambiamos de estado para el fadeIn y Cambiamos de estado para la clasificación
      //Se cambia primero a false porque el fadeIn solo funciona si la opacidad ya es 0;
      setWhatIsBeingShown({ view: nextView, fade: false });
      sleep(0).then(() => {
        if (nextView === Constants.raceView) {
          setRaceState(0);
        }
        setWhatIsBeingShown({ view: nextView, fade: true });
      });
    });
  }
  useEffect(() => {
    //Definimos el funcionamiento del interval
    let IntervalTimer = setInterval(() => {
      transitionToNext();
    }, Constants.transitionTimeViews);
    return () => {
      // cleaning up interval intervalWhatIsBeingShown;
      clearInterval(IntervalTimer);
    };
  });

  useEffect(() => {
    let IntervalTimerRaceView;
    //Definimos el funcionamiento del interval
    if (whatIsBeingShown.view === Constants.raceView) {
      IntervalTimerRaceView = setInterval(() => {
        if (raceState + 1 >= mapaCarrerasTiempos.length) {
          clearInterval(IntervalTimerRaceView);
          transitionToNext();
        } else {
          setRaceState(raceState + 1);
        }
      }, Constants.transitionTimeRaces);
    }

    return () => {
      // cleaning up interval intervalWhatIsBeingShown;
      clearInterval(IntervalTimerRaceView);
    };
  });
  return (
    <div className={cssAV.maxHeight}>
      {whatIsBeingShown.view === Constants.raceView ? (
        <div
          className={
            whatIsBeingShown.fade
              ? cssAV.fadeInAnimation
              : cssAV.fadeOutAnimation
          }
        >
          <RaceView
            nombreCarrera={`Race ${raceState}`}
            carreras={mapaCarrerasTiempos}
            pilotos={mapaUsuarios}
          ></RaceView>
        </div>
      ) : null}
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
    </div>
  );
}
export default AutomaticView;
