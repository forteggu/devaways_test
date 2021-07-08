import { useLocation } from "react-router";
import cssPV from "./RacePilotsView.module.css";
import * as DataApi from "../../Api/DataApi";
import { Link } from "react-router-dom";
let RacePilotsView = (props) => {
  const params = useLocation();
  const piloto = (props && props.piloto) || params.state;
  const resultadosPiloto = DataApi.getDatosCarrerasPosicionPiloto(piloto._id);
  return (
    <div className={cssPV.wrapper}>
      <div className={cssPV.personalInfoContainer}>
        <div>
          <img src={piloto.picture} alt={piloto.name}></img>
        </div>
        <div>
          <div>
            <span>Nombre:</span>
            <span> {piloto.name}</span>
          </div>
          <div>
            <span>Edad:</span>
            <span> {piloto.age}</span>
          </div>
          <div>
            <span>Equipo:</span>
            <span>
              <Link to={{ pathname: "./team", state: piloto.team }}>
                {piloto.team}
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className={cssPV.racesContainer}>
        <div className={cssPV.tableWrapper}>
          <div className={cssPV.tableContent}>
            <div className={cssPV.tr}>
              <div className={cssPV.td}>Carrera</div>
              <div className={cssPV.td}>Posición</div>
              <div className={cssPV.td}>Tiempo</div>
            </div>
            {resultadosPiloto.map((carrera) => {
              return (
                <div className={cssPV.tr} key={carrera.raceName}>
                  <div className={cssPV.td}>
                    <Link to={{ pathname: "./race", state: carrera.raceName }}>
                      {carrera.raceName}
                    </Link>
                  </div>
                  <div className={cssPV.td}>{carrera.posInRace}</div>
                  <div className={cssPV.td}>{carrera.raceTime}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RacePilotsView;
