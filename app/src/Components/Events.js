import React, { useState, useEffect } from "react";
import styles from "./styles/Events.module.css";
import { Article } from "./Blog";
import { Container } from "./Background";
import Loader from "./Loader";

export default function Events() {
  const [res, setRes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRes(tempEvents);
      setLoaded(true);
    }, 1000);
  }, []);

  let tempEvents = [
    {
      titre: "Stars colliding",
      contenu: "Prepare for a once in a lifetime start collision",
      pic: "git8.jpg",
      date: "1993-02-01",
    },
  ];

  return loaded ? (
    <Container>
      {tempEvents ? (
        <h2
          style={{
            color: "var(--acc-color)",
            width: "100%",
            textAlign: "center",
          }}
        >
          Resultats hardcoded pour le moment
        </h2>
      ) : (
        ""
      )}
      {res.map((evt) => (
        <Article article={evt} />
      ))}
    </Container>
  ) : (
    <Loader />
  );
}
