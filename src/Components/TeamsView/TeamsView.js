import * as DataApi from "../../Api/DataApi";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import cssTV from "./TeamsView.module.css";

function TeamsView() {
  const params = useLocation();
  const teamName = params.state;
  const teamMembers = DataApi.getMembersByTeam(teamName);
  return (
    <div className="maxHeight">
      <div className={cssTV.wrapper}>
      <h1 className='gradientTitle'>Miembros del Equipo {teamName}</h1>

        <div className={cssTV.membersWrapper}>
          
          {teamMembers.map((member) => {
          
          return (
              <Link
                key={member.name}
                to={{ pathname: "./racePilots", state: member }}
              >
                <div className={cssTV.memberInfoContainer}>
                  <div>
                    <img src={member.picture} alt={`Foto_${member.name}`}></img>
                  </div>
                  <div>{member.name}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TeamsView;
