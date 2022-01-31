import React from "react";
import styles from "./styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.back}>
      <div className={styles.lds_circle}>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
