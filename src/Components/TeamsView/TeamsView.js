import * as DataApi from "../../Api/DataApi";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function TeamsView() {
  const params = useLocation();
  const teamName = params.state;
  const teamMembers = DataApi.getMembersByTeam(teamName);
  console.log(teamMembers);
  return (
    <div>
      <h1>Members</h1>
      <div>
        {teamMembers.map((member) => {
          return (
            <Link key = {member.name} to={{ pathname: "./racePilots", state: member }}>
              <div >
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
  );
}

export default TeamsView;
