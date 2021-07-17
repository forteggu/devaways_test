import { useLocation } from "react-router";
import cssPV from "./RacePilotsView.module.css";
import * as DataApi from "../../Api/DataApi";
import { Link } from "react-router-dom";
let RacePilotsView = (props) => {
  const params = useLocation();
  const piloto = (props && props.piloto) || params.state;
  const resultadosPiloto = DataApi.getDatosCarrerasPosicionPiloto(piloto._id);

  return (
    <div>
      <h1 className="gradientTitle">Información del piloto {piloto.name}</h1>
      <div className={cssPV.wrapper}>
        <div className={cssPV.personalInfoContainer}>
          <div>
            <img src={piloto.picture} alt={piloto.name}></img>
          </div>
          <div className={cssPV.personalInfo}>
            <div>
              <span>Nombre: </span>
              {piloto.name}
            </div>
            <div>
              <span>Edad: </span>
              {piloto.age}
            </div>
            <div>
              <span>Equipo: </span>
              <Link to={{ pathname: "./team", state: piloto.team }}>
                {piloto.team}
              </Link>
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
                      <Link
                        to={{ pathname: "./race", state: carrera.raceName }}
                      >
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
    </div>
  );
};

export default RacePilotsView;
