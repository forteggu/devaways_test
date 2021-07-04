import cssHeader from "./Header.module.css";
import Nav from "../Nav/Nav";

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
        <img
          className={cssHeader.logo}
          alt="Racing logo"
          src="https://w7.pngwing.com/pngs/130/310/png-transparent-kart-racing-electric-go-kart-kart-circuit-go-cart-thumbnail.png"
        />
        <h1>{props.headerText}</h1>
      </div>
      <div className={cssHeader.headerNavContainer}>
        <Nav options={aNavOptions}></Nav>
      </div>
    </header>
  );
}

export default Header;
