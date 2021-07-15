import React from "react";
import Constants from "../Api/Constants";
import * as DataApi from "../Api/DataApi";
import GeneralRanking from "../Components/GeneralRanking/GeneralRanking";
import useSliderStateManagerHook from "./useSliderStateManagerHook";
import RacePilotsView from "../Components/RacePilotsView/RacePilotsView";
import RaceView from "../Components/RaceView/RaceView";

function useSliderJSXProvider() {
  const sliderState = useSliderStateManagerHook();
  const getContent = () => {
    let content;
    switch (sliderState.view) {
      case Constants.racePilotsDetails:
        content = getRacePilotsContent();
        break;
      case Constants.raceView:
        content = getRacesContent();
        break;
      default:
        content = getGenRankContent();
    }
    return <div className='maxHeight'>{content}</div>;
  };
  const getRacePilotsContent = () => {
    return <RacePilotsView piloto={sliderState.structure[sliderState.index]}></RacePilotsView>;
  };

  const getRacesContent = () => {
    return (
      <RaceView
        nombreCarrera={`Race ${sliderState.index}`}
        carreras={DataApi.getClasificacionPorCarreras()}
        pilotos={DataApi.getDatosPilotos()}
      ></RaceView>
    );
  };

  const getGenRankContent = () => {
    return (
      <GeneralRanking
      ></GeneralRanking>
    );
  };

  return getContent();
}

export default useSliderJSXProvider;
