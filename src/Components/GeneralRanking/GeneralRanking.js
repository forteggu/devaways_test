import cssGR from "./GeneralRanking.module.css";
import * as DataApi from "../../Api/DataApi";
import racePilotsView from "../RacePilotsView/RacePilotsView";
import TeamsView from "../TeamsView/TeamsView";
import { Link } from "react-router-dom";
function GeneralRanking() {
  let generalRankingList = DataApi.getGeneralRanking();

  return (
    <div className={cssGR.generalRankingContainer}>
      <h1>Clasificación Global</h1>
      <div className={cssGR.rankingsContainer}>
        {generalRankingList.map((item) => {
          let rankPosClas;
          if (item.posicion === 1) {
            rankPosClas = `${cssGR.firstPlace} ${cssGR.rankPosition}`;
          } else if (item.posicion === 2) {
            rankPosClas = `${cssGR.secondPlace} ${cssGR.rankPosition}`;
          } else if (item.posicion === 3) {
            rankPosClas = `${cssGR.thirdPlace} ${cssGR.rankPosition}`;
          } else {
            rankPosClas = `${cssGR.rankPosition}`;
          }
          return (
            <div key={item.datosPiloto.name} className={cssGR.wrapper}>
              <div className={cssGR.posWrapper}>
                <div className={rankPosClas}>{item.posicion}</div>
              </div>

              <div className={cssGR.imgWrapper}>
              <Link
                  to={{ pathname: "./racePilots", state: item.datosPiloto }}
                >
                  <img
                    src={item.datosPiloto.photo}
                    alt={"Foto " + item.datosPiloto.name}
                    className={cssGR.foto}
                  ></img>
                </Link>
              </div>

              <div className={cssGR.rankName}>
                <Link
                  to={{ pathname: "./racePilots", state: item.datosPiloto }}
                >
                  {item.datosPiloto.name}
                </Link>
              </div>

              <div className={cssGR.rankTeam}>
              <Link to={{ pathname: "./team", state: item.datosPiloto.team }} >{item.datosPiloto.team}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GeneralRanking;
