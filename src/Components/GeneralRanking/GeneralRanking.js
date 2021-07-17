import cssGR from "./GeneralRanking.module.css";
import * as DataApi from "../../Api/DataApi";
import { Link } from "react-router-dom";
import { getRankingClass } from "../../Api/Utils";
function GeneralRanking() {
  let generalRankingList = DataApi.getGeneralRanking();

  return (
    <div className={cssGR.generalRankingContainer}>
      <h1 className="gradientTitle">Clasificación Global</h1>
      <div className={cssGR.rankingsContainer}>
        {generalRankingList.map((item) => {
          return (
            <div key={item.datosPiloto.name} className={cssGR.wrapper}>
              <div className={cssGR.posWrapper}>
                <div className={getRankingClass(item)}>{item.posicion}</div>
              </div>

              <div className={cssGR.imgWrapper}>
                <Link
                  to={{ pathname: "./racePilots", state: item.datosPiloto }}
                >
                  <img
                    src={item.datosPiloto.picture}
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
                <Link to={{ pathname: "./team", state: item.datosPiloto.team }}>
                  {item.datosPiloto.team}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GeneralRanking;
