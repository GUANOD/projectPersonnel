import React from "react";
import { useState, useEffect, useContext } from "react";
import styles from "./styles/Homepage.module.css";
import { ReactComponent as Launch } from "../images/lauching.svg";
import { ReactComponent as Arrow } from "../images/arrow-right.svg";
import { GlobalContext } from "./Context";
import Robot from "../images/robot.jpg";
import Blade from "../images/blade.jpg";
import { Burguer } from "./MenuClient";
import Menu from "./Menu";

const Homepage = () => {
  const [context, setContext] = useContext(GlobalContext);
  const [offset, setOffset] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [slider, setSlider] = useState(0);
  const [mobile, setMobile] = useState(false);

  const handleScroll = (e) => {
    if (e.deltaY === 0 || e.target.className === styles.imgWrap || mobile)
      return;

    if (
      (offset <= 0 && e.deltaY < 0) ||
      (offset >= window.innerWidth && e.deltaY > 0)
    )
      return;
    setOffset(offset + e.deltaY * 2);
  };

  const touchmove = (e) => {
    if (mobile) return; //override scroll effect if mobile
    if (e.changedTouches[0].clientX > touchStart) {
      if (offset > 0) {
        setOffset(offset - 20);
      }
    }
    if (e.changedTouches[0].clientX < touchStart) {
      if (offset < window.innerWidth) {
        setOffset(offset + 20);
      }
    }
  };
  const touchstart = (e) => {
    if (mobile) return; //override scroll effect if mobile
    setTouchStart(e.changedTouches[0].clientX);
  };

  const handleAttWheel = (e) => {
    if (mobile) return; //override scroll effect if mobile
    if (e.delta == 0) return;
    e.deltaY > 0 ? setSlider(1) : setSlider(0);
  };

  const handleDesktop = () => {
    const home = document.querySelector(`.${styles.home}`);
    home.scrollTo(0, 0);
    setOffset(0);
    setSlider(0);
    setMobile(false);
  };

  const handleMobile = () => {
    const home = document.querySelector(`.${styles.home}`);
    home.scrollTo(0, 0);
    window.scrollTo(0, 0);
    setOffset(0);
    setSlider(0);
    setMobile(true);
  };

  const handleResize = () => {
    window.innerWidth >= 800 ? handleDesktop() : handleMobile();
  };

  useEffect(() => {
    const attWrap = document.querySelector(`.${styles.attWrap}`);
    // ADD LISTENERS FOR SCROLL ANIMATION
    attWrap.addEventListener("wheel", handleAttWheel);
    document.addEventListener("wheel", handleScroll);
    document.addEventListener("touchmove", touchmove);
    document.addEventListener("touchstart", touchstart);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("wheel", handleScroll);
      document.removeEventListener("touchmove", touchmove);
      document.removeEventListener("touchstart", touchstart);
      attWrap.removeEventListener("wheel", handleAttWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, [offset, touchStart, slider, mobile]);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    if (context.offset && !mobile) {
      // BUG WHEN COMING FORM BACK OFFICE TO ATTRACTIONS CAUSE THIS RUNS BEFORE MOBILE IS SET
      setOffset(window.innerWidth);
      setContext((prevState) => ({ ...prevState, offset: false }));
    }
  }, [context.offset]);

  const getOffset = () => {
    if (offset >= 0 && offset <= window.innerWidth) {
      return offset;
    } else if (offset < 0) {
      return 0;
    } else {
      return window.innerWidth;
    }
  };

  const getRotate = () => {
    const perc = offset / window.innerWidth;
    const deg = perc * 90;
    return deg > 90 ? 90 : deg;
  };

  const getAtt = () => {
    const perc = offset / window.innerWidth;
    const att = perc * 100;
    return att > 100 ? -100 : -att;
  };

  const getSlider = () => {
    const perc = window.innerHeight / slider;
    const att = perc * 100;
    return att > 100 ? -100 : -att;
  };

  return (
    <>
      <Burguer breakpoint={1200} />
      <Menu breakpoint={1200} />
      <div
        className={styles.home}
        style={{ transform: `translateX(${-getOffset()}px)` }}
      >
        <div className={styles.container}>
          <h2 className={`roboto ${styles.h2}`}>
            I CAN'T HELP THINKING SOMEWHERE IN THE UNIVERSE THERE HAS TO BE
            SOMETHING BETTER THAN MAN<span className={styles.dot}>.</span>
            <br />
            <span>- Taylor, 'Planet Of The Apes'</span>
          </h2>
          {mobile ? (
            <div className={styles.launchWrapper}>
              <Launch className={styles.launch} />
            </div>
          ) : (
            <Launch className={styles.launch} />
          )}
          <div className={styles.scroll}>
            <p>Scroll</p>
            <Arrow />
          </div>
          <div
            className={styles.attract}
            style={{ transform: `rotate(${-getRotate()}deg)` }}
          >
            <h2 className="roboto">ATTRACTIONS</h2>
          </div>
          <div
            className={styles.attWrap}
            style={{
              transform: `translate(${getAtt()}%, -${slider ? 50 : 0}%)`,
            }}
          >
            <div
              className={styles.imgWrap}
              style={{ backgroundImage: `url(${Robot})` }}
            >
              <h2 className="roboto">Sad Boto</h2>
              <h3 className={` roboto `}>
                Put yourself in the shoes of a sad robot trying to rescue his
                brother and battle the weather and environnement to bring him
                the much needed oil.
              </h3>
            </div>
            <div
              className={styles.imgWrap}
              style={{ backgroundImage: `url(${Blade})` }}
            >
              <h2 className="roboto">Runner</h2>
              <h3 className={` roboto `}>
                Immerse yourself in this beautifull full body VR experience.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
