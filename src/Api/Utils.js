export function fixTimeStamp(time) {
    let splitdTimeHM = time.split(":"); //Obtiene hh:mm: + ss:mmss
    let splitdTimeSMs = splitdTimeHM[2].split("."); //Obtiene ss:mmss
    splitdTimeHM.pop(); //Elimina los ss:mmss
    let newTimeHM = splitdTimeHM.map((time) => {
      return time.length === 1 ? "0" + time : time;
    });
    let newTimeSMs = splitdTimeSMs.map((time) => {
      return time.length === 1 ? "0" + time : time;
    });
    return newTimeHM.join(":") + ":" + newTimeSMs.join(".");
  } 

export function setPole(ranking){
    let posNumber = 1;
    return ranking.map((pos,index,elements) => {
        console.log("pos" ,pos);
        console.log("index: ",index);
        let nextPos = elements[index+1];
        console.log("nextpos: ",nextPos);
        if(nextPos && nextPos.puntuacion === pos.puntuacion){
            pos.posicion = posNumber;
        }else{
            pos.posicion = posNumber;
            posNumber++
        }
        return pos;
    });
}