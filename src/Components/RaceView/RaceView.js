import * as DataApi from '../../Api/DataApi'
function RaceView(props){
    let carreraN = DataApi.getDatosCarrera(0,props.carreras);
    return <div>Race View</div>
}

export default RaceView;