import React, { useState, useEffect, useContext } from "react";
import black from "../images/universe.jpg";
import white from "../images/colide.jpg";
import styles from "./styles/Reservations.module.css";
import { Container } from "./Background";
import Loader from "./Loader";
import { GlobalContext } from "./Context";

export function Ticket({ res }) {
  const [context, setContext] = useContext(GlobalContext);

  return (
    <div className={styles.card}>
      <img className={styles.pic} src={res.pic}></img>
      <p className={styles.name}>{res.resa}</p>
      <div className={styles.details}>
        <div className={styles.ballContainer}>
          <div className={styles.arrowContainer}>
            <div className={styles.arrow}></div>
            <p className={styles.msg}>Anuller reservation</p>
          </div>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.info}>
          <p className={styles.date}>{res.date}</p>
          <p className={styles.price}>{res.price}€</p>
        </div>
      </div>
    </div>
  );
}

export default function Reservations() {
  const [res, setRes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let tempreservations = [
    {
      id: 1,
      resa: "La vie Noire",
      date: "20-04-1993",
      price: 29.99,
      pic: black,
    },
    { id: 2, resa: "wut", date: "20-04-1992", price: 16.92, pic: white },
  ];

  useEffect(() => {
    setTimeout(() => {
      setRes(tempreservations);
      setLoaded(true);
    }, 1000);
  }, []);

  return loaded ? (
    res ? (
      <>
        <Container>
          {tempreservations ? (
            <h2 style={{ color: "var(--acc-color)" }}>
              Resultats hardcoded pour le moment
            </h2>
          ) : (
            ""
          )}
          {res.map((res) => (
            <Ticket res={res} key={res} />
          ))}
          ;
        </Container>
      </>
    ) : (
      <div>Pas de reservations</div>
    )
  ) : (
    <Loader />
  );
}
