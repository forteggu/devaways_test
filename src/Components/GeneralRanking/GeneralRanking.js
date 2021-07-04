import cssGR from "./GeneralRanking.module.css";
import * as DataApi from "../../Api/DataApi";
function GeneralRanking() {
    let generalRankingList = DataApi.getGeneralRanking();

  return (
    <div className={cssGR.generalRankingContainer}>
      <h1>Clasificación Global</h1>
      {generalRankingList.map(item =>{
          return <li><span className={cssGR.rankPosition}>{item.posicion}</span><span className={cssGR.rankName}>{item.piloto}</span></li>
      })}
    </div>
  );
}

export default GeneralRanking;
