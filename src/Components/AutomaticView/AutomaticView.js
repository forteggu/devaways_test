//import cssAV from './AutomaticView.module.css';

import GeneralRanking from "../GeneralRanking/GeneralRanking";
import RacesTimes from "../RacesTimes/RacesTimes";
import * as DataApi from "../../Api/DataApi";
import { orderRacePositionsByTime } from "../../Api/Utils";
import { useState } from "react";
import Constants from "../../Api/Constants";

function AutomaticView() {
  const [whatIsBeingShown, setWhatIsBeingShown] = useState(Constants.genRank);
  const mapaCarrerasTiempos = DataApi.getTiemposPorCarreras();
  const mapaUsuarios = DataApi.getDatosPilotos();
  const mapaCarrerasPosiciones = mapaCarrerasTiempos.map((carrera) => {
    return {
      raceName: carrera.raceName,
      raceRanking: orderRacePositionsByTime(carrera.raceRanking),
    };
  });
  function changeView(){
    if(whatIsBeingShown === Constants.genRank){
      setWhatIsBeingShown(Constants.timeMode);
    }else if(whatIsBeingShown ===Constants.timeMode ){
    setWhatIsBeingShown(Constants.posMode);
  }else{
    setWhatIsBeingShown(Constants.genRank);
  }
}
  return (
    
    <div>
      <button onClick={changeView}>Change View</button>
      {whatIsBeingShown === Constants.genRank ?<GeneralRanking></GeneralRanking>:null}
      {whatIsBeingShown === Constants.timeMode ?<RacesTimes
        listadoCarreras={mapaCarrerasTiempos}
        pilotos={mapaUsuarios}
        mode = {Constants.timeMode}
      ></RacesTimes> :null}
      {whatIsBeingShown === Constants.posMode ? <RacesTimes
        listadoCarreras={mapaCarrerasPosiciones}
        pilotos={mapaUsuarios}
        mode = {Constants.posMode}
      ></RacesTimes> :null}
    </div>
  );
}
export default AutomaticView;
