import React, { useState, useContext, useEffect } from "react";
import { ReactComponent as Info } from "../images/info-button.svg";
import { ReactComponent as Res } from "../images/reception.svg";
import { ReactComponent as Blogsvg } from "../images/blogging.svg";
import { ReactComponent as Eventsvg } from "../images/event.svg";
import { ReactComponent as Homesvg } from "../images/home.svg";
import { ReactComponent as Teacupsvg } from "../images/teacup.svg";
import { ReactComponent as Deletesvg } from "../images/delete.svg";
import { ReactComponent as Logoutsvg } from "../images/logout.svg";
import ClientInfo from "./ClientInfo";
import Background from "./Background";
import styles from "./styles/MenuClient.module.css";
import Reservations from "./Reservations";
import Blog from "./Blog";
import Events from "./Events";
import { GlobalContext } from "./Context";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { validateToken } from "../service/authservice";
import { deleteUser } from "../service/userService";
import { Link } from "react-router-dom";

export function Burguer({ breakpoint }) {
  const [context, setContext] = useContext(GlobalContext);
  const [opacity, setOpacity] = useState(0);

  const getBreak = () => {
    setOpacity(breakpoint >= window.innerWidth ? 1 : 0);
  };

  useEffect(() => {
    getBreak();
    window.addEventListener("resize", getBreak);
    return () => window.removeEventListener("resize", getBreak);
  }, []);

  return (
    <div
      style={{ opacity }}
      onClick={() => {
        setContext((prevState) => ({
          ...prevState,
          burguer: !context.burguer,
        }));
      }}
      className={
        context.burguer
          ? `${styles.burguer} ${styles.burguerActive}`
          : styles.burguer
      }
    >
      <div
        className={
          context.burguer
            ? `${styles.slashActive} ${styles.slash}`
            : styles.slash
        }
      ></div>
    </div>
  );
}

