import cssHeader from "./Header.module.css";
import Nav from "../Nav/Nav";
import {Link }from "react-router-dom";

function Header(props) {
  const aNavOptions = [
    {
      id: "generalRanking",
      text: "Ranking General",
      linkTo: "generalRanking",
    },
    { id: "autoView", text: " Vista Automática", linkTo: "automaticView" },
  ];

  return (
    <header className={cssHeader.header}>
      <div className={cssHeader.titleLogoContainer}>
      <h1><Link to='/'>{props.headerText}</Link></h1>
      </div>
      <div className={cssHeader.headerNavContainer}>
        <Nav options={aNavOptions}></Nav>
      </div>
    </header>
  );
}
export default Header;
