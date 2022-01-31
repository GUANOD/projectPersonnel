import React, { useContext, useState } from "react";
import { GlobalContext } from "./Context";
import styles from "./styles/Menu.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Homesvg } from "../images/home.svg";
import { ReactComponent as Teacupsvg } from "../images/teacup.svg";
import { ReactComponent as Eventsvg } from "../images/event.svg";
import { ReactComponent as Usersvg } from "../images/user.svg";

const Menu = ({ breakpoint }) => {
  const [context, setContext] = useContext(GlobalContext);
  const [active, setActive] = useState("home");

  return (
    <div
      className={styles.container}
      hidden={!(context.burguer && breakpoint >= window.innerWidth)}
    >
      <ul className={styles.ul}>
        <li
          onClick={() => {
            setActive("home");
            setContext((prevState) => ({ ...prevState, burguer: false }));
          }}
          className={
            active === "home" ? `${styles.active} ${styles.li}` : styles.li
          }
        >
          <div className={styles.cont}>
            <Link to="/">
              <Homesvg fill="#E5835A" stroke="#E5835A" />
              <button>Accueil</button>
            </Link>
          </div>
        </li>
        <li
          onClick={() => {
            setActive("att");
            setContext((prevState) => ({
              ...prevState,
              burguer: false,
              offset: true,
            }));
          }}
          className={
            active === "att" ? `${styles.active} ${styles.li}` : styles.li
          }
        >
          <div className={styles.cont}>
            <Link to="/">
              <Teacupsvg fill="#E5835A" stroke="#E5835A" />
              <button>Attractions</button>
            </Link>
          </div>
        </li>
        <li
          onClick={() => {
            setContext((prevState) => ({
              ...prevState,
              burguer: false,
              error: "In development",
            }));
          }}
          className={
            active === "res" ? `${styles.active} ${styles.li}` : styles.li
          }
        >
          <div className={styles.cont}>
            <Link to="/">
              <Eventsvg fill="#E5835A" stroke="#E5835A" />
              <button>Événements</button>
            </Link>
          </div>
        </li>
        <li
          onClick={() => {
            setContext((prevState) => ({
              ...prevState,
              burguer: false,
            }));
          }}
          className={
            active === "account" ? `${styles.active} ${styles.li}` : styles.li
          }
        >
          <div className={styles.cont}>
            <Link to="/login">
              <Usersvg fill="#E5835A" stroke="#E5835A" />
              <button>Mon compte</button>
            </Link>
          </div>
        </li>
        <h2 className={styles.shamelessPlug}>
          <a href="https://joeldev.eu" target="_blank">
            joeldev.eu
          </a>
        </h2>
      </ul>
    </div>
  );
};

export default Menu;