export default function MenuClient() {
  const [active, setActive] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [passDel, setPassDel] = useState("");
  const [context, setContext] = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleDisconnect = () => {
    localStorage.removeItem("token");
    setContext((prevState) => ({ ...prevState, token: "" }));
    navigate("/");
  };

  const handleDelete = () => {
    if (!passDel) {
      return setContext((prevState) => ({
        ...prevState,
        error: "Confirmer Password",
      }));
    }

    deleteUser({ password: passDel }, context.token)
      .then(() => {
        handleDisconnect();
      })
      .catch((err) => {
        setContext((prevState) => ({ ...prevState, error: err }));
      });
  };

  const handleNoToken = (msg = "") => {
    localStorage.removeItem("token");
    return setContext((prevState) => ({
      ...prevState,
      error: msg ? `${msg}, please login` : "Please login",
      route: "/login",
      token: "",
    }));
  };

  useEffect(() => {
    if (!context.token) {
      handleNoToken();
    } else {
      validateToken(context.token)
        .then(() => {
          setLoaded(true);
        })
        .catch((err) => {
          handleNoToken(err);
        });
    }
  }, [context.token]);

  return !loaded ? (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh - 75px)",
        display: "grid",
        placeItems: "center",
        position: "absolute",
        top: "75px",
        left: "0",
      }}
    >
      <Loader />
    </div>
  ) : (
    <React.Fragment>
      {deleting && (
        <div className={styles.confirmModal}>
          <h3>Vous etes au point de suprimmer votre compte</h3>
          <input
            type="password"
            value={passDel}
            onChange={(e) => setPassDel(e.target.value)}
          ></input>
          <div>
            <button onClick={() => handleDelete()}>Confirmer</button>
            <button onClick={() => setDeleting(false)}>Annuler</button>
          </div>
        </div>
      )}

      <div
        className={
          context.burguer
            ? `${styles.clientOpen} ${styles.client}`
            : styles.client
        }
      >
        <ul className={styles.ul}>
          <li
            onClick={() => {
              active === "info" ? setActive("") : setActive("info");
              setContext((prevState) => ({ ...prevState, burguer: false }));
            }}
            className={
              active === "info" ? `${styles.active} ${styles.li}` : styles.li
            }
          >
            <div className={styles.cont}>
              <Info fill="#E5835A" stroke="#E5835A" />
              <button>Mes Informations</button>
            </div>
          </li>
          <li
            onClick={() => {
              active === "res" ? setActive("") : setActive("res");
              setContext((prevState) => ({ ...prevState, burguer: false }));
            }}
            className={
              active === "res" ? `${styles.active} ${styles.li}  ` : styles.li
            }
          >
            <div className={styles.cont}>
              <Res fill="#E5835A" stroke="#E5835A" />
              <button>Mes Reservations</button>
            </div>
          </li>
          {/* CUTTOF FOR WEBMASTER INFOS */}
          {/* ###### */}
          {/* ###### */}
          {/* ###### */}
          {/* ###### */}
          {/* USE CONTEXT TO CHECK IF USER IS WEBMASTER TO RENDER THE NEXT lis */}
          <li
            onClick={() => {
              active === "blog" ? setActive("") : setActive("blog");
              setContext((prevState) => ({ ...prevState, burguer: false }));
            }}
            className={
              active === "blog" ? `${styles.active} ${styles.li}  ` : styles.li
            }
          >
            <div className={styles.cont}>
              <Blogsvg fill="#E5835A" stroke="#E5835A" />
              <button>Blog</button>
            </div>
          </li>
          <li
            onClick={() => {
              active === "events" ? setActive("") : setActive("events");
              setContext((prevState) => ({ ...prevState, burguer: false }));
            }}
            className={
              active === "events"
                ? `${styles.active} ${styles.li}  `
                : styles.li
            }
          >
            <div className={styles.cont}>
              <Eventsvg fill="#E5835A" stroke="#E5835A" />
              <button>Events</button>
            </div>
          </li>
          {/* CUTTOF FOR WEBMASTER INFOS */}
          {/* ###### */}
          {/* ###### */}
          {/* ###### */}
          {/* ###### */}
          {/* USE CONTEXT TO CHECK IF USER IS WEBMASTER TO RENDER THE PRECEDENT lis */}
        </ul>

        {/* LINKS TO SITE ON 600PX CUTTOF */}

        <ul className={styles.linksMedia}>
          <li
            onClick={() =>
              setContext((prevState) => ({ ...prevState, burguer: false }))
            }
            className={styles.hidden}
          >
            <Link to="/">
              <Homesvg className={styles.svg} />
              <p>Accueil</p>
            </Link>
          </li>

          <li
            className={styles.hidden}
            onClick={() =>
              setContext((prevState) => ({
                ...prevState,
                offset: true,
                burguer: false,
              }))
            }
          >
            <Link to="/">
              <Teacupsvg className={styles.svg} />
              <p>Attractions</p>
            </Link>
          </li>

          <li
            className={styles.hidden}
            onClick={() =>
              setContext((prevState) => ({
                ...prevState,
                error: "In development",
              }))
            }
          >
            <Eventsvg className={styles.svg} />
            <p>Événements</p>
          </li>
          <li>
            <Logoutsvg className={styles.svg} />
            <p
              onClick={() => {
                handleDisconnect();
                setContext((prevState) => ({ ...prevState, burguer: false }));
              }}
            >
              Déconnecter
            </p>
          </li>
          <li>
            <Deletesvg className={styles.svg} />
            <p onClick={() => setDeleting(true)}>Supprimer compte</p>
          </li>
        </ul>

        <h2 className={styles.shamelessPlug}>
          <a href="https://joeldev.eu" target="_blank">
            joeldev.eu
          </a>
        </h2>
      </div>

      <div className={styles.dashboard}>
        <div className={styles.backgroundWrap}>
          <Background active={active} />
        </div>
        {active === "info" && <ClientInfo />}
        {active === "res" && <Reservations />}
        {active === "blog" && <Blog />}
        {active === "events" && <Events />}
      </div>
      <Burguer breakpoint={1000} />
    </React.Fragment>
  );
}
