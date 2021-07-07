import * as DataApi from "../../Api/DataApi";
import cssRaces from "./RaceView.module.css";
import cssGR from "../GeneralRanking/GeneralRanking.module.css";
import { useLocation, Link } from "react-router-dom";
function RaceView(props) {
  const params = useLocation();
  const raceName = params.state;

  let carreraN;
  let arrayPilotos;
  if (params && raceName) {
    let tiemposPorCarreras = DataApi.getTiemposPorCarreras();
    carreraN = DataApi.getDatosCarrera(raceName, tiemposPorCarreras)[0];
    arrayPilotos = DataApi.getDatosPilotos();
  } else {
    carreraN = DataApi.getDatosCarrera(props.nombreCarrera, props.carreras)[0];
    arrayPilotos = props.pilotos;
  }
  let posicion = 0;
  return (
    <div
      key={`_${props.nombreCarrera}`}
      className={cssGR.generalRankingContainer}
    >
      <h1 key={`_${props.nombreCarrera}_h1`}> {carreraN.raceName}</h1>
      <div
        key={`_${props.nombreCarrera}_raceResultsContainer`}
        className={cssGR.rankingsContainer}
      >
        {carreraN.raceRanking.map((r) => {
          posicion++;
          let rankPosClas;
          if (posicion === 1) {
            rankPosClas = `${cssGR.firstPlace} ${cssGR.rankPosition}`;
          } else if (posicion === 2) {
            rankPosClas = `${cssGR.secondPlace} ${cssGR.rankPosition}`;
          } else if (posicion === 3) {
            rankPosClas = `${cssGR.thirdPlace} ${cssGR.rankPosition}`;
          } else {
            rankPosClas = `${cssGR.rankPosition}`;
          }
          return (
            <div
              key={`_${props.nombreCarrera}_${Math.random()}_raceRow`}
              className={cssGR.wrapper}
            >
              <div className={cssGR.posWrapper}>
                <div className={rankPosClas}>{posicion}</div>{" "}
              </div>
              <div className={cssGR.imgWrapper}>
                <Link
                  to={{
                    pathname: "./racePilots",
                    state: arrayPilotos[r.pilotId],
                  }}
                >
                  <img
                    src={arrayPilotos[r.pilotId].photo}
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
                <Link to={{ pathname: "./team", state: arrayPilotos[r.pilotId].team }} >({arrayPilotos[r.pilotId].team})</Link><br></br>
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
