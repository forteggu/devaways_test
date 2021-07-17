import * as DataApi from "../Api/DataApi";

const useRaceDataHook = (params, props) => {
  const raceName = params.state;
  let ret = [];
  if (params && raceName) {
    let tiemposPorCarreras = DataApi.getClasificacionPorCarreras();
    ret.push(DataApi.getDatosCarrera(raceName, tiemposPorCarreras)[0]);
    ret.push(DataApi.getDatosPilotos());
  } else if (props.nombreCarrera && props.carreras) {
    ret.push(DataApi.getDatosCarrera(props.nombreCarrera, props.carreras)[0]);
    ret.push(props.pilotos);
  } else {
    ret.push(
      DataApi.getDatosCarrera(
        props.nombreCarrera,
        DataApi.getClasificacionPorCarreras()
      )[0]
    );
    ret.push(DataApi.getDatosPilotos());
  }
  return ret;
};

export default useRaceDataHook;
