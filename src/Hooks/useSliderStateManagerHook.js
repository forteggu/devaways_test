import { useEffect, useState } from "react";
import Constants from "../Api/Constants";
import * as Utils from "../Api/Utils";
const useSliderStateManagerHook = () => {
  //Se crea un estado por defecto
  const defaultState = {
    view: Constants.genRank,
    transitionTime: Utils.getTransitionTime(Constants.genRank),
    index: 0,
    structure: Utils.getStructureForView(Constants.genRank),
    mode: 0,
  };
  const [sliderState, setSliderState] = useState(defaultState); //Estado del slider
  /**
   * Método que obtiene la siguiente vista
   * @returns
   */
  const getNextView = () => {
    let nextView;

    if (sliderState.view === Constants.genRank) {
      nextView = Constants.raceView;
    } else if (sliderState.view === Constants.raceView) {
      nextView = Constants.racePilotsDetails;
    } else {
      nextView = Constants.genRank;
    }
    return nextView;
  };
  /**
   * Método que obtiene el siguiente estado en función del actual
   * Se actualiza el index y la estructura en función de la vista en la que estemos
   * * * La vista general no tiene estructura de datos por lo que index = 0
   * * * Si el siguiente indice que apuntaría a la estructura devuelve undefined, cambiamos de vista y el index es 0
   * 
   * @returns
   */
  const getNextState = () => {
    let newState = sliderState ? { ...sliderState } : { ...defaultState }; //Se define el newState
    newState.index =
      sliderState.view === Constants.genRank ||
      !sliderState.structure[sliderState.index + 1]
        ? 0
        : sliderState.index + 1; //Se resetea el indice
    newState.view = sliderState.structure[sliderState.index + 1]
      ? sliderState.view
      : getNextView(); //Se obtiene la próxima vista
    newState.structure = sliderState.structure[sliderState.index + 1]
      ? sliderState.structure
      : Utils.getStructureForView(newState.view); //Se obtiene la estructura de la vista
    newState.transitionTime = sliderState.structure[sliderState.index + 1]
      ? sliderState.transitionTime
      : Utils.getTransitionTime(newState.view); //Se obtiene su tiempo de transición
    return newState;
  };
  /**
   * El useEffect controla el intervalo de tiempo que tiene que pasar entre un slide y el siguiente
   * El useEffect se reinicia cuando el componente se desmonta o se modifica el sliderState
   */
  useEffect(() => {
    console.log(
      `Currently @ View: ${sliderState.view} | Index: ${sliderState.index}`
    );
    const intervalId = setInterval(() => {
      setSliderState(getNextState);
    }, sliderState.transitionTime);
    return () => {
      clearInterval(intervalId);
    };
  }, [sliderState]);

  return sliderState;
};

export default useSliderStateManagerHook;
