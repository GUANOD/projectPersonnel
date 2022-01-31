import React, { useContext } from "react";
import styles from "./styles/NavBar.module.css";
import { ReactComponent as Planet } from "../images/planet.svg";
import { ReactComponent as Eventsvg } from "../images/event.svg";
import { ReactComponent as Homesvg } from "../images/home.svg";
import { ReactComponent as Teacupsvg } from "../images/teacup.svg";
import { ReactComponent as Usersvg } from "../images/user.svg";
import { Link } from "react-router-dom";
import { GlobalContext } from "./Context";

export default function Nav() {
  const [context, setContext] = useContext(GlobalContext);
  return (
    <nav className={styles.navBar}>
      <Planet className={styles.planet} />
      <h2>joeldev.eu</h2>

      <ul className={styles.menus}>
        <li
          onClick={() =>
            setContext((prevState) => ({ ...prevState, offset: false }))
          }
        >
          <Link to="/">
            <Homesvg className={styles.svg} />
            Accueil
          </Link>
        </li>
        <li
          onClick={() =>
            setContext((prevState) => ({ ...prevState, offset: true }))
          }
        >
          <Link to="/">
            <Teacupsvg className={styles.svg} />
            Attractions
          </Link>
        </li>
        <li
          onClick={() =>
            setContext((prevState) => ({
              ...prevState,
              error: "In development",
            }))
          }
        >
          <a>
            <Eventsvg className={styles.svg} />
            Événements
          </a>
        </li>
        <li>
          <Link to="/login">
            <Usersvg className={styles.svg} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
