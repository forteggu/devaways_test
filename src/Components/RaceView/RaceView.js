import * as DataApi from "../../Api/DataApi";
import cssRaces from "./RaceView.module.css";
import cssGR from "../GeneralRanking/GeneralRanking.module.css";
import { useLocation, Link } from "react-router-dom";
import {getRankingClass} from "../../Api/Utils";
import useRaceDataHook from "../../Hooks/useRaceDataHook";
function RaceView(props) {
  const params = useLocation();

  let [carreraN,arrayPilotos ] = useRaceDataHook(params,props);
  let posicion = 0;
  return (
    <div
      key={`_${props.nombreCarrera}`}
      className={cssGR.generalRankingContainer}
    >
      <h1 className='gradientTitle' key={`_${props.nombreCarrera}_h1`}> {carreraN.raceName}</h1>
      <div
        key={`_${props.nombreCarrera}_raceResultsContainer`}
        className={cssGR.rankingsContainer}
      >
        {carreraN.raceRanking.map((r) => {
          posicion++;
          return (
            <div
              key={`_${props.nombreCarrera}_${Math.random()}_raceRow`}
              className={cssGR.wrapper}
            >
              <div className={cssGR.posWrapper}>
                <div className={getRankingClass(posicion)}>{posicion}</div>
              </div>
              <div className={cssGR.imgWrapper}>
                <Link
                  to={{
                    pathname: "./racePilots",
                    state: arrayPilotos[r.pilotId],
                  }}
                >
                  <img
                    src={arrayPilotos[r.pilotId].picture}
                    alt={"Foto " + arrayPilotos[r.pilotId].name}
                    className={cssRaces.foto}
                  ></img>
                </Link>
              </div>
              <div className={cssRaces.rankName}>
                <Link
                  to={{
                    pathname: "./racePilots",
                    state: arrayPilotos[r.pilotId],
                  }}
                >
                  {arrayPilotos[r.pilotId].name}
                </Link>
                <Link to={{ pathname: "./team", state: arrayPilotos[r.pilotId].team }} >&nbsp;({arrayPilotos[r.pilotId].team})</Link><br></br>
                {"Tiempo: " + r.tiempo}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RaceView;
