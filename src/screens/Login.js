import React, { useEffect, useState } from "react";
import axios from "axios";

import LoginButton from "../components/fragments/LoginButton";

import styles from "./Login.module.scss";

const Login = () => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [year, setYear] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVICE_URL}/quotes`)
      .then((result) => {
        setQuote(result.data.quote);
        setAuthor(result.data.author);
        setYear(result.data.year);
      })
      .catch((err) => {
        console.error(err);
        setQuote("");
        setAuthor("");
        setYear("");
      });
  }, []);

  const createGoogleURL = () => {
    const urlEncodeQuote = quote.replace(" ", "+");
    return `https://www.google.com/search?q=${urlEncodeQuote}`;
  };

  if (quote === undefined) return null;

  return (
    <div width="100%" height="100%" className={styles.page}>
      <div className={styles.wrapper}>
        {quote && (
          <div className={styles.container}>
            <div className={styles.title}>
              <a target="_blank" href={createGoogleURL(quote)} rel="noreferrer">
                {quote}
              </a>
            </div>
            <div className={styles.subtitle}>
              — {author}
              {year ? `, ${year}` : ""}
            </div>
          </div>
        )}
        <LoginButton />
      </div>
    </div>
  );
};

export default Login;
