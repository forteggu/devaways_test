//import cssAV from './AutomaticView.module.css';

import GeneralRanking from "../GeneralRanking/GeneralRanking";
import RacesTimes from "../RacesTimes/RacesTimes";
import * as DataApi from "../../Api/DataApi";
import { orderRacePositionsByTime } from "../../Api/Utils";

function AutomaticView() {
  const mapaCarrerasTiempos = DataApi.getTiemposPorCarreras();
  const mapaUsuarios = DataApi.getDatosPilotos();
  const mapaCarrerasPosiciones = mapaCarrerasTiempos.map( carrera =>  {return { raceName:carrera.raceName, raceRanking:orderRacePositionsByTime(carrera.raceRanking)}});
  return (
    <div>
      <RacesTimes
        carrerasTiempos={mapaCarrerasTiempos}
        pilotos={mapaUsuarios}
      ></RacesTimes>
    </div>
  );
}

export default AutomaticView;
