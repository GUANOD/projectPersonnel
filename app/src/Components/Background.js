import React, { useState, useEffect } from "react";
import { ReactComponent as Waves } from "../images/waves 1.svg";
import { ReactComponent as Moon } from "../images/planet.svg";
import styles from "./styles/Background.module.css";

export function Container({ children, style }) {
  return (
    <div style={style} className={styles.container}>
      {children}
    </div>
  );
}

export default function Background({ active }) {
  const [stars, setStars] = useState([]);

  function skyFill() {
    console.log("skyfill");
    let array = [];
    for (let i = 0; i < 200; i++) {
      let x = Math.floor(Math.random() * window.innerHeight);
      let y = Math.floor(Math.random() * window.innerWidth);
      let color;

      let random = Math.random();

      if (random > 0.66) {
        color = "#3C79AF";
      } else if (random < 0.33) {
        color = "#E5835A";
      } else {
        color = "#E5DFD9";
      }

      array.push({ x, y, color });
    }
    setStars(array);
  }

  useEffect(() => {
    console.log("useffect");
    skyFill();
  }, []);

  return (
    <div className={styles.background}>
      <Moon className={styles.moon} />
      <Waves className={styles.waves} />
      <div className={styles.stars}>
        {stars.map((elm) => (
          <div
            key={Math.random()}
            className={styles.star}
            style={{ top: elm.x, left: elm.y, background: elm.color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
