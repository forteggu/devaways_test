import { useEffect, useState } from "react";
import Constants from "../Api/Constants";
import * as Utils from "../Api/Utils";
const useSliderStateManagerHook = () => {
  const defaultState = {
    view: Constants.genRank,
    transitionTime: Utils.getTransitionTime(Constants.genRank),
    index: 0,
    structure: Utils.getStructureForView(Constants.genRank),
    mode: 0,
  };

  const [sliderState, setSliderState] = useState(defaultState);

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

  const getNextState = () => {
    let newState = sliderState ? { ...sliderState } : { ...defaultState };
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
