import React from "react";
import Constants from "../Api/Constants";
import * as DataApi from "../Api/DataApi";
import GeneralRanking from "../Components/GeneralRanking/GeneralRanking";
import RacePilotsView from "../Components/RacePilotsView/RacePilotsView";
import RaceView from "../Components/RaceView/RaceView";

function useSliderJSXProvider(sliderState) {
  const getRacePilotsContent = () => {
    return (
      <div className="maxHeight">
        <RacePilotsView
          piloto={sliderState.structure[sliderState.index]}
        ></RacePilotsView>
      </div>
    );
  };

  const getRacesContent = () => {
    return (
      <div className="maxHeight">
        <RaceView
          nombreCarrera={`Race ${sliderState.index}`}
          carreras={DataApi.getClasificacionPorCarreras()}
          pilotos={DataApi.getDatosPilotos()}
        ></RaceView>
      </div>
    );
  };

  const getGenRankContent = () => {
    return (
      <div className="maxHeight">
        <GeneralRanking></GeneralRanking>;
      </div>
    );
  };

  // Devuelve el contenido jsx en función del contenido del sliderState
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
  return <div className="maxHeight">{content}</div>;
}

export default useSliderJSXProvider;
