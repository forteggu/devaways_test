import cssRT from "./RacesTimes.module.css";
function RacesTimes(props) {
  return (
    <div className={cssRT.RacesTimesContainer}>
      {props.carrerasTiempos.map((carrera) => {
        return (
          <div className={cssRT.raceContainer}>
            <h3>{carrera.raceName}</h3>

            {carrera.raceRanking.map((r) => {
              return (
                <div className={cssRT.raceResultsContainer}>
                  <div className={cssRT.raceRow}>
                    <img
                      src={props.pilotos[r.pilotId].photo}
                      alt={"Foto " + props.pilotos[r.pilotId].name}
                      className={cssRT.foto}
                    ></img>
                    <div className={cssRT.rankName}>
                      {props.pilotos[r.pilotId].name} (
                      {props.pilotos[r.pilotId].team})<br></br>{"Tiempo: "+r.tiempo}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default RacesTimes;
