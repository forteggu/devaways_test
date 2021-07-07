import { useState } from "react";
import { useLocation } from "react-router";
import cssPV from "./RacePilotsView.module.css";
let RacePilotsView = (props)  => {
    const params = useLocation();
    const piloto = params.state;
    console.log(piloto);
  return (
    <div>
      <div className={cssPV.personalInfoContainer}>
        <div>
          <img src="" alt=""></img>
        </div>
        <ul>
            <li>
                Nombre
            </li>
            <li>
                Equipo
            </li>
            <li>
                Edad
            </li>
        </ul>
      </div>
      <div>
          Races & Times
      </div>
    </div>
  );
}

export default RacePilotsView;
