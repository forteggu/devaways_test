import * as DataApi from "../../Api/DataApi";
import cssRaces from "./RaceView.module.css";
import cssGR from "../GeneralRanking/GeneralRanking.module.css";
function RaceView(props) {
  let carreraN = DataApi.getDatosCarrera(
    props.nombreCarrera,
    props.carreras
  )[0];
  console.log(carreraN);
  let posicion = 0;
  return (
    <div key={`_${props.nombreCarrera}`} className={cssGR.generalRankingContainer}>
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
              <div className={rankPosClas}>{posicion}</div>              </div>
              <div className={cssGR.imgWrapper}>
                <img
                  src={props.pilotos[r.pilotId].photo}
                  alt={"Foto " + props.pilotos[r.pilotId].name}
                  className={cssRaces.foto}
                ></img>
              </div>
              <div className={cssRaces.rankName}>
                {props.pilotos[r.pilotId].name} ({props.pilotos[r.pilotId].team}
                )<br></br>
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
