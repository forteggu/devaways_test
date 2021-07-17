import React, { useState, useEffect } from "react";
import Constants from "../Api/Constants";
import * as DataApi from "../Api/DataApi";
import GeneralRanking from "../Components/GeneralRanking/GeneralRanking";
import useSliderStateManagerHook from "./useSliderStateManagerHook";
import RacePilotsView from "../Components/RacePilotsView/RacePilotsView";
import RaceView from "../Components/RaceView/RaceView";
import { animated, useTransition, Spring } from "react-spring";
import { sleep } from "../Api/Utils";

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
    return <div className="maxHeight">{content}</div>;
  };
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
  return (
    <Spring
      from={{ opacity: 0}}
      to={[
        { opacity: 1},
        {
          delay:
            sliderState.transitionTime - 1500 > 0
              ? sliderState.transitionTime - 1500
              : 0,
          opacity: 0,
        },
      ]}
    >
      {(styles) => <animated.div style={{height:"100%",...styles}}>{getContent()}</animated.div>}
    </Spring>
  );
}

export default useSliderJSXProvider;
