import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./Context";
import styles from "./styles/Blog.module.css";
import { ReactComponent as Loupe } from "../images/loupe.svg";
import { Container } from "./Background";
import Loader from "./Loader";
import { getContent } from "../service/blogService";
import mainConfig from "../service/config";

function Form({ search, date, setSearch, setDate, handleSearch }) {
  return (
    <div className={styles.searchBar}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(e);
        }}
      >
        <input
          type="text"
          className={styles.search}
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
        <Loupe className={styles.loupe} />
        <input
          type="date"
          className={styles.date}
          name="date"
          onChange={(e) => {
            console.log(e.target.value);
            setDate(e.target.value);
          }}
          value={date}
        ></input>
        <button className={styles.rech}>Rechercher</button>
      </form>
    </div>
  );
}

export function Article({ article }) {
  const [context, setContext] = useContext(GlobalContext);
  return (
    <div className={styles.article}>
      <div className={styles.picCont}>
        <img
          src={`${mainConfig.PORT}/images/${article.pic}`}
          alt={article.titre}
        />
      </div>

      <div className={styles.infoContainer}>
        <h2>{article.titre}</h2>
        <p className={styles.desc}>{article.contenu}</p>
        <p className={styles.dateX}>
          {new Date(article.date).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <button
        className={styles.button}
        onClick={() =>
          setContext((prevState) => ({ ...prevState, error: "In development" }))
        }
      >
        Modifier
      </button>
    </div>
  );
}

export default function Blog() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [context, setContext] = useContext(GlobalContext);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    getContent({ options: { search, date, type: 607 } }, context.token)
      .then((data) => {
        setArticles(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setContext((prevState) => ({ ...prevState, error }));
      });
  };

  return loaded ? (
    <React.Fragment>
      <Container style={{ marginBottom: "11vh" }}>
        {articles.length ? (
          articles.map((art) => <Article article={art} />)
        ) : (
          <h3 style={{ color: "var(--thr-color)" }}>
            Pas d'articles, ajustez votre recherche
          </h3>
        )}
      </Container>
      <Form
        search={search}
        date={date}
        setSearch={(e) => setSearch(e)}
        setDate={(e) => setDate(e)}
        handleSearch={handleSearch}
      />
    </React.Fragment>
  ) : (
    <Loader />
  );
}
