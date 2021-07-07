import cssAV from "./AutomaticView.module.css";

import GeneralRanking from "../GeneralRanking/GeneralRanking";
import RacesTimesPositions from "../RacesTimesPositions/RacesTimesPositions";
import * as DataApi from "../../Api/DataApi";
import { orderRacePositionsByTime, sleep } from "../../Api/Utils";
import { useState, useEffect } from "react";
import Constants from "../../Api/Constants";
import RaceView from "../RaceView/RaceView";

function AutomaticView() {
  /*const [whatIsBeingShown, setWhatIsBeingShown] = useState({
    view: Constants.genRank,
    fade: true,
  });*/
  const [whatIsBeingShown, setWhatIsBeingShown] = useState({
    view: Constants.raceView,
    fade: true,
  });
  const mapaCarrerasTiempos = DataApi.getTiemposPorCarreras();
  const [raceState, setRaceState] = useState(0);
  const mapaUsuarios = DataApi.getDatosPilotos();
  const mapaCarrerasPosiciones = mapaCarrerasTiempos.map((carrera) => {
    return {
      raceName: carrera.raceName,
      raceRanking: orderRacePositionsByTime(carrera.raceRanking),
    };
  });
  function getNextView() {
    /*let nextView;
    if (whatIsBeingShown.view === Constants.genRank) {
      nextView = Constants.timeMode;
    } else if (whatIsBeingShown.view === Constants.timeMode) {
      nextView = Constants.posMode;
    } else {
      nextView = Constants.genRank;
    }
    return nextView;*/
    return Constants.genRank;
  }
  function transitionToNext() {
    let nextView=getNextView();
    //Cambiamos el estado fadeState para disparar el fadeout
    setWhatIsBeingShown({ view: whatIsBeingShown.view, fade: false });
    //Esperamos que termine la transición
    sleep(1000).then(() => {
      //Cambiamos de estado para el fadeIn y Cambiamos de estado para la clasificación
      //Se cambia primero a false porque el fadeIn solo funciona si la opacidad ya es 0;
      setWhatIsBeingShown({ view: nextView, fade: false });
      sleep(0).then(() => {
        if(nextView === Constants.raceView){
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
    }, 10000);
    return () => {
      // cleaning up interval intervalWhatIsBeingShown;
      console.log("cleaning the changeview interval");
      clearInterval(IntervalTimer);
    };
  });

  useEffect(() => {
    let IntervalTimerRaceView;
    //Definimos el funcionamiento del interval
    if (whatIsBeingShown.view === Constants.raceView) {
      IntervalTimerRaceView = setInterval(() => {
        if (raceState + 1 > mapaCarrerasTiempos.length) {
          clearInterval(IntervalTimerRaceView);
          transitionToNext();
        } else {
          setRaceState(raceState + 1);
        }
      }, 1000);
    }

    return () => {
      // cleaning up interval intervalWhatIsBeingShown;
      console.log("cleaning the IntervalTimerRaceView");
      clearInterval(IntervalTimerRaceView);
    };
  });
  return (
    <div>
      {console.log(raceState)}
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
    </div>
  );
}
export default AutomaticView;
