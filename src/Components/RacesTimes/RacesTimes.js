import cssRT from "./RacesTimes.module.css";
import Constants from "../../Api/Constants";
function RacesTimes(props) {
    let position = 0;
  return (
    <div className={cssRT.RacesTimesContainer}>
      {props.listadoCarreras.map((carrera) => {
        let outputOuterContent= (
          <div className={cssRT.raceContainer}>
            <h3>{carrera.raceName}</h3>

            {carrera.raceRanking.map((r) => {
                let outputInnerContent;
                if(props.mode === Constants.timeMode){
                    outputInnerContent =  (
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
                }else{
                    position++;
                    outputInnerContent = (
                        <div className={cssRT.raceResultsContainer}>
                          <div className={cssRT.raceRow}>
                            <div>{position}</div>
                            <img
                              src={props.pilotos[r.pilotId].photo}
                              alt={"Foto " + props.pilotos[r.pilotId].name}
                              className={cssRT.foto}
                            ></img>
                            <div className={cssRT.rankName}>
                              {props.pilotos[r.pilotId].name} (
                              {props.pilotos[r.pilotId].team})
                            </div>
                          </div>
                        </div>
                      );
                }
              return outputInnerContent;
            })}
          </div>
        );
        position = 0;
        return outputOuterContent;
      })}
    </div>
  );
}

export default RacesTimes;
