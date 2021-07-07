import { useState } from "react";
import { useLocation } from "react-router";
import cssPV from "./RacePilotsView.module.css";
import * as DataApi from "../../Api/DataApi";
import {Link} from 'react-router-dom';
let RacePilotsView = (props) => {
  const params = useLocation();
  const piloto = params.state;
  console.log(piloto);
  const resultadosPiloto = DataApi.getDatosCarrerasPosicionPiloto(piloto._id);

  return (
    <div>
      <div className={cssPV.personalInfoContainer}>
        <div>
          <img src={piloto.photo} alt={piloto.name}></img>
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
            <span> <Link to={{ pathname: "./team", state: piloto.team }} >{piloto.team}</Link></span>
          </div>
        </div>
      </div>
      <div>
        {resultadosPiloto.map((carrera) => {
          //console.log(carrera);
          return (
            <div key={carrera.raceName}>
              <div><Link to={{ pathname: "./race", state: carrera.raceName }} >{carrera.raceName}</Link></div>
              <div>{carrera.posInRace}</div>
              <div>{carrera.raceTime}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RacePilotsView;
