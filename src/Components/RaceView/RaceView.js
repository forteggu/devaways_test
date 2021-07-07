import * as DataApi from "../../Api/DataApi";
import cssRaces from "./RaceView.module.css";
function RaceView(props) {
  let carreraN = DataApi.getDatosCarrera(
    props.nombreCarrera,
    props.carreras
  )[0];
  console.log(carreraN);
  return (
    <div key={`_${props.nombreCarrera}`} className={cssRaces.raceContainer}>
      <h1 key={`_${props.nombreCarrera}_h1`}> {carreraN.raceName}</h1>
      <div
        key={`_${props.nombreCarrera}_raceResultsContainer`}
        className={cssRaces.raceResultsContainer}
      >
        {carreraN.raceRanking.map((r) => {
          return (
            <div
              key={`_${props.nombreCarrera}_${Math.random()}_raceRow`}
              className={cssRaces.raceRow}
            >
              <img
                src={props.pilotos[r.pilotId].photo}
                alt={"Foto " + props.pilotos[r.pilotId].name}
                className={cssRaces.foto}
              ></img>
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
