import cssGR from "./GeneralRanking.module.css";
import * as DataApi from "../../Api/DataApi";
function GeneralRanking() {
  let generalRankingList = DataApi.getGeneralRanking();

  return (
    <div className={cssGR.generalRankingContainer}>
      <h1>Clasificación Global</h1>
      <ul>
        {generalRankingList.map((item) => {
          return (
            <li key={item.datosPiloto.name} className={cssGR.wrapper}>
              <h2 className={cssGR.rankPosition}>{item.posicion}</h2>
              <img
                src={item.datosPiloto.photo}
                alt={"Foto " + item.datosPiloto.name}
                className={cssGR.foto}
              ></img>
              <span className={cssGR.rankName}>
                {item.datosPiloto.name} ({item.datosPiloto.team})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GeneralRanking;
