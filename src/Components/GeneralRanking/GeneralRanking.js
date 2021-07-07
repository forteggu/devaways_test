import cssGR from "./GeneralRanking.module.css";
import * as DataApi from "../../Api/DataApi";
function GeneralRanking() {
  let generalRankingList = DataApi.getGeneralRanking();

  return (
    <div className={cssGR.generalRankingContainer}>
      <h1>Clasificación Global</h1>
      <ul>
        {generalRankingList.map((item) => {
          let rankPosClas;
          if(item.posicion === 1){
            rankPosClas=`${cssGR.firstPlace} ${cssGR.rankPosition}`;
          }else if(item.posicion === 2){
            rankPosClas=`${cssGR.secondPlace} ${cssGR.rankPosition}`;
          }else if(item.posicion === 3){
            rankPosClas=`${cssGR.thirdPlace} ${cssGR.rankPosition}`;
          }else{
            rankPosClas=`${cssGR.rankPosition}`;
          }
          return (
            <li key={item.datosPiloto.name} className={cssGR.wrapper}>  
              <h3 className={rankPosClas}>{item.posicion}</h3>
              <div className={cssGR.imgNameContainer}>
                <img
                src={item.datosPiloto.photo}
                alt={"Foto " + item.datosPiloto.name}
                className={cssGR.foto}
              ></img>
              <span className={cssGR.rankName}>
                {item.datosPiloto.name} ({item.datosPiloto.team})
              </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GeneralRanking;
