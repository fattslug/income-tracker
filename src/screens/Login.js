import React, { useEffect, useState } from "react";
import axios from "axios";

import LoginButton from "../components/fragments/LoginButton";

import styles from "./Login.module.scss";

const Login = () => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();

  useEffect(() => {
    axios
      .get("https://api.api-ninjas.com/v1/quotes?category=love", {
        headers: { "X-Api-Key": process.env.REACT_APP_QUOTE_API_KEY },
      })
      .then((result) => {
        setQuote(result.data[0].quote);
        setAuthor(result.data[0].author);
      });
  }, []);

  const createGoogleURL = () => {
    const urlEncodeQuote = quote.replace(" ", "+");
    return `https://www.google.com/search?q=${urlEncodeQuote}`;
  };

  if (!quote) return null;

  return (
    <div width="100%" height="100%" className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.title}>
            <a target="_blank" href={createGoogleURL(quote)}>
              {quote}
            </a>
          </div>
          <div className={styles.subtitle}>- {author}</div>
        </div>
        <LoginButton />
      </div>
    </div>
  );
};

export default Login;
