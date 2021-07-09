import cssAV from "./AutomaticView.module.css";
import GeneralRanking from "../GeneralRanking/GeneralRanking";
import * as DataApi from "../../Api/DataApi";
import { sleep } from "../../Api/Utils";
import { useState, useEffect } from "react";
import Constants from "../../Api/Constants";
import RaceView from "../RaceView/RaceView";
import RacePilotsView from "../RacePilotsView/RacePilotsView";

function AutomaticView() {
  const [whatIsBeingShown, setWhatIsBeingShown] = useState({
    view: Constants.racePilotsDetails,
    fade: true,
  });
  const mapaCarrerasTiempos = DataApi.getClasificacionPorCarreras();
  const [raceState, setRaceState] = useState(0);
  const mapaUsuarios = DataApi.getDatosPilotos();
  const mapaKeysUsuarios = Object.keys(mapaUsuarios);
  const [pilotsState, setPilotsState] = useState(0);

  /**
   * Rotación de vistas: usuarios -> carreras -> clas. Gen
   * @returns nextView
   */
  function getNextView() {
    let nextView;
    if (whatIsBeingShown.view === Constants.genRank) {
      nextView = Constants.raceView;
    } else if (whatIsBeingShown.view === Constants.raceView) {
      nextView = Constants.racePilotsDetails;
    } else {
      nextView = Constants.genRank;
    }
    return nextView;
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
        }else if (nextView === Constants.racePilotsDetails) {
          setPilotsState(0);
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
          //Cambiamos el estado para que se dispare el evento de fade
          setWhatIsBeingShown({ view: whatIsBeingShown.view, fade: false });
          sleep(1000).then(() => {
            //Cambiamos de estado para el fadeIn y Cambiamos de estado para la clasificación
            //Se cambia primero a false porque el fadeIn solo funciona si la opacidad ya es 0;
            sleep(0).then(() => {
              setWhatIsBeingShown({ view: whatIsBeingShown.view, fade: true });
              setRaceState(raceState + 1);
            });
          });
          
        }
      }, Constants.transitionTimeRaces);
    }

    return () => {
      // cleaning up interval intervalWhatIsBeingShown;
      clearInterval(IntervalTimerRaceView);
    };
  });

  useEffect(() => {
    let IntervalTimerPilots;
    //Definimos el funcionamiento del interval -- mismo funcionamiento que el transitionTimesRaces
    if (whatIsBeingShown.view === Constants.racePilotsDetails) {
      IntervalTimerPilots = setInterval(() => {
        if (pilotsState + 1 >= mapaKeysUsuarios.length) {
          clearInterval(IntervalTimerPilots);
          transitionToNext();
        } else {
          setWhatIsBeingShown({ view: whatIsBeingShown.view, fade: false });
          sleep(1000).then(() => {
            //Cambiamos de estado para el fadeIn y Cambiamos de estado para la clasificación
            //Se cambia primero a false porque el fadeIn solo funciona si la opacidad ya es 0;
            sleep(0).then(() => {
              setWhatIsBeingShown({ view: whatIsBeingShown.view, fade: true });
              setPilotsState(pilotsState + 1);
            });
          });
        }
      }, Constants.transitionTimerPilots);
    }

    return () => {
      // cleaning up interval intervalWhatIsBeingShown;
      clearInterval(IntervalTimerPilots);
    };
  });
  return (
    <div className="maxHeight">
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
      {whatIsBeingShown.view === Constants.racePilotsDetails ? (
        <div
          className={
            whatIsBeingShown.fade
              ? cssAV.fadeInAnimation
              : cssAV.fadeOutAnimation
          }
        >
          <RacePilotsView
            piloto={mapaUsuarios[mapaKeysUsuarios[pilotsState]]}
          ></RacePilotsView>
        </div>
      ) : null}
    </div>
  );
}
export default AutomaticView;
