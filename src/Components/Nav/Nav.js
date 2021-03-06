import cssNav from "./Nav.module.css";
import {Link} from 'react-router-dom';
function Nav(props) {

  return (
    <nav className={cssNav.horizontalNav}>
      <ul>
        {props.options.map((option) => {
          return (
            <Link key={'Link_'+option.id} to={option.linkTo}>
            <li className='gradientTitle' key={option.id} id={option.id}>
              {option.text}
            </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
